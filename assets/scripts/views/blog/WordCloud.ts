import { _decorator, CCBoolean, Color, Component, Graphics, Label, Layers, Node, UITransform, v3 } from 'cc';
const { ccclass, property } = _decorator;

let data = [
	{ name: '碧血剑', value: 1 },
	{ name: '天涯', value: 2 },
	{ name: '倚天剑', value: 1 },
	{ name: '屠龙刀', value: 3 },
	{ name: '龙雀', value: 2 },
	{ name: '贰拾壹', value: 1 },
	{ name: '青冥', value: 1 },
	{ name: '七星芒', value: 2 },
	{ name: '玄铁重剑', value: 3 },
	{ name: '招魂幡', value: 2 },
	{ name: '轩辕剑', value: 3 },
	{ name: '青龙', value: 4 },
	{ name: '盘古斧', value: 1 },
	{ name: '混沌钟', value: 1 },
	{ name: '莫邪剑', value: 3 },
	{ name: '干将剑', value: 2 },
	{ name: '金刚杵', value: 7 },
	{ name: '玄武鼎', value: 5 },
	{ name: '七星八卦阵', value: 10 },
	{ name: '瑶琴', value: 3 },
];

/**
 * 词云
 * 简单实现矩形词云效果,性能一般
 */
@ccclass('WordCloud')
export class WordCloud extends Component {
	@property(CCBoolean) debug = false;

	private _unit = 10; //单位长度
	private _maxSize = 5;
	private _minSize = 0.5;
	private _rateChange = 1;

	private _map: number[][];
	private _mapFillCount = 0;
	private _mapAllCount = 0;
	private _rows = 5; //行
	private _cols = 3; //列
	private _data;
	private _sum;
	private _draw: Graphics;
	private _posArgs;

	start() {
		if (this.debug) this._draw = this.node.getComponent(Graphics) || this.node.addComponent(Graphics);
		this.scheduleOnce(() => {
			this.refresh(data);
		}, 1);
	}

	refresh(data) {
		this.refreshData(data);
		this.refreshMap();
		this._posArgs = {
			x: Math.floor(this._rows / 2),
			y: Math.floor(this._cols / 2),
			steps: 0,
			dx: 0,
			dy: -1,
			len: this._cols * this._rows - 1,
			k: 0,
			dis: 1,
		};
		this.refreshByStep();
	}

	refreshMap() {
		this._rows = Math.floor(this.node.ui.width / this._unit);
		this._cols = Math.floor(this.node.ui.height / this._unit);
		this._map = Array.from({ length: this._cols }, () => Array.from({ length: this._rows }, () => 0));
		this._mapFillCount = 0;
		this._mapAllCount = this._rows * this._cols;
		this.node.destroyAllChildren();
	}

	refreshData(data) {
		ToolUtils.sortObjects(data, [(item) => item.value]);
		let sum = 0;
		data.forEach((item) => {
			sum += item.value;
		});

		this._data = data;
		this._sum = sum;
	}

	refreshChart() {
		while (true) {
			for (let i = 0; i < this._data.length; i++) {
				//获取数据
				if (!this._addOne(this._data[i])) {
					if (this.debug) this._drawBG();
					return;
				}
			}
		}
	}

	refreshByStep() {
		let count = 0;
		var timer = async () => {
			let result = await this._addOne(this._data[count % this._data.length]);
			if (!result) {
				console.log('end !');
				return;
			}
			if (this.debug) this._drawBG();
			count++;
			this.scheduleOnce(() => {
				timer();
			}, 0.01);
		};
		timer();
	}

	async _addOne(item) {
		if (!item) return false;
		let value = item.value;
		//计算矩形大小
		let width = item.name.length * 3 * (10 / this._unit);
		let height = 4 * (10 / this._unit);
		let scale = ToolUtils.mapTo(value / this._sum, this._maxSize, this._rateChange) + this._minSize;
		scale *= this._unit / 10;
		width = Math.floor(width * scale);
		height = Math.floor(height * scale);
		if (width < 1 || height < 1) return false;
		let posData: any = await this.getPosition(width, height, this._posArgs);
		if (!posData[0]) {
			posData = this.getPosition2(width, height, this._posArgs);
		}
		let args = posData[0];
		if (!args) return false;
		//console.log(`${item.name} ratio:${args.ratio} ifReversal:${args.ifReversal}`);
		return this._fillAndSet(args.ratio, args.ifReversal, args.x, args.y, width, height, item, scale);
	}

