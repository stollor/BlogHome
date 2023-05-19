import { Quat, Vec3 } from "cc";



export const obbIntersect = function (centerA: any, halfA: any, rotA: any, centerB: any, halfB: any, rotB: any) {

       let ae0 = halfA.x, ae1 = halfA.y, ae2 = halfA.z,
              au00 = rotA.m00, au01 = rotA.m01, au02 = rotA.m02,
              au10 = rotA.m03, au11 = rotA.m04, au12 = rotA.m05,
              au20 = rotA.m06, au21 = rotA.m07, au22 = rotA.m08;

       let be0 = halfB.x, be1 = halfB.y, be2 = halfB.z,
              bu00 = rotB.m00, bu01 = rotB.m01, bu02 = rotB.m02,
              bu10 = rotB.m03, bu11 = rotB.m04, bu12 = rotB.m05,
              bu20 = rotB.m06, bu21 = rotB.m07, bu22 = rotB.m08;

       let R00 = au00 * bu00 + au01 * bu01 + au02 * bu02;
       let R01 = au00 * bu10 + au01 * bu11 + au02 * bu12;
       let R02 = au00 * bu20 + au01 * bu21 + au02 * bu22;
       let R10 = au10 * bu00 + au11 * bu01 + au12 * bu02;
       let R11 = au10 * bu10 + au11 * bu11 + au12 * bu12;
       let R12 = au10 * bu20 + au11 * bu21 + au12 * bu22;
       let R20 = au20 * bu00 + au21 * bu01 + au22 * bu02;
       let R21 = au20 * bu10 + au21 * bu11 + au22 * bu12;
       let R22 = au20 * bu20 + au21 * bu21 + au22 * bu22;


       let v0 = centerB.x - centerA.x,
              v1 = centerB.y - centerA.y,
              v2 = centerB.z - centerA.z;


       let t0 = v0 * au00 + v1 * au01 + v2 * au02;
       let t1 = v0 * au10 + v1 * au11 + v2 * au12;
       let t2 = v0 * au20 + v1 * au21 + v2 * au22;


       let ra, rb, abs;
       let epsilon = Number.EPSILON;

       let A00 = (R00 >= 0 ? R00 : -R00) + epsilon, A01 = (R01 >= 0 ? R01 : -R01) + epsilon, A02 = (R02 >= 0 ? R02 : -R02) + epsilon;
       let A10 = (R10 >= 0 ? R10 : -R10) + epsilon, A11 = (R11 >= 0 ? R11 : -R11) + epsilon, A12 = (R12 >= 0 ? R12 : -R12) + epsilon;
       let A20 = (R20 >= 0 ? R20 : -R20) + epsilon, A21 = (R21 >= 0 ? R21 : -R21) + epsilon, A22 = (R22 >= 0 ? R22 : -R22) + epsilon;


       ra = ae0;
       rb = be0 * A00 + be1 * A01 + be2 * A02;
       if ((t0 >= 0 ? t0 : -t0) > ra + rb) return false;

       ra = ae1;
       rb = be0 * A10 + be1 * A11 + be2 * A12;
       if ((t1 >= 0 ? t1 : -t1) > ra + rb) return false;

       ra = ae2;
       rb = be0 * A20 + be1 * A21 + be2 * A22;
       if ((t2 >= 0 ? t2 : -t2) > ra + rb) return false;


       rb = be0;
       ra = ae0 * A00 + ae1 * A10 + ae2 * A20;
       abs = t0 * R00 + t1 * R10 + t2 * R20;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       rb = be1;
       ra = ae0 * A01 + ae1 * A11 + ae2 * A21;
       abs = t0 * R01 + t1 * R11 + t2 * R21;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       rb = be2;
       ra = ae0 * A02 + ae1 * A12 + ae2 * A22;
       abs = t0 * R02 + t1 * R12 + t2 * R22;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       // test axis L = A0 x B0
       ra = ae1 * A20 + ae2 * A10;
       rb = be1 * A02 + be2 * A01;
       abs = t2 * R10 - t1 * R20;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       // test axis L = A0 x B1
       ra = ae1 * A21 + ae2 * A11;
       rb = be0 * A02 + be2 * A00;
       abs = t2 * R11 - t1 * R21;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       // test axis L = A0 x B2
       ra = ae1 * A22 + ae2 * A12;
       rb = be0 * A01 + be1 * A00;
       abs = t2 * R12 - t1 * R22;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       // test axis L = A1 x B0
       ra = ae0 * A20 + ae2 * A00;
       rb = be1 * A12 + be2 * A11;
       abs = t0 * R20 - t2 * R00;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       // test axis L = A1 x B1
       ra = ae0 * A21 + ae2 * A01;
       rb = be0 * A12 + be2 * A10;
       abs = t0 * R21 - t2 * R01;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       // test axis L = A1 x B2
       ra = ae0 * A22 + ae2 * A02;
       rb = be0 * A11 + be1 * A10;
       abs = t0 * R22 - t2 * R02;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       // test axis L = A2 x B0

       ra = ae0 * A10 + ae1 * A00;
       rb = be1 * A22 + be2 * A21;
       abs = t1 * R00 - t0 * R10;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       // test axis L = A2 x B1
       ra = ae0 * A11 + ae1 * A01;
       rb = be0 * A22 + be2 * A20;
       abs = t1 * R01 - t0 * R11;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;

       // test axis L = A2 x B2
       ra = ae0 * A12 + ae1 * A02;
       rb = be0 * A21 + be1 * A20;
       abs = t1 * R02 - t0 * R12;
       if ((abs >= 0 ? abs : -abs) > ra + rb) return false;


       return true;

}

