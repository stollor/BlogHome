import { Asset } from 'cc';
import { catchAsync } from '../decorater/function';
import { BundleMgr } from './bundle-mgr';

declare global {
	var assetsMgr: AssetsMgr;
}

export class AssetsMgr {
	declare static instance: AssetsMgr;
	private _bundleMgr: BundleMgr;

	public defaultBundleName: string = 'resources';

	constructor() {
		this._bundleMgr = new BundleMgr();
	}

	get bundleMgr(): BundleMgr {
		return this._bundleMgr;
	}

	@catchAsync('加载资源')
	public async load<T extends typeof Asset = typeof Asset>(url: string, type: T = Asset as T, bundleName: string = this.defaultBundleName): Promise<InstanceType<T>> {
		if (!bundleName) throw new Error('bundleName is empty');
		if (!url) throw new Error('url is empty');
		const bundle = await this._bundleMgr.getBundle(bundleName);
		const asset = await new Promise<InstanceType<T>>((resolve, reject) => {
			bundle.load(url, type, (err: any, asset: InstanceType<T>) => {
				if (err) reject(err);
				else resolve(asset as InstanceType<T>);
			});
		});
		return asset;
	}
}

const assetsMgr: AssetsMgr = (AssetsMgr.instance = new AssetsMgr());
globalThis.assetsMgr = assetsMgr;
