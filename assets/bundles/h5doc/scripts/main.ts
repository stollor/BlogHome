import { _decorator, Component, JsonAsset, Node } from 'cc';

import { Holder, InterData, ScrollAdapter, WrapMode } from '../../../models/adapter';
import { TabItem } from './tab-item';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
	@property(ScrollAdapter) compList: ScrollAdapter;
	@property(Node) nodeItem: Node;
	@property(JsonAsset) jsonAsset: JsonAsset;

	start() {
		this.compList.prefabMap.set('tableItem', this.nodeItem);
		console.log(this.jsonAsset.json);
		this.compList.modelManager.clear();
		this.compList.modelManager.insert(this.jsonAsset.json.data, this.setTableItem.bind(this));
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
}