// // 球体与 box 碰撞检测
// function sphereBox(sphere, box) {
//        // 将球心坐标转换到 box 的局部空间中
//        const localP = sphere.center.sub(box.center).rotateX(-box.node.eulerAngles.x).rotateY(-box.node.eulerAngles.y).rotateZ(-box.node.eulerAngles.z);

//        // 计算离包围盒最近的点
//        const closest = new Vec3(
//               Math.max(box.min.x, Math.min(localP.x, box.max.x)),
//               Math.max(box.min.y, Math.min(localP.y, box.max.y)),
//               Math.max(box.min.z, Math.min(localP.z, box.max.z))
//        );

//        // 判断距离是否小于等于球半径
//        const distance = closest.sub(localP).mag();
//        return distance <= sphere.radius;
// }

const localP = { x: 0, y: 0, z: 0 };
const maxDist = { x: 0, y: 0, z: 0 };
const localCenter = { x: 0, y: 0, z: 0 };
const obbToLocal = { x: 0, y: 0, z: 0, w: 1.0 };

// 计算球体到 AABB 的 SDF 距离
export function sphereAABBDistance(center: any, radius: any, size: any): boolean {


       // 计算离包围盒最近的点
       maxDist.x = Math.max(-size.x, Math.min(center.x, size.x));
       maxDist.y = Math.max(-size.y, Math.min(center.y, size.y));
       maxDist.z = Math.max(-size.z, Math.min(center.z, size.z));

       Vec3.subtract(maxDist, maxDist, center);

       const distSqr = Vec3.dot(maxDist, maxDist);

       return distSqr <= radius * radius;

}



// 计算球体到 OBB 的 SDF 距离
export function sphereOBBDistance(
       sphereCenter: any, // 球体中心点坐标
       radius: any, // 球体半径
       obbCenter: any, // OBB 中心点坐标
       obbQuaternion: any, // OBB 旋转四元数
       obbHalfExtents: any // OBB 半扩展尺寸
): boolean {
       // 将球体中心点转换到 OBB 坐标系下
       // const localCenter = new Vec3();
       Vec3.subtract(localCenter, sphereCenter, obbCenter);

       // 获取 OBB 到本地坐标系的旋转四元数
       // const obbToLocal = new Quat();
       Quat.conjugate(obbToLocal, obbQuaternion);

       // 球体中心点在 OBB 本地坐标系下的坐标
       // const localP = new Vec3();
       Vec3.transformQuat(localP, localCenter, obbToLocal);

       // 将 OBB 半扩展尺寸作为 AABB 的 min 和 max 坐标点，计算 AABB 包围盒上的距离
       // const aabbMin = new Vec3(-obbHalfExtents.x, -obbHalfExtents.y, -obbHalfExtents.z);
       // const aabbMax = new Vec3(obbHalfExtents.x, obbHalfExtents.y, obbHalfExtents.z);
       // aabbMin.x = -obbHalfExtents.x, aabbMin.y = -obbHalfExtents.y, aabbMin.z = -obbHalfExtents.z;
       // aabbMax.x = obbHalfExtents.x, aabbMax.y = obbHalfExtents.y, aabbMax.z = obbHalfExtents.z;

       return sphereAABBDistance(localP, radius, obbHalfExtents);

       // const distToAABB = sphereAABBDistance(localP, radius, aabbMin, aabbMax);
       // return Math.max(distToAABB, 0); // 若球体与 OBB 相交则返回 0，否则返回球体到 OBB 的距离
}