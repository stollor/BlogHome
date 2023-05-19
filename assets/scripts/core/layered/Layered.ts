import { CCObject, Component, Mask, Node, UIRenderer, _decorator, js } from 'cc';
import { LayerLink } from './LayerLink';
const { ccclass, property } = _decorator;
export const LOCK = 'Layer:Lock';
export const ACTIVE = 'Layer:Active';
export const LOCAL_POSITION = 'Layer:Local_position';
export const CACHE_POSITION = 'Layer:Cache_position';
export enum LayerEvent {
	Position = 'Layer:Position',
	Scale = 'Layer:Scale',
	Active = 'Layer:Active',
	AddChild = 'Layer:AddChild',
	RemChild = 'Layer:RemChild',
	Destroy = 'Layer:Destroy',
}
@ccclass('Layered')
export class Layered extends Component {
	private _container: Node;
	private _link: LayerLink;
	private _layerMap: Map<string, Node> = new Map();
	__preload() {
		// return
		const render = this.verifyLayer(this.node, false);
		if (render) {
			this._container = new Node(`${this.node.name}_layer`);
			this._container.parent = this.node.parent;
			this._container.setSiblingIndex(this.node.getSiblingIndex());
		} else {
			this._container = this.node;
		}
		this._link = this.node.addComponent(LayerLink);
		this._link.create(this, null).initLayer();
	}
	start() {
		if (this._link) {
			console.log('开始发送消息', this._link.node.name, this._link.node.worldPosition);
			this._link.node.emit(LayerEvent.Position, this._link.node.worldPosition);
		}
	}
	public isSkip(node: Node) {
		if (this.isFilterRender(node.getComponent(UIRenderer))) {
			return true;
		}
		return false;
	}
	public verifyLayer(target: Node, create: boolean = true): string {
		const render = this._getRenders(target);
		if (!render) return null;
		var name = js.getClassName(render);
		if (create) {
			if (!this._layerMap.has(name)) {
				var layer = new Node(name);
				layer.parent = this._container;
				this._layerMap.set(name, layer);
			}
		}
		return name;
	}
	private _getRenders(target: Node) {
		var render = target.getComponent(UIRenderer);
		if (this.isFilterRender(render)) {
			return null;
		}
		return render;
	}
	public getLayer(name: string): Node {
		if (this._layerMap.has(name)) {
			return this._layerMap.get(name);
		}
		return null;
	}
	public getDescriptor(obj: any, key: string): PropertyDescriptor | null {
		let object = obj,
			descriptor;
		do {
			descriptor = Object.getOwnPropertyDescriptor(object, key);
			object = Object.getPrototypeOf(object);
			if (descriptor) {
				return descriptor.get || descriptor.set ? descriptor : null;
			}
		} while (object);
		return null;
	}
	public isFilterRender(render: UIRenderer) {
		if (render instanceof Mask) {
			return true;
		}
		return false;
	}
	public isFilterNode(node: Node) {
		if (node.hideFlags == CCObject.Flags.DontSave + CCObject.Flags.HideInHierarchy) {
			return true;
		}
		return false;
	}
}
