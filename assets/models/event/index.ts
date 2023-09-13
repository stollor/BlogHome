import { ModelMgr } from '../index';
import { EventManager } from './event-mgr';

declare module '../index' {
	interface ModelMgr {
		EventManager: typeof EventManager;
		em: EventManager;
	}
}

ModelMgr.prototype.em = EventManager.instance = new EventManager();
