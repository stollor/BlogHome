import { _decorator, Component, Node, director, Director, View, js, isValid, Vec3, Vec2, Scene, Size, v2, Rect, UITransform, view, v3 } from 'cc';
import { DEV, EDITOR } from 'cc/env';
import { AlignFlags, LayerWidget } from './LayerWidget';
const { ccclass, property } = _decorator;
const activeWidgets: LayerWidget[] = [];
const _tempVec3 = new Vec3()
const _tempPos = new Vec3();
const _defaultAnchor = new Vec2();
const tInverseTranslate = new Vec2();
const tInverseScale = new Vec2(1, 1);
const _tempVec2_1 = new Vec2();
const _tempVec2_2 = new Vec2();
const _cc = (cc as any)
function visitNode(node: any) {
    const widget = node.getComponent(LayerWidget);
    if (widget && widget.enabled) {
        if (DEV) {
            widget._validateTargetInDEV();
        }
        if (!isValid(node, true)) {
            return;
        }
        activeWidgets.push(widget);
    }
    const children = node.children;
    for (const child of children) {
        if (child.active) {
            visitNode(child);
        }
    }
}
function align(node: Node, widget: LayerWidget) {
    if (widget._hadAlignOnce) return;
    if ((!EDITOR) && widget.alignMode === LayerWidget.AlignMode.ONCE) {
        widget._hadAlignOnce = true;
    }
    const hasTarget = widget.target;
    let target: Node | Scene;
    const inverseTranslate = tInverseTranslate;
    const inverseScale = tInverseScale;
    if (hasTarget) {
        target = hasTarget;
        _cc.internal.computeInverseTransForTarget(node, target, inverseTranslate, inverseScale)
    } else {
        target = node.parent!;
    }
    const targetSize = _cc.internal.getReadonlyNodeSize(target);
    const useGlobal = target instanceof Scene || !target.getComponent(UITransform);
    const targetAnchor = useGlobal ? _defaultAnchor : target.getComponent(UITransform)!.anchorPoint;

    const isRoot = useGlobal;
    node.getPosition(_tempPos);
    // _tempPos.set(node[LOCAL_POSITION])
    const uiTrans = node._uiProps.uiTransformComp!;
    let x = _tempPos.x;
    let y = _tempPos.y;

    const anchor = uiTrans.anchorPoint;
    const scale = node.getScale();
    if (widget.alignFlags & AlignFlags.HORIZONTAL) {
        let localLeft = 0;
        let localRight = 0;
        const targetWidth = targetSize.width;
        if (isRoot) {
            localLeft = _cc.visibleRect.left.x;
            localRight = _cc.visibleRect.right.x;
        } else {
            localLeft = -targetAnchor.x * targetWidth;
            localRight = localLeft + targetWidth;
        }
        // adjust borders according to offsets
        localLeft += widget.isAbsoluteLeft ? widget.left : widget.left * targetWidth;
        localRight -= widget.isAbsoluteRight ? widget.right : widget.right * targetWidth;
        if (hasTarget) {
            localLeft += inverseTranslate.x;
            localLeft *= inverseScale.x;
            localRight += inverseTranslate.x;
            localRight *= inverseScale.x;
        }

        let width = 0;
        let anchorX = anchor.x;
        let scaleX = scale.x;
        if (scaleX < 0) {
            anchorX = 1.0 - anchorX;
            scaleX = -scaleX;
        }
        if (widget.isStretchWidth) {
            width = localRight - localLeft;
            if (scaleX !== 0) {
                uiTrans.width = width / scaleX;
            }
            x = localLeft + anchorX * width;
        } else {
            width = uiTrans.width * scaleX;
            if (widget.isAlignHorizontalCenter) {
                let localHorizontalCenter = widget.isAbsoluteHorizontalCenter ? widget.horizontalCenter : widget.horizontalCenter * targetWidth;
                let targetCenter = (0.5 - targetAnchor.x) * targetSize.width;
                if (hasTarget) {
                    localHorizontalCenter *= inverseScale.x;
                    targetCenter += inverseTranslate.x;
                    targetCenter *= inverseScale.x;
                }
                x = targetCenter + (anchorX - 0.5) * width + localHorizontalCenter;
            } else if (widget.isAlignLeft) {
                x = localLeft + anchorX * width;
            } else {
                x = localRight + (anchorX - 1) * width;
            }
        }
        widget._lastSize.width = width;
    }

    if (widget.alignFlags & AlignFlags.VERTICAL) {
        let localTop = 0;
        let localBottom = 0;
        const targetHeight = targetSize.height;
        if (isRoot) {
            localBottom = _cc.visibleRect.bottom.y;
            localTop = _cc.visibleRect.top.y;
        } else {
            localBottom = -targetAnchor.y * targetHeight;
            localTop = localBottom + targetHeight;
        }

        // adjust borders according to offsets
        localBottom += widget.isAbsoluteBottom ? widget.bottom : widget.bottom * targetHeight;
        localTop -= widget.isAbsoluteTop ? widget.top : widget.top * targetHeight;

        if (hasTarget) {
            // transform
            localBottom += inverseTranslate.y;
            localBottom *= inverseScale.y;
            localTop += inverseTranslate.y;
            localTop *= inverseScale.y;
        }

        let height = 0;
        let anchorY = anchor.y;
        let scaleY = scale.y;
        if (scaleY < 0) {
            anchorY = 1.0 - anchorY;
            scaleY = -scaleY;
        }
        if (widget.isStretchHeight) {
            height = localTop - localBottom;
            if (scaleY !== 0) {
                uiTrans.height = height / scaleY;
            }
            y = localBottom + anchorY * height;

        } else {
            height = uiTrans.height * scaleY;
            if (widget.isAlignVerticalCenter) {
                let localVerticalCenter = widget.isAbsoluteVerticalCenter ? widget.verticalCenter : widget.verticalCenter * targetHeight;
                let targetMiddle = (0.5 - targetAnchor.y) * targetSize.height;
                if (hasTarget) {
                    localVerticalCenter *= inverseScale.y;
                    targetMiddle += inverseTranslate.y;
                    targetMiddle *= inverseScale.y;
                }
                y = targetMiddle + (anchorY - 0.5) * height + localVerticalCenter;
            } else if (widget.isAlignBottom) {
                y = localBottom + anchorY * height;
            } else {
                y = localTop + (anchorY - 1) * height;
            }
        }

        widget._lastSize.height = height;
    }
    var parent = getParentTr(node.parent)
    // console.log(node.name, 'target', target.name, "parent", parent)

    if (parent) {
        parent.inverseTransformPoint(_tempVec3, target.worldPosition)
        x += _tempVec3.x
        y += _tempVec3.y
    }
    node.setPosition(x, y, _tempPos.z);
    Vec3.set(widget._lastPos, x, y, _tempPos.z);
}
function getParentTr(node: Node) {
    if (!node) return null
    if (node.getComponent(UITransform)) {
        return node
    } else {
        return getParentTr(node.parent)
    }
}
function refreshScene() {
    const scene = director.getScene();
    if (scene) {
        LayerWidgetManager.isAligning = true;
        if (LayerWidgetManager._nodesOrderDirty) {
            activeWidgets.length = 0;
            visitNode(scene);
            LayerWidgetManager._nodesOrderDirty = false;
        }
        const i = 0;
        let widget: LayerWidget | null = null;
        const iterator = LayerWidgetManager._activeWidgetsIterator;
        for (iterator.i = 0; iterator.i < activeWidgets.length; ++iterator.i) {
            widget = activeWidgets[iterator.i];
            if (widget._dirty) {
                align(widget.node, widget);
                widget._dirty = false;
            }
        }
        LayerWidgetManager.isAligning = false;
    }

    // check animation editor
    if (EDITOR) {
        LayerWidgetManager.animationState!.animatedSinceLastFrame = false;
    }
}
export class LayerWidgetManager {
    public static isAligning = false
    public static _nodesOrderDirty = false
    public static _activeWidgetsIterator = new (js.array as any).MutableForwardIterator(activeWidgets)
    public static animationState = EDITOR ? {
        previewing: false,
        time: 0,
        animatedSinceLastFrame: false,
    } : null
    public static init() {
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, refreshScene);
        director.on(Director.EVENT_AFTER_UPDATE, refreshScene);

