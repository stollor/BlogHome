export class ToolUtils {
	//object 多重排序
	static sortObjects(obj: any, ...props: any[]) {
		props = props.map((prop) => {
			if (!(prop instanceof Array)) {
				prop = [prop, true];
			}
			if (prop[1]) {
				prop[1] = 1;
			} else {
				prop[1] = -1;
			}
			return prop;
		});

		function arraryCmp(a: any, b: any) {
			for (let i = 0; i < props.length; i++) {
				let aV, bV;
				if (typeof props[i][0] == 'function') {
					aV = props[i][0](a);
					bV = props[i][0](b);
				} else {
					aV = a[props[i][0]];
					bV = b[props[i][0]];
				}
				if (aV > bV) {
					return props[i][1];
				} else if (aV < bV) {
					return -props[i][1];
				}
			}
			return 0;
		}

		obj.sort((a: any, b: any) => {
			return arraryCmp(a, b);
		});
	}

	//object排序
	static sortObject(obj: any, key: string, isAsc: boolean = true) {
		let arr = [];
		for (let k in obj) {
			arr.push(obj[k]);
		}
		arr.sort((a, b) => {
			if (isAsc) {
				return a[key] - b[key];
			} else {
				return b[key] - a[key];
			}
		});
		return arr;
	}

	static mapTo(x, y, k = 1) {
		return y * (1 - Math.exp(-k * x));
	}

	//实现一个洗牌算法
	static shuffle(list: number[]) {
		for (let i = 0; i < list.length; i++) {
			let j = Math.floor(Math.random() * (list.length - i)) + i;
			[list[i], list[j]] = [list[j], list[i]];
		}
	}

	/**
	 *
	 * @param func
	 * @returns
	 */
	static cloneFunction(func) {
		const cloneFunc = function () {
			return func.apply(this, arguments);
		};
		Object.getOwnPropertyNames(func).forEach(function (key) {
			const desc = Object.getOwnPropertyDescriptor(func, key);
			Object.defineProperty(cloneFunc, key, desc);
		});
		Object.setPrototypeOf(cloneFunc, Object.getPrototypeOf(func));
		return cloneFunc;
	}

	/**
	 *
	 * @param obj
	 * @param hash
	 * @returns
	 */
	static deepClone<T extends object>(obj: T, hash = new WeakMap()): T {
		// 返回基础类型
		if (Object(obj) !== obj) {
			return obj;
		}

		// 处理日期对象
		if (obj instanceof Date) {
			return new Date(obj) as T;
		}

		// 处理正则对象
		if (obj instanceof RegExp) {
			return new RegExp(obj) as T;
		}

		// 处理数组
		if (obj instanceof Array) {
			return obj.map((item) => ToolUtils.deepClone(item)) as T;
		}

		// 解决循环引用
		if (hash.has(obj)) {
			return hash.get(obj); // 解决循环引用
		}

		//处理函数
		if (obj instanceof Function) {
			return ToolUtils.cloneFunction(obj) as T;
		}

		// 处理普通对象和类实例
		const result: any = Object.getPrototypeOf(obj) === Object.prototype ? {} : Object.create(obj.constructor.prototype);
		hash.set(obj, result);

		for (let key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				result[key] = ToolUtils.deepClone(obj[key] as any, hash);
			}
		}

		return result;
	}

	/**
	 * 判断是否是类实例,可以区别简单的object和类实例
	 * @param obj
	 * @returns
	 */
	static isClassInstance(obj: any): boolean {
		return obj !== null && typeof obj === 'object' && obj.constructor !== Object && Object.getPrototypeOf(obj) !== Object.prototype;
	}
}
