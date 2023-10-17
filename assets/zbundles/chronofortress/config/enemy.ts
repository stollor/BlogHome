import { EnemyProp } from '../scripts/define/prop';

/**
 * 敌人配置
 */
class EnemyConfig {
	static instance: EnemyConfig;

	private _base: EnemyProp = {
		hp: 100,
		attack: 10,
		speed: 200,
		attackInterval: 2,
		exp: 1,
	};

	public get base(): EnemyProp {
		return models.utils.tool.deepClone(this._base);
	}
}

export const enemyConfig: EnemyConfig = (EnemyConfig.instance = new EnemyConfig());
