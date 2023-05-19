import { Enum } from "cc";

/**方向 */
export enum Orientation {
    /**纵向*/
    Vertical,
    /**横向 */
    Horizontal
}
/**移动类型 */
export enum MovementType {
    /**不受限制 */
    Unrestricted,
    /**弹性*/
    Elastic,
    /** 固定*/
    Clamped
}

/**排列坐标轴 */
export enum ArrangeAxis {
    Start,
    End
}

/**拉伸方向 */
export enum StretchDirection {
    /**自动 */
    Auto,
    /**头 */
    Header,
    /**尾 */
    Footer,
    /**中心 */
    Center,
}

/**层级 */
export enum Layer {
    Lowest,
    Medium,
    Highest
}

/**循环模式 */
export enum WrapMode {
    /**自动 */
    Auto,
    /**循环 */
    Wrap,
    /**不循环 */
    Nowrap
}

/**触摸类型 */
export enum TouchMode {
    /** 当内容未填满时 并且未开启PullRelease 并且 未开启Center 功能是不可滑动 */
    Auto,
    /** 永远可以滑动，无论是否有内容 */
    AlwaysAllow,
    /** 禁用滑动 */
    Disabled
}
export enum MagneticDirection {
    Header, Footer
}
export enum ChildAlignment {
    UpperLeft,
    UpperCenter,
    UpperRight,
    MiddleLeft,
    MiddleCenter,
    MiddleRight,
    LowerLeft,
    LowerCenter,
    LowerRight
}
export enum ScrollDirection {
    Up,
    Down,
    Left,
    Right,
    None
}
export enum ScrollbarDirection {
    Top_To_Bottom,
    Bottom_To_Top,
    Left_To_Right,
    Right_To_Left,
}
export enum NestedDirection {
    Both,
    Header,
    Footer
}
export enum AlwaysScroll {
    Auto,
    Header,
    Footer
}
export enum IndicatorMode {
    Normal,
    Button
}
export enum Transition {
    None,
    ColorTint,
    SpriteSwap,
    Scale,
}
export enum ReleaseState {
    IDLE = 'IDLE',
    PULL = 'PULL',
    WAIT = 'WAIT',
    RELEASE = "RELEASE",
}
Enum(Orientation)
Enum(MovementType)
Enum(ArrangeAxis)
Enum(StretchDirection)
Enum(MagneticDirection)
Enum(ScrollbarDirection)
Enum(ChildAlignment)
Enum(TouchMode)
Enum(IndicatorMode)
Enum(Transition)
