export class Electron {
	public static instance: Electron;

	public emit(type: string, data: any) {
		window['ipcRenderer'].send(type, data);
	}

	public on(type: string, callback: Function) {
		window['ipcRenderer'].on(type, (event, data) => {
			callback(data);
		});
	}
}
