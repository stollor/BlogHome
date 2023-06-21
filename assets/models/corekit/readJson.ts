import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 这个文件是尝试 在浏览器环境读取本地json文件
 */
@ccclass('readJson')
export class readJson extends Component {
	private _result;
	start() {}

	aaa() {
		// var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
		// var name = selectedFile.name;//读取选中文件的文件名
		// var size = selectedFile.size;//读取选中文件的大小
		// console.log("文件名:"+name+"大小："+size);
		var selectedFile = new File([], 'out');
		var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
		reader.readAsText(selectedFile); //读取文件的内容

		reader.onload = function () {
			console.log('读取结果：', this.result); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。

			console.log('读取结果转为JSON：');
			let json = JSON.parse(this.result);
			console.log(json.name);
			console.log(json.age);
		};
	}

	//  /**
	//  * 读取本地文件中JSON字符串
	//  *
	//  * @param fileName
	//  * @return
	//  */
	// private String getJson(String fileName) {

	//     StringBuilder stringBuilder = new StringBuilder();
	//     try {
	//         BufferedReader bf = new BufferedReader(new InputStreamReader(
	//                 getAssets().open(fileName)));
	//         String line;
	//         while ((line = bf.readLine()) != null) {
	//             stringBuilder.append(line);
	//         }
	//     } catch (IOException e) {
	//         e.printStackTrace();
	//     }
	//     return stringBuilder.toString();
	// }
	update(deltaTime: number) {}
}
