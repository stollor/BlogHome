import { _decorator, assetManager, Component, director, Label } from 'cc';
import { assetsMgr } from '../models/corekit';
import { ToolUtils } from '../models/utils/utils';
const { ccclass, property } = _decorator;

@ccclass('Start')
export class Start extends Component {
	@property(Label) lbProgress: Label;

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
		await assetsMgr.bundleMgr.loadBundle('utils');
		this.loadCB();
	}

	async loadCB() {
		this.lbProgress.string = '100%';
		this.test();
		//this.switchBundle('dc');
	}

	async switchBundle(name: string) {
		assetsMgr.defaultBundleName = name;
		let bundle = await assetsMgr.bundleMgr.loadBundle(name);
		bundle.loadScene(`${name}`, function (err, scene) {
			director.runScene(scene);
		});
	}

	test() {
		console.log(assetsMgr);
		console.log(ToolUtils.deepClone(assetsMgr));
	}
}
