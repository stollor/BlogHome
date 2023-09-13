export class ElectronManager {
	public static instance: ElectronManager;

	public emit(type: string, data: any) {
		window['ipcRenderer'].send(type, data);
	}

	public on(type: string, callback: Function) {
		window['ipcRenderer'].on(type, (event, data) => {
			callback(data);
		});
	}
}
