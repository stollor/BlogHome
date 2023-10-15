import { Color, Prefab, Sprite, instantiate } from 'cc';
import { BulletType } from '../define/game';
import { EnemyBase } from '../enemy/enemy_base';
import { BulletBase } from '../weapons/bullet_base';

export class DamageCount {
	static check(enemy: EnemyBase, bullet: BulletBase) {
		bullet.isLock = true;
		switch (bullet.type) {
			case BulletType.Gun:
				this.onGun(enemy, bullet);
				break;
			case BulletType.Boom:
				this.onBoom(enemy, bullet);
				break;
		}
		bullet.isLock = false;
	}

	static async onGun(enemy: EnemyBase, bullet: BulletBase) {
		let baseAttack = ~~bullet.prop.attack;
		let damage = baseAttack;
		let a = Math.random();
		if (a < bullet.prop.critRate) {
			damage = baseAttack * (1 + bullet.prop.critMultiplier);
		}
		enemy.onGetHit(damage);
		bullet.prop.penetr -= 1;
		bullet.prop.speed *= bullet.prop.speedDecay;
		bullet.prop.attack *= bullet.prop.speedDecay;
		if (bullet.prop.reflect) {
			bullet.angle = 180 - bullet.angle;
		}
		if (bullet.prop.penetr < 1) {
			bullet.node.destroy();
		}
		if (bullet.prop.boom) {
			bullet.run = false;
			bullet.node.active = false;
			let boom = await this.addBoom();
			boom.parent = bullet.node.parent;
			boom.position = bullet.node.position;
			bullet.node.destroy();
			return;
		}
		if (bullet.prop.splitTimes > 0) {
			bullet.prop.splitTimes -= 1;
			let interDir = 30; //-bullet.prop.splitCount**2;
			let start = ((bullet.prop.splitCount - 1) * interDir) / 2;
			for (let i = 0; i < bullet.prop.splitCount; i++) {
				let node = instantiate(bullet.node);
				node.getComponent(Sprite).color = new Color('#ffff00');
				node.active = true;
				let tmpBullet = node.getComponent(BulletBase);
				tmpBullet.angle = bullet.angle;
				tmpBullet.angle += start - interDir * i;
				tmpBullet.ignoreEnemys.push(enemy.node);
				tmpBullet.prop = bullet.prop;
				tmpBullet.prop.splitTimes -= 1;
				node.parent = bullet.node.parent;
				node.position = bullet.node.position;
				tmpBullet.run = true;
			}
		}
	}

	static onBoom(enemy: EnemyBase, bullet: BulletBase) {
		let baseAttack = ~~bullet.prop.attack;
		let damage = baseAttack;
		enemy.onGetHit(damage);
		bullet.node.destroy();
	}

	static async addBoom() {
		let prefab = await models.assetMgr.load('prefabs/skillEffects/boom', Prefab);
		return instantiate(prefab);
	}
}
