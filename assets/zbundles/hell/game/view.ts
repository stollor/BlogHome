import { CCInteger, Component, Node, Prefab, Vec3, _decorator } from 'cc';
import { cCollider } from '../../../models/collision/Collider';
import { Ghost } from '../player/ghost';
import { Player } from '../player/player';

const { ccclass, property } = _decorator;

var tempPos = new Vec3();
@ccclass('GameView')
export class GameView extends Component {
	@property(Node) camera: Node;
	@property(Player) player!: Player;
	@property(Node) effect!: Node;
	@property(Node) enemy!: Node;
	@property(Node) showNum!: Node;
	@property(Prefab) skills: Prefab[] = [];
	@property(Prefab) ghost: Prefab;

	//简单模拟在周期时间内，以主角为中心的半径内产生敌人
	@property({ type: CCInteger, group: 'Enemy Config' })
	max: number = 1000; //多敌人同屏数

	@property({ group: 'Enemy Config' })
	raidus: number = 2000; //刷怪半径

	@property({ group: 'Enemy Config' })
	cyclTime: number = 0.3; //刷怪cd周期

	private static _instance: GameView = null;
	static get instance() {
		return this._instance;
	}

	protected onLoad(): void {
		GameView._instance = this;
	}

	protected start(): void {
		this.schedule(() => {
			if (this.enemy.children.length < this.max) {
				let ratio = 360 * Math.random();
				let x = Math.cos(ratio);
				let y = Math.sin(ratio);
				this.createEnemy(x, y);
				this.showNum.setStr('敌人数量：' + this.enemy.children.length);
			}
		}, this.cyclTime);
	}

	createEnemy(x: number, y: number) {
		//以主角为中心进行刷怪
		let center = Player.instance.node.getPosition();
		tempPos.x = (x - 0.5) * this.raidus + center.x;
		tempPos.y = (y - 0.5) * this.raidus + center.y;
		tempPos.z = 0; //更新位置
		let ghost = Ghost.get(this.ghost);
		ghost.node.parent = this.enemy;
		ghost.node.setPosition(tempPos);
		// enemy.init(); //初始化
	}

	getSkill(name: string) {
		let skill = this.skills.find((item) => item.name == name);
		return skill;
	}

	update(dt: number) {
		//运行碰撞检测
		cCollider.inst.update(dt);
	}

	lateUpdate(dt: number): void {
		//相机跟随
		const position = this.player.node.position;
		Vec3.lerp(tempPos, this.camera.position, position, 0.25);
		this.camera.setPosition(tempPos.x, tempPos.y, this.camera.position.z);
	}
}
