import { _decorator, Collider2D, Component, Label, ProgressBar, UITransform } from 'cc';
import { PHY_GROUP } from '../define/physics';
import { WallProp } from './wall_prop';
const { ccclass, property } = _decorator;

@ccclass('WallBase')
export class WallBase extends Component {
	@property(ProgressBar) hpBar: ProgressBar = null;
	@property(Label) hpLabel: Label = null;
	@property(Collider2D) collider: Collider2D = null;

	private _baseProp: WallProp;
	public get baseProp(): WallProp {
		return this._baseProp;
	}
	public set baseProp(value: WallProp) {
		this._baseProp = value;
	}
	private _nowProp: WallProp;
	public get prop(): WallProp {
		return this._nowProp;
	}
	public set prop(value: WallProp) {
		this._nowProp = value;
	}

	//状态控制

	//专属变量

	constructor() {
		super();
		this._baseProp = new WallProp();
		this._nowProp = models.utils.tool.deepClone(this._baseProp);
	}

	onLoad() {
		this.collider.group = PHY_GROUP.WALL;
		this._baseProp.node = this.node;
		this._nowProp.node = this.node;
		this.node.on('prop_hp_change', this.onHpChange, this);
		this.hpBar.totalLength = this.hpBar.node.getComponent(UITransform)!.width;
		this.hpBar.progress = 1;
		this.hpLabel.string = String(this._nowProp.hp);
	}

	onHpChange(hp: number) {
		this.hpLabel.string = String(this._nowProp.hp);
		this.hpBar.progress = this._nowProp.hp / this._baseProp.hp;
	}
}