        View.instance.on('design-resolution-changed', this.onResized, this);
        if (!EDITOR) {
            const thisOnResized = this.onResized.bind(this);
            View.instance.on('canvas-resize', thisOnResized);
            View.instance.setResizeCallback(thisOnResized)
        }
    }
    public static add(widget: LayerWidget) {
        this._nodesOrderDirty = true;
    }
    public static remove(widget: LayerWidget) {
        this._activeWidgetsIterator.remove(widget);
    }
    public static onResized() {
        const scene = director.getScene();
        if (scene) {
            this.refreshWidgetOnResized(scene);
        }
    }
    public static updateAlignment(node: Node) {
        const parent = node.parent;
        if (parent && Node.isNode(parent)) {
            this.updateAlignment(parent);
        }
        // node._widget will be null when widget is disabled
        const widget = node.getComponent(LayerWidget);
        if (widget && parent) {
            console.log("开始刷新", node.name, node.parent.name, widget.target)
            align(node, widget);
        }
    }
    private static refreshWidgetOnResized(node: Node | Scene) {
        const widget = Node.isNode(node) && node.getComponent(LayerWidget);
        if (widget && widget.enabled && (
            widget.alignMode === LayerWidget.AlignMode.ON_WINDOW_RESIZE || widget.alignMode === LayerWidget.AlignMode.ALWAYS
        )) {
            widget.setDirty();
        }

        const children = node.children;
        for (const child of children) {
            this.refreshWidgetOnResized(child);
        }
    }
    public static updateOffsetsToStayPut(widget: LayerWidget, e?: AlignFlags) {
        function i(t: number, c: number) {
            return Math.abs(t - c) > 1e-10 ? c : t;
        }
        const widgetNode = widget.node;
        let widgetParent = widgetNode.parent;
        if (widgetParent) {
            const zero = _tempVec2_1;
            zero.set(0, 0);
            const one = _tempVec2_2;
            one.set(1, 1);
            if (widget.target) {
                widgetParent = widget.target;
                _cc.internal.computeInverseTransForTarget(widgetNode, widgetParent, zero, one);
            }

            if (!e) {
                return;
            }

            const parentTrans = widgetParent._uiProps && widgetParent._uiProps.uiTransformComp;
            const parentAP = parentTrans ? parentTrans.anchorPoint : _defaultAnchor;
            const trans = widgetNode._uiProps.uiTransformComp!;
            const matchSize = _cc.internal.getReadonlyNodeSize(widgetParent);
            const myAP = trans.anchorPoint;
            const pos = widgetNode.getPosition();
            const alignFlags = AlignFlags;
            const widgetNodeScale = widgetNode.getScale();

            let temp = 0;

            if (e & alignFlags.LEFT) {
                let l = -parentAP.x * matchSize.width;
                l += zero.x;
                l *= one.x;
                temp = pos.x - myAP.x * trans.width * Math.abs(widgetNodeScale.x) - l;
                if (!widget.isAbsoluteLeft) {
                    temp /= matchSize.width;
                }

                temp /= one.x;
                widget.left = i(widget.left, temp);
            }

            if (e & alignFlags.RIGHT) {
                let r = (1 - parentAP.x) * matchSize.width;
                r += zero.x;
                temp = (r *= one.x) - (pos.x + (1 - myAP.x) * trans.width * Math.abs(widgetNodeScale.x));
                if (!widget.isAbsoluteRight) {
                    temp /= matchSize.width;
                }

                temp /= one.x;
                widget.right = i(widget.right, temp);
            }

            if (e & alignFlags.TOP) {
                let t = (1 - parentAP.y) * matchSize.height;
                t += zero.y;
                temp = (t *= one.y) - (pos.y + (1 - myAP.y) * trans.height * Math.abs(widgetNodeScale.y));
                if (!widget.isAbsoluteTop) {
                    temp /= matchSize.height;
                }

                temp /= one.y;
                widget.top = i(widget.top, temp);
            }

            if (e & alignFlags.BOT) {
                let b = -parentAP.y * matchSize.height;
                b += zero.y;
                b *= one.y;
                temp = pos.y - myAP.y * trans.height * Math.abs(widgetNodeScale.y) - b;
                if (!widget.isAbsoluteBottom) {
                    temp /= matchSize.height;
                }

                temp /= one.y;
                widget.bottom = i(widget.bottom, temp);
            }
        }
    }
}
director.on(Director.EVENT_INIT, () => {
    console.error("初始化了")
})
LayerWidgetManager.init()
