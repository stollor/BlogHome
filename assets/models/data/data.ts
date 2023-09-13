//let EventManager = models.EventManager;

import { EventManager } from '../event/event-mgr';

/**
 * 数据, 用于监听数据变化
 * 适用于:基础类型,数组,对象
 * 事件:
 * 		change:数据变化(基础类型),或者数组,对象的任意变化  (newValue,oldVal)
 * 		add:数组,对象添加元素								(value,index)
 * 		del:数组,对象删除元素								(value,index)
 * 		set:数组,对象修改属性								(value,index/key)
 */
export class Data<T = any> extends EventManager {
	public _value: T;
	public _oldValue: T;

	constructor(data: T) {
		super();
		this._value = data;
		this._oldValue = null;
	}

	public set value(value: T) {
		if (this._value === value) return;
		this._oldValue = this._value;
		this._value = value;
		this.emit('change', { newValue: this._value, oldVal: this._oldValue });
	}

	public get value(): T {
		if (Array.isArray(this._value)) {
			return new CustomArray<T>(this._value, this) as T;
		} else if (typeof this._value === 'object' && this._value !== null) {
			return new CustomObject<T>(this._value, this) as T;
		} else return this._value;
	}
}

class CustomArray<T> {
	private array: T[];
	private data: Data<T>;

	constructor(value: T[] = [], data: Data<T>) {
		this.array = value;
		this.data = data;
		return new Proxy(this, {
			get: (target, prop, receiver) => {
				if (prop === 'push') {
					return (value: T) => {
						this.data.emit('add', { value: value, index: -1 });
						return this.array.push(value);
					};
				} else if (prop === 'unshift') {
					return (value: T) => {
						this.data.emit('add', { value: value, index: 0 });
						return this.array.unshift();
					};
				} else if (prop === 'pop') {
					return () => {
						this.data.emit('del', { value: value, index: -1 });
						return this.array.pop();
					};
				} else if (prop === 'shift') {
					return () => {
						this.data.emit('del', { value: value, index: 0 });
						return this.array.shift();
					};
				} else if (prop === 'length') {
					return this.array.length;
				} else {
					return Reflect.get(target, prop, receiver);
				}
			},
		});
	}
}

class CustomObject<T> {
	private object: T;
	private data: Data<T>;

	constructor(value: T, data: Data<T>) {
		this.object = value;
		this.data = data;
		return new Proxy(this, {
			get: (target, prop, receiver) => {
				return Reflect.get(target, prop, receiver);
			},
			set: (target, prop, value, receiver) => {
				this.data.emit('set', { value: value, key: prop });
				return Reflect.set(target, prop, value, receiver);
			},
			deleteProperty: (target, prop) => {
				this.data.emit('del', { value: target[prop], key: prop });
				return Reflect.deleteProperty(target, prop);
			},
		});
	}
}
