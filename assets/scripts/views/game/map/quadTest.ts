import {
	Color,
	Component,
	EventMouse,
	Graphics,
	Input,
	Node,
	Rect,
	Sprite,
	UITransform,
	_decorator,
	input,
	instantiate,
	v3,
} from 'cc';
import { BaseMove } from '../../../common/BaseMove';
import { TestItem } from './item';
import { QuadTree, TRect } from './quadTree';
const { ccclass, property } = _decorator;

enum state {
	static = 'static',
	dynamic = 'dynamic',
}

@ccclass('quadTest')
export class quadTest extends Component {
	@property(Node) item: Node;
	@property(Node) item2: Node;
	@property(Node) showNum: Node;
	_quadTree: QuadTree;
	_ui: UITransform;
	_itemUI: UITransform;
	_nodeList: Node[] = [];
	_static: state = state.static;
	_dtCount = 0;
	start() {
		this._ui = this.node.getComponent(UITransform);
		this._itemUI = this.item.getComponent(UITransform);
		this.refreshQuadTree();
		this.drawLine();
	}

	refreshQuadTree() {
		this._quadTree = new QuadTree(
			new Rect(
				this.node.position.x - this._ui.anchorX * this._ui.width,
				this.node.position.y - this._ui.anchorY * this._ui.height,
				this._ui.width,
				this._ui.height
			),
			10,
			3
		);
		this.node.children.forEach((item) => {
			this._quadTree.insertNode(item);
		});
	}

	onMouseMove(event: EventMouse) {
		if (this.item) {
			this.item.active = true;
			let pos = event.getUILocation();
			this.item.setPosition(v3(pos.x - this._ui.anchorX * this._ui.width, pos.y - this._ui.anchorY * this._ui.height, 0));
			this._nodeList.forEach((item) => {
				item.getComponent(Sprite).color = Color.WHITE;
			});
			let temp = this._quadTree.retrieveNode(this.item);
			temp.forEach((item) => {
				item.node.getComponent(Sprite).color = Color.RED;
			});
			this._nodeList = temp.map((item) => item.node);
		}
	}

	onAddItem(event: EventMouse, num: number) {
		this.createItem(num);
	}

	onSwitchState(event: EventMouse, data: string) {
		input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
		this._static = data as state;
		switch (this._static) {
			case state.static:
				{
					input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
				}
				break;
			case state.dynamic:
				{
					this.item.active = false;
					this._nodeList.forEach((item) => {
						item.getComponent(Sprite).color = Color.WHITE;
					});
				}
				break;
		}
	}

	//创建item随机位置,并塞入quadTree
	createItem(num: number) {
		for (let i = 0; i < num; i++) {
			let item = instantiate(this.item2);
			item.parent = this.node;
			item.active = true;
			item.setPosition(
				this.node.position.x - this._ui.anchorX * this._ui.width + Math.random() * this._ui.width,
				this.node.position.y - this._ui.anchorY * this._ui.height + Math.random() * this._ui.height
			);
			item.getComponent(TestItem).edges = new Rect(
				this.node.position.x - this._ui.anchorX * this._ui.width,
				this.node.position.y - this._ui.anchorY * this._ui.height,
				this._ui.width,
				this._ui.height
			);
			BaseMove.obstacles.push(item.getComponent(BaseMove));
			this._quadTree.insertNode(item);
		}
		this.drawLine();
		this.showNum.setStr(this.node.children.length - 2);
	}

	//绘制分区线
	drawLine() {
		let paint = this.node.getComponent(Graphics);
		paint.clear();
		if (this._static == state.dynamic) return;
		paint.strokeColor = Color.GREEN;
		this._drawNode(paint, this._quadTree, 6);
	}

	_drawNode(paint: Graphics, treeNode: QuadTree, lineWidth: number) {
		paint.lineWidth = lineWidth;
		paint.rect(treeNode.bounds.x, treeNode.bounds.y, treeNode.bounds.width, treeNode.bounds.height);
		paint.stroke();
		treeNode.nodes.forEach((element) => {
			this._drawNode(paint, element, lineWidth - 1);
		});
	}

	update(deltaTime: number) {
		if (this._static == state.dynamic) {
			this._dtCount += deltaTime;
			this.refreshQuadTree();
			if (this._dtCount > 0.05) {
				this.refreshQuadTree();
				this._dtCount -= 0.05;
			}
			this.node.children.forEach((item) => {
				item.getComponent(TestItem).move(deltaTime);
				//item.getComponent(TestItem).checkCollision(this._quadTree);
			});
			this._quadTree.getObjectList().forEach((list) => {
				list.forEach((item) => {
					item.node.getComponent(Sprite).color = Color.WHITE;
				});
				TRect.simpleAABBCollisionDetection(list);
			});
		}
	}
}
