import { _decorator, Component, Node, Widget } from 'cc';
import { EDITOR } from 'cc/env';
import { LayerWidgetManager } from './LayerWidgetManager';
const { ccclass, property, executeInEditMode } = _decorator;
const _cc = (cc as any)
export enum AlignFlags {
    TOP = 1 << 0,
    MID = 1 << 1,
    BOT = 1 << 2,
    LEFT = 1 << 3,
    CENTER = 1 << 4,
    RIGHT = 1 << 5,
    HORIZONTAL = LEFT | CENTER | RIGHT,
    VERTICAL = TOP | MID | BOT,
}
const TOP_BOT = AlignFlags.TOP | AlignFlags.BOT;
const LEFT_RIGHT = AlignFlags.LEFT | AlignFlags.RIGHT;
@ccclass('LayerWidget')
@executeInEditMode
export class LayerWidget extends Widget {
    // get target() {
    //     return this["_target"];
    // }
    // set target(value) {
    //     if (this["_target"] === value) {
    //         return;
    //     }

    //     this._unregisterTargetEvents();
    //     this["_target"] = value;
    //     this._registerTargetEvents();
    //     if (EDITOR /* && !cc.engine._isPlaying */ && this.node.parent) {
    //         // adjust the offsets to keep the size and position unchanged after target changed
    //         LayerWidgetManager.updateOffsetsToStayPut(this);
    //     }
    //     this._validateTargetInDEV()
    //     this["_recursiveDirty"]()
    // }
    public onEnable() {
        this.node.getPosition(this._lastPos)
        this._lastSize.set(this.node._uiProps.uiTransformComp!.contentSize)
        LayerWidgetManager.add(this)
        this._hadAlignOnce = false
        this._registerEvent()
        this._registerTargetEvents()
    }
    public onDisable() {
        LayerWidgetManager.remove(this)
        this._unregisterEvent()
        this._unregisterTargetEvents()
    }
    public _validateTargetInDEV() { }
    public updateAlignment() {
        LayerWidgetManager.updateAlignment(this.node)
    }
    // private _setAlign(flag: AlignFlags, isAlign: boolean) {
    //     const current = (this["_alignFlags"] & flag) > 0;
    //     if (isAlign === current) {
    //         return;
    //     }
    //     const isHorizontal = (flag & LEFT_RIGHT) > 0;
    //     const trans = this.node._uiProps.uiTransformComp!;
    //     if (isAlign) {
    //         this["_alignFlags"] |= flag;

    //         if (isHorizontal) {
    //             this.isAlignHorizontalCenter = false;
    //             if (this.isStretchWidth) {
    //                 // become stretch
    //                 this["_originalWidth"] = trans.width;
    //                 // test check conflict
    //                 if (EDITOR /* && !cc.engine.isPlaying */) {
    //                     // TODO:
    //                     // _Scene.DetectConflict.checkConflict_Widget(this);
    //                 }
    //             }
    //         } else {
    //             this.isAlignVerticalCenter = false;
    //             if (this.isStretchHeight) {
    //                 // become stretch
    //                 this["_originalHeight"] = trans.height;
    //                 // test check conflict
    //                 if (EDITOR /* && !cc.engine.isPlaying */) {
    //                     // TODO:
    //                     // _Scene.DetectConflict.checkConflict_Widget(this);
    //                 }
    //             }
    //         }
    //         if (EDITOR && this.node.parent) {
    //             // adjust the offsets to keep the size and position unchanged after alignment changed
    //             LayerWidgetManager.updateOffsetsToStayPut(this, flag);
    //         }
    //     } else {
    //         if (isHorizontal) {
    //             if (this.isStretchWidth) {
    //                 // will cancel stretch
    //                 trans.width = this["_originalWidth"];
    //             }
    //         } else if (this.isStretchHeight) {
    //             // will cancel stretch
    //             trans.height = this["_originalHeight"];
    //         }

    //         this["_alignFlags"] &= ~flag;
    //     }
    // }
}

