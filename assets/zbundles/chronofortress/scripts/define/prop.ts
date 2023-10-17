/**
 * 武器属性
 */
export interface WeaponProp {
	/**间隔时间 */
	interTime: number;
	/**子弹轨道数量 */
	track: number;
	/**波次 */
	wave: number;
	/**子弹速度 */
	speed: number;
	/**存在时间 */
	lifeTime: number;
	/**攻击力 */
	attack: number;
	/**穿透 */
	penetr?: number;
	/**暴击率*/
	critRate?: number;
	/**暴击倍率 */
	critMultiplier?: number;
	/**速度衰减 */
	speedDecay?: number;
	/**分裂数量 */
	splitCount?: number;
	/**分裂次数 */
	splitTimes?: number;
	/**吸血 */
	lifeSteal?: number;
	/**反射 */
	reflect?: boolean;
	/**爆炸 */
	boom?: boolean;
}

/**
 * 敌人属性
 */
export interface EnemyProp {
	/**生命 */
	hp: number;
	/**攻击 */
	attack: number;
	/**速度 */
	speed: number;
	/**攻击间隔 */
	attackInterval: number;
	/**经验 */
	exp: number;
}
