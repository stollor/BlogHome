import { Button, CCString, Color, Component, Sprite, _decorator, assetManager, director } from 'cc';
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
		globalThis.models.utils.tween.showStyle1(this.node);
	}

	onButtonEvent() {
		switch (this.sceneName) {
			case 'dieCell': {
				assetManager.loadBundle('realWorld', (err, bundle) => {
					director.loadScene('realWorld');
				});
				break;
			}

			case 'h5doc': {
				assetManager.loadBundle('h5doc', function (err, bundle) {
					bundle.loadScene('main', (err, sceneAsset) => director.runScene(sceneAsset));
				});
				break;
			}
			default: {
				director.loadScene(this.sceneName);
			}
		}
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
