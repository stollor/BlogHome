import { WeaponProp } from '../scripts/define/prop';

/**
 * 武器配置
 */
class WeaponConfig {
	static instance: WeaponConfig;

	public _base: WeaponProp = {
		interTime: 1,
		track: 1,
		wave: 1,
		speed: 2000,
		lifeTime: 5,
		attack: 10,
		penetr: 1,
		critRate: 0.1,
		critMultiplier: 0.5,
		speedDecay: 0.6,
	};
	public get base(): WeaponProp {
		return models.utils.tool.deepClone(this._base);
	}

	/**
	 * T枪械
	 */
	public _gun: WeaponProp = {
		interTime: 0.25,
		track: 2,
		wave: 2,
		speed: 2000,
		lifeTime: 5,
		attack: 10,
		penetr: 1,
		critRate: 0.5,
		critMultiplier: 1,
		speedDecay: 0.8,
		splitCount: 3,
		splitTimes: 1,
		lifeSteal: 0,
		reflect: false,
		boom: false,
	};

	public get gun(): WeaponProp {
		return models.utils.tool.deepClone(this._gun);
	}
}

export const weaponConfig: WeaponConfig = (WeaponConfig.instance = new WeaponConfig());
