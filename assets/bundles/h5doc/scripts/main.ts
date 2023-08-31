import { _decorator, Component, game, JsonAsset, Node } from 'cc';
import { DEV } from 'cc/env';
import { Holder, InterData, ScrollAdapter, WrapMode } from '../../../models/adapter';
import { ConfigNet } from './net';
import { TabItem } from './tab-item';
const { ccclass, property } = _decorator;
/**构建平台是不是electron */
export enum buildPlantfromType {
	/**electron打包版本*/
	electron = 'electron',
	/**webb本地调试*/
	webDev = 'webDev',
	/**通过服务器获取config */
	webServer = 'webServer',
}
export var buildPlantfrom = buildPlantfromType.webServer;

@ccclass('main')
export class main extends Component {
	@property(ScrollAdapter) compList: ScrollAdapter;
	@property(Node) nodeItem: Node;
	@property(JsonAsset) jsonAsset: JsonAsset;

	public path: string = './config/';

	start() {
		game.frameRate = 41;
		models.assetMgr.defaultBundleName = 'h5doc';
		this.compList.prefabMap.set('tableItem', this.nodeItem);
		this.init();
	}

	init() {
		if (DEV) buildPlantfrom = buildPlantfromType.webDev;
		switch (buildPlantfrom) {
			case buildPlantfromType.electron: {
				models.electron.on('main_doc_read', this.onReadDoc.bind(this));
				models.electron.emit('render_doc_read', this.path + 'doc.json');
				break;
			}
			case buildPlantfromType.webDev: {
				this.refresh(this.jsonAsset.json.data);
				break;
			}
			case buildPlantfromType.webServer: {
				ConfigNet.getFile('doc.json', this.onReadDoc.bind(this));
				break;
			}
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
		this.refresh(data.data);
	}

	refresh(data) {
		console.log('refresh', data);
		this.compList.modelManager.clear();
		this.compList.modelManager.insert(data, this.setTableItem.bind(this));
	}
}
