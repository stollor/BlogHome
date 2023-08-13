import { _decorator, Color, Component, instantiate, JsonAsset, Label, Node, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('doctable')
export class doctable extends Component {
	@property(Node) nodeContent: Node;
	@property(Node) nodeItemItemParent: Node;
	@property(Node) nodeItemTypeParent: Node;

	start() {
		models.em.on('TableItem-onClick', this.onItemClick, this);
	}

	onItemClick(msg: string) {
		models.assetMgr.load('config/' + msg, JsonAsset).then(
			(jsonAsset: JsonAsset) => {
				this.refresh(jsonAsset.json);
			},
			() => {
				this.nodeContent.removeAllChildren();
			}
		);
	}

	refresh(data) {
		this.nodeContent.removeAllChildren();
		for (let key in data) {
			if (Object.hasOwnProperty.call(data, key)) {
				this._refresh(key, data[key]);
			}
		}
	}

	_refresh(key, val) {
		switch (key) {
			case 'info': {
				this.addInfo(val);
				break;
			}
			case 'interface': {
				this.addInterface(val);
				break;
			}
			case 'database': {
				this.addDatabase(val);
				break;
			}
			case 'param': {
				this.refreshParam(val);
				break;
			}
			default:
				console.log('config err', key, val);
				break;
		}
	}

	addInfo(data: any) {
		let infoItem = this.nodeItemTypeParent.getChildByName('info');
		let info = instantiate(infoItem);
		info.parent = this.nodeContent;

		info.getChildByName('Label').setStr(data);
	}

	addInterface(data: any) {
		let mainItem = this.nodeItemTypeParent.getChildByName('interface');
		let item = this.nodeItemItemParent.getChildByName('interfaceItem');
		let node = instantiate(mainItem);
		node.parent = this.nodeContent;

		let content = node.getChildByName('content');
		for (let i = 0; i < data?.length; i++) {
			let itemNode = instantiate(item);
			let itemData = data[i];
			itemNode.getChildByName('name').setStr(itemData.name);
			itemNode.getChildByName('url').setStr(itemData.url);
			itemNode.getChildByName('param').setStr(itemData.param);
			itemNode.getChildByName('return').setStr(itemData.return);
			itemNode.getChildByName('desc').setStr(itemData.desc);
			this.setIndexStyle(itemNode, i);
			content.addChild(itemNode);
		}
	}

	addDatabase(data: any) {
		let mainItem = this.nodeItemTypeParent.getChildByName('database');
		let item = this.nodeItemItemParent.getChildByName('databaseItem');
		let node = instantiate(mainItem);
		node.parent = this.nodeContent;

		let content = node.getChildByName('content');
		for (let i = 0; i < data?.length; i++) {
			let itemNode = instantiate(item);
			let itemData = data[i];
			itemNode.getChildByName('name').setStr(itemData.name);
			itemNode.getChildByName('type').setStr(itemData.type);
			itemNode.getChildByName('desc').setStr(itemData.desc);
			content.addChild(itemNode);
			this.setIndexStyle(itemNode, i);
		}
	}

	refreshParam(data: any) {
		let mainItem = this.nodeItemTypeParent.getChildByName('param');
		let itemItem = this.nodeItemItemParent.getChildByName('paramItem');
		for (let i = 0; i < data?.length; i++) {
			let mian = instantiate(mainItem);
			mian.parent = this.nodeContent;
			this._refreshParam(mian, data[i], itemItem);
		}
	}

	_refreshParam(node: Node, data: any, itemItem: Node) {
		let str = data.name + '          ' + data.desc;
		node.getChildByName('title').setStr(str);
		let content = node.getChildByName('content');
		if (data.param) {
			content.active = true;
			for (let i = 0; i < data.param.length; i++) {
				let item = instantiate(itemItem);
				item.parent = content;
				this._refreshParam(item, data.param[i], itemItem);
			}
		} else {
			content.active = false;
		}
	}

	setIndexStyle(node: Node, index: number) {
		let color = index % 2 == 0 ? '#ccd5ae' : '#e9edc9';
		node.getComponent(Sprite).color = new Color(color);
		let labelSize = index == 0 ? 27 : 20;
		let labelBold = index == 0 ? true : false;
		node.children.forEach((child) => {
			child.getComponent(Label).fontSize = labelSize;
			child.getComponent(Label).isBold = labelBold;
		});
		this.scheduleOnce(() => {
			let maxheight = 0;
			node.children.forEach((child) => {
				maxheight = Math.max(maxheight, child.getComponent(UITransform).height);
			});
			node.getComponent(UITransform).height = maxheight + 20;
		});
	}
}
