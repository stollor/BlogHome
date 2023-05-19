'use strict';

const Editor2D 		= require('./editor2D');
const fe 			= Editor2D.require('packages://simple-code/tools/tools.js');
const fs            = require('fs');
const path 			= require("path");


var eventFuncs = 
 {
 	// 合并事件
 	eventMerge(old_msg,moduleFile="panel_ex.js"){
 		let fileList = fe.getDirAllFiles(Editor2D.url("packages://simple-code/extensions"),[])

 		let messages = {}
 		let scripts = []
 		fileList.forEach((v)=>
 		{
 			if(v.substr(v.lastIndexOf(path.sep)+1) == moduleFile){
 				let obj = require(v);
 				scripts.push(obj);

 				for(let name in obj.messages){
 					// electron.ipcRenderer.on(name,obj[name].bind(obj)); // 只能监听其它面板发送的事件
 					// 合并监听函数
 					if (messages[name])
 					{
 						let old_func = messages[name]
 						let now_func = obj.messages[name].bind(obj)
 						messages[name] = function(...args){
 							old_func(...args,old_msg);
 							return now_func(...args,old_msg);
 						}
 					}else{
 						let now_func = obj.messages[name].bind(obj)
 						messages[name] = function(...args){ return now_func(...args,old_msg)}
 					}
 				}
 			}
 		})

 		for(let name in old_msg){
 			if (messages[name])
 			{
 				let old_func = old_msg[name]
 				let now_func = messages[name]
 				messages[name] = function(...args){
 					(old_func.bind(this))(...args,old_msg);
 					return now_func(...args,old_msg);
 				}
 			}else{
 				messages[name] = old_msg[name]
 			}
 		}

 		return {messages,scripts}
 	},
};

module.exports = eventFuncs;