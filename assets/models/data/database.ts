import { Data } from './data';

export class Database {
	public static instance: Database = null;

	private _map: Map<string, Data> = new Map<string, Data>();

	public get(key: string): Data {
		let data = this._map.get(key);
		if (!data) {
			data = new Data(0);
			this._map.set(key, data);
		}
		return data;
	}

	public set(key: string, value: any) {
		let data = this._map.get(key);
		if (!data) {
			data = new Data(value);
		}
		data.value = value;
		this._map.set(key, data);
	}
}
