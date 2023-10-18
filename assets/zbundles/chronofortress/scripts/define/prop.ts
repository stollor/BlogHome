/**
 * 武器属性
 */
export interface WeaponProp {
	/**间隔时间 */
	interTime: number;
	/**子弹轨道数量 */
	track: number;
	/**波次 */
	wave: number;
	/**子弹速度 */
	speed: number;
	/**存在时间 */
	lifeTime: number;
	/**攻击力 */
	attack: number;
	/**穿透 */
	penetr?: number;
	/**暴击率*/
	critRate?: number;
	/**暴击倍率 */
	critMultiplier?: number;
	/**速度衰减 */
	speedDecay?: number;
	/**分裂数量 */
	splitCount?: number;
	/**分裂次数 */
	splitTimes?: number;
	/**吸血 */
	lifeSteal?: number;
	/**反射 */
	reflect?: number;
	/**爆炸 */
	boom?: number;
}

/**
 * 敌人属性
 */
export interface EnemyProp {
	/**生命 */
	hp: number;
	/**攻击 */
	attack: number;
	/**速度 */
	speed: number;
	/**攻击间隔 */
	attackInterval: number;
	/**经验 */
	exp: number;
}

/**
 * buff效果
 */
export interface BuffProp {
	/**间隔时间 */
	interTime: number;
	/**子弹轨道数量 */
	track: number;
	/**波次 */
	wave: number;
	/**子弹速度 */
	speed: number;
	/**存在时间 */
	lifeTime: number;
	/**攻击力 */
	attack: number;
	/**穿透 */
	penetr?: number;
	/**暴击率*/
	critRate?: number;
	/**暴击倍率 */
	critMultiplier?: number;
	/**速度衰减 */
	speedDecay?: number;
	/**分裂数量 */
	splitCount?: number;
	/**分裂次数 */
	splitTimes?: number;
	/**吸血 */
	lifeSteal?: number;
	/**反射 */
	reflect?: number;
	/**爆炸 */
	boom?: number;
}

export interface Buff {
	/**类型 */
	type: BuffType;
	/**效果 */
	effect: BuffEffect;
	/**作用对象 */
	object: BuffData;
	/**具体数值 */
	val: number;
}

/**buff类型 */
export enum BuffType {
	/**间隔时间 */
	interTime = 'interTime',
	/**子弹轨道数量 */
	track = 'track',
	/**波次 */
	wave = 'wave',
	/**子弹速度 */
	speed = 'speed',
	/**存在时间 */
	lifeTime = 'lifeTime',
	/**攻击力 */
	attack = 'attack',
	/**穿透 */
	penetr = 'penetr',
	/**暴击率*/
	critRate = 'critRate',
	/**暴击倍率 */
	critMultiplier = 'critMultiplier',
	/**速度衰减 */
	speedDecay = 'speedDecay',
	/**分裂数量 */
	splitCount = 'splitCount',
	/**分裂次数 */
	splitTimes = 'splitTimes',
	/**吸血 */
	lifeSteal = 'lifeSteal',
	/**反射 */
	reflect = 'reflect',
	/**爆炸 */
	boom = 'boom',
}

/**buff提升的类型 */
export enum BuffEffect {
	/**直接增加*/
	add = '增加',
	/**比例 */
	ratio = '增幅',
	/**单独乘区 */
	mul = '额外提升',
}

/**buff作用的数据对象 */
export enum BuffData {
	/**针对基础数据 */
	base = '基础',
	/**整体数据 */
	all = '整体',
}

/**类型转说明文字 */
export var BuffTypeToStr = {
	/**间隔时间 */
	interTime: '间隔时间',
	/**子弹轨道数量 */
	track: '弹轨',
	/**波次 */
	wave: '波次',
	/**子弹速度 */
	speed: '速度',
	/**存在时间 */
	lifeTime: '持续时间',
	/**攻击力 */
	attack: '伤害',
	/**穿透 */
	penetr: '穿透',
	/**暴击率*/
	critRate: '暴击率',
	/**暴击倍率 */
	critMultiplier: '暴击伤害',
	/**速度衰减 */
	speedDecay: '速度衰减',
	/**分裂数量 */
	splitCount: '分裂数量',
	/**分裂次数 */
	splitTimes: '分裂次数',
	/**吸血 */
	lifeSteal: '吸血',
	/**反射 */
	reflect: '反射',
	/**爆炸 */
	boom: '爆炸',
};
