import { director, sys } from 'cc';
import { ModelMgr } from '../index';
import { GlobalManager } from './global-mgr';

declare module '../index' {
	interface ModelMgr {
		global: GlobalManager;
	}
}
ModelMgr.prototype.global = GlobalManager.instance = new GlobalManager();

let oldTick = director.tick.bind(director);
director.tick = function (dt) {
	dt *= models?.global?.timeScale || 1;
	oldTick(dt);
	if (sys.isNative) {
		// @ts-ignore  此处SkeletonAnimation爆红，但是不影响运行
		sp.spine.SkeletonAnimation.setGlobalTimeScale(models.globalManager.timeScale || 1);
	}
};
