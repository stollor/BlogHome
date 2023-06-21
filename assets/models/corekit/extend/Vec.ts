import { Vec2, Vec3 } from 'cc';

declare module 'cc' {
	interface Vec2 {
		to3: (z?: number) => Vec3;
	}
}

Vec2.prototype.to3 = function (z?: number) {
	return new Vec3(this.x, this.y, z || 0);
};
