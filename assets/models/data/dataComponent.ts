import { CCString } from 'cc';
import { _decorator, Component, Node } from 'cc';

const { ccclass, property } = _decorator;




@ccclass('dataComponent')
export class dataComponent extends Component {

	// @property([DataItem]) dataList: DataItem[]=[]
	@property(CCString) key="";


}


