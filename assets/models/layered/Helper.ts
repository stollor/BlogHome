import { _decorator, Component, Node, Vec3, Mat4 } from 'cc';
const { ccclass, property } = _decorator;
const _worldMatrix = new Mat4()
const _mat4_temp = new Mat4()

export class Helper {
    public static localToWorld(node: Node, out: Vec3, localPoint: Vec3) {
        node.getWorldMatrix(_worldMatrix)
        Vec3.transformMat4(out, localPoint, _worldMatrix)
    }
    public static worldToLocal(node: Node, out: Vec3, worldPoint: Vec3) {
        node.getWorldMatrix(_worldMatrix)
        Mat4.invert(_mat4_temp, _worldMatrix)
        Vec3.transformMat4(out, worldPoint, _mat4_temp)
    }
}

