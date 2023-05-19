import { Component, Node, UITransform, _decorator, screen, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIFit')
export class UIFit extends Component {
	@property(Node) nodeSize: Node;
	@property(Node) desingSize: Node;
	@property(Node) canvasSize: Node;
	@property(Node) viewSize: Node;
	start() {
		this.node.on(Node.EventType.SIZE_CHANGED, this.onSizeChange, this);
		view.on('design-resolution-changed', this.onDesignResolutionChanged, this);
		view.on('canvas-resize', this.onCanvasResize, this);
	}

	onCanvasResize() {
		this.canvasSize.setStr(`Canvas:${screen.windowSize.width},${screen.windowSize.height}`);
		// view.setDesignResolutionSize(screen.windowSize.width, screen.windowSize.height, ResolutionPolicy.FIXED_HEIGHT);
	}

	onDesignResolutionChanged() {
		this.desingSize.setStr(`Desing:${view.getDesignResolutionSize().width},${view.getDesignResolutionSize().height}`);
	}
	onSizeChange() {
		this.nodeSize.setStr(`Node:${this.node.getComponent(UITransform).width},${this.node.getComponent(UITransform).height}`);
	}

	update(deltaTime: number) {}
}
