declare global {
	var models: ModelMgr;
}

export class ModelMgr {
	public static instance: ModelMgr;
}

globalThis.models = ModelMgr.instance = new ModelMgr();
