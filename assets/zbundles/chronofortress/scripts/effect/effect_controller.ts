import { Node, Prefab, instantiate } from 'cc';
import { AttackLabel } from './attack_label';
export class EffectController {
	public static instance: EffectController;
	public prefabMap: Map<string, Prefab | Node> = new Map<string, Prefab | Node>();
	constructor() {
		models.assetMgr.load('prefabs/items/attack_label', Prefab).then((prefab: Prefab) => {
			this.prefabMap.set('attack_label', prefab);
		});
	}

	public showAttackLabel(object: Node, number: number) {
		let prefab = this.prefabMap.get('attack_label');
		if (!prefab) return;
		let node = instantiate(prefab) as Node;
		node.parent = object;
		node.setPosition(0, 0, 0);
		node.getComponent(AttackLabel)?.show(number);
	}
}
