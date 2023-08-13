import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MemoryUtil')
export class MemoryUtil extends Component {
	@property(Node) limit: Node;
	@property(Node) total: Node;
	@property(Node) used: Node;

	private _unit = 2;
	private _unit2 = ['B', 'KB', 'MB', 'GB'];

	start() {
		this.node.on(
			Button.EventType.CLICK,
			() => {
				this._unit = (this._unit + 1) % 4;
			},
			this
		);
	}

	update(deltaTime: number) {
		this.limit.setStr(
			//@ts-ignore
			(globalThis.window.performance.memory.jsHeapSizeLimit / 1024 ** this._unit).toFixed(2) + this._unit2[this._unit]
		);

		this.total.setStr(
			//@ts-ignore
			(globalThis.window.performance.memory.totalJSHeapSize / 1024 ** this._unit).toFixed(2) + this._unit2[this._unit]
		);

		this.used.setStr(
			//@ts-ignore
			(globalThis.window.performance.memory.usedJSHeapSize / 1024 ** this._unit).toFixed(2) + this._unit2[this._unit]
		);
	}
}
