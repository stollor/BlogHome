import { ModelMgr } from '../index';
import { AssetMgr } from './asset-mgr/assets-mgr';
import { ElectronManager } from './electron-mgr';
import { EventManager } from './event-mgr';
import { GlobalManager } from './global-mgr';
declare module '../index' {
	interface ModelMgr {
		assetMgr: AssetMgr;
		em: EventManager;
		electron: ElectronManager;
		globalManager: GlobalManager;
	}
}

ModelMgr.prototype.assetMgr = AssetMgr.instance = new AssetMgr();
ModelMgr.prototype.em = EventManager.instance = new EventManager();
ModelMgr.prototype.electron = ElectronManager.instance = new ElectronManager();
ModelMgr.prototype.globalManager = GlobalManager.instance = new GlobalManager();
