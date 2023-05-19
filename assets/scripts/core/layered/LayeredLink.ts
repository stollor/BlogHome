import { _decorator, Component, Node, Vec3, Widget, Layout, UITransform, director, Scene, UIRenderer, js } from 'cc';
import { LayerLayout } from './engine/LayerLayout';
import { LayerWidget } from './engine/LayerWidget';
import { ACTIVE, Layered, LayerEvent, LOCAL_POSITION, LOCK } from './Layered';
const { ccclass, property } = _decorator;
const _tempPos = new Vec3()
@ccclass('LayeredLink')
export class LayeredLink {
    private _node: Node
    private _parent: Node
    private _parentLink: LayeredLink
    private _children: LayeredLink[]
    private _layerName: string
    private _layerRoot: string
    private _layered: Layered
    private _layout: LayerLayout
    private _widget: LayerWidget
    private _localPosition: Vec3 = new Vec3()
    private _cachePosition: Vec3 = new Vec3()
    public get node() { return this._node }
    public get children() { return this._children }
    public get layerName() { return this._layerName }
    constructor(layered: Layered, node: Node, parent: Node, parentLink: LayeredLink) {
        this._layered = layered
        this._parent = parent
        this._node = node
        this._parentLink = parentLink
        this.node[LOCK] = false
        this.node[ACTIVE] = this.node.active
        this._layerName = layered.verifyLayer(node)
        this._children = []
        this._defineProperty()
        this._verifyWidget()
        this._verifyLayout()
        for (let i = 0; i < this.node.children.length; i++) {
            const child = this.node.children[i];
            var link = new LayeredLink(this._layered, child, this.node, this)
            this._children.push(link)
        }
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

        this.node.getPosition(this._localPosition)
        this._cachePosition.set(this._localPosition)
        this.node[LOCAL_POSITION] = this._localPosition
        this._registerEvent()
    }
    private _verifyWidget() {
        if (this.isSameLayerAsParent()) return
        var widget = this.node.getComponent(Widget)
        if (!widget) return
        widget.destroy()
        var layerWidget = this.node.addComponent(LayerWidget)
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
        layerWidget.updateAlignment()
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
        // this._layout.setChildren(this._children.map(item => item.node))
    }
    private _defineProperty() {
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
        this.node.on(Node.EventType.NODE_DESTROYED, this._onDestroy, this)
        this.node.on(Node.EventType.TRANSFORM_CHANGED, this._onTransformChanged, this)
        this.node.on(Node.EventType.CHILD_ADDED, this._onChildAdded, this)
        this.node.on(Node.EventType.CHILD_REMOVED, this._onChildRemoved, this)
        this.node.on(Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, this._onActiveChanged, this)
        if (this._parent) {
            this._parent.on(LayerEvent.Position, this._onParentPosition, this)
            this._parent.on(LayerEvent.Scale, this._onParentScale, this)
            this._parent.on(LayerEvent.Active, this._onParentActiveChanged, this)
        }
    }
    private _onActiveChanged() {
        if (!this.node[LOCK]) {
            this.node[ACTIVE] = this.node.active
        }
        this.node.emit(LayerEvent.Active)
    }
    private _onChildAdded(child: Node) {
        var link = new LayeredLink(this._layered, child, this.node, this)
        this._children.push(link)
        link.initLayer()
        this.node.emit(LayerEvent.AddChild, link.node)
    }
    private _onChildRemoved(child: Node) {
        var index = this._children.findIndex(item => item.node == child)
        if (-1 != index) {
            this._children.splice(index, 1)
            this.node.emit(LayerEvent.RemChild, child)
        }
    }
    private _onDestroy() {
        console.log(this.node.name, "我删除了")
        this.node.emit(LayerEvent.Destroy)
    }
    private _onTransformChanged(type: any) {
        if (type == Node.TransformBit.POSITION) {
            if (!this.node[LOCK]) {
                Vec3.subtract(_tempPos, this.node.position, this._cachePosition)
                this._localPosition.add(_tempPos)
                this.node[LOCAL_POSITION] = this._localPosition
            }
            this._cachePosition = this.node.position
            this.node.emit(LayerEvent.Position, this.node.worldPosition)
        }
    }
    private _onParentPosition(position: Vec3) {
        if (this.node.parent != this._parent) {
            this.node[LOCK] = true
            this.node.inverseTransformPoint(_tempPos, position)
            _tempPos.add(this._localPosition)
            this.node.translate(_tempPos)
            this.node[LOCK] = false
        } else {
            this.node.emit(LayerEvent.Position, this.node.worldPosition)
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
}

