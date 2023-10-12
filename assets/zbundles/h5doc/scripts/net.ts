export class ConfigNet {
	static getFile(data: string, cb: Function) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8000/file?filename=' + data);
		xhr.onload = () => {
			if (xhr.status === 200) {
				const config = JSON.parse(xhr.responseText);
				console.log('net:', config);
				cb(config);
			} else {
				console.error(xhr.responseText);
			}
		};
		xhr.onerror = () => {
			console.error('Network Error');
		};
		xhr.send();
	}
}
