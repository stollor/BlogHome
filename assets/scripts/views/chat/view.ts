import { Button, Component, EditBox, Node, _decorator } from 'cc';
import { IChatItem } from './item';
import { ChatListView } from './list';
const { ccclass, property } = _decorator;

@ccclass('ChatView')
export class ChatView extends Component {
	@property(ChatListView) pageView: ChatListView;
	@property(EditBox) editInput: EditBox;

	@property(Node) nodeSend: Node;
	@property(Node) nodeTab1: Node;
	@property(Node) nodeTab2: Node;
	@property(Node) nodeTab3: Node;
	@property(Node) nodeTab4: Node;
	private _nowList = [];
	private _msg = {};
	start() {
		this._msg['世界'] = this.getRandomList(1);
		this._msg['私人'] = this.getRandomList(2);
		this._msg['工会'] = this.getRandomList(3);
		this._msg['系统'] = this.getRandomList(4);
		this._nowList = this._msg['世界'];
		this.pageView.modelManager.insert(this._nowList);
		this.pageView.scrollManager.scrollToFooter(0.5);

		this.nodeSend.on(Button.EventType.CLICK, this.onSend, this);
		this.nodeTab1.on(
			Button.EventType.CLICK,
			() => {
				this.onClickSwitch('系统');
			},
			this
		);
		this.nodeTab2.on(
			Button.EventType.CLICK,
			() => {
				this.onClickSwitch('私聊');
			},
			this
		);
		this.nodeTab3.on(
			Button.EventType.CLICK,
			() => {
				this.onClickSwitch('工会');
			},
			this
		);
		this.nodeTab4.on(
			Button.EventType.CLICK,
			() => {
				this.onClickSwitch('世界');
			},
			this
		);
	}

	onClickSwitch(key) {
		this.pageView.modelManager.clear();
		this.pageView.modelManager.insert(this._msg[key]);
		this.pageView.scrollManager.scrollToFooter(0.5);
	}

	onSend() {
		let data = {
			type: 1,
			name: '我',
			msg: this.editInput.string,
			head: '',
		};
		this.pageView.modelManager.insert(data);
		this.editInput.string = '';
		this.pageView.scrollManager.scrollToFooter(0.5);
	}

	/**
	 *
	 * @param index 1-世界 2-私人 3-工会 4-系统
	 * @returns
	 */
	getRandomList(index: number) {
		var list: IChatItem[] = [];
		let msg1 = [
			'<color=#0000ff>10:59</color>',
			'恭喜玩家<color=#00ff00>蔡徐坤</color>获得神器<color=#ff0000>红莲铠甲</color>',
			'您已通过第<color=#00ff00>10</color>关',
		][~~(3 * Math.random())];
		let msg2 = [
			'大佬们,第5关怎么过?',
			'有没有兑换码?',
			'工会招人拉!',
			'这么多人?',
			'你说的对,但是<color=#0000ff>口袋觉醒</color>是一款宝可梦次世代挂机手游,使用先进的UE9技术,带给你沉浸的体验.',
			'游戏里实际只有我一个人,不信我换号给你发',
			'游戏里实际只有我一个人,不信我换号给你发',
			'游戏里实际只有我一个人,不信我换号给你发',
			'游戏里实际只有我一个人,不信我换号给你发',
		];
		let msg3 = ['兄弟,出号吗?', '这号500我要了', '加我微信'];
		let msg4 = ['晚上7点打本,缺勤三次飞机', '收到', '收到', '收到', '体力不够怎么办?', '打游戏比上班还累...佛了'];
		let msg5 = ['已通关 1-1', '已通关 1-2', '已通关 1-3', '已通关 1-4', '已通关 1-5', '已通关 1-6', '已通关 1-7'];
		let namelist = ['及你太美', '王德法', '吴联编', '吃个涛涛', '夭寿啦', '二师兄', '无良天尊', '良心'];

		if (index == 1) {
			//世界
			for (let i = 0; i < 99; i++) {
				if (i % 9 == 0) {
					list.push({
						type: 2,
						msg: msg1[~~(msg1.length * Math.random())],
						head: '',
						name: '',
					});
				} else {
					list.push({
						type: i % 15 == 0 ? 1 : 0,
						name: namelist[~~(namelist.length * Math.random())],
						msg: msg2[~~(msg2.length * Math.random())],
						head: '',
					});
				}
			}
		} else if (index == 2) {
			//私人
			for (let i = 0; i < 3; i++) {
				let name = namelist[~~(namelist.length * Math.random())];
				list.push({
					type: 0,
					name: name,
					msg: msg3[i % msg3.length],
					head: '',
				});
			}
		} else if (index == 3) {
			//工会
			for (let i = 0; i < 3; i++) {
				list.push({
					type: 0,
					name: namelist[~~(namelist.length * Math.random())],
					msg: msg4[i % msg4.length],
					head: '',
				});
			}
		} else if (index == 4) {
			//系统
			for (let i = 0; i < 3; i++) {
				list.push({
					type: 2,
					name: '系统',
					msg: msg5[i % msg5.length],
					head: '',
				});
			}
		}
		return list;
	}
}
