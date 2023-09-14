import { ModelMgr } from '../index';
import { AssetMgr } from './asset-mgr/assets-mgr';
declare module '../index' {
	interface ModelMgr {
		assetMgr: AssetMgr;
	}
}

ModelMgr.prototype.assetMgr = AssetMgr.instance = new AssetMgr();
