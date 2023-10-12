import { ccenum } from 'cc';

export enum PHY_GROUP {
	/**默认 */
	DEFAULT = 1 << 0,
	/**敌人 */
	ENEMY = 1 << 1,
	/**技能 */
	SKILL = 1 << 2,
	/**城墙 */
	WALL = 1 << 3,
	/**技能特效 */
	EFFECT = 1 << 4,
}
ccenum(PHY_GROUP);

export let dt: number = 1 / 60;
