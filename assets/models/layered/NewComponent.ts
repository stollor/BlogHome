import { _decorator, Component, Node, instantiate, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    @property(Node) label: Node = null
    @property(Node) sprite: Node = null
    @property(Node) content: Node = null

    start() {

    }

    createLabel() {
        var obj = instantiate(this.label)
        obj.parent = this.content
    }
    createSprite() {
        var obj = instantiate(this.sprite)
        obj.parent = this.content
    }
    remove(event: EventTouch) {
        var node: Node = event.target
        // node.removeFromParent()
        node.destroy()
    }
}

