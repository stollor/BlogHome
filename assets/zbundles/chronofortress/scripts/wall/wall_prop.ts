import { Node } from 'cc';

export class WallProp {
	public node: Node = null;
	constructor(node?: Node) {
		if (node) this.node = node;
	}

	private _hp: number = 100;
	public get hp(): number {
		return this._hp;
	}
	public set hp(v: number) {
		this.node?.emit('prop_hp_change', v - this._hp);
		this._hp = v;
	}
}
