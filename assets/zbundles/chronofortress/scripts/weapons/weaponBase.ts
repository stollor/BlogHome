export class Skill {
	/** 固定数值 攻击间隔 */
	public interTime: number = 0;
	/** 固定数值 攻击力 */
	public attack: number = 0;
	/** 固定数值 穿透 */
	public penetration: number = 0;

	/** 比例增加 攻击间隔 */
	public interTimeRatio: number = 0;
	/** 比例增加 攻击力*/
	public attackRatio: number = 0;
	/** 比例增加 穿透*/
	public penetrationRatio: number = 0;

	/** 额外乘区 攻击间隔*/
	public interTimeMul: number = 0;
	/** 额外乘区 攻击力*/
	public attackMul: number = 0;
	/** 额外乘区 穿透*/
	public penetrationMul: number = 0;
}
