export class BulletProp {
	/**子弹角度 */
	private _angle: number = 0;
	public get angle(): number {
		return this._angle;
	}
	public set angle(v: number) {
		this._angle = v;
	}

	/**子弹速度 */
	private _speed: number = 1000;
	public get speed(): number {
		return this._speed;
	}
	public set speed(v: number) {
		this._speed = v;
	}

	/**存在时间 */
	private _lifeTime: number = 10;
	public get lifeTime(): number {
		return this._lifeTime;
	}
	public set lifeTime(v: number) {
		this._lifeTime = v;
	}

	/**攻击力 */
	private _attack: number = 10;
	public get attack(): number {
		return this._attack;
	}
	public set attack(v: number) {
		this._attack = v;
	}

	/**穿透 */
	private _penetr: number = 1;
	/**穿透 */
	public get penetr(): number {
		return this._penetr;
	}
	/**穿透 */
	public set penetr(v: number) {
		this._penetr = v;
	}

	/**暴击率*/
	private _critRate: number = 0.1;
	/**暴击率*/
	public get critRate(): number {
		return this._critRate;
	} /**暴击率*/
	public set critRate(v: number) {
		this._critRate = v;
	}

	/**暴击倍率 */
	private _critMultiplier: number = 1;
	public get critMultiplier(): number {
		return this._critMultiplier;
	}
	public set critMultiplier(v: number) {
		this._critMultiplier = v;
	}

	/**速度衰减 */
	private _speedDecay: number;
	/**速度衰减 */
	public get speedDecay(): number {
		return this._speedDecay;
	}
	/**速度衰减 */
	public set speedDecay(v: number) {
		this._speedDecay = v;
	}

	/**分裂数量 */
	private _splitCount: number;
	/**分裂数量 */
	public get splitCount(): number {
		return this._splitCount;
	}
	/**分裂数量 */
	public set splitCount(v: number) {
		this._splitCount = v;
	}

	/**分裂次数 */
	private _splitTimes: number;
	/**分裂次数 */
	public get splitTimes(): number {
		return this._splitTimes;
	}
	/**分裂次数 */
	public set splitTimes(v: number) {
		this._splitTimes = v;
	}

	/**吸血 */
	private _LifeSteal: number;
	/**吸血 */
	public get LifeSteal(): number {
		return this._LifeSteal;
	}
	/**吸血 */
	public set LifeSteal(v: number) {
		this._LifeSteal = v;
	}

	/**反射 */
	private _reflect: boolean = false;
	/**反射 */
	public get reflect(): boolean {
		return this._reflect;
	}
	/**反射 */
	public set reflect(v: boolean) {
		this._reflect = v;
	}

	/**爆炸 */
	private _boom: boolean;
	/**爆炸 */
	public get boom(): boolean {
		return this._boom;
	}
	/**爆炸 */
	public set boom(v: boolean) {
		this._boom = v;
	}
}
