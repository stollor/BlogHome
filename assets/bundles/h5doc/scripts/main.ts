import { _decorator, Component, JsonAsset, Node } from 'cc';

import { DEV } from 'cc/env';
import { Holder, InterData, ScrollAdapter, WrapMode } from '../../../models/adapter';
import { TabItem } from './tab-item';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
	@property(ScrollAdapter) compList: ScrollAdapter;
	@property(Node) nodeItem: Node;
	@property(JsonAsset) jsonAsset: JsonAsset;

	public path: string = './config/';

	start() {
		models.assetMgr.defaultBundleName = 'h5doc';
		this.compList.prefabMap.set('tableItem', this.nodeItem);
		if (!DEV) {
			models.electron.on('main_doc_read', this.onReadDoc.bind(this));
			models.electron.emit('render_doc_read', this.path + 'doc.json');
		} else {
			this.refresh(this.jsonAsset.json);
		}
	}

	setTableItem(data) {
		let interData: InterData = {
			prefab: 'tableItem',
			onShow: (holder: Holder) => {
				holder.node.getComponent(TabItem).refresh(data);
			},
			element: {
				wrapBeforeMode: WrapMode.Auto,
				wrapAfterMode: WrapMode.Auto,
			},
		};
		return interData;
	}

	onReadDoc(data) {
		console.log(data);
		this.refresh(data.data);
	}

	refresh(data) {
		console.log(data);
		this.compList.modelManager.clear();
		this.compList.modelManager.insert(data, this.setTableItem.bind(this));
	}
}
