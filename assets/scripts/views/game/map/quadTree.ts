import { Node, UITransform } from 'cc';
import { TestItem } from './item';

export class TRect {
	x: number;
	y: number;
	width: number;
	height: number;
	node: Node;
	_nodeUI: UITransform;
	constructor(x?, y?, width?, height?) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
	}

	init(node: Node) {
		this.node = node;
		this._nodeUI = node.getComponent(UITransform);
		this.x = node.position.x - this._nodeUI.anchorX * this._nodeUI.width;
		this.y = node.position.y - this._nodeUI.anchorY * this._nodeUI.height;
		this.width = node.getComponent(UITransform).width;
		this.height = node.getComponent(UITransform).height;
	}

	public intersects(other: TRect): boolean {
		return (
			this.x < other.x + other.width &&
			this.x + this.width > other.x &&
			this.y < other.y + other.height &&
			this.y + this.height > other.y
		);
	}

	static simpleAABBCollisionDetection(rects: TRect[]) {
		for (let i = 0; i < rects.length; i++) {
			const aabbA = rects[i];
			for (let j = i + 1; j < rects.length; j++) {
				const aabbB = rects[j];
				if (aabbA.intersects(aabbB)) {
					aabbA.onTrigger(aabbB);
					aabbB.onTrigger(aabbA);
				}
			}
		}
	}

	onTrigger(other: TRect) {
		this.node.getComponent(TestItem).onCollisionEnter(other.node.getComponent(TestItem), this.node.getComponent(TestItem));
	}
}

export class QuadTree {
	/**x坐标位置,左下角 */
	x: number;
	/**y坐标位置,左下角 */
	y: number;
	/**宽度 */
	width: number;
	/**高度 */
	height: number;
	/**最大对象数 */
	max_objects: number;
	/**最深层级数 */
	max_levels: number;
	/**节点层级 */
	level: number;
	/**节点边界 */
	bounds: { x: number; y: number; width: number; height: number };
	/**节点对象 */
	objects: any[];
	/**子节点 */
	nodes: any[];

	/**
	 * 构造函数
	 * @param {Rect} bounds                 节点的边界, 一个对象必须有x, y, width, height属性
	 * @param {number} [max_objects=10]     所允许的最大对象数 (default: 10), 不能小于1
	 * @param {number} [max_levels=4]       最深层级 (default: 4), 不能小于2
	 * @param {number} [level=0]            节点层级 (default: 0), 不要手动传入这个参数
	 */
	constructor(bounds, max_objects, max_levels, level?) {
		this.max_objects = max_objects || 10;
		this.max_levels = max_levels || 4;

		this.level = level || 0;
		this.bounds = bounds;

		this.objects = [];
		this.nodes = [];
	}

	/**
	 * 分割节点为4个子节点
	 */
	split() {
		var nextLevel = this.level + 1,
			subWidth = this.bounds.width / 2,
			subHeight = this.bounds.height / 2,
			x = this.bounds.x,
			y = this.bounds.y;

		//top right node
		this.nodes[0] = new QuadTree(
			{
				x: x + subWidth,
				y: y,
				width: subWidth,
				height: subHeight,
			},
			this.max_objects,
			this.max_levels,
			nextLevel
		);

		//top left node
		this.nodes[1] = new QuadTree(
			{
				x: x,
				y: y,
				width: subWidth,
				height: subHeight,
			},
			this.max_objects,
			this.max_levels,
			nextLevel
		);

		//bottom left node
		this.nodes[2] = new QuadTree(
			{
				x: x,
				y: y + subHeight,
				width: subWidth,
				height: subHeight,
			},
			this.max_objects,
			this.max_levels,
			nextLevel
		);

		//bottom right node
		this.nodes[3] = new QuadTree(
			{
				x: x + subWidth,
				y: y + subHeight,
				width: subWidth,
				height: subHeight,
			},
			this.max_objects,
			this.max_levels,
			nextLevel
		);
	}

