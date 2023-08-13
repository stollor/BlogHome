import { AssetManager, assetManager } from 'cc';
import { catchAsync, catchError } from '../decorater/function';
import { Scheduler } from 'cc';

/**
 * bundle管理器
 * @description 用于管理bundle的加载和释放
 * @example
 * ```ts
 * // 加载bundle
 * await assetsMgr.bundleMgr.loadBundle('h5doc');
 * // 获取bundle
 * let bundle = await assetsMgr.bundleMgr.getBundle('h5doc');
 * // 移除bundle
 * assetsMgr.bundleMgr.removeBundle('h5doc');
 * ```
 */
export class BundleMgr {
	private _lock: Map<string, Promise<AssetManager.Bundle>>;

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
	//@catchAsync('加载bundle')
	public async loadBundle(name: string): Promise<AssetManager.Bundle> {
		if (this._lock.get(name)) {
			console.error(`bundle ${name} 正在加载中`);
			return this._lock.get(name);
		}

		const promise = new Promise<AssetManager.Bundle>((resolve, reject) => {
			assetManager.loadBundle(name, (err, bundle) => {
				this._lock.delete(name);

				if (err) reject(err);
				else resolve(bundle);
			});
		});
		this._lock.set(name, promise);
		return promise;
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
			this._lock.delete(name);
			assetManager.removeBundle(bundle);
			return true;
		}
		return false;
	}

	public load(name, callback) {
		assetManager.loadBundle(name, callback);
	}
}