	getPosition2(
		width: number,
		height: number,
		arg = {
			x: Math.floor(this._rows / 2),
			y: Math.floor(this._cols / 2),
			steps: 0,
			dx: 0,
			dy: -1,
			len: this._cols * this._rows - 1,
			k: 0,
			dis: 1,
		}
	) {
		//遍历map,起点随机
		let start_y = 0; //Math.floor(Math.random() * this._cols);
		for (let i = 0; i < this._cols; i++) {
			let start_x = 0; //Math.floor(Math.random() * this._rows);
			for (let j = 0; j < this._rows; j++) {
				let y = (start_y + i) % this._cols;
				let x = (start_x + j) % this._rows;
				if (this._map[y][x] == 0) {
					let pos = this._findRectInMap(x, y, width, height);
					if (pos) {
						return [pos, arg];
					}
				}
			}
		}
		return [null, arg];
	}

	getPosition(
		width: number,
		height: number,
		arg = {
			x: Math.floor(this._rows / 2),
			y: Math.floor(this._cols / 2),
			steps: 0,
			dx: 0,
			dy: -1,
			len: this._cols * this._rows - 1,
			k: 0,
			dis: 1,
		}
	) {
		var timer = (cb) => {
			//this._drawRect(arg.x, arg.y, 1, 1, new Color(255, 0, 0, 255));
			if (0 <= arg.x && arg.x < this._rows && 0 <= arg.y && arg.y < this._cols && this._map[arg.y][arg.x] == 0) {
				let pos = this._findRectInMap(arg.x, arg.y, width, height);
				if (pos) {
					return cb(pos, arg);
				}
			}
			if (arg.steps >= arg.dis || arg.x >= this._rows || arg.y >= this._cols || arg.x <= 0 || arg.y <= 0) {
				arg.steps = 0;
				if (arg.dy == 1 || arg.dy == -1) {
					arg.dis = arg.dis + 1;
				} else {
					arg.dis = arg.dis;
				}
				[arg.dx, arg.dy] = [-arg.dy, arg.dx];
			}
			arg.steps++;
			arg.x += arg.dx;
			arg.y += arg.dy;
			if (arg.x >= this._rows || arg.y >= this._cols || arg.x <= 0 || arg.y <= 0) {
				return cb(null);
			}
			arg.k++;
			if (arg.k >= arg.len) {
				return cb(null);
			}
			timer(cb);
		};

		return new Promise((resolve) => {
			timer((val, arg) => {
				resolve([val, arg]);
			});
		});
	}

	_findRectInMap(x, y, width, height) {
		let ratio = 0;
		let ifReversal = false;
		let canput = this._checkMapRect(x, y, width, height);
		if (!canput) {
			//尝试旋转90
			canput = this._checkMapRect(x - height, y, height, width);
			if (canput) {
				ratio = 90;
			}
		}
		if (!canput) {
			//尝试旋转180
			canput = this._checkMapRect(x - width, y - height, width, height);
			if (canput) {
				ratio = 180;
			}
		}
		if (!canput) {
			//尝试旋转270
			canput = this._checkMapRect(x, y - width, height, width);
			if (canput) {
				ratio = 270;
			}
		}

		if (!canput) {
			//尝试旋转0,并镜像
			canput = this._checkMapRect(x, y - height, width, height);
			if (canput) {
				ifReversal = true;
				ratio = 0;
			}
		}

		if (!canput) {
			//尝试旋转90,并镜像
			canput = this._checkMapRect(x, y, height, width);
			if (canput) {
				ifReversal = true;
				ratio = 90;
			}
		}

		if (!canput) {
			//尝试旋转180,并镜像
			canput = this._checkMapRect(x - width, y, width, height);
			if (canput) {
				ifReversal = true;
				ratio = 180;
			}
		}

		if (!canput) {
			//尝试旋转270,并镜像
			canput = this._checkMapRect(x - height, y - width, height, width);
			if (canput) {
				ifReversal = true; //尝试旋转180,并Y轴镜像
				ratio = 270;
			}
		}

		if (canput) {
			return { x, y, ratio, ifReversal };
		} else {
			return null;
		}
	}

