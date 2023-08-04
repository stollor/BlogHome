import { _decorator, Label, Node, RichText, Sprite, SpriteFrame, UIOpacity, UITransform } from 'cc';
import { Data } from '../../../models/data/data';
const { ccclass, property } = _decorator;

declare module 'cc' {
	interface Node {
		/**增加的方法 */
		setStr: (str: string | number) => void;
		setImg: (frame: SpriteFrame) => void;

		/**扩展的方法 */
		//on: (type, callback, target, useCapture?, video?) => void;
		//oparity:number;
		oparity: number;
		ui: UITransform;
		zIndex: number;
		bindData: (data: Data) => void;
		move: (x: number, y: number) => void;
		moveAnchorTo: (x: number, y: number) => void;
	}
}

/**
 * 设置文字
 */
Node.prototype.setStr = function (str: string | number) {
	let comp = this.getComponent(Label);
	if (!comp) comp = this.getComponent(RichText);
	if (comp) comp.string = str;
};

Node.prototype.setImg = function (frame: SpriteFrame) {
	let comp = this.getComponent(Sprite);
	if (!comp || !frame) {
		console.error(`setImg error:${this.name}`);
		return;
	}
	comp.spriteFrame = frame;
	comp.markAsset(frame);
};

Node.prototype.bindData = function (data: Data) {
	data.addListener((val) => {
		this.setStr(val);
	});
};

Node.prototype.move = function (x: number, y: number) {
	this.setPosition(this.position.x + x, this.position.y + y);
	this.emit('node-moving');
};

Node.prototype.moveAnchorTo = function (x: number | null | undefined, y: number | null | undefined) {
	let ui = this.getComponent(UITransform);
	if (ui) {
		if (x === null || x === undefined) x = ui.anchorX;
		if (y === null || y === undefined) y = ui.anchorY;
		this.move((x - ui.anchorX) * ui.width, (y - ui.anchorY) * ui.height);
		ui.anchorX = x;
		ui.anchorY = y;
	}
};
// Node.prototype.transPosto = function (node:Node,off:Vec3){
//     var nodeWordPos = this.parent.convertToWorldSpaceAR(this.position);
//     var myParentSpacePosition = this.parent.convertToNodeSpaceAR(nodeWordPos);
// }

Object.defineProperty(Node.prototype, 'oparity', {
	configurable: true,
	enumerable: false,
	set(value) {
		let sp = this.getComponent(UIOpacity);
		if (!sp) sp = this.addComponent(UIOpacity);
		sp.opacity = value;
	},
	get() {
		let sp = this.getComponent(UIOpacity);
		if (!sp) sp = this.addComponent(UIOpacity);
		return sp.opacity;
	},
});

Object.defineProperty(Node.prototype, 'ui', {
	configurable: true,
	enumerable: false,
	get() {
		return this.getComponent(UITransform);
	},
});

Object.defineProperty(Node.prototype, 'zIndex', {
	configurable: true,
	enumerable: false,
	get() {
		if (this['_zIndex'] === undefined) {
			if (this.getSiblingIndex() == 0) {
				this['_zIndex'] = 0;
			} else {
				this['_zIndex'] = this.parent.children[this.getSiblingIndex() - 1].zIndex + 1;
			}
			return this['_zIndex'];
		} else {
			return this['_zIndex'];
		}
	},
	set(value: number) {
		this['_zIndex'] = value;
		let siblingIndex = 0;
		for (let i = 0; i < this.parent.children.length; i++) {
			let item = this.parent.children[i];
			if (item == this) continue;
			if (item.zIndex <= value) {
				siblingIndex = item.getSiblingIndex();
			} else {
				break;
			}
		}
		this.setSiblingIndex(siblingIndex);
	},
});

// let originOparity = Object.getOwnPropertyDescriptor(Node.prototype, "oparity")

// let originGet = originOparity.get

// originOparity.get = function() {

//     return 255

// }

// originOparity.set = function(val:number) {
//     console.log(val)

// }
