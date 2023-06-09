
# 基础使用教程:
1.鼠标单击选中脚本或场景上有绑定脚本的Node后自动加载代码进入编辑
2.双击场景Label可直接编辑内容
3.鼠标拖动资源或Node到代码窗口完成成员变量的绑定
4.日常使用示例:"https://forum.cocos.org/t/topic/115563"
5.自适应布局设置:"https://forum.cocos.org/t/topic/103380
6.最新文档:"https://store.cocos.com/#/resources/detail/2313"


# 将窗口嵌入Creator
通过鼠标拖动左上角 "快闪编辑器" 蓝色的标题到Creator内完成嵌入

⚠️注意: 如果 "快闪编辑器" 窗口没有嵌入 "Creator编辑器" 内会导致部分功能无法启用
⚠️建议: 体验以下功能之前请先将本插件窗口嵌入Creator


# 主要功能
- 1.备忘录（启动插件第一个页面）

- 2.vscode迷你搜索栏（用于打开文件、场景,快捷键[**v**]）

- 3.vscode代码编辑器功能

- 4.搜索未使用的资源（资源管理器鼠标右击菜单里）

- 5.拖拽资源或节点到脚本自动生成变量与绑定

- 6.在creator的资源管理器内修改TS/JS文件路径可自动同步修改代码import/require引用路径

# 辅助编辑功能:
- 1.快速生成脚本并绑定节点(鼠标选中场景中的节点按[**F3**]快速生成脚本并绑定，脚本在该场景同级目录里生成。生成代码模板格式可在设置配置)

- 2.批量重命名,鼠标右击菜单选择功能或按[**D**]

- 4.批量绑定组件（鼠标选取好节点时按[**G**]打开组件界面，完成后绑定组件到节点）

- 5.批量插入预制节点（鼠标选取好节点时按[**A**]打开预制节点界面，完成后插入预制节点到场景）

- 6.快速批量删除节点和绑定的脚本（鼠标选取好节按[**Alt+Shift+Enter**]弹出确认界面进行删除操作）

- 7.快捷键目录（可以将'文件夹'绑定'数字键快捷键',通过按数字键转跳到指定目录。使用方法:
选中文件夹后绑定快捷键:Alt+[**0-9**]绑定指定数字键标签, 按**0~9**转跳到已绑定的文件夹位置）

- 8.快捷键节点（按[**Alt+\~**]可以保存当前场景所有节点选取状态，按下 [**\~**] 回到之前保存的节点选取状态）

- 9.批量选中同名的节点（类似在vscode按 **Ctrl+D** 批量选中同名节点,操作快捷 [**S**] 或 [**Alt+D**]）


# 项目管理：
- 1.**Alt+F1**打开项目目录

- 2.**Alt+F2**打开项目目录到外部编辑器,编辑器路径配置在配置快捷键选项里打开

- 3.**Alt+F3**打开项目目录到creator新窗口

- 4.其它还有配置快捷键、模板、代码输入提示设置。


# 代码编辑功能：

- 1.支持 import/require 引入的模块代码提示

- 2.支持游戏项目内的函数名跨文件提示

- 3.支持变量引用位置搜索、跳转

- 4.支持**Ctrl+点击** 跳转到对象成员声明的文件位置

- 5.支持json/js/ts文档格式化

- 6.记住上关闭creator前打开代码,重启creator恢复代码标签,快速进入上次工作状态;

- 7.支持[**Ctrl+Shift+O**]函数跳转...,其它几十条功能vscode相同,就不一一介绍了

- 8.支持导入自定义 xxxx_api.d.ts 的代码声明文件,
 使用方法:d.ts声明文件放至项目根目录(与assets文件夹同级),然后重启creator即可

- 9.js代码函数跳/提示转功能达到 WebStorm 编辑器级别

- 10.添加彩虹括号插件

- 11.VIM模式支持多光标

- 12.支持**Ctrl+Shift+Y**打开控制台输入命令


# 设置功能：
- 1.设置面板，常用设置在此处修改

- 2.扩展模块，快速打开本插件的扩展目录，可自行添加扩展

- 3.配置新建模板，配置资源管理器或节点树管理器右击菜单的新建脚本选项

- 4.配置快捷键，常用快捷键配置

- 5.配置其它功能，代码编辑器的一些细节配置修改

- 6.添加代码输入提示

- 7.配置绑定组件解析规则，可以自定义拖拽变量生成规则

- 8.配置 Prettier格式化规则，在设置面板开启Prettier插件后才生效

# 本插件独立窗口运行以下功能会失效:
- 批量重命名[D]
- 批量绑定组件[G]
- 批量插入预制节点[A]
- 批量搜索选中节点的子节点[F]
- 快速打开 Scene 或 Prefab,快捷键[v]
- 搜索未使用的资源
- 双击Label进入编辑状态
- 新建脚本并绑定Node(菜单选项丢失)


*注1: 大型项目建议在设置中修改编译触发模式为手动档
*注2: 若发现ctrl+shift+f无法打开全局搜索,请关闭搜狗输入法冲突的全局快捷键

建议问题反馈QQ群:569081407

^如果觉得好用赏个好评支持,谢谢支持！^
