import { EditBox } from "cc";
import { Label } from "cc";
import { RichText } from "cc";
import { Node } from "cc";

/**
 * 数据
 * 数据监听
 */
export class Data {
	private _val: any;
	private _listener: Function[] = [];

	constructor(val?) {
		if(val)this._val = val;
	}

	public set(val) {
		let old = this._val;
		this._val = val;
		this._listener.forEach(cb => {
			cb(val, old);
		})
	}

	public get() {
		return this._val;
	}

	public addListener(cb: (val: any, oldVal?: any) => void) {
		this._listener.push(cb);
	}
}