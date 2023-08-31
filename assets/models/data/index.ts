import { ModelMgr } from '../index';
import { Data } from './data';
import { Database } from './database';

declare module '../index' {
	interface ModelMgr {
		Data: typeof Data;
		database: Database;
	}
}

ModelMgr.prototype.database = Database.instance = new Database();