	_drawBG() {
		this._draw.clear();
		for (let i = 0; i < this._cols; i++) {
			for (let j = 0; j < this._rows; j++) {
				if (this._map[i][j] != 0) {
					this._drawRect(j, i, 1, 1, new Color(0, 0, 0, 255));
				} else {
					this._drawRect(j, i, 1, 1, new Color(255, 255, 255, 255));
				}
			}
		}
	}

	_drawRect(x, y, width, height, color) {
		this._draw.fillColor = color;
		this._draw.rect(
			x * this._unit - this.node.ui.width * this.node.ui.anchorX,
			y * this._unit - this.node.ui.height * this.node.ui.anchorY,
			width * this._unit,
			height * this._unit
		);
		this._draw.fill();
	}

	_fillAndSet(ratio, ifReversal, bestX, bestY, width, height, item, scale) {
		//放置文字
		let node = this.getLabelNode(item.name, scale);
		this.node.addChild(node);
		node.setPosition(
			bestX * this._unit - this.node.ui.width * this.node.ui.anchorX,
			bestY * this._unit - this.node.ui.height * this.node.ui.anchorY
		);
		//填充
		if (ifReversal) {
			if (ratio == 0) {
				node.move(0, -height * this._unit);
				return this._fillMapRect(bestX, bestY - height, width, height);
			} else if (ratio == 90) {
				node.setRotationFromEuler(0, 0, 90);
				node.move(height * this._unit, 0);
				return this._fillMapRect(bestX, bestY, height, width);
			} else if (ratio == 180) {
				node.move(-width * this._unit, 0);
				return this._fillMapRect(bestX - width, bestY, width, height);
			} else if (ratio == 270) {
				node.setRotationFromEuler(0, 0, -90);
				node.move(-height * this._unit, 0);
				return this._fillMapRect(bestX - height, bestY - width, height, width);
			}
		} else {
			if (ratio == 0) {
				return this._fillMapRect(bestX, bestY, width, height);
			} else if (ratio == 90) {
				node.setRotationFromEuler(0, 0, 90);
				return this._fillMapRect(bestX - height, bestY, height, width);
			} else if (ratio == 180) {
				node.move(-width * this._unit, -height * this._unit);
				return this._fillMapRect(bestX - width, bestY - height, width, height);
			} else if (ratio == 270) {
				node.setRotationFromEuler(0, 0, -90);
				return this._fillMapRect(bestX, bestY - width, height, width);
			}
		}
		return false;
	}

	_checkMapRect(x, y, width, height) {
		if (x < 0 || y < 0 || x + width >= this._rows || y + height >= this._cols) return false;
		let xMax = Math.floor(x + width);
		let yMax = Math.floor(y + height);
		for (let i = Math.floor(y); i <= yMax; i++) {
			for (let j = Math.floor(x); j <= xMax; j++) {
				if (this._map[i][j] != 0) {
					return false;
				}
			}
		}
		return true;
	}

	_fillMapRect(x, y, width, height) {
		let xMax = Math.floor(Math.min(x + width, this._rows - 1));
		let yMax = Math.floor(Math.min(y + height, this._cols - 1));
		for (let i = y; i <= yMax; i++) {
			for (let j = x; j <= xMax; j++) {
				this._map[i][j] = 1;
				this._mapFillCount += 1;
			}
		}
		return true;
	}

	getLabelNode(str: string, scale: number) {
		let node: Node = new Node();
		let ui = node.addComponent(UITransform);
		ui.anchorX = 0;
		ui.anchorY = 0;
		node.layer = Layers.Enum.UI_2D;
		node.scale = v3(scale, scale, 1);
		let label = node.addComponent(Label);
		label.fontSize = 30;
		label.lineHeight = 32;
		label.isBold = true;
		label.string = str;
		label.horizontalAlign = Label.HorizontalAlign.CENTER;
		label.verticalAlign = Label.VerticalAlign.CENTER;
		//基于随机的颜色
		let color = Math.floor(Math.random() * 0xffffff);
		label.color = new Color(color >> 16, (color >> 8) & 0xff, color & 0xff);

		return node;
	}
}
