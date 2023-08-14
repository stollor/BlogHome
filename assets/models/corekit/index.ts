import { ModelMgr } from '../index';
import { AssetMgr } from './asset-mgr/assets-mgr';
import { Electron } from './electron';
import { EventManager } from './event-mgr';
declare module '../index' {
	interface ModelMgr {
		assetMgr: AssetMgr;
		em: EventManager;
		electron: Electron;
	}
}

ModelMgr.prototype.assetMgr = AssetMgr.instance = new AssetMgr();
ModelMgr.prototype.em = EventManager.instance = new EventManager();
ModelMgr.prototype.electron = Electron.instance = new Electron();
