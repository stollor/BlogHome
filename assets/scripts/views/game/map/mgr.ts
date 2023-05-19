import { Component, Prefab, Vec2, _decorator, instantiate, v2, v3 } from 'cc';
import { MapTiled } from './tiled';
const { ccclass, property } = _decorator;

@ccclass('MapTiledMgr')
export class MapTiledMgr extends Component {
	@property(Prefab) prefab: Prefab;
	//@property(Node) object: Node;
	pool: MapTiled[] = [];
	get() {
		if (this.pool.length > 0) {
			return this.pool.pop()!;
		}
		let node = instantiate(this.prefab);
		node.getComponent(MapTiled)!.refreshCB = this.check.bind(this);
		return node.getComponent(MapTiled)!;
	}
	put(tiled: MapTiled) {
		this.pool.push(tiled);
	}

	width: number = 512;
	height: number = 512;

	/**移动过的 */
	movedKyes: Vec2[] = [];
	/**当前需要显示的 */
	nextKeys: Vec2[] = [];
	/**所有的 */
	showKeys: Vec2[] = [];
	/**当前具有的节点 */
	nowNodeMap: Map<Vec2, MapTiled> = new Map<Vec2, MapTiled>();

	length: number = 4;
	_lastPos: Vec2;

	protected start(): void {
		this.check(v2(0, 0));
	}

	check(pos: Vec2) {
		if (this._lastPos == pos) {
			return;
		}
		this._lastPos = pos;
		let x = pos.x; //Math.floor(this.object.position.x / this.width);
		let y = pos.y; //Math.floor(this.object.position.y / this.height);
		this.movedKyes.push(v2(x, y));
		let chang = ~~(this.length / 2);
		this.nextKeys = [];
		for (let i = chang * -1; i <= chang; i++) {
			for (let j = chang * -1; j <= chang; j++) {
				this.nextKeys.push(v2(x + i, y + j));
			}
		}
		//移除不需要的
		this.showKeys.minus(this.nextKeys).forEach((key) => {
			this.put(this.nowNodeMap.get(key)!);
			this.nowNodeMap.delete(key);
		});
		this.showKeys = this.nextKeys;
		//添加需要的
		this.nextKeys.forEach((key) => {
			let tiled = this.nowNodeMap.get(key) || this.get();
			tiled.setInit(this.node, v3(key.x * this.width, key.y * this.height, 0), 0);
			this.nowNodeMap.set(key, tiled);
		});
	}
}
