import { _decorator, Component, log, Node, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CSpineUtil')
export class CSpineUtil extends Component {
	public static getSpineComponent(obj: sp.Skeleton | Node) {
		if (!obj) return;
		var spine: sp.Skeleton = null;
		if (obj instanceof sp.Skeleton) {
			spine = obj;
		} else if (obj instanceof Node) {
			spine = obj.getComponent(sp.Skeleton);
		}

		return spine;
	}

	/**
	 * 寻找皮肤
	 * @param obj spine组件
	 * @param name  皮肤名称
	 * @returns
	 */
	public static findSkin(obj: sp.Skeleton | Node, name: string): boolean {
		var spine = this.getSpineComponent(obj);
		if (!spine) return false;
		spine.node.active = true;
		try {
			for (let i in spine.skeletonData.getSkinsEnum()) {
				if (i == name) {
					return true;
				}
			}
			return false;
		} catch (e) {
			log(`设置皮肤${name}出错`);
			log(e);
		}
	}

	/**
	 * 设置spine数据
	 * @param obj spine组件
	 * @param data  数据
	 * @returns
	 */
	public static setData(obj: sp.Skeleton | Node, data: sp.SkeletonData) {
		var spine = this.getSpineComponent(obj);
		if (!spine) return false;
		spine.node.active = false;
		spine.destroyRenderData();
		spine.skeletonData = data;
	}

	/**
	 * 设置spine数据 通过资源路径
	 * @param obj
	 * @param path 资源路径
	 * @param cb
	 */
	public static setDataRes(obj: sp.Skeleton | Node, path: string, cb: Function) {
		globalThis.gameManager.resMgr.loadSpineData(path, (e, p) => {
			this.setData(obj, p);
			cb && cb(obj);
		});
	}

	/**
	 * 设置皮肤
	 * @param obj spine组件
	 * @param name  皮肤名
	 */
	public static setSkine(obj: sp.Skeleton | Node, name: string) {
		var spine = this.getSpineComponent(obj);
		spine.node.active = true;
		if (this.findSkin(obj, name)) {
			spine.setSkin(name);
			spine.node.active = true;
		} else {
			spine.node.active = false;
		}
	}

	/**
	 * 播放spine动画
	 * @param node  spine节点
	 * @param aniName 动画名称
	 * @param timeScale 倍速
	 * @param cb 回调 (0,spine)完成 (1,name)帧事件 (-1,null)
	 * @param ifLoop 是否循环
	 * @returns
	 */
	public static playSpine(
		node: sp.Skeleton | Node,
		aniName: string,
		timeScale: number,
		cb?: (type: number, data: any) => void,
		ifLoop: boolean = false,
		i18: boolean = false
	) {
		var spine = this.getSpineComponent(node);

		if (!spine.findAnimation(aniName)) {
			cb && cb(-1, null);
			return;
		}
		spine.setToSetupPose();
		spine.timeScale = timeScale;
		spine.setAnimation(0, aniName, ifLoop);
		spine.setEventListener(((trackEntry: any, event: any) => {
			cb && cb(1, event.data.name);
		}) as any);
		spine.setCompleteListener((trackEntry) => {
			cb && cb(0, spine);
		});
	}

	/**
	 * 播放spine动画
	 * @param node 节点
	 * @param aniName  动画名称
	 * @param cb 回调 (0,spine)完成 (1,name)帧事件
	 * @param ifLoop 是否循环
	 * @returns
	 */
	public static playSpineLimimt(
		node: Node,
		aniName: string,
		timeScale: number,
		from: number,
		to: number,
		cb?: (type: number, data: any) => void,
		ifLoop: boolean = false
	) {
		var spine = this.getSpineComponent(node);
		if (!spine.findAnimation(aniName)) {
			return;
		}
		spine.setToSetupPose();
		spine.timeScale = timeScale;
		spine.setAnimation(0, aniName, ifLoop);
		this.limitSpineFrame(spine, 0, from, to);
		spine.setEventListener(((trackEntry: any, event: any) => {
			cb && cb(1, event.data.name);
		}) as any);
		spine.setCompleteListener((trackEntry) => {
			cb && cb(0, spine);
		});
	}

	/**
	 * 限定spine动画播放的帧数
	 * @param spine
	 * @param index
	 * @param from
	 * @param end
	 */
	public static limitSpineFrame(spine: sp.Skeleton, index: number, from: number, end: number) {
		var frameRate = 30; //默认帧率
		var secondsPerFrame = 1 / frameRate;
		var beginTime = from * secondsPerFrame;
		var endTime = end * secondsPerFrame;
		spine.getCurrent(index).animationStart = beginTime;
		spine.getCurrent(index).animationEnd = endTime;
	}

	/**
	 * 给spine动画添加挂点
	 * @param spine 动画节点
	 * @param name  挂点对应的骨骼名称
	 * @param node  挂点
	 */
	public static addSocket(spine: sp.Skeleton, name: string, node: Node) {
		var bone = spine.findBone(name);
		if (!bone) return;
		var path = bone.data.name;
		while (bone.parent) {
			path = bone.parent.data.name + '/' + path;
			bone = bone.parent;
		}
		var socket = new sp.SpineSocket(path, node);
		spine.sockets.push(socket);
		spine.sockets = spine.sockets;

		// let attachUtil=spine.attachUtil;
		// attachUtil.generateAllAttachedNodes();
		// let boneNodes=attachUtil.getAttachedNodes(name);
		// let boneNode=boneNodes[0];
		// boneNode.addChild(node);
	}

	/**获取动画时长 */
	public static getAniTime(spine: sp.Skeleton, name: string) {
		//@ts-ignore
		return spine?.skeletonData?._skeletonCache?.animations?.filter((item) => item.name == name)?.[0]?.duration;
	}
}
