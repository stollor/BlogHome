import { _decorator, assetManager, CCString, Component, director, JsonAsset, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Start')
export class Start extends Component {
	@property(Label) lbProgress: Label;
	@property(CCString) bundleName: string = 'h5doc';

	start() {}

	init() {
		assetManager.loadBundle('corekit', (err, bundle) => {
			if (err) {
				console.error(err);
				console.log('框架初始化错误!');
				return;
			}
			this.loadAsset();
		});
	}

	async loadAsset() {
		this.lbProgress.string = '0%';
		let jsonAsset = await models.assetMgr.load('bundleConfig', JsonAsset, this.bundleName);
		let list = jsonAsset.json.models;
		let startScene = jsonAsset.json.start;
		for (let i = 0; i < list.length; i++) {
			let bundle = await models.assetMgr.bundleMgr.loadBundle(list[i]);
			this.lbProgress.string = `${Math.floor((i / list.length) * 100)}%`;
		}
		this.loadCB(startScene);
	}

	async loadCB(startScene) {
		this.lbProgress.string = '100%';
		this.switchBundle(startScene);
	}

	async switchBundle(startScene) {
		models.assetMgr.defaultBundleName = this.bundleName;
		let bundle = await models.assetMgr.bundleMgr.getBundle(this.bundleName);
		bundle.loadScene(`${startScene}`, function (err, scene) {
			director.runScene(scene);
		});
	}
}
