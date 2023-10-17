import { Component, Label, ProgressBar, _decorator } from 'cc';
const { ccclass, property } = _decorator;

var levelExp = [10, 100, 300, 500, 800, 1000];

@ccclass('Exp')
export class Exp extends Component {
	@property(ProgressBar) pbBar: ProgressBar;
	@property(Label) lbLevel: Label;
	private _level: number = 0;
	public get level(): number {
		return this._level;
	}

	private _val: number = 0;
	public get val(): number {
		return this._val;
	}

	start() {
		models.em.on('exp_add', this.onAddExp, this);
		this.refresh();
	}

	onAddExp(num: number) {
		this._val += num;
		while (this._val > levelExp[this.level]) {
			this._val -= levelExp[this.level];
			this._level += 1;
		}
		this.refresh();
	}

	refresh() {
		this.pbBar.progress = this.val / levelExp[this.level];
		this.lbLevel.string = String(this._level);
	}
}
