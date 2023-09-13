import { GlobalManager } from './global-mgr';

declare module '../index' {
	interface ModelMgr {
		globalManager: GlobalManager;
	}
}
