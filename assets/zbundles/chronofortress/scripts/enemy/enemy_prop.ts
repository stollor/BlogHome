export class EnemyProp {
	private _hp: number = 100;
	public get hp(): number {
		return this._hp;
	}
	public set hp(v: number) {
		this._hp = v;
	}

	private _attack: number = 20;
	public get attack(): number {
		return this._attack;
	}
	public set attack(v: number) {
		this._attack = v;
	}

	private _speed: number = 20;
	public get speed(): number {
		return this._speed;
	}
	public set speed(v: number) {
		this._speed = v;
	}

	private _attackInterval: number = 1;
	public get attackInterval(): number {
		return this._attackInterval;
	}
	public set attackInterval(v: number) {
		this._attackInterval = v;
	}
}
