import { SpineUtil } from './spine';
import { DrawUtil } from './draw';
import { FitUtil } from './fit';
import { MemoryUtil } from './memory';
import { TweenUtil } from './tween';
import { ToolUtil } from './tool';

declare namespace models {
	interface model {
		utils: Utils;
	}
}

export class Utils {
	declare static instance: Utils;

	public spine: SpineUtil;
	public draw: DrawUtil;
	public fit: FitUtil;
	public memory: MemoryUtil;
	public tween: TweenUtil;
	public tool: ToolUtil;

	constructor() {
		this.spine = new SpineUtil();
		this.draw = new DrawUtil();
		this.fit = new FitUtil();
		this.memory = new MemoryUtil();
		this.tween = new TweenUtil();
		this.tool = new ToolUtil();
	}
}

//@ts-ignore
globalThis.models = globalThis.models || ({} as models.model);
//@ts-ignore
globalThis.models.utils = Utils.instance = new Utils();
