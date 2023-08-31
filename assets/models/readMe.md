# 说明
models中的每个文件夹都是一个功能模块,每个模块中都有对应的readMe.md文件,用于说明该模块的功能和使用方法

### 为什么要使用这种方式
因为每个功能模块都是一个bundle,所以在未加载对应模块时,引用相关的代码会报错.
为了避免import 的报错,只能使用全局变量来中转
所以选择使用全局变量models来使用对应的模块功能

## 使用
如需在项目代码中使用model中的xxx模块的a方法,可用此方法调用:
```TS
models.xxx.a()
```

一般而言,一个模块对应models中的一个名称.

#### 但是也有例外:

em属于corekit模块,按照一般的默认结构应该是
```TS
models.corekit.em.on("xxx",this.xxx,this);
```

但是em使用频率高,这样使用太麻烦,所以corekit中的管理模块一般直接在models下使用,如:
```TS
models.em.on("xxx",this.xxx,this);
models.assetMgr.load("xxx",JsonAsset);
```


## 注册
如何注册一个模块?
先创建一个对应文件夹,如"tools",放入相应文件,并创建index.js文件,在index.js中添加如下代码:
```TS
import ToolsMgr from "./ToolsMgr";
declare module '../index' {
	interface ModelMgr {
		tools:ToolsMgr;
	}
}
```
如何,便可以将新的模块注册进models中,并且可以通过models.tools调用