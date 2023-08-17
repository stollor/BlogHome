import { director, sp, sys } from 'cc';

export class GlobalManager {
	public static instance: GlobalManager = new GlobalManager();
	public timeScale: number = 1;
	public setGlobalTimeScale(timeScale: number): void {
		this.timeScale = timeScale;
	}
}

let oldTick = director.tick.bind(director);
director.tick = function (dt) {
	dt *= models.globalManager.timeScale || 1;
	oldTick(dt);
	if (sys.isNative) {
		// @ts-ignore  此处SkeletonAnimation爆红，但是不影响运行
		sp.spine.SkeletonAnimation.setGlobalTimeScale(models.globalManager.timeScale || 1);
	}
};
