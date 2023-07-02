import { v3, Node } from 'cc';
import { tween } from 'cc';

export class TweenUtil {
	static showStyle1(node: Node) {
		tween(node)
			.set({ scale: v3(0, 0, 1) })
			.to(0.5, { scale: v3(1, 1, 1) })
			.start();
	}
}
