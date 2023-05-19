import { Component, Node, _decorator, instantiate } from 'cc';
import { Gun } from '../skills/gun';
import { GameView } from '../view';

const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
	private static _instance: Player = null;
	public static get instance() {
		return this._instance;
	}

	public skills = [];

	protected onLoad(): void {
		Player._instance = this;
	}

	protected start(): void {
		for (let i = 0; i < 4; i++) {
			let gun = instantiate(GameView.instance.getSkill('gun'));
			this.node.addChild(gun);
			this.skills.push(gun.getComponent(Gun));
		}
	}

	attack(objectList: Node[]) {
		if (!objectList || objectList.length <= 0) return;
		this.skills.forEach((skill, i) => {
			skill.attack(objectList[i]?.getWorldPosition());
		});
	}
}
