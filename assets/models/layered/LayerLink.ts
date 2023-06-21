import { _decorator, Component, Node, js, Layout, UIRenderer, Vec3, Widget, isValid, NodeSpace, UITransform, Mat4 } from 'cc';
import { LayerLayout } from './engine/LayerLayout';
import { LayerWidget } from './engine/LayerWidget';
import { Helper } from './Helper';
import { ACTIVE, CACHE_POSITION, Layered, LayerEvent, LOCAL_POSITION, LOCK } from './Layered';
const { ccclass, property } = _decorator;
const _tempLocal = new Vec3()
const _tempWorld = new Vec3()
@ccclass('LayerLink')
export class LayerLink extends Component {
    private _parent: Node
    private _parentLink: LayerLink
    private _children: LayerLink[] = []
    private _layerName: string
    private _layerRoot: string
    private _layered: Layered
    private _layout: LayerLayout
    public get children() { return this._children }
    public get layerName() { return this._layerName }
    protected __preload() {
        this._parent = this.node.parent
        this.node[LOCK] = false
        this.node[ACTIVE] = this.node.active
        this.node[LOCAL_POSITION] = new Vec3(this.node.position)
        console.log(this.node.name, "本地坐标", this.node[LOCAL_POSITION].x)
    }
    protected onDestroy() {
        for (let i = 0; i < this._children.length; i++) {
            const child = this._children[i];
            if (isValid(child.node, true)) {
                child.node.destroy()
            }
        }
    }
    public create(layered: Layered, parentLink: LayerLink): this {
        this._layered = layered
        this._parentLink = parentLink
        this._layerName = layered.verifyLayer(this.node)
        this._defineProperty()
        this._verifyLayout()
        // console.log(this.node.name, "我执行了 create 我的父亲", parentLink?.node.name)
        for (let i = 0; i < this.node.children.length; i++) {
            const child = this.node.children[i];
            if (this._layered.isSkip(child)) {
                continue
            }
            var link = child.addComponent(LayerLink)
            // console.error("创建", child.name, "它的父亲是我", this.node.name)
            link.create(this._layered, this)
            this._children.push(link)
        }

        return this
    }
    public isSameLayerAsParent() {
        return this._parentLink && this._parentLink.layerName == this.layerName
    }
    public initLayer() {
        const layer = this._layered.getLayer(this._layerName)
        if (layer) {
            if (this._parentLink && this._parentLink._layerRoot == this._layerName) {
                this._layerRoot = this._parentLink._layerRoot
            } else {
                this._layerRoot = this._layerName
                this.node.parent = layer
            }
        } else {
            this._layerRoot = this._parentLink?._layerRoot
        }

        for (let i = 0; i < this._children.length; i++) {
            const link = this._children[i];
            link.initLayer()
            this.node.emit(LayerEvent.AddChild, link.node)
        }
        this._verifyWidget()
        this._registerEvent()
    }
    private _verifyWidget() {
        if (this.isSameLayerAsParent()) return
        if (this.node.getComponent(LayerWidget)) {
            this.node.getComponent(LayerWidget).updateAlignment()
            return
        }
        var widget = this.node.getComponent(Widget)
        if (!widget) return
        widget.destroy()
        var layerWidget = this.node.addComponent(LayerWidget)
        layerWidget.isAlignTop = widget.isAlignTop
        layerWidget.isAlignBottom = widget.isAlignBottom
        layerWidget.isAlignLeft = widget.isAlignLeft
        layerWidget.isAlignRight = widget.isAlignRight
        layerWidget.isAlignVerticalCenter = widget.isAlignVerticalCenter
        layerWidget.isAlignHorizontalCenter = widget.isAlignHorizontalCenter
        layerWidget.horizontalCenter = widget.horizontalCenter
        layerWidget.verticalCenter = widget.verticalCenter
        layerWidget.left = widget.left
        layerWidget.right = widget.right
        layerWidget.top = widget.top
        layerWidget.bottom = widget.bottom
        layerWidget.isAbsoluteLeft = widget.isAbsoluteLeft
        layerWidget.isAbsoluteRight = widget.isAbsoluteRight
        layerWidget.isAbsoluteTop = widget.isAbsoluteTop
        layerWidget.isAbsoluteBottom = widget.isAbsoluteBottom
        layerWidget.isAbsoluteHorizontalCenter = widget.isAbsoluteHorizontalCenter
        layerWidget.isAbsoluteVerticalCenter = widget.isAbsoluteVerticalCenter
        layerWidget.alignFlags = widget.alignFlags
        layerWidget.alignMode = widget.alignMode
        if (widget.target) {
            layerWidget.target = widget.target
        } else {
            layerWidget.target = this._parent ? this._parent : this.node.parent
        }
        // layerWidget.updateAlignment()
    }
    private _verifyLayout() {
        var layout = this.node.getComponent(Layout)
        if (!layout) return
        layout.destroy()
        this._layout = this.node.addComponent(LayerLayout)
        this._layout.type = layout.type
        this._layout.alignHorizontal = layout.alignHorizontal
        this._layout.alignVertical = layout.alignVertical
        this._layout.resizeMode = layout.resizeMode
        this._layout.cellSize = layout.cellSize
        this._layout.startAxis = layout.startAxis
        this._layout.spacingX = layout.spacingX
        this._layout.spacingY = layout.spacingY
        this._layout.verticalDirection = layout.verticalDirection
        this._layout.horizontalDirection = layout.horizontalDirection
        this._layout.constraint = layout.constraint
        this._layout.constraintNum = layout.constraintNum
        this._layout.affectedByScale = layout.affectedByScale
        this._layout.padding = layout.padding
        this._layout.paddingTop = layout.paddingTop
        this._layout.paddingBottom = layout.paddingBottom
        this._layout.paddingLeft = layout.paddingLeft
        this._layout.paddingRight = layout.paddingRight
    }
    private _defineProperty() {
        try {
            // 拦截active属性，当父节点不可见时，防止当前节点被显示
            var activeDescriptor = this._layered.getDescriptor(this.node, "active")
            Object.defineProperty(this.node, "active", {
                get: activeDescriptor.get && activeDescriptor.get.bind(this.node),
                set: (value: any) => {
                    if (value && this._parent && !this._parent.active) {
                        this.node[ACTIVE] = value
                        return
                    }
                    if (activeDescriptor.set) {
                        activeDescriptor.set.call(this.node, value)
                    }
                }
            })
        } catch (error) {
            console.error(error)
        }
        // 防止用户将当前节点移动到其他层
        const setParent = this.node.setParent.bind(this.node);
        (this.node as any).setParent = (value: any, keepWorldTransform = false) => {
            if (value) {
                var render = value.getComponent(UIRenderer)
                if (render) {
                    var renderName = js.getClassName(render)
                    if (this._layerName != js.getClassName(render)) {
                        console.warn(`[${this._layerName}/${this.node.name}] 无法设置到 [${renderName}] 层级`)
                        return
                    }
                }
            }
            setParent.call(this.node, value, keepWorldTransform)
        }
    }
    private _registerEvent() {
        this.node.on(Node.EventType.TRANSFORM_CHANGED, this._onTransformChanged, this)
        this.node.on(Node.EventType.CHILD_ADDED, this._onChildAdded, this)
        this.node.on(Node.EventType.CHILD_REMOVED, this._onChildRemoved, this)
        this.node.on(Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, this._onActiveChanged, this)
        var parent = this._getParent()
        if (parent) {
            parent.on(LayerEvent.Position, this._onParentPosition, this)
            parent.on(LayerEvent.Scale, this._onParentScale, this)
            parent.on(LayerEvent.Active, this._onParentActiveChanged, this)
        }
    }
    private _onActiveChanged() {
        if (!this.node[LOCK]) {
            this.node[ACTIVE] = this.node.active
        }
        this.node.emit(LayerEvent.Active)
    }
    private _onChildAdded(child: Node) {
        if (this._layered.isFilterNode(child)) {
            return
        }
        var link = child.getComponent(LayerLink)
        if (!link) {
            link = child.addComponent(LayerLink)
            link.create(this._layered, this).initLayer()
            this._children.push(link)
            this.node.emit(LayerEvent.AddChild, link.node)
        }
    }
    private _onChildRemoved(child: Node) {
        var index = this._children.findIndex(item => item.node == child)
        if (-1 != index) {
            this._children.splice(index, 1)
            this.node.emit(LayerEvent.RemChild, child)
        }
    }

