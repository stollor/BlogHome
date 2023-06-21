import { Color, Graphics, Vec2, Vec3 } from 'cc';

export class draw {
	/**
	 * 画直线
	 * @param panit 画笔
	 * @param p0  起点
	 * @param p1  终点
	 * @param color 颜色
	 * @param width 宽度
	 */
	public static drawLine(panit: Graphics, p0: Vec3 | Vec2, p1: Vec3 | Vec2, color: Color, width: number) {
		panit.strokeColor = color;
		panit.lineWidth = width;
		panit.moveTo(p0.x, p0.y);
		panit.lineTo(p1.x, p1.y);
		panit.stroke();
	}

	s;
}
