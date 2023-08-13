import { AssetMgr } from './asset-mgr/assets-mgr';
import { EventManager } from './event-mgr';

declare global {
	var models: models.model;
}

declare namespace models {
	interface model {
		assetMgr: AssetMgr;
		em: EventManager;
		// Corekit 类型的属性和方法...
	}
}
globalThis.models = globalThis.models || ({} as models.model);
globalThis.models.assetMgr = AssetMgr.instance = new AssetMgr();
globalThis.models.em = EventManager.instance = new EventManager();
