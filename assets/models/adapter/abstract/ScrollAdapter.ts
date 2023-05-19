import { _decorator, Component, Node, Size, Prefab, Color, game, } from 'cc';
import { ArrangeAxis, Orientation } from '../define/enum';
import { IElement } from '../define/interface';
import { CenterManager } from '../manager/CenterManager';
import { LayoutManager } from '../manager/LayoutManager';
import { ModelManager } from '../manager/ModelManager';
import { PageViewManager } from '../manager/PageViewManager';
import { ReleaseManager } from '../manager/ReleaseManager';
import { ScrollManager } from '../manager/ScrollManager';
import { ViewManager } from '../manager/ViewManager';
import { Holder } from './Holder';
import { View } from './View';
const { ccclass, property } = _decorator;
@ccclass('ScrollAdapter')
export abstract class ScrollAdapter<T = any> extends Component {
    @property({type:ScrollManager,displayName:"滚动管理器",tooltip:""}) scrollManager: ScrollManager = new ScrollManager()
    @property({type:ViewManager,displayName:"可视区域管理器",tooltip:""}) viewManager: ViewManager<T> = new ViewManager()
    @property({type:LayoutManager,displayName:"布局管理",tooltip:""}) layoutManager: LayoutManager = new LayoutManager()
    @property({type:PageViewManager,displayName:"页面管理器",tooltip:""}) pageViewManager: PageViewManager = new PageViewManager()
    @property({type:ReleaseManager,displayName:"释放管理器",tooltip:""}) releaseManager: ReleaseManager = new ReleaseManager()
    @property({type:CenterManager,displayName:"居中管理器",tooltip:""}) centerManager: CenterManager = new CenterManager()
    public modelManager: ModelManager<T> = new ModelManager()
    public abstract getPrefab(data: T): Node | Prefab
    public abstract getView(): View<T>
    public abstract getHolder(node: Node, code: string): Holder<T>
    public abstract initElement(element: IElement, data: T)
    /** 是否垂直滚动 */
    public get isVertical() {
        return this.scrollManager.orientation == Orientation.Vertical
    }
    /** 是否水平滚动 */
    public get isHorizontal() {
        return this.scrollManager.orientation == Orientation.Horizontal
    }
    /** 主轴排列方向 */
    public get isArrangeAxisStart() {
        return this.viewManager.arrangeAxis == ArrangeAxis.Start
    }
    /** 主轴方向 尺寸|坐标 key */
    public get mainAxis() {
        return this.isVertical ? "y" : "x"
    }
    /** 交叉轴方向 尺寸|坐标 key */
    public get crossAxis() {
        return this.isVertical ? "x" : "y"
    }
    /** 主轴方向锚点 */
    public get mainAxisAnchorPoint() {
        let point = this.isVertical ? 1 : 0
        return this.isArrangeAxisStart ? point : 1 - point
    }
    /** 主轴方向可视区域尺寸 */
    public get mainAxisSize() {
        return this.scrollManager.view.contentSize[this.mainAxis]
    }
    /** 交叉轴方向可视区域尺寸 */
    public get crossAxisSize() {
        return this.scrollManager.view.contentSize[this.crossAxis]
    }
    /** 根据滑动方向和排列方向决定的乘积 */
    public get multiplier() {
        var multiplier = this.isVertical ? -1 : 1
        return this.isArrangeAxisStart ? -multiplier : multiplier
    }
    /** 主轴方向 Header 的 padding */
    public get paddingHeader() {
        if (this.isHorizontal) {
            return this.isArrangeAxisStart ? this.viewManager.left : this.viewManager.right
        } else {
            return this.isArrangeAxisStart ? this.viewManager.top : this.viewManager.bottom
        }
    }
    /** 主轴方向 Footer 的 padding */
    public get paddingFooter() {
        if (this.isHorizontal) {
            return this.isArrangeAxisStart ? this.viewManager.right : this.viewManager.left
        } else {
            return this.isArrangeAxisStart ? this.viewManager.bottom : this.viewManager.top
        }
    }
    /** 主轴方向 padding 总和 */
    public get mainAxisPadding() {
        if (this.isHorizontal) {
            return this.viewManager.left + this.viewManager.right
        } else {
            return this.viewManager.top + this.viewManager.bottom
        }
    }
    /**
     * 从父节点中递归获取 ScrollAdapter
     * @param node 第一个获取ScrollAdapter的node
     * @return 返回父节点中第一个找到的 ScrollAdapter
     */
    public getParentAdapter(node: Node) {
        if (node == null) return
        var adapter = node.getComponent("ScrollAdapter")
        if (adapter) {
            return adapter
        }
        return this.getParentAdapter(node.parent)
    }

    protected __preload() {
        this.scrollManager.internal_create(this)
        this.viewManager.internal_create(this)
        this.modelManager.internal_create(this)
        this.releaseManager.internal_create(this)
        this.layoutManager.internal_create(this)
        this.pageViewManager.internal_create(this)
        this.centerManager.internal_create(this)

        this.viewManager.internal_init()
        this.releaseManager.internal_init()
        this.layoutManager.internal_init()
        this.pageViewManager.internal_init()
        this.centerManager.internal_init()
        this.scrollManager.internal_init()
        this.modelManager.internal_init()
    }

    protected lateUpdate(deltaTime: number) {
        this.scrollManager.internal_lateUpdate(deltaTime)
        this.viewManager.internal_lateUpdate(deltaTime)
        this.layoutManager.internal_lateUpdate(deltaTime)
        this.releaseManager.internal_lateUpdate(deltaTime)
    }
}