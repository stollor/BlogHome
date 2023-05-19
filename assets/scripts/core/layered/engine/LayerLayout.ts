import { _decorator, Component, Node, Layout, Vec3, UITransform, Vec2, Size } from 'cc';
import { Helper } from '../Helper';
import { LayerEvent, LOCAL_POSITION } from '../Layered';
const { ccclass, property } = _decorator;
const _tempPos = new Vec3()
const _tempVec3 = new Vec3()
const _tempLocal = new Vec3()
@ccclass('LayerLayout')
export class LayerLayout extends Layout {
    private _children: Node[] = []
    __preload() {
        this.node.on(LayerEvent.AddChild, this._onAddChild, this)
        this.node.on(LayerEvent.RemChild, this._onRemChild, this)
    }
    private _onAddChild(child: Node) {
        child.on(Node.EventType.SIZE_CHANGED, this._doLayoutDirty, this);
        child.on(Node.EventType.TRANSFORM_CHANGED, this._transformDirty, this);
        child.on(Node.EventType.ANCHOR_CHANGED, this._doLayoutDirty, this);
        child.on(Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, this._childrenChanged, this);
        this._children.push(child)
    }
    private _onRemChild(child: Node) {
        child.off(Node.EventType.SIZE_CHANGED, this._doLayoutDirty, this);
        child.off(Node.EventType.TRANSFORM_CHANGED, this._transformDirty, this);
        child.off(Node.EventType.ANCHOR_CHANGED, this._doLayoutDirty, this);
        child.off(Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, this._childrenChanged, this);
        var index = this._children.findIndex(item => item == child)
        if (-1 != index) {
            this._children.splice(index, 1)
        }
    }
    protected _addChildrenEventListeners() { }
    protected _removeChildrenEventListeners() { }
    protected _childAdded(child: Node) { }
    protected _childRemoved(child: Node) { }
    public updateLayout(force = false) {
        if ((this._layoutDirty || force) && this._children.length > 0) {
            this._doLayout();
            this._layoutDirty = false;
        }
    }
    private _transform(child: Node) {
        var parent = this._getParentTr(child.parent)
        if (parent) {
            parent.inverseTransformPoint(_tempLocal, this.node.worldPosition)
        }
        return _tempLocal
    }
    protected _checkUsefulObj() {
        this._usefulLayoutObj.length = 0;
        var children = this._children;
        for (let i = 0; i < children.length; ++i) {
            const child = children[i];
            const uiTrans = child._uiProps.uiTransformComp;
            if (child.activeInHierarchy && uiTrans) {
                this._usefulLayoutObj.push(uiTrans);
            }
        }
    }
    protected _doLayoutHorizontally(baseWidth: number, rowBreak: boolean, fnPositionY: (...args: any[]) => number, applyChildren: boolean) {
        const trans = this.node._uiProps.uiTransformComp!;
        const layoutAnchor = trans.anchorPoint;
        const limit = this._getFixedBreakingNum();

        let sign = 1;
        let paddingX = this._paddingLeft;
        if (this._horizontalDirection === Layout.HorizontalDirection.RIGHT_TO_LEFT) {
            sign = -1;
            paddingX = this._paddingRight;
        }
        const startPos = (this._horizontalDirection - layoutAnchor.x) * baseWidth + sign * paddingX;
        let nextX = startPos - sign * this._spacingX;
        let totalHeight = 0; // total content height (not including spacing)
        let rowMaxHeight = 0; // maximum height of a single line
        let tempMaxHeight = 0; //
        let maxHeight = 0;
        let isBreak = false;
        const activeChildCount = this._usefulLayoutObj.length;
        let newChildWidth = this._cellSize.width;
        const paddingH = this._getPaddingH();
        if (this._layoutType !== Layout.Type.GRID && this._resizeMode === Layout.ResizeMode.CHILDREN) {
            newChildWidth = (baseWidth - paddingH - (activeChildCount - 1) * this._spacingX) / activeChildCount;
        }

        const children = this._usefulLayoutObj;
        for (let i = 0; i < children.length; ++i) {
            const childTrans = children[i];
            const child = childTrans.node;
            const scale = child.scale;
            const childScaleX = this._getUsedScaleValue(scale.x);
            const childScaleY = this._getUsedScaleValue(scale.y);
            // for resizing children
            if (this._resizeMode === Layout.ResizeMode.CHILDREN) {
                childTrans.width = newChildWidth / childScaleX;
                if (this._layoutType === Layout.Type.GRID) {
                    childTrans.height = this._cellSize.height / childScaleY;
                }
            }

            const anchorX = Math.abs(this._horizontalDirection - childTrans.anchorX);
            const childBoundingBoxWidth = childTrans.width * childScaleX;
            const childBoundingBoxHeight = childTrans.height * childScaleY;

            if (childBoundingBoxHeight > tempMaxHeight) {
                maxHeight = Math.max(tempMaxHeight, maxHeight);
                rowMaxHeight = tempMaxHeight || childBoundingBoxHeight;
                tempMaxHeight = childBoundingBoxHeight;
            }

            nextX += sign * (anchorX * childBoundingBoxWidth + this._spacingX);
            const rightBoundaryOfChild = sign * (1 - anchorX) * childBoundingBoxWidth;

            if (rowBreak) {
                if (limit > 0) {
                    isBreak = (i / limit) > 0 && (i % limit === 0);
                    if (isBreak) {
                        rowMaxHeight = tempMaxHeight > childBoundingBoxHeight ? tempMaxHeight : rowMaxHeight;
                    }
                } else if (childBoundingBoxWidth > baseWidth - paddingH) {
                    if (nextX > startPos + sign * (anchorX * childBoundingBoxWidth)) {
                        isBreak = true;
                    }
                } else {
                    const boundary = (1 - this._horizontalDirection - layoutAnchor.x) * baseWidth;
                    const rowBreakBoundary = nextX + rightBoundaryOfChild + sign * (sign > 0 ? this._paddingRight : this._paddingLeft);
                    isBreak = Math.abs(rowBreakBoundary) > Math.abs(boundary);
                }

                if (isBreak) {
                    nextX = startPos + sign * (anchorX * childBoundingBoxWidth);
                    if (childBoundingBoxHeight !== tempMaxHeight) {
                        rowMaxHeight = tempMaxHeight;
                    }
                    // In unconstrained mode, the second height size is always what we need when a line feed condition is required to trigger
                    totalHeight += rowMaxHeight + this._spacingY;
                    rowMaxHeight = tempMaxHeight = childBoundingBoxHeight;
                }
            }

            const finalPositionY = fnPositionY(child, childTrans, totalHeight);
            if (applyChildren) {
                child.setPosition(nextX + this._transform(child).x, finalPositionY);
            }
            nextX += rightBoundaryOfChild;
        }

        rowMaxHeight = Math.max(rowMaxHeight, tempMaxHeight);
        const containerResizeBoundary = Math.max(maxHeight, totalHeight + rowMaxHeight) + this._getPaddingV();
        return containerResizeBoundary;
    }
    protected _doLayoutVertically(baseHeight: number, columnBreak: boolean, fnPositionX: (...args: any[]) => number, applyChildren: boolean) {
        const trans = this.node._uiProps.uiTransformComp!;
        const layoutAnchor = trans.anchorPoint;
        const limit = this._getFixedBreakingNum();

        let sign = 1;
        let paddingY = this._paddingBottom;
        if (this._verticalDirection === Layout.VerticalDirection.TOP_TO_BOTTOM) {
            sign = -1;
            paddingY = this._paddingTop;
        }

        const startPos = (this._verticalDirection - layoutAnchor.y) * baseHeight + sign * paddingY;
        let nextY = startPos - sign * this._spacingY;
        let tempMaxWidth = 0;
        let maxWidth = 0;
        let colMaxWidth = 0;
        let totalWidth = 0;
        let isBreak = false;
        const activeChildCount = this._usefulLayoutObj.length;
        let newChildHeight = this._cellSize.height;
        const paddingV = this._getPaddingV();
        if (this._layoutType !== Layout.Type.GRID && this._resizeMode === Layout.ResizeMode.CHILDREN) {
            newChildHeight = (baseHeight - paddingV - (activeChildCount - 1) * this._spacingY) / activeChildCount;
        }

        const children = this._usefulLayoutObj;
        for (let i = 0; i < children.length; ++i) {
            const childTrans = children[i];
            const child = childTrans.node;
            const scale = child.scale;
            const childScaleX = this._getUsedScaleValue(scale.x);
            const childScaleY = this._getUsedScaleValue(scale.y);

            // for resizing children
            if (this._resizeMode === Layout.ResizeMode.CHILDREN) {
                childTrans.height = newChildHeight / childScaleY;
                if (this._layoutType === Layout.Type.GRID) {
                    childTrans.width = this._cellSize.width / childScaleX;
                }
            }

            const anchorY = Math.abs(this._verticalDirection - childTrans.anchorY);
            const childBoundingBoxWidth = childTrans.width * childScaleX;
            const childBoundingBoxHeight = childTrans.height * childScaleY;

            if (childBoundingBoxWidth > tempMaxWidth) {
                maxWidth = Math.max(tempMaxWidth, maxWidth);
                colMaxWidth = tempMaxWidth || childBoundingBoxWidth;
                tempMaxWidth = childBoundingBoxWidth;
            }

            nextY += sign * (anchorY * childBoundingBoxHeight + this._spacingY);
            const topBoundaryOfChild = sign * (1 - anchorY) * childBoundingBoxHeight;

            if (columnBreak) {
                if (limit > 0) {
                    isBreak = (i / limit) > 0 && (i % limit === 0);
                    if (isBreak) {
                        colMaxWidth = tempMaxWidth > childBoundingBoxHeight ? tempMaxWidth : colMaxWidth;
                    }
                } else if (childBoundingBoxHeight > baseHeight - paddingV) {
                    if (nextY > startPos + sign * (anchorY * childBoundingBoxHeight)) {
                        isBreak = true;
                    }
                } else {
                    const boundary = (1 - this._verticalDirection - layoutAnchor.y) * baseHeight;
                    const columnBreakBoundary = nextY + topBoundaryOfChild + sign * (sign > 0 ? this._paddingTop : this._paddingBottom);
                    isBreak = Math.abs(columnBreakBoundary) > Math.abs(boundary);
                }

                if (isBreak) {
                    nextY = startPos + sign * (anchorY * childBoundingBoxHeight);
                    if (childBoundingBoxWidth !== tempMaxWidth) {
                        colMaxWidth = tempMaxWidth;
                    }
                    // In unconstrained mode, the second width size is always what we need when a line feed condition is required to trigger
                    totalWidth += colMaxWidth + this._spacingX;
                    colMaxWidth = tempMaxWidth = childBoundingBoxWidth;
                }
            }

            const finalPositionX = fnPositionX(child, childTrans, totalWidth);
            if (applyChildren) {
                child.getPosition(_tempVec3);
                child.setPosition(finalPositionX, nextY + this._transform(child).y, _tempVec3.z);
            }

            nextY += topBoundaryOfChild;
        }

        colMaxWidth = Math.max(colMaxWidth, tempMaxWidth);
        const containerResizeBoundary = Math.max(maxWidth, totalWidth + colMaxWidth) + this._getPaddingH();
        return containerResizeBoundary;
    }
    private _getParentTr(node: Node) {
        if (!node) return null
        if (node.getComponent(UITransform)) {
            return node
        } else {
            return this._getParentTr(node.parent)
        }
    }
}

