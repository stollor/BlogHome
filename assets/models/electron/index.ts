import { ElectronManager } from './electron-mgr';

declare module '../index' {
	interface ModelMgr {
		electron: ElectronManager;
	}
}
