import { Asset, Component, DynamicAtlasManager, SpriteFrame, _decorator, isValid } from 'cc';
const { ccclass, menu, disallowMultiple } = _decorator;

@ccclass('AssetsAutoRelease')
export default class AssetsAutoRelease extends Component {
	private dynamicsAssets: Asset[] = [];

	public addAutoReleaseAsset(_asset: Asset) {
		if (isValid(_asset)) {
			_asset.addRef();
			this.dynamicsAssets.push(_asset);
		}
	}

	onDestroy(): void {
		for (let index = 0; index < this.dynamicsAssets.length; index++) {
			if (isValid(this.dynamicsAssets[index])) {
				this.dynamicsAssets[index].decRef();
				if (this.dynamicsAssets[index].refCount === 0 && this.dynamicsAssets[index] instanceof SpriteFrame) {
					DynamicAtlasManager.instance.deleteAtlasSpriteFrame(this.dynamicsAssets[index] as SpriteFrame);
				}
			}
		}
		this.dynamicsAssets = [];
	}
}

declare module 'cc' {
	interface Component {
		markAsset: (asset: Asset) => void;
		markAssets: (assets: Asset[]) => void;
	}
}

Component.prototype.markAsset = function (_asset: Asset) {
	let oneTempAuto = this.node.getComponent(AssetsAutoRelease) || this.node.addComponent(AssetsAutoRelease);
	oneTempAuto.addAutoReleaseAsset(_asset);
};

Component.prototype.markAssets = function (_assets: Asset[]) {
	let moreTempAuto = this.node.getComponent(AssetsAutoRelease) || this.node.addComponent(AssetsAutoRelease);
	for (const _assetSelf of _assets) {
		moreTempAuto.addAutoReleaseAsset(_assetSelf);
	}
};
