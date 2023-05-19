//实现一个洗牌算法
export function shuffle(list: number[]) {
	let index = 0;
}

//object排序
export function sortObject(obj: any, key: string, isAsc: boolean = true) {
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

//object 多重排序
export function sortObjectByKeys(obj: any, keys: string[], isAsc: boolean[] = []) {
	let arr = [];
	for (let k in obj) {
		arr.push(obj[k]);
	}
	arr.sort((a, b) => {
		let result = 0;
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let _isAsc = isAsc[i];
			if (_isAsc) {
				result = a[key] - b[key];
			} else {
				result = b[key] - a[key];
			}
			if (result != 0) {
				return result;
			}
		}
		return result;
	});
	return arr;
}

//object 多重排序
export function sortObjects(obj: any, ...props: any[]) {
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

export function sortObjects1(obj: any, ...props: any[]) {
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

	function arraryCmp(a: any, b: any, i: number = 0): number {
		if (i >= props.length) {
			return 0;
		}
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
		} else {
			return arraryCmp(a, b, i + 1);
		}
	}

	function insertionSort(arr: any[], left: number, right: number) {
		for (let i = left + 1; i <= right; i++) {
			const temp = arr[i];
			let j = i - 1;
			while (j >= left && arraryCmp(arr[j], temp) > 0) {
				arr[j + 1] = arr[j];
				j--;
			}
			arr[j + 1] = temp;
		}
	}

	function quickSort(arr: any[], left: number, right: number) {
		if (left >= right) {
			return;
		}
		if (right - left + 1 <= 10) {
			insertionSort(arr, left, right);
			return;
		}
		const pivot = arr[Math.floor((left + right) / 2)];
		let i = left;
		let j = right;
		while (i <= j) {
			while (arraryCmp(arr[i], pivot) < 0) {
				i++;
			}
			while (arraryCmp(arr[j], pivot) > 0) {
				j--;
			}
			if (i <= j) {
				[arr[i], arr[j]] = [arr[j], arr[i]];
				i++;
				j--;
			}
		}
		quickSort(arr, left, j);
		quickSort(arr, i, right);
	}

	quickSort(obj, 0, obj.length - 1);
}
