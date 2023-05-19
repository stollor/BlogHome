import { Mat3, Quat, Vec3 } from "cc";
import { obbIntersect, sphereAABBDistance, sphereOBBDistance } from "./AILib";
import { cBody } from "./Body";



export enum ShapeType {
    Box = 1,
    Sphere = 2,
    Capsule = 4, //AI TODO
};

export abstract class cShape {

    radius = 0;
    height = 0;
    type = ShapeType.Box;
    isDirty: boolean = true;
    size = { x: 0, y: 0, z: 0 };
    center = { x: 0, y: 0, z: 0 };
    halfSize = { x: 0, y: 0, z: 0 };
    aabb: Array<number> = [0, 0, 0, 0, 0, 0];

    constructor(center: Vec3, type: ShapeType) {
        this.type = type;
        this.isDirty = true;
        this.center.x = center.x;
        this.center.y = center.y;
        this.center.z = center.z;
    }


    rotateAABB(world: Mat3) {

        const center = this.center;
        const cx = center.x, cy = center.y, cz = center.z;
 
        const size = this.halfSize;
        const x = size.x, y = size.y, z = size.z;

        const uX = world.m00, uY = world.m01, uZ = world.m02;
        const vX = world.m03, vY = world.m04, vZ = world.m05;
        const wX = world.m06, wY = world.m07, wZ = world.m08;

        // 计算新的中心点
        const cX = uX * cx + vX * cy + wX * cz;
        const cY = uY * cx + vY * cy + wY * cz;
        const cZ = uZ * cx + vZ * cy + wZ * cz;
  

        // 计算新的包围盒宽度、高度和深度
        const absU = Math.abs(uX) * x + Math.abs(vX) * y + Math.abs(wX) * z;
        const absV = Math.abs(uY) * x + Math.abs(vY) * y + Math.abs(wY) * z;
        const absW = Math.abs(uZ) * x + Math.abs(vZ) * y + Math.abs(wZ) * z;

        // 计算新的最小和最大顶点
        const aabb = this.aabb;
        aabb[0] = cX - absU, aabb[1] = cY - absV, aabb[2] = cZ - absW;
        aabb[3] = cX + absU, aabb[4] = cY + absV, aabb[5] = cZ + absW;


        return aabb;

    }

    normalAABB() {

        if (this.isDirty) {

            const aabb = this.aabb;
            const size = this.halfSize;
            const center = this.center;
            const cX = center.x, cY = center.y, cZ = center.z;

            aabb[0] = cX - size.x;
            aabb[1] = cY - size.y;
            aabb[2] = cZ - size.z;

            aabb[3] = cX + size.x;
            aabb[4] = cY + size.y;
            aabb[5] = cZ + size.z;

            this.isDirty = false;
        }
    }

    updateAABB(world: Mat3, isIdentity: boolean = true) {

        if (isIdentity || this.type == ShapeType.Sphere) {
            //针对没有旋转和球体进行优化
            if (Vec3.lengthSqr(this.center) != 0) {
                this.isDirty = true;
            }
            this.normalAABB();
        } else {
            this.rotateAABB(world);
        }
    }
}

export class cBox extends cShape {

    constructor(center: Vec3, size: Vec3) {
        super(center, ShapeType.Box);

        this.size.x = size.x;
        this.size.y = size.y;
        this.size.z = size.z;

        this.halfSize.x = size.x * 0.5;
        this.halfSize.y = size.y * 0.5;
        this.halfSize.z = size.z * 0.5;
    }
}

export class cSphere extends cShape {
    constructor(center: Vec3, radius: number) {
        super(center, ShapeType.Sphere);
        this.radius = radius;

        this.size.x = radius * 2;
        this.size.y = radius * 2;
        this.size.z = radius * 2;

        this.halfSize.x = radius;
        this.halfSize.y = radius;
        this.halfSize.z = radius;
    }
}


//默认y轴竖向
export class cCapsule extends cShape {
    constructor(center: Vec3, radius: number, height: number) {
        super(center, ShapeType.Capsule);
        this.radius = radius;
        this.height = height;

        this.size.x = radius * 2;
        this.size.y = height * 2;
        this.size.z = radius * 2;

        this.halfSize.x = radius;
        this.halfSize.y = height;
        this.halfSize.z = radius;
    }
}


const center = new Vec3();

export const ShapeSupport: Array<(a: cBody, b: cBody) => boolean> = [];

ShapeSupport[ShapeType.Box | ShapeType.Box] = function (a: cBody, b: cBody) {

    //a,b 没有旋转,已进行AABB处理 , 直接返回 true
    if (a.isIdentity && b.isIdentity) return true;

    return obbIntersect(a.getCenter(), a.getHalfSize(), a.getRotMat3(), b.getCenter(), b.getHalfSize(), b.getRotMat3());
}

ShapeSupport[ShapeType.Box | ShapeType.Sphere] = function (a: cBody, b: cBody) {

    //a没有旋转当AABB处理 
    if (a.isIdentity) {
        // 转换到 aabb 坐标系下
        Vec3.subtract(center, b.getCenter(), a.getCenter());
        return sphereAABBDistance(center, b.getRaidus(), a.getHalfSize());
    }

    return sphereOBBDistance(b.getCenter(), b.getRaidus(), a.getCenter(), a.getRotation(), a.getHalfSize());
}


ShapeSupport[ShapeType.Sphere | ShapeType.Sphere] = function (a: cBody, b: cBody) {

    let ca = a.getCenter();
    let cb = b.getCenter();
    Vec3.subtract(center, ca, cb);
    let lengthSqr = center.lengthSqr();
    let radii = a.getRaidus() + b.getRaidus();

    return lengthSqr <= radii * radii;

}

ShapeSupport[ShapeType.Box | ShapeType.Capsule] = function (a: cBody, b: cBody) {
    //AI TODO
    return true;

}

ShapeSupport[ShapeType.Sphere | ShapeType.Capsule] = function (a: cBody, b: cBody) {
    //AI TODO
    return true;
}


ShapeSupport[ShapeType.Capsule | ShapeType.Capsule] = function (a: cBody, b: cBody) {
    //AI TODO
    return true;
}