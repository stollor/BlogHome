export interface BulletProp {
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
