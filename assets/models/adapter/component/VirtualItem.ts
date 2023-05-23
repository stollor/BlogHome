import { Button, Component, _decorator } from 'cc';
import { Holder } from '../abstract/Holder';
import { IVirtualItem } from '../define/interface';
const { ccclass } = _decorator;

@ccclass('VirtualItem')
export class VirtualItem extends Component {
	private _holder: Holder<IVirtualItem>;
	private _onClickEvent: Function;

	public get holder(): Holder<IVirtualItem> {
		return this._holder;
	}

	start() {
		this.node.on(Button.EventType.CLICK, this.onClick, this);
	}

	onClick() {
		this._onClickEvent?.(this._holder);
	}

	onCreat(holder: Holder<IVirtualItem>) {
		this._holder = holder;
		this._holder.interdata?.onCreate?.(this._holder);
	}

	show(holder: Holder<IVirtualItem>) {
		this._holder = holder;
		this._holder.interdata!.onShowAni?.(this._holder);
		this._holder.interdata?.onShow?.(this._holder);
		this._onClickEvent = this._holder.interdata?.onClick;
	}

	hide(holder: Holder<IVirtualItem>) {
		this._holder = holder;
		this.node.active = false;
	}
}
