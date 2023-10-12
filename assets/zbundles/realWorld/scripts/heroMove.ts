import {
	CCFloat,
	Collider2D,
	Component,
	Contact2DType,
	EventKeyboard,
	Input,
	KeyCode,
	Node,
	RigidBody2D,
	_decorator,
	input,
	v2,
} from 'cc';
const { ccclass, property } = _decorator;

let XSpeed = 0;
let YSpeed = 0;
@ccclass('HeroMove')
export class HeroMove extends Component {
	@property(RigidBody2D) rigidbody: RigidBody2D = null;
	@property(CCFloat) speed: number = 10;
	@property(CCFloat) jumpF: number = 10;
	@property(CCFloat) jumpSpeed: number = 10;
	@property(CCFloat) jumpInter: number = 0.2; //跳跃间隔时间
	@property(CCFloat) jumpDuration: number = 3; //跳跃上升持续时间

	public canJump = true;
	public jumping = false;
	public jumpUpTime = 0;

	start() {
		input.on(Input.EventType.KEY_DOWN, this.onTouchStart, this);
		input.on(Input.EventType.KEY_UP, this.onTouchEnd, this);
		// 注册单个碰撞体的回调函数
		let collider = this.getComponent(Collider2D);
		if (collider) {
			collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
			collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
			collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
			collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
		}
		this.node.on(Node.EventType.TRANSFORM_CHANGED, this.onTransformChanged, this);
	}

	static Input = Object.create(null);

	onTouchStart(event: EventKeyboard) {
		HeroMove.Input[event.keyCode] = true;
	}

	onTouchEnd(event: EventKeyboard) {
		HeroMove.Input[event.keyCode] = false;
	}

	onTransformChanged() {
		if (!this.jumping) {
			models.em.emit('Player-Move-Cream', { pos: this.node.worldPosition });
		}
	}

	onBeginContact(contact: any, selfCollider: any, otherCollider: any) {
		console.log('on collision enter');
		this.jumpUpTime = 0;
		this.jumping = false;
	}

	onEndContact(contact: any, selfCollider: any, otherCollider: any) {
		console.log('on collision exit');
	}

	onPreSolve(contact: any, selfCollider: any, otherCollider: any) {
		console.log('on collision stay');
	}

	onPostSolve(contact: any, selfCollider: any, otherCollider: any) {
		console.log('on collision stay');
	}

	update(deltaTime: number) {
		XSpeed = 0;
		YSpeed = 0;
		if (HeroMove.Input[KeyCode.KEY_A]) {
			XSpeed -= this.speed;
		}
		if (HeroMove.Input[KeyCode.KEY_D]) {
			XSpeed += this.speed;
		}
		if (HeroMove.Input[KeyCode.SPACE]) {
			this.jumpUpTime += deltaTime;
			if (this.jumpUpTime > this.jumpDuration) {
				//this.jumpUpTime=0;
			} else {
				this.jumping = true;
				this.rigidbody.applyForceToCenter(v2(0, this.jumpF), true);
			}
			// if (this.canJump) {
			// 	YSpeed += this.jumpSpeed;
			// 	this.canJump = false;
			// 	this.jumping = true;
			// 	this.scheduleOnce(() => {
			// 		this.jumping = false;
			// 		this.canJump = true;
			// 	}, this.jumpInter);
			// }
			// if (this.jumping && this.jumpUpTime < this.jumpDuration) {
			// 	this.rigidbody.applyForceToCenter(v2(0, this.jumpF), true);
			// 	this.jumpUpTime += deltaTime;
			// }
		} else {
		}
		//this.rigidbody.applyForceToCenter(v2(0, YSpeed), true);
		//this.rigidbody.applyLinearImpulseToCenter(v2(0, this.jumpSpeed), true);
		this.rigidbody.linearVelocity = v2(XSpeed, YSpeed);
	}

	onJumpUp() {}

	onJumpDown() {}
}
