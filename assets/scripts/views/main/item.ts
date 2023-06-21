import { _decorator, Button, CCString, Color, Component, director, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('item')
export class item extends Component {
	@property(Sprite) bg: Sprite;
	@property(CCString) sceneName: string = '';

	private _scale: number = 3;
	private _time: number = 0;
	private _colorSeedR: number = 0;
	private _colorSeedG: number = 0;
	private _colorSeedB: number = 0;

	start() {
		this.node.on(Button.EventType.CLICK, this.onButtonEvent, this);
		this._colorSeedR = Math.random() * 180;
		this._colorSeedG = Math.random() * 180;
		this._colorSeedB = Math.random() * 180;
	}

	onButtonEvent() {
		director.loadScene(this.sceneName);
	}

	update(dt: number) {
		var r = Math.sin(((this._time + this._colorSeedR) / 180) * Math.PI) * 255;
		var g = Math.sin(((this._time + this._colorSeedG) / 180) * Math.PI) * 255;
		var b = Math.sin(((this._time + this._colorSeedB) / 180) * Math.PI) * 255;
		this.bg.color = new Color(r, g, b);
		//this._time = this._time + dt;
		this._time = (this._time + dt * this._scale) % 180;
	}
}
