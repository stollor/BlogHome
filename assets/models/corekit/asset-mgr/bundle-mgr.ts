import { AssetManager, assetManager } from 'cc';
import { catchAsync, catchError } from '../decorater/function';

export class BundleMgr {
	private _lock: Map<string, boolean>;

	constructor() {
		this._lock = new Map();
	}

	@catchAsync('获取bundle')
	public async getBundle(name: string): Promise<AssetManager.Bundle> {
		return new Promise(async (resolve, reject) => {
			let bundle = assetManager.getBundle(name) || (await this.loadBundle(name));
			if (bundle) {
				resolve(bundle);
			} else {
				reject(`bundle ${name} 不存在`);
			}
		});
	}

	/**
	 * 加载bundle
	 * @param name bundle名字
	 * @returns
	 */
	@catchAsync('加载bundle')
	public async loadBundle(name: string): Promise<AssetManager.Bundle> {
		if (this._lock.get(name)) {
			return Promise.reject(`bundle ${name} 正在加载中`);
		}
		this._lock.set(name, true);
		const bundle = await new Promise<AssetManager.Bundle>((resolve, reject) => {
			assetManager.loadBundle(name, (err, bundle) => {
				if (err) reject(err);
				else resolve(bundle);
			});
		});
		this._lock.delete(name);
		return bundle;
	}

	/**
	 * 移除对应bundle并释放全部资源
	 * @param name bundle名字
	 */
	@catchError('移除bundle')
	public removeBundle(name: string) {
		let bundle = assetManager.getBundle(name);
		if (bundle) {
			bundle.releaseAll();
			this._lock.set(name, false);
			assetManager.removeBundle(bundle);
			return false;
		}
		return true;
	}
}
