/**
 * 数据, 用于监听数据变化
 */
export class Data<T = any> {
	public _value: T;
	public _oldValue: T;

	constructor(data: T) {
		this._value = data;
		this._oldValue = null;
	}

	public set value(value: T) {
		if (this._value === value) return;
		this._oldValue = this._value;
		this._value = value;
		this.onChange(this._value, this._oldValue);
	}

	public get value(): T {
		return this._value;
	}

	/**
	 * 监听数据变化
	 * @param newData 新数据
	 * @param oldData 旧数据
	 */
	public onChange(newData: T, oldData: T) {}
}