	/**
	 * 确定对象属于哪个节点
	 */
	getIndex(pRect: TRect) {
		var indexes = [],
			verticalMidpoint = this.bounds.x + this.bounds.width / 2,
			horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

		var startIsNorth = pRect.y < horizontalMidpoint, //是否在上半区域
			startIsWest = pRect.x < verticalMidpoint, //是否在左半区域
			endIsEast = pRect.x + pRect.width > verticalMidpoint, //是否在右半区域
			endIsSouth = pRect.y + pRect.height > horizontalMidpoint; //是否在下半区域

		//右上角
		if (startIsNorth && endIsEast) {
			indexes.push(0);
		}

		//左上角
		if (startIsWest && startIsNorth) {
			indexes.push(1);
		}

		//左下角
		if (startIsWest && endIsSouth) {
			indexes.push(2);
		}

		//右下角
		if (endIsEast && endIsSouth) {
			indexes.push(3);
		}

		return indexes;
	}

	/**
	 * 插入对象到四叉树,如果节点超过容量,将分割并将所有对象添加到相应的子节点
	 * */
	insert(pRect: TRect) {
		var i = 0,
			indexes;
		//对于有子节点的情况,将对象插入到子节点中
		if (this.nodes.length) {
			indexes = this.getIndex(pRect);

			for (i = 0; i < indexes.length; i++) {
				this.nodes[indexes[i]].insert(pRect);
			}
			return;
		}

		//如果没有子节点,将对象存储在这里
		this.objects.push(pRect);

		//如果对象数量超过容量,并且层级还没有达到最大,则分割节点
		if (this.objects.length > this.max_objects && this.level < this.max_levels) {
			//如果还没有子节点,则分割
			if (!this.nodes.length) {
				this.split();
			}
			//将所有对象添加到相应的子节点中
			for (i = 0; i < this.objects.length; i++) {
				indexes = this.getIndex(this.objects[i]);
				for (var k = 0; k < indexes.length; k++) {
					this.nodes[indexes[k]].insert(this.objects[i]);
				}
			}
			//清理当前节点
			this.objects = [];
		}
	}

	/**
	 * 检查对象是否与矩形相交
	 * @param pRect
	 * @returns
	 */
	retrieve(pRect: TRect) {
		var indexes = this.getIndex(pRect),
			returnObjects = this.objects;

		//如果有子节点,则检查子节点
		if (this.nodes.length) {
			for (var i = 0; i < indexes.length; i++) {
				returnObjects = returnObjects.concat(this.nodes[indexes[i]].retrieve(pRect));
			}
		}

		//去重
		returnObjects = returnObjects.filter(function (item, index) {
			return returnObjects.indexOf(item) >= index;
		});

		return returnObjects;
	}

	/**
	 * 清理四叉树
	 */
	clear() {
		this.objects = [];

		for (var i = 0; i < this.nodes.length; i++) {
			if (this.nodes.length) {
				this.nodes[i].clear();
			}
		}

		this.nodes = [];
	}

	insertNode(node: Node) {
		let rect = new TRect();
		rect.init(node);
		this.insert(rect);
	}

	/**
	 * 检测节点是否与矩形相交
	 * @param node 检测的节点
	 * @param expend 扩大矩形的大小
	 * @returns
	 */
	retrieveNode(node: Node, expend: number = 0): TRect[] {
		let rect = new TRect();
		rect.init(node);
		rect.x -= expend;
		rect.y -= expend;
		rect.width += expend;
		rect.height += expend;
		return this.retrieve(rect);
	}

	/**
	 * 获取全部最小的矩阵的node的列表
	 * @returns
	 */
	getObjectList(): TRect[][] {
		let list: TRect[][] = [];
		this.nodes.forEach((node) => {
			if (node.nodes.length) {
				list.push(...node.getObjectList());
			} else {
				list.push(node.objects);
			}
		});
		return list;
	}
}
