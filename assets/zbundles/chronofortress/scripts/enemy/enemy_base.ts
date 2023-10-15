import { Collider2D, Color, Component, Contact2DType, Sprite, _decorator } from 'cc';
import { DamageCount } from '../battle/damageCount';
import { PHY_GROUP } from '../define/physics';
import { EffectController } from '../effect/effect_controller';
import { Wall } from '../wall/wall';
import { BulletBase } from '../weapons/bullet_base';
import { EnemyProp } from './enemy_prop';
const { ccclass, property } = _decorator;

@ccclass('EnemyBase')
export class EnemyBase extends Component {
	@property(Collider2D) collider: Collider2D = null;

	private _baseProp: EnemyProp;
	public get baseProp(): EnemyProp {
		return this._baseProp;
	}
	public set baseProp(value: EnemyProp) {
		this._baseProp = value;
	}
	private _nowProp: EnemyProp;
	public get prop(): EnemyProp {
		return this._nowProp;
	}
	public set prop(value: EnemyProp) {
		this._nowProp = value;
	}

	//状态控制
	private _move: boolean = false;
	private _attack: boolean = false;

	//专属变量
	private _cumAttackTime: number = 0;
	private _objAttack: Wall = null;
	private _onHitColorCount: number = 0;

	constructor() {
		super();
		this._baseProp = new EnemyProp();
		this._nowProp = models.utils.tool.deepClone(this._baseProp);
	}

	onLoad() {
		this.collider.group = PHY_GROUP.ENEMY;
		this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
		this.node.on('attack', this.onAttack, this);
		this._move = true;
		this._attack = false;
	}

	onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
		if (otherCollider.group == PHY_GROUP.SKILL) {
			let buttle = otherCollider.node.getComponent(BulletBase);
			if (buttle.ignoreEnemys.indexOf(selfCollider.node) >= 0) return;
			if (!buttle.isLock) {
				DamageCount.check(this, buttle);
			}

			// this.onGetHit(otherCollider.node.getComponent(Bullet).propAttack);
		} else if (otherCollider.group == PHY_GROUP.WALL) {
			this._objAttack = otherCollider.node.getComponent(Wall);
			this._move = false;
			this._attack = true;
		}
	}

	update(deltaTime: number) {
		if (this._move) {
			this.node.move(0, -this.prop.speed * deltaTime);
		}
		if (this._attack) {
			this._cumAttackTime += deltaTime;
			if (this._cumAttackTime >= this.prop.attackInterval) {
				this._cumAttackTime = 0;
				this.node.emit('attack', this.prop.attack);
			}
		}
	}

	onAttack(attack: number) {
		if (this._objAttack) {
			this._objAttack.prop.hp -= attack;
		}
	}

	onGetHit(attack: number) {
		let resultAttack = attack;
		this.prop.hp -= resultAttack;
		this._onHitColor();
		EffectController.instance.showAttackLabel(this.node, resultAttack * -1);
		if (this.prop.hp <= 0) {
			this.onDead();
		}
	}

	onDead() {
		this.unscheduleAllCallbacks();
		this.node.destroy();
	}

	_onHitColor() {
		this._onHitColorCount++;
		this.node.getComponent(Sprite)!.color = new Color('#FF2333');
		this.scheduleOnce(() => {
			this._onHitColorCount--;
			if (this._onHitColorCount <= 0) {
				this.node.getComponent(Sprite)!.color = new Color('#FFFFFF');
			}
		});
	}
}
