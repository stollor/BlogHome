export class GlobalManager {
	public static instance: GlobalManager = new GlobalManager();
	public timeScale: number = 1;
	public setGlobalTimeScale(timeScale: number): void {
		this.timeScale = timeScale;
	}
}
