class ToolUtils {
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
}
