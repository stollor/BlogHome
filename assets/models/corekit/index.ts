import { ModelMgr } from '../index';
import { AssetMgr } from './asset-mgr/assets-mgr';
import { ElectronManager } from '../electron/electron-mgr';
import { GlobalManager } from '../global/global-mgr';
declare module '../index' {
	interface ModelMgr {
		assetMgr: AssetMgr;
		globalManager: GlobalManager;
	}
}

ModelMgr.prototype.assetMgr = AssetMgr.instance = new AssetMgr();
ModelMgr.prototype.electron = ElectronManager.instance = new ElectronManager();
ModelMgr.prototype.globalManager = GlobalManager.instance = new GlobalManager();