    private _onTransformChanged(type: any) {
        if (type == Node.TransformBit.POSITION) {
            if (!this.node[LOCK]) {
                var parent = this._getParent()
                if (parent) {
                    // Helper.localToWorld(this.node.parent, _tempWorld, this.node.position)
                    Helper.worldToLocal(parent, _tempLocal, this.node.worldPosition)
                    this.node[LOCAL_POSITION].set(_tempLocal.multiplyScalar(-1))
                    // console.log("更新了我的本地位置", this.node[LOCAL_POSITION], _tempLocal)
                }
            }
            this.node.emit(LayerEvent.Position, this.node.worldPosition)
        }
    }
    private _onParentPosition(position: Vec3) {
        var parent = this._getParent()
        if (this.node.parent != parent) {
            this.node[LOCK] = true
            Helper.localToWorld(this.node.parent, _tempWorld, this.node[LOCAL_POSITION])
            Helper.worldToLocal(parent, _tempLocal, _tempWorld)
            // console.log(_tempLocal, this.node[LOCAL_POSITION])
            this.node.setPosition(_tempLocal.multiplyScalar(-1))
            this.node[LOCK] = false
        } else {
            // console.log("收到消息", this.node.name, "无需跟随,直接发消息")
            this.node.emit(LayerEvent.Position, this.node.getWorldPosition())
        }
    }
    private _onParentScale() {

    }
    private _onParentActiveChanged() {
        if (!this.node[ACTIVE]) return
        if (!this.isSameLayerAsParent()) {
            this.node[LOCK] = true
            this.node.active = this._parent.activeInHierarchy
            this.node[LOCK] = false
        } else {
            this.node.emit(LayerEvent.Active)
        }
    }
    private _getParent() {
        var parent = this._parentLink ? this._parentLink.node : this._parent
        return parent
    }
}

