export class WeaponProp {
	/**间隔时间 */
	private _interTime: number = 1;
	/**间隔时间 */
	public get interTime(): number {
		return this._interTime;
	}
	/**间隔时间 */
	public set interTime(v: number) {
		this._interTime = v;
	}

	/**子弹轨道数量 */
	private _track: number = 1;
	/**子弹轨道数量 */
	public get track(): number {
		return this._track;
	}
	/**子弹轨道数量 */
	public set track(v: number) {
		this._track = v;
	}

	/**波次 */
	private _wave: number = 1;
	/**波次 */
	public get wave(): number {
		return this._wave;
	}
	/**波次 */
	public set wave(v: number) {
		this._wave = v;
	}
}
