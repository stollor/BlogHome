declare interface Array<T> {
	/**
	 * 数组遍历方法
	 * @param {Function} fn 回调函数
	 * @returns {Array} 返回新数组
	 */
	each: (fn?: (item: T, index: number, ...args: any[]) => any) => any[];
	/**
	 * 数组是否包含某个元素
	 * @param {Object} suArr 要判断的元素
	 * @returns {Boolean} 返回是否包含
	 */
	contains: (obj: any) => boolean;
	/**
	 * 数组去重
	 * @returns {Array} 返回去重后的新数组
	 */
	uniquelize: () => any[];
	/**
	 * 两个数组的交集
	 * @param {Array} a 数组1
	 * @returns {Array} 返回交集
	 */
	intersect: (A: any[]) => any[];
	/**
	 * 两个数组的差集
	 * @param {Array} a 数组1
	 * @returns {Array} 返回差集
	 */
	minus: (A: any[]) => any[];
	/**
	 * 两个数组的补集
	 * @param {Array} a 数组1
	 * @returns {Array} 返回补集
	 */
	complement: (A: any[]) => any[];
	/**
	 * 两个数组的并集
	 * @param {Array} a 数组1
	 * @returns {Array} 返回并集
	 */
	union: (A: any[]) => any[];

	/**
	 * 删除数组中的元素
	 * @param obj  要删除的元素
	 * @returns
	 */
	remove: (obj: any) => void;
}

Array.prototype.each = function (fn?) {
	var a = [];
	var args = Array.prototype.slice.call(arguments, 1);
	for (var i = 0; i < this.length; i++) {
		var res = fn?.apply(this, [this[i], i].concat(args));
		if (res != null) a.push(res);
	}
	return a;
};

Array.prototype.contains = function (suArr) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == suArr) {
			return true;
		}
	}
	return false;
};

Array.prototype.uniquelize = function () {
	var ra = new Array();
	for (var i = 0; i < this.length; i++) {
		if (!ra.contains(this[i])) {
			ra.push(this[i]);
		}
	}
	return ra;
};

Array.prototype.intersect = function (arr: any[]) {
	var sb = new Set(arr);
	return this.filter((x) => sb.has(x));
};

Array.prototype.minus = function (arr) {
	var sb = new Set(arr);
	return this.filter((x) => !sb.has(x));
};

Array.prototype.complement = function (arr) {
	var sa = new Set(this);
	var sb = new Set(arr);
	return [...this.filter((x) => !sb.has(x)), ...arr.filter((x) => !sa.has(x))];
};

Array.prototype.union = function (arr) {
	return Array.from(new Set([...this, ...arr]));
};

Array.prototype.remove = function (obj) {
	let index = this.indexOf(obj);
	if (index >= 0) {
		this.splice(index, 1);
	}
};
