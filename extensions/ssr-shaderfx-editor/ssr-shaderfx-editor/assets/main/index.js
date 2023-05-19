window.__require = function e(t, n, o) {
	function i(r, s) {
		if (!n[r]) {
			if (!t[r]) {
				var c = r.split("/");
				if (c = c[c.length - 1], !t[c]) {
					var l = "function" == typeof __require && __require;
					if (!s && l) return l(c, !0);
					if (a) return a(c, !0);
					throw new Error("Cannot find module '" + r + "'")
				}
				r = c
			}
			var h = n[r] = {
				exports: {}
			};
			t[r][0].call(h.exports, function(e) {
				return i(t[r][1][e] || e)
			}, h, h.exports, e, t, n, o)
		}
		return n[r].exports
	}
	for (var a = "function" == typeof __require && __require, r = 0; r < o.length; r++) i(o[r]);
	return i
}({
	Box: [function(e, t) {
		"use strict";
		cc._RF.push(t, "87ca3uSNRJI5JPpHTmIKrZ5", "Box"), cc.Class({
			extends: cc.Component,
			properties: {},
			start: function() {},
			update: function() {}
		}), cc._RF.pop()
	}, {}],
	DigraphEditorCanvasManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c2bfdIveFFBdayq8RjQ4XoI", "DigraphEditorCanvasManager"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Manager.Canvas = cc.Class({
			ctor: function() {
				this._zoomScale = 1
			},
			init: function(e) {
				this.layerCanvas = e
			},
			getZoomScale: function() {
				return this._zoomScale
			},
			setZoomScale: function(e) {
				e > 3 || e <= .5 || (this._zoomScale = e, this.layerCanvas.zoom(this._zoomScale))
			},
			resetZoomScale: function() {
				this.setZoomScale(1)
			},
			zoomIn: function() {
				this.setZoomScale(this._zoomScale + .1);
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Canvas.zoomIn", !0);
				e.setUserData(this._zoomScale), e.target = this, cc.systemEvent.dispatchEvent(e)
			},
			zoomOut: function() {
				this.setZoomScale(this._zoomScale - .1);
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Canvas.zoomOut", !0);
				e.setUserData(this._zoomScale), e.target = this, cc.systemEvent.dispatchEvent(e)
			},
			reset: function() {},
			focus: function(e) {
				this.layerCanvas.focus(e)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandBase: [function(e, t) {
		"use strict";
		cc._RF.push(t, "485c33jZt9J/ZI/9sw73iWf", "DigraphEditorCommandBase");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Base = cc.Class({
			ctor: function() {
				this._receiver = n.DigraphEditor.Director, this._arguments = arguments, this._name = "ssr.DigraphEditor.Command.Base", this._isUndoable = !0
			},
			do: function() {
				cc.log("need override")
			},
			undo: function() {
				cc.log("need override")
			},
			redo: function() {
				cc.log("need override")
			},
			isUndoable: function() {
				return this._isUndoable
			},
			getName: function() {
				return this._name
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandCanvasZoomIn: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d78abONoX5LarKas7GoQDeF", "DigraphEditorCommandCanvasZoomIn");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Canvas.ZoomIn = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Canvas.ZoomIn", this._doFunc = n.DigraphEditor.Manager.Director.prototype.canvasZoomInInvoker, this._redoFunc = n.DigraphEditor.Manager.Director.prototype.canvasZoomInInvoker, this._undoFunc = n.DigraphEditor.Manager.Director.prototype.canvasZoomOutInvoker
			},
			do: function() {
				this._panel = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, this._arguments)
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandCanvasZoomOut: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b863ezgsy5O/JLSb2sd4nPG", "DigraphEditorCommandCanvasZoomOut");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Canvas.ZoomOut = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Canvas.ZoomOut", this._doFunc = n.DigraphEditor.Manager.Director.prototype.canvasZoomOutInvoker, this._undoFunc = n.DigraphEditor.Manager.Director.prototype.canvasZoomInInvoker, this._redoFunc = n.DigraphEditor.Manager.Director.prototype.canvasZoomOutInvoker
			},
			do: function() {
				this._panel = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, this._arguments)
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandConnectionCreate: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d576eWO4gVE26X+5X7saZ2V", "DigraphEditorCommandConnectionCreate");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Connection.Create = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Connection.Create", this._doFunc = n.DigraphEditor.Manager.Director.prototype.createConnectionInvoker, this._undoFunc = n.DigraphEditor.Manager.Director.prototype.removeConnectionInvoker, this._redoFunc = n.DigraphEditor.Manager.Director.prototype.restoreConnectionInvoker
			},
			do: function() {
				this._connection = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, [this._connection])
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, [this._connection])
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandConnectionLink: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7bc28E8FAhDFoEaU/Gp8DvL", "DigraphEditorCommandConnectionLink");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.ConnectionLink = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.ConnectionLink", this._receiver = arguments[0], this._arguments = Array.prototype.slice.call(arguments, 1), this._doFunc = n.DigraphEditor.Manager.Connection.prototype.link, this._undoFunc = n.DigraphEditor.Manager.Connection.prototype.unlink, this._redoFunc = n.DigraphEditor.Manager.Connection.prototype.link, this._connection = null
			},
			do: function() {
				this._connection = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, [this._connection])
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandDigraphUpdate: [function(e, t) {
		"use strict";
		cc._RF.push(t, "6f1c9tCCKhEMoZP+fWqbTjn", "DigraphEditorCommandDigraphUpdate");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.DigraphUpdate = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.DigraphUpdate", this._doFunc = n.DigraphEditor.Manager.Director.prototype.updateDigraph
			},
			do: function() {
				this._panel = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {},
			redo: function() {}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "81508fBCexPGooPEQK50gGj", "DigraphEditorCommandManager"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Manager.Command = cc.Class({
			ctor: function() {
				this._commandsList = [], this._currentCommand = -1
			},
			execute: function(e, t) {
				if (void 0 === t && (t = !0), e.do(), e.isUndoable()) {
					this._currentCommand++, this._commandsList[this._currentCommand] = e, this._commandsList[this._currentCommand + 1] && this._commandsList.splice(this._currentCommand + 1);
					var n = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Command.do", !0);
					n.setUserData(e), cc.systemEvent.dispatchEvent(n)
				}
			},
			undo: function() {
				var e = this._commandsList[this._currentCommand];
				if (e) {
					e.undo(), this._currentCommand--;
					var t = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Command.undo", !0);
					t.setUserData(e), cc.systemEvent.dispatchEvent(t)
				}
			},
			redo: function() {
				var e = this._commandsList[this._currentCommand + 1];
				if (e) {
					e.redo ? e.redo() : e.do(), this._currentCommand++;
					var t = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Command.redo", !0);
					t.setUserData(e), cc.systemEvent.dispatchEvent(t)
				}
			},
			reset: function() {
				this._commandsList = [], this._currentCommand = -1;
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Command.reset", !0);
				e.setUserData(command), cc.systemEvent.dispatchEvent(e)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelCreate: [function(e, t) {
		"use strict";
		cc._RF.push(t, "49ce03kp39P15MAlzl7scWr", "DigraphEditorCommandPanelCreate");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Panel.Create = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Panel.Create", this._doFunc = n.DigraphEditor.Manager.Director.prototype.panelCreateInvoker, this._undoFunc = n.DigraphEditor.Manager.Director.prototype.panelRemoveInvoker, this._redoFunc = n.DigraphEditor.Manager.Director.prototype.panelRestoreInvoker
			},
			do: function() {
				this._panel = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, [this._panel])
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, [this._panel])
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelDeselect: [function(e, t) {
		"use strict";
		cc._RF.push(t, "0cf8dEc1LhOBYxXOyLEI6+N", "DigraphEditorCommandPanelDeselect");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Panel.Deselect = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Panel.Deselect", this._receiver = arguments[0], this._arguments = Array.prototype.slice.call(arguments, 1), this._doFunc = n.DigraphEditor.Manager.Panel.prototype.deselectPanel, this._undoFunc = n.DigraphEditor.Manager.Panel.prototype.selectPanel
			},
			do: function() {
				this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, [this._arguments[0]])
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelGroupSelect: [function(e, t) {
		"use strict";
		cc._RF.push(t, "abba8eqCuZPbKacYVOzgmTx", "DigraphEditorCommandPanelGroupSelect");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.PanelGroupSelect = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.PanelGroupSelect", this._receiver = arguments[0], this._arguments = Array.prototype.slice.call(arguments, 1), this._doFunc = this._redoFunc = n.DigraphEditor.Manager.Panel.prototype.groupSelect, this._undoFunc = n.DigraphEditor.Manager.Panel.prototype.groupSelect
			},
			do: function() {
				this._panels = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, [this._panels[1], this._panels[0]])
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelGroup: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b43ee6uL2NKGJ7EPjjitn5F", "DigraphEditorCommandPanelGroup");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.PanelGroup = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.PanelGroup", this._receiver = arguments[0], this._arguments = Array.prototype.slice.call(arguments, 1), this._doFunc = n.DigraphEditor.Manager.Group.prototype.addGroup, this._redoFunc = n.DigraphEditor.Manager.Group.prototype.addGroup, this._undoFunc = n.DigraphEditor.Manager.Group.prototype.removeGroup
			},
			do: function() {
				this._group = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, [this._group])
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelMoveTo: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d0649x9R4pLRruOmrItguQI", "DigraphEditorCommandPanelMoveTo");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Panel.MoveTo = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Panel.MoveTo", this._doFunc = n.DigraphEditor.Manager.Director.prototype.panelMoveToInvoker, this._undoFunc = n.DigraphEditor.Manager.Director.prototype.panelMoveRestoreInvoker, this._redoFunc = n.DigraphEditor.Manager.Director.prototype.panelMoveToInvoker
			},
			do: function() {
				this.positionArray = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, [this._arguments[0], this.positionArray])
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelRemove: [function(e, t) {
		"use strict";
		cc._RF.push(t, "2bd97dnmT5BS5mBAD7lHweo", "DigraphEditorCommandPanelRemove");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.PanelRemove = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.PanelRemove", this._receiver = arguments[0], this._arguments = Array.prototype.slice.call(arguments, 1), this._doFunc = n.DigraphEditor.Manager.Panel.prototype.removePanel, this._undoFunc = n.DigraphEditor.Manager.Panel.prototype.createPanelWithPanel, this._redoFunc = n.DigraphEditor.Manager.Panel.prototype.removePanel
			},
			do: function() {
				this._panel = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, [this._panel, !1])
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, [this._panel])
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelSelect: [function(e, t) {
		"use strict";
		cc._RF.push(t, "1b787JP2JhKWY3HizPlC3WF", "DigraphEditorCommandPanelSelect");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Panel.Select = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Panel.Select", this._receiver = arguments[0], this._arguments = Array.prototype.slice.call(arguments, 1), this._doFunc = this._redoFunc = n.DigraphEditor.Manager.Panel.prototype.selectPanel, this._undoFunc = n.DigraphEditor.Manager.Panel.prototype.deselectPanel
			},
			do: function() {
				this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, this._arguments)
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelTouchEnd: [function(e, t) {
		"use strict";
		cc._RF.push(t, "685c9oxoEJAFrVFTJwdCBLV", "DigraphEditorCommandPanelTouchEnd");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Panel.TouchEnd = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Panel.TouchEnd", this._doFunc = n.DigraphEditor.Manager.Director.prototype.panelTouchEnd, this._undoFunc = n.DigraphEditor.Manager.Director.prototype.panelTouchEnd, this._redoFunc = n.DigraphEditor.Manager.Director.prototype.panelTouchEnd
			},
			do: function() {
				this._doFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelTouchMove: [function(e, t) {
		"use strict";
		cc._RF.push(t, "afdfe0ZCk9FMIV2HpBM9Gsr", "DigraphEditorCommandPanelTouchMove");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Panel.TouchMove = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Panel.TouchMove", this._isUndoable = !1, this._doFunc = n.DigraphEditor.Manager.Director.prototype.panelTouchMove
			},
			do: function() {
				this._doFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelTouchStart: [function(e, t) {
		"use strict";
		cc._RF.push(t, "2ed11aktctAvJ0ILr10923U", "DigraphEditorCommandPanelTouchStart");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Panel.TouchStart = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Panel.TouchStart", this._isUndoable = !1, this._doFunc = n.DigraphEditor.Manager.Director.prototype.panelTouchStart
			},
			do: function() {
				this._doFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanelUngroup: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b65af2YDYhOvIB0tlyrzp8F", "DigraphEditorCommandPanelUngroup");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.PanelUngroup = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.PanelUngroup", this._receiver = arguments[0], this._arguments = Array.prototype.slice.call(arguments, 1), this._doFunc = this._undoFunc = this._redoFunc = n.DigraphEditor.Prefab.Panel.prototype.moveTo
			},
			do: function() {
				cc.log("do"), cc.log(this._arguments), this._oldPosition = this._receiver.node.position, this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				cc.log("undo"), cc.log(this._oldPosition.x, this._oldPosition.y), this._undoFunc.apply(this._receiver, [this._oldPosition.x, this._oldPosition.y])
			},
			redo: function() {
				cc.log("redo"), cc.log(this._arguments), this._redoFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "67b8fapebNNOYrw6/CzE/Qc", "DigraphEditorCommandPanel");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Component.CommandPanel = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				commandPrefab: cc.Prefab,
				commandScrollView: cc.ScrollView,
				commandContent: cc.Node
			},
			onLoad: function() {
				this.commands = [], this._lastCommandIndex = 0, this._isShow = !1
			},
			start: function() {
				cc.systemEvent.on("ssr.DigraphEditor.Manager.Command.do", this._onCommandManagerDo, this), cc.systemEvent.on("ssr.DigraphEditor.Manager.Command.undo", this._onCommandManagerUnDo, this), cc.systemEvent.on("ssr.DigraphEditor.Manager.Command.redo", this._onCommandManagerReDo, this)
			},
			_onCommandManagerDo: function(e) {
				this.removeCommands(), this.addLog(e.getUserData()._name.replace("ssr.DigraphEditor.Command.", "")), this._lastCommandIndex = this.commands.length - 1, this.updateCommands()
			},
			_onCommandManagerUnDo: function() {
				this._lastCommandIndex -= 1, this.updateCommands()
			},
			_onCommandManagerReDo: function() {
				this._lastCommandIndex += 1, this.updateCommands()
			},
			addLog: function(e) {
				var t = cc.instantiate(this.commandPrefab);
				t.getComponent(n.DigraphEditor.Prefab.Command).label.string = e, this.commandContent.addChild(t), this.commandScrollView.scrollToBottom(), this.commands.push(t)
			},
			updateCommands: function() {
				for (var e = 0; e < this.commands.length; e++) this.commands[e].color = cc.Color.GRAY, e == this._lastCommandIndex && (this.commands[e].color = cc.Color.GREEN)
			},
			removeCommands: function() {
				for (var e = this.commands.length - 1; e > this._lastCommandIndex; e--) this.commands[e].removeFromParent(!0), this.commands.splice(e, 1)
			},
			onShow: function() {
				this._isShow ? (this._isShow = !1, this.node.x += this.node.width) : (this._isShow = !0, this.node.x -= this.node.width)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCommandSelectionTouch: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d177aBxg7dG9q0msVuQP/Nn", "DigraphEditorCommandSelectionTouch");
		var n = e("../../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Command.Selection.Touch = cc.Class({
			extends: n.DigraphEditor.Command.Base,
			ctor: function() {
				this._name = "ssr.DigraphEditor.Command.Selection.Touch", this._doFunc = n.DigraphEditor.Manager.Director.prototype.selectionTouchInvoker, this._undoFunc = n.DigraphEditor.Manager.Director.prototype.selectionRestoreInvoker, this._redoFunc = n.DigraphEditor.Manager.Director.prototype.selectionTouchInvoker
			},
			do: function() {
				this.panels = this._doFunc.apply(this._receiver, this._arguments)
			},
			undo: function() {
				this._undoFunc.apply(this._receiver, [this.panels[2]])
			},
			redo: function() {
				this._redoFunc.apply(this._receiver, this._arguments)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorConnectionManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "dbd22tg75BD84fk3pFn141U", "DigraphEditorConnectionManager");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Manager.Connection = cc.Class({
			ctor: function() {
				this._connectionOutputPanelTouch = null, this._connectionOutputSlotTouch = null
			},
			init: function(e, t) {
				this.layerCanvas = e, this.connectionLayer = t
			},
			reset: function() {
				this.connectionLayer.reset()
			},
			moveConnectionStart: function(e, t) {
				this._connectionOutputSlotTouch = t.getComponent(n.DigraphEditor.Prefab.Connection).getOutputSlot(), this._connectionOutputPanelTouch = t.getComponent(n.DigraphEditor.Prefab.Connection).getOutputPanel(), this.disconnect(t);
				var o = this._connectionOutputSlotTouch.convertToWorldSpaceAR(cc.Vec2.ZERO);
				this._connectionOutputPanelTouch.getComponent(n.DigraphEditor.Prefab.Panel).getGroup() && t.getComponent(n.DigraphEditor.Prefab.Connection).getGroupOutputSlot() && (o = t.getComponent(n.DigraphEditor.Prefab.Connection).getGroupOutputSlot().convertToWorldSpaceAR(cc.Vec2.ZERO)), o.x -= cc.winSize.width / 2, o.y -= cc.winSize.height / 2, o.x -= this.layerCanvas.node.x, o.y -= this.layerCanvas.node.y, o.x /= this.layerCanvas.node.scale, o.y /= this.layerCanvas.node.scale, this.connectionLayer.drawConnectionStart(o), this.moveConnection(e)
			},
			moveConnection: function(e) {
				this.connectionLayer.drawConnection(e)
			},
			moveConnectionEnd: function() {
				this.drawConnectionEnd()
			},
			getConnectionOutputSlotTouch: function() {
				return this._connectionOutputSlotTouch
			},
			getConnectionOutputPanelTouch: function() {
				return this._connectionOutputPanelTouch
			},
			drawConnectionStart: function(e, t) {
				this._connectionOutputSlotTouch = e, this._connectionOutputPanelTouch = e.getComponent(n.DigraphEditor.Prefab.OutputSlot).getPanel(), this.connectionLayer.setColor(e.getComponent(n.DigraphEditor.Prefab.OutputSlot).getSlotColor()), this.connectionLayer.drawConnectionStart(t)
			},
			drawConnection: function(e) {
				this.connectionLayer.drawConnection(e)
			},
			drawConnectionEnd: function() {
				this.connectionLayer.drawConnectionEnd()
			},
			connect: function(e, t, o, i) {
				var a = i.getComponent(n.DigraphEditor.Prefab.InputSlot).getConnection();
				a && this.disconnect(a, !0);
				var r = this.connectionLayer.addConnection(e, t, o, i);
				e.getComponent(n.DigraphEditor.Prefab.Panel).addConnection(r), o.getComponent(n.DigraphEditor.Prefab.Panel).addConnection(r), t.getComponent(n.DigraphEditor.Prefab.OutputSlot).addConnection(r), i.getComponent(n.DigraphEditor.Prefab.InputSlot).setConnection(r);
				var s = e.getComponent(n.DigraphEditor.Prefab.Panel).getGroup();
				s && s.getComponent(n.DigraphEditor.Prefab.Group).isMinimized() && (s.getComponent(n.DigraphEditor.Prefab.Group).updateOutputConnections(), s.getComponent(n.DigraphEditor.Prefab.Group).updateInputConnections(), s.getComponent(n.DigraphEditor.Prefab.Group).updateConnectionsRender());
				var c = e.getComponent(n.DigraphEditor.Prefab.Panel).getDigraphNode(),
					l = o.getComponent(n.DigraphEditor.Prefab.Panel).getDigraphNode();
				n.DigraphEditor.Data.Digraph.connect(c, l);
				var h = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Connection.MakeConnection", !0);
				return cc.systemEvent.dispatchEvent(h), r
			},
			disconnect: function(e, t) {
				void 0 === t && (t = !0);
				var o = e.getComponent(n.DigraphEditor.Prefab.Connection);
				this.connectionLayer.removeConnection(e, t), o.getOutputPanel().getComponent(n.DigraphEditor.Prefab.Panel).removeConnection(e), o.getInputPanel().getComponent(n.DigraphEditor.Prefab.Panel).removeConnection(e), o.getOutputSlot().getComponent(n.DigraphEditor.Prefab.OutputSlot).removeConnection(e), o.getInputSlot().getComponent(n.DigraphEditor.Prefab.InputSlot).setConnection(null);
				var i = o.getOutputPanel().getComponent(n.DigraphEditor.Prefab.Panel).getDigraphNode(),
					a = o.getInputPanel().getComponent(n.DigraphEditor.Prefab.Panel).getDigraphNode();
				n.DigraphEditor.Data.Digraph.disconnect(i, a)
			},
			reconnect: function(e) {
				var t = e.getComponent(n.DigraphEditor.Prefab.Connection);
				return t.getOutputPanel().getComponent(n.DigraphEditor.Prefab.Panel).addConnection(e), t.getInputPanel().getComponent(n.DigraphEditor.Prefab.Panel).addConnection(e), t.getOutputSlot().getComponent(n.DigraphEditor.Prefab.OutputSlot).addConnection(e), t.getInputSlot().getComponent(n.DigraphEditor.Prefab.InputSlot).setConnection(e), this.connectionLayer.restoreConnection(e)
			},
			disconnectAll: function(e) {
				for (var t = e.getComponent(n.DigraphEditor.Prefab.Panel).getOutputSlots(), o = e.getComponent(n.DigraphEditor.Prefab.Panel).getInputSlots(), i = 0; i < t.length; i++)
					for (var a = t[i].getComponent(n.DigraphEditor.Prefab.OutputSlot), r = 0; r < a.getConnections().length; r++) a.getConnections()[r] && this.disconnect(a.getConnections()[r]);
				for (i = 0; i < o.length; i++) {
					var s = o[i].getComponent(n.DigraphEditor.Prefab.InputSlot);
					s.getConnection() && this.disconnect(s.getConnection())
				}
			},
			panelMove: function(e, t) {
				if (t && t.length > 0)
					for (var o = t.length - 1; o >= 0; o--)
						for (var i = t[o].getComponent(n.DigraphEditor.Prefab.Panel).getConnections(), a = 0; a < i.length; a++) {
							var r = i[a].getComponent(n.DigraphEditor.Prefab.Connection);
							r.getOutputPanel() != t[o] && r.getInputPanel() != t[o] || r.updateConnection()
						} else {
							var s = e.getComponent(n.DigraphEditor.Prefab.Panel).getConnections();
							for (a = 0; a < s.length; a++) {
								var c = s[a].getComponent(n.DigraphEditor.Prefab.Connection);
								c.getOutputPanel() != e && c.getInputPanel() != e || c.updateConnection()
							}
						}
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorConst: [function(e, t) {
		"use strict";
		cc._RF.push(t, "ca886Ue+AhJ6Lt07c/t87Nd", "DigraphEditorConst");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Const.DataType = {
			INT: 1,
			FLOAT: 2,
			ARRAY: 3,
			OBJECT: 4,
			VEC2: 101,
			VEC3: 102,
			VEC4: 103
		}, n.DigraphEditor.Const.DataTypeColor = {
			INT: cc.color(255, 255, 255),
			BOOL: cc.color(255, 255, 255),
			UV: cc.color(255, 165, 79),
			SAMPLER2D: cc.color(132, 112, 255),
			COLOR: cc.Color.GREEN,
			FLOAT: cc.color(0, 245, 255),
			ARRAY: cc.Color.YELLOW,
			OBJECT: cc.color(127, 255, 0),
			VEC2: cc.color(255, 165, 79),
			VEC3: cc.color(255, 105, 180),
			VEC4: cc.Color.GREEN,
			FRAG: cc.Color.GREEN,
			SPINESKELETON: cc.Color.BLACK
		}, cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorContextMenu: [function(e, t) {
		"use strict";
		cc._RF.push(t, "83cf60hXK1C3I0veXjRPJAF", "DigraphEditorContextMenu");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Component.ContextMenu = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				contextMenuItemPrefab: cc.Prefab,
				categoryContent: cc.Node,
				componentsContent: cc.Node,
				categoryScrollView: cc.Node,
				componentsScrollView: cc.Node,
				overloadScrollView: cc.Node,
				overloadContent: cc.Node,
				loadingLabel: cc.Node,
				backButton: cc.Node,
				samplePanel: cc.Node
			},
			onLoad: function() {},
			start: function() {
				cc.systemEvent.on("ssr.DigraphEditor.Prefab.ContextMenuItem.Open", this._onContextMenuItemOpen, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.ContextMenuItem.Overload", this._onContextMenuItemOverload, this), this.categoryScrollView.on("scroll-began", this.scrollBeganCallback, this), this.componentsScrollView.on("scroll-began", this.scrollBeganCallback, this)
			},
			scrollBeganCallback: function() {
				this.overloadScrollView.active = !1
			},
			onMouseEnter: function() {},
			onMouseLeave: function() {},
			init: function(e, t) {
				this._templates = e, this._detail = t;
				for (var o = 0; o < e.length; o++) {
					var i = cc.instantiate(this.contextMenuItemPrefab);
					i.getComponent(n.DigraphEditor.Prefab.ContextMenuItem).init(e[o], this.samplePanel, {}, this.node, o), this.categoryContent.addChild(i)
				}
				this.loadingLabel.active = !1
			},
			getConfiguration: function(e, t, n) {
				for (var o = 0; o < this._detail.length; o++)
					if (this._detail[o].value.name == (t ? e + t[0] : e))
						if (n && n.custom) {
							if (this._detail[o].value.uuid == n.uuid) return this._detail[o].value
						} else if (!this._detail[o].value.uuid) return this._detail[o].value;
				return null
			},
			_onContextMenuItemOpen: function(e) {
				var t = e.getUserData();
				this.componentsContent.removeAllChildren(!0);
				for (var o = 0; o < t.components.length; o++) {
					var i = cc.instantiate(this.contextMenuItemPrefab);
					t.components[o].folder = t.name;
					var a = this.getConfiguration(t.components[o].name, t.components[o].overload, t.components[o]);
					i.getComponent(n.DigraphEditor.Prefab.ContextMenuItem).init(t.components[o], this.samplePanel, a, this.node), this.componentsContent.addChild(i)
				}
				this.backButton.active = !0, this.categoryScrollView.active = !1, this.componentsScrollView.active = !0
			},
			_onContextMenuItemOverload: function(e) {
				this.overloadScrollView.active = !0, this.samplePanel.active = !1, this._configuration = e.getUserData();
				for (var t = this.overloadContent.getChildren(), n = 0; n < t.length; n++) t[n].active = !1;
				for (n = 0; n < this._configuration.overload.length; n++) t[parseInt(this._configuration.overload[n]) - 1].active = !0
			},
			show: function(e) {
				this.node.active = !0, this.node.x = e.x - cc.winSize.width / 2 + this.node.width / 2 * this.node.scaleX, this.node.y = e.y - cc.winSize.height / 2 - this.node.height / 2 * this.node.scaleY
			},
			hide: function() {
				this.node.active = !1
			},
			onBack: function() {
				this.backButton.active = !1, this.categoryScrollView.active = !0, this.componentsScrollView.active = !1, this.overloadScrollView.active = !1, this.samplePanel.active = !1
			},
			updateComponent: function(e, t) {
				var o = -1;
				if (-1 == (o = t.value.fx ? this.getFXFolderIndex(e.en) : this.getUserCustomFolderIndex(e.en))) {
					this._templates.push({
						components: [],
						isFolder: !0,
						isCustom: !0,
						isFX: !0 === e.fx,
						name: e.en,
						name_zh: e.zh
					}), o = this._templates.length - 1;
					var i = cc.instantiate(this.contextMenuItemPrefab);
					i.getComponent(n.DigraphEditor.Prefab.ContextMenuItem).init(this._templates[o], this.samplePanel, {}, this.node, o), this.categoryContent.addChild(i)
				}
				this._templates[o].components.push(t.value)
			},
			removeComponent: function(e, t) {
				var o;
				if (-1 != (o = t.value.fx ? this.getFXFolderIndex(e.en) : this.getUserCustomFolderIndex(e.en))) {
					for (var i = 0; i < this._templates[o].components.length; i++)
						if (this._templates[o].components[i].uuid === t.value.uuid) {
							if (this._templates[o].components.splice(i, 1), 0 == this._templates[o].components.length) {
								this._templates.splice(o, 1);
								for (var a = 0; a < this.categoryContent.getChildren().length; a++) {
									var r = this.categoryContent.getChildren()[a];
									if (r.getComponent(n.DigraphEditor.Prefab.ContextMenuItem)._index == o) {
										this.categoryContent.removeChild(r);
										break
									}
								}
							}
							break
						}
					for (i = 0; i < this._detail.length; i++)
						if (this._detail[i].uuid === t.value.uuid) {
							this._detail.splice(i, 1);
							break
						}
				}
			},
			getFolderIndex: function(e) {
				for (var t = 0; t < this._templates.length; t++)
					if (this._templates[t].isCustom && this._templates[t].name == e) return t;
				return -1
			},
			getFXFolderIndex: function(e) {
				for (var t = 0; t < this._templates.length; t++)
					if (this._templates[t].isCustom && this._templates[t].isFX && this._templates[t].name == e) return t;
				return -1
			},
			getUserCustomFolderIndex: function(e) {
				for (var t = 0; t < this._templates.length; t++)
					if (this._templates[t].isCustom && !this._templates[t].isFX && this._templates[t].name == e) return t;
				return -1
			},
			onOverload: function(e, t) {
				this.overloadScrollView.active = !1;
				var n = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.ContextMenuItem.Create", !0);
				n.target = this.node, n.setUserData(this._configuration.name + t), cc.systemEvent.dispatchEvent(n)
			},
			onEditBoxTextChanged: function(e) {
				this.backButton.active = !0, this.categoryScrollView.active = !1, this.componentsScrollView.active = !0, this.overloadScrollView.active = !1, this.componentsContent.removeAllChildren(!0);
				for (var t = 0; t < this._templates.length; t++)
					for (var o = this._templates[t], i = 0; i < o.components.length; i++)
						if (-1 != o.components[i].name.toLowerCase().indexOf(e.toLowerCase())) {
							var a = cc.instantiate(this.contextMenuItemPrefab);
							o.components[i].folder = o.name;
							var r = this.getConfiguration(o.components[i].name, o.components[i].overload, o.components[i]);
							a.getComponent(n.DigraphEditor.Prefab.ContextMenuItem).init(o.components[i], this.samplePanel, r, this.node), this.componentsContent.addChild(a)
						}
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorCore: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7f463MsyxtJtI4CA82b+uOV", "DigraphEditorCore");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = e("../../shader-fx/util/ShaderFXDnDUtil"),
			i = (e("../../shader-fx/util/ShaderFXUtil"), e("../../shader-fx/util/ShaderFXLeanCloudUtil"));
		window.download = function e(t, n, o) {
			var i, a, r = window,
				s = "application/octet-stream",
				c = o || s,
				l = t,
				h = !n && !o && l,
				u = document.createElement("a"),
				p = function(e) {
					return String(e)
				},
				d = r.Blob || r.MozBlob || r.WebKitBlob || p,
				f = n || "download";
			if (d = d.call ? d.bind(r) : Blob, "true" === String(this) && (c = (l = [l, c])[0], l = l[1]), h && h.length < 2048 && (f = h.split("/").pop().split("?")[0], u.href = h, -1 !== u.href.indexOf(h))) {
				var m = new XMLHttpRequest;
				return m.open("GET", h, !0), m.responseType = "blob", m.onload = function(t) {
					e(t.target.response, f, s)
				}, setTimeout(function() {
					m.send()
				}, 0), m
			}
			if (/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(l)) {
				if (!(l.length > 2096103.424 && d !== p)) return navigator.msSaveBlob ? navigator.msSaveBlob(g(l), f) : C(l);
				c = (l = g(l)).type || s
			}

			function g(e) {
				for (var t = e.split(/[:;,]/), n = t[1], o = ("base64" == t[2] ? atob : decodeURIComponent)(t.pop()), i = o.length, a = 0, r = new Uint8Array(i); a < i; ++a) r[a] = o.charCodeAt(a);
				return new d([r], {
					type: n
				})
			}

			function C(e, t) {
				if ("download" in u) return u.href = e, u.setAttribute("download", f), u.className = "download-js-link", u.innerHTML = "downloading...", u.style.display = "none", document.body.appendChild(u), setTimeout(function() {
					u.click(), document.body.removeChild(u), !0 === t && setTimeout(function() {
						r.URL.revokeObjectURL(u.href)
					}, 250)
				}, 66), !0;
				if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) return e = e.replace(/^data:([\w\/\-\+]+)/, s), window.open(e) || confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.") && (location.href = e), !0;
				var n = document.createElement("iframe");
				document.body.appendChild(n), t || (e = "data:" + e.replace(/^data:([\w\/\-\+]+)/, s)), n.src = e, setTimeout(function() {
					document.body.removeChild(n)
				}, 333)
			}
			if (i = l instanceof d ? l : new d([l], {
					type: c
				}), navigator.msSaveBlob) return navigator.msSaveBlob(i, f);
			if (r.URL) C(r.URL.createObjectURL(i), !0);
			else {
				if ("string" == typeof i || i.constructor === p) try {
					return C("data:" + c + ";base64," + r.btoa(i))
				} catch (_) {
					return C("data:" + c + "," + encodeURIComponent(i))
				}(a = new FileReader).onload = function() {
					C(this.result)
				}, a.readAsDataURL(i)
			}
			return !0
		}, n.DigraphEditor.Component.Core = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				layerCanvas: e("../layer/DigraphEditorLayerCanvas"),
				panelLayer: e("../layer/DigraphEditorLayerPanel"),
				selectionLayer: e("../layer/DigraphEditorLayerSelection"),
				connectionLayer: e("../layer/DigraphEditorLayerConnection"),
				groupLayer: e("../layer/DigraphEditorLayerGroup"),
				messageBoxLayer: e("../layer/DigraphEditorLayerMessageBox"),
				messageLayer: e("../layer/DigraphEditorLayerMessageLayer"),
				accountLayer: e("../layer/DigraphEditorLayerAccount"),
				inputFieldLayer: e("../layer/DigraphEditorLayerInputField"),
				contextMenu: e("./DigraphEditorContextMenu"),
				projectListLayer: e("../layer/DigraphEditorLayerProjectList"),
				projectGalleryLayer: e("../layer/DigraphEditorLayerProjectGallery"),
				tutorialLayer: e("../layer/DigraphEditorLayerTutorial"),
				projectTexturePreviewLayer: e("../layer/DigraphEditorLayerTexturePreview"),
				videoLayer: e("../layer/DigraphEditorLayerVideo"),
				projectInfoLayer: e("../../shader-fx/gallery/prefab/ShaderFXPrefabProjectPanel"),
				customComponentLayer: e("../layer/DigraphEditorLayerCustomComponent"),
				customComponentListLayer: e("../layer/DigraphEditorLayerCustomComponentList"),
				fxComponentLibraryLayer: e("../layer/DigraphEditorLayerFXComponentLibrary"),
				customComponentMissingResolve: e("../layer/DigraphEditorLayerCustomComponentMissingResolve"),
				fxExporterLayer: e("../layer/DigraphEditorLayerFXComponentExporter"),
				editorToast: cc.Prefab,
				captureNode: cc.Node
			},
			onLoad: function() {
				console.log = function() {}, window.EDITOR_LANGUAGE = cc.sys.localStorage.getItem("ssrfx_language"), window.EDITOR_LANGUAGE || (cc.sys.language == cc.sys.LANGUAGE_CHINESE ? window.EDITOR_LANGUAGE = cc.sys.LANGUAGE_CHINESE : window.EDITOR_LANGUAGE = cc.sys.LANGUAGE_ENGLISH, cc.sys.localStorage.setItem("ssrfx_language", window.EDITOR_LANGUAGE)), this.updateLanguage()
			},
			updateLanguage: function() {
				this.accountLayer.node.getChildByName("PanelLogin").getChildByName("LoginButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u767b\u5f55" : "SignIn", this.accountLayer.node.getChildByName("PanelLogin").getChildByName("OfflineButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u79bb\u7ebf" : "Offline", this.accountLayer.node.getChildByName("PanelRegister").getChildByName("RegisterButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u53d1\u9001\u9a8c\u8bc1\u90ae\u4ef6" : "Reset Password", this.accountLayer.node.getChildByName("PanelLogin").getChildByName("ForgetButton").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5fd8\u8bb0\u5bc6\u7801???" : "Forget Password ???", this.inputFieldLayer.node.getChildByName("Panel").getChildByName("Buttons").getChildByName("ConfirmButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u786e\u5b9a" : "Confirm", this.inputFieldLayer.node.getChildByName("Panel").getChildByName("Buttons").getChildByName("CancelButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u53d6\u6d88" : "Cancel", this.messageBoxLayer.node.getChildByName("Panel").getChildByName("Buttons").getChildByName("ConfirmButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u786e\u5b9a" : "Confirm", this.messageBoxLayer.node.getChildByName("Panel").getChildByName("Buttons").getChildByName("CancelButton").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u53d6\u6d88" : "Cancel"
			},
			initExceptionWatcher: function() {
				cc.error = function() {
					cc.warn("cc.error"), cc.warn(arguments)
				}, window.onerror = function() {}
			},
			boot: function() {
				cc.log("boot"), !0 !== this._boot && (this._boot = !0, window.onbeforeunload = function() {
					1 == cc.sys.localStorage.getItem("ssrfx_autosave") && n.DigraphEditor.Director.saveProject()
				}, this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85 ......" : "Project loading, please wait ......"), cc.systemEvent.on("ssr.ShaderFX.Prefab.Uniform.onValueChanged", this.uniformUpdated, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.ContextMenuItem.Create", this._onContextMenuItemCreate, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.onSprite", this._onPrefabSprite, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.onSpine", this._onPrefabSpine, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Canvas.TouchStart", this._onCanvasLayerTouchStart, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Canvas.MouseUpRightClick", this._onCanvasLayerMouseUpRightClick, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Panel.TouchStart", this._onPanelTouchStart, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Panel.TouchMove", this._onPanelTouchMove, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Panel.TouchEnd", this._onPanelTouchEnd, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Panel.Copy", this._onPanelCopy, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Panel.Remove", this._onPanelRemove, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Panel.UnGroup", this._onPanelUnGroup, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.InputSlot.TouchStart", this._onInputSlotTouchStart, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.InputSlot.TouchMove", this._onInputSlotTouchMove, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.InputSlot.TouchEnd", this._onInputSlotTouchEnd, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.InputSlot.TouchCancel", this._onInputSlotTouchEnd, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.OutputSlot.TouchStart", this._onOutputSlotTouchStart, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.OutputSlot.TouchMove", this._onOutputSlotTouchMove, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.OutputSlot.TouchEnd", this._onOutputSlotTouchEnd, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Group.TouchStart", this._onGroupTouchStart, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Group.TouchMove", this._onGroupTouchMove, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Group.TouchEnd", this._onGroupTouchEnd, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Group.Expand", this._onGroupExpand, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Group.Shrink", this._onGroupShrink, this), cc.systemEvent.on("ssr.DigraphEditor.Prefab.Group.Ungroup", this._onGroupUngroup, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Group.AddGroup", this._onGroupLayerAddGroup, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Group.RemoveGroup", this._onGroupLayerRemoveGroup, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Selection.TouchStart", this._onSelectionLayerTouchStart, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Selection.TouchMove", this._onSelectionLayerTouchMove, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Selection.TouchEnd", this._onSelectionLayerTouchEnd, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Selection.TouchCancel", this._onSelectionLayerTouchCancel, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ZoomIn", this._onToolBarZoomIn, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ZoomOut", this._onToolBarZoomOut, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ZoomReset", this._onToolBarZoomReset, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.CanvasMove", this._onToolBarCanvasMove, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.AutoSave", this._onToolBarAutoSave, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Panel.CreatePanel", this._onPanelCreatePanel, this), cc.systemEvent.on("ssr.DigraphEditor.Manager.Panel.RemovePanel", this._onPanelRemovePanel, this), cc.systemEvent.on("ssr.DigraphEditor.Manager.Connection.MakeConnection", this._onConnectionMakeConnection, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.Undo", this._onToolBarUndo, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.Redo", this._onToolBarRedo, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.CreatePanel", this._onToolBarCreatePanel, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.Group", this._onToolBarGroup, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.Ungroup", this._onToolBarUngroup, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.AutoDim", this._onToolBarAutoDim, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.AutoConnect", this._onToolBarAutoConnect, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.AutoHint", this._onToolBarAutoHint, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.NewProject", this._onNewProject, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ImportProject", this._onImportProject, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ExportProject", this._onExportProject, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ExportFX", this._onExportFX, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ExportFX3D", this._onExportFX3D, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ExportMTL", this._onExportMTL, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.SaveProject", this._onSaveProject, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.UploadProject", this._onUploadProject, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ProjectGallery", this._onProjectGallery, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.Tutorial", this._onTutorial, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.Snapshot", this._onSnapshot, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.SnapshotOutput", this._onSnapshotOutput, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.Builder", this._onBuilder, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.FXComponentLibrary", this._onFXComponentLibrary, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.ProjectUniformTexture.onPreview", this.projectUniformTextureOnPreview, this), cc.systemEvent.on("ssr.DigraphEditor.Component.Hotkey.Copy", this._onHotKeyCopy, this), cc.systemEvent.on("ssr.DigraphEditor.Component.Hotkey.Paste", this._onHotKeyPaste, this), cc.systemEvent.on("ssr.DigraphEditor.Component.HeaderMenu.NewProject", this._onNewProject, this), cc.systemEvent.on("ssr.DigraphEditor.Component.HeaderMenu.ExportProject", this._onExportProject, this), cc.systemEvent.on("ssr.DigraphEditor.Component.HeaderMenu.ImportProject", this._onImportProject, this), cc.systemEvent.on("ssr.DigraphEditor.Component.ToolBar.ProjectList", this._onAccountProjectList, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Footer.AccountProjectList", this._onAccountProjectList, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Footer.AccountLayer", this._onAccountLayer, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Footer.ProjectRename", this._onProjectRename, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.ProjectInfo.Download", this._onProjectInfoDownload, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.ProjectInfo.Remove", this._onProjectInfoRemove, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.Download", this._onCustomComponentInfoDownload, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.Save", this._onCustomComponentInfoSave, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.Remove", this._onCustomComponentInfoRemove, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.UpdateFolder", this._onCustomComponentInfoUpdateFolder, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Download", this._onMyCustomComponentInfoDownload, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Remove", this._onMyCustomComponentInfoRemove, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Edit", this._onMyCustomComponentInfoEdit, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Sync", this._onMyCustomComponentInfoSync, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Clone", this._onMyCustomComponentInfoClone, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.Clone", this._onCustomComponentInfoClone, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Publish", this._onMyCustomComponentInfoPublish, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.CustomComponentMissingResolve.RepairStart", this.onCustomComponentMissingResolveRepairStart, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.CustomComponentMissingResolve.RepairEnd", this.onCustomComponentMissingResolveRepairEnd, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.CustomComponentMissingResolve.ExportProject", this._onCustomComponentMissingResolveExportProject, this), cc.systemEvent.on("ssr.DigraphEditor.Manager.Project.AutoSaver", this._onProjectAutoSaver, this), cc.systemEvent.on("ssr.DigraphEditor.Manager.Panel.LoadTemplatesDone", this._onPanelLoadTemplatesDone, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.ExtendPanel.PreviewOn", this._onExtendPanelPreviewOn, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", this.updateUniformKey, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", this.createUniformKey, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", this.updateUniformKeyValue, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.ProjectUniform.onCreateUniform", this.onCreateUniform, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.ProjectUniform.onUpdateUniform", this.onUpdateUniform, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.RefPanel.onFocus", this.onFocusRefPanel, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.UniformTexture.updatePackMode", this.onUpdatePackMode, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.Sample.Import", this._onSampleImport, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.Sample.Video", this._onSampleVideo, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.ProjectGallery.ListGallery", this._onListGallery, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.ProjectGallery.ListGallerySuccess", this._onListGallerySuccess, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.ProjectGallery.ListGalleryFail", this._onListGalleryFail, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Message.show", this._onMessageShow, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Message.dismiss", this._onMessageDismiss, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Toast.show", this._onToastShow, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.ProjectList.ListProject", this._onListProject, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.ProjectList.ListProjectSuccess", this._onListProjectSuccess, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.ProjectList.ListProjectFail", this._onListProjectFail, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.CustomComponent.Save", this._onCustomComponentSave, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.CustomComponentList.New", this._onCustomComponentListNew, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.Export", this._onCustomComponentInfoExport, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.Export2DSpriteAndSpineScene", this._onExport2DSpriteAndSpineScene, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.Export3DUnlitScene", this._onExport3DUnlitScene, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.Export3DSpriteScene", this._onExport3DSpriteScene, this), o.enable(this.node, this._onImport.bind(this), [".json"], 1, !1), n.DigraphEditor.Director.restoreProject())
			},
			start: function() {
				n.DigraphEditor.Director.init(this.layerCanvas, this.panelLayer, this.connectionLayer, this.selectionLayer, this.groupLayer, this.inputFieldLayer, this.messageBoxLayer, this.messageLayer, this.contextMenu, this.editorToast, this.projectInfoLayer, this.projectTexturePreviewLayer, this.videoLayer, this.customComponentLayer, this.customComponentListLayer, this.fxComponentLibraryLayer, this.fxExporterLayer, this.projectListLayer, this.customComponentMissingResolve, this.captureNode), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.ResetPasswordSuccess", this._onResetPasswordSuccess, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.ResetPasswordFail", this._onResetPasswordFail, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.Rescue", this._onRescue, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.Offline", this._onAccountOffline, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.LoginStart", this._onAccountLoginStart, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.LoginSuccess", this._onAccountLoginSuccess, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.LoginFail", this._onAccountLoginFail, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.CreateSuccess", this._onAccountCreateSuccess, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.CreateFail", this._onAccountCreateFail, this)
			},
			_onCustomComponentSave: function(e) {
				n.DigraphEditor.Director.saveCustomComponent(e.getUserData())
			},
			_onCustomComponentListNew: function() {
				this.customComponentLayer.node.active = !0
			},
			_onRescue: function() {
				n.DigraphEditor.Director.rescue()
			},
			_onListGallery: function() {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5217\u8868\u83b7\u53d6\u4e2d\uff0c\u8bf7\u7a0d\u540e ......" : "Gallery list loading, please wait ......")
			},
			_onMessageShow: function(e) {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).show(e.getUserData())
			},
			_onMessageDismiss: function() {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).dismiss()
			},
			_onToastShow: function(e) {
				n.DigraphEditor.Director.showToast(e.getUserData())
			},
			_onListGallerySuccess: function() {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).dismiss()
			},
			_onListGalleryFail: function() {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).dismiss()
			},
			_onListProject: function() {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5217\u8868\u83b7\u53d6\u4e2d\uff0c\u8bf7\u7a0d\u540e ......" : "Project list loading, please wait ......")
			},
			_onListProjectSuccess: function() {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).dismiss()
			},
			_onListProjectFail: function() {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).dismiss()
			},
			onUpdatePackMode: function() {
				n.DigraphEditor.Director.updateDigraph()
			},
			_onSampleVideo: function(e) {
				n.DigraphEditor.Director.showOnlineVideo(e.getUserData())
			},
			projectUniformTextureOnPreview: function(e) {
				n.DigraphEditor.Director.texturePreview(e.getUserData())
			},
			onFocusRefPanel: function(e) {
				n.DigraphEditor.Director.focusPanel(e.getUserData())
			},
			onUpdateUniform: function(e) {
				n.DigraphEditor.Director.updateUniformOnPanel(e.getUserData().key, e.getUserData().value)
			},
			onCreateUniform: function(e) {
				n.DigraphEditor.Director.createUniformPanel(e.getUserData())
			},
			createUniformKey: function(e) {
				n.DigraphEditor.Director.createGlobalUniform(e.getUserData())
			},
			updateUniformKeyValue: function(e) {
				n.DigraphEditor.Director.updateGlobalUniformValue(e.getUserData())
			},
			_onCustomComponentInfoExport: function(e) {
				this.fxExporterLayer.node.active = !0, this.fxExporterLayer.show(e.getUserData())
			},
			_onExport2DSpriteAndSpineScene: function() {
				n.DigraphEditor.Director.exportFX()
			},
			_onExport3DUnlitScene: function() {
				n.DigraphEditor.Director.exportFX3D()
			},
			_onExport3DSpriteScene: function() {
				n.DigraphEditor.Director.exportFX3DSprite()
			},
			updateUniformKey: function(e) {
				n.DigraphEditor.Director.updateGlobalUniformKey(e.getUserData())
			},
			_onExtendPanelPreviewOn: function(e) {
				n.DigraphEditor.Director.updatePreview(e.target)
			},
			_onProjectRename: function() {
				n.DigraphEditor.Director.renameProject()
			},
			_onProjectInfoDownload: function(e) {
				this.projectGalleryLayer.node.active = !1, this.projectListLayer.node.active = !1, n.DigraphEditor.Director.restoreProject(e.getUserData())
			},
			_onProjectInfoRemove: function(e) {
				n.DigraphEditor.Director.removeProject(e.getUserData())
			},
			_onCustomComponentInfoDownload: function(e) {
				n.DigraphEditor.Director.donwloadCustomComponent(e.getUserData())
			},
			_onCustomComponentInfoSave: function(e) {
				n.DigraphEditor.Director.updateCustomComponent(e.getUserData())
			},
			_onMyCustomComponentInfoDownload: function(e) {
				n.DigraphEditor.Director.donwloadCustomComponent(e.getUserData())
			},
			_onMyCustomComponentInfoRemove: function(e) {
				n.DigraphEditor.Director.removeCustomComponent(e.getUserData())
			},
			_onMyCustomComponentInfoEdit: function() {},
			_onMyCustomComponentInfoSync: function() {},
			_onMyCustomComponentInfoClone: function(e) {
				n.DigraphEditor.Director.cloneCustomComponent(e.getUserData())
			},
			_onCustomComponentInfoClone: function(e) {
				n.DigraphEditor.Director.cloneCustomComponentCloud(e.getUserData())
			},
			_onMyCustomComponentInfoPublish: function() {},
			onCustomComponentMissingResolveRepairStart: function() {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u7f3a\u5931\u7ec4\u4ef6\u4e0b\u8f7d\u4e2d\uff0c\u6e05\u7a0d\u7b49\u7247\u523b" : "Downloading missing comopnents, please wait ......")
			},
			onCustomComponentMissingResolveRepairEnd: function(e) {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).dismiss(), e.getUserData() && n.DigraphEditor.Director.doRepairProjectScene(e.getUserData())
			},
			_onCustomComponentInfoUpdateFolder: function(e) {
				n.DigraphEditor.Director.updateFolder(e.getUserData())
			},
			_onCustomComponentInfoRemove: function(e) {
				n.DigraphEditor.Director.removeCustomComponent(e.getUserData())
			},
			_onAccountProjectList: function() {
				i.__user.getIsOnline() ? this.projectListLayer.node.active = !0 : this.accountLayer.node.active = !0
			},
			_onAccountLayer: function() {
				this.accountLayer.node.active = !0
			},
			_onSaveProject: function() {
				n.DigraphEditor.Director.saveProject()
			},
			_onUploadProject: function() {
				i.__user.getIsOnline() ? n.DigraphEditor.Director.uploadProject() : this.accountLayer.node.active = !0
			},
			_onProjectGallery: function() {
				i.__user.getIsOnline() ? this.projectGalleryLayer.node.active = !0 : this.accountLayer.node.active = !0
			},
			_onTutorial: function() {
				this.tutorialLayer.node.active = !0
			},
			_onAccountOffline: function() {
				i.report("boot", "offline", window.__geo), n.DigraphEditor.Director.showToast(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u767b\u5f55\u6210\u529f | \u79bb\u7ebf\u6a21\u5f0f" : "Login Offline | Welcome: Guest"), this.boot()
			},
			_onAccountCreateSuccess: function(e) {
				n.DigraphEditor.Director.showToast("Create Account Succeeded | Welcome: " + e.getUserData().getUsername()), this.boot()
			},
			_onAccountCreateFail: function(e) {
				n.DigraphEditor.Director.showToast("Create Account Failed | error code: " + e.getUserData().code)
			},
			_onAccountLoginStart: function() {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u7528\u6237\u767b\u5f55\u4e2d\uff0c\u8bf7\u7a0d\u540e ......" : "User login, please wait ......")
			},
			_onResetPasswordSuccess: function() {
				n.DigraphEditor.Director.showToast(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u4fee\u6539\u5bc6\u7801\u90ae\u4ef6\u5df2\u53d1\u9001\u81f3\u90ae\u7bb1\uff0c\u8bf7\u70b9\u51fb\u90ae\u4ef6\u4e2d\u7684\u94fe\u63a5\u4fee\u6539\u5bc6\u7801" : "Verification link to reset password has been sent to your mailbox")
			},
			_onResetPasswordFail: function(e) {
				n.DigraphEditor.Director.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u53d1\u9001\u90ae\u4ef6\u5931\u8d25 | \u9519\u8bef\u4fe1\u606f: " : "Send verification mail failed: ") + e.getUserData().error)
			},
			_onAccountLoginSuccess: function(e) {
				i.report("boot", "online", window.__geo), this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).dismiss(), n.DigraphEditor.Director.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u767b\u5f55\u6210\u529f | \u6b22\u8fce\u56de\u6765: " : "Login Succeeded | Welcome back: ") + e.getUserData().getUsername()), this.boot()
			},
			_onAccountLoginFail: function(e) {
				this.messageLayer.getComponent(n.DigraphEditor.Layer.Message).dismiss(), n.DigraphEditor.Director.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u767b\u5f55\u5931\u8d25 | \u9519\u8bef\u4fe1\u606f: " : "Login Failed | Error: ") + e.getUserData().error)
			},
			_onPanelLoadTemplatesDone: function() {
				n.DigraphEditor.Director.restoreProject()
			},
			_onProjectAutoSaver: function() {
				n.DigraphEditor.Director.saveProject(!0)
			},
			_onImport: function(e) {
				var t = this;
				this.messageBoxLayer.getComponent(n.DigraphEditor.Layer.MessageBox).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5f53\u524d\u672a\u4fdd\u5b58\u7684\u9879\u76ee\u4f1a\u88ab\u8986\u76d6\u6389\uff0c\u786e\u5b9a\u8981\u7ee7\u7eed\u5417 ?" : "Importing project will overwrite the current project, continue ?", {
					onConfirm: function() {
						t.messageLayer.getComponent(n.DigraphEditor.Layer.Message).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u5bfc\u5165\u4e2d\uff0c\u8bf7\u7a0d\u7b49\u7247\u523b ......" : "Project importing, please wait ......"), n.DigraphEditor.Director.doImport(e[0].content)
					},
					onCancel: function() {
						cc.log("onCancel")
					}
				})
			},
			_onSampleImport: function(e) {
				var t = this;
				this.messageBoxLayer.getComponent(n.DigraphEditor.Layer.MessageBox).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5f53\u524d\u672a\u4fdd\u5b58\u7684\u9879\u76ee\u4f1a\u88ab\u8986\u76d6\u6389\uff0c\u786e\u5b9a\u8981\u7ee7\u7eed\u5417 ?" : "Importing project will overwrite the current project, continue ?", {
					onConfirm: function() {
						t.projectGalleryLayer.node.active = !1, t.messageLayer.getComponent(n.DigraphEditor.Layer.Message).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u5bfc\u5165\u4e2d\uff0c\u8bf7\u7a0d\u7b49\u7247\u523b ......" : "Project importing, please wait ......"), n.DigraphEditor.Director.doImport(e.getUserData())
					},
					onCancel: function() {
						cc.log("onCancel")
					}
				})
			},
			_onNewProject: function() {
				n.DigraphEditor.Director.newProject()
			},
			_onExportProject: function() {
				n.DigraphEditor.Director.exportProject()
			},
			_onCustomComponentMissingResolveExportProject: function(e) {
				n.DigraphEditor.Director.exportProjectJSON(e.getUserData())
			},
			_onExportFX: function() {
				n.DigraphEditor.Director.exportFX()
			},
			_onExportFX3D: function() {
				n.DigraphEditor.Director.exportFX3D()
			},
			_onExportMTL: function() {
				n.DigraphEditor.Director.exportMTL()
			},
			_onSnapshot: function() {
				n.DigraphEditor.Director.snapshot()
			},
			_onSnapshotOutput: function() {
				n.DigraphEditor.Director.snapshotOutput()
			},
			_onFXComponentLibrary: function() {
				n.DigraphEditor.Director.showFXComponentLibrary()
			},
			_onBuilder: function() {
				n.DigraphEditor.Director.showCustomComponent()
			},
			_onImportProject: function() {
				n.DigraphEditor.Director.importProject()
			},
			uniformUpdated: function(e) {
				var t = e.getUserData();
				n.DigraphEditor.Director.updateDigraphParams(e.target, t.getKey(), t.getValue())
			},
			_onContextMenuItemCreate: function(e) {
				var t = e.target.position;
				t.x -= this.layerCanvas.node.x, t.y -= this.layerCanvas.node.y - 100, t.x /= this.layerCanvas.node.scale, t.y /= this.layerCanvas.node.scale, n.DigraphEditor.Director.panelCreateByName(e.getUserData(), t)
			},
			_onCanvasLayerTouchStart: function() {
				this.contextMenu.hide()
			},
			_onCanvasLayerMouseUpRightClick: function(e) {
				this.contextMenu.show(e.getUserData().getLocation())
			},
			_onHotKeyCopy: function() {
				cc.log("_onHotKeyCopy")
			},
			_onHotKeyPaste: function() {
				cc.log("_onHotKeyPaste")
			},
			_onPrefabSprite: function(e) {
				n.DigraphEditor.Director.switchToSprite(e.target)
			},
			_onPrefabSpine: function(e) {
				n.DigraphEditor.Director.switchToSpine(e.target)
			},
			_onPanelCopy: function(e) {
				n.DigraphEditor.Director.panelCopy(e.target)
			},
			_onPanelRemove: function(e) {
				n.DigraphEditor.Director.panelRemove(e.target)
			},
			_onPanelCreatePanel: function() {},
			_onPanelRemovePanel: function() {},
			_onPanelUnGroup: function(e) {
				n.DigraphEditor.Director.groupRemovePanel(e.target)
			},
			_onGroupExpand: function(e) {
				e.target
			},
			_onGroupShrink: function(e) {
				e.target
			},
			_onGroupUngroup: function(e) {
				n.DigraphEditor.Director.groupUngroup(e.target)
			},
			_onGroupTouchStart: function(e) {
				n.DigraphEditor.Director.groupTouchStart(e.target, e.getUserData())
			},
			_onGroupTouchMove: function(e) {
				n.DigraphEditor.Director.groupTouchMove(e.target, e.getUserData())
			},
			_onGroupTouchEnd: function(e) {
				n.DigraphEditor.Director.groupTouchEnd(e.target, e.getUserData())
			},
			_onGroupLayerAddGroup: function(e) {
				n.DigraphEditor.Director.groupAddPanel(e.target)
			},
			_onGroupLayerRemoveGroup: function() {},
			_onConnectionMakeConnection: function(e) {
				n.DigraphEditor.Director.updateDigraph(e.getUserData())
			},
			_onToolBarUndo: function() {
				n.DigraphEditor.Director.undo()
			},
			_onToolBarRedo: function() {
				n.DigraphEditor.Director.redo()
			},
			_onToolBarCreatePanel: function() {},
			_onToolBarGroup: function() {
				n.DigraphEditor.Director.groupCreate()
			},
			_onToolBarUngroup: function(e) {
				n.DigraphEditor.Director.groupUngroup(e.target)
			},
			_onToolBarAutoSave: function(e) {
				n.DigraphEditor.Director.autoSave(e.getUserData())
			},
			_onToolBarAutoDim: function(e) {
				n.DigraphEditor.Director.autoDim(e.getUserData())
			},
			_onToolBarAutoConnect: function(e) {
				n.DigraphEditor.Director.autoConnect(e.getUserData())
			},
			_onToolBarAutoHint: function(e) {
				n.DigraphEditor.Director.autoHint(e.getUserData())
			},
			_onToolBarZoomIn: function() {
				n.DigraphEditor.Director.canvasZoomIn()
			},
			_onToolBarZoomOut: function() {
				n.DigraphEditor.Director.canvasZoomOut()
			},
			_onToolBarZoomReset: function() {
				n.DigraphEditor.Director.canvasZoomReset()
			},
			_onToolBarCanvasMove: function(e) {
				n.DigraphEditor.Director.canvasMove(e.getUserData())
			},
			_onToolBarZoomUnlock: function() {
				this.layerCanvas.getComponent(n.DigraphEditor.Layer.Canvas).zoomUnlock()
			},
			_onSelectionLayerTouchStart: function(e) {
				n.DigraphEditor.Director.selectionTouchStart(e.getUserData())
			},
			_onSelectionLayerTouchMove: function(e) {
				n.DigraphEditor.Director.selectionTouchMove(e.getUserData())
			},
			_onSelectionLayerTouchEnd: function(e) {
				n.DigraphEditor.Director.selectionTouchEnd(e.getUserData())
			},
			_onSelectionLayerTouchCancel: function(e) {
				n.DigraphEditor.Director.selectionTouchEnd(e.getUserData())
			},
			_onOutputSlotTouchStart: function(e) {
				n.DigraphEditor.Director.outputSlotTouchStart(e.target, e.getUserData())
			},
			_onOutputSlotTouchMove: function(e) {
				n.DigraphEditor.Director.outputSlotTouchMove(e.target, e.getUserData())
			},
			_onOutputSlotTouchEnd: function(e) {
				n.DigraphEditor.Director.outputSlotTouchEnd(e.target, e.getUserData())
			},
			_onInputSlotTouchStart: function(e) {
				n.DigraphEditor.Director.inputSlotTouchStart(e.target, e.getUserData())
			},
			_onInputSlotTouchMove: function(e) {
				n.DigraphEditor.Director.inputSlotTouchMove(e.target, e.getUserData())
			},
			_onInputSlotTouchEnd: function(e) {
				n.DigraphEditor.Director.inputSlotTouchEnd(e.target, e.getUserData())
			},
			_onPanelTouchStart: function(e) {
				n.DigraphEditor.Director.panelTouchStart(e.target, e.getUserData())
			},
			_onPanelTouchMove: function(e) {
				n.DigraphEditor.Director.panelTouchMove(e.target, e.getUserData())
			},
			_onPanelTouchEnd: function(e) {
				n.DigraphEditor.Director.panelTouchEnd(e.target, e.getUserData())
			}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/gallery/prefab/ShaderFXPrefabProjectPanel": "ShaderFXPrefabProjectPanel",
		"../../shader-fx/util/ShaderFXDnDUtil": "ShaderFXDnDUtil",
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../layer/DigraphEditorLayerAccount": "DigraphEditorLayerAccount",
		"../layer/DigraphEditorLayerCanvas": "DigraphEditorLayerCanvas",
		"../layer/DigraphEditorLayerConnection": "DigraphEditorLayerConnection",
		"../layer/DigraphEditorLayerCustomComponent": "DigraphEditorLayerCustomComponent",
		"../layer/DigraphEditorLayerCustomComponentList": "DigraphEditorLayerCustomComponentList",
		"../layer/DigraphEditorLayerCustomComponentMissingResolve": "DigraphEditorLayerCustomComponentMissingResolve",
		"../layer/DigraphEditorLayerFXComponentExporter": "DigraphEditorLayerFXComponentExporter",
		"../layer/DigraphEditorLayerFXComponentLibrary": "DigraphEditorLayerFXComponentLibrary",
		"../layer/DigraphEditorLayerGroup": "DigraphEditorLayerGroup",
		"../layer/DigraphEditorLayerInputField": "DigraphEditorLayerInputField",
		"../layer/DigraphEditorLayerMessageBox": "DigraphEditorLayerMessageBox",
		"../layer/DigraphEditorLayerMessageLayer": "DigraphEditorLayerMessageLayer",
		"../layer/DigraphEditorLayerPanel": "DigraphEditorLayerPanel",
		"../layer/DigraphEditorLayerProjectGallery": "DigraphEditorLayerProjectGallery",
		"../layer/DigraphEditorLayerProjectList": "DigraphEditorLayerProjectList",
		"../layer/DigraphEditorLayerSelection": "DigraphEditorLayerSelection",
		"../layer/DigraphEditorLayerTexturePreview": "DigraphEditorLayerTexturePreview",
		"../layer/DigraphEditorLayerTutorial": "DigraphEditorLayerTutorial",
		"../layer/DigraphEditorLayerVideo": "DigraphEditorLayerVideo",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace",
		"./DigraphEditorContextMenu": "DigraphEditorContextMenu"
	}],
	DigraphEditorCustomComponentManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "fe851v60MBN9LoOKxYUNIc9", "DigraphEditorCustomComponentManager");
		var n = e("../namespace/DigraphEditorNamespace");
		e("../../shader-fx/util/ShaderFXLeanCloudUtil"), e("../../shader-fx/util/ShaderFXUtil"), n.DigraphEditor.Manager.CustomComponent = cc.Class({
			ctor: function() {},
			init: function() {
				console.log("CustomComponentManager"), cc.sys.localStorage.getItem("SSR_SHADERFX_CUSTOM_COMPONENTS") || cc.sys.localStorage.setItem("SSR_SHADERFX_CUSTOM_COMPONENTS", JSON.stringify([]));
				var e = cc.sys.localStorage.getItem("SSR_SHADERFX_CUSTOM_COMPONENTS");
				try {
					this._customComponents = JSON.parse(e)
				} catch (t) {
					cc.warn(e), cc.warn(t)
				}
				console.log(this._customComponents)
			},
			getCustomComponents: function() {
				return this._customComponents
			},
			getCustomComponentList: function() {
				return this._customComponents
			},
			add: function(e) {
				var t = JSON.parse(e.folder),
					n = -1,
					o = JSON.parse(e.component);
				o.capture = e.capture;
				for (var i = 0; i < this._customComponents.length; i++)
					if (this._customComponents[i].name == t.en) {
						if (o.fx && this._customComponents[i].isFX) {
							n = i;
							break
						}
						if (!o.fx && !this._customComponents[i].isFX) {
							n = i;
							break
						}
					}
				if (-1 == n) this._customComponents.push({
					name: t.en,
					name_zh: t.zh,
					isFolder: !0,
					isCustom: !0,
					isOfficial: !!e.official,
					isFX: !!e.fx,
					components: []
				}), n = this._customComponents.length - 1, this._customComponents[n].components.push(o);
				else {
					var a = !1;
					for (i = 0; i < this._customComponents[n].components.length; i++) this._customComponents[n].components[i].uuid == o.uuid && (a = !0, this._customComponents[n].components[i] = o);
					a || this._customComponents[n].components.push(o)
				}
				cc.sys.localStorage.setItem("SSR_SHADERFX_CUSTOM_COMPONENTS", JSON.stringify(this._customComponents))
			},
			remove: function(e) {
				for (var t = e.component ? JSON.parse(e.component) : e, n = t.category ? t.category : e.folder, o = -1, i = 0; i < this._customComponents.length; i++)
					if (e.fx) {
						if (this._customComponents[i].name == n.en && this._customComponents[i].isFX) {
							o = i;
							break
						}
					} else if (this._customComponents[i].name == n.en && !this._customComponents[i].isFX) {
					o = i;
					break
				}
				if (-1 != o) {
					for (i = 0; i < this._customComponents[o].components.length; i++)
						if (this._customComponents[o].components[i].uuid == t.uuid) {
							this._customComponents[o].components.splice(i, 1);
							break
						}
					0 == this._customComponents[o].components.length && this._customComponents.splice(o, 1), cc.sys.localStorage.setItem("SSR_SHADERFX_CUSTOM_COMPONENTS", JSON.stringify(this._customComponents))
				}
			},
			removeOld: function(e) {
				for (var t = e.oldFolder, n = -1, o = 0; o < this._customComponents.length; o++)
					if (e.fx) {
						if (this._customComponents[o].name == t.en && this._customComponents[o].isFX) {
							n = o;
							break
						}
					} else if (this._customComponents[o].name == t.en && !this._customComponents[o].isFX) {
					n = o;
					break
				}
				if (-1 != n) {
					var i = e.component ? JSON.parse(e.component) : e;
					for (o = 0; o < this._customComponents[n].components.length; o++)
						if (this._customComponents[n].components[o].uuid == i.uuid) {
							this._customComponents[n].components.splice(o, 1);
							break
						}
					0 == this._customComponents[n].components.length && this._customComponents.splice(n, 1), delete e.oldFolder
				}
			},
			update: function(e) {
				for (var t = e.component ? JSON.parse(e.component) : e, n = t.category ? t.category : e.folder, o = -1, i = 0; i < this._customComponents.length; i++)
					if (e.fx) {
						if (this._customComponents[i].name == n.en && this._customComponents[i].isFX) {
							o = i;
							break
						}
					} else if (this._customComponents[i].name == n.en && !this._customComponents[i].isFX) {
					o = i;
					break
				}
				for (-1 == o && (this._customComponents.push({
						name: n.en,
						name_zh: n.zh,
						isFolder: !0,
						isCustom: !0,
						isOfficial: !!e.official,
						isFX: !!e.fx,
						components: []
					}), o = this._customComponents.length - 1, this._customComponents[o].components.push(t)), i = 0; i < this._customComponents[o].components.length; i++)
					if (this._customComponents[o].components[i].uuid == t.uuid) {
						this._customComponents[o].components[i] = t;
						break
					}
				cc.sys.localStorage.setItem("SSR_SHADERFX_CUSTOM_COMPONENTS", JSON.stringify(this._customComponents))
			},
			copy: function() {},
			reset: function() {}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorDigraphManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "cf9e2bFjVlHFb6eUT10zUuX", "DigraphEditorDigraphManager");
		var n = e("../namespace/DigraphEditorNamespace");
		e("../../shader-fx/util/ShaderFXUtil"), n.DigraphEditor.Manager.Digraph = cc.Class({
			ctor: function() {},
			init: function(e) {
				this.digraphPanel = e
			},
			reset: function() {},
			traverseDFWithPanel: function(e) {
				var t = e.getComponent(n.DigraphEditor.Prefab.Panel).getDigraphNode(),
					o = [],
					i = {};
				return n.DigraphEditor.Data.Digraph.traverseDFWithNode(t, function(e) {
					var t = e.getData(),
						a = t.getComponent(n.DigraphEditor.Prefab.Panel);
					if (i[a.getConfiguration().name] || (i[a.getConfiguration().name] = {}), !i[a.getConfiguration().name][a.getPanelID()]) {
						i[a.getConfiguration().name][a.getPanelID()] = !0, o.push(t), a.getConfiguration().name;
						for (var r = a.getInputSlots(), s = a.getOutputSlots(), c = a.getConnections(), l = [], h = 0; h < r.length; h++) {
							for (var u = !1, p = 0; p < c.length; p++) {
								var d = c[p].getComponent(n.DigraphEditor.Prefab.Connection).getInputSlot();
								if (r[h].getComponent(n.DigraphEditor.Prefab.InputSlot) === d.getComponent(n.DigraphEditor.Prefab.InputSlot)) {
									var f = r[h].getComponent(n.DigraphEditor.Prefab.InputSlot).getConnection().getComponent(n.DigraphEditor.Prefab.Connection),
										m = f.getOutputPanel().getComponent(n.DigraphEditor.Prefab.Panel),
										g = f.getOutputSlot().getComponent(n.DigraphEditor.Prefab.OutputSlot);
									g || (g = f.getOldOutputSlot().getComponent(n.DigraphEditor.Prefab.OutputSlot)), l.push(m.getOutputName(g.getConfiguration())), u = !0
								}
							}
							u || l.push(null)
						}
						a.setInputParams(l);
						var C = [];
						for (h = 0; h < s.length; h++)
							for (p = 0; p < c.length; p++) {
								var _ = c[p].getComponent(n.DigraphEditor.Prefab.Connection).getOutputSlot();
								s[h] === _ && C.push(s[h].getComponent(n.DigraphEditor.Prefab.OutputSlot).getConfiguration())
							}
						a.setOutputParams(C)
					}
				}), o
			},
			updates: function(e) {
				for (var t = 0; t < e.length; t++) {
					var o = e[t].getComponent(n.DigraphEditor.Prefab.Panel).getDigraphNode();
					o.getParents().length <= 0 && n.DigraphEditor.Data.Digraph.traverseDFWithNode(o, function(e) {
						var t = e.getData();
						t.uuid;
						for (var o = t.getComponent(n.DigraphEditor.Prefab.Panel).getInputSlots(), i = t.getComponent(n.DigraphEditor.Prefab.Panel).getOutputSlots(), a = t.getComponent(n.DigraphEditor.Prefab.Panel).getConnections(), r = 0; r < o.length; r++)
							for (var s = 0; s < a.length; s++) {
								a[s].getComponent(n.DigraphEditor.Prefab.Connection).getInputSlot();
								o[r]
							}
						for (r = 0; r < i.length; r++)
							for (s = 0; s < a.length; s++) {
								a[s].getComponent(n.DigraphEditor.Prefab.Connection).getOutputSlot();
								i[r]
							}
					})
				}
			}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorDigraphPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "88eabaKY+hKe68nd1UyLaez", "DigraphEditorDigraphPanel"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Component.DigraphPanel = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				label: cc.Label
			},
			onLoad: function() {
				this._isShow = !1
			},
			start: function() {},
			onShow: function() {
				this._isShow ? (this._isShow = !1, this.node.x += this.node.width) : (this._isShow = !0, this.node.x -= this.node.width)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorDigraph: [function(e, t) {
		"use strict";
		cc._RF.push(t, "bf65couVo5BR6/CVG90RjAa", "DigraphEditorDigraph");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Data.DigraphNode = cc.Class({
			ctor: function() {
				this.parents = [], this.children = []
			},
			init: function(e) {
				this.data = e
			},
			getData: function() {
				return this.data
			},
			getChildren: function() {
				return this.children
			},
			addChild: function(e) {
				return !this.isChildExist(e) && (this.children.push(e), !0)
			},
			removeChild: function(e) {
				var t = this.findChildIndex(e);
				return -1 == t ? null : (this.children.splice(t, 1), e)
			},
			isChildExist: function(e) {
				for (var t = 0; t < this.children.length; t++)
					if (this.children[t] === e) return !0;
				return !1
			},
			findChildIndex: function(e) {
				for (var t = 0; t < this.children.length; t++)
					if (this.children[t] === e) return t;
				return -1
			},
			hasParent: function() {
				return this.parents.length > 0
			},
			getParents: function() {
				return this.parents
			},
			addParent: function(e) {
				return !this.isParentExist(e) && (this.parents.push(e), !0)
			},
			removeParent: function(e) {
				var t = this.findParentIndex(e);
				return -1 == t ? null : (this.parents.splice(t, 1), e)
			},
			isParentExist: function(e) {
				for (var t = 0; t < this.parents.length; t++)
					if (this.parents[t] === e) return !0;
				return !1
			},
			findParentIndex: function(e) {
				for (var t = 0; t < this.parents.length; t++)
					if (this.parents[t] === e) return t;
				return -1
			}
		}), n.DigraphEditor.Data.Digraph = function() {}, n.DigraphEditor.Data.Digraph.traverseDFWithNode = function(e, t) {
			(function e(n) {
				for (var o = 0, i = n.children.length; o < i; o++) e(n.children[o]);
				t(n)
			})(e)
		}, n.DigraphEditor.Data.Digraph.connect = function(e, t) {
			e.addParent(t), t.addChild(e)
		}, n.DigraphEditor.Data.Digraph.disconnect = function(e, t) {
			var n = t.removeChild(e),
				o = e.removeParent(t);
			n || cc.log("ssr.Shader.Editor.Tree.remove child not found!"), o || cc.log("ssr.Shader.Editor.Tree.remove parent not found!")
		}, cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorDirector: [function(e, t) {
		"use strict";
		var n;
		cc._RF.push(t, "29279zwnLRGRoQpYSIICAuF", "DigraphEditorDirector");
		var o = e("../namespace/DigraphEditorNamespace"),
			i = e("../../shader-fx/util/ShaderFXProjectUtil"),
			a = e("../../shader-fx/util/ShaderFXLeanCloudUtil"),
			r = e("../../shader-fx/util/ShaderFXUtil"),
			s = e("./DigraphEditorCanvasManager"),
			c = e("./DigraphEditorPanelManager"),
			l = e("./DigraphEditorConnectionManager"),
			h = e("./DigraphEditorSlotManager"),
			u = e("./DigraphEditorDigraphManager"),
			p = e("./DigraphEditorProjectManager"),
			d = e("./DigraphEditorCustomComponentManager"),
			f = e("./DigraphEditorGroupManager"),
			m = e("./DigraphEditorCommandManager");
		o.DigraphEditor.Manager.Director = cc.Class(((n = {
			ctor: function() {
				this.CanvasManager = new s, this.PanelManager = new c, this.ConnectionManager = new l, this.SlotManager = new h, this.GroupManager = new f, this.DigraphManager = new u, this.ProjectManager = new p, this.CommandManager = new m, this.CustomComponentManager = new d, this._toastInQueue = -1
			},
			showToast: function(e) {
				var t = this,
					n = cc.instantiate(this.editorToast);
				this.layerCanvas.node.parent.addChild(n), n.y = cc.winSize.height / 2 - n.height, n.getComponent(o.DigraphEditor.Prefab.Toast).init(e), this._toastInQueue++, cc.tween(n).delay(1.4 * this._toastInQueue).to(.5, {
					opacity: 255
				}).delay(1).call(function() {
					n.removeFromParent(!0), t._toastInQueue--
				}).start()
			},
			init: function(e, t, n, o, i, a, r, s, c, l, h, u, p, d, f, m, g, C, _, v) {
				this.layerCanvas = e, this.panelLayer = t, this.inputFieldLayer = a, this.messageBoxLayer = r, this.messageLayer = s, this.connectionLayer = n, this.selectionLayer = o, this.groupLayer = i, this.contextMenu = c, this.editorToast = l, this.projectInfoLayer = h, this.projectTexturePreviewLayer = u, this.videoLayer = p, this.customComponentLayer = d, this.customComponentListLayer = f, this.fxComponentLibraryLayer = m, this.fxExporterLayer = g, this.projectListLayer = C, this.customComponentMissingResolve = _, this.captureNode = v, this.CanvasManager.init(this.layerCanvas), this.CustomComponentManager.init(), this.PanelManager.init(this.layerCanvas, this.panelLayer, this.contextMenu, this.projectInfoLayer, this.CustomComponentManager.getCustomComponents()), this.ConnectionManager.init(this.layerCanvas, this.connectionLayer), this.GroupManager.init(this.layerCanvas, this.groupLayer), this.ProjectManager.init()
			},
			texturePreview: function(e) {
				this.projectTexturePreviewLayer.show(e)
			},
			showOnlineVideo: function(e) {
				this.videoLayer.show(e)
			},
			doRepairProjectScene: function(e) {
				this.resetAll(), this.doRestoreProjectScene(e)
			},
			doRestoreProjectScene: function(e) {
				for (var t = this, n = e.panels || [], i = [], a = 0; a < n.length; a++) {
					var r = n[a],
						s = this.PanelManager.createPanel(this.PanelManager.getConfiguration(r), r.id);
					s ? (s.x = parseInt(r.x), s.y = parseInt(r.y)) : i.push(r)
				}
				var c = [];
				for (var l in e.groups) {
					var h = [];
					for (a = 0; a < e.groups[l].panels.length; a++) h.push(this.PanelManager.findPanel(e.groups[l].panels[a]));
					var u = this.GroupManager.addGroup(h, l);
					u.getComponent(o.DigraphEditor.Prefab.Group).setGroupName(e.groups[l].name), u.x = parseInt(e.groups[l].x), u.y = parseInt(e.groups[l].y), e.groups[l].min && c.push(u)
				}
				0 == i.length ? setTimeout(function() {
					for (var e = 0; e < n.length; e++)
						for (var i = n[e], a = t.PanelManager.findPanel(i.id), r = 0; r < i.outputSlot.length; r++)
							for (var s = i.outputSlot[r], l = s.index, h = s.connections, u = 0; u < h.length; u++) {
								var p = h[u],
									d = p[0],
									f = p[1],
									m = t.PanelManager.findPanel(d);
								t.ConnectionManager.connect(a, a.getComponent("DigraphEditorPrefabPanel").getOutputSlotByIndex(l), m, m.getComponent("DigraphEditorPrefabPanel").getInputSlotByIndex(f))
							}
					setTimeout(function() {
						for (var e = 0; e < n.length; e++) {
							var i = n[e],
								a = t.PanelManager.findPanel(i.id);
							for (var r in i.uniforms) {
								var s = i.uniforms[r];
								a.getComponent("ShaderFXPrefabPanel").updateUniformValue(r, s), "texture" != r && "UTexture" != a.getComponent("ShaderFXPrefabPanel").getConfiguration().name && t.updateDigraphParams(a, r, s)
							}
						}
						for (e = 0; e < c.length; e++) c[e].getComponent(o.DigraphEditor.Prefab.Group).onMin();
						setTimeout(function() {
							t.updateDigraph(), 1 == cc.sys.localStorage.getItem("ssrfx_autosave") && t.ProjectManager.autoSaveOn(), t.messageLayer.getComponent(o.DigraphEditor.Layer.Message).dismiss(), t.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u52a0\u8f7d\u6210\u529f | \u9879\u76ee\u540d: " : "Restore Project Succeeded | Name: ") + t.ProjectManager.getName())
						}, 100)
					}, 100)
				}, 500) : (this.messageLayer.getComponent(o.DigraphEditor.Layer.Message).dismiss(), this.customComponentMissingResolve.refresh(i, e), this.customComponentMissingResolve.node.active = !0)
			},
			donwloadCustomComponent: function(e) {
				this.PanelManager.updateComponent(e), this.CustomComponentManager.add(e)
			},
			updateCustomComponent: function(e) {
				this.PanelManager.updateComponent(e), e.oldFolder ? (this.CustomComponentManager.removeOld(e), this.CustomComponentManager.add(e)) : this.CustomComponentManager.update(e)
			},
			cloneCustomComponent: function(e) {
				this.PanelManager.updateComponent(e), this.CustomComponentManager.add(e), this.customComponentListLayer.refreshClone()
			},
			cloneCustomComponentCloud: function(e) {
				this.PanelManager.updateComponent(e), this.CustomComponentManager.add(e)
			},
			removeCustomComponent: function(e) {
				this.PanelManager.removeComponent(e), this.CustomComponentManager.remove(e)
			},
			removeProject: function(e) {
				var t = this;
				this.messageBoxLayer.getComponent(o.DigraphEditor.Layer.MessageBox).show("\u662f\u5426\u786e\u5b9a\u5220\u9664\u8be5\u9879\u76ee?", {
					onConfirm: function() {
						a.deleteProject(e, function() {
							t.projectListLayer.removeItem(e), t.showToast(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5220\u9664\u9879\u76ee\u6210\u529f" : "Project is removed succesfully")
						}, function() {
							t.showToast(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5220\u9664\u9879\u76ee\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5" : "Project remove failed, please try again later")
						})
					},
					onCancel: function() {}
				})
			},
			restoreProject: function(e) {
				if (this.PanelManager.isTemplatesLoaded()) {
					!e && cc.sys.localStorage.getItem("SSR_SHADERFX_PROJECT_SCENE_TEMP") && (e = cc.sys.localStorage.getItem("SSR_SHADERFX_PROJECT_SCENE_TEMP"));
					try {
						e = JSON.parse(e)
					} catch (t) {
						return cc.warn(e), cc.warn(t), this.messageLayer.getComponent(o.DigraphEditor.Layer.Message).dismiss(), void this.newProject()
					}
					this.ProjectManager.import(e), this.resetAll(), cc.log(e), this.doRestoreProjectScene(e)
				}
			},
			test: function() {
				var e = this.PanelManager.getCoolPanel().getComponent("ShaderFXPrefabPanel"),
					t = this.DigraphManager.traverseDFWithPanel(e);
				e.test(i.ExportUtil.getUniforms(t))
			},
			updateSpine: function(e) {
				var t = this.PanelManager.getCoolPanel().getComponent("ShaderFXPrefabPanel")._uniformOutput.getComponent("ShaderFXPrefabUniformOutput"),
					n = t.sp;
				for (var o in n.skeletonData = e, e.skeletonJson.animations) {
					n.animation = o;
					break
				}
				t.updateRenderComponent(n), cc.log(n.node.width), cc.log(n.node.height), cc.log(n.node.scale);
				var i = 250 / n.node.width,
					a = 250 / n.node.height,
					r = Math.min(i, a);
				n.node.scale = r
			},
			createGlobalUniform: function(e) {
				this.PanelManager.addGlobalUniform(e.key, e.value, e.type, e.panel)
			},
			updateGlobalUniformKey: function(e) {
				this.PanelManager.updateGlobalUniformKey(e.oldKey, e.key, e.type, e.value, e.panel)
			},
			updateGlobalUniformValue: function(e) {
				this.PanelManager.updateGlobalUniformValue(e.key, e.value, e.type, e.value, e.panel)
			},
			panelCreateByName: function(e, t) {
				if (cc.js.isString(e)) {
					if ("Output" == e || "MainTexture" == e) return
				} else if ("Output" == e.name || "MainTexture" == e.name) return;
				this.panelCreate(this.PanelManager.getConfiguration(e), t)
			},
			panelCreate: function(e, t) {
				"Output" != e.name && "MainTexture" != e.name && this.panelCreateInvoker(e, t)
			},
			updateDigraphParams: function(e, t, n) {
				var i = this.PanelManager.getPanels(),
					a = !1,
					r = [];
				e.getComponent("ShaderFXPrefabProjectUniform") && (r = e.getComponent("ShaderFXPrefabProjectUniform")._panels);
				for (var s = 0; s < i.length; s++) {
					var c = i[s].getComponent(o.DigraphEditor.Prefab.Panel);
					if ("MainTexture" != c.getConfiguration().name)
						if (r.length > 0)
							for (var l = 0; l < r.length; l++) {
								var h = c.updatePanelUniform(r[l], t, n);
								if (a |= h, h) break
							} else a |= c.updatePanelUniform(e, t, n)
				}
				a && this.updateDigraph(t, n)
			},
			autoCreate: function(e, t) {
				for (var n = e.x - 150, o = e.y + 50, i = [], a = 0; a < t.input.length; a++) {
					console.log(t.input[a]);
					var r = null,
						s = !1;
					if ("float" == t.input[a].type)
						if (t.input[a].isTime) {
							var c = this.PanelManager.getConfiguration("UTime0");
							r = this.PanelManager.createPanel(c)
						} else {
							var l = this.PanelManager.getConfiguration("UFloat");
							r = this.PanelManager.createPanel(l);
							var h = "u" + t.input[a].name;
							r.getComponent("ShaderFXPrefabUniformFloatPanel").updateUniformKey(h), r.getComponent("ShaderFXPrefabUniformFloatPanel").updateUniformValue(h, t.input[a].default)
						}
					else if ("vec2" == t.input[a].type)
						if (t.input[a].isUV0) {
							var u = this.PanelManager.getConfiguration("UV0");
							r = this.PanelManager.createPanel(u)
						} else if (t.input[a].isUVNDC) {
						var p = this.PanelManager.getConfiguration("UVNDC");
						r = this.PanelManager.createPanel(p)
					} else {
						var d = this.PanelManager.getConfiguration("UVec2");
						r = this.PanelManager.createPanel(d);
						var f = "u" + t.input[a].name;
						r.getComponent("ShaderFXPrefabUniformVec2Panel").updateUniformKey(f);
						var m = [0, 0];
						if (t.input[a].default) {
							var g = t.input[a].default.split(",");
							m = [parseFloat(g[0]), parseFloat(g[1])]
						}
						r.getComponent("ShaderFXPrefabUniformVec2Panel").updateUniformValue(f, m)
					} else if ("vec3" == t.input[a].type) {
						var C = this.PanelManager.getConfiguration("UVec3");
						r = this.PanelManager.createPanel(C);
						var _ = "u" + t.input[a].name;
						r.getComponent("ShaderFXPrefabUniformVec3Panel").updateUniformKey(_);
						var v = [0, 0, 0];
						if (t.input[a].default) {
							var E = t.input[a].default.split(",");
							v = [parseFloat(E[0]), parseFloat(E[1]), parseFloat(E[2])]
						}
						r.getComponent("ShaderFXPrefabUniformVec3Panel").updateUniformValue(_, v)
					} else if ("vec4" == t.input[a].type)
						if (t.input[a].isMainTexture) r = this.PanelManager.getMainTexturePanel(), s = !0;
						else if (t.input[a].isColor) {
						var S = this.PanelManager.getConfiguration("UColor");
						r = this.PanelManager.createPanel(S);
						var P = "u" + t.input[a].name;
						r.getComponent("ShaderFXPrefabUniformColorPanel").updateUniformKey(P), r.getComponent("ShaderFXPrefabUniformColorPanel").updateUniformValue(P, cc.color(t.input[a].default))
					} else {
						var b = this.PanelManager.getConfiguration("UVec4");
						r = this.PanelManager.createPanel(b);
						var y = "u" + t.input[a].name;
						r.getComponent("ShaderFXPrefabUniformVec4Panel").updateUniformKey(y);
						var F = [0, 0, 0, 0];
						if (t.input[a].default) {
							var U = t.input[a].default.split(",");
							F = [parseFloat(U[0]), parseFloat(U[1]), parseFloat(U[2]), parseFloat(U[3])]
						}
						r.getComponent("ShaderFXPrefabUniformVec4Panel").updateUniformValue(y, F)
					} else if ("sampler2D" == t.input[a].type)
						if (t.input[a].isMainTexture)(r = this.PanelManager.getMainTexturePanel()).active || (r = this.PanelManager.getSpinePanel()), s = !0;
						else {
							var D = this.PanelManager.getConfiguration("UTexture");
							r = this.PanelManager.createPanel(D);
							var x = "u" + t.input[a].name,
								X = {
									content: t.input[a].default,
									filterMode: "Linear",
									name: x + ".jpg",
									packMode: "Unpack",
									wrapMode: t.input[a].wrapMode
								};
							r.getComponent("ShaderFXPrefabUniformTexturePanel").updateUniformValue(x, X), r.getComponent("ShaderFXPrefabUniformTexturePanel").updateUniformKey(x)
						}
					r ? (s || (r.x = n, r.y = o, t.input[a].isUV0 ? o -= 100 : o -= 40), i.push(r)) : i.push(null)
				}
				var T = this;
				setTimeout(function() {
					for (var t = 0; t < i.length; t++) {
						var n = i[t];
						n && T.ConnectionManager.connect(n, n.getComponent("DigraphEditorPrefabPanel").getOutputSlotByIndex(0), e, e.getComponent("DigraphEditorPrefabPanel").getInputSlotByIndex(t))
					}
				}, 200)
			},
			panelCreateInvoker: function(e, t) {
				this.PanelManager.deselectPanels();
				var n = this.PanelManager.createPanel(e);
				return t && (n.x = t.x, n.y = t.y), (e.fx || e.custom) && this.autoCreate(n, e), n
			},
			switchToSprite: function() {
				cc.log("switchToSprite");
				var e = this.PanelManager.getMainTexturePanel();
				e.active = !0;
				var t = this.PanelManager.getSpinePanel();
				if (t) {
					t.active = !1, this.PanelManager.getCoolPanel(), e.x = t.x, e.y = t.y + t.getBoundingBox().height + e.getBoundingBox().height / 2 + 30;
					var n = this;
					setTimeout(function() {
						for (var i = t.getComponent("DigraphEditorPrefabPanel").getOutputSlots(), a = 0; a < i.length; a++)
							for (var r = i[a].getComponent(o.DigraphEditor.Prefab.OutputSlot).getConnections(), s = 0; s < r.length; s++) {
								var c = r[s].getComponent(o.DigraphEditor.Prefab.Connection).getInputPanel(),
									l = r[s].getComponent(o.DigraphEditor.Prefab.Connection).getInputSlot();
								n.ConnectionManager.connect(e, e.getComponent("DigraphEditorPrefabPanel").getOutputSlotByIndex(0), c, l)
							}
					}, 100)
				}
			},
			switchToSpine: function() {
				var e = this.PanelManager.getMainTexturePanel();
				e.active = !1;
				var t = this.PanelManager.getSpinePanel(),
					n = (this.PanelManager.getCoolPanel(), this);
				if (t) {
					t.x = e.x, t.y = e.y - e.getBoundingBox().height - t.getBoundingBox().height;
					for (var i = e.getComponent("DigraphEditorPrefabPanel").getOutputSlots(), a = 0; a < i.length; a++)
						for (var r = i[a].getComponent(o.DigraphEditor.Prefab.OutputSlot).getConnections(), s = 0; s < r.length; s++) {
							var c = r[s].getComponent(o.DigraphEditor.Prefab.Connection).getInputPanel(),
								l = r[s].getComponent(o.DigraphEditor.Prefab.Connection).getInputSlot();
							n.ConnectionManager.connect(t, t.getComponent("DigraphEditorPrefabPanel").getOutputSlotByIndex(0), c, l)
						}
				} else(t = this.PanelManager.createPanel(this.PanelManager.getConfiguration("SpineSkeleton"))).x = e.x, t.y = e.y - e.getBoundingBox().height - t.getBoundingBox().height, setTimeout(function() {
					for (var i = e.getComponent("DigraphEditorPrefabPanel").getOutputSlots(), a = 0; a < i.length; a++)
						for (var r = i[a].getComponent(o.DigraphEditor.Prefab.OutputSlot).getConnections(), s = 0; s < r.length; s++) {
							var c = r[s].getComponent(o.DigraphEditor.Prefab.Connection).getInputPanel(),
								l = r[s].getComponent(o.DigraphEditor.Prefab.Connection).getInputSlot();
							n.ConnectionManager.connect(t, t.getComponent("DigraphEditorPrefabPanel").getOutputSlotByIndex(0), c, l)
						}
				}, 100);
				t.active = !0
			},
			panelCopy: function(e) {
				return this.PanelManager.deselectPanels(), this.PanelManager.clonePanel(e)
			},
			createUniformPanel: function(e) {
				this.PanelManager.deselectPanels();
				var t = this.PanelManager.getUniformPanel(e);
				return this.PanelManager.clonePanel(t)
			},
			updateUniformOnPanel: function(e, t) {
				for (var n = this.PanelManager.getPanels(), i = 0; i < n.length; i++) {
					var a = n[i].getComponent(o.DigraphEditor.Prefab.Panel);
					"MainTexture" != a.getConfiguration().name && a.updatePreviewUniforms(e, t)
				}
			},
			focusPanel: function(e) {
				this.CanvasManager.setZoomScale(2), this.CanvasManager.focus(e)
			},
			panelRemove: function(e) {
				e.getComponent(o.DigraphEditor.Prefab.Panel).getGroup() && this.GroupManager.removePanel(e), this.ConnectionManager.disconnectAll(e);
				var t = this.PanelManager.removePanel(e, !1);
				return this.updateDigraph(), t
			},
			panelRemoveInvoker: function(e, t) {
				return void 0 === t && (t = !0), this.PanelManager.removePanel(e, t)
			},
			panelRestoreInvoker: function(e) {
				return this.PanelManager.restorePanel(e)
			},
			panelTouchStart: function(e) {
				this.PanelManager.moveStart(e)
			},
			panelTouchMove: function(e, t) {
				this.PanelManager.moveBy(e, t.getDelta().div(this.CanvasManager.getZoomScale()));
				var n = this.PanelManager.getSelectedPanels();
				if (this.ConnectionManager.panelMove(e, n), n.length > 0)
					for (var i = n.length - 1; i >= 0; i--) this.GroupManager.updateGroup(n[i]);
				else this.GroupManager.updateGroup(e), e.getComponent(o.DigraphEditor.Prefab.Panel).getGroup() || this.GroupManager.runDropAnimation(e)
			},
			panelTouchEnd: function(e) {
				this.panelMoveToInvoker(e, e.position, this.PanelManager.getPanelTouchStartPosition())
			},
			panelMoveToInvoker: function(e, t) {
				var n = this.PanelManager.moveTo(e, t);
				return this.ConnectionManager.panelMove(e), this.GroupManager.panelMoveFinish(e), n
			},
			panelMoveRestoreInvoker: function(e, t) {
				this.PanelManager.moveRestore(e, t), this.ConnectionManager.panelMove(e)
			},
			autoSave: function(e) {
				e ? this.ProjectManager.autoSaveOn() : this.ProjectManager.autoSaveOff()
			},
			autoDim: function(e) {
				this.PanelManager.autoDim(e)
			},
			autoConnect: function(e) {
				this.PanelManager.autoConnect(e)
			},
			autoHint: function(e) {
				this.SlotManager.autoHint(e)
			},
			canvasMove: function(e) {
				this.layerCanvas.canMove(e)
			},
			canvasZoomIn: function() {
				this.canvasZoomInInvoker()
			},
			canvasZoomInInvoker: function() {
				this.CanvasManager.zoomIn()
			},
			canvasZoomOut: function() {
				this.canvasZoomOutInvoker()
			},
			canvasZoomOutInvoker: function() {
				this.CanvasManager.zoomOut()
			},
			canvasZoomReset: function() {
				this.CanvasManager.zoomReset()
			},
			canvasZoomResetInvoker: function() {},
			canvasZoomFit: function() {
				this.CanvasManager.zoomFit()
			},
			canvasResize: function() {
				this.CanvasManager.resize()
			},
			selectionTouchStart: function(e) {
				if (!this.layerCanvas.isCanMove()) {
					var t = this.layerCanvas.node.convertToNodeSpaceAR(e.getLocation());
					this.selectionLayer.drawSelectionStart(t), this.PanelManager.selectionTouchStart(), this.PanelManager.deselectPanels()
				}
			},
			selectionTouchMove: function(e) {
				if (!this.layerCanvas.isCanMove()) {
					var t = this.layerCanvas.node.convertToNodeSpaceAR(e.getLocation());
					this.selectionLayer.drawSelection(t);
					var n = this.selectionLayer.getSelection(),
						o = this.PanelManager.getPanelsInAndNotInRect(n);
					this.PanelManager.groupSelect(o[0], o[1])
				}
			},
			selectionTouchEnd: function(e) {
				if (!this.layerCanvas.isCanMove()) {
					var t = this.layerCanvas.node.convertToNodeSpaceAR(e.getLocation());
					this.selectionLayer.drawSelectionEnd(t);
					var n = this.selectionLayer.getSelection(),
						o = this.PanelManager.getPanelsInAndNotInRect(n);
					(o[0].length > 0 || o[1].length > 0) && this.selectionTouchInvoker(o[0], o[1])
				}
			},
			selectionTouchInvoker: function(e, t) {
				return this.PanelManager.groupSelect(e, t)
			},
			selectionRestoreInvoker: function(e) {
				this.PanelManager.deselectPanels(), this.PanelManager.selectPanels(e, [])
			},
			inputSlotTouchStart: function(e, t) {
				var n = e.getComponent(o.DigraphEditor.Prefab.InputSlot).getConnection();
				if (n) {
					var i = this.layerCanvas.node.convertToNodeSpaceAR(t.getLocation());
					this.ConnectionManager.moveConnectionStart(i, n), this.PanelManager.updateDim(n.getComponent(o.DigraphEditor.Prefab.Connection).getOutputPanel()), this.PanelManager.updateDim(n.getComponent(o.DigraphEditor.Prefab.Connection).getInputPanel()), this.updateDigraph()
				}
			},
			inputSlotTouchMove: function(e, t) {
				var n = this.layerCanvas.node.convertToNodeSpaceAR(t.getLocation());
				this.ConnectionManager.moveConnection(n)
			},
			inputSlotTouchEnd: function(e, t) {
				var n = this.PanelManager.getConnectableInputSlotAt(t.getLocation(), this.ConnectionManager.getConnectionOutputSlotTouch());
				this.ConnectionManager.moveConnectionEnd(), n && this.createConnectionInvoker(this.ConnectionManager.getConnectionOutputPanelTouch(), this.ConnectionManager.getConnectionOutputSlotTouch(), n.getComponent(o.DigraphEditor.Prefab.InputSlot).getPanel(), n)
			},
			outputSlotTouchStart: function(e, t) {
				var n = this.layerCanvas.node.convertToNodeSpaceAR(t.getLocation());
				this.ConnectionManager.drawConnectionStart(e, n)
			},
			outputSlotTouchMove: function(e, t) {
				var n = this.layerCanvas.node.convertToNodeSpaceAR(t.getLocation());
				if (this.ConnectionManager.drawConnection(n), this.SlotManager.isAutoHint()) {
					var o = this.SlotManager.getPossibleConnectInputSlots(this.PanelManager.getPanels(), e);
					this.SlotManager.runHintAnimation(o)
				}
			},
			outputSlotTouchEnd: function(e, t) {
				var n = this.layerCanvas.node.convertToNodeSpaceAR(t.getLocation());
				if (this.ConnectionManager.drawConnectionEnd(), this.SlotManager.isAutoHint()) {
					var i = this.SlotManager.getPossibleConnectInputSlots(this.PanelManager.getPanels(), e);
					this.SlotManager.stopHintAnimation(i)
				}
				var a = null;
				if (this.PanelManager.isAutoConnect()) {
					var r = this.PanelManager.getConnectablePanel(n);
					r && (a = this.SlotManager.getAnyPossibleConnectInputSlot(r, e))
				} else a = this.PanelManager.getConnectableInputSlotAt(t.getLocation(), e);
				a && this.createConnectionInvoker(e.getComponent(o.DigraphEditor.Prefab.OutputSlot).getPanel(), e, a.getComponent(o.DigraphEditor.Prefab.InputSlot).getPanel(), a)
			},
			createConnectionInvoker: function(e, t, n, o) {
				var i = this.ConnectionManager.connect(e, t, n, o);
				return this.PanelManager.updateDim(e), this.PanelManager.updateDim(n), i
			},
			removeConnectionInvoker: function(e) {
				this.PanelManager.updateDim(e.getComponent(o.DigraphEditor.Prefab.Connection).getOutputPanel()), this.PanelManager.updateDim(e.getComponent(o.DigraphEditor.Prefab.Connection).getInputPanel()), this.ConnectionManager.disconnect(e, !1)
			},
			restoreConnectionInvoker: function(e) {
				return this.ConnectionManager.reconnect(e)
			},
			groupCreate: function() {
				var e = this.PanelManager.getSelectedPanels();
				e.length < 2 || (this.GroupManager.addGroup(e.slice()), this.PanelManager.deselectPanels())
			},
			groupRemove: function() {
				this.GroupManager.removeGroup(group)
			},
			groupUngroup: function(e) {
				this.GroupManager.ungroup(e)
			},
			groupAddPanel: function(e) {
				this.GroupManager.addPanel(e)
			},
			groupAddPanels: function() {},
			groupRemovePanel: function(e) {
				this.GroupManager.removePanel(e), this.ConnectionManager.panelMove(e)
			},
			exportProjectJSON: function(e) {
				window.download(JSON.stringify(e, null, 4), this.ProjectManager.getName(), "application/json"), this.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa\u9879\u76ee\u6210\u529f | \u9879\u76ee\u540d: " : "Export Project Succeeded | Name: ") + this.ProjectManager.getName()), this.newProject()
			}
		}).groupUngroup = function(e) {
			cc.log("groupUngroup"), cc.log(e), this.GroupManager.ungroup(e)
		}, n.groupTouchStart = function() {}, n.groupTouchMove = function(e, t) {
			this.GroupManager.moveBy(e, t.getDelta().div(this.CanvasManager.getZoomScale()));
			for (var n = e.getComponent(o.DigraphEditor.Prefab.Group).getPanels(), i = n.length - 1; i >= 0; i--) this.ConnectionManager.panelMove(n[i])
		}, n.groupTouchEnd = function() {}, n.updatePreview = function(e, t, n) {
			var i = e.getComponent(o.DigraphEditor.Prefab.Panel),
				a = this.DigraphManager.traverseDFWithPanel(i);
			i.updatePreviewDigraph(a, t, n)
		}, n.updateDigraph = function(e, t) {
			for (var n = this.PanelManager.getPanels(), i = 0; i < n.length; i++) {
				var a = n[i].getComponent(o.DigraphEditor.Prefab.Panel);
				if ("MainTexture" != a.getConfiguration().name)
					if ("Output" != a.getConfiguration().name) {
						if (!a.extendPanel || a.extendPanel.getComponent("ShaderFXPrefabExtendPanel").isPreviewOn) {
							var r = this.DigraphManager.traverseDFWithPanel(a);
							a.updatePreviewDigraph(r, e, t)
						}
					} else {
						var s = this.DigraphManager.traverseDFWithPanel(a);
						a.updatePreviewDigraph(s, e, t)
					}
			}
		}, n.saveCustomComponent = function() {
			this.customComponentListLayer.refresh(this.CustomComponentManager.getCustomComponents())
		}, n.rescue = function() {
			var e = this;
			e.messageBoxLayer.getComponent(o.DigraphEditor.Layer.MessageBox).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u8bf7\u786e\u4fdd\u53ea\u5728\u9879\u76ee\u51fa\u95ee\u9898\u65e0\u6cd5\u52a0\u8f7d\u7684\u60c5\u51b5\u4e0b\u4f7f\u7528\u8be5\u529f\u80fd\uff0c\u7d27\u6025\u4fee\u590d\u540e\uff0c\u7f13\u5b58\u7684\u9879\u76ee\u4f1a\u88ab\u6e05\u9664\uff0c\u662f\u5426\u7ee7\u7eed?" : "This feature should only be used when your project can not be loaded and the cached project will be remove, continue ?", {
				onConfirm: function() {
					cc.sys.localStorage.removeItem("SSR_SHADERFX_PROJECT_SCENE_TEMP"), cc.sys.localStorage.removeItem("SSR_SHADERFX_PROJECT_UNGOING"), cc.sys.localStorage.removeItem("SSR_SHADERFX_CUSTOM_COMPONENTS"), cc.sys.localStorage.removeItem("SSR_SHADERFX_ONLINE_COMPONENTS");
					for (var t = 1; t < 100; t++) cc.sys.localStorage.removeItem("SSR_SHADERFX_ONLINE_COMPONENTS_" + t);
					e.showToast(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u53ef\u80fd\u51fa\u73b0\u95ee\u9898\u7684\u6570\u636e\u5df2\u7ecf\u88ab\u91cd\u7f6e ...." : "Corrupted data is reset ......")
				},
				onCancel: function() {}
			})
		}, n.uploadProject = function() {
			var e = i.ExportUtil.serializeSchema(this.ProjectManager.getName(), this.PanelManager.getPanels(), this.GroupManager.getGroups()),
				t = this;
			this.captureNode.active = !0, setTimeout(function() {
				var n = t.captureNode.getComponent("FBONodeCaptureComponent").generateBase64Code();
				t.captureNode.active = !1, t.ProjectManager.uploadScene(t.ProjectManager.getName(), e, n, function() {
					t.showToast(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u4e0a\u4f20\u9879\u76ee\u6210\u529f" : "Upload Project Succeeded")
				}, function(e) {
					t.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u4e0a\u4f20\u9879\u76ee\u5931\u8d25 | \u9519\u8bef\u4fe1\u606f: " : "Upload Project Failed | Error: ") + e)
				})
			}, 100)
		}, n.saveProject = function(e) {
			var t = i.ExportUtil.serializeSchema(this.ProjectManager.getName(), this.PanelManager.getPanels(), this.GroupManager.getGroups());
			this.ProjectManager.saveScene(t), e ? this.showToast(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u81ea\u52a8\u4fdd\u5b58" : "Project Auto Saved") : this.showToast(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u4fdd\u5b58\u6210\u529f" : "Current Project Saved")
		}, n.exportProject = function() {
			var e = i.ExportUtil.serializeSchema(this.ProjectManager.getName(), this.PanelManager.getPanels(), this.GroupManager.getGroups());
			window.download(e, this.ProjectManager.getName(), "application/json"), this.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa\u9879\u76ee\u6210\u529f | \u9879\u76ee\u540d: " : "Export Project Succeeded | Name: ") + this.ProjectManager.getName())
		}, n.snapshot = function() {
			var e = this;
			this.captureNode.active = !0, setTimeout(function() {
				e.captureNode.getComponent("FBONodeCaptureComponent").capture(e.ProjectManager.getName()), e.captureNode.active = !1
			}, 100)
		}, n.snapshotOutput = function() {
			this.PanelManager.getOutputPanel().getComponent("ShaderFXPrefabPanel").exportSnapshot(this.ProjectManager.getName())
		}, n.exportFX3D = function() {
			var e = this,
				t = this.PanelManager.getOutputPanel().getComponent("ShaderFXPrefabPanel"),
				n = this.DigraphManager.traverseDFWithPanel(t),
				o = i.ExportUtil.getUniforms(n),
				a = {
					techniques: [{
						name: "opaque",
						passes: [{
							vert: "unlit-vs:vert",
							frag: "unlit-fs:frag",
							properties: {
								mainTexture: {
									value: "grey"
								},
								tilingOffset: {
									value: [1, 1, 0, 0]
								},
								mainColor: {
									value: [1, 1, 1, 1],
									editor: {
										type: "color"
									}
								},
								colorScale: {
									value: [1, 1, 1],
									target: "colorScaleAndCutoff.xyz"
								},
								alphaThreshold: {
									value: .5,
									target: "colorScaleAndCutoff.w",
									editor: {
										parent: "USE_ALPHA_TEST"
									}
								},
								color: {
									target: "mainColor",
									editor: {
										visible: !1
									}
								}
							},
							migrations: {
								properties: {
									mainColor: {
										formerlySerializedAs: "color"
									}
								}
							}
						}]
					}, {
						name: "transparent",
						passes: [{
							vert: "unlit-vs:vert",
							frag: "unlit-fs:frag",
							depthStencilState: {
								depthTest: !0,
								depthWrite: !1
							},
							blendState: {
								targets: [{
									blend: !0,
									blendSrc: "src_alpha",
									blendDst: "one_minus_src_alpha",
									blendDstAlpha: "one_minus_src_alpha"
								}]
							},
							properties: {
								mainTexture: {
									value: "grey"
								},
								tilingOffset: {
									value: [1, 1, 0, 0]
								},
								mainColor: {
									value: [1, 1, 1, 1],
									editor: {
										type: "color"
									}
								},
								colorScale: {
									value: [1, 1, 1],
									target: "colorScaleAndCutoff.xyz"
								},
								alphaThreshold: {
									value: .5,
									target: "colorScaleAndCutoff.w",
									editor: {
										parent: "USE_ALPHA_TEST"
									}
								},
								color: {
									target: "mainColor",
									editor: {
										visible: !1
									}
								}
							},
							migrations: {
								properties: {
									mainColor: {
										formerlySerializedAs: "color"
									}
								}
							}
						}]
					}, {
						name: "add",
						passes: [{
							vert: "unlit-vs:vert",
							frag: "unlit-fs:frag",
							rasterizerState: {
								cullMode: "none"
							},
							depthStencilState: {
								depthTest: !0,
								depthWrite: !1
							},
							blendState: {
								targets: [{
									blend: !0,
									blendSrc: "src_alpha",
									blendDst: "one",
									blendSrcAlpha: "src_alpha",
									blendDstAlpha: "one"
								}]
							},
							properties: {
								mainTexture: {
									value: "grey"
								},
								tilingOffset: {
									value: [1, 1, 0, 0]
								},
								mainColor: {
									value: [1, 1, 1, 1],
									editor: {
										type: "color"
									}
								},
								colorScale: {
									value: [1, 1, 1],
									target: "colorScaleAndCutoff.xyz"
								},
								alphaThreshold: {
									value: .5,
									target: "colorScaleAndCutoff.w",
									editor: {
										parent: "USE_ALPHA_TEST"
									}
								},
								color: {
									target: "mainColor",
									editor: {
										visible: !1
									}
								}
							},
							migrations: {
								properties: {
									mainColor: {
										formerlySerializedAs: "color"
									}
								}
							}
						}]
					}, {
						name: "alpha-blend",
						passes: [{
							vert: "unlit-vs:vert",
							frag: "unlit-fs:frag",
							rasterizerState: {
								cullMode: "none"
							},
							depthStencilState: {
								depthTest: !0,
								depthWrite: !1
							},
							blendState: {
								targets: [{
									blend: !0,
									blendSrc: "src_alpha",
									blendDst: "one_minus_src_alpha",
									blendSrcAlpha: "src_alpha",
									blendDstAlpha: "one_minus_src_alpha"
								}]
							},
							properties: {
								mainTexture: {
									value: "grey"
								},
								tilingOffset: {
									value: [1, 1, 0, 0]
								},
								mainColor: {
									value: [1, 1, 1, 1],
									editor: {
										type: "color"
									}
								},
								colorScale: {
									value: [1, 1, 1],
									target: "colorScaleAndCutoff.xyz"
								},
								alphaThreshold: {
									value: .5,
									target: "colorScaleAndCutoff.w",
									editor: {
										parent: "USE_ALPHA_TEST"
									}
								},
								color: {
									target: "mainColor",
									editor: {
										visible: !1
									}
								}
							},
							migrations: {
								properties: {
									mainColor: {
										formerlySerializedAs: "color"
									}
								}
							}
						}]
					}]
				},
				r = "\nCCEffect %{\n@@EFFECT_SEGMENT@@\n}%\n        ",
				s = "\n CCProgram unlit-vs %{\n   precision highp float;\n   #include <input>\n   #include <cc-global>\n   #include <cc-local-batch>\n   #include <input>\n   #include <cc-fog-vs>\n \n   #if USE_VERTEX_COLOR\n     in lowp vec4 a_color;\n     out lowp vec4 v_color;\n   #endif\n \n   #if USE_TEXTURE\n     out vec2 v_uv;\n     uniform TexCoords {\n       vec4 tilingOffset;\n     };\n   #endif\n \n   vec4 vert () {\n     vec4 position;\n     CCVertInput(position);\n \n     mat4 matWorld;\n     CCGetWorldMatrix(matWorld);\n \n     #if USE_TEXTURE\n       v_uv = a_texCoord * tilingOffset.xy + tilingOffset.zw;\n       #if SAMPLE_FROM_RT\n         CC_HANDLE_RT_SAMPLE_FLIP(v_uv);\n       #endif\n     #endif\n \n     #if USE_VERTEX_COLOR\n       v_color = a_color;\n     #endif\n \n     CC_TRANSFER_FOG(matWorld * position);\n     return cc_matProj * (cc_matView * matWorld) * position;\n   }\n }%\n";
			for (var c in o) {
				var l = o[c];
				"cc.Color" == l.type ? (l.value = cc.color(l.value), a.techniques[0].passes[0].properties[c] = {
					value: [(l.value.r / 255).toFixed(3), (l.value.g / 255).toFixed(3), (l.value.b / 255).toFixed(3), (l.value.a / 255).toFixed(3)],
					editor: {
						type: "color"
					}
				}) : "float" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: l.value
				} : "bool" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: l.value,
					editor: {
						type: "boolean"
					}
				} : "vec2" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: [l.value[0], l.value[1]]
				} : "vec3" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: [l.value[0], l.value[1], l.value[2]]
				} : "vec4" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: [l.value[0], l.value[1], l.value[2], l.value[3]]
				} : "sampler2D" == l.type && (a.techniques[0].passes[0].properties[c] = {
					value: "white"
				})
			}
			var h = "\n  uniform Constant {\n    vec4 mainColor;\n    vec4 colorScaleAndCutoff;\n";
			for (var u in o) "vec4" != (d = o[u]).type && "cc.Color" != d.type || (h += "\t\tvec4 " + u + ";\n");
			for (var p in o) {
				var d;
				"vec3" == (d = o[p]).type && (h += "\t\tvec3 " + p + ";\n")
			}
			for (var f in o) "vec2" == o[f].type && (h += "\t\tvec2 " + f + ";\n");
			for (var m in o) "float" == o[m].type && (h += "\t\tfloat " + m + ";\n");
			for (var g in o) "bool" == o[g].type && (h += "\t\tbool " + g + ";\n");
			for (var C in h += "\t};\n\n", o) "sampler2D" == o[C].type && (h += "\tuniform sampler2D " + C + ";\n");
			var _ = "\n CCProgram unlit-fs %{\n  precision highp float;\n  #include <output>\n  #include <cc-fog-fs>\n\n  #if USE_ALPHA_TEST\n    #pragma define ALPHA_TEST_CHANNEL options([a, r, g, b])\n  #endif\n\n  #if USE_TEXTURE\n    in vec2 v_uv;\n    uniform sampler2D mainTexture;\n  #endif\n\n  #if USE_VERTEX_COLOR\n    in lowp vec4 v_color;\n  #endif\n" + h + t._fragCodes.replace(/[\r\n]+/gm, "\n\t").replace(/\btexture\b/g, "mainTexture").replace(/\btexture2D\b/g, "texture").replace(/\bv_uv0\b/g, "v_uv") + t._fragCallCodes3D.replace(/[\r\n]+/gm, "\n\t") + "\n  vec4 frag () {\n     vec4 o = shaderfx();\n     o.rgb *= colorScaleAndCutoff.xyz;\n \n     #if USE_VERTEX_COLOR\n       o *= v_color;\n     #endif\n \n    #if USE_ALPHA_TEST\n       if (o.ALPHA_TEST_CHANNEL < colorScaleAndCutoff.w) discard;\n     #endif\n \n     CC_APPLY_FOG(o);\n     return CCFragOutput(o);\n   }\n }%\n";
			if (r = r.replace("@@EFFECT_SEGMENT@@", json2yaml(a).replace(/\"/g, "").replace(/\\x3A/g, ":")), "undefined" != typeof Editor) {
				var v = "db://assets/" + this.ProjectManager.getName() + "_3D_Unlit.effect";
				if (Editor.assetdb) cc.error("\u8bf7\u5728 Creator v3.x \u4e2d\u5bfc\u51fa 3D \u7528\u7279\u6548");
				else {
					var E = this.ProjectManager.getName();
					var needMaterial = true;
					Editor.Message.request("asset-db", "create-asset", v, r + s + _, {
						overwrite: !0
					}).then(function() {
						Editor.Message.request("asset-db", "query-uuid", v).then(function(t) {
							1 == needMaterial || null == needMaterial ? e.exportMTL3DUnlit(t, E) : cb && cb()
						}).catch(function(e) {
							console.log(err);
						})
					}, function(err) {
						console.log(err);
					})
				}
			} else window.download(r + s + _, this.ProjectManager.getName() + "_3D_Unlit.effect", "application/json"), this.exportMTL3DUnlit(null, this.ProjectManager.getName()), this.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa .effect \u6210\u529f: " : "Export .effect Succeeded | Name: ") + this.ProjectManager.getName())
		}, n.exportFX3DSprite = function() {
			var e = this,
				t = this.PanelManager.getOutputPanel().getComponent("ShaderFXPrefabPanel"),
				n = this.DigraphManager.traverseDFWithPanel(t),
				o = i.ExportUtil.getUniforms(n),
				a = {
					techniques: [{
						passes: [{
							vert: "sprite-vs:vert",
							frag: "sprite-fs:frag",
							depthStencilState: {
								depthTest: !1,
								depthWrite: !1
							},
							blendState: {
								targets: [{
									blend: !0,
									blendSrc: "src_alpha",
									blendDst: "one_minus_src_alpha",
									blendDstAlpha: "one_minus_src_alpha"
								}]
							},
							rasterizerState: {
								cullMode: "none"
							},
							properties: {
								alphaThreshold: {
									value: .5
								}
							}
						}]
					}]
				},
				r = "\nCCEffect %{\n@@EFFECT_SEGMENT@@\n}%\n        ",
				s = "\nCCProgram sprite-vs %{\n  precision highp float;\n  #include <cc-global>\n  #if USE_LOCAL\n    #include <cc-local>\n  #endif\n  #if SAMPLE_FROM_RT\n    #include <common>\n  #endif\n  in vec3 a_position;\n  in vec2 a_texCoord;\n  in vec4 a_color;\n  out vec4 color;\n  out vec2 uv0;\n  vec4 vert () {\n    vec4 pos = vec4(a_position, 1);\n    #if USE_LOCAL\n      pos = cc_matWorld * pos;\n    #endif\n    #if USE_PIXEL_ALIGNMENT\n      pos = cc_matView * pos;\n      pos.xyz = floor(pos.xyz);\n      pos = cc_matProj * pos;\n    #else\n      pos = cc_matViewProj * pos;\n    #endif\n    uv0 = a_texCoord;\n    #if SAMPLE_FROM_RT\n      CC_HANDLE_RT_SAMPLE_FLIP(uv0);\n    #endif\n    color = a_color;\n    return pos;\n  }\n}%\n";
			for (var c in o) {
				var l = o[c];
				"cc.Color" == l.type ? (l.value = cc.color(l.value), a.techniques[0].passes[0].properties[c] = {
					value: [(l.value.r / 255).toFixed(3), (l.value.g / 255).toFixed(3), (l.value.b / 255).toFixed(3), (l.value.a / 255).toFixed(3)],
					editor: {
						type: "color"
					}
				}) : "float" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: l.value
				} : "bool" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: l.value,
					editor: {
						type: "boolean"
					}
				} : "vec2" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: [l.value[0], l.value[1]]
				} : "vec3" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: [l.value[0], l.value[1], l.value[2]]
				} : "vec4" == l.type ? a.techniques[0].passes[0].properties[c] = {
					value: [l.value[0], l.value[1], l.value[2], l.value[3]]
				} : "sampler2D" == l.type && (a.techniques[0].passes[0].properties[c] = {
					value: "white"
				})
			}
			var h = "\n  uniform Constant {\n";
			for (var u in o) "vec4" != (_ = o[u]).type && "cc.Color" != _.type || (h += "\t\tvec4 " + u + ";\n");
			for (var p in o) "vec3" == (_ = o[p]).type && (h += "\t\tvec3 " + p + ";\n");
			for (var d in o) "vec2" == o[d].type && (h += "\t\tvec2 " + d + ";\n");
			for (var f in o) "float" == o[f].type && (h += "\t\tfloat " + f + ";\n");
			for (var m in o) "bool" == o[m].type && (h += "\t\tbool " + m + ";\n");
			for (var g in h += "\t};\n\n", o) "sampler2D" == o[g].type && (h += "\tuniform sampler2D " + g + ";\n");
			for (var C = 0; C < o.length; C++) {
				var _;
				"sampler2D" == (_ = o[C]).type && (h += "\tuniform sampler2D u" + _.name + ";\n")
			}
			var v = "\nCCProgram sprite-fs %{\n  precision highp float;\n  #include <embedded-alpha>\n  #include <alpha-test>\n  #include <cc-global>\n  in vec4 color;\n  #if USE_TEXTURE\n    in vec2 uv0;\n    #pragma builtin(local)\n    layout(set = 2, binding = 10) uniform sampler2D cc_spriteTexture;\n  #endif\n" + h + t._fragCodes.replace(/[\r\n]+/gm, "\n\t").replace(/\btexture\b/g, "cc_spriteTexture").replace(/\btexture2D\b/g, "texture").replace(/\bv_uv0\b/g, "uv0").replace(/\bv_uv\b/g, "uv0") + t._fragCallCodes3D.replace(/\bmainTexture\b/g, "cc_spriteTexture").replace(/\bv_uv\b/g, "uv0").replace(/[\r\n]+/gm, "\n\t") + "\n  vec4 frag () {\n     vec4 o = shaderfx();\n       o *= color;\n     ALPHA_TEST(o);\n     return o;\n   }\n }%\n";
			if (r = r.replace("@@EFFECT_SEGMENT@@", json2yaml(a).replace(/\"/g, "").replace(/\\x3A/g, ":")), "undefined" != typeof Editor) {
				var E = "db://assets/" + this.ProjectManager.getName() + "_3D_Sprite.effect";
				if (Editor.assetdb) cc.error("\u8bf7\u5728 Creator v3.x \u4e2d\u5bfc\u51fa 3D \u7528\u7279\u6548");
				else {
					var S = this.ProjectManager.getName();
					var needMaterial = true;
					Editor.Message.request("asset-db", "create-asset", E, r + s + v, {
						overwrite: !0
					}).then(function() {
						Editor.Message.request("asset-db", "query-uuid", E).then(function(t) {
							1 == needMaterial || null == needMaterial ? e.exportMTL3DSprite(t, S) : cb && cb()
						}).catch(function() {})
					}, function() {})
				}
			} else window.download(r + s + v, this.ProjectManager.getName() + "_3D_Sprite.effect", "application/json"), this.exportMTL3DSprite(null, this.ProjectManager.getName()), this.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa .effect \u6210\u529f: " : "Export .effect Succeeded | Name: ") + this.ProjectManager.getName())
		}, n.exportFX = function() {
			var e = this.PanelManager.getOutputPanel().getComponent("ShaderFXPrefabPanel"),
				t = this.DigraphManager.traverseDFWithPanel(e),
				n = i.ExportUtil.getUniforms(t);
			cc.log(n);
			var o = {
					techniques: [{
						passes: [{
							vert: "vs",
							frag: "fs",
							blendState: {
								targets: [{
									blend: !0
								}]
							},
							rasterizerState: {
								cullMode: "none"
							},
							properties: {
								texture: {
									value: "white"
								}
							}
						}]
					}]
				},
				a = "\nCCEffect %{\n@@EFFECT_SEGMENT@@\n}%\n        ",
				r = "\nCCProgram vs %{\n    precision highp float;\n    #include <cc-global>\n    #include <cc-local>\n\n    in vec3 a_position;\n    #if USE_TEXTURE\n        in vec2 a_uv0;\n        out vec2 v_uv0;\n    #endif  \n    in vec4 a_color;\n    out vec4 v_color;\n\n    void main () {\n        mat4 mvp;\n        #if CC_USE_MODEL\n            mvp = cc_matViewProj * cc_matWorld;\n        #else\n            mvp = cc_matViewProj;\n        #endif\n\n        #if USE_TEXTURE\n            v_uv0 = a_uv0;\n        #endif\n\n        #if USE_TINT\n            // clear warning for spine\n        #endif\n\n        v_color = a_color;\n        gl_Position = mvp * vec4(a_position, 1);\n    }\n}%\n        ",
				s = "\nCCProgram fs %{\n    precision highp float;\n    #include <cc-global>\n    #if USE_TEXTURE\n        in vec2 v_uv0;\n        uniform sampler2D texture;\n    #endif\n    in vec4 v_color;\n    @@UNIFORM_CONSTANT_SEGMENT@@\n    @@CODE_SEGMENT@@\n}%\n        ";
			for (var c in n) {
				var l = n[c];
				"cc.Color" == l.type ? (l.value = cc.color(l.value), o.techniques[0].passes[0].properties[c] = {
					value: [(l.value.r / 255).toFixed(3), (l.value.g / 255).toFixed(3), (l.value.b / 255).toFixed(3), (l.value.a / 255).toFixed(3)],
					inspector: {
						type: "color"
					}
				}) : "float" == l.type ? o.techniques[0].passes[0].properties[c] = {
					value: l.value
				} : "bool" == l.type ? o.techniques[0].passes[0].properties[c] = {
					value: l.value,
					editor: {
						type: "boolean"
					}
				} : "vec2" == l.type ? o.techniques[0].passes[0].properties[c] = {
					value: [l.value[0], l.value[1]]
				} : "vec3" == l.type ? o.techniques[0].passes[0].properties[c] = {
					value: [l.value[0], l.value[1], l.value[2]]
				} : "vec4" == l.type ? o.techniques[0].passes[0].properties[c] = {
					value: [l.value[0], l.value[1], l.value[2], l.value[3]]
				} : "sampler2D" == l.type && (o.techniques[0].passes[0].properties[c] = {
					value: "white"
				})
			}
			var h = "uniform Constant {\n";
			for (var u in n) "vec4" != (d = n[u]).type && "cc.Color" != d.type || (h += "\t\tvec4 " + u + ";\n");
			for (var p in n) {
				var d;
				"vec3" == (d = n[p]).type && (h += "\t\tvec3 " + p + ";\n")
			}
			for (var f in n) "vec2" == n[f].type && (h += "\t\tvec2 " + f + ";\n");
			for (var m in n) "float" == n[m].type && (h += "\t\tfloat " + m + ";\n");
			for (var g in n) "bool" == n[g].type && (h += "\t\tbool " + g + ";\n");
			for (var C in h += "\t};\n", n) "sampler2D" == n[C].type && (h += "\tuniform sampler2D " + C + ";\n");
			if (cc.log(e._fragCodes.replace(/[\r\n]+/gm, "\n\t")), s = (s = s.replace("@@UNIFORM_CONSTANT_SEGMENT@@", h)).replace("@@CODE_SEGMENT@@", e._fragCodes.replace(/[\r\n]+/gm, "\n\t") + e._fragCallCodes.replace(/[\r\n]+/gm, "\n\t")), cc.log(s), a = a.replace("@@EFFECT_SEGMENT@@", json2yaml(o).replace(/\"/g, "")), "undefined" != typeof Editor) {
				var _ = this,
					v = "db://assets/" + this.ProjectManager.getName() + ".effect";
				Editor.assetdb.createOrSave(v, a + r + s, function() {
					Editor.assetdb.queryUuidByUrl(v, function(e, t) {
						e || _.exportMTL(t)
					})
				})
			} else window.download(a + r + s, this.ProjectManager.getName() + ".effect", "application/json"), this.exportMTL();
			this.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa .effect \u6210\u529f: " : "Export .effect Succeeded | Name: ") + this.ProjectManager.getName())
		}, n.exportMTL = function(e) {
			var t = this.PanelManager.getOutputPanel().getComponent("ShaderFXPrefabPanel"),
				n = this.DigraphManager.traverseDFWithPanel(t),
				o = i.ExportUtil.getUniforms(n),
				a = {
					__type__: "cc.Material",
					_name: this.ProjectManager.getName(),
					_objFlags: 0,
					_native: "",
					_effectAsset: {
						__uuid__: e || r.uuidv4()
					},
					_techniqueIndex: 0,
					_techniqueData: {
						0: {
							props: {},
							defines: {
								USE_TEXTURE: !0
							}
						}
					}
				};
			for (var s in o) {
				var c = o[s];
				"cc.Color" == c.type ? (c.value = cc.color(c.value), a._techniqueData[0].props[s] = {
					__type__: "cc.Color",
					r: c.value.r,
					g: c.value.g,
					b: c.value.b,
					a: c.value.a
				}) : "float" == c.type ? a._techniqueData[0].props[s] = c.value : "vec2" == c.type ? a._techniqueData[0].props[s] = {
					__type__: "cc.Vec2",
					x: c.value[0],
					y: c.value[1]
				} : "vec3" == c.type ? a._techniqueData[0].props[s] = {
					__type__: "cc.Vec3",
					x: c.value[0],
					y: c.value[1],
					z: c.value[2]
				} : "vec4" == c.type ? a._techniqueData[0].props[s] = {
					__type__: "cc.Vec4",
					x: c.value[0],
					y: c.value[1],
					z: c.value[2],
					w: c.value[3]
				} : "sampler2D" == c.type && (a._techniqueData[0].props[s] = "")
			}
			"undefined" != typeof Editor ? Editor.assetdb.create("db://assets/" + this.ProjectManager.getName() + ".mtl", JSON.stringify(a, null, 4)) : window.download(JSON.stringify(a, null, 4), this.ProjectManager.getName() + ".mtl", "application/json")
		}, n.exportMTL3DUnlit = function(e, t) {
			var n = {
				__type__: "cc.Material",
				_name: t,
				_objFlags: 0,
				_native: "",
				_effectAsset: {
					__uuid__: e || r.uuidv4()
				},
				_techIdx: 0,
				_defines: [{
					USE_TEXTURE: !0,
					USE_ALPHA_TEST: !0
				}],
				_props: []
			};
			"undefined" != typeof Editor ? Editor.assetdb || Editor.Message.request("asset-db", "create-asset", "db://assets/" + t + "_3D_Unlit.mtl", JSON.stringify(n, null, 4), {
				overwrite: !0
			}).then(function() {}, function() {}) : window.download(JSON.stringify(n, null, 4), t + "_3D_Unlit.mtl", "application/json")
		}, n.exportMTL3DSprite = function(e, t) {
			var n = {
				__type__: "cc.Material",
				_name: t,
				_objFlags: 0,
				_native: "",
				_effectAsset: {
					__uuid__: e || r.uuidv4()
				},
				_techIdx: 0,
				_defines: [{
					USE_TEXTURE: !0,
					USE_ALPHA_TEST: !0
				}],
				_props: []
			};
			"undefined" != typeof Editor ? Editor.assetdb || Editor.Message.request("asset-db", "create-asset", "db://assets/" + t + "_3D_Sprite.mtl", JSON.stringify(n, null, 4), {
				overwrite: !0
			}).then(function() {}, function() {}) : window.download(JSON.stringify(n, null, 4), t + "_3D_Sprite.mtl", "application/json")
		}, n.renameProject = function() {
			var e = this;
			this.inputFieldLayer.getComponent(o.DigraphEditor.Layer.InputField).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u91cd\u547d\u540d | \u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0: " : "Rename Project | Please enter your project name ", {
				onConfirm: function(t) {
					e.ProjectManager.setName(t)
				}
			})
		}, n.doImport = function(e) {
			var t = cc.js.isString(e) ? JSON.parse(e) : e;
			this.ProjectManager.saveScene(cc.js.isString(e) ? e : JSON.stringify(e)), this.ProjectManager.import(t), this.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u5bfc\u5165\u6210\u529f | \u9879\u76ee\u540d: " : "Import Project Succeeded | Name: ") + t.name), this.resetAll(), this.doRestoreProjectScene(t)
		}, n.importProject = function() {
			var e = this;
			i.OpenFileToLocal(function(t) {
				e.messageBoxLayer.getComponent(o.DigraphEditor.Layer.MessageBox).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5f53\u524d\u672a\u4fdd\u5b58\u7684\u9879\u76ee\u4f1a\u88ab\u8986\u76d6\u6389\uff0c\u786e\u5b9a\u8981\u7ee7\u7eed\u5417 ?" : "Importing project will overwrite the current project, continue ?", {
					onConfirm: function() {
						e.messageLayer.getComponent(o.DigraphEditor.Layer.Message).show(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u5bfc\u5165\u4e2d\uff0c\u8bf7\u7a0d\u7b49\u7247\u523b ......" : "Project importing, please wait ......"), e.doImport(t)
					},
					onCancel: function() {
						cc.log("onCancel")
					}
				})
			})
		}, n.showCustomComponent = function() {
			this.customComponentListLayer.init(this.CustomComponentManager.getCustomComponents()), this.customComponentListLayer.node.active = !0
		}, n.showFXComponentLibrary = function() {
			this.fxComponentLibraryLayer.init(this.CustomComponentManager.getCustomComponents()), this.fxComponentLibraryLayer.node.active = !0
		}, n.newProject = function(e) {
			void 0 === e && (e = !0), this.resetAll(), this.ProjectManager.new(), this.PanelManager.createPanel(this.PanelManager.getConfiguration("Output")).x = 300, this.PanelManager.createPanel(this.PanelManager.getConfiguration("MainTexture")).x = -300, this.saveProject(), this.updateDigraph(), e && this.showToast((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u65b0\u5efa\u9879\u76ee\u6210\u529f | \u9879\u76ee\u540d: " : "New Project | Name: ") + this.ProjectManager.getName())
		}, n.undo = function() {
			this.CommandManager.undo()
		}, n.redo = function() {
			this.CommandManager.redo()
		}, n.resetAll = function() {
			this.PanelManager.reset(), this.ConnectionManager.reset(), this.projectInfoLayer.reset(), this.SlotManager.reset(), this.GroupManager.reset(), this.DigraphManager.reset()
		}, n)), o.DigraphEditor.Director = new o.DigraphEditor.Manager.Director, cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../../shader-fx/util/ShaderFXProjectUtil": "ShaderFXProjectUtil",
		"../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace",
		"./DigraphEditorCanvasManager": "DigraphEditorCanvasManager",
		"./DigraphEditorCommandManager": "DigraphEditorCommandManager",
		"./DigraphEditorConnectionManager": "DigraphEditorConnectionManager",
		"./DigraphEditorCustomComponentManager": "DigraphEditorCustomComponentManager",
		"./DigraphEditorDigraphManager": "DigraphEditorDigraphManager",
		"./DigraphEditorGroupManager": "DigraphEditorGroupManager",
		"./DigraphEditorPanelManager": "DigraphEditorPanelManager",
		"./DigraphEditorProjectManager": "DigraphEditorProjectManager",
		"./DigraphEditorSlotManager": "DigraphEditorSlotManager"
	}],
	DigraphEditorDnDUtil: [function(e, t) {
		"use strict";
		cc._RF.push(t, "91bd6OskcZIW4Y/siTf5WPc", "DigraphEditorDnDUtil");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Util.DND = function() {}, n.DigraphEditor.Util.DND.targets = [], n.DigraphEditor.Util.DND.Data = function() {
			this.target = null, this.dropZone = null, this.dropCallback = null, this.extensions = null, this.limit = null
		}, n.DigraphEditor.Util.DND.enable = function(e, t, o, i) {
			if (!cc.sys.isNative) {
				var a = document.getElementById("Cocos2dGameContainer");
				if (a) {
					a.addEventListener("dragover", n.DigraphEditor.Util.DND.handleDragOver, !1), a.addEventListener("drop", n.DigraphEditor.Util.DND.handleFileSelect, !1);
					var r = new n.DigraphEditor.Util.DND.Data;
					r.target = e, r.dropZone = a, r.dropCallback = t, r.extensions = o || [], r.limit = i || -1, n.DigraphEditor.Util.DND.targets.push(r)
				}
			}
		}, n.DigraphEditor.Util.DND.disable = function() {
			cc.sys.isNative || n.DigraphEditor.Util.DND.__dropZone && (dropZone.removeEventListener("dragover"), dropZone.removeEventListener("drop"), n.DigraphEditor.Util.DND.__dropZone = null)
		}, n.DigraphEditor.Util.DND.fileExtensionFilter = function(e, t) {
			if (t.length <= 0) return !0;
			for (var n = 0; n < t.length; n++)
				if (t[n] == e) return !0;
			return !1
		}, n.DigraphEditor.Util.DND.handleDragOver = function(e) {
			e.stopPropagation(), e.preventDefault(), e.dataTransfer.dropEffect = "copy"
		}, n.isFunction = function(e) {
			return "function" == typeof e
		}, n.DigraphEditor.Util.DND.getHTMLElementPosition = function(e) {
			var t, o = document.documentElement,
				i = window;
			return {
				left: (t = n.isFunction(e.getBoundingClientRect) ? e.getBoundingClientRect() : {
					left: 0,
					top: 0,
					width: parseInt(e.style.width),
					height: parseInt(e.style.height)
				}).left + i.pageXOffset - o.clientLeft,
				top: t.top + i.pageYOffset - o.clientTop,
				width: t.width,
				height: t.height
			}
		}, n.DigraphEditor.Util.DND.getPointByEvent = function(e, t) {
			return null != e.pageX ? {
				x: e.pageX,
				y: e.pageY
			} : (t.left -= document.body.scrollLeft, t.top -= document.body.scrollTop, {
				x: e.clientX,
				y: e.clientY
			})
		}, n.DigraphEditor.Util.DND.handleFileSelect = function(e) {
			e.stopPropagation(), e.preventDefault();
			for (var t = e.dataTransfer.files, o = 0; o < n.DigraphEditor.Util.DND.targets.length; o++) {
				var i = n.DigraphEditor.Util.DND.targets[o];
				n.DigraphEditor.Util.DND.handleTarget(i, t, e)
			}
		}, n.DigraphEditor.Util.DND.generateTexture2D = function(e, t) {
			var n = new Image;
			n.crossOrigin = null, n.addEventListener("load", function() {
				var e = self._texture2d = new cc.Texture2D;
				e.initWithElement(n), e.handleLoadedTexture(), t(e)
			}), n.src = e
		}, n.DigraphEditor.Util.DND.generateTexture2Ds = function(e, t) {
			for (var n = [], o = 0, i = 0; i < e.length; i++) {
				var a = e[i],
					r = new Image;
				r.crossOrigin = null, r.addEventListener("load", function() {
					o += 1;
					var i = self._texture2d = new cc.Texture2D;
					i.initWithElement(r), i.handleLoadedTexture(), n.push(i), o == e.length && t(n)
				}), r.src = a
			}
		}, n.DigraphEditor.Util.DND.handleTarget = function(e, t, o) {
			var i = n.DigraphEditor.Util.DND.getHTMLElementPosition(e.dropZone),
				a = n.DigraphEditor.Util.DND.getPointByEvent(o, i);
			if (i = cc.view.convertToLocationInView(a.x, a.y, i), cc.view._convertPointWithScale(i), e.target) {
				var r = e.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
				if (!cc.rect(r.x - e.target.width / 2, r.y - e.target.height / 2, e.target.width, e.target.height).contains(i)) return
			}
			var s = 0,
				c = [],
				l = t[0];
			if (l instanceof File && (-1 == e.limit || s < e.limit)) {
				var h = cc.path.extname(l.name);
				if (n.DigraphEditor.Util.DND.fileExtensionFilter(h, e.extensions)) {
					s += 1;
					var u = new FileReader;
					".png" == h || ".jpg" == h || ".jpeg" == h || ".PNG" == h || ".JPG" == h || ".JPEG" == h ? u.readAsDataURL(l) : u.readAsText(l), u.onload = function(t) {
						".png" == h || ".jpg" == h || ".jpeg" == h || ".PNG" == h || ".JPG" == h || ".JPEG" == h ? n.DigraphEditor.Util.DND.generateTexture2D(t.target.result, function(n) {
							c.push({
								name: l.name,
								ext: h,
								content: t.target.result,
								texture: n
							}), e.dropCallback(c)
						}) : (c.push({
							name: l.name,
							ext: h,
							content: t.target.result
						}), e.dropCallback(c))
					}
				}
			}
		}, cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorGroupManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "fb8d9Tus+xOyZYSjW3G2i36", "DigraphEditorGroupManager");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Manager.Group = cc.Class({
			ctor: function() {
				this._groups = [], this._groupID = 0
			},
			init: function(e, t) {
				this.layerCanvas = e, this.groupLayer = t
			},
			reset: function() {
				this.groupLayer.getComponent(n.DigraphEditor.Layer.Group).reset(), this._groups = [], this._groupID = 0
			},
			addGroup: function(e, t) {
				null == t ? this._groupID += 1 : this._groupID = t;
				var o = this.groupLayer.getComponent(n.DigraphEditor.Layer.Group).addGroup(e);
				o.getComponent(n.DigraphEditor.Prefab.Group).setGroupID(this._groupID);
				for (var i = e.length - 1; i >= 0; i--) e[i].getComponent(n.DigraphEditor.Prefab.Panel).setGroupID(this._groupID), e[i].getComponent(n.DigraphEditor.Prefab.Panel).setGroup(o);
				return this._groups.push(o), o
			},
			ungroup: function(e) {
				for (var t = e.getComponent(n.DigraphEditor.Prefab.Group).getPanels(), o = t.length - 1; o >= 0; o--) this.removePanel(t[o], !1);
				for (o = this._groups.length - 1; o >= 0; o--)
					if (this._groups[o] && this._groups[o].getComponent(n.DigraphEditor.Prefab.Group).getGroupID() == e.getComponent(n.DigraphEditor.Prefab.Group).getGroupID()) {
						this._groups[o].removeFromParent(!0), this._groups[o] = null;
						break
					}
			},
			getGroups: function() {
				return this._groups
			},
			getGroup: function(e) {
				for (var t = this._groups.length - 1; t >= 0; t--)
					if (this._groups[t]) {
						var o = this._groups[t].getComponent(n.DigraphEditor.Prefab.Group);
						if (o.getGroupID() == e) return o.node
					}
				return null
			},
			getPanelsInGroupByID: function(e) {
				for (var t = this._groups.length - 1; t >= 0; t--)
					if (this._groups[t]) {
						var o = this._groups[t].getComponent(n.DigraphEditor.Prefab.Group);
						if (o.getGroupID() == e) return o.getPanels()
					}
				return []
			},
			moveBy: function(e, t) {
				e.x += t.x, e.y += t.y
			},
			runDropAnimation: function(e) {
				for (var t = this._groups.length - 1; t >= 0; t--)
					if (this._groups[t]) {
						var o = this._groups[t].getBoundingBoxToWorld(),
							i = e.getBoundingBoxToWorld();
						o.containsRect(i) ? this._groups[t].getComponent(n.DigraphEditor.Prefab.Group).runDropAnimation() : this._groups[t].getComponent(n.DigraphEditor.Prefab.Group).stopDropAnimation()
					}
			},
			updateGroup: function(e) {
				var t = e.getComponent(n.DigraphEditor.Prefab.Panel).getGroup();
				t && t.getComponent(n.DigraphEditor.Prefab.Group).updateGroup()
			},
			panelMoveFinish: function(e) {
				if (!e.getComponent(n.DigraphEditor.Prefab.Panel).getGroup())
					for (var t = this._groups.length - 1; t >= 0; t--)
						if (this._groups[t]) {
							var o = this._groups[t].getBoundingBoxToWorld(),
								i = e.getBoundingBoxToWorld();
							if (o.containsRect(i)) {
								e.getComponent(n.DigraphEditor.Prefab.Panel).setGroupID(this._groups[t].getComponent(n.DigraphEditor.Prefab.Group)), e.getComponent(n.DigraphEditor.Prefab.Panel).setGroup(this._groups[t]), this._groups[t].getComponent(n.DigraphEditor.Prefab.Group).addPanel(e), this._groups[t].getComponent(n.DigraphEditor.Prefab.Group).stopDropAnimation();
								break
							}
						}
			},
			removePanel: function(e, t) {
				void 0 === t && (t = !0);
				var o = e.getComponent(n.DigraphEditor.Prefab.Panel).getGroup();
				if (o) {
					var i = o.getComponent(n.DigraphEditor.Prefab.Group);
					i.removePanel(e), this.layerCanvas.node.addChild(e), e.getComponent(n.DigraphEditor.Prefab.Panel).setGroup(null), t && i.getPanels().length <= 1 && this.ungroup(o)
				}
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorHotkey: [function(e, t) {
		"use strict";
		cc._RF.push(t, "83a11e2rL5HWY2yijKP2E9q", "DigraphEditorHotkey"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Component.Hotkey = cc.Class({
			extends: cc.Component,
			properties: {},
			onLoad: function() {
				this.allKeys = {}, cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
			},
			onDestroy: function() {
				cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
			},
			onKeyDown: function(e) {
				if (this.allKeys[e.keyCode] = !0, this.allKeys[91])
					if (e.keyCode == cc.macro.KEY.c) {
						var t = new cc.Event.EventCustom("ssr.DigraphEditor.Component.Hotkey.Copy", !0);
						cc.systemEvent.dispatchEvent(t)
					} else if (e.keyCode == cc.macro.KEY.v) {
					var n = new cc.Event.EventCustom("ssr.DigraphEditor.Component.Hotkey.Paste", !0);
					cc.systemEvent.dispatchEvent(n)
				} else if (e.keyCode == cc.macro.KEY.z) {
					var o = new cc.Event.EventCustom("ssr.DigraphEditor.Component.Hotkey.Undo", !0);
					cc.systemEvent.dispatchEvent(o)
				} else if (e.keyCode == cc.macro.KEY.y) {
					var i = new cc.Event.EventCustom("ssr.DigraphEditor.Component.Hotkey.Redo", !0);
					cc.systemEvent.dispatchEvent(i)
				}
			},
			onKeyUp: function(e) {
				this.allKeys[e.keyCode] = !1
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerAccount: [function(e, t) {
		"use strict";
		cc._RF.push(t, "4cadbj+1GdANKdW60s2i+sd", "DigraphEditorLayerAccount");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = e("../../shader-fx/util/ShaderFXLeanCloudUtil");
		n.DigraphEditor.Layer.Account = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				loginPanel: cc.Node,
				registerPanel: cc.Node,
				loginUsername: cc.EditBox,
				loginPassword: cc.EditBox,
				registerUsername: cc.EditBox,
				registerPassword: cc.EditBox,
				registerEMail: cc.EditBox
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), o.init(), cc.sys.localStorage.getItem("ssrfx_username") && (this.loginUsername.string = cc.sys.localStorage.getItem("ssrfx_username")), cc.sys.localStorage.getItem("ssrfx_password") && (this.loginPassword.string = cc.sys.localStorage.getItem("ssrfx_password"))
			},
			init: function() {},
			onCreateAccount: function() {
				this.loginPanel.active = !1, this.registerPanel.active = !0
			},
			onBackLogin: function() {
				this.loginPanel.active = !0, this.registerPanel.active = !1
			},
			onRescue: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Account.Rescue", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onRegister: function() {},
			onOffline: function() {
				this.node.active = !1;
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Account.Offline", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onForgetPassword: function() {
				this.loginPanel.active = !1, this.registerPanel.active = !0
			},
			onResetPassword: function() {
				0 != this.registerEMail.string.length && o.resetPassword(this.registerEMail.string, function() {
					var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Account.ResetPasswordSuccess", !0);
					cc.systemEvent.dispatchEvent(e)
				}, function(e) {
					var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Account.ResetPasswordFail", !0);
					t.setUserData(e), cc.systemEvent.dispatchEvent(t)
				})
			},
			onLogin: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Account.LoginStart", !0);
				cc.systemEvent.dispatchEvent(e);
				var t = this;
				o.signIn(this.loginUsername.string, this.loginPassword.string, function() {
					var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Account.LoginSuccess", !0);
					e.setUserData(o.getCurrentUser()), cc.systemEvent.dispatchEvent(e), t.node.active = !1
				}, function(e) {
					var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Account.LoginFail", !0);
					t.setUserData(e), cc.systemEvent.dispatchEvent(t)
				})
			},
			_touchStartCallback: function() {},
			_touchMoveCallback: function() {},
			_touchEndCallback: function() {},
			_touchCancelCallback: function() {}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerCanvas: [function(e, t) {
		"use strict";
		cc._RF.push(t, "34c9fhxiT9Ogr5rDcSld4QQ", "DigraphEditorLayerCanvas"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Layer.Canvas = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {},
			onLoad: function() {
				this._canMove = !1
			},
			drawDottedGrid: function(e, t, n) {
				for (var o = 0, i = t / n; o <= i; o++)
					for (var a = 0, r = e; a < r; a += n) this._render.circle(a - e / 2, o * n - t / 2, 1), this._render.fill()
			},
			drawDottedTileGrid: function(e, t, n, o) {
				for (var i = 0, a = t / n; i <= a; i++)
					for (var r = 0, s = e; r < s && (this._render.circle(r - e / 2, i * n - t / 2, .8), this._render.fill(), !((r += 2 * o) >= e)););
				for (i = 0, s = e / n; i <= s; i++)
					for (r = 0, a = t; r < a && (this._render.circle(i * n - e / 2, r - t / 2, .8), this._render.fill(), !((r += 2 * o) >= t)););
			},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), this.node.on(cc.Node.EventType.MOUSE_UP, this._mouseUpCallback, this), this._renderNode = new cc.Node, this.node.addChild(this._renderNode, 0), this._render = this._renderNode.addComponent(cc.Graphics), this._render.fillColor = cc.color(255, 255, 255, 20), this._render.lineWidth = 1
			},
			zoom: function(e) {
				this.node.scale = e
			},
			canMove: function(e) {
				this._canMove = e
			},
			isCanMove: function() {
				return this._canMove
			},
			_mouseDownCallback: function() {},
			_mouseMoveCallback: function() {},
			_mouseEnterCallback: function() {},
			_mouseLeaveCallback: function() {},
			_mouseUpCallback: function(e) {
				if (e.getButton() == cc.Event.EventMouse.BUTTON_RIGHT) {
					var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Canvas.MouseUpRightClick", !0);
					t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t)
				}
			},
			_mouseWheelCallback: function() {},
			_touchStartCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Canvas.TouchStart", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchMoveCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Canvas.TouchMove", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), this.isCanMove() && (this.node.x += e.getDelta().x, this.node.y += e.getDelta().y, (this.node.x < (cc.winSize.width - this.node.width) / 2 || this.node.x > (-cc.winSize.width + this.node.width) / 2) && (this.node.x -= e.getDelta().x), (this.node.y < (cc.winSize.height - this.node.height) / 2 || this.node.y > (-cc.winSize.height + this.node.height) / 2) && (this.node.y -= e.getDelta().y), e.stopPropagation())
			},
			_touchEndCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Canvas.TouchEnd", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchCancelCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Canvas.TouchCancel", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			focus: function(e) {
				this.node.x = -e.x * this.node.scale, this.node.y = -e.y * this.node.scale
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerConnection: [function(e, t) {
		"use strict";
		cc._RF.push(t, "a547fjo10lCRJeq+vyhB8nX", "DigraphEditorLayerConnection");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Layer.Connection = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				connectionPrefab: cc.Prefab
			},
			onLoad: function() {
				this._selectionRect = cc.rect(0, 0, 0, 0)
			},
			start: function() {
				this._renderNode = new cc.Node, this.node.addChild(this._renderNode), this._render = this._renderNode.addComponent(cc.Graphics), this._render.lineWidth = 2 / this.node.parent.scale, this._render.strokeColor = cc.color(255, 0, 255, 255)
			},
			reset: function() {
				this._render.clear(), this.node.removeAllChildren(!0), this._renderNode = new cc.Node, this.node.addChild(this._renderNode), this._render = this._renderNode.addComponent(cc.Graphics), this._render.lineWidth = 2 / this.node.parent.scale, this._render.strokeColor = cc.color(255, 0, 255, 255)
			},
			setColor: function(e) {
				this._render.strokeColor = e
			},
			drawConnectionStart: function(e) {
				this._render.clear(), this._render.moveTo(e.x, e.y), this._preConnectionPosition = e
			},
			drawConnection: function(e) {
				this._render.clear();
				var t = n.DigraphEditor.Util.generateConnection(this._preConnectionPosition, e);
				this._render.moveTo(this._preConnectionPosition.x, this._preConnectionPosition.y);
				for (var o = 0; o < t.length; o++) this._render.lineTo(t[o].x, t[o].y);
				this._render.stroke()
			},
			drawConnectionEnd: function() {
				this._render.clear()
			},
			addConnection: function(e, t, o, i) {
				var a = cc.instantiate(this.connectionPrefab);
				this.node.addChild(a);
				var r = a.getComponent(n.DigraphEditor.Prefab.Connection);
				return r.init(e, t, o, i), r.updateConnection(), r.animate(), a
			},
			restoreConnection: function(e) {
				this.node.addChild(e);
				var t = e.getComponent(n.DigraphEditor.Prefab.Connection);
				return t.updateConnection(), t.animate(), e
			},
			removeConnection: function(e, t) {
				void 0 === t && (t = !0), e.removeFromParent(t)
			},
			updateConnection: function() {
				this._render.clear()
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerCustomComponentList: [function(e, t) {
		"use strict";
		cc._RF.push(t, "62c03OQuZRFgYVklisLRLci", "DigraphEditorLayerCustomComponentList");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = (e("../../shader-fx/util/ShaderFXUtil"), e("../../shader-fx/util/ShaderFXLeanCloudUtil"));
		n.DigraphEditor.Layer.CustomComponentList = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				customComponentPrefab: cc.Prefab,
				myCustomComponentPrefab: cc.Prefab,
				onlineContent: cc.Node,
				myContent: cc.Node,
				tabOnline: cc.Node,
				tabMy: cc.Node,
				tabBuilder: cc.Node,
				tabOnlineContent: cc.Node,
				tabMyContent: cc.Node,
				tabBuilderContent: cc.Node
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Edit", this._onCustomComponentInfoEdit, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Delete", this._onMyCustomComponentInfoDelete, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Clone", this._onMyCustomComponentInfoClone, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.CustomComponentInfo.Save", this._onCustomComponentInfoSave, this)
			},
			init: function(e) {
				this._localComponents = e, this._cloudMy = [], this._cloud = [], this.refresh(), this._tab = -1, this.onTabMy()
			},
			_onCustomComponentInfoEdit: function(e) {
				this.onTabBuilder(!0), this.tabBuilderContent.getChildByName("CustomComponentBuilder").getComponent("DigraphEditorLayerCustomComponent").refresh(Object.assign({}, e.getUserData()))
			},
			_onCustomComponentInfoSave: function() {
				this.onTabMy()
			},
			_onMyCustomComponentInfoClone: function() {},
			_onMyCustomComponentInfoDelete: function(e) {
				for (var t = 0; t < this.myContent.getChildren().length; t++) {
					var n = this.myContent.getChildren()[t];
					if (n.getComponent("ShaderFXMyCustomComponentInfoPrefab").info.uuid == e.getUserData()) {
						n.removeFromParent(!0);
						break
					}
				}
				for (t = 0; t < this.myContent.getChildren().length; t++) this.myContent.getChildren()[t].getComponent("ShaderFXMyCustomComponentInfoPrefab").no.string = t + 1
			},
			onTabOnline: function() {
				if (0 != this._tab) {
					this._tab = 0, this.tabOnline.getComponent(cc.Button).normalColor = cc.color("#00A71B"), this.tabMy.getComponent(cc.Button).normalColor = cc.color("#3F3F3F"), this.tabBuilder.getComponent(cc.Button).normalColor = cc.color("#3F3F3F"), this.tabOnlineContent.active = !0, this.tabMyContent.active = !1, this.tabBuilderContent.active = !1, this.refresh();
					var e = this;
					if (o.isUserOnline()) {
						var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Message.show", !0);
						t.target = this.node, t.setUserData(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5217\u8868\u83b7\u53d6\u4e2d\uff0c\u8bf7\u7a0d\u540e ......" : "List loading, please wait ......"), cc.systemEvent.dispatchEvent(t), o.listCustomComponent(this.listCustomComponentCallback.bind(this), function() {
							e.listCustomComponentCallback(null)
						})
					}
				}
			},
			onTabMy: function() {
				if (1 != this._tab && (this._tab = 1, this.tabOnline.getComponent(cc.Button).normalColor = cc.color("#3F3F3F"), this.tabMy.getComponent(cc.Button).normalColor = cc.color("#00A71B"), this.tabBuilder.getComponent(cc.Button).normalColor = cc.color("#3F3F3F"), this.tabOnlineContent.active = !1, this.tabMyContent.active = !0, this.tabBuilderContent.active = !1, this.refresh(), o.isUserOnline())) {
					var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Message.show", !0);
					e.target = this.node, e.setUserData(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5217\u8868\u83b7\u53d6\u4e2d\uff0c\u8bf7\u7a0d\u540e ......" : "List loading, please wait ......"), cc.systemEvent.dispatchEvent(e);
					var t = this;
					this._cloudMy = [], o.listMyCustomComponent(this.listMyCustomComponentCallback.bind(this), function() {
						t.listMyCustomComponentCallback(null)
					})
				}
			},
			onTabBuilder: function() {
				2 != this._tab && (this._tab = 2, this.tabOnline.getComponent(cc.Button).normalColor = cc.color("#3F3F3F"), this.tabMy.getComponent(cc.Button).normalColor = cc.color("#3F3F3F"), this.tabBuilder.getComponent(cc.Button).normalColor = cc.color("#00A71B"), this.tabOnlineContent.active = !1, this.tabMyContent.active = !1, this.tabBuilderContent.active = !0)
			},
			listCustomComponentCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Message.dismiss", !0);
				if (t.target = this.node, cc.systemEvent.dispatchEvent(t), e) {
					e = e.results;
					for (var n = 0; n < e.length; n++)
						if (this.isInLocal(e[n].uuid)) {
							var o = this.getLocal(e[n].uuid);
							e[n].capture && o.getComponent("ShaderFXCustomComponentInfoPrefab").updateCapture(e[n].capture), o.getComponent("ShaderFXCustomComponentInfoPrefab").updateCloud(e[n])
						} else {
							var i = JSON.parse(e[n].component),
								a = cc.instantiate(this.customComponentPrefab);
							this.onlineContent.addChild(a, -999), a.getComponent("ShaderFXCustomComponentInfoPrefab").init(this.count + 1, i, this.isInLocal(e[n].uuid), e[n]), this.count++
						}
				}
			},
			listMyCustomComponentCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Message.dismiss", !0);
				if (t.target = this.node, cc.systemEvent.dispatchEvent(t), e) {
					e = e.results, this._cloudMy = e;
					for (var n = 0; n < this._cloudMy.length; n++) {
						var o = this.getLocalMy(this._cloudMy[n].uuid);
						if (o) o.getComponent("ShaderFXMyCustomComponentInfoPrefab").info.objectId = this._cloudMy[n].objectId, o.getComponent("ShaderFXMyCustomComponentInfoPrefab").markInCloud(this._cloudMy[n]);
						else {
							var i = JSON.parse(this._cloudMy[n].component),
								a = cc.instantiate(this.myCustomComponentPrefab);
							this.myContent.addChild(a, -999), a.getComponent("ShaderFXMyCustomComponentInfoPrefab").init(this.mycount + 1, i, !1, !0, this._cloudMy[n]), a.getComponent("ShaderFXMyCustomComponentInfoPrefab").info.objectId = this._cloudMy[n].objectId, this._myCustomComponentPrefabArray.push(a), this.mycount++
						}
					}
				}
			},
			getLocal: function(e) {
				for (var t = 0; t < this._customComponentPrefabArray.length; t++)
					if (this._customComponentPrefabArray[t].getComponent("ShaderFXCustomComponentInfoPrefab").info.uuid == e) return this._customComponentPrefabArray[t];
				return null
			},
			getLocalMy: function(e) {
				for (var t = 0; t < this._myCustomComponentPrefabArray.length; t++)
					if (this._myCustomComponentPrefabArray[t].getComponent("ShaderFXMyCustomComponentInfoPrefab").info.uuid == e) return this._myCustomComponentPrefabArray[t];
				return null
			},
			isInLocal: function(e) {
				for (var t = 0; t < this._localComponents.length; t++)
					for (var n = 0; n < this._localComponents[t].components.length; n++)
						if (this._localComponents[t].components[n].uuid === e) return !0;
				return !1
			},
			refresh: function() {
				this.onlineContent.removeAllChildren(!0), this.myContent.removeAllChildren(!0), this._myCustomComponentPrefabArray = [], this._customComponentPrefabArray = [], this.count = 0, this.mycount = 0;
				for (var e = 0; e < this._localComponents.length; e++)
					for (var t = 0; t < this._localComponents[e].components.length; t++)
						if (this._localComponents[e].components[t].fx) {
							var n = cc.instantiate(this.customComponentPrefab);
							this.onlineContent.addChild(n, -999), n.getComponent("ShaderFXCustomComponentInfoPrefab").init(this.count + 1, this._localComponents[e].components[t], !0, null), this._customComponentPrefabArray.push(n), this.count++
						} else {
							var o = cc.instantiate(this.myCustomComponentPrefab);
							this.myContent.addChild(o, -999), o.getComponent("ShaderFXMyCustomComponentInfoPrefab").init(this.mycount + 1, this._localComponents[e].components[t], !0, !1, null), this._myCustomComponentPrefabArray.push(o), this.mycount++
						}
			},
			refreshClone: function() {
				this.myContent.removeAllChildren(!0), this._myCustomComponentPrefabArray = [], this.count = 0, this.mycount = 0;
				for (var e = 0; e < this._localComponents.length; e++)
					for (var t = 0; t < this._localComponents[e].components.length; t++)
						if (this._localComponents[e].components[t].fx) {
							var n = cc.instantiate(this.customComponentPrefab);
							this.onlineContent.addChild(n, -999), n.getComponent("ShaderFXCustomComponentInfoPrefab").init(this.count + 1, this._localComponents[e].components[t], !0, null), this._customComponentPrefabArray.push(n), this.count++
						} else {
							var o = cc.instantiate(this.myCustomComponentPrefab);
							this.myContent.addChild(o, -999), o.getComponent("ShaderFXMyCustomComponentInfoPrefab").init(this.mycount + 1, this._localComponents[e].components[t], !0, !1, null), this._myCustomComponentPrefabArray.push(o), this.mycount++
						}
				for (e = 0; e < this._cloudMy.length; e++) {
					var i = this.isInLocal(this._cloudMy[e].uuid);
					if (i) i.getComponent("ShaderFXMyCustomComponentInfoPrefab").markInCloud(this._cloudMy[e]);
					else {
						var a = JSON.parse(this._cloudMy[e].component);
						o = cc.instantiate(this.myCustomComponentPrefab), this.myContent.addChild(o, -999), o.getComponent("ShaderFXMyCustomComponentInfoPrefab").init(this.mycount + 1, a, !1, !0, null), this._myCustomComponentPrefabArray.push(o), this.mycount++
					}
				}
			},
			onNew: function() {
				this.onTabBuilder(!0), this.tabBuilderContent.getChildByName("CustomComponentBuilder").getComponent("DigraphEditorLayerCustomComponent").init()
			},
			_touchStartCallback: function(e) {
				e.stopPropagation()
			},
			_touchMoveCallback: function(e) {
				e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				this.node.active = !1, e.stopPropagation()
			},
			_touchCancelCallback: function(e) {
				e.stopPropagation()
			}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerCustomComponentMissingResolve: [function(e, t) {
		"use strict";
		cc._RF.push(t, "ca064hrF6xI5YWxIalUgUv1", "DigraphEditorLayerCustomComponentMissingResolve");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = (e("../../shader-fx/util/ShaderFXUtil"), e("../../shader-fx/util/ShaderFXLeanCloudUtil"));
		n.DigraphEditor.Layer.CustomComponentMissingResolve = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				customComponentPrefab: cc.Prefab,
				content: cc.Node
			},
			onLoad: function() {},
			start: function() {},
			init: function(e) {
				this.refresh(e)
			},
			refresh: function(e, t) {
				this.content.removeAllChildren(!0), this._missingPanels = e, this._sceneJSON = t, this._customComponentPrefabs = [];
				for (var n = 0; n < e.length; n++) {
					var o = cc.instantiate(this.customComponentPrefab);
					this.content.addChild(o, -999), this._customComponentPrefabs.push(o), o.getComponent("ShaderFXMissingCustomComponentInfoPrefab").init(n + 1, e[n])
				}
			},
			onRepair: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.CustomComponentMissingResolve.RepairStart", !0);
				e.target = this.node, cc.systemEvent.dispatchEvent(e), this._repairIndex = 0, this._successRepairIndexArray = [], this.doRepair()
			},
			doRepair: function() {
				console.log("this._missingPanels[this._repairIndex].uuid: " + this._missingPanels[this._repairIndex].uuid);
				var e = this;
				this._repairIndex in this._successRepairIndexArray ? this._repairIndex >= this._missingPanels.length - 1 ? this.repairFinish(!0) : (this._repairIndex += 1, this.doRepair()) : o.fetchCustomComponent(this._missingPanels[this._repairIndex].uuid, function(t) {
					if (t.results.length > 0) {
						var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Download", !0);
						n.target = e.node, n.setUserData(t.results[0]), cc.systemEvent.dispatchEvent(n), e._successRepairIndexArray.push(e._repairIndex), e._customComponentPrefabs[e._repairIndex].getComponent("ShaderFXMissingCustomComponentInfoPrefab").no.node.color = cc.Color.GREEN, e._customComponentPrefabs[e._repairIndex].getComponent("ShaderFXMissingCustomComponentInfoPrefab").title.node.color = cc.Color.GREEN, e._customComponentPrefabs[e._repairIndex].getComponent("ShaderFXMissingCustomComponentInfoPrefab").des.node.color = cc.Color.GREEN, e._customComponentPrefabs[e._repairIndex].getComponent("ShaderFXMissingCustomComponentInfoPrefab").author.node.color = cc.Color.GREEN, e._customComponentPrefabs[e._repairIndex].getComponent("ShaderFXMissingCustomComponentInfoPrefab").date.node.color = cc.Color.GREEN, e._customComponentPrefabs[e._repairIndex].getComponent("ShaderFXMissingCustomComponentInfoPrefab").cid.node.color = cc.Color.GREEN, e._repairIndex >= e._missingPanels.length - 1 ? e.repairFinish() : (e._repairIndex += 1, e.scheduleOnce(e.doRepair, 1))
					} else e._repairIndex >= e._missingPanels.length - 1 ? e.repairFinish() : (e._repairIndex += 1, e.scheduleOnce(e.doRepair, 1))
				}, function(t) {
					console.log(t), e.repairFinish()
				})
			},
			repairFinish: function() {
				var e;
				this._successRepairIndexArray.length ? ((e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.CustomComponentMissingResolve.RepairEnd", !0)).target = this.node, e.setUserData(this._sceneJSON), cc.systemEvent.dispatchEvent(e), this.node.active = !1) : ((e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.CustomComponentMissingResolve.RepairEnd", !0)).target = this.node, e.setUserData(null), cc.systemEvent.dispatchEvent(e))
			},
			onBackup: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.CustomComponentMissingResolve.ExportProject", !0);
				e.target = this.node, e.setUserData(this._sceneJSON), cc.systemEvent.dispatchEvent(e);
				var t = this;
				this.scheduleOnce(function() {
					t.node.active = !1
				}, .1)
			},
			onNew: function() {}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerCustomComponent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "3a884iH1GxB6Iyo+OsH+BVX", "DigraphEditorLayerCustomComponent");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = e("../../shader-fx/util/ShaderFXUtil"),
			i = e("../../shader-fx/util/ShaderFXLeanCloudUtil");
		n.DigraphEditor.Layer.CustomComponent = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				nameEditBox: cc.EditBox,
				nameZhEditBox: cc.EditBox,
				descEditBox: cc.EditBox,
				descZhEditBox: cc.EditBox,
				fragEditBox: cc.EditBox,
				fragCode: cc.RichText,
				compileButton: cc.Button,
				fragPanel: cc.Node,
				fragCodeMain: cc.Button,
				fragCodeFuncs: cc.Button,
				fragCodeUniforms: cc.Button,
				fragCodeFrag: cc.Button,
				errorContent: cc.Node,
				errorScrollView: cc.ScrollView,
				ShaderFXPrefabFXPanel: cc.Node,
				logPrefab: cc.Prefab,
				captureNode: cc.Node,
				cateEditBox: cc.EditBox,
				cateZhEditBox: cc.EditBox,
				tagEditBox: cc.EditBox,
				customComponentInputContent: cc.Node,
				customComponentFloatPrefab: cc.Prefab,
				customComponentBoolPrefab: cc.Prefab,
				customComponentVec2Prefab: cc.Prefab,
				customComponentVec3Prefab: cc.Prefab,
				customComponentVec4Prefab: cc.Prefab,
				customComponentColorPrefab: cc.Prefab,
				customComponentTexturePrefab: cc.Prefab
			},
			onLoad: function() {
				console.log("this.fragEditBox._impl._eventListeners.onInput"), this.fragEditBox._impl._elem.removeEventListener("keydown", this.fragEditBox._impl._eventListeners.onKeydown);
				var e = this;
				this.fragEditBox._impl._elem.addEventListener("keydown", function(t) {
					if ("Tab" == t.key) {
						t.preventDefault();
						var n = this.selectionStart,
							o = this.selectionEnd;
						this.value = this.value.substring(0, n) + "    " + this.value.substring(o), this.selectionStart = this.selectionEnd = n + 4, e.fragEditBox._impl._delegate.editBoxTextChanged(this.value)
					}
				}), this.index = 0, this.errorLines = [], this.inputPrefabs = [];
				var t = cc.loader.getRes("ssr/shaderfx-editor/texture/cocos_sticker", cc.SpriteFrame);
				t ? this.onLoadSpriteFrameCallback(null, t, name) : cc.loader.loadRes("ssr/shaderfx-editor/texture/cocos_sticker", cc.SpriteFrame, this.onLoadSpriteFrameCallback.bind(this)), this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.Uniform.onValueChanged", this.uniformUpdated, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.Uniform.onCustomTextureValueChanged", this.onCustomTextureValueChanged, this)
			},
			onLoadSpriteFrameCallback: function(e, t) {
				this.mainTexture = t.clone(), this.textureCache = t.getTexture()
			},
			start: function() {
				this._inited || this.init()
			},
			refresh: function(e) {
				if (e) {
					for (var t in this._inited || this.init(), console.log("refresh"), console.log(e), this.fragCodeFragRaw = "", this.fragCodeFuncsRaw = "", this.fragCodeUniformsRaw = "", e.frags) this.fragCodeFuncsRaw += e.frags[t].join("\n"), this.fragCodeFuncsRaw += "\n";
					for (var t in this.fragCodeMainRaw = e.main.join("\n"), e.uniforms) this.fragCodeUniformsRaw += "uniform " + e.uniforms[t].type + " " + t + ";", this.fragCodeUniformsRaw += "\n";
					this._configuration = e, this.nameEditBox.string = this._configuration.name, this.nameZhEditBox.string = this._configuration.name_zh, this.descEditBox.string = this._configuration.description.en, this.descZhEditBox.string = this._configuration.description.zh, this.cateEditBox.string = this._configuration.category.en, this.cateZhEditBox.string = this._configuration.category.zh, this.tagEditBox.string = this._configuration.tags.join(), this.updateUniforms(this.fragCodeUniformsRaw), this.updateInputs(), this.updateMain(this.fragCodeMainRaw), this.onCompile()
				} else this.init()
			},
			init: function() {
				this._inited = !0, this.fragCodeFragRaw = "", this.fragCodeMainRaw = "\nvec4 main(float Red, float Green, float Blue, float Alpha) \n{\n    return vec4(Red, Green, Blue, Alpha);\n}\n    ", this.fragCodeFuncsRaw = "", this.fragCodeUniformsRaw = "", this._configuration = {
					name: "UserCustomNode",
					name_zh: "\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6",
					uuid: o.uuidv4(),
					author: i.getCurrentUsername(),
					date: (new Date).getTime(),
					custom: !0,
					official: !1,
					version: "1.0",
					category: {
						en: "user",
						zh: "\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6"
					},
					description: {
						en: "\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u82f1\u6587\u63cf\u8ff0",
						zh: "\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u4e2d\u6587\u63cf\u8ff0 "
					},
					tags: ["Custom", "User"],
					input: [],
					output: [],
					uniforms: {},
					frags: {},
					main: []
				}, this.nameEditBox.string = this._configuration.name, this.nameZhEditBox.string = this._configuration.name_zh, this.descEditBox.string = this._configuration.description.en, this.descZhEditBox.string = this._configuration.description.zh, this.updateUniforms(this.fragCodeUniformsRaw), this.updateMain(this.fragCodeMainRaw), this.onCompile()
			},
			uniformUpdated: function(e) {
				console.log("uniformUpdateduniformUpdateduniformUpdated");
				var t = e.getUserData();
				this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updatePanelUniform(this.ShaderFXPrefabFXPanel, t.getKey(), t.getValue())
			},
			onCustomTextureValueChanged: function(e) {
				var t = e.getUserData();
				this.textureCache = t
			},
			updateConfigurationName: function(e) {
				this._configuration.name = e
			},
			updateConfigurationUniforms: function(e) {
				this._configuration.uniforms = Object.assign({}, e)
			},
			updateConfigurationMain: function(e, t, n) {
				var o = !1;
				if (this._configuration.input.length != e.length) o = !0;
				else
					for (var i = 0; i < e.length; i++)
						if (e[i].type != this._configuration.input[i].type || e[i].name != this._configuration.input[i].name) {
							o = !0;
							break
						}
				this._configuration.input = e, this._configuration.output = t, this._configuration.main = n, o && this.updateInputs()
			},
			updateConfigurationMain2: function() {
				for (var e = 0; e < this._configuration.input.length; e++)
					if (console.log("input: "), this.inputPrefabs && this.inputPrefabs[e]) {
						var t = this.inputPrefabs[e];
						if ("float" == this._configuration.input[e].type)
							if (t.getComponent("ShaderFXPrefabCustomComponentFloat").propertyUI.isChecked) this._configuration.input[e].isTime = !0, delete this._configuration.input[e].default;
							else {
								delete this._configuration.input[e].isTime;
								var n = t.getComponent("ShaderFXPrefabCustomComponentFloat").getValue();
								this._configuration.input[e].default = n
							}
						else if ("bool" == this._configuration.input[e].type) {
							var o = t.getComponent("ShaderFXPrefabCustomComponentBool").getValue();
							this._configuration.input[e].default = o
						} else if ("vec2" == this._configuration.input[e].type)
							if (t.getComponent("ShaderFXPrefabCustomComponentVec2").propertyUI2.isChecked) this._configuration.input[e].isUVNDC = !0, delete this._configuration.input[e].default, delete this._configuration.input[e].isUV0;
							else if (t.getComponent("ShaderFXPrefabCustomComponentVec2").propertyUI.isChecked) this._configuration.input[e].isUV0 = !0, delete this._configuration.input[e].default, delete this._configuration.input[e].isUVNDC;
						else {
							delete this._configuration.input[e].isUV0, delete this._configuration.input[e].isUVNDC;
							var i = t.getComponent("ShaderFXPrefabCustomComponentVec2").getDefaultValue();
							this._configuration.input[e].default = i
						} else if ("vec3" == this._configuration.input[e].type) {
							var a = t.getComponent("ShaderFXPrefabCustomComponentVec3").getDefaultValue();
							this._configuration.input[e].default = a
						} else if ("vec4" == this._configuration.input[e].type)
							if (t.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI.isChecked) this._configuration.input[e].isMainTexture = !0, this._configuration.input[e].isColor = !0;
							else if (t.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI2.isChecked) {
							this._configuration.input[e].isColor = !0, delete this._configuration.input[e].isMainTexture;
							var r = t.getComponent("ShaderFXPrefabCustomComponentVec4").getDefaultValue();
							this._configuration.input[e].default = r
						} else {
							delete this._configuration.input[e].isColor, delete this._configuration.input[e].isMainTexture;
							var s = t.getComponent("ShaderFXPrefabCustomComponentVec4").getDefaultValue();
							this._configuration.input[e].default = s
						} else if ("sampler2D" == this._configuration.input[e].type)
							if (t.getComponent("ShaderFXPrefabCustomComponentTexture").propertyUI.isChecked) this._configuration.input[e].isMainTexture = !0;
							else {
								delete this._configuration.input[e].isMainTexture;
								var c = t.getComponent("ShaderFXPrefabCustomComponentTexture").getDefaultValue();
								this._configuration.input[e].default = c, this._configuration.input[e].wrapMode = t.getComponent("ShaderFXPrefabCustomComponentTexture").getWrapMode()
							}
						console.log(this.inputPrefabs[e])
					} else console.log("!!!this.inputPrefabs[i]")
			},
			customComponentCallback: function() {
				this.updateInputTextures(), this.updateConfigurationMain2(), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateUniforms(), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updatePreviewCustom(this.textureCache)
			},
			updateInputs: function() {
				this.inputPrefabs = [], this.customComponentInputContent.removeAllChildren(!0);
				for (var e = 0; e < this._configuration.input.length; e++)
					if ("float" == this._configuration.input[e].type) {
						var t = cc.instantiate(this.customComponentFloatPrefab);
						this.customComponentInputContent.addChild(t), t.getComponent("ShaderFXPrefabCustomComponentFloat").init(this._configuration.input[e].name, this.customComponentCallback.bind(this)), this._configuration.input[e].isTime ? t.getComponent("ShaderFXPrefabCustomComponentFloat").propertyUI.check() : t.getComponent("ShaderFXPrefabCustomComponentFloat").updateValue(this._configuration.input[e].default), this.inputPrefabs.push(t)
					} else if ("bool" == this._configuration.input[e].type) {
					var n = cc.instantiate(this.customComponentBoolPrefab);
					this.customComponentInputContent.addChild(n), n.getComponent("ShaderFXPrefabCustomComponentBool").init(this._configuration.input[e].name, this.customComponentCallback.bind(this)), this.inputPrefabs.push(n)
				} else if ("vec2" == this._configuration.input[e].type) {
					var o = cc.instantiate(this.customComponentVec2Prefab);
					this.customComponentInputContent.addChild(o), o.getComponent("ShaderFXPrefabCustomComponentVec2").init(this._configuration.input[e].name, this.customComponentCallback.bind(this)), this._configuration.input[e].isUV0 ? o.getComponent("ShaderFXPrefabCustomComponentVec2").propertyUI.check() : this._configuration.input[e].isUVNDC ? o.getComponent("ShaderFXPrefabCustomComponentVec2").propertyUI2.check() : o.getComponent("ShaderFXPrefabCustomComponentVec2").updateValue(this._configuration.input[e].default), this.inputPrefabs.push(o)
				} else if ("vec3" == this._configuration.input[e].type) {
					var i = cc.instantiate(this.customComponentVec3Prefab);
					this.customComponentInputContent.addChild(i), i.getComponent("ShaderFXPrefabCustomComponentVec3").init(this._configuration.input[e].name, this.customComponentCallback.bind(this)), i.getComponent("ShaderFXPrefabCustomComponentVec3").updateValue(this._configuration.input[e].default), this.inputPrefabs.push(i)
				} else if ("vec4" == this._configuration.input[e].type) {
					var a = cc.instantiate(this.customComponentVec4Prefab);
					this.customComponentInputContent.addChild(a), a.getComponent("ShaderFXPrefabCustomComponentVec4").init(this._configuration.input[e].name, this.customComponentCallback.bind(this)), this._configuration.input[e].isMainTexture ? (a.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI.check(), a.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI2.check()) : (this._configuration.input[e].isColor && a.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI2.check(), a.getComponent("ShaderFXPrefabCustomComponentVec4").updateValue(this._configuration.input[e].default)), this.inputPrefabs.push(a)
				} else if ("sampler2D" == this._configuration.input[e].type) {
					var r = cc.instantiate(this.customComponentTexturePrefab);
					this.customComponentInputContent.addChild(r), r.getComponent("ShaderFXPrefabCustomComponentTexture").init(this._configuration.input[e].name, this.customComponentCallback.bind(this)), this._configuration.input[e].isMainTexture ? r.getComponent("ShaderFXPrefabCustomComponentTexture").propertyUI.check() : r.getComponent("ShaderFXPrefabCustomComponentTexture").updateValue(this._configuration.input[e].default, this._configuration.input[e].wrapMode), this.inputPrefabs.push(r)
				}
			},
			updateConfigurationFunc: function(e) {
				this._configuration.frags = e
			},
			onSave: function() {
				(o = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Save", !0)).target = this.node, delete this._configuration.prefab;
				var e = Object.assign({}, this._configuration);
				for (var t in e.uniforms) "sampler2D" == e.uniforms[t].type && delete e.uniforms[t];
				var n = null;
				e.category.en != this.cateEditBox.string && (n = {
					en: e.category.en,
					zh: e.category.zh
				}, e.category.en = this.cateEditBox.string), e.category.zh = this.cateZhEditBox.string;
				var o, i = {
					component: JSON.stringify(e),
					custom: !0,
					folder: JSON.stringify({
						en: e.category.en,
						zh: e.category.zh
					}),
					official: !1,
					uuid: e.uuid
				};
				n && (i.oldFolder = n), o.setUserData(i), cc.systemEvent.dispatchEvent(o), (o = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, o.setUserData("\u4fdd\u5b58\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u6210\u529f"), cc.systemEvent.dispatchEvent(o)
			},
			updateInputTextures: function() {
				for (var e in this._configuration.uniforms) "sampler2D" == this._configuration.uniforms[e].type && delete this._configuration.uniforms[e];
				for (var t = 0; t < this.inputPrefabs.length; t++) this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture") && (this._configuration.uniforms[this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture").getKey()] = {
					type: "sampler2D",
					default: "ssr/shaderfx-editor/texture/subtexture",
					hide: !0,
					rename: !1,
					value: this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture").getTexture()
				})
			},
			getInputParams: function() {
				for (var e = [], t = 0; t < this.inputPrefabs.length; t++) this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentFloat") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentFloat").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec2") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec2").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec3") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec3").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec4") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec4").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentBool") && e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentBool").getDefaultValue());
				return e
			},
			onCompile: function() {
				this.updateInputTextures(), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").initCustom(this._configuration), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateSlots(), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateUniforms();
				var e = this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updatePreviewCustom(this.textureCache),
					t = e.errors;
				if (this.fragCodeFragRaw = e.frag, this.errorLines = [], t)
					for (var o = 0; o < t.length / 2; o++) {
						var i = cc.instantiate(this.logPrefab);
						if (t[o].fileID >= 0 && t[o].line > 0) {
							var a = e.frag.split("\n"),
								r = e.template.defines.length,
								s = t[o].line - 1,
								c = t[o].line - r;
							a[s], this.errorLines.push(c);
							var l = "Line: " + c + ": " + t[o].message;
							i.getComponent(n.DigraphEditor.Prefab.Command).label.string = l, i.getComponent(n.DigraphEditor.Prefab.Command).label.node.color = cc.Color.RED, this.errorContent.addChild(i)
						}
					} else {
						var h = cc.instantiate(this.logPrefab);
						h.getComponent(n.DigraphEditor.Prefab.Command).label.string = "Shader compile succeeded.", h.getComponent(n.DigraphEditor.Prefab.Command).label.node.color = cc.Color.GREEN, this.errorContent.addChild(h)
					}
				this.errorScrollView.scrollToBottom(), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateSlots(), this.onFragFrag()
			},
			onFragMain: function() {
				this.fragEditBox.node.active = !0, this.fragCodeMain.node.color = cc.color("#42FF91"), this.fragCodeFuncs.node.color = cc.color("#486554"), this.fragCodeUniforms.node.color = cc.color("#486554"), this.fragCodeFrag.node.color = cc.color("#486554"), this.index = 0, this.fragCode.string = o.generateHighlightShaderCode(this.fragCodeMainRaw)
			},
			onFragFuncs: function() {
				this.fragEditBox.node.active = !0, this.fragCodeMain.node.color = cc.color("#486554"), this.fragCodeFuncs.node.color = cc.color("#42FF91"), this.fragCodeUniforms.node.color = cc.color("#486554"), this.fragCodeFrag.node.color = cc.color("#486554"), this.index = 1, this.fragCode.string = o.generateHighlightShaderCode(this.fragCodeFuncsRaw)
			},
			onFragUniforms: function() {
				this.fragEditBox.node.active = !0, this.fragCodeMain.node.color = cc.color("#486554"), this.fragCodeFuncs.node.color = cc.color("#486554"), this.fragCodeUniforms.node.color = cc.color("#42FF91"), this.fragCodeFrag.node.color = cc.color("#486554"), this.index = 2, this.fragCode.string = o.generateHighlightShaderCode(this.fragCodeUniformsRaw)
			},
			onFragFrag: function() {
				this.fragCodeMain.node.color = cc.color("#486554"), this.fragCodeFuncs.node.color = cc.color("#486554"), this.fragCodeUniforms.node.color = cc.color("#486554"), this.fragCodeFrag.node.color = cc.color("#42FF91"), this.index = 3, this.fragEditBox.node.active = !1;
				for (var e = "", t = o.generateHighlightShaderCode(this.fragCodeFragRaw).split("\n"), n = t.length, i = 0; i < t.length; i++) {
					var a = i + 1;
					a < 10 ? n > 999 ? a = "   " + a : n > 99 ? a = "  " + a : n > 9 && (a = " " + a) : a < 100 ? n > 999 ? a = "  " + a : n > 99 && (a = " " + a) : a < 1e3 && n > 999 && (a = " " + a), a += "    ", this.errorLines.includes(i + 1) ? t[i] = "<color=#FF3559>" + a + "</c><u>" + t[i] + "</u>" : t[i] = "<color=#42FF91>" + a + "</c>" + t[i], e += t[i] + "\n"
				}
				this.fragCode.string = e
			},
			onEditFragDidBegan: function() {
				this.fragEditBox.node.active = !0, 0 == this.index ? this.fragEditBox.string = this.fragCodeMainRaw : 1 == this.index ? this.fragEditBox.string = this.fragCodeFuncsRaw : 2 == this.index && (this.fragEditBox.string = this.fragCodeUniformsRaw), this.fragCode.node.active = !1
			},
			updateMain: function(e) {
				var t = [],
					n = [],
					o = /\s?(int|bool|float|vec2|vec3|vec4|sampler2D)\s+main\s?\((.*)\)/g.exec(e);
				if (o) {
					n = [{
						type: o[1],
						name: "Output"
					}];
					var i = o[2];
					if ("" != i)
						for (var a = -1 != i.indexOf(",") ? i.split(",") : [i], r = 0; r < a.length; r++) {
							var s = /\s?(.*)\s+(.*)/g.exec(a[r]);
							console.log(s[1]), console.log(s[2]), t.push({
								type: s[1],
								name: s[2]
							})
						}
				}
				this.updateConfigurationMain(t, n, e.split("\n"))
			},
			updateFragFunc: function(e) {
				this.updateConfigurationFunc(o.parseFragFuncs(e))
			},
			updateUniforms: function(e) {
				var t = {},
					n = /uniform\s+(int|bool|float|vec2|vec3|vec4|sampler2D)\s+(.*);/g,
					o = n.exec(e);
				if (o) {
					do {
						t[o[2]] = {
							type: o[1]
						}, "float" == o[1] ? t[o[2]].default = 1 : "bool" == o[1] ? t[o[2]].default = !0 : "vec2" == o[1] ? t[o[2]].default = "1.00,1.00" : "vec3" == o[1] ? t[o[2]].default = "1.00,1.00,1.00" : "vec4" == o[1] && (t[o[2]].default = "1.00,1.00,1.00,1.00")
					} while (null !== (o = n.exec(e)));
					this.updateConfigurationUniforms(t)
				} else this.updateConfigurationUniforms({})
			},
			onEditFragTextChanged: function() {
				console.log("onEditFragTextChanged")
			},
			onEditFragEditReturn: function() {
				console.log("onEditFragEditReturn")
			},
			onEditFragDidEnd: function() {
				this.fragCode.node.active = !0, 0 == this.index ? (this.fragCodeMainRaw = this.fragEditBox.string, this.fragCode.string = o.generateHighlightShaderCode(this.fragCodeMainRaw), this.updateMain(this.fragCodeMainRaw)) : 1 == this.index ? (this.fragCodeFuncsRaw = this.fragEditBox.string, this.fragCode.string = o.generateHighlightShaderCode(this.fragCodeFuncsRaw), this.updateFragFunc(this.fragCodeFuncsRaw)) : 2 == this.index && (this.fragCodeUniformsRaw = this.fragEditBox.string, this.fragCode.string = o.generateHighlightShaderCode(this.fragCodeUniformsRaw), this.updateUniforms(this.fragCodeUniformsRaw)), this.fragEditBox.string = ""
			},
			_touchStartCallback: function(e) {
				e.stopPropagation()
			},
			_touchMoveCallback: function(e) {
				e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				e.stopPropagation()
			},
			_touchCancelCallback: function(e) {
				e.stopPropagation()
			},
			onNameEditBoxDidEnded: function(e) {
				var t = e.string.replace(/\s/g, "");
				if (/^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(e.string)) t = t;
				else {
					t = "UserCustomNode";
					var n = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
					n.target = this.node, n.setUserData("\u547d\u540d\u683c\u5f0f\u5b58\u5728\u95ee\u9898\uff0c\u8bf7\u4fee\u6539"), cc.systemEvent.dispatchEvent(n)
				}
				this._configuration.name = t, this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateName(this._configuration), e.string = t
			},
			onCateEditBoxDidEnded: function(e) {
				var t = e.string.replace(/\s/g, "");
				if (/^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(e.string)) t = t;
				else {
					t = "user";
					var n = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
					n.target = this.node, n.setUserData("\u547d\u540d\u683c\u5f0f\u5b58\u5728\u95ee\u9898\uff0c\u8bf7\u4fee\u6539"), cc.systemEvent.dispatchEvent(n)
				}
				e.string = t
			},
			onTagEditBoxDidEnded: function(e) {
				var t = e.string;
				if (/^[a-zA-Z\-\s,]*$/.test(e.string)) t = t;
				else {
					t = "user";
					var n = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
					n.target = this.node, n.setUserData("\u547d\u540d\u683c\u5f0f\u5b58\u5728\u95ee\u9898\uff0c\u8bf7\u4fee\u6539"), cc.systemEvent.dispatchEvent(n)
				}
				e.string = t, this._configuration.tags = e.string.split(","), console.log("this._configuration.tags"), console.log(this._configuration.tags)
			},
			onNameZhEditBoxDidEnded: function(e) {
				this._configuration.name_zh = e.string, this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateName(this._configuration)
			},
			onDescEditBoxDidEnded: function(e) {
				this._configuration.description.en = e.string, this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateName(this._configuration)
			},
			onDescZhEditBoxDidEnded: function(e) {
				this._configuration.description.zh = e.string, this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateName(this._configuration)
			}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerFXComponentExporter: [function(e, t) {
		"use strict";
		cc._RF.push(t, "9bf07DW86BAVLOm6yIUlImk", "DigraphEditorLayerFXComponentExporter");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = (e("../../shader-fx/util/ShaderFXUtil"), e("../../shader-fx/util/ShaderFXExporterUtil"));
		e("../../shader-fx/util/ShaderFXLeanCloudUtil"), n.DigraphEditor.Layer.FXComponentExporter = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), window.EDITOR_LANGUAGE != cc.sys.LANGUAGE_CHINESE && (this.node.getChildByName("PanelLogin").getChildByName("Content").getComponent(cc.Label).string = "Shader Exporter")
			},
			show: function(e) {
				this._data = e
			},
			onExport2DSpriteAndSpine: function() {
				if (this._data) o.effect2DSpriteAndSpine(this._data);
				else {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Export2DSpriteAndSpineScene", !0);
					e.target = this.node, cc.systemEvent.dispatchEvent(e)
				}
			},
			onExport3DUnlit: function() {
				if (this._data) o.effect3DUnlit(this._data);
				else {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Export3DUnlitScene", !0);
					e.target = this.node, cc.systemEvent.dispatchEvent(e)
				}
			},
			onExport3DSprite: function() {
				if (this._data) o.effect3DSprite(this._data);
				else {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Export3DSpriteScene", !0);
					e.target = this.node, cc.systemEvent.dispatchEvent(e)
				}
			},
			_touchStartCallback: function(e) {
				e.stopPropagation()
			},
			_touchMoveCallback: function(e) {
				e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				this.node.active = !1, e.stopPropagation()
			},
			_touchCancelCallback: function(e) {
				e.stopPropagation()
			}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXExporterUtil": "ShaderFXExporterUtil",
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerFXComponentLibrary: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7feadw4ji1HpbDYVVkPEgpe", "DigraphEditorLayerFXComponentLibrary");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = e("../../shader-fx/util/ShaderFXUtil"),
			i = e("../../shader-fx/util/ShaderFXLeanCloudUtil");
		n.DigraphEditor.Layer.FXComponentLibrary = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				tweenFromTime: cc.Label,
				tweenToTime: cc.EditBox,
				tweenTimeProgress: cc.ProgressBar,
				fxPrefabCategory: cc.Prefab,
				fxPrefabComponent: cc.Prefab,
				scrollViewContent: cc.Node,
				previewView: cc.Node,
				playButton: cc.Button,
				codeView: cc.Node,
				paramView: cc.Node,
				previewPanel: cc.Node,
				fragCode: cc.RichText,
				fragEditBox: cc.EditBox,
				categoryContent: cc.Node,
				onlineContent: cc.Node,
				onlineScrollViewContent: cc.Node,
				subTitle: cc.Label,
				saveProjectButton: cc.Node,
				fxNode: cc.Node,
				fxSpineNode: cc.Node,
				ShaderFXPrefabFXPanel: cc.Node,
				ShaderFXPrefabFXPanelSpine: cc.Node,
				CustomComponentBuilder: cc.Node,
				uniformSpinePrefab: cc.Prefab,
				uniformSpineSkeletonPrefab: cc.Node,
				customComponentInputContent: cc.Node,
				customComponentFloatPrefab: cc.Prefab,
				customComponentBoolPrefab: cc.Prefab,
				customComponentVec2Prefab: cc.Prefab,
				customComponentVec3Prefab: cc.Prefab,
				customComponentVec4Prefab: cc.Prefab,
				customComponentColorPrefab: cc.Prefab,
				customComponentTexturePrefab: cc.Prefab
			},
			onLoad: function() {
				this._tweenTime = 3e3, this._spineIndex = 0, this._textureIndex = 3
			},
			actionCallback: function(e) {
				for (var t in this._elapsed += parseInt(1e3 * e), this._elapsed > this._tweenTime && (this._elapsed = this._tweenTime), this.tweenFromTime.string = this._elapsed, this.tweenTimeProgress.progress = this._elapsed / this._tweenTime, cc.log(this.tweenTimeProgress.progress), this.tween) {
					var n = this.tween[t];
					if ("float" == n.type) {
						var o = n.from.split(".")[1].length,
							i = parseFloat(n.from),
							a = parseFloat(n.to) - i,
							r = i + this.tweenTimeProgress.progress * a;
						r = parseFloat(r).toFixed(o), this.updateUniformValue(t, r), this.customComponentCallback(t)
					} else if ("vec2" == n.type) {
						var s = parseFloat(n.from.split(",")[0]),
							c = parseFloat(n.from.split(",")[1]),
							l = parseFloat(n.to.split(",")[0]),
							h = parseFloat(n.to.split(",")[1]),
							u = n.from.split(",")[0].split(".")[1].length,
							p = n.from.split(",")[1].split(".")[1].length,
							d = l - s,
							f = h - c,
							m = s + this.tweenTimeProgress.progress * d;
						m = parseFloat(m).toFixed(u);
						var g = c + this.tweenTimeProgress.progress * f;
						g = parseFloat(g).toFixed(p), this.updateUniformValue(t, m + "," + g), this.customComponentCallback(t)
					} else if ("vec3" == n.type) {
						var C = parseFloat(n.from.split(",")[0]),
							_ = parseFloat(n.from.split(",")[1]),
							v = parseFloat(n.from.split(",")[2]),
							E = parseFloat(n.to.split(",")[0]),
							S = parseFloat(n.to.split(",")[1]),
							P = parseFloat(n.to.split(",")[2]),
							b = n.from.split(",")[0].split(".")[1].length,
							y = n.from.split(",")[1].split(".")[1].length,
							F = n.from.split(",")[2].split(".")[1].length,
							U = E - C,
							D = S - _,
							x = P - v,
							X = C + this.tweenTimeProgress.progress * U;
						X = parseFloat(X).toFixed(b);
						var T = _ + this.tweenTimeProgress.progress * D;
						T = parseFloat(T).toFixed(y);
						var N = v + this.tweenTimeProgress.progress * x;
						N = parseFloat(N).toFixed(F), this.updateUniformValue(t, X + "," + T + "," + N), this.customComponentCallback(t)
					} else if ("vec4" == n.type) {
						var w = parseFloat(n.from.split(",")[0]),
							L = parseFloat(n.from.split(",")[1]),
							M = parseFloat(n.from.split(",")[2]),
							I = parseFloat(n.from.split(",")[3]),
							A = parseFloat(n.to.split(",")[0]),
							V = parseFloat(n.to.split(",")[1]),
							R = parseFloat(n.to.split(",")[2]),
							B = parseFloat(n.to.split(",")[3]),
							O = n.from.split(",")[0].split(".")[1].length,
							k = n.from.split(",")[1].split(".")[1].length,
							G = n.from.split(",")[2].split(".")[1].length,
							j = n.from.split(",")[3].split(".")[1].length,
							H = A - w,
							W = V - L,
							K = R - M,
							z = B - I,
							Y = w + this.tweenTimeProgress.progress * H;
						Y = parseFloat(Y).toFixed(O);
						var Z = L + this.tweenTimeProgress.progress * W;
						Z = parseFloat(Z).toFixed(k);
						var q = M + this.tweenTimeProgress.progress * K;
						q = parseFloat(q).toFixed(G);
						var J = I + this.tweenTimeProgress.progress * z;
						J = parseFloat(J).toFixed(j), this.updateUniformValue(t, Y + "," + Z + "," + q + "," + J), this.customComponentCallback(t)
					} else if ("color" == n.type) {
						var Q = cc.color(n.from),
							$ = cc.color(n.to),
							ee = Q.r,
							te = Q.g,
							ne = Q.b,
							oe = Q.a,
							ie = $.r - ee,
							ae = $.g - te,
							re = $.b - ne,
							se = $.a - oe,
							ce = ee + this.tweenTimeProgress.progress * ie;
						ce = parseInt(ce);
						var le = te + this.tweenTimeProgress.progress * ae;
						le = parseInt(le);
						var he = ne + this.tweenTimeProgress.progress * re;
						he = parseInt(he);
						var ue = oe + this.tweenTimeProgress.progress * se;
						ue = parseInt(ue);
						var pe = cc.color(ce, le, he, ue);
						this.updateUniformValue(t, pe.toHEX("#rrggbbaa")), this.customComponentCallback(t)
					}
				}
				this._elapsed >= this._tweenTime && (this.unschedule(this.actionCallback), this.playButton.interactable = !0, this.tweenToTime.enabled = !0)
			},
			onEditBoxDidEnd: function(e) {
				this._tweenTime = parseInt(e.string)
			},
			onAction: function() {
				this.playButton.interactable = !1, this.tweenToTime.enabled = !1, this._elapsed = 0, this.tweenFromTime.string = "0", this.tweenTimeProgress.progress = 0, this.tween = {};
				for (var e = 0; e < this.inputPrefabs.length; e++) this.inputPrefabs[e].active && (this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentFloat") && this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentFloat")._actionEnabled ? this.tween[this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentFloat").getKey()] = {
					type: "float",
					from: this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentFloat").getValue(),
					to: this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentFloat").getValueTo()
				} : this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec2") && this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec2")._actionEnabled ? this.tween[this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec2").getKey()] = {
					type: "vec2",
					from: this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec2").getDefaultValue(),
					to: this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec2").getValueTo()
				} : this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec3") && this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec3")._actionEnabled ? this.tween[this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec3").getKey()] = {
					type: "vec3",
					from: this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec3").getDefaultValue(),
					to: this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec3").getValueTo()
				} : this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec4") && this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec4")._actionEnabled && (this.tween[this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec4").getKey()] = {
					type: this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec4")._isColor ? "color" : "vec4",
					from: this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec4").getDefaultValue(),
					to: this.inputPrefabs[e].getComponent("ShaderFXPrefabCustomComponentVec4").getValueTo()
				}));
				cc.log(this.tween), this.schedule(this.actionCallback)
			},
			onSpriteTab: function() {
				this.ShaderFXPrefabFXPanel.active = !0, this.ShaderFXPrefabFXPanelSpine.active = !1, this.fxNode.active = !0, this.fxSpineNode.active = !1, this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").initCustom(this._configuration);
				var e = this;
				this.scheduleOnce(function() {
					e.onCompile(), e.customComponentCallback()
				}, .01)
			},
			onSpineTab: function() {
				this.ShaderFXPrefabFXPanel.active = !1, this.ShaderFXPrefabFXPanelSpine.active = !0, this.fxNode.active = !1, this.fxSpineNode.active = !0, this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").initCustom(this._configuration);
				var e = this;
				this.scheduleOnce(function() {
					e.textureCacheSpine || (e.textureCacheSpine = e.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").getUniformValue("spine_0")), e.onCompile(), e.customComponentCallback()
				}, .01)
			},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this);
				var e = cc.loader.getRes("ssr/shaderfx-editor/texture/cocos_sticker", cc.SpriteFrame);
				e ? this.onLoadSpriteFrameCallback(null, e, "") : cc.loader.loadRes("ssr/shaderfx-editor/texture/cocos_sticker", cc.SpriteFrame, this.onLoadSpriteFrameCallback.bind(this)), this.uniformSpineSkeletonPrefab.getComponent("ShaderFXPrefabUniformSpineSkeleton").config("spine_0", "spine_0", null, {
					panel: this.ShaderFXPrefabFXPanelSpine
				}), this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel")._testrun = !0, this.inputPrefabs = [], this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.Uniform.onValueChanged", this.uniformUpdated, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.Uniform.onCustomTextureValueChanged", this.onCustomTextureValueChanged, this)
			},
			onLoadSpriteFrameCallback: function(e, t) {
				this.mainTexture = t.clone(), this.textureCache = t.getTexture()
			},
			updateConfigurationName: function(e) {
				this._configuration.name = e
			},
			updateConfigurationUniforms: function(e) {
				this._configuration.uniforms = Object.assign({}, e)
			},
			updateConfigurationMain: function(e, t, n) {
				var o = !1;
				if (this._configuration.input.length != e.length) o = !0;
				else
					for (var i = 0; i < e.length; i++)
						if (e[i].type != this._configuration.input[i].type || e[i].name != this._configuration.input[i].name) {
							o = !0;
							break
						}
				this._configuration.input = e, this._configuration.output = t, this._configuration.main = n, o && this.updateInputs()
			},
			updateConfigurationMain2: function(e) {
				for (var t = 0; t < this._configuration.input.length; t++)
					if (console.log("input: "), this.inputPrefabs && this.inputPrefabs[t]) {
						if (e && this._configuration.input[t].name != e) continue;
						var n = this.inputPrefabs[t];
						if ("float" == this._configuration.input[t].type)
							if (n.getComponent("ShaderFXPrefabCustomComponentFloat").propertyUI.isChecked) this._configuration.input[t].isTime = !0, delete this._configuration.input[t].default;
							else {
								delete this._configuration.input[t].isTime;
								var o = n.getComponent("ShaderFXPrefabCustomComponentFloat").getValue();
								this._configuration.input[t].default = o
							}
						else if ("bool" == this._configuration.input[t].type) {
							var i = n.getComponent("ShaderFXPrefabCustomComponentBool").getValue();
							this._configuration.input[t].default = i
						} else if ("vec2" == this._configuration.input[t].type)
							if (n.getComponent("ShaderFXPrefabCustomComponentVec2").propertyUI2.isChecked) this._configuration.input[t].isUVNDC = !0, delete this._configuration.input[t].default, delete this._configuration.input[t].isUV0;
							else if (n.getComponent("ShaderFXPrefabCustomComponentVec2").propertyUI.isChecked) n.active = !1, this._configuration.input[t].isUV0 = !0, delete this._configuration.input[t].default, delete this._configuration.input[t].isUVNDC;
						else {
							delete this._configuration.input[t].isUV0, delete this._configuration.input[t].isUVNDC;
							var a = n.getComponent("ShaderFXPrefabCustomComponentVec2").getDefaultValue();
							this._configuration.input[t].default = a
						} else if ("vec3" == this._configuration.input[t].type) {
							var r = n.getComponent("ShaderFXPrefabCustomComponentVec3").getDefaultValue();
							this._configuration.input[t].default = r
						} else if ("vec4" == this._configuration.input[t].type)
							if (n.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI.isChecked) this._configuration.input[t].isMainTexture = !0, this._configuration.input[t].isColor = !0, n.active = !1;
							else if (n.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI2.isChecked) {
							this._configuration.input[t].isColor = !0, delete this._configuration.input[t].isMainTexture;
							var s = n.getComponent("ShaderFXPrefabCustomComponentVec4").getDefaultValue();
							this._configuration.input[t].default = s
						} else {
							delete this._configuration.input[t].isColor, delete this._configuration.input[t].isMainTexture;
							var c = n.getComponent("ShaderFXPrefabCustomComponentVec4").getDefaultValue();
							this._configuration.input[t].default = c
						} else if ("sampler2D" == this._configuration.input[t].type)
							if (n.getComponent("ShaderFXPrefabCustomComponentTexture").propertyUI.isChecked) this._configuration.input[t].isMainTexture = !0, n.active = !1;
							else {
								delete this._configuration.input[t].isMainTexture;
								var l = n.getComponent("ShaderFXPrefabCustomComponentTexture").getDefaultValue();
								this._configuration.input[t].default = l, this._configuration.input[t].wrapMode = n.getComponent("ShaderFXPrefabCustomComponentTexture").getWrapMode()
							}
						console.log(this.inputPrefabs[t])
					} else console.log("!!!this.inputPrefabs[i]")
			},
			onPrev: function() {
				this._no -= 1, this._no < 0 && (this._no = this._items.length - 1), this.onExport(JSON.parse(this._items[this._no].component), this._no)
			},
			onNext: function() {
				this._no += 1, this._no > this._items.length - 1 && (this._no = 0), this.onExport(JSON.parse(this._items[this._no].component), this._no)
			},
			updateUniformValue: function(e, t) {
				for (var n = 0; n < this.inputPrefabs.length; n++) this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentFloat") && this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentFloat").getKey() == e ? this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentFloat").updateValue(t) : this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentVec2") && this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentVec2").getKey() == e ? this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentVec2").updateValue(t) : this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentVec3") && this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentVec3").getKey() == e ? this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentVec3").updateValue(t) : this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentVec4") && this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentVec4").getKey() == e && this.inputPrefabs[n].getComponent("ShaderFXPrefabCustomComponentVec4").updateValue(t)
			},
			updateInputs: function() {
				this.inputPrefabs = [], this.customComponentInputContent.removeAllChildren(!0);
				for (var e = 0; e < this._configuration.input.length; e++)
					if ("float" == this._configuration.input[e].type) {
						var t = cc.instantiate(this.customComponentFloatPrefab);
						this.customComponentInputContent.addChild(t), t.getComponent("ShaderFXPrefabCustomComponentFloat").init("u" + this._configuration.input[e].name, this.customComponentCallback.bind(this), !0), this._configuration.input[e].isTime ? (t.getComponent("ShaderFXPrefabCustomComponentFloat").propertyUI.check(), t.active = !1) : t.getComponent("ShaderFXPrefabCustomComponentFloat").updateValue(this._configuration.input[e].default), this.inputPrefabs.push(t)
					} else if ("bool" == this._configuration.input[e].type) {
					var n = cc.instantiate(this.customComponentBoolPrefab);
					this.customComponentInputContent.addChild(n), n.getComponent("ShaderFXPrefabCustomComponentBool").init("u" + this._configuration.input[e].name, this.customComponentCallback.bind(this), !0), n.getComponent("ShaderFXPrefabCustomComponentBool").updateValue(this._configuration.input[e].default), this.inputPrefabs.push(n)
				} else if ("vec2" == this._configuration.input[e].type) {
					var o = cc.instantiate(this.customComponentVec2Prefab);
					this.customComponentInputContent.addChild(o), o.getComponent("ShaderFXPrefabCustomComponentVec2").init("u" + this._configuration.input[e].name, this.customComponentCallback.bind(this), !0), this._configuration.input[e].isUV0 ? (o.getComponent("ShaderFXPrefabCustomComponentVec2").propertyUI.check(), o.active = !1) : this._configuration.input[e].isUVNDC ? o.getComponent("ShaderFXPrefabCustomComponentVec2").propertyUI2.check() : o.getComponent("ShaderFXPrefabCustomComponentVec2").updateValue(this._configuration.input[e].default), this.inputPrefabs.push(o)
				} else if ("vec3" == this._configuration.input[e].type) {
					var i = cc.instantiate(this.customComponentVec3Prefab);
					this.customComponentInputContent.addChild(i), i.getComponent("ShaderFXPrefabCustomComponentVec3").init("u" + this._configuration.input[e].name, this.customComponentCallback.bind(this), !0), i.getComponent("ShaderFXPrefabCustomComponentVec3").updateValue(this._configuration.input[e].default), this.inputPrefabs.push(i)
				} else if ("vec4" == this._configuration.input[e].type) {
					var a = cc.instantiate(this.customComponentVec4Prefab);
					this.customComponentInputContent.addChild(a), a.getComponent("ShaderFXPrefabCustomComponentVec4").init("u" + this._configuration.input[e].name, this.customComponentCallback.bind(this), !0, this._configuration.input[e].isColor, this._configuration.input[e].isMainTexture), this._configuration.input[e].isMainTexture ? (a.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI.check(), a.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI2.check(), a.active = !1) : (this._configuration.input[e].isColor && a.getComponent("ShaderFXPrefabCustomComponentVec4").propertyUI2.check(), a.getComponent("ShaderFXPrefabCustomComponentVec4").updateValue(this._configuration.input[e].default)), this.inputPrefabs.push(a)
				} else if ("sampler2D" == this._configuration.input[e].type) {
					var r = cc.instantiate(this.customComponentTexturePrefab);
					this.customComponentInputContent.addChild(r), r.getComponent("ShaderFXPrefabCustomComponentTexture").init("u" + this._configuration.input[e].name, this.customComponentCallback.bind(this), !0), this._configuration.input[e].isMainTexture ? (r.getComponent("ShaderFXPrefabCustomComponentTexture").propertyUI.check(), r.active = !1) : r.getComponent("ShaderFXPrefabCustomComponentTexture").updateValue(this._configuration.input[e].default, this._configuration.input[e].wrapMode), this.inputPrefabs.push(r)
				}
			},
			updateMain: function(e) {
				var t = [],
					n = [],
					o = /\s?(int|bool|float|vec2|vec3|vec4|sampler2D)\s+main\s?\((.*)\)/g.exec(e);
				if (o) {
					n = [{
						type: o[1],
						name: "Output"
					}];
					var i = o[2];
					if ("" != i)
						for (var a = -1 != i.indexOf(",") ? i.split(",") : [i], r = 0; r < a.length; r++) {
							var s = /\s?(.*)\s+(.*)/g.exec(a[r]);
							console.log(s[1]), console.log(s[2]), t.push({
								type: s[1],
								name: s[2],
								hide: !0
							})
						}
				}
				this.updateConfigurationMain(t, n, e.split("\n"))
			},
			updateConfigurationFunc: function(e) {
				this._configuration.frags = e
			},
			customComponentCallback: function(e, t) {
				this.updateConfigurationMain2(e), "texture" != t && (this._configuration.uniforms[e] || (this._configuration.uniforms[e] = {}), this._configuration.uniforms[e].tunned = this.getInputParam(e), this.fxNode.active ? (this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateUniforms(!0, !0), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updatePreviewCustom(this.textureCache)) : (this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").updateUniforms(!0, !0), this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").updatePreviewCustom(this.textureCacheSpine)))
			},
			updateUniforms: function() {
				for (var e = {}, t = 0; t < this._configuration.input.length; t++) {
					var n = this._configuration.input[t];
					n.isMainTexture || n.isUV0 || (e["u" + n.name] = n, e["u" + n.name].hide = !0, "float" == e["u" + n.name].type || "bool" == e["u" + n.name].type || ("vec2" == e["u" + n.name].type ? null == e["u" + n.name].default && (e["u" + n.name].default = "1.00,1.00") : "vec3" == e["u" + n.name].type || e["u" + n.name].type))
				}
				this.updateConfigurationUniforms(e)
			},
			updateInputTextures: function() {
				for (var e in this._configuration.uniforms) "sampler2D" == this._configuration.uniforms[e].type && delete this._configuration.uniforms[e];
				for (var t = 0; t < this.inputPrefabs.length; t++) this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture") && (this._configuration.uniforms[this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture").getKey()] = {
					type: "sampler2D",
					default: "ssr/shaderfx-editor/texture/subtexture",
					hide: !0,
					rename: !1,
					value: this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture").getTexture()
				})
			},
			getInputParam: function(e) {
				for (var t = 0; t < this.inputPrefabs.length; t++) {
					if (this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentFloat") && this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentFloat").getKey() == e) return this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentFloat").getValue();
					if (this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec2") && this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec2").getKey() == e) return this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec2").getDefaultValue();
					if (this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec3") && this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec3").getKey() == e) return this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec3").getDefaultValue();
					if (this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec4") && this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec4").getKey() == e) return this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec4").getDefaultValue()
				}
				return null
			},
			getInputParams: function() {
				for (var e = [], t = 0; t < this.inputPrefabs.length; t++) this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentFloat") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentFloat").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec2") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec2").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec3") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec3").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec4") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentVec4").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture") ? e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentTexture").getValue()) : this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentBool") && e.push(this.inputPrefabs[t].getComponent("ShaderFXPrefabCustomComponentBool").getDefaultValue());
				return e
			},
			onCompile: function() {
				this.updateInputTextures(), this.fxNode.active ? (this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").initCustom(this._configuration), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updateUniforms(!0, !0), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updatePreviewCustom(this.textureCache)) : (this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").initCustom(this._configuration), this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").updateUniforms(!0, !0), this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").updatePreviewCustom(this.textureCacheSpine))
			},
			onCode: function() {
				this.codeView.active = !0, this.paramView.active = !1
			},
			onParams: function() {
				this.codeView.active = !1, this.paramView.active = !0
			},
			uniformUpdated: function(e) {
				console.log("uniformUpdateduniformUpdateduniformUpdated");
				var t = e.getUserData();
				this.fxNode.active ? this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").updatePanelUniform(this.ShaderFXPrefabFXPanel, t.getKey(), t.getValue()) : (cc.log(t.getKey()), cc.log(t.getSpineValue()), this.textureCacheSpine = t.getSpineValue(), this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel")._testrun = !0, this.onCompile(), this.customComponentCallback())
			},
			onCustomTextureValueChanged: function(e) {
				var t = e.getUserData();
				this.textureCache = t, this.customComponentCallback()
			},
			onEditFragDidBegan: function() {
				this.fragEditBox.node.active = !0, this.fragEditBox.string = this.fragCodeRaw, this.fragCode.node.active = !1
			},
			onEditFragDidEnd: function() {
				this.fragCode.node.active = !0, this.fragEditBox.string = ""
			},
			onTitle: function() {
				this.onlineContent.active && (this.categoryContent.active = !0, this.onlineContent.active = !1, this.subTitle.node.active = !1)
			},
			onSubTitle: function() {},
			init: function(e) {
				this._localComponents = e, this._cloudMy = [], this._cloud = [], this._customComponentPrefabArray = [];
				var t = cc.sys.localStorage.getItem("SSR_SHADERFX_ONLINE_COMPONENTS");
				t ? (t = JSON.parse(t), (new Date).getTime() - t.lastUpdated > 36e5 ? i.listOnlineFXComponentList(this.listOnlineFXComponentList.bind(this), this.listOnlineFXComponentList.bind(this)) : this.updateOnlineFXComponentList(t.results)) : i.listOnlineFXComponentList(this.listOnlineFXComponentList.bind(this), this.listOnlineFXComponentList.bind(this))
			},
			updateOnlineFXComponentList: function(e) {
				this.scrollViewContent.removeAllChildren(!0);
				for (var t = 0; t < e.length; t++) {
					var n = cc.instantiate(this.fxPrefabCategory);
					this.scrollViewContent.addChild(n, -999), n.getComponent("ShaderFXPrefabCategoryPrefab").init(e[t], this)
				}
			},
			listOnlineFXComponentList: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Message.dismiss", !0);
				if (t.target = this.node, cc.systemEvent.dispatchEvent(t), console.log("listOnlineFXComponentList"), console.log(e), e) {
					e = e.results;
					for (var n = [], o = 0; o < e.length; o++) n.push({
						index: e[o].index,
						count: e[o].count,
						name: e[o].name,
						banner: e[o].banner
					});
					this.updateOnlineFXComponentList(e)
				}
			},
			onFX: function(e) {
				cc.log(e), this.categoryContent.active = !1, this.onlineContent.active = !0, this.subTitle.node.active = !0, this.__index = e.index, this.subTitle.string = "> " + (window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? e.name.en + "/" + e.name.zh : e.name.en);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Message.show", !0);
				t.target = this.node, t.setUserData(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5217\u8868\u83b7\u53d6\u4e2d\uff0c\u8bf7\u7a0d\u540e ......" : "List loading, please wait ......"), cc.systemEvent.dispatchEvent(t);
				var n = cc.sys.localStorage.getItem("SSR_SHADERFX_ONLINE_COMPONENTS_" + e.index);
				n ? (n = JSON.parse(n), (new Date).getTime() - n.lastUpdated > 36e5 ? i.listCustomComponentByCategory(e.index, this.listCustomComponentByCategoryCallback.bind(this), this.listCustomComponentByCategoryCallback.bind(this)) : this.updateCustomComponentByCategory(n.results)) : i.listCustomComponentByCategory(e.index, this.listCustomComponentByCategoryCallback.bind(this), this.listCustomComponentByCategoryCallback.bind(this))
			},
			updateCustomComponentByCategory: function(e) {
				this._items = e, this.onlineScrollViewContent.removeAllChildren(!0);
				for (var t = 0; t < e.length; t++)
					if (this.isInLocal(e[t].uuid)) {
						var n = JSON.parse(e[t].component);
						i = cc.instantiate(this.fxPrefabComponent), this.onlineScrollViewContent.addChild(i, -999), i.getComponent("ShaderFXPrefabFXComponentPrefab").init(t, n, !0, e[t], this)
					} else {
						var o = JSON.parse(e[t].component),
							i = cc.instantiate(this.fxPrefabComponent);
						this.onlineScrollViewContent.addChild(i, -999), i.getComponent("ShaderFXPrefabFXComponentPrefab").init(t, o, this.isInLocal(e[t].uuid), e[t], this)
					}
			},
			listCustomComponentByCategoryCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Message.dismiss", !0);
				t.target = this.node, cc.systemEvent.dispatchEvent(t), console.log("listCustomComponentByCategoryCallback"), console.log(e), e && (e = e.results, this.updateCustomComponentByCategory(e))
			},
			onCloseCode: function() {
				this.previewView.active = !1
			},
			onExport: function(e, t) {
				this._no = t, this.customComponentInputContent.removeAllChildren(!0), this.inputPrefabs = [], this.CustomComponentBuilder.active = !0, this.fragCodeFragRaw = "", this.fragCodeFuncsRaw = "", this.fragCodeUniformsRaw = "";
				var n = e;
				for (var i in n.frags) this.fragCodeFuncsRaw += n.frags[i].join("\n"), this.fragCodeFuncsRaw += "\n";
				this.fragCodeMainRaw = n.main.join("\n");
				for (var a = 0; a < e.input.length; a++) this.fragCodeUniformsRaw += "uniform " + e.input[a].type + " " + e.input[a].name + ";", this.fragCodeUniformsRaw += "\n";
				if (this._configuration = Object.assign({}, n), this.updateUniforms(this.fragCodeUniformsRaw), this.updateInputs(), this.updateMain(this.fragCodeMainRaw), this.fxNode.active) {
					this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel").initCustom(this._configuration);
					var r = this;
					this.scheduleOnce(function() {
						r.onCompile()
					}, .01)
				} else {
					this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").setInputParams(this.getInputParams()), this.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").initCustom(this._configuration);
					var s = this;
					this.scheduleOnce(function() {
						s.textureCacheSpine = s.ShaderFXPrefabFXPanelSpine.getComponent("ShaderFXPrefabPanel").getUniformValue("spine_0"), s.onCompile(), s.customComponentCallback()
					}, .01)
				}
				for (this.previewView.active = !0, this.item = e, this.fragCodeRaw = "\n/******************** FX / \u7279\u6548 \u7247\u6bb5\u7740\u8272\u5668\u4ee3\u7801 ********************/\n\n", this.fragCodeRaw += "// Uniform \u53d8\u91cf\u4ee3\u7801\u533a\n", a = 0; a < e.input.length; a++) this.fragCodeRaw += "uniform " + e.input[a].type + " " + e.input[a].name + ";", this.fragCodeRaw += "\n";
				if (e.frags && 0 === Object.keys(e.frags).length && e.frags.constructor === Object) this.fragCodeRaw += "\n// Frag / \u7247\u6bb5 \u51fd\u6570\u4ee3\u7801\u533a\n\n";
				else
					for (var i in this.fragCodeRaw += "\n// Frag / \u7247\u6bb5 \u51fd\u6570\u4ee3\u7801\u533a\n", e.frags) this.fragCodeRaw += e.frags[i].join("\n"), this.fragCodeRaw += "\n";
				this.fragCodeRaw += "// Frag / \u7247\u6bb5 \u4e3b\u51fd\u6570\u4ee3\u7801\u533a\n", this.fragCodeRaw += e.main.join("\n"), this.fragCodeRaw += "\n/******************** ********************* ********************/", this.fragCodeRaw += "\n";
				var c = o.generateHighlightShaderCode(this.fragCodeRaw);
				this.fragCode.string = c
			},
			exportFX: function() {
				for (var e = 0; e < this.item.input.length; e++) {
					var t = this.item.input[e];
					"float" != t.type || t.isTime ? "bool" == t.type || ("vec2" == t.type ? t.isUV0 || this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + t.name] && this._configuration.uniforms["u" + t.name].tunned && (this.item.input[e].default = this._configuration.uniforms["u" + t.name].tunned) : "vec3" == t.type ? this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + t.name] && this._configuration.uniforms["u" + t.name].tunned && (this.item.input[e].default = this._configuration.uniforms["u" + t.name].tunned) : "vec4" != t.type || t.isMainTexture || (t.isColor, this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + t.name] && this._configuration.uniforms["u" + t.name].tunned && (this.item.input[e].default = this._configuration.uniforms["u" + t.name].tunned))) : this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + t.name] && this._configuration.uniforms["u" + t.name].tunned && (this.item.input[e].default = this._configuration.uniforms["u" + t.name].tunned)
				}
				var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Export", !0);
				n.target = this.node, n.setUserData(this.item), cc.systemEvent.dispatchEvent(n)
			},
			onRandom: function() {
				this._spineIndex += 1, 9 == this._spineIndex && (this._spineIndex = 0);
				var e = this;
				cc.loader.loadRes("ssr/shaderfx-editor/spine/spine-test/" + ["raptor", "spineboy-pro", "stretchyman-pro", "alien-ess", "mix-and-match-pro", "owl-pro", "powerup-ess", "windmill-ess", "goblins"][this._spineIndex], sp.SkeletonData, function(t, n) {
					t ? cc.log("err ", t) : e.uniformSpineSkeletonPrefab.getComponent("ShaderFXPrefabUniformSpineSkeleton").onValueChangedSpine(n)
				})
			},
			onRandomPng: function() {
				var e = this;
				this._textureIndex += 1, 12 == this._textureIndex && (this._textureIndex = 0);
				var t = this;
				cc.loader.loadRes("ssr/shaderfx-editor/texture/texture-test/" + (this._textureIndex + 1), cc.SpriteFrame, function(n, o) {
					n ? cc.log("err ", n) : (e.textureCache = o.getTexture(), t.ShaderFXPrefabFXPanel.getComponent("ShaderFXPrefabPanel")._uniformOutput.onLoadSpriteFrameCallback(n, o, "name"))
				})
			},
			exportMTL: function(e, t) {
				for (var n = {
						__type__: "cc.Material",
						_name: t.name,
						_objFlags: 0,
						_native: "",
						_effectAsset: {
							__uuid__: e || o.uuidv4()
						},
						_techniqueIndex: 0,
						_techniqueData: {
							0: {
								props: {},
								defines: {
									USE_TEXTURE: !0
								}
							}
						}
					}, i = 0; i < t.input.length; i++) {
					var a = t.input[i];
					"float" != a.type || a.isTime ? "bool" == a.type || ("vec2" == a.type ? a.isUV0 || (this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + a.name] && this._configuration.uniforms["u" + a.name].tunned ? n._techniqueData[0].props["u" + a.name] = {
						__type__: "cc.Vec2",
						x: parseFloat(this._configuration.uniforms["u" + a.name].tunned.split(",")[0]),
						y: parseFloat(this._configuration.uniforms["u" + a.name].tunned.split(",")[1])
					} : n._techniqueData[0].props["u" + a.name] = {
						__type__: "cc.Vec2",
						x: parseFloat(t.input[i].default.split(",")[0]),
						y: parseFloat(t.input[i].default.split(",")[1])
					}) : "vec3" == a.type ? this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + a.name] && this._configuration.uniforms["u" + a.name].tunned ? n._techniqueData[0].props["u" + a.name] = {
						__type__: "cc.Vec3",
						x: parseFloat(this._configuration.uniforms["u" + a.name].tunned.split(",")[0]),
						y: parseFloat(this._configuration.uniforms["u" + a.name].tunned.split(",")[1]),
						z: parseFloat(this._configuration.uniforms["u" + a.name].tunned.split(",")[2])
					} : n._techniqueData[0].props["u" + a.name] = {
						__type__: "cc.Vec3",
						x: parseFloat(t.input[i].default.split(",")[0]),
						y: parseFloat(t.input[i].default.split(",")[1]),
						z: parseFloat(t.input[i].default.split(",")[2])
					} : "vec4" != a.type || a.isMainTexture ? "sampler2D" != a.type || a.isMainTexture || (n._techniqueData[0].props["u" + a.name] = "") : a.isColor ? this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + a.name] && this._configuration.uniforms["u" + a.name].tunned ? n._techniqueData[0].props["u" + a.name] = {
						__type__: "cc.Color",
						r: parseInt(this._configuration.uniforms["u" + a.name].tunned.r),
						g: parseInt(this._configuration.uniforms["u" + a.name].tunned.g),
						b: parseInt(this._configuration.uniforms["u" + a.name].tunned.b),
						a: parseInt(this._configuration.uniforms["u" + a.name].tunned.a)
					} : (a.value = cc.color(t.input[i].default), n._techniqueData[0].props["u" + a.name] = {
						__type__: "cc.Color",
						r: parseInt(a.value.r),
						g: parseInt(a.value.g),
						b: parseInt(a.value.b),
						a: parseInt(a.value.a)
					}) : this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + a.name] && this._configuration.uniforms["u" + a.name].tunned ? n._techniqueData[0].props["u" + a.name] = {
						__type__: "cc.Vec4",
						x: parseFloat(this._configuration.uniforms["u" + a.name].tunned.split(",")[0]),
						y: parseFloat(this._configuration.uniforms["u" + a.name].tunned.split(",")[1]),
						z: parseFloat(this._configuration.uniforms["u" + a.name].tunned.split(",")[2]),
						w: parseFloat(this._configuration.uniforms["u" + a.name].tunned.split(",")[3])
					} : n._techniqueData[0].props["u" + a.name] = {
						__type__: "cc.Vec4",
						x: parseFloat(t.input[i].default.split(",")[0]),
						y: parseFloat(t.input[i].default.split(",")[1]),
						z: parseFloat(t.input[i].default.split(",")[2]),
						w: parseFloat(t.input[i].default.split(",")[3])
					}) : this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + a.name] && this._configuration.uniforms["u" + a.name].tunned ? n._techniqueData[0].props["u" + a.name] = parseFloat(this._configuration.uniforms["u" + a.name].tunned) : n._techniqueData[0].props["u" + a.name] = parseFloat(t.input[i].default)
				}
				"undefined" == typeof Editor || Editor.App ? window.download(JSON.stringify(n, null, 4), t.name + ".mtl", "application/json") : Editor.assetdb.create("db://assets/" + t.name + ".mtl", JSON.stringify(n, null, 4))
			},
			getLocal: function(e) {
				for (var t = 0; t < this._customComponentPrefabArray.length; t++)
					if (this._customComponentPrefabArray[t].getComponent("ShaderFXPrefabFXComponentPrefab").info.uuid == e) return this._customComponentPrefabArray[t];
				return null
			},
			isInLocal: function() {
				return !1
			},
			onUpdateOnlineFXComponentList: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Message.show", !0);
				e.target = this.node, e.setUserData(window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5217\u8868\u83b7\u53d6\u4e2d\uff0c\u8bf7\u7a0d\u540e ......" : "List loading, please wait ......"), cc.systemEvent.dispatchEvent(e), this.onlineContent.active ? i.listCustomComponentByCategory(this.__index, this.listCustomComponentByCategoryCallback.bind(this), this.listCustomComponentByCategoryCallback.bind(this)) : i.listOnlineFXComponentList(this.listOnlineFXComponentList.bind(this), this.listOnlineFXComponentList.bind(this))
			},
			_touchStartCallback: function(e) {
				e.stopPropagation()
			},
			_touchMoveCallback: function(e) {
				e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				this.node.active = !1, e.stopPropagation()
			},
			_touchCancelCallback: function(e) {
				e.stopPropagation()
			}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerFooter: [function(e, t) {
		"use strict";
		cc._RF.push(t, "0f6c8IXcOdPTbXlM8pr4zrj", "DigraphEditorLayerFooter");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Layer.Footer = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				command: cc.Label,
				projectName: cc.Label,
				accountName: cc.Label,
				accountTitle: cc.Label,
				zhButton: cc.Button,
				enButton: cc.Button
			},
			onLoad: function() {
				window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? this.enButton.node.active = !1 : this.zhButton.node.active = !1, this.accountTitle.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u767b\u5f55\u7528\u6237 : ???" : "Current User : ???"
			},
			onLanguageZh: function() {
				this.enButton.node.active = !0, this.zhButton.node.active = !1, cc.sys.localStorage.setItem("ssrfx_language", cc.sys.LANGUAGE_ENGLISH), n.DigraphEditor.Director.showToast("Language changed, please restart the editor ......")
			},
			onLanguageEn: function() {
				this.enButton.node.active = !1, this.zhButton.node.active = !0, cc.sys.localStorage.setItem("ssrfx_language", cc.sys.LANGUAGE_CHINESE), n.DigraphEditor.Director.showToast("\u8bed\u8a00\u4fee\u6539\u6210\u529f\uff0c\u91cd\u65b0\u7f16\u8f91\u5668\u540e\u751f\u6548 ......")
			},
			start: function() {
				cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.Offline", this._onAccountOffline, this), cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.LoginSuccess", this._onAccountLoginSuccess, this)
			},
			_onAccountLoginSuccess: function(e) {
				this.accountTitle.string = (window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u767b\u5f55\u7528\u6237 : " : "Current User : ") + e.getUserData().getUsername(), this.accountTitle.node.color = cc.color("#20FF07"), this.accountTitle.node.opacity = 255
			},
			_onAccountOffline: function() {
				this.accountTitle.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u79bb\u7ebf\u6a21\u5f0f\uff0c\u90e8\u5206\u529f\u80fd\u5c06\u65e0\u6cd5\u4f7f\u7528" : "Offline mode. Some features will be disabled"
			},
			onProjectList: function() {
				if ("Offline" == this.accountName.string) {
					var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Footer.AccountLayer", !0);
					cc.systemEvent.dispatchEvent(e)
				}
			},
			onProjectRename: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Footer.ProjectRename", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			_onCommandManagerDo: function() {},
			_onCommandManagerUnDo: function() {},
			_onCommandManagerReDo: function() {},
			_onProjectUpdateName: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerGroup: [function(e, t) {
		"use strict";
		cc._RF.push(t, "5dbd7W7Ey5GAZLMEB589KRB", "DigraphEditorLayerGroup");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Layer.Group = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				layerCanvas: cc.Node,
				groupPrefab: cc.Prefab
			},
			onLoad: function() {
				this._groups = []
			},
			start: function() {},
			reset: function() {
				this.node.removeAllChildren(!0)
			},
			_touchStartCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Group.TouchStart", !0);
				t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchMoveCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Group.TouchMove", !0);
				t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchEndCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Group.TouchEnd", !0);
				t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchCancelCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Group.TouchCancel", !0);
				t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			addGroup: function(e) {
				var t = cc.instantiate(this.groupPrefab);
				return this.node.addChild(t), this._groups.push(t), t.getComponent(n.DigraphEditor.Prefab.Group).init(e), t
			},
			removeGroup: function(e) {
				for (var t = e.getComponent(n.DigraphEditor.Prefab.Group).getPanels(), o = t.length - 1; o >= 0; o--) t[o].removeFromParent(!1), this.layerCanvas.addChild(t[o]);
				e.removeFromParent(!0);
				var i = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Group.RemoveGroup", !0);
				return i.setUserData(event), cc.systemEvent.dispatchEvent(i), e
			},
			moveGroup: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerInputField: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c42e4jvPcBCWYVqsuz9O1st", "DigraphEditorLayerInputField"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Layer.InputField = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				content: cc.Label,
				editBox: cc.EditBox
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this)
			},
			onConfirm: function() {
				this.node.active = !1, this._callbacks && this._callbacks.onConfirm && this._callbacks.onConfirm(this.editBox.string)
			},
			onCancel: function() {
				this.node.active = !1, this._callbacks && this._callbacks.onCancel && this._callbacks.onCancel()
			},
			show: function(e, t) {
				this._callbacks = t, this.content.string = e, this.node.active = !0
			},
			_touchStartCallback: function() {},
			_touchMoveCallback: function() {},
			_touchEndCallback: function() {},
			_touchCancelCallback: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerMessageBox: [function(e, t) {
		"use strict";
		cc._RF.push(t, "ef2c2NieQ5JkIQ+XXkEpLQK", "DigraphEditorLayerMessageBox"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Layer.MessageBox = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				content: cc.Label
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this)
			},
			onConfirm: function() {
				this.node.active = !1, this._callbacks && this._callbacks.onConfirm && this._callbacks.onConfirm()
			},
			onCancel: function() {
				this.node.active = !1, this._callbacks && this._callbacks.onCancel && this._callbacks.onCancel()
			},
			show: function(e, t) {
				this._callbacks = t, this.content.string = e, this.node.active = !0
			},
			_touchStartCallback: function() {},
			_touchMoveCallback: function() {},
			_touchEndCallback: function() {},
			_touchCancelCallback: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerMessageLayer: [function(e, t) {
		"use strict";
		cc._RF.push(t, "42ff0M/RidIb47TXjiCYfAH", "DigraphEditorLayerMessageLayer"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Layer.Message = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				content: cc.Label
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this)
			},
			show: function(e) {
				this.content.string = e, this.node.active = !0
			},
			dismiss: function() {
				this.node.active = !1
			},
			_touchStartCallback: function() {},
			_touchMoveCallback: function() {},
			_touchEndCallback: function() {},
			_touchCancelCallback: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "bf9demD1uFLd5JLezZ74+5j", "DigraphEditorLayerPanel");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Layer.Panel = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				layerCanvas: cc.Node
			},
			onLoad: function() {},
			start: function() {},
			createPanel: function(e, t) {
				var o = cc.instantiate(t.prefab);
				this.layerCanvas.addChild(o), o.getComponent(n.DigraphEditor.Prefab.Panel).setPanelID(e), o.getComponent(n.DigraphEditor.Prefab.Panel).init(t);
				var i = new n.DigraphEditor.Data.DigraphNode(o);
				i.init(o), o.getComponent(n.DigraphEditor.Prefab.Panel).setDigraphNode(i);
				var a = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Panel.Create", !0);
				return a.setUserData(this.node), cc.systemEvent.dispatchEvent(a), o
			},
			removePanel: function(e, t) {
				void 0 === t && (t = !0);
				var n = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Panel.Remove", !0);
				n.setUserData(this.node), cc.systemEvent.dispatchEvent(n), e.removeFromParent(!0)
			},
			restorePanel: function(e) {
				this.layerCanvas.addChild(e);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Panel.Restore", !0);
				t.setUserData(this.node), cc.systemEvent.dispatchEvent(t)
			},
			_touchStartCallback: function() {
				cc.log("_touchStartCallback2");
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Panel.TouchStart", !0);
				e.setUserData(this.node), cc.systemEvent.dispatchEvent(e)
			},
			_touchMoveCallback: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Panel.TouchMove", !0);
				e.setUserData(this.node), cc.systemEvent.dispatchEvent(e)
			},
			_touchEndCallback: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Panel.TouchEnd", !0);
				e.setUserData(this.node), cc.systemEvent.dispatchEvent(e)
			},
			_touchCancelCallback: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Panel.TouchCancel", !0);
				e.setUserData(this.node), cc.systemEvent.dispatchEvent(e)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerProjectGallery: [function(e, t) {
		"use strict";
		cc._RF.push(t, "0919fZUTNlMh5OHVz3exucd", "DigraphEditorLayerProjectGallery");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = e("../../shader-fx/util/ShaderFXLeanCloudUtil");
		n.DigraphEditor.Layer.ProjectGallery = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				content: cc.Node,
				galleryPrefab: cc.Prefab,
				title: cc.Label
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), this.title.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "Shader \u7279\u6548\u5e93" : "Shader Gallery"
			},
			onEnable: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.ProjectGallery.ListGallery", !0);
				cc.systemEvent.dispatchEvent(e);
				var t = this;
				o.listGallery(function(e) {
					var n = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.ProjectGallery.ListGallerySuccess", !0);
					cc.systemEvent.dispatchEvent(n), t.initList(e.results)
				}, function() {
					var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.ProjectGallery.ListGalleryFail", !0);
					cc.systemEvent.dispatchEvent(e)
				})
			},
			init: function() {},
			initList: function(e) {
				this.content.removeAllChildren(!0);
				for (var t = 0; t < e.length; t++) {
					var n = cc.instantiate(this.galleryPrefab);
					this.content.addChild(n, -999), n.getComponent("ShaderFXGalleryPrefab").init(e[t])
				}
			},
			_touchStartCallback: function() {},
			_touchMoveCallback: function() {},
			_touchEndCallback: function() {
				this.node.active = !1
			},
			_touchCancelCallback: function() {},
			onClose: function() {
				this.node.active = !1
			}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerProjectList: [function(e, t) {
		"use strict";
		cc._RF.push(t, "23716SvXwhHVq7h7f/rGeRn", "DigraphEditorLayerProjectList");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = e("../../shader-fx/util/ShaderFXLeanCloudUtil");
		n.DigraphEditor.Layer.ProjectList = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				content: cc.Node,
				projectInfoPrefab: cc.Prefab,
				title: cc.Label
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), this.title.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u6211\u7684\u9879\u76ee" : "My Projects"
			},
			onEnable: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.ProjectList.ListProject", !0);
				cc.systemEvent.dispatchEvent(e);
				var t = this;
				o.listProject(function(e) {
					var n = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.ProjectList.ListProjectSuccess", !0);
					cc.systemEvent.dispatchEvent(n), t.initList(e.results)
				}, function() {
					var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.ProjectList.ListProjectFail", !0);
					cc.systemEvent.dispatchEvent(e)
				})
			},
			init: function() {},
			initList: function(e) {
				this.content.removeAllChildren(!0);
				for (var t = 0; t < e.length; t++) {
					var n = cc.instantiate(this.projectInfoPrefab);
					this.content.addChild(n, -999), n.getComponent("ShaderFXPrefabProjectInfo").init(e[t])
				}
			},
			removeItem: function(e) {
				for (var t = 0; t < this.content.getChildren().length; t++) {
					var n = this.content.getChildren()[t];
					if (n.getComponent("ShaderFXPrefabProjectInfo").info.objectId == e) {
						n.removeFromParent(!0);
						break
					}
				}
			},
			_touchStartCallback: function() {},
			_touchMoveCallback: function() {},
			_touchEndCallback: function() {
				this.node.active = !1
			},
			_touchCancelCallback: function() {},
			onClose: function() {
				this.node.active = !1
			}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerSelection: [function(e, t) {
		"use strict";
		cc._RF.push(t, "592d1GN2lFP07EZHVo7Xnmz", "DigraphEditorLayerSelection"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Layer.Selection = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {},
			onLoad: function() {
				this._selectionRect = cc.rect(0, 0, 0, 0)
			},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), this._renderNode = new cc.Node, this.node.addChild(this._renderNode), this._render = this._renderNode.addComponent(cc.Graphics), this._render.strokeColor = cc.color(0, 245, 255, 255)
			},
			_touchStartCallback: function(e) {
				this._selectionRect = cc.rect(0, 0, 0, 0);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Selection.TouchStart", !0);
				t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchMoveCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Selection.TouchMove", !0);
				t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchEndCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Selection.TouchEnd", !0);
				t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchCancelCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Selection.TouchCancel", !0);
				t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			drawSelectionStart: function(e) {
				this._render.lineWidth = 2 / this.node.parent.scale, this._selectPosition = e
			},
			drawSelection: function(e) {
				this._render.clear(), this._render.moveTo(this._selectPosition.x, this._selectPosition.y), this._selectionRect.x = Math.min(this._selectPosition.x, e.x), this._selectionRect.y = Math.min(this._selectPosition.y, e.y), this._selectionRect.width = Math.abs(this._selectPosition.x - e.x), this._selectionRect.height = Math.abs(this._selectPosition.y - e.y), this._render.rect(this._selectionRect.x, this._selectionRect.y, this._selectionRect.width, this._selectionRect.height), this._render.stroke()
			},
			drawSelectionEnd: function() {
				this._render.clear()
			},
			getSelection: function() {
				return this._selectionRect
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerTexturePreview: [function(e, t) {
		"use strict";
		cc._RF.push(t, "f312flN+xpAqZfsgZTtbf3i", "DigraphEditorLayerTexturePreview"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Layer.TexturePreview = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				content: cc.Label,
				_propertyValue: null,
				propertyValue: {
					get: function() {
						return this._propertyValue
					},
					set: function(e) {
						this._propertyValue !== e && (this._propertyValue = e)
					},
					type: cc.Sprite
				}
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this)
			},
			show: function(e) {
				this.node.active = !0;
				var t = .9 * cc.winSize.height;
				this.propertyValue.spriteFrame = e, e.getOriginalSize().height > t ? this.propertyValue.node.scale = t / e.getOriginalSize().height : this.propertyValue.spriteFrame = e, this.propertyValue.sizeMode = 2
			},
			_touchStartCallback: function() {},
			_touchMoveCallback: function() {},
			_touchEndCallback: function() {
				this.node.active = !1
			},
			_touchCancelCallback: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerTutorial: [function(e, t) {
		"use strict";
		cc._RF.push(t, "afd64jjtdBFxJrvijzBrrgG", "DigraphEditorLayerTutorial"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Layer.Tutorial = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				title: cc.Label
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), this.title.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u4f7f\u7528\u624b\u518c" : "User Guide"
			},
			_touchStartCallback: function() {},
			_touchMoveCallback: function() {},
			_touchEndCallback: function() {
				this.node.active = !1
			},
			_touchCancelCallback: function() {},
			onVideo: function(e, t) {
				var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Video", !0);
				n.target = this.node, n.setUserData(t), cc.systemEvent.dispatchEvent(n)
			},
			onInfo: function(e, t) {
				"undefined" != typeof Editor ? window.__electron.shell.openExternal(t) : cc.sys.openURL(t)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorLayerVideo: [function(e, t) {
		"use strict";
		cc._RF.push(t, "95b7ea1fg1CQLWT+wAaSFEp", "DigraphEditorLayerVideo"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Layer.Video = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				player: cc.VideoPlayer,
				titleLabel: cc.Label
			},
			onLoad: function() {},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), this.titleLabel.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u89c6\u9891\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e ......" : "Video loading, please wait ......"
			},
			onVideoPlayerEvent: function(e, t) {
				switch (t) {
					case cc.VideoPlayer.EventType.PLAYING:
					case cc.VideoPlayer.EventType.PAUSED:
					case cc.VideoPlayer.EventType.STOPPED:
					case cc.VideoPlayer.EventType.COMPLETED:
					case cc.VideoPlayer.EventType.META_LOADED:
					case cc.VideoPlayer.EventType.CLICKED:
					case cc.VideoPlayer.EventType.READY_TO_PLAY:
						e.isPlaying() || (this.titleLabel.node.active = !1, e.play())
				}
			},
			show: function(e) {
				this.titleLabel.node.active = !0, this.node.active = !0, this.player.remoteURL = e, this.player.play()
			},
			_touchStartCallback: function(e) {
				e.stopPropagation()
			},
			_touchMoveCallback: function(e) {
				e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				this.player.isPlaying() && this.player.stop(), this.node.active = !1, e.stopPropagation()
			},
			_touchCancelCallback: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorMenu: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7c6a5X+3ZtOM63M+xQW1qgR", "DigraphEditorMenu"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Component.Menu = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				menuGroupFile: cc.Node,
				menuGroupCanvas: cc.Node,
				menuGroupCommand: cc.Node,
				menuGroupSetting: cc.Node
			},
			onLoad: function() {},
			start: function() {
				this._autoDimFlag = !1, this._autoConnectFlag = !1, this._autoHintFlag = !1, cc.systemEvent.on("ssr.DigraphEditor.Layer.Canvas.TouchStart", this._onLayerCanvasTouchStart, this)
			},
			onFile: function() {
				this.menuGroupFile.active ? this.menuGroupFile.active = !1 : (this.menuGroupFile.active = !0, this.menuGroupCanvas.active = !1, this.menuGroupCommand.active = !1, this.menuGroupSetting.active = !1)
			},
			onCanvas: function() {
				this.menuGroupCanvas.active ? this.menuGroupCanvas.active = !1 : (this.menuGroupCanvas.active = !0, this.menuGroupFile.active = !1, this.menuGroupCommand.active = !1, this.menuGroupSetting.active = !1)
			},
			onCommand: function() {
				this.menuGroupCommand.active ? this.menuGroupCommand.active = !1 : (this.menuGroupCommand.active = !0, this.menuGroupCanvas.active = !1, this.menuGroupFile.active = !1, this.menuGroupSetting.active = !1)
			},
			onSetting: function() {
				this.menuGroupSetting.active ? this.menuGroupSetting.active = !1 : (this.menuGroupSetting.active = !0, this.menuGroupCommand.active = !1, this.menuGroupCanvas.active = !1, this.menuGroupFile.active = !1)
			},
			onNewFile: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.NewProject", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onExportFile: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.ExportProject", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onImportFile: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.ImportProject", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onUndo: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.Undo", !0);
				cc.systemEvent.dispatchEvent(e), this.collapseAll()
			},
			onRedo: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.Redo", !0);
				cc.systemEvent.dispatchEvent(e), this.collapseAll()
			},
			onCreatePanel: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.CreatePanel", !0);
				cc.systemEvent.dispatchEvent(e), this.collapseAll()
			},
			onAutoDim: function(e) {
				this._autoDimFlag ? (this._autoDimFlag = !1, e.target.getChildByName("Label").getComponent(cc.Label).string = "Auto Dim On") : (this._autoDimFlag = !0, e.target.getChildByName("Label").getComponent(cc.Label).string = "Auto Dim On");
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.AutoDim", this._autoDimFlag);
				cc.systemEvent.dispatchEvent(t)
			},
			onAutoConnect: function(e) {
				this._autoConnectFlag ? (this._autoConnectFlag = !1, e.target.getChildByName("Label").getComponent(cc.Label).string = "Auto Connect Off") : (e.target.getChildByName("Label").getComponent(cc.Label).string = "Auto Connect On", this._autoConnectFlag = !0);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.AutoConnect", this._autoDimFlag);
				cc.systemEvent.dispatchEvent(t)
			},
			onAutoHint: function(e) {
				this._autoHintFlag ? (this._autoHintFlag = !1, e.target.getChildByName("Label").getComponent(cc.Label).string = "Auto Hint On") : (this._autoHintFlag = !0, e.target.getChildByName("Label").getComponent(cc.Label).string = "Auto Hint On");
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.AutoHint", this._autoHintFlag);
				cc.systemEvent.dispatchEvent(t)
			},
			onCanvasMove: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.CanvasMove", !0);
				cc.systemEvent.dispatchEvent(e), this.collapseAll()
			},
			onGroup: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.Group", !0);
				cc.systemEvent.dispatchEvent(e), this.collapseAll()
			},
			onUngroup: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.Ungroup", !0);
				cc.systemEvent.dispatchEvent(e), this.collapseAll()
			},
			onZoomIn: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.ZoomIn", !0);
				cc.systemEvent.dispatchEvent(e), this.collapseAll()
			},
			onZoomOut: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.ZoomOut", !0);
				cc.systemEvent.dispatchEvent(e), this.collapseAll()
			},
			onZoomReset: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.HeaderMenu.ZoomReset", !0);
				cc.systemEvent.dispatchEvent(e), this.collapseAll()
			},
			_onLayerCanvasTouchStart: function() {
				this.collapseAll()
			},
			collapseAll: function() {
				this.menuGroupCommand.active = !1, this.menuGroupCanvas.active = !1, this.menuGroupFile.active = !1, this.menuGroupSetting.active = !1
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorNamespace: [function(e, t) {
		"use strict";
		cc._RF.push(t, "4873d4VdhpIB5KicJJKO4Ur", "DigraphEditorNamespace");
		var n = n || {};
		n.DigraphEditor = n.DigraphEditor || {}, n.DigraphEditor.Component = n.DigraphEditor.Component || {}, n.DigraphEditor.Const = n.DigraphEditor.Const || {}, n.DigraphEditor.Data = n.DigraphEditor.Data || {}, n.DigraphEditor.Util = n.DigraphEditor.Util || {}, n.DigraphEditor.Command = n.DigraphEditor.Command || {}, n.DigraphEditor.Command.Panel = n.DigraphEditor.Command.Panel || {}, n.DigraphEditor.Command.Connection = n.DigraphEditor.Command.Connection || {}, n.DigraphEditor.Command.Canvas = n.DigraphEditor.Command.Canvas || {}, n.DigraphEditor.Command.Selection = n.DigraphEditor.Command.Selection || {}, n.DigraphEditor.Command.Group = n.DigraphEditor.Command.Group || {}, n.DigraphEditor.Command.Digraph = n.DigraphEditor.Command.Digraph || {}, n.DigraphEditor.Manager = n.DigraphEditor.Manager || {}, n.DigraphEditor.Prefab = n.DigraphEditor.Prefab || {}, n.DigraphEditor.Layer = n.DigraphEditor.Layer || {}, n.DigraphEditor.Editor = n.DigraphEditor.Editor || {}, t.exports = n, e("../util/DigraphEditorUtil.js"), cc._RF.pop()
	}, {
		"../util/DigraphEditorUtil.js": "DigraphEditorUtil"
	}],
	DigraphEditorPanelManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "88aa7FjmsRMyqeBetaW/w43", "DigraphEditorPanelManager");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Manager.Panel = cc.Class({
			ctor: function() {
				this._panels = [], this._selectedPanels = [], this._deselectedPanels = [], this._panelTouchStartPositionArray = [], this._panelID = 0, this._autoConnect = !1, this._autoDim = !1, this._templatesLoaded = !1, this._templates = {}, this._globalUniforms = {}
			},
			getUniformPanel: function(e) {
				return this._globalUniforms[e].panels[0]
			},
			hasGlobalUniforms: function(e) {
				return void 0 !== this._globalUniforms[e]
			},
			getGlobalUniforms: function() {
				return this._globalUniforms
			},
			updateGlobalUniformKey: function(e, t, n, o, i) {
				var a = t.split("_").length > 1;
				null != this._globalUniforms[e] ? "float" == n ? this.addGlobalUniform(t, this._globalUniforms[e].value, n, i) : a ? this.addGlobalUniform(t.split("_")[0], this._globalUniforms[e].value, n, i) : this.addGlobalUniform(t, this._globalUniforms[e].value, n, i) : this.addGlobalUniform(a ? t.split("_")[0] : t, o, n, i), a ? e != t.split("_")[0] && this.removeGlobalUniform(e, i) : e != t && this.removeGlobalUniform(e, i), a ? i.getComponent("ShaderFXPrefabPanel").updateUniformKey(t.split("_")[0]) : i.getComponent("ShaderFXPrefabPanel").updateUniformKey(t), null != o && this.projectInfoLayer.updateGlobalUniformValue(t, o)
			},
			updateGlobalUniformValue: function(e, t) {
				var n = e.split("_").length > 1,
					o = n ? e.split("_")[0] : e,
					i = e.split("_")[1];
				if (this._globalUniforms[o]) {
					n ? ("X" == i && (this._globalUniforms[o].value[0] = t), "Y" == i && (this._globalUniforms[o].value[1] = t)) : this._globalUniforms[e].value = t;
					for (var a = 0; a < this._globalUniforms[o].panels.length; a++) this._globalUniforms[o].panels[a].getComponent("ShaderFXPrefabPanel").updateUniformValue(e, t, !1);
					this.projectInfoLayer.updateGlobalUniformValue(e, t)
				}
			},
			addGlobalUniform: function(e, t, n, o) {
				if (this._globalUniforms[e]) {
					for (var i = !1, a = 0; a < this._globalUniforms[e].panels.length; a++)
						if (this._globalUniforms[e].panels[a] == o) {
							i = !0;
							break
						}
					i || (this._globalUniforms[e].panels.push(o), this.projectInfoLayer.addPanel(e, o))
				} else this._globalUniforms[e] = {
					value: t,
					panels: [o]
				}, this.projectInfoLayer.addGlobalUniform(e, t, n, o)
			},
			removeGlobalUniform: function(e, t) {
				if (this._globalUniforms[e]) {
					for (var n = 0; n < this._globalUniforms[e].panels.length; n++)
						if (this._globalUniforms[e].panels[n] == t) {
							this._globalUniforms[e].panels.splice(n, 1), this.projectInfoLayer.removePanel(e, t);
							break
						}
					0 == this._globalUniforms[e].panels.length && (delete this._globalUniforms[e], this.projectInfoLayer.removeGlobalUniformKey(e))
				}
			},
			init: function(e, t, n, o, i) {
				this.layerCanvas = e, this.panelLayer = t, this.contextMenu = n, this.projectInfoLayer = o, this.loadTemplates(i)
			},
			reset: function() {
				for (var e = 0; e < this._panels.length; e++) this._panels[e].removeFromParent(!0);
				this._panels = [], this._selectedPanels = [], this._deselectedPanels = [], this._panelTouchStartPositionArray = [], this._panelID = 0
			},
			getOutputPanel: function() {
				for (var e = 0; e < this._panels.length; e++) {
					var t = this._panels[e];
					if ("Output" == this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration().name) return t
				}
			},
			getCoolPanel: function() {
				for (var e = 0; e < this._panels.length; e++) {
					var t = this._panels[e];
					if ("Output" == this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration().name) return t
				}
			},
			getCoolPanel2: function() {
				for (var e = 0; e < this._panels.length; e++) {
					var t = this._panels[e];
					if ("SimpleNoise" == this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration().name) return t
				}
			},
			getMainTexturePanel: function() {
				for (var e = 0; e < this._panels.length; e++) {
					var t = this._panels[e];
					if ("MainTexture" == this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration().name) return t
				}
			},
			getSpinePanel: function() {
				for (var e = 0; e < this._panels.length; e++) {
					var t = this._panels[e];
					if ("SpineSkeleton" == this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration().name) return t
				}
			},
			loadComponent: function(e, t) {
				var n = e.substring(e.lastIndexOf("/"));
				if (this._templates[n]) t(this._templates[n]);
				else {
					var o = this;
					cc.loader.loadRes("ssr/shaderfx-editor/configuration/core/" + e, cc.JsonAsset, function(e, i) {
						o._templates[n] = i.json, t(o._templates[n])
					})
				}
			},
			loadTemplates: function(e) {
				this._customComponents = e, cc.loader.loadRes("ssr/shaderfx-editor/configuration/components.json", cc.JsonAsset, this.loadComponentsCallback.bind(this))
			},
			updateComponent: function(e) {
				for (var t = e, n = JSON.parse(t.component), o = {
						key: n.name,
						value: n
					}, i = !1, a = !1, r = 0; r < this._templates.length; r++)
					if (this._templates[r].value.uuid == o.value.uuid) {
						e.oldFolder && (a = !0), this._templates[r] = o, i = !0;
						break
					}
				if (i) {
					if (a) {
						var s = JSON.parse(t.folder);
						s.fx = t.fx, this.contextMenu.removeComponent(e.oldFolder, o), this.contextMenu.updateComponent(s, o)
					}
				} else {
					this._templates.push(o);
					var c = JSON.parse(t.folder);
					c.fx = t.fx, this.contextMenu.updateComponent(c, o)
				}
				return null
			},
			removeComponent: function(e) {
				for (var t = e, n = t.component ? JSON.parse(t.component) : t, o = {
						key: n.name,
						value: n
					}, i = 0; i < this._templates.length; i++)
					if (this._templates[i].value.uuid == o.value.uuid) {
						this._templates.splice(i, 1);
						break
					}
				this.contextMenu.removeComponent(t.category ? cc.js.isString(t.category) ? JSON.parse(t.category) : t.category : cc.js.isString(t.folder) ? JSON.parse(t.folder) : t.folder, o)
			},
			loadComponentsCallback: function(e, t) {
				this.PANELS = t.json, this._templates = [];
				var n = [];
				this._folderArray = [], this._overloadArray = [], this._overloadZArray = [];
				for (var o = 0; o < this.PANELS.length; o++)
					for (var i = this.PANELS[o], a = 0; a < i.components.length; a++)
						if (i.components[a].overload)
							for (var r = 0; r < i.components[a].overload.length; r++) n.push("ssr/shaderfx-editor/configuration/core/" + i.name + "/" + i.components[a].name + i.components[a].overload[r]), this._folderArray.push(i.name), this._overloadArray.push(!0), this._overloadZArray.push(i.components[a].overload[r]);
						else n.push("ssr/shaderfx-editor/configuration/core/" + i.name + "/" + i.components[a].name), this._folderArray.push(i.name), this._overloadArray.push(!1), this._overloadZArray.push(0);
				for (o = 0; o < this._customComponents.length; o++)
					for (i = this._customComponents[o], a = 0; a < i.components.length; a++) this._templates.push({
						key: i.components[a].name,
						value: i.components[a]
					});
				for (o = 0; o < this._customComponents.length; o++) {
					var s = !1;
					for (a = 0; a < this.PANELS.length; a++)
						if (this._customComponents[o].isFX) {
							if (this.PANELS[a].name == this._customComponents[o].name && this.PANELS[a].isFX) {
								s = !0;
								break
							}
						} else if (this.PANELS[a].name == this._customComponents[o].name && !this.PANELS[a].isFX && this.PANELS[a].isCustom) {
						s = !0;
						break
					}
					s ? Array.prototype.push.apply(this.PANELS[a].components, this._customComponents[o].components) : this.PANELS.push(this._customComponents[o])
				}
				console.log("this.PANELS  "), console.log(this.PANELS), cc.loader.loadResArray(n, this.loadTemplatesProgressCallback.bind(this), this.loadTemplatesCallback.bind(this)), this.loadPrefabs()
			},
			loadTemplatesProgressCallback: function() {},
			loadTemplatesCallback: function(e, t) {
				if (e) cc.warn(e);
				else {
					for (var n = 0; n < t.length; n++) t[n].json.folder = this._folderArray[n], t[n].json.overload = this._overloadArray[n], t[n].json.overloadZ = this._overloadZArray[n], this._templates.push({
						key: t[n].name,
						value: t[n].json
					});
					console.log("this.contextMenu.init(this.PANELS, this._templates); //"), this.contextMenu.init(this.PANELS, this._templates), this._templatesLoaded = !0;
					var o = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Panel.LoadTemplatesDone", !0);
					cc.systemEvent.dispatchEvent(o)
				}
			},
			isTemplatesLoaded: function() {
				return this._templatesLoaded
			},
			getConfiguration: function(e) {
				if (cc.js.isString(e)) {
					for (var t = 0; t < this._templates.length; t++)
						if (this._templates[t].value.name == e) return this._templates[t].value
				} else if (e.custom) {
					for (t = 0; t < this._templates.length; t++)
						if (this._templates[t].value.uuid == e.uuid) return this._templates[t].value;
					for (t = 0; t < this._templates.length; t++)
						if (!this._templates[t].value.custom && this._templates[t].value.name == e.name) return this._templates[t].value
				} else
					for (t = 0; t < this._templates.length; t++)
						if (this._templates[t].value.name == e.name) return this._templates[t].value;
				return null
			},
			loadPrefabs: function() {
				this._prefabs = {}, cc.loader.loadResArray(["ssr/shaderfx-editor/prefab/ShaderFXPanelOutputPrefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelSpinePrefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelPrefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelScalarTypeFloatPrefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelScalarTypeVec2Prefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelScalarTypeVec3Prefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelScalarTypeVec4Prefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelScalarTypeColor4Prefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelUniformFloatPrefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelUniformVec2Prefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelUniformVec3Prefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelUniformVec4Prefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelUniformColorPrefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelUniformTexturePrefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelUniformTimePrefab", "ssr/shaderfx-editor/prefab/ShaderFXPanelUniformTime0Prefab"], this.loadPrefabsProgressCallback.bind(this), this.loadPrefabsCallback.bind(this))
			},
			loadPrefabsProgressCallback: function() {},
			loadPrefabsCallback: function(e, t) {
				for (var n = 0; n < t.length; n++) this._prefabs[t[n].name] = t[n]
			},
			getTemplates: function() {
				return this._templates
			},
			updateDim: function(e) {
				this._autoDim && e.getComponent(n.DigraphEditor.Prefab.Panel).getConnections().length <= 0 ? e.getComponent(n.DigraphEditor.Prefab.Panel).dim() : e.getComponent(n.DigraphEditor.Prefab.Panel).restoreDim()
			},
			findPanel: function(e) {
				for (var t = 0; t < this._panels.length; t++)
					if (this._panels[t].getComponent(n.DigraphEditor.Prefab.Panel).getPanelID() === e) return this._panels[t];
				return null
			},
			findPanelByName: function(e) {
				for (var t = 0; t < this._panels.length; t++)
					if (this._panels[t].getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration().name === e) return this._panels[t];
				return null
			},
			createInputPanels: function(e, t) {
				for (var n = 0; n < t.input.length; n++) {
					var o = null;
					"float" == t.input[n].type && (o = this.getConfiguration("Float")), o && (this.createPanel(o).x -= 250)
				}
			},
			clonePanel: function(e) {
				var t = this.createPanel(e.getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration());
				return t.getComponent(n.DigraphEditor.Prefab.Panel).clone(e), t
			},
			createPanel: function(e, t) {
				if (!e) return null;
				null != t ? this._panelID = t : this._panelID += 1, "Output" == e.name ? e.prefab = this._prefabs.ShaderFXPanelOutputPrefab : "SpineSkeleton" == e.name ? e.prefab = this._prefabs.ShaderFXPanelSpinePrefab : "Float" == e.name ? e.prefab = this._prefabs.ShaderFXPanelScalarTypeFloatPrefab : "UFloat" == e.name ? e.prefab = this._prefabs.ShaderFXPanelUniformFloatPrefab : "UVec2" == e.name ? e.prefab = this._prefabs.ShaderFXPanelUniformVec2Prefab : "UVec3" == e.name ? e.prefab = this._prefabs.ShaderFXPanelUniformVec3Prefab : "UVec4" == e.name ? e.prefab = this._prefabs.ShaderFXPanelUniformVec4Prefab : "UColor" == e.name ? e.prefab = this._prefabs.ShaderFXPanelUniformColorPrefab : "UTexture" == e.name ? e.prefab = this._prefabs.ShaderFXPanelUniformTexturePrefab : "UTime" == e.name ? e.prefab = this._prefabs.ShaderFXPanelUniformTimePrefab : "UTime0" == e.name ? e.prefab = this._prefabs.ShaderFXPanelUniformTime0Prefab : "Vec2" == e.name ? e.prefab = this._prefabs.ShaderFXPanelScalarTypeVec2Prefab : "Vec3" == e.name ? e.prefab = this._prefabs.ShaderFXPanelScalarTypeVec3Prefab : "Vec4" == e.name ? e.prefab = this._prefabs.ShaderFXPanelScalarTypeVec4Prefab : "Color" == e.name ? e.prefab = this._prefabs.ShaderFXPanelScalarTypeColor4Prefab : e.prefab = this._prefabs.ShaderFXPanelPrefab;
				var o = this.panelLayer.createPanel(this._panelID, e);
				return this._panels.push(o), this._autoDim && o.getComponent(n.DigraphEditor.Prefab.Panel).dim(), o
			},
			removePanel: function(e, t) {
				void 0 === t && (t = !0);
				for (var n = 0; n < this._panels.length; n++)
					if (this._panels[n] == e) return this._panels.splice(n, 1), e.getComponent("ShaderFXPrefabPanel").isUniform() && this.removeGlobalUniform(e.getComponent("ShaderFXPrefabPanel").getKey(), e), this.panelLayer.removePanel(e, t), e;
				return null
			},
			restorePanel: function(e) {
				return this.panelLayer.restorePanel(e), this._panels.push(e), e
			},
			autoDim: function(e) {
				this._autoDim = e;
				for (var t = 0; t < this._panels.length; t++) {
					var o = this._panels[t].getComponent(n.DigraphEditor.Prefab.Panel);
					o.restoreDim(), e && o.getConnections().length <= 0 && o.dim()
				}
			},
			autoConnect: function(e) {
				this._autoConnect = e
			},
			isAutoConnect: function() {
				return this._autoConnect
			},
			getPanel: function(e) {
				for (var t = 0; t < this._panels.length; t++)
					if (this._panels[t].getComponent(n.DigraphEditor.Prefab.Panel).getPanelID() == e) return this._panels[t];
				return null
			},
			getPanels: function() {
				return this._panels
			},
			getSelectedPanels: function() {
				return this._selectedPanels
			},
			getDeselectedPanels: function() {
				return this._deselectedPanels
			},
			getPanelTouchStartPosition: function() {
				return this._panelTouchStartPosition
			},
			selectionTouchStart: function() {
				this._selectedPanelsCopy = this.getSelectedPanels().slice()
			},
			getSelectedPanelsCopy: function() {
				return this._selectedPanelsCopy
			},
			moveStart: function(e) {
				if (this._panelTouchStartPosition = cc.v2(e.x, e.y), this._selectedPanels.length > 0)
					for (var t = 0; t < this._selectedPanels.length; t++) this._panelTouchStartPositionArray.push(cc.v2(this._selectedPanels[t].position))
			},
			moveBy: function(e, t) {
				if (this._selectedPanels.length > 0)
					for (var o = 0; o < this._selectedPanels.length; o++) this._selectedPanels[o].getComponent(n.DigraphEditor.Prefab.Panel).moveBy(t.x, t.y);
				else e.getComponent(n.DigraphEditor.Prefab.Panel).moveBy(t.x, t.y)
			},
			moveTo: function(e, t) {
				var n = [];
				return this._selectedPanels.length > 0 ? (t.sub(this._panelTouchStartPosition), n = this._panelTouchStartPositionArray) : n = this._panelTouchStartPosition, n
			},
			moveRestore: function(e, t) {
				if (this._selectedPanels.length > 0)
					for (var o = 0; o < this._selectedPanels.length; o++) e === this._selectedPanels[o] ? e.getComponent(n.DigraphEditor.Prefab.Panel).moveTo(t[o].x, t[o].y) : this._selectedPanels[o].getComponent(n.DigraphEditor.Prefab.Panel).moveTo(t[o].x, t[o].y);
				else e.getComponent(n.DigraphEditor.Prefab.Panel).moveTo(t.x, t.y)
			},
			select: function(e) {
				for (var t = 0; t < this._selectedPanels.length; t++)
					if (this._selectedPanels[t] === e) return;
				this._selectedPanels.push(e)
			},
			deselect: function(e) {
				for (var t = 0; t < this._selectedPanels.length; t++)
					if (this._selectedPanels[t] === e) {
						this._selectedPanels.splice(t, 1);
						break
					}
			},
			groupSelect: function(e, t) {
				return [this.selectPanels(e), this.deselectPanels(t), this.getSelectedPanelsCopy()]
			},
			selectPanels: function(e) {
				for (var t = [], o = e.length - 1; o >= 0; o--) {
					for (var i = e[o], a = !1, r = 0; r < this._selectedPanels.length; r++) this._selectedPanels[r] !== i || (a = !0);
					a || (this._selectedPanels.push(i), i.getComponent(n.DigraphEditor.Prefab.Panel).select(), t.push(i))
				}
				return t
			},
			deselectPanels: function(e) {
				e || (e = this.getSelectedPanels());
				for (var t = [], o = this._selectedPanels.length - 1; o >= 0; o--)
					for (var i = e.length - 1; i >= 0; i--) {
						var a = e[i];
						if (this._selectedPanels[o] === a) {
							this._selectedPanels.splice(o, 1), t.push(a), a.getComponent(n.DigraphEditor.Prefab.Panel).deselect();
							break
						}
					}
				return t
			},
			getFXOutPanel: function() {
				for (var e = 0; e < this._panels.length; e++) {
					var t = this._panels[e];
					if ("Output" == t.getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration().name) return t
				}
				return null
			},
			getPanelsInRect: function(e) {
				for (var t = [], o = 0; o < this._panels.length; o++) {
					var i = this._panels[o].getBoundingBox();
					i.width = this._panels[o].getComponent(n.DigraphEditor.Prefab.Panel).getMainPanel().width * this._panels[o].scaleX, i.x += i.width / 2, i.x -= 0, i.y -= 10, i.width += 0, i.height += 10, e.containsRect(i) && t.push(this._panels[o])
				}
				return t
			},
			getPanelsNotInRect: function(e) {
				for (var t = [], o = 0; o < this._panels.length; o++) {
					var i = this._panels[o].getBoundingBox();
					i.width = this._panels[o].getComponent(n.DigraphEditor.Prefab.Panel).getMainPanel().width * this._panels[o].scaleX, i.x += i.width / 2, i.x -= 0, i.y -= 10, i.width += 0, i.height += 10, e.containsRect(i) && t.push(this._panels[o])
				}
				return t
			},
			getPanelsInAndNotInRect: function(e) {
				for (var t = [], o = [], i = 0; i < this._panels.length; i++)
					if (!this._panels[i].getComponent(n.DigraphEditor.Prefab.Panel).getGroup()) {
						var a = this._panels[i].getBoundingBox();
						a.width = this._panels[i].getComponent(n.DigraphEditor.Prefab.Panel).getMainPanel().width * this._panels[i].scaleX, a.x += a.width / 2, a.x -= 0, a.y -= 10, a.width += 0, a.height += 10, e.containsRect(a) ? t.push(this._panels[i]) : o.push(this._panels[i])
					}
				return [t, o]
			},
			getConnectablePanel: function(e) {
				for (var t = 0; t < this._panels.length; t++) {
					var n = this._panels[t];
					if (this._panels[t].getBoundingBox().contains(e)) return n
				}
				return null
			},
			getConnectableInputSlotAt: function(e, t) {
				for (var o = 0; o < this._panels.length; o++) {
					var i = this._panels[o].getComponent(n.DigraphEditor.Prefab.Panel).canConnectToInputSlot(e);
					if (i) {
						var a = i.getComponent(n.DigraphEditor.Prefab.InputSlot).getType(),
							r = t.getComponent(n.DigraphEditor.Prefab.OutputSlot).getType();
						if (a == r) return i;
						if ("vec4" == a && "sampler2D" == r) return i;
						if ("vec4" == a && ("vec3" == r || "vec2" == r || "float" == r)) return i;
						if ("vec3" == a && ("vec2" == r || "float" == r)) return i;
						if ("vec2" == a && "float" == r) return i;
						if ("bool" == a && "float" == r) return i
					}
				}
				return null
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorPrefabCommand: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7488fBOBpxPhaxX9h67I8li", "DigraphEditorPrefabCommand"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Prefab.Command = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				label: cc.Label
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorPrefabConnection: [function(e, t) {
		"use strict";
		var n;
		cc._RF.push(t, "c3812Rfs9tEPJS4FND/AXrm", "DigraphEditorPrefabConnection");
		var o = e("../namespace/DigraphEditorNamespace");
		o.DigraphEditor.Prefab.Connection = cc.Class(((n = {
			extends: cc.Component,
			editor: !1,
			properties: {},
			onLoad: function() {},
			start: function() {},
			init: function(e, t, n, i) {
				this._renderNode = new cc.Node, this.node.addChild(this._renderNode), this._render = this._renderNode.addComponent(cc.Graphics), this._render.lineWidth = 2, this._render.strokeColor = t.getComponent(o.DigraphEditor.Prefab.OutputSlot).getSlotColor(), this._renderAnimateNode = new cc.Node, this.node.addChild(this._renderAnimateNode), this._renderAnimate = this._renderAnimateNode.addComponent(cc.Graphics), this._renderAnimate.fillColor = t.getComponent(o.DigraphEditor.Prefab.OutputSlot).getSlotColor(), this._outputPanel = e, this._outputSlot = t, this._inputPanel = n, this._inputSlot = i
			},
			remove: function() {
				this.unschedule(this.animationStep), this.node.removeFromParent(!0)
			},
			getOutputPanel: function() {
				return this._outputPanel
			},
			getInputPanel: function() {
				return this._inputPanel
			},
			getOutputSlot: function() {
				return this._outputSlot
			},
			getInputSlot: function() {
				return this._inputSlot
			},
			getOldOutputSlot: function() {
				return this._oldOutputSlot
			},
			getOldInputSlot: function() {
				return this._oldInputSlot
			},
			setOutputSlot: function(e) {
				this._oldOutputSlot = this._outputSlot, this._outputSlot = e
			},
			setInputSlot: function(e) {
				this._oldInputSlot = this._inputSlot, this._inputSlot = e
			},
			setGroupOutputSlot: function(e) {
				this._groupOutputSlot = e
			},
			setGroupInputSlot: function(e) {
				this._groupInputSlot = e
			},
			getGroupOutputSlot: function() {
				return this._groupOutputSlot
			},
			getGroupInputSlot: function() {
				return this._groupInputSlot
			},
			restoreOutputSlot: function() {
				this._outputSlot = this._oldOutputSlot
			},
			restoreInputSlot: function() {
				this._inputSlot = this._oldInputSlot
			}
		}).start = function() {}, n.updateConnection = function(e) {
			void 0 === e && (e = !1), this._render.clear();
			var t = this._groupOutputSlot ? this._groupOutputSlot.convertToWorldSpaceAR(cc.Vec2.ZERO) : this._outputSlot.convertToWorldSpaceAR(cc.Vec2.ZERO),
				n = this._groupInputSlot ? this._groupInputSlot.convertToWorldSpaceAR(cc.Vec2.ZERO) : this._inputSlot.convertToWorldSpaceAR(cc.Vec2.ZERO);
			t.x -= cc.winSize.width / 2 + this.node.parent.parent.x, t.y -= cc.winSize.height / 2 + this.node.parent.parent.y, n.x -= cc.winSize.width / 2 + this.node.parent.parent.x, n.y -= cc.winSize.height / 2 + this.node.parent.parent.y, t.x /= this.node.parent.parent.scale, t.y /= this.node.parent.parent.scale, n.x /= this.node.parent.parent.scale, n.y /= this.node.parent.parent.scale, this._waypoints = o.DigraphEditor.Util.generateConnection(t, n), this._render.moveTo(t.x, t.y);
			for (var i = 0; i < this._waypoints.length; i++) this._render.lineTo(this._waypoints[i].x, this._waypoints[i].y);
			this._render.stroke()
		}, n.animate = function() {
			this._step = 0, this.schedule(this.animationStep, .04)
		}, n.animationStep = function() {
			this._renderAnimate.clear(), this._step < this._waypoints.length && this._renderAnimate.circle(this._waypoints[this._step].x, this._waypoints[this._step].y, 2), this._step + 1 < this._waypoints.length && this._renderAnimate.circle(this._waypoints[this._step + 1].x, this._waypoints[this._step + 1].y, 3), this._step + 2 < this._waypoints.length && this._renderAnimate.circle(this._waypoints[this._step + 2].x, this._waypoints[this._step + 2].y, 4), this._step + 3 < this._waypoints.length && this._renderAnimate.circle(this._waypoints[this._step + 3].x, this._waypoints[this._step + 3].y, 5), this._renderAnimate.fill(), this._step += 1, this._step > this._waypoints.length - 1 && (this._step = 0)
		}, n)), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorPrefabContextMenuItem: [function(e, t) {
		"use strict";
		cc._RF.push(t, "445b3zWSE5L6pElVjDCBzHc", "DigraphEditorPrefabContextMenuItem"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Prefab.ContextMenuItem = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				itemName: cc.Label,
				tagTitle: cc.Label,
				tagCoreNode: cc.Node,
				tagLocalNode: cc.Node,
				tagCustomNode: cc.Node,
				tagOfficialNode: cc.Node,
				tagCloudNode: cc.Node,
				createButton: cc.Node,
				openButton: cc.Node,
				fxButton: cc.Node,
				overloadButton: cc.Node
			},
			init: function(e, t, n, o, i) {
				this._configuration = e, this._index = i, this.samplePanel = t, this.parent = o, this.info = n, e.isFolder ? (this.tagCloudNode.active = !1, this.itemName.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? e.name + " / " + e.name_zh : e.name, this.createButton.active = !1, this.openButton.active = !0, e.isCustom ? (this.tagCoreNode.active = !1, e.isFX ? (this.tagCustomNode.active = !1, this.tagOfficialNode.active = !0) : (this.tagCustomNode.active = !0, this.tagOfficialNode.active = !1)) : this.tagCoreNode.active = !0) : ("" != this.info.name_zh ? this.itemName.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? e.name + " / " + this.info.name_zh : e.name : this.itemName.string = e.name, this.openButton.active = !1, this.info.uuid ? (this.tagCloudNode.active = !0, this.tagLocalNode.active = !1) : (this.tagCloudNode.active = !1, this.tagLocalNode.active = !0), e.overload ? (this.createButton.active = !1, this.overloadButton.active = !0) : (this.createButton.active = !0, this.overloadButton.active = !1), e.fx || (this.tagCustomNode.active = !1, this.tagOfficialNode.active = !1, this.tagCloudNode.active = !1)), e.readonly && (this.createButton.interactable = !1, this.createButton.getChildByName("icon").color = cc.Color.GRAY), this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this)
			},
			onMouseEnter: function() {
				this._configuration.isFolder ? this.samplePanel.active = !1 : (this.samplePanel.active = !0, this.samplePanel.getComponent("ShaderFXPrefabSample").updateSample(this._configuration, this.info))
			},
			onMouseLeave: function() {},
			onCreate: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.ContextMenuItem.Create", !0);
				e.target = this.parent, e.setUserData(this._configuration), cc.systemEvent.dispatchEvent(e)
			},
			onOpen: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.ContextMenuItem.Open", !0);
				e.target = this.node, e.setUserData(this._configuration), cc.systemEvent.dispatchEvent(e)
			},
			onOverload: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.ContextMenuItem.Overload", !0);
				e.target = this.node, e.setUserData(this._configuration), cc.systemEvent.dispatchEvent(e)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorPrefabGroup: [function(e, t) {
		"use strict";
		cc._RF.push(t, "f7c0ax6uwlKaJi6H589itCm", "DigraphEditorPrefabGroup");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Prefab.Group = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				header: cc.Node,
				dragArea: cc.Node,
				dropArea: cc.Node,
				inputSlot: cc.Node,
				outputSlot: cc.Node,
				title: cc.Label,
				content: cc.Label,
				bg: cc.Node,
				editbox: cc.EditBox
			},
			onLoad: function() {
				this._groupID = 0, this._isShrink = !1, this._outputConnections = [], this._intputConnections = []
			},
			start: function() {
				this.dragArea.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.dragArea.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.dragArea.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.dragArea.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this)
			},
			setGroupID: function(e) {
				this._groupID = e, this.title.string = "Group" + this._groupID, this.editbox.string = "Group" + this._groupID
			},
			getGroupID: function() {
				return this._groupID
			},
			getGroupName: function() {
				return this.editbox.string
			},
			setGroupName: function(e) {
				this.editbox.string = e
			},
			updateOutputConnections: function() {
				this._outputConnections = [];
				for (var e = this._panels.length - 1; e >= 0; e--)
					for (var t = this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel), o = t.getOutputSlots(), i = o.length - 1; i >= 0; i--)
						for (var a = o[i].getComponent(n.DigraphEditor.Prefab.OutputSlot).getConnections(), r = a.length - 1; r >= 0; r--) {
							for (var s = a[r], c = !1, l = this._panels.length - 1; l >= 0; l--) {
								var h = this._panels[l].getComponent(n.DigraphEditor.Prefab.Panel);
								if (t != h && h.hasConnection(s)) {
									c = !0;
									break
								}
							}
							c || this._outputConnections.push(s)
						}
			},
			updateInputConnections: function() {
				this._intputConnections = [];
				for (var e = this._panels.length - 1; e >= 0; e--)
					for (var t = this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel), o = t.getInputSlots(), i = o.length - 1; i >= 0; i--) {
						var a = o[i].getComponent(n.DigraphEditor.Prefab.InputSlot);
						if (a.getConnection()) {
							for (var r = !1, s = this._panels.length - 1; s >= 0; s--) {
								var c = this._panels[s].getComponent(n.DigraphEditor.Prefab.Panel);
								t != c && c.hasConnection(a.getConnection()) && (r = !0)
							}
							r || this._intputConnections.push(a.getConnection())
						}
					}
			},
			updateConnectionsRender: function() {
				for (var e = this._intputConnections.length - 1; e >= 0; e--) this._intputConnections[e].active = !0, this._intputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).setGroupInputSlot(this.inputSlot), this._intputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).updateConnection(!0);
				for (e = this._outputConnections.length - 1; e >= 0; e--) this._outputConnections[e].active = !0, this._outputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).setGroupOutputSlot(this.outputSlot), this._outputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).updateConnection(!0)
			},
			init: function(e) {
				this._center = cc.v2(0, 0), this._panels = e;
				for (var t = this._panels.length - 1; t >= 0; t--) {
					var n = this._panels[t];
					n.removeFromParent(!1), this.node.addChild(n, 999)
				}
				this.updateOutputConnections(), this.updateInputConnections(), this.scheduleOnce(this.updateGroup, .01)
			},
			isMinimized: function() {
				return this._isShrink
			},
			onMin: function() {
				if (this._isShrink) {
					this._isShrink = !1;
					for (var e = this._panels.length - 1; e >= 0; e--) {
						this._panels[e].active = !0;
						for (var t = this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel).getConnections().length - 1; t >= 0; t--) this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel).getConnections()[t].active = !0
					}
					for (e = this._intputConnections.length - 1; e >= 0; e--) this._intputConnections[e].parent && (this._intputConnections[e].active = !0, this._intputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).setGroupInputSlot(null), this._intputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).updateConnection());
					for (e = this._outputConnections.length - 1; e >= 0; e--) this._outputConnections[e].parent && (this._outputConnections[e].active = !0, this._outputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).setGroupOutputSlot(null), this._outputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).updateConnection());
					this.node.width = this._oldWidth, this.node.height = this._oldHeight, this.content.node.active = !1, this.inputSlot.active = !1, this.outputSlot.active = !1, this.dropArea.active = !0;
					var o = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Group.Expand", !0);
					o.target = this.node, cc.systemEvent.dispatchEvent(o)
				} else {
					for (this.updateOutputConnections(), this.updateInputConnections(), this._isShrink = !0, this._oldWidth = this.node.width, this._oldHeight = this.node.height, this.node.width = 140, this.node.height = 60, this.content.node.active = !0, this.inputSlot.active = !0, this.outputSlot.active = !0, this.dropArea.active = !1, this.content.string = "Components (" + this._panels.length + ") ", e = this._panels.length - 1; e >= 0; e--)
						for (this._panels[e].active = !1, t = this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel).getConnections().length - 1; t >= 0; t--) this._panels[e].getComponent(n.DigraphEditor.Prefab.Panel).getConnections()[t].active = !1;
					for (e = this._intputConnections.length - 1; e >= 0; e--) this._intputConnections[e].active = !0, this._intputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).setGroupInputSlot(this.inputSlot), this._intputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).updateConnection(!0);
					for (e = this._outputConnections.length - 1; e >= 0; e--) this._outputConnections[e].active = !0, this._outputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).setGroupOutputSlot(this.outputSlot), this._outputConnections[e].getComponent(n.DigraphEditor.Prefab.Connection).updateConnection(!0);
					var i = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Group.Shrink", !0);
					i.target = this.node, cc.systemEvent.dispatchEvent(i)
				}
			},
			getPanels: function() {
				return this._panels
			},
			addPanel: function(e) {
				this._panels.push(e), e.removeFromParent(!1), this.node.addChild(e, 1), e.position = e.position.sub(this._center), this.updateOutputConnections(), this.updateInputConnections(), this.updateGroup()
			},
			removePanel: function(e) {
				for (var t = this._panels.length - 1; t >= 0; t--)
					if (this._panels[t] == e) {
						this._panels.splice(t, 1);
						break
					}
				e.removeFromParent(!1), e.position = e.position.add(this._center), this.updateOutputConnections(), this.updateInputConnections(), this.updateGroup()
			},
			hasPanel: function(e) {
				for (var t = this._panels.length - 1; t >= 0; t--)
					if (this._panels[t] == e) return !0;
				return !1
			},
			updateGroup: function() {
				for (var e = this.node.position.sub(this._center), t = this._panels.length - 1; t >= 0; t--) this._panels[t].position = this._panels[t].position.add(this._center.add(e));
				for (this._l = 9999999, this._r = -9999999, this._t = -9999999, this._b = 9999999, t = this._panels.length - 1; t >= 0; t--) {
					var o = this._panels[t];
					o.x + o.getComponent(n.DigraphEditor.Prefab.Panel).getMainPanel().width * o.scaleX / 2 > this._r && (this._r = o.x + o.getComponent(n.DigraphEditor.Prefab.Panel).getMainPanel().width * o.scaleX / 2), o.x - o.getComponent(n.DigraphEditor.Prefab.Panel).getMainPanel().width * o.scaleX / 2 < this._l && (this._l = o.x - o.getComponent(n.DigraphEditor.Prefab.Panel).getMainPanel().width * o.scaleX / 2), o.y - o.height * o.scaleY / 2 < this._b && (this._b = o.y - o.height * o.scaleY / 2, o.getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration().name, this._b -= 40), o.y + o.height * o.scaleY / 2 > this._t && (this._t = o.y + o.height * o.scaleY / 2, "MainTexture" == o.getComponent(n.DigraphEditor.Prefab.Panel).getConfiguration().name ? this._t -= 60 : this._t += 20)
				}
				for (this._l -= 20, this._r += 20, this._t += 0, this._b -= 60, this.node.width = this._r - this._l, this.node.height = this._t - this._b, this._center = cc.v2((this._l + this._r) / 2, (this._t + this._b) / 2), this.node.x = this._center.x, this.node.y = this._center.y, t = this._panels.length - 1; t >= 0; t--) this._panels[t].position = this._panels[t].position.sub(this._center);
				this._l -= this._center.x, this._r -= this._center.x, this._t -= this._center.y, this._b -= this._center.y
			},
			_touchStartCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Group.TouchStart", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			_touchMoveCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Group.TouchMove", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Group.TouchEnd", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			_touchCancelCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Group.TouchCancel", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			runDropAnimation: function() {
				this._dropAnimation || (this._dropAnimation = cc.tween(this.bg).repeatForever(cc.tween().to(.4, {
					opacity: 255
				}).to(.4, {
					opacity: 0
				})).start())
			},
			stopDropAnimation: function() {
				this._dropAnimation && (this._dropAnimation.stop(), this.bg.opacity = 120, this._dropAnimation = null)
			},
			onEditBoxReturn: function(e) {
				e.string && /^[a-zA-Z]+$/.test(e.string) ? (this._oldValue, e.string) : e.string = this._oldValue
			},
			onEditBoxDidEnded: function() {},
			onEditBoxDidBegan: function(e) {
				this._oldValue = e.string
			},
			onUngroup: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Group.Ungroup", !0);
				e.target = this.node, cc.systemEvent.dispatchEvent(e)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorPrefabInputSlot: [function(e, t) {
		"use strict";
		cc._RF.push(t, "0194bd3r6VK4ommcm1FWwvA", "DigraphEditorPrefabInputSlot"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Prefab.InputSlot = cc.Class({
			extends: e("./DigraphEditorPrefabSlot"),
			editor: !1,
			properties: {},
			onLoad: function() {
				this._super(), this._connection = null
			},
			getConnection: function() {
				return this._connection
			},
			setConnection: function(e) {
				this._connection = e, e ? this.markConnect() : this.markDisconnect()
			},
			_touchStartCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.InputSlot.TouchStart", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchMoveCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.InputSlot.TouchMove", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.InputSlot.TouchEnd", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			_touchCancelCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.InputSlot.TouchCancel", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			runHintAnimation: function() {
				this._hintAnimation || (this._hintAnimation = cc.tween(this.node).repeatForever(cc.tween().to(.4, {
					scale: .8
				}).to(.4, {
					scale: 1.2
				})).start())
			},
			stopHintAnimation: function() {
				this._hintAnimation && (this._hintAnimation.stop(), this.node.scale = 1, this._hintAnimation = null)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace",
		"./DigraphEditorPrefabSlot": "DigraphEditorPrefabSlot"
	}],
	DigraphEditorPrefabOutputSlot: [function(e, t) {
		"use strict";
		cc._RF.push(t, "77481G8T8RK4q1D0WbL+K8K", "DigraphEditorPrefabOutputSlot"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Prefab.OutputSlot = cc.Class({
			extends: e("./DigraphEditorPrefabSlot"),
			editor: !1,
			properties: {},
			onLoad: function() {
				this._super(), this._connections = []
			},
			removeConnections: function() {
				this._connections = [], this.markDisconnect()
			},
			getConnections: function() {
				return this._connections
			},
			addConnection: function(e) {
				this._connections.push(e), this.markConnect()
			},
			removeConnection: function(e) {
				for (var t = 0; t < this._connections.length; t++)
					if (this._connections[t] === e) {
						this._connections.splice(t, 1), 0 == this._connections.length && this.markDisconnect();
						break
					}
			},
			_touchStartCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.OutputSlot.TouchStart", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t)
			},
			_touchMoveCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.OutputSlot.TouchMove", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.OutputSlot.TouchEnd", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			_touchCancelCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.OutputSlot.TouchEnd", !0);
				t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace",
		"./DigraphEditorPrefabSlot": "DigraphEditorPrefabSlot"
	}],
	DigraphEditorPrefabPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "88a14jHfG9HzY3qJUwh4Rj4", "DigraphEditorPrefabPanel");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Prefab.Panel = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				title: cc.Label,
				slotPanel: cc.Node,
				inputSlotPanel: cc.Node,
				outputSlotPanel: cc.Node,
				inputSlotPrefab: cc.Prefab,
				outputSlotPrefab: cc.Prefab,
				extendPanelPrefab: cc.Prefab
			},
			onLoad: function() {
				this._panelID = 0, this._groupID = 0, this._group = null, this._outputSlots = [], this._inputSlots = [], this._connections = [], this._digraphNode = null, this._isDim = null
			},
			init: function(e) {
				this._configuration = e
			},
			setPanelID: function(e) {
				this._panelID = e
			},
			getPanelID: function() {
				return this._panelID
			},
			setGroupID: function(e) {
				this._groupID = e
			},
			getGroupID: function() {
				return this._groupID
			},
			setGroup: function(e) {
				this._group = e
			},
			getGroup: function() {
				return this._group
			},
			setDigraphNode: function(e) {
				this._digraphNode = e
			},
			getDigraphNode: function() {
				return this._digraphNode
			},
			getOutputSlots: function() {
				return this._outputSlots
			},
			getInputSlots: function() {
				return this._inputSlots
			},
			getOutputSlotByIndex: function(e) {
				return this._outputSlots[e]
			},
			getInputSlotByIndex: function(e) {
				return this._inputSlots[e]
			},
			getConnections: function() {
				return this._connections
			},
			addConnection: function(e) {
				this._connections.push(e)
			},
			removeConnection: function(e) {
				for (var t = 0; t < this._connections.length; t++)
					if (this._connections[t] === e) {
						this._connections.splice(t, 1);
						break
					}
			},
			hasConnection: function(e) {
				for (var t = 0; t < this._connections.length; t++)
					if (this._connections[t] === e) return !0;
				return !1
			},
			start: function() {},
			addInputSlot: function(e, t) {
				var o = cc.instantiate(this.inputSlotPrefab);
				return this.inputSlotPanel.addChild(o), this._inputSlots.push(o), o.getComponent(n.DigraphEditor.Prefab.InputSlot).init(e), o.getComponent(n.DigraphEditor.Prefab.InputSlot).setIndex(t), o.getComponent(n.DigraphEditor.Prefab.InputSlot).setPanel(this.node), o
			},
			addOutputSlot: function(e, t) {
				var o = cc.instantiate(this.outputSlotPrefab);
				return this.outputSlotPanel.addChild(o), this._outputSlots.push(o), o.getComponent(n.DigraphEditor.Prefab.OutputSlot).init(e), o.getComponent(n.DigraphEditor.Prefab.OutputSlot).setIndex(t), o.getComponent(n.DigraphEditor.Prefab.OutputSlot).setPanel(this.node), !1 === e.visible && (o.active = !1), o
			},
			_touchStartCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Panel.TouchStart", !0);
				t.target = this.node, t.setUserData(e.touch), cc.systemEvent.dispatchEvent(t)
			},
			_touchMoveCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Panel.TouchMove", !0);
				t.target = this.node, t.setUserData(e.touch), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Panel.TouchEnd", !0);
				t.target = this.node, t.setUserData(e.touch), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			_touchCancelCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Panel.TouchCancel", !0);
				t.target = this.node, t.setUserData(e.touch), cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			select: function() {
				this.title.node.color = cc.Color.YELLOW
			},
			deselect: function() {
				this.title.node.color = cc.Color.WHITE
			},
			moveBy: function(e, t) {
				this.node.x += e, this.node.y += t
			},
			moveTo: function(e, t) {
				this.node.x = e, this.node.y = t
			},
			canConnectToInputSlot: function(e) {
				for (var t = 0; t < this._inputSlots.length; t++)
					if (this._inputSlots[t].getBoundingBoxToWorld().contains(e)) return this._inputSlots[t];
				return null
			},
			onCopy: function() {
				cc.log("onCopy");
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Panel.Copy", !0);
				e.target = this.node, cc.systemEvent.dispatchEvent(e)
			},
			onRemove: function() {
				cc.log("onRemove");
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Panel.Remove", !0);
				e.target = this.node, cc.systemEvent.dispatchEvent(e)
			},
			onUngroup: function() {
				cc.log("onUngroup");
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Prefab.Panel.UnGroup", !0);
				e.target = this.node, cc.systemEvent.dispatchEvent(e)
			},
			dim: function() {
				this.node.opacity = 100, this._isDim = !0
			},
			restoreDim: function() {
				this.node.opacity = 255, this._isDim = !1
			},
			isDim: function() {
				return this._isDim
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorPrefabSlot: [function(e, t) {
		"use strict";
		cc._RF.push(t, "508aeP42GZEOpMLgfYLfsdR", "DigraphEditorPrefabSlot");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Prefab.Slot = cc.Class({
			extends: cc.Component,
			properties: {
				content: cc.Node,
				slotConnectNode: cc.Node,
				slotName: cc.Label,
				slotType: cc.Label
			},
			onLoad: function() {
				this._panel = null, this._type = null, this._index = 0
			},
			setIndex: function(e) {
				this._index = e
			},
			getIndex: function() {
				return this._index
			},
			getType: function() {
				return this._type
			},
			setType: function(e) {
				this._type = e
			},
			setPanel: function(e) {
				this._panel = e
			},
			getPanel: function() {
				return this._panel
			},
			markConnect: function() {
				this.slotConnectNode.active = !0
			},
			markDisconnect: function() {
				this.slotConnectNode.active = !1
			},
			getSlotColor: function() {
				return this.slotColor
			},
			getConfiguration: function() {
				return this._configuration
			},
			init: function(e) {
				this._configuration = e, this.slotName.string = e.name, this.slotType.string = e.type, this.slotColor = n.DigraphEditor.Util.getDataTypeColor(e.type, e.isColor), this.setType(e.type), this.content.color = this.slotConnectNode.color = this.slotColor
			},
			start: function() {
				this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorPrefabToast: [function(e, t) {
		"use strict";
		cc._RF.push(t, "4ab23UF1TRB1YJes/BrsuWb", "DigraphEditorPrefabToast"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Prefab.Toast = cc.Class({
			extends: cc.Component,
			properties: {
				content: cc.Label
			},
			onLoad: function() {},
			init: function(e) {
				this.content.string = e
			},
			start: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorProjectManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "92d7fClVDFBebvdiX6yIWHN", "DigraphEditorProjectManager");
		var n = e("../namespace/DigraphEditorNamespace"),
			o = e("../../shader-fx/util/ShaderFXLeanCloudUtil");
		n.DigraphEditor.Manager.Project = cc.Class({
			ctor: function() {},
			init: function() {
				cc.sys.localStorage.getItem("SSR_SHADERFX_PROJECT_UNGOING") || cc.sys.localStorage.setItem("SSR_SHADERFX_PROJECT_UNGOING", "PROJECT_" + Date.now());
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Project.UpdateName", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			reset: function() {},
			getName: function() {
				return cc.sys.localStorage.getItem("SSR_SHADERFX_PROJECT_UNGOING")
			},
			setName: function(e) {
				cc.sys.localStorage.setItem("SSR_SHADERFX_PROJECT_UNGOING", e);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Project.UpdateName", !0);
				cc.systemEvent.dispatchEvent(t)
			},
			new: function() {
				cc.sys.localStorage.setItem("SSR_SHADERFX_PROJECT_UNGOING", "PROJECT_" + Date.now());
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Project.UpdateName", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			import: function(e) {
				cc.sys.localStorage.setItem("SSR_SHADERFX_PROJECT_UNGOING", e.name);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Project.UpdateName", !0);
				cc.systemEvent.dispatchEvent(t)
			},
			export: function() {},
			autoSaveTimer: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Manager.Project.AutoSaver", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			autoSaveOn: function() {
				this._autoSaverId = setInterval(this.autoSaveTimer, 3e5)
			},
			autoSaveOff: function() {
				clearInterval(this._autoSaverId)
			},
			saveScene: function(e) {
				cc.sys.localStorage.setItem("SSR_SHADERFX_PROJECT_SCENE_TEMP", e)
			},
			uploadScene: function(e, t, n, i, a) {
				o.createProject(e, t, n, i, a)
			}
		}), cc._RF.pop()
	}, {
		"../../shader-fx/util/ShaderFXLeanCloudUtil": "ShaderFXLeanCloudUtil",
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorSlotManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "48944hI5BFHELKx/l0wVrCb", "DigraphEditorSlotManager");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Manager.Slot = cc.Class({
			ctor: function() {
				this._autoHint = !1
			},
			init: function() {},
			autoHint: function(e) {
				this._autoHint = e
			},
			reset: function() {},
			isAutoHint: function() {
				return this._autoHint
			},
			getPossibleConnectInputSlots: function(e, t) {
				for (var o = [], i = 0; i < e.length; i++) {
					var a = e[i];
					if (t.getComponent(n.DigraphEditor.Prefab.OutputSlot).getPanel() !== a)
						for (var r = a.getComponent(n.DigraphEditor.Prefab.Panel).getInputSlots(), s = r.length - 1; s >= 0; s--) r[s].getComponent(n.DigraphEditor.Prefab.InputSlot).getType() == t.getComponent(n.DigraphEditor.Prefab.OutputSlot).getType() && o.push(r[s])
				}
				return o
			},
			getAnyPossibleConnectInputSlot: function(e, t) {
				for (var o = e.getComponent(n.DigraphEditor.Prefab.Panel).getInputSlots(), i = o.length - 1; i >= 0; i--)
					if (o[i].getComponent(n.DigraphEditor.Prefab.InputSlot).getType() == t.getComponent(n.DigraphEditor.Prefab.OutputSlot).getType()) return o[i];
				return null
			},
			runHintAnimation: function(e) {
				for (var t = 0; t < e.length; t++) e[t].getComponent(n.DigraphEditor.Prefab.InputSlot).runHintAnimation()
			},
			stopHintAnimation: function(e) {
				for (var t = 0; t < e.length; t++) e[t].getComponent(n.DigraphEditor.Prefab.InputSlot).stopHintAnimation()
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorToolBar: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b05dbMKOnlPorIU/2rQ85ay", "DigraphEditorToolBar"), e("../namespace/DigraphEditorNamespace").DigraphEditor.Component.ToolBar = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				newProjectButton: cc.Button,
				importProjectButton: cc.Button,
				exportProjectButton: cc.Button,
				saveProjectButton: cc.Button,
				exportFXButton: cc.Button,
				exportFX3DButton: cc.Button,
				exportMTLButton: cc.Button,
				snapshotOutputButton: cc.Button,
				snapshotButton: cc.Button,
				builderButton: cc.Button,
				zoomInButton: cc.Button,
				zoomOutButton: cc.Button,
				canvasMoveButton: cc.Button,
				groupButton: cc.Button,
				uploadProjectButton: cc.Button,
				downloadProjectButton: cc.Button,
				galleryProjectButton: cc.Button,
				tutorialButton: cc.Button,
				autoSaveroupButton: cc.Button,
				onlineComponentButton: cc.Button
			},
			onLoad: function() {
				this._autoDimFlag = !1, this._autoConnectFlag = !1, this._autoHintFlag = !1, this._canvasMoveFlag = !1, this._autoSaveFlag = !1, 1 == cc.sys.localStorage.getItem("ssrfx_autosave") && (this._autoSaveFlag = !0, this.autoSaveroupButton.node.getChildByName("icon").color = cc.color("#8CFF38"))
			},
			start: function() {
				cc.systemEvent.on("ssr.DigraphEditor.Layer.Account.LoginSuccess", this._onAccountLoginSuccess, this), this.newProjectButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u65b0\u5efa\u9879\u76ee" : "New Project", this.newProjectButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterProjectButton, this), this.newProjectButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveProjectButton, this), this.importProjectButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u5165\u9879\u76ee" : "Import Project", this.importProjectButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterImportProjectButton, this), this.importProjectButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveImportProjectButton, this), this.exportProjectButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa\u9879\u76ee" : "Export Project", this.exportProjectButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterExportProjectButton, this), this.exportProjectButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveExportProjectButton, this), this.saveProjectButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u4fdd\u5b58\u9879\u76ee" : "Save Project", this.saveProjectButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterSaveProjectButton, this), this.saveProjectButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveSaveProjectButton, this), this.snapshotOutputButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u8f93\u51fa\u7279\u6548\u5feb\u7167" : "Output FX Snapshot", this.snapshotOutputButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterSnapshotOutputButton, this), this.snapshotOutputButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveSnapshotOutputButton, this), this.exportFXButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa.effect\u6587\u4ef6" : "Export .effect file", this.exportFXButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterExportFXButton, this), this.exportFXButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveExportFXButton, this), this.exportFX3DButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa 3D unlit .effect\u6587\u4ef6" : "Export .effect file", this.exportFX3DButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterExportFX3DButton, this), this.exportFX3DButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveExportFX3DButton, this), this.exportMTLButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa.mtl\u6587\u4ef6" : "Export .mtl file", this.exportMTLButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterExportMTLButton, this), this.exportMTLButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveExportMTLButton, this), this.snapshotButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u9879\u76ee\u5feb\u7167" : "Project snapshot", this.snapshotButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterSnapshotButton, this), this.snapshotButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveSnapshotButton, this), this.builderButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u81ea\u5b9a\u4e49\u7ec4\u4ef6" : "Custom Component", this.builderButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterBuilderButton, this), this.builderButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveBuilderButton, this), this.groupButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u4f7f\u7528\u9009\u4e2d\u5bf9\u8c61\u521b\u5efa\u7ec4" : "New group with selected components", this.groupButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterGroupButton, this), this.groupButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveGroupButton, this), this.uploadProjectButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u4fdd\u5b58\u9879\u76ee\u5230\u4e91\u7aef" : "Save project to cloud", this.uploadProjectButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterUploadProjectButton, this), this.uploadProjectButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveUploadProjectButton, this), this.downloadProjectButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u4ece\u4e91\u7aef\u4e0b\u8f7d\u9879\u76ee" : "Download Project from cloud", this.downloadProjectButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterDownloadProjectButton, this), this.downloadProjectButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveDownloadProjectButton, this), this.galleryProjectButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u7279\u6548\u9879\u76ee\u793a\u4f8b" : "Open online FX gallery", this.galleryProjectButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterGalleryProjectButton, this), this.galleryProjectButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveGalleryProjectButton, this), this.tutorialButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u4f7f\u7528\u624b\u518c" : "User guide", this.tutorialButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterTutorialButton, this), this.tutorialButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveTutorialButton, this), this.autoSaveroupButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u81ea\u52a8\u4fdd\u5b58" : "Auto Save", this.autoSaveroupButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterAutoSaveroupButton, this), this.autoSaveroupButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveAutoSaveroupButton, this), this.onlineComponentButton.node.getChildByName("ToolTip").getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u7279\u6548\u7ec4\u4ef6\u5e93" : "Open online FX Component Library", this.onlineComponentButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterOnlineComponentButton, this), this.onlineComponentButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveOnlineComponentButton, this)
			},
			_onAccountLoginSuccess: function() {
				this.uploadProjectButton.node.getChildByName("icon").color = cc.color("#8CFF38"), this.downloadProjectButton.node.getChildByName("icon").color = cc.color("#8CFF38"), this.galleryProjectButton.node.getChildByName("icon").color = cc.color("#8CFF38"), this.onlineComponentButton.node.getChildByName("icon").color = cc.color("#20FF07"), this.uploadProjectButton.node.getChildByName("icon").opacity = 255, this.downloadProjectButton.node.getChildByName("icon").opacity = 255, this.galleryProjectButton.node.getChildByName("icon").opacity = 255, this.onlineComponentButton.node.getChildByName("icon").opacity = 255
			},
			onMouseEnterOnlineComponentButton: function() {
				this.onlineComponentButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveOnlineComponentButton: function() {
				this.onlineComponentButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterAutoSaveroupButton: function() {
				this.autoSaveroupButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveAutoSaveroupButton: function() {
				this.autoSaveroupButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterTutorialButton: function() {
				this.tutorialButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveTutorialButton: function() {
				this.tutorialButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterExportFXButton: function() {
				this.exportFXButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveExportFXButton: function() {
				this.exportFXButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterExportFX3DButton: function() {
				this.exportFX3DButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveExportFX3DButton: function() {
				this.exportFX3DButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterExportMTLButton: function() {
				this.exportMTLButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveExportMTLButton: function() {
				this.exportMTLButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterProjectButton: function() {
				this.newProjectButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveProjectButton: function() {
				this.newProjectButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterImportProjectButton: function() {
				this.importProjectButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveImportProjectButton: function() {
				this.importProjectButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterExportProjectButton: function() {
				this.exportProjectButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveExportProjectButton: function() {
				this.exportProjectButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterSaveProjectButton: function() {
				this.saveProjectButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveSaveProjectButton: function() {
				this.saveProjectButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterSnapshotOutputButton: function() {
				this.snapshotOutputButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveSnapshotOutputButton: function() {
				this.snapshotOutputButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterSnapshotButton: function() {
				this.snapshotButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveSnapshotButton: function() {
				this.snapshotButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterBuilderButton: function() {
				this.builderButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveBuilderButton: function() {
				this.builderButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterGroupButton: function() {
				this.groupButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveGroupButton: function() {
				this.groupButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterUploadProjectButton: function() {
				this.uploadProjectButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveUploadProjectButton: function() {
				this.uploadProjectButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterDownloadProjectButton: function() {
				this.downloadProjectButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveDownloadProjectButton: function() {
				this.downloadProjectButton.node.getChildByName("ToolTip").active = !1
			},
			onMouseEnterGalleryProjectButton: function() {
				this.galleryProjectButton.node.getChildByName("ToolTip").active = !0
			},
			onMouseLeaveGalleryProjectButton: function() {
				this.galleryProjectButton.node.getChildByName("ToolTip").active = !1
			},
			onUndo: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.Undo", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onRedo: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.Redo", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onCreatePanel: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.CreatePanel", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onNewProject: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.NewProject", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onImportProject: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.ImportProject", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onExportProject: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.ExportProject", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onExportFx: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Export", !0);
				e.target = this.node, cc.systemEvent.dispatchEvent(e)
			},
			onExportFx3D: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.ExportFX3D", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onExportMTL: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.ExportMTL", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onSnapshot: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.Snapshot", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onBuilder: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.Builder", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onSnapshotOutput: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.SnapshotOutput", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onSaveProject: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.SaveProject", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onProjectList: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.ProjectList", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onUploadProject: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.UploadProject", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onProjectGallery: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.ProjectGallery", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onFXComponentLibrary: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.FXComponentLibrary", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onTutorial: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.Tutorial", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onAutoDim: function(e) {
				this._autoDimFlag ? (this._autoDimFlag = !1, e.target.getChildByName("icon").color = cc.Color.WHITE) : (this._autoDimFlag = !0, e.target.getChildByName("icon").color = cc.Color.YELLOW);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.AutoDim", !0);
				t.setUserData(this._autoDimFlag), cc.systemEvent.dispatchEvent(t)
			},
			onAutoSave: function(e) {
				this._autoSaveFlag ? (this._autoSaveFlag = !1, e.target.getChildByName("icon").color = cc.color("#FFD338"), cc.sys.localStorage.setItem("ssrfx_autosave", 0)) : (this._autoSaveFlag = !0, e.target.getChildByName("icon").color = cc.color("#8CFF38"), cc.sys.localStorage.setItem("ssrfx_autosave", 1));
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.AutoSave", !0);
				t.setUserData(this._autoSaveFlag), cc.systemEvent.dispatchEvent(t)
			},
			onAutoConnect: function(e) {
				this._autoConnectFlag ? (this._autoConnectFlag = !1, e.target.getChildByName("icon").color = cc.Color.WHITE) : (this._autoConnectFlag = !0, e.target.getChildByName("icon").color = cc.Color.YELLOW);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.AutoConnect", !0);
				t.setUserData(this._autoConnectFlag), cc.systemEvent.dispatchEvent(t)
			},
			onAutoHint: function(e) {
				this._autoHintFlag ? (this._autoHintFlag = !1, e.target.getChildByName("icon").color = cc.Color.WHITE) : (this._autoHintFlag = !0, e.target.getChildByName("icon").color = cc.Color.YELLOW);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.AutoHint", !0);
				t.setUserData(this._autoHintFlag), cc.systemEvent.dispatchEvent(t)
			},
			onCanvasMove: function(e) {
				this._canvasMoveFlag ? (this._canvasMoveFlag = !1, e.target.getChildByName("icon").color = cc.Color.WHITE) : (this._canvasMoveFlag = !0, e.target.getChildByName("icon").color = cc.Color.YELLOW);
				var t = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.CanvasMove", !0);
				t.setUserData(this._canvasMoveFlag), cc.systemEvent.dispatchEvent(t)
			},
			onGroup: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.Group", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onUngroup: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.Ungroup", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onZoomIn: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.ZoomIn", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onZoomOut: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.ZoomOut", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			onZoomReset: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Component.ToolBar.ZoomReset", !0);
				cc.systemEvent.dispatchEvent(e)
			}
		}), cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	DigraphEditorUtil: [function(e, t) {
		"use strict";
		cc._RF.push(t, "85460sclG5Bmb/d/nTfeNoj", "DigraphEditorUtil");
		var n = e("../namespace/DigraphEditorNamespace");
		n.DigraphEditor.Util.generateBezierPoints = function(e, t) {
			for (var n = [], o = function(e, t) {
					for (var n = 1, o = 1; t > 0;) n *= e, o *= t, e--, t--;
					return n / o
				}, i = e.length, a = 0; a <= t; a++) {
				for (var r = a / t, s = 0, c = 0, l = 0; l < i; l++) {
					var h = e[l];
					s += h.x * Math.pow(1 - r, i - 1 - l) * Math.pow(r, l) * o(i - 1, l), c += h.y * Math.pow(1 - r, i - 1 - l) * Math.pow(r, l) * o(i - 1, l)
				}
				n.push(cc.v2(s, c))
			}
			return n
		}, n.DigraphEditor.Util.generateControlPoints = function(e, t) {
			return e.x < t.x ? [cc.v2(e.x + (t.x - e.x) / 2, e.y), cc.v2(e.x + (t.x - e.x) / 2, t.y)] : [cc.v2(e.x, e.y - (t.y - e.y) / 2), cc.v2(t.x, t.y + (t.y - e.y) / 2)]
		}, n.DigraphEditor.Util.generateConnection = function(e, t) {
			if (e.x < t.x) return n.DigraphEditor.Util.generateBezierPoints([e, cc.v2(e.x + (t.x - e.x) / 2, e.y), cc.v2(e.x + (t.x - e.x) / 2, t.y), t], 20);
			var o = Math.abs((t.y - e.y) / 4),
				i = (t.y - e.y) / 2,
				a = (cc.v2(e.x, e.y + i * (i > 0 ? 1 : -1)), cc.v2(t.x, t.y + i * (i > 0 ? -1 : 1)), cc.v2(e.x, e.y + o * (i > 0 ? 1 : -1))),
				r = cc.v2(t.x, t.y + o * (i > 0 ? -1 : 1)),
				s = [];
			if (i > 0) {
				for (var c = 270; c <= 450; c += 10) {
					var l = c * Math.PI / 180,
						h = cc.v2(o * Math.cos(l) + a.x, o * Math.sin(l) + a.y);
					s.push(h)
				}
				for (c = 270; c >= 90; c -= 10) l = c * Math.PI / 180, h = cc.v2(o * Math.cos(l) + r.x, o * Math.sin(l) + r.y), s.push(h)
			} else {
				for (c = 90; c >= -90; c -= 10) l = c * Math.PI / 180, h = cc.v2(o * Math.cos(l) + a.x, o * Math.sin(l) + a.y), s.push(h);
				for (c = 90; c <= 270; c += 10) l = c * Math.PI / 180, h = cc.v2(o * Math.cos(l) + r.x, o * Math.sin(l) + r.y), s.push(h)
			}
			return s
		}, n.DigraphEditor.Util.getDataTypeColor = function(e, t) {
			return 1 == t && (e = "Color"), n.DigraphEditor.Const.DataTypeColor[e.toUpperCase()]
		}, t.exports = n.DigraphEditor.Util, cc._RF.pop()
	}, {
		"../namespace/DigraphEditorNamespace": "DigraphEditorNamespace"
	}],
	FBONamespace: [function(e, t) {
		"use strict";
		cc._RF.push(t, "75da1jQripHQ4tVuH7X/7cb", "FBONamespace");
		var n = n || {};
		n.FBO = n.FBO || {}, n.FBO.Component = n.FBO.Component || {}, n.FBO.Const = n.FBO.Const || {}, n.FBO.Data = n.FBO.Data || {}, n.FBO.Util = n.FBO.Util || {}, t.exports = n, cc._RF.pop()
	}, {}],
	FBONodeCaptureComponent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "1cb8a/AOZxPk5DsfD7bA6BD", "FBONodeCaptureComponent"), e("../namespace/FBONamespace").FBO.Component.Capture = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				target: cc.Node
			},
			onLoad: function() {},
			start: function() {},
			capture: function(e) {
				if (e = e || "fbo.png", window.jsb) {
					for (var t = (u = this.target.getComponent(cc.Sprite).spriteFrame.getTexture()).width, n = u.height, o = u.readPixels(), i = new Uint8Array(t * n * 4), a = 4 * t, r = 0; r < n; r++)
						for (var s = (n - 1 - r) * t * 4, c = r * t * 4, l = 0; l < a; l++) i[c + l] = o[s + l];
					var h = jsb.fileUtils.getWritablePath() + e;
					return jsb.saveImageData(i, t, n, h) ? h : null
				}
				var u, p = (u = this.target.getComponent(cc.Sprite).spriteFrame.getTexture()).width,
					d = u.height;
				this._canvas ? this.clearCanvas() : (this._canvas = document.createElement("canvas"), this._canvas.width = p, this._canvas.height = d);
				for (var f = this._canvas.getContext("2d"), m = u.readPixels(), g = 4 * p, C = 0; C < d; C++) {
					for (var _ = d - 1 - C, v = f.createImageData(p, 1), E = _ * p * 4, S = 0; S < g; S++) v.data[S] = m[E + S];
					f.putImageData(v, 0, C)
				}
				var P = this._canvas.toDataURL("image/png");
				return this._canvas.remove(), this._canvas = null, window.download(P, e, "image/png"), e
			},
			generateBase64Code: function() {
				var e = this.target.getComponent(cc.Sprite).spriteFrame.getTexture(),
					t = e.width,
					n = e.height;
				this._canvas ? this.clearCanvas() : (this._canvas = document.createElement("canvas"), this._canvas.width = t, this._canvas.height = n);
				for (var o = this._canvas.getContext("2d"), i = e.readPixels(), a = 4 * t, r = 0; r < n; r++) {
					for (var s = n - 1 - r, c = o.createImageData(t, 1), l = s * t * 4, h = 0; h < a; h++) c.data[h] = i[l + h];
					o.putImageData(c, 0, r)
				}
				var u = this._canvas.toDataURL("image/png");
				return this._canvas.remove(), this._canvas = null, u
			}
		}), cc._RF.pop()
	}, {
		"../namespace/FBONamespace": "FBONamespace"
	}],
	FBONodeCloneComponent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7596cS966dF85SrAvau2uTn", "FBONodeCloneComponent"), e("../namespace/FBONamespace"), cc._RF.pop()
	}, {
		"../namespace/FBONamespace": "FBONamespace"
	}],
	FBONodeComponent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "fb9c50Ei9pLZ7VHI48eh1kq", "FBONodeComponent");
		var n = e("../namespace/FBONamespace"),
			o = cc.Enum({
				ONCE: 0,
				ALWAYS: 1
			});
		n.FBO.Component.Core = cc.Class({
			extends: cc.Component,
			properties: {
				preview: {
					default: !0,
					editorOnly: !0,
					notify: !1,
					tooltip: "\u662f\u5426\u5728\u5728\u7f16\u8f91\u5668\u4e2d\u9884\u89c8"
				},
				_flipY: !0,
				flipY: {
					get: function() {
						return this._flipY
					},
					set: function(e) {
						this._flipY = e, this._fboSprite && this._fboSprite.spriteFrame && this._fboSprite.spriteFrame.setFlipY(e)
					},
					tooltip: "\u662f\u5426\u9700\u8981\u7ffb\u8f6c\u7eb9\u7406"
				},
				group: {
					default: "fbo",
					tooltip: "FBO \u8282\u70b9\u4e13\u7528\u7684\u5206\u7ec4\u540d\u79f0"
				},
				_updateMode: o.ALWAYS,
				updateMode: {
					type: o,
					get: function() {
						return this._updateMode
					},
					set: function(e) {
						this._updateMode = e
					},
					tooltip: "\u66f4\u65b0\u6a21\u5f0f\uff0c\u9ed8\u8ba4\u5b9e\u65f6\u66f4\u65b0"
				},
				_backgroundColor: cc.color(0, 0, 0, 0),
				backgroundColor: {
					get: function() {
						return this._backgroundColor
					},
					set: function(e) {
						this._backgroundColor.set(e), this._fboCamera.backgroundColor = e
					},
					tooltip: "\u6444\u50cf\u673a\u7528\u4e8e\u6e05\u9664\u5c4f\u5e55\u7684\u80cc\u666f\u8272"
				}
			},
			_initData: function() {
				this._isPaused = !1
			},
			_initFBORenderTexture: function() {
				this._renderTexture || (this._renderTexture = new cc.RenderTexture)
			},
			_initFBOSprite: function() {
				if (this._fboSprite = this.node.getComponent(cc.Sprite), this._fboSprite || (this._fboSprite = this.node.addComponent(cc.Sprite)), !this._fboSprite.spriteFrame) {
					var e = new cc.SpriteFrame;
					this._fboSprite.spriteFrame = e, this._fboSprite.spriteFrame.setFlipY(this.flipY)
				}
			},
			_initFBOCamera: function() {
				this._fboCamera = this.node.getComponent(cc.Camera), this._fboCamera || (this._fboCamera = this.node.addComponent(cc.Camera)), this._fboCamera.depth = 0, this._fboCamera.clearFlags = cc.Camera.ClearFlags.COLOR, this._fboCamera.backgroundColor = this.backgroundColor, this._fboCamera.targetTexture = this._renderTexture, this._fboCamera.enabled = !1
			},
			onLoad: function() {
				this.node.group = this.group
			},
			start: function() {
				this._initData(), this._initFBORenderTexture(), this._initFBOSprite(), this._initFBOCamera(), this.updateFBO()
			},
			_updateRenderTextureSize: function(e, t) {
				this._renderTexture && (window.jsb ? (this._renderTexture.destroy(), this._renderTexture = new cc.RenderTexture, this._renderTexture.initWithSize(e, t, cc.gfx.RB_FMT_S8)) : this._renderTexture.updateSize(e, t))
			},
			update: function() {
				this._isPaused || this.updateMode == o.ALWAYS && this.updateFBO()
			},
			updateFBO: function() {
				this._fboCamera.enabled = !0, this._fboCamera.render(this.target), this._fboSprite.spriteFrame.setTexture(this._renderTexture), this._fboCamera.enabled = !1
			},
			pause: function() {
				this._isPaused = !0
			},
			resume: function() {
				this._isPaused = !1
			}
		}), cc._RF.pop()
	}, {
		"../namespace/FBONamespace": "FBONamespace"
	}],
	FBONodeGhostComponent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "3766eS0Sr5OdpI2r6AdvfWA", "FBONodeGhostComponent"), e("../namespace/FBONamespace").FBO.Component.Ghost = cc.Class({
			extends: e("./FBONodeComponent.js"),
			editor: !1,
			properties: {
				_target: null,
				target: {
					type: cc.Node,
					get: function() {
						return this._target
					},
					set: function(e) {
						this._target = e, this.updateTarget(), this.node.width = this._target.width, this.node.height = this._target.height
					},
					tooltip: "FBO \u76ee\u6807\u8282\u70b9"
				},
				_offsetX: 0,
				offsetX: {
					type: cc.Float,
					get: function() {
						return this._offsetX
					},
					set: function(e) {
						this._offsetX = e, this.updateTarget()
					},
					tooltip: "FBO \u6e32\u67d3\u533a\u57df X\u8f74\u65b9\u5411\u504f\u79fb\u91cf"
				},
				_offsetY: 0,
				offsetY: {
					type: cc.Float,
					get: function() {
						return this._offsetY
					},
					set: function(e) {
						this._offsetY = e, this.updateTarget()
					}
				}
			},
			onEnable: function() {
				this._registerNodeEvent()
			},
			_registerNodeEvent: function() {
				this.node.on("size-changed", this._updateSize, this)
			},
			_unregisterNodeEvent: function() {
				this.node.off("size-changed", this._updateSize, this)
			},
			_updateSize: function() {
				this._updateRenderTextureSize(this.node.width, this.node.height), this._fboCamera && (this._fboCamera.targetTexture = this._renderTexture, this._fboCamera.orthoSize = this.node.height / 2)
			},
			updateTarget: function() {
				this.target && (this._targetGroupOld = this.target.group, this.target.group = this.group, this.node.position = cc.v3(this.offsetX, this.offsetY, 1))
			},
			_initFBORenderTexture: function() {
				this._super(), this._renderTexture.initWithSize(this.node.width, this.node.height, cc.gfx.RB_FMT_S8)
			},
			_initFBOCamera: function() {
				this._super(), this._fboCamera.cullingMask = 0, this._fboCamera.cullingMask |= ~(1 << this.node.groupIndex), this._fboCamera.alignWithScreen = !1, this._fboCamera.orthoSize = this.node.height / 2
			},
			updateFBO: function() {
				this.target && (this.node.position = cc.v3(this.offsetX, this.offsetY, 1), this._fboCamera.orthoSize = this.node.height / 2 * this.target.scaleX, this._super(), this._fboCamera.orthoSize = this.node.height / 2, cc.Camera.main && (cc.Camera.main.cullingMask &= ~(1 << this.target.groupIndex)))
			},
			__preload: function() {},
			onLoad: function() {
				this._super(), this.node.group = "ghost", this.updateTarget()
			},
			onDisable: function() {
				this._unregisterNodeEvent(), this.target.group = this._targetGroupOld, this.target.group = "default"
			}
		}), cc._RF.pop()
	}, {
		"../namespace/FBONamespace": "FBONamespace",
		"./FBONodeComponent.js": "FBONodeComponent"
	}],
	FBONodeInPlaceComponent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c385biz14hE8pyyt+Tbi/Xk", "FBONodeInPlaceComponent");
		var n = e("../namespace/FBONamespace");
		n.FBO.Component.InPlace = cc.Class({
			extends: n.FBO.Component.Core,
			editor: !1,
			properties: {
				_rect: cc.rect(0, 0, 100, 100),
				rect: {
					get: function() {
						return this._rect
					},
					set: function(e) {
						this._rect = e, this.node.width = this._rect.width, this.node.height = this._rect.height, this._updateRenderTextureSize(this._rect.width, this._rect.height), this._fboCamera.targetTexture = this._renderTexture, this._fboCamera.orthoSize = this._rect.height / 2, this.updateFBO()
					},
					tooltip: "FBO \u76ee\u6807\u8282\u70b9"
				}
			},
			_initFBORenderTexture: function() {
				this._super(), this._renderTexture.initWithSize(this.rect.width, this.rect.height, cc.gfx.RB_FMT_S8)
			},
			_initFBOCamera: function() {
				this._super(), this._fboCamera.cullingMask = 4294967295, this._fboCamera.cullingMask &= ~(1 << this.node.groupIndex), this._fboCamera.alignWithScreen = !1, this._fboCamera.orthoSize = this.rect.height / 2
			},
			updateFBO: function() {
				var e = this.node.position;
				this.node.position = cc.v3(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2, 1), this._super(), this.node.position = cc.v3(e.x, e.y, 1)
			},
			onLoad: function() {
				this._super(), this.node.width = this.rect.width, this.node.height = this.rect.height
			},
			__preload: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/FBONamespace": "FBONamespace"
	}],
	FBONodeRegionComponent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "2bb847nObZKJIcEUqOdqpEa", "FBONodeRegionComponent");
		var n = e("../namespace/FBONamespace");
		n.FBO.Component.Region = cc.Class({
			extends: n.FBO.Component.Core,
			editor: !1,
			properties: {
				_zoom: 1,
				zoom: {
					type: cc.Float,
					get: function() {
						return this._zoom
					},
					set: function(e) {
						this._zoom = e, this._fboCamera.orthoSize = this.node.height / 2 / this._zoom
					},
					tooltip: "\u7eb9\u7406\u7f29\u653e\u6bd4\u7387"
				}
			},
			onEnable: function() {
				this._registerNodeEvent()
			},
			onDisable: function() {
				this._unregisterNodeEvent()
			},
			_registerNodeEvent: function() {
				this.node.on("size-changed", this._updateSize, this)
			},
			_unregisterNodeEvent: function() {
				this.node.off("size-changed", this._updateSize, this)
			},
			_updateSize: function() {
				this._updateRenderTextureSize(this.node.width, this.node.height), this._fboCamera.targetTexture = this._renderTexture, this._fboCamera.orthoSize = this.node.height / 2 / this.zoom
			},
			_initFBORenderTexture: function() {
				this._super(), this._renderTexture.initWithSize(this.node.width, this.node.height, cc.gfx.RB_FMT_S8)
			},
			_initFBOCamera: function() {
				this._super(), this._fboCamera.cullingMask = 4294967295, this._fboCamera.cullingMask &= ~(1 << this.node.groupIndex), this._fboCamera.alignWithScreen = !1, this._fboCamera.orthoSize = this.node.height / 2 / this.zoom
			},
			updateFBO: function() {
				this.node.position = cc.v3(this.node.x, this.node.y, 1), this._super()
			},
			__preload: function() {}
		}), cc._RF.pop()
	}, {
		"../namespace/FBONamespace": "FBONamespace"
	}],
	FBONodeScreenComponent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "da630+NOHxH3ZeAgruYgGU0", "FBONodeScreenComponent");
		var n = e("../namespace/FBONamespace");
		n.FBO.Component.Screen = cc.Class({
			extends: n.FBO.Component.Core,
			editor: !1,
			properties: {},
			_initFBORenderTexture: function() {
				this._super(), this._renderTexture.initWithSize(cc.Canvas.instance.node.width, cc.Canvas.instance.node.height, cc.gfx.RB_FMT_S8)
			},
			_initFBOCamera: function() {
				this._super(), this._fboCamera.cullingMask = 4294967295, this._fboCamera.cullingMask &= ~(1 << this.node.groupIndex)
			},
			onLoad: function() {
				this._super(), this.node.width = cc.Canvas.instance.node.width, this.node.height = cc.Canvas.instance.node.height
			}
		}), cc._RF.pop()
	}, {
		"../namespace/FBONamespace": "FBONamespace"
	}],
	FBONodeTargetComponent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "ebf13MKw2pNWZFXXVkQ7L4A", "FBONodeTargetComponent");
		var n = e("../namespace/FBONamespace");
		n.FBO.Component.Target = cc.Class({
			extends: n.FBO.Component.Core,
			editor: !1,
			properties: {
				_target: null,
				target: {
					type: cc.Node,
					get: function() {
						return this._target
					},
					set: function(e) {
						this._target = e, this.updateTarget()
					},
					tooltip: "FBO \u76ee\u6807\u8282\u70b9"
				},
				_syncAngle: !1,
				syncAngle: {
					get: function() {
						return this._syncAngle
					},
					set: function(e) {
						this._syncAngle = e
					},
					tooltip: "\u662f\u5426\u9700\u8981\u52a8\u6001\u76d1\u6d4b\u76ee\u6807\u65cb\u8f6c\u89d2\u5ea6"
				},
				_syncScale: !1,
				syncScale: {
					get: function() {
						return this._syncScale
					},
					set: function(e) {
						this._syncScale = e
					},
					tooltip: "\u662f\u5426\u9700\u8981\u52a8\u6001\u76d1\u6d4b\u76ee\u6807\u7f29\u653e\u5927\u5c0f"
				},
				_syncSize: !1,
				syncSize: {
					get: function() {
						return this._syncSize
					},
					set: function(e) {
						this._syncSize = e
					},
					tooltip: "\u662f\u5426\u9700\u8981\u52a8\u6001\u76d1\u6d4b\u76ee\u6807\u5927\u5c0f"
				},
				_syncAnchor: !1,
				syncAnchor: {
					get: function() {
						return this._syncAnchor
					},
					set: function(e) {
						this._syncAnchor = e
					},
					tooltip: "\u662f\u5426\u9700\u8981\u52a8\u6001\u76d1\u6d4b\u76ee\u6807\u951a\u70b9"
				},
				_offsetX: 0,
				offsetX: {
					type: cc.Float,
					get: function() {
						return this._offsetX
					},
					set: function(e) {
						this._offsetX = e, this.updateTarget()
					},
					tooltip: "FBO \u6e32\u67d3\u533a\u57df X\u8f74\u65b9\u5411\u504f\u79fb\u91cf"
				},
				_offsetY: 0,
				offsetY: {
					type: cc.Float,
					get: function() {
						return this._offsetY
					},
					set: function(e) {
						this._offsetY = e, this.updateTarget()
					}
				},
				_inflateW: 0,
				inflateW: {
					type: cc.Float,
					get: function() {
						return this._inflateW
					},
					set: function(e) {
						this._inflateW = e, this.updateTarget()
					},
					tooltip: "FBO \u6e32\u67d3\u533a\u57df \u5bbd\u5ea6\u6269\u5c55\u8303\u56f4"
				},
				_inflateH: 0,
				inflateH: {
					type: cc.Float,
					get: function() {
						return this._inflateH
					},
					set: function(e) {
						this._inflateH = e, this.updateTarget()
					},
					tooltip: "FBO \u6e32\u67d3\u533a\u57df \u9ad8\u5ea6\u6269\u5c55\u8303\u56f4"
				}
			},
			_initFBORenderTexture: function() {
				this._super(), this.target && this._renderTexture.initWithSize(this.target.width + this.inflateW, this.target.height + this.inflateH, cc.gfx.RB_FMT_S8)
			},
			_initFBOCamera: function() {
				if (this._super(), this._fboCamera.cullingMask = 0, this._fboCamera.cullingMask |= ~(1 << this.node.groupIndex), this._fboCamera.alignWithScreen = !1, this.target) {
					var e = this.target.width + this.inflateW,
						t = this.target.height + this.inflateH;
					this._fboCamera.orthoSize = Math.min(e, t) / 2
				}
			},
			updateFBO: function() {
				if (this.target) {
					var e = this.node.position;
					this.syncAngle && this._targetAngleOld != this.target.angle && (this._targetAngleOld = this.target.angle, this.node.angle = this.target.angle = 0), this.syncScale && (this._targetScaleXOld != this.target.scaleX && (this._targetScaleXOld = this.target.scaleX), this._targetScaleYOld != this.target.scaleY && (this._targetScaleYOld = this.target.scaleY), this.node.scaleX = this.target.scaleX = 1, this.node.scaleY = this.target.scaleY = 1), this.syncAnchor && (this._targetAnchorXOld != this.target.anchorX && (this._targetAnchorXOld = this.target.anchorX), this._targetAnchorYOld != this.target.anchorY && (this._targetAnchorYOld = this.target.anchorY), this.node.anchorX = this.target.anchorX = .5, this.node.anchorY = this.target.anchorY = .5), this.syncSize && (this._targetWidthOld == this.target.width && this._targetHeightOld == this.target.height || (this._targetWidthOld = this.target.width, this._targetHeightOld = this.target.height, this.node.width = this.target.width + this.inflateW, this.node.height = this.target.height + this.inflateH, this._updateRenderTextureSize(this.target.width + this.inflateW, this.target.height + this.inflateH), this._fboCamera && (this._fboCamera.targetTexture = this._renderTexture, this._fboCamera.orthoSize = (this.target.height + this.inflateH) / 2 * .6 * this.___scale))), this.node.position = cc.v3(this.target.position.x - this.offsetX, this.target.position.y - this.offsetY, 1), this.target.group = this.group, this._super(), this.target.group = this._targetGroupOld, this.syncAngle && (this.node.angle = this.target.angle = this._targetAngleOld), this.syncAnchor && (this.node.anchorX = this.target.anchorX = this._targetAnchorXOld, this.node.anchorY = this.target.anchorY = this._targetAnchorYOld), this.syncScale && (this.node.scaleX = this.target.scaleX = this._targetScaleXOld, this.node.scaleY = this.target.scaleY = this._targetScaleYOld), this.node.position = cc.v3(e.x, e.y, 1)
				}
			},
			_resetTarget: function() {
				if (this.node.group = "default", this.node.width = 100, this.node.height = 100, this._renderTexture && this._renderTexture.initWithSize(this.node.width, this.node.height, cc.gfx.RB_FMT_S8), this._fboCamera) {
					this._fboCamera.targetTexture = this._renderTexture;
					var e = this.target.width + this.inflateW,
						t = this.target.height + this.inflateH;
					this._fboCamera.orthoSize = Math.min(e, t) / 2
				}
				if (this._fboSprite) {
					var n = new cc.SpriteFrame;
					this._fboSprite.spriteFrame = n
				}
			},
			updateTarget: function(e) {
				if (this.target) {
					if (this.___scale || (this.___scale = 1), this.node.width = this.target.width + this.inflateW, this.node.height = this.target.height + this.inflateH, this._renderTexture && this._renderTexture.initWithSize(this.target.width + this.inflateW, this.target.height + this.inflateH, cc.gfx.RB_FMT_S8), this._fboCamera) {
						this._fboCamera.targetTexture = this._renderTexture;
						var t = this.target.width + this.inflateW,
							n = this.target.height + this.inflateH;
						this._fboCamera.orthoSize = Math.min(t, n) / 2 * e
					}
					e && (this.___scale = e), this._targetGroupOld = this.target.group, this._targetAngleOld = 0, this._targetScaleXOld = 0, this._targetScaleYOld = 0, this._targetWidthOld = 0, this._targetHeightOld = 0, this._targetAnchorXOld = 0, this._targetAnchorYOld = 0
				} else this._resetTarget()
			},
			__preload: function() {},
			onLoad: function() {
				this._super(), this.node.group = "default", this.updateTarget()
			}
		}), cc._RF.pop()
	}, {
		"../namespace/FBONamespace": "FBONamespace"
	}],
	ShaderFXConst: [function(e, t) {
		"use strict";
		cc._RF.push(t, "82df6ajgF1PorjJ5mqqI67l", "ShaderFXConst");
		var n = e("../namespace/ShaderFXNamespace");
		n.ShaderFX.Const.RenderType = {
			NONE: 0,
			SPRITE: 1,
			ANIMATION: 2,
			BM_FONT: 3,
			TTF_FONT: 4,
			SYSTEM_FONT: 5,
			ATLAS_FONT: 6,
			DRAGONBONES: 7,
			SPINE: 8,
			PARTICLE_SYSTEM: 9,
			GRAPHICS: 10,
			TILED_LAYER: 11,
			TILED_MAP: 12,
			RICH_TEXT: 13,
			MOTION_STREAK: 14,
			SPRITE_ATLAS: 15,
			FBO: 16,
			MASK: 17
		}, n.ShaderFX.Const.UniformType = {
			FLOAT: 0,
			FLOAT2: 1,
			FLOAT3: 2,
			FLOAT4: 3,
			COLOR4: 4,
			SAMPLER2D: 5
		}, cc._RF.pop()
	}, {
		"../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXCustomComponentInfoPrefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "1a5e6oY/2tPB4AlQDkrVoWY", "ShaderFXCustomComponentInfoPrefab");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.CustomComponentInfo = cc.Class({
			extends: cc.Component,
			properties: {
				no: cc.Label,
				title: cc.Label,
				des: cc.Label,
				author: cc.Label,
				date: cc.Label,
				cid: cc.Label,
				cate: cc.Label,
				toolTip: cc.Node,
				localFlag: cc.Node,
				cloudFlag: cc.Node,
				downloadButton: cc.Button,
				removeButton: cc.Button,
				cloneButton: cc.Button,
				capture: cc.Node,
				previewNode: cc.Node,
				preview: cc.Sprite
			},
			onLoad: function() {},
			start: function() {},
			init: function(e, t, o, i) {
				this.info = t, this.cloud = i, this.cid.string = t.uuid, this.no.string = e + ".", this.title.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.name + "/" + t.name_zh : t.name, this.des.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.description.zh : t.description.en, this.author.string = t.author ? t.author : "???", this.cate.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.category.en + "/" + t.category.zh : t.category.en;
				var a = new Date(t.date);
				if (this.date.string = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds(), o ? (this.localFlag.color = cc.Color.GREEN, this.downloadButton.interactable = !0, this.removeButton.interactable = !0, this.cloneButton.interactable = !0) : (this.localFlag.color = cc.Color.YELLOW, this.downloadButton.interactable = !0, this.removeButton.interactable = !1, this.cloneButton.interactable = !1), this.downloadButton.interactable = !0, this.previewNode.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterCapture, this), this.previewNode.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveCapture, this), this.cloud) {
					if (this.cloud.capture) {
						var r = this;
						n.ShaderFX.DnDUtil.generateTexture2D(this.cloud.capture, function(e) {
							r.preview.spriteFrame = new cc.SpriteFrame(e)
						})
					}
				} else if (this.info.capture) {
					this.capture.color = cc.Color.GREEN;
					var s = this;
					n.ShaderFX.DnDUtil.generateTexture2D(this.info.capture, function(e) {
						s.preview.spriteFrame = new cc.SpriteFrame(e)
					})
				}
			},
			onDownload: function() {
				var e;
				this.localFlag.color = cc.Color.GREEN, this.removeButton.interactable = !0, this.cloneButton.interactable = !0, (e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Download", !0)).target = this.node, e.setUserData(this.cloud), cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u4e0b\u8f7d\u6210\u529f\uff0c\u4f60\u53ef\u4ee5\u5728[\u53f3\u952e\u83dc\u5355]\u4e2d\u627e\u5230\u8be5\u7ec4\u4ef6"), cc.systemEvent.dispatchEvent(e)
			},
			onClone: function() {
				(e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Clone", !0)).target = this.node;
				var e, t = Object.assign({}, this.info);
				delete t.prefab, delete t.fx, t.name = t.name + "Clone", t.name_zh = t.name_zh + "\u514b\u9686", t.uuid = n.ShaderFX.Util.uuidv4(), t.author = n.ShaderFX.LeanCloudUtil.getCurrentUsername(), e.setUserData({
					component: JSON.stringify(t),
					custom: !0,
					folder: JSON.stringify({
						en: t.category.en,
						zh: t.category.zh
					}),
					official: !1,
					uuid: t.uuid
				}), cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u514b\u9686\u6210\u529f\uff0c\u4f60\u53ef\u4ee5\u5728[\u6211\u7684\u7ec4\u4ef6]\u4e2d\u627e\u5230\u8be5\u7ec4\u4ef6\u5e76\u8fdb\u884c\u8fdb\u4e00\u6b65\u7f16\u8f91\u4f7f\u7528"), cc.systemEvent.dispatchEvent(e)
			},
			onRemove: function() {
				var e;
				this.localFlag.color = cc.Color.YELLOW, this.downloadButton.interactable = !0, this.removeButton.interactable = !1, this.cloneButton.interactable = !1, (e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Remove", !0)).target = this.node, e.setUserData(this.cloud ? this.cloud : this.info), cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u5220\u9664\u7ec4\u4ef6\u6210\u529f"), cc.systemEvent.dispatchEvent(e)
			},
			onMouseEnterTitle: function() {
				this.toolTip.active = !0
			},
			onMouseLeaveTitle: function() {
				this.toolTip.active = !1
			},
			onMouseEnterCapture: function() {
				this.preview.node.scale = 1.2
			},
			onMouseLeaveCapture: function() {
				this.preview.node.scale = 1
			},
			onVideo: function() {
				var e;
				this.cloud && this.cloud.video ? ((e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Video", !0)).target = this.node, e.setUserData(this.cloud.video), cc.systemEvent.dispatchEvent(e)) : ((e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Video", !0)).target = this.node, e.setUserData("https://supersuraccoon.gitee.io/ssrshaderfxeditorweb/doc/res/FXEditor/sample/premade/" + this.info.name + "Sample.mkv"), cc.systemEvent.dispatchEvent(e))
			},
			updateCloud: function(e) {
				this.cloud = e, this.downloadButton.interactable = !0
			},
			updateCapture: function(e) {
				var t = this;
				n.ShaderFX.DnDUtil.generateTexture2D(e, function(e) {
					t.preview.spriteFrame = new cc.SpriteFrame(e)
				})
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXCustomComponentUtil: [function(e, t) {
		"use strict";
		cc._RF.push(t, "74f7e4yrxFNeZJwdcDRNJv2", "ShaderFXCustomComponentUtil");
		var n = e("../namespace/ShaderFXNamespace");
		n.ShaderFX.CustomComponentUtil.init = function() {}, t.exports = n.ShaderFX.CustomComponentUtil, cc._RF.pop()
	}, {
		"../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXData: [function(e, t) {
		"use strict";

		function n(e, t) {
			for (var n = 0; n < t.length; n++) {
				var o = t[n];
				o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
			}
		}
		cc._RF.push(t, "6851foB+0pKIJdWH7uHVKU8", "ShaderFXData");
		var o = e("../namespace/ShaderFXNamespace");
		o.ShaderFX.Data.RenderTargetInfo = function() {
			this.node = null, this.renderComponent = null, this.renderType = null, this.oldMaterial = null, this.material = null
		}, o.ShaderFX.Data.Technique = function() {
			function e(e, t) {
				this._name = e, this._passes = t
			}
			var t, o;
			return e.prototype.clone = function() {
				for (var e = [], t = 0; t < this._passes.length; t++) e.push(this._passes[t].clone());
				return new __Technique(this._name, e)
			}, t = e, (o = [{
				key: "name",
				get: function() {
					return this._name
				}
			}, {
				key: "passes",
				get: function() {
					return this._passes
				}
			}]) && n(t.prototype, o), e
		}(), cc._RF.pop()
	}, {
		"../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXDnDUtil: [function(e, t) {
		"use strict";
		cc._RF.push(t, "50234ED5uFOPKgvHP8arH1K", "ShaderFXDnDUtil");
		var n = e("../namespace/ShaderFXNamespace");
		n.ShaderFX.DnDUtil = function() {}, n.ShaderFX.DnDUtil.targets = [], n.ShaderFX.DnDUtil.Data = function() {
			this.target = null, this.dropZone = null, this.dropCallback = null, this.extensions = null, this.limit = null
		}, n.ShaderFX.DnDUtil.enable = function(e, t, o, i, a) {
			if (!cc.sys.isNative) {
				var r = null;
				if (r = "undefined" != typeof Editor ? document.getElementById("ssr-shaderfx-editor") ? document.getElementById("ssr-shaderfx-editor").shadowRoot.getElementById("GameDiv") : document.getElementById("dock").shadowRoot.childNodes[7].childNodes[0].childNodes[1].childNodes[0].shadowRoot.getElementById("GameDiv") : document.getElementById("Cocos2dGameContainer")) {
					r.addEventListener("dragover", n.ShaderFX.DnDUtil.handleDragOver, !1), r.addEventListener("drop", n.ShaderFX.DnDUtil.handleFileSelect, !1);
					var s = new n.ShaderFX.DnDUtil.Data;
					s.target = e, s.dropZone = r, s.dropCallback = t, s.extensions = o || [], s.limit = i || -1, s.autoGenerateTexture = void 0 === a || a, n.ShaderFX.DnDUtil.targets.push(s)
				}
			}
		}, n.ShaderFX.DnDUtil.disable = function() {
			cc.sys.isNative || n.ShaderFX.DnDUtil.__dropZone && (dropZone.removeEventListener("dragover"), dropZone.removeEventListener("drop"), n.ShaderFX.DnDUtil.__dropZone = null)
		}, n.ShaderFX.DnDUtil.fileExtensionFilter = function(e, t) {
			if (t.length <= 0) return !0;
			for (var n = 0; n < t.length; n++)
				if (t[n] == e) return !0;
			return !1
		}, n.ShaderFX.DnDUtil.handleDragOver = function(e) {
			e.stopPropagation(), e.preventDefault(), e.dataTransfer.dropEffect = "copy"
		}, n.isFunction = function(e) {
			return "function" == typeof e
		}, n.ShaderFX.DnDUtil.getHTMLElementPosition = function(e) {
			var t, o = document.documentElement,
				i = window;
			return {
				left: (t = n.isFunction(e.getBoundingClientRect) ? e.getBoundingClientRect() : {
					left: 0,
					top: 0,
					width: parseInt(e.style.width),
					height: parseInt(e.style.height)
				}).left + i.pageXOffset - o.clientLeft,
				top: t.top + i.pageYOffset - o.clientTop,
				width: t.width,
				height: t.height
			}
		}, n.ShaderFX.DnDUtil.getPointByEvent = function(e, t) {
			return null != e.pageX ? {
				x: e.pageX,
				y: e.pageY
			} : (t.left -= document.body.scrollLeft, t.top -= document.body.scrollTop, {
				x: e.clientX,
				y: e.clientY
			})
		}, n.ShaderFX.DnDUtil.handleFileSelect = function(e) {
			e.stopPropagation(), e.preventDefault();
			for (var t = e.dataTransfer.files, o = 0; o < n.ShaderFX.DnDUtil.targets.length; o++) {
				var i = n.ShaderFX.DnDUtil.targets[o];
				n.ShaderFX.DnDUtil.handleTarget(i, t, e)
			}
		}, n.ShaderFX.DnDUtil.generateTexture2D = function(e, t) {
			var n = new Image;
			n.crossOrigin = null, n.addEventListener("load", function() {
				var e = new cc.Texture2D;
				e.initWithElement(n), e.handleLoadedTexture(), t(e)
			}), n.src = e
		}, n.ShaderFX.DnDUtil.generateTexture2Ds = function(e, t) {
			for (var n = [], o = 0, i = 0; i < e.length; i++) {
				var a = e[i],
					r = new Image;
				r.crossOrigin = null, r.addEventListener("load", function() {
					o += 1;
					var i = self._texture2d = new cc.Texture2D;
					i.initWithElement(r), i.handleLoadedTexture(), n.push(i), o == e.length && t(n)
				}), r.src = a
			}
		}, n.ShaderFX.DnDUtil.handleTarget = function(e, t, o) {
			var i = n.ShaderFX.DnDUtil.getHTMLElementPosition(e.dropZone),
				a = n.ShaderFX.DnDUtil.getPointByEvent(o, i);
			if (i = cc.view.convertToLocationInView(a.x, a.y, i), cc.view._convertPointWithScale(i), e.target) {
				var r = e.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
				if (cc.rect(r.x - e.target.width / 2, r.y - e.target.height / 2, e.target.width, e.target.height), !e.target.getBoundingBoxToWorld().contains(i)) return
			}
			for (var s = 0, c = [], l = function() {
					var o = t[h];
					o instanceof File && (-1 == e.limit || s < e.limit) && (u = cc.path.extname(o.name), n.ShaderFX.DnDUtil.fileExtensionFilter(u, e.extensions) && (p = new FileReader, ".png" == u || ".jpg" == u || ".jpeg" == u || ".PNG" == u || ".JPG" == u || ".JPEG" == u ? p.readAsDataURL(o) : p.readAsText(o), p.onload = function(i) {
						e.autoGenerateTexture ? ".png" == u || ".jpg" == u || ".jpeg" == u || ".PNG" == u || ".JPG" == u || ".JPEG" == u ? n.ShaderFX.DnDUtil.generateTexture2D(i.target.result, function(t) {
							s += 1, c.push({
								name: o.name,
								ext: u,
								content: i.target.result,
								texture: t
							}), e.dropCallback(c)
						}) : (s += 1, c.push({
							name: o.name,
							ext: u,
							content: i.target.result
						})) : (s += 1, c.push({
							name: o.name,
							ext: u,
							content: i.target.result
						}), s == t.length && e.dropCallback(c))
					}))
				}, h = 0; h < t.length; h++) {
				var u, p;
				l()
			}
		}, t.exports = n.ShaderFX.DnDUtil, cc._RF.pop()
	}, {
		"../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXExporterUtil: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d7573p0iExO970L+GFpxKJJ", "ShaderFXExporterUtil");
		var n = e("../namespace/ShaderFXNamespace");
		n.ShaderFX.ExporterUtil.PREVIEW_DATA = {}, n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_SPRITE_MATERIAL = null, n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_SPRITE_EFFECT = null, n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_MATERIAL = null, n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT = null, n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_STANDARD_MATERIAL = null, n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_STANDARD_EFFECT = null, n.ShaderFX.ExporterUtil.updateActivePreivew = function(e, t) {
			Editor.assetdb || Editor.Message.request("asset-db", "query-asset-info", "db://assets/ssr-shader-fx").then(function(o) {
				o ? n.ShaderFX.ExporterUtil.effect3DUnlit(e, "preview", "db://assets/ssr-shader-fx/", !1, !1, function() {
					n.ShaderFX.ExporterUtil.effect3DSprite(e, "preview", "db://assets/ssr-shader-fx/", !0, !1, function() {
						n.ShaderFX.ExporterUtil.updateActivePreivew3DSpriteMaterial(function() {
							n.ShaderFX.ExporterUtil.updateActivePreivew3DSpriteEffect(function() {
								n.ShaderFX.ExporterUtil.updateActivePreivew3DUnlitEffect(function() {
									n.ShaderFX.ExporterUtil.updateAllFX(t)
								})
							})
						})
					})
				}) : Editor.Message.request("asset-db", "create-asset", "db://assets/ssr-shader-fx").then(function() {
					n.ShaderFX.ExporterUtil.effect3DUnlit(e, "preview", "db://assets/ssr-shader-fx/", !1, !1, function() {
						n.ShaderFX.ExporterUtil.effect3DSprite(e, "preview", "db://assets/ssr-shader-fx/", !0, !1, function() {
							n.ShaderFX.ExporterUtil.updateActivePreivew3DUnlitEffect(function(e) {
								e && n.ShaderFX.ExporterUtil.updateAllFX(t)
							})
						})
					})
				}, function() {})
			}, function() {})
		}, n.ShaderFX.ExporterUtil.updateActivePreivew3DUnlitMaterial = function() {}, n.ShaderFX.ExporterUtil.updateActivePreivew3DSpriteMaterial = function() {
			Editor.Message.request("asset-db", "query-asset-info", "db://assets/ssr-shader-fx/preview_3D_Sprite.mtl").then(function(e) {
				var t = e.uuid;
				Editor.Message.request("scene", "query-material", t).then(function(e) {
					n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_SPRITE_MATERIAL = e, n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_SPRITE_MATERIAL.uuid = t
				}).catch(function(e) {
					console.warn("query-material"), console.warn(e)
				})
			}).catch(function(e) {
				console.warn("query-asset-info"), console.warn(e)
			})
		}, n.ShaderFX.ExporterUtil.updateActivePreivew3DSpriteEffect = function(e) {
			Editor.Message.request("scene", "query-effect", "../ssr-shader-fx/preview_3D_Sprite").then(function(t) {
				n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_SPRITE_EFFECT = t, e && e(!0)
			}).catch(function() {
				e && e(!1)
			})
		}, n.ShaderFX.ExporterUtil.updateActivePreivew3DUnlitEffect = function(e) {
			Editor.Message.request("scene", "query-effect", "../ssr-shader-fx/preview_3D_Unlit").then(function(t) {
				console.warn("ssr.ShaderFX.ExporterUtil.updateActivePreivew3DUnlitEffect"), n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT = t, e && e(!0)
			}).catch(function(t) {
				console.warn("ssr.ShaderFX.ExporterUtil.updateActivePreivew3DUnlitEffect"), console.warn(t), e && e(!1)
			})
		}, n.ShaderFX.ExporterUtil.updateAllFX = function(e) {
			for (var t in n.ShaderFX.ExporterUtil.PREVIEW_DATA) n.ShaderFX.ExporterUtil.updateMaterialFX(t, e)
		}, n.ShaderFX.ExporterUtil.updateFX = function(e, t) {
			var o = e.uuid.value,
				i = e.__comps__[0].value.sharedMaterials.value[0].value.uuid;
			n.ShaderFX.ExporterUtil.PREVIEW_DATA[i] && !n.ShaderFX.ExporterUtil.PREVIEW_DATA[i].modified ? n.ShaderFX.ExporterUtil.updateMaterialFX(o, i, t) : t && t(!1)
		}, n.ShaderFX.ExporterUtil.updateMaterialFX = function(e, t, o) {
			"3d" == n.ShaderFX.ExporterUtil.PREVIEW_DATA[t].cate ? n.ShaderFX.ExporterUtil.updateMaterialFX3DUnlit(e, t, o) : n.ShaderFX.ExporterUtil.updateMaterialFX3DSprite(e, t, o)
		}, n.ShaderFX.ExporterUtil.updateMaterialFX3DSprite = function(e, t, o) {
			Editor.Message.request("scene", "set-property", {
				uuid: e,
				path: "__comps__.1.customMaterial",
				dump: {
					type: "cc.Material",
					value: {
						uuid: n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_SPRITE_MATERIAL.uuid
					}
				}
			}).then(function() {
				o && o(!0)
			}).catch(function(e) {
				console.warn("set-property"), console.warn(e), o && o(!1)
			})
		}, n.ShaderFX.ExporterUtil.updateMaterialFX3DUnlit = function(e, t, o) {
			var i = n.ShaderFX.ExporterUtil.PREVIEW_DATA[t].materialFX;
			i.effect = "../ssr-shader-fx/preview_3D_Unlit";
			for (var a = !1, r = 0; r < i.data[i.technique].passes.length; r++) {
				for (var s = i.data[i.technique].passes[r], c = s.props, l = s.defines, h = 0; h < c.length; h++)
					if ("mainTexture" == c[h].name && c[h].value.uuid && "" != c[h].value.uuid) {
						a = !0, n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT[i.technique].passes[0].props[0].value.uuid = c[h].value.uuid;
						break
					}
				for (var u = 0; u < l.length; u++)
					if ("USE_ALPHA_TEST" == l[u].name && l[u].value) {
						a = !0;
						break
					}
			}
			if (a)
				for (var p = 0; p < n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT[i.technique].passes[0].defines.length; p++)
					if ("USE_TEXTURE" == n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT[i.technique].passes[0].defines[p].name) {
						n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT[i.technique].passes[0].defines[p].value = !0;
						break
					}
			if (a)
				for (var d = 0; d < n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT[i.technique].passes[0].defines.length; d++)
					if ("USE_ALPHA_TEST" == n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT[i.technique].passes[0].defines[d].name) {
						n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT[i.technique].passes[0].defines[d].value = !0;
						break
					}
			i.data = n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT, n.ShaderFX.ExporterUtil.PREVIEW_DATA[t].modified = !0, Editor.Message.request("scene", "preview-material", t, i).then(function() {
				Editor.Message.broadcast("material-inspector:change-dump"), Editor.Message.request("scene", "apply-material", t, i).then(function() {}).catch(function() {}), console.warn("ssr.ShaderFX.ExporterUtil.updateFX"), console.warn(n.ShaderFX.ExporterUtil.PREVIEW_DATA), o && o(!0)
			}).catch(function() {
				o && o(!1)
			})
		}, n.ShaderFX.ExporterUtil.syncMaterial = function() {
			for (var e in Editor.Message.request("scene", "apply-material", n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_SPRITE_MATERIAL.uuid, n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_SPRITE_MATERIAL).then(function(e) {
					console.warn("apply-material"), console.warn(e)
				}).catch(function(e) {
					console.warn("apply-material"), console.warn(e)
				}), n.ShaderFX.ExporterUtil.PREVIEW_DATA) {
				var t = n.ShaderFX.ExporterUtil.PREVIEW_DATA[e].materialFX;
				Editor.Message.request("scene", "apply-material", e, t).then(function(e) {
					console.warn("apply-material"), console.warn(e)
				}).catch(function(e) {
					console.warn("apply-material"), console.warn(e)
				});
				break
			}
		}, n.ShaderFX.ExporterUtil.getTargetsWithSameMaterial = function(e) {
			var t = e.__comps__[0].value.sharedMaterials.value[0].value.uuid;
			return n.ShaderFX.ExporterUtil.PREVIEW_DATA[t] ? n.ShaderFX.ExporterUtil.PREVIEW_DATA[t].node : []
		}, n.ShaderFX.ExporterUtil.restoreFX = function(e, t, o) {
			if ("2d" == t) Editor.Message.request("scene", "set-property", {
				uuid: e.uuid.value,
				path: "__comps__.1.customMaterial",
				dump: {
					type: "cc.Material",
					value: {
						uuid: ""
					}
				}
			}).then(function() {
				o && o(!0)
			}).catch(function() {
				o && o(!1)
			});
			else {
				var i = e.__comps__[0].value.sharedMaterials.value[0].value.uuid;
				if (!n.ShaderFX.ExporterUtil.PREVIEW_DATA[i] || !n.ShaderFX.ExporterUtil.PREVIEW_DATA[i].modified) return void(o && o(!1));
				Editor.Message.request("scene", "preview-material", i, n.ShaderFX.ExporterUtil.PREVIEW_DATA[i].material).then(function() {
					Editor.Message.broadcast("material-inspector:change-dump"), Editor.Message.request("scene", "apply-material", i, n.ShaderFX.ExporterUtil.PREVIEW_DATA[i].material).then(function() {
						delete n.ShaderFX.ExporterUtil.PREVIEW_DATA[i], o && o(!0)
					}).catch(function() {
						delete n.ShaderFX.ExporterUtil.PREVIEW_DATA[i], o && o(!0)
					})
				}).catch(function() {
					delete n.ShaderFX.ExporterUtil.PREVIEW_DATA[i], o && o(!0)
				})
			}
		}, n.ShaderFX.ExporterUtil.updatePreviewData = function(e, t, o) {
			var i = e.__comps__[0].value.sharedMaterials.value[0].value.uuid,
				a = e.uuid.value;
			n.ShaderFX.ExporterUtil.PREVIEW_DATA[i] ? (n.ShaderFX.ExporterUtil.PREVIEW_DATA[i].node[a] || (n.ShaderFX.ExporterUtil.PREVIEW_DATA[i].node[a] = !0), console.warn("ssr.ShaderFX.ExporterUtil.updatePreviewData"), console.warn(n.ShaderFX.ExporterUtil.PREVIEW_DATA), o && o(!1)) : Editor.Message.request("scene", "query-material", i).then(function(e) {
				n.ShaderFX.ExporterUtil.PREVIEW_DATA[i] = {
					node: {},
					materialFX: Object.assign({}, e),
					material: Object.assign({}, e),
					gallery: "3d" == t ? n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_UNLIT_EFFECT : n.ShaderFX.ExporterUtil.ACTIVE_PREVIEW_3D_SPRITE_EFFECT,
					modified: !1,
					cate: t
				}, n.ShaderFX.ExporterUtil.PREVIEW_DATA[i].node[a] = !0, console.warn("ssr.ShaderFX.ExporterUtil.updatePreviewData"), console.warn(n.ShaderFX.ExporterUtil.updatePreviewData), o && o(!0)
			}).catch(function() {
				o && o(!1)
			})
		}, n.ShaderFX.ExporterUtil.effect2DSpriteAndSpine = function(e, t, o) {
			e.input;
			for (var i = {
					techniques: [{
						passes: [{
							vert: "vs",
							frag: "fs",
							blendState: {
								targets: [{
									blend: !0
								}]
							},
							rasterizerState: {
								cullMode: "none"
							},
							properties: {
								texture: {
									value: "white"
								}
							}
						}]
					}]
				}, a = "\nCCEffect %{\n@@EFFECT_SEGMENT@@\n}%\n        ", r = "\nCCProgram vs %{\n    precision highp float;\n    #include <cc-global>\n    #include <cc-local>\n\n    in vec3 a_position;\n    #if USE_TEXTURE\n        in vec2 a_uv0;\n        out vec2 v_uv0;\n    #endif  \n    in vec4 a_color;\n    out vec4 v_color;\n\n    void main () {\n        mat4 mvp;\n        #if CC_USE_MODEL\n            mvp = cc_matViewProj * cc_matWorld;\n        #else\n            mvp = cc_matViewProj;\n        #endif\n\n        #if USE_TEXTURE\n            v_uv0 = a_uv0;\n        #endif\n\n        #if USE_TINT\n            // clear warning for spine\n        #endif\n\n        v_color = a_color;\n        gl_Position = mvp * vec4(a_position, 1);\n    }\n}%\n        ", s = "\nCCProgram fs %{\n    precision highp float;\n    #include <cc-global>\n    #if USE_TEXTURE\n        in vec2 v_uv0;\n        uniform sampler2D texture;\n    #endif\n    in vec4 v_color;\n    @@UNIFORM_CONSTANT_SEGMENT@@\n    @@CODE_SEGMENT@@\n}%\n        ", c = 0; c < e.input.length; c++) {
				var l = e.input[c];
				"vec4" != l.type || l.isMainTexture ? "float" != l.type || l.isTime ? "bool" == l.type ? i.techniques[0].passes[0].properties["u" + l.name] = {
					value: l.default,
					editor: {
						type: "boolean"
					}
				} : "vec2" == l.type ? l.isUV0 || (i.techniques[0].passes[0].properties["u" + l.name] = {
					value: [l.default.split(",")[0], l.default.split(",")[1]]
				}) : "vec3" == l.type ? i.techniques[0].passes[0].properties["u" + l.name] = {
					value: [l.default.split(",")[0], l.default.split(",")[1], l.default.split(",")[2]]
				} : "sampler2D" != l.type || l.isMainTexture || (i.techniques[0].passes[0].properties["u" + l.name] = {
					value: "white"
				}) : i.techniques[0].passes[0].properties["u" + l.name] = {
					value: l.default
				} : l.isColor ? (l.value = cc.color(l.default), i.techniques[0].passes[0].properties["u" + l.name] = {
					value: [(l.value.r / 255).toFixed(3), (l.value.g / 255).toFixed(3), (l.value.b / 255).toFixed(3), (l.value.a / 255).toFixed(3)],
					editor: {
						type: "color"
					}
				}) : i.techniques[0].passes[0].properties["u" + l.name] = {
					value: [l.default.split(",")[0], l.default.split(",")[1], l.default.split(",")[2], l.default.split(",")[2]]
				}
			}
			var h = "uniform Constant {\n";
			for (c = 0; c < e.input.length; c++) "vec4" != (d = e.input[c]).type && "cc.Color" != d.type || d.isMainTexture || (h += "\t\tvec4 u" + d.name + ";\n");
			for (c = 0; c < e.input.length; c++) "vec3" == (d = e.input[c]).type && (h += "\t\tvec3 u" + d.name + ";\n");
			for (c = 0; c < e.input.length; c++) "vec2" != (d = e.input[c]).type || d.isUV0 || (h += "\t\tvec2 u" + d.name + ";\n");
			for (c = 0; c < e.input.length; c++) "float" != (d = e.input[c]).type || d.isTime || (h += "\t\tfloat u" + d.name + ";\n");
			for (c = 0; c < e.input.length; c++) "bool" == (d = e.input[c]).type && (h += "\t\tbool u" + d.name + ";\n");
			for (h += "\t};\n", c = 0; c < e.input.length; c++) "sampler2D" == (d = e.input[c]).type && (h += "\tuniform sampler2D u" + d.name + ";\n");
			for (var u in s = s.replace("@@UNIFORM_CONSTANT_SEGMENT@@", h), e.frags) e.frags[u].join("\n");
			var p = "";
			if (e.frags && 0 === Object.keys(e.frags).length && e.frags.constructor === Object);
			else
				for (var u in e.frags) p += e.frags[u].join("\n"), p += "\n";
			for (p += e.main.join("\n").replace("main", e.name + "_main"), p += "\n\nvoid main () {\n", p += "    gl_FragColor = " + e.name + "_main(", c = 0; c < e.input.length; c++) {
				var d;
				(d = e.input[c]).isMainTexture ? d.isColor ? p += "texture2D(texture, v_uv0)" : p += "texture" : d.isUV0 ? p += "v_uv0" : d.isTime ? p += "cc_time[0]" : p += "u" + d.name, c != e.input.length - 1 && (p += ", ")
			}
			if (p += ");\n", p += "} \n", s = s.replace("@@CODE_SEGMENT@@", p.replace(/[\r\n]+/gm, "\n\t")), a = a.replace("@@EFFECT_SEGMENT@@", json2yaml(i).replace(/\"/g, "")), cc.log(a + r + s), o || (o = "db://assets/"), t || (t = e.name), "undefined" == typeof Editor || Editor.App) window.download(a + r + s, t + ".effect", "application/json"), n.ShaderFX.ExporterUtil.material2DSpriteAndSpine(null, e, t, o);
			else {
				var f = o + t + ".effect";
				Editor.assetdb.createOrSave(f, a + r + s, function() {
					Editor.assetdb.queryUuidByUrl(f, function(i, a) {
						i || n.ShaderFX.ExporterUtil.material2DSpriteAndSpine(a, e, t, o)
					})
				})
			}
		}, n.ShaderFX.ExporterUtil.material2DSpriteAndSpine = function(e, t, o, i) {
			for (var a = {
					__type__: "cc.Material",
					_name: t.name,
					_objFlags: 0,
					_native: "",
					_effectAsset: {
						__uuid__: e || n.ShaderFX.Util.uuidv4()
					},
					_techniqueIndex: 0,
					_techniqueData: {
						0: {
							props: {},
							defines: {
								USE_TEXTURE: !0
							}
						}
					}
				}, r = 0; r < t.input.length; r++) {
				var s = t.input[r];
				"float" != s.type || s.isTime ? "bool" == s.type || ("vec2" == s.type ? s.isUV0 || (this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + s.name] && this._configuration.uniforms["u" + s.name].tunned ? a._techniqueData[0].props["u" + s.name] = {
					__type__: "cc.Vec2",
					x: parseFloat(this._configuration.uniforms["u" + s.name].tunned.split(",")[0]),
					y: parseFloat(this._configuration.uniforms["u" + s.name].tunned.split(",")[1])
				} : a._techniqueData[0].props["u" + s.name] = {
					__type__: "cc.Vec2",
					x: parseFloat(t.input[r].default.split(",")[0]),
					y: parseFloat(t.input[r].default.split(",")[1])
				}) : "vec3" == s.type ? this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + s.name] && this._configuration.uniforms["u" + s.name].tunned ? a._techniqueData[0].props["u" + s.name] = {
					__type__: "cc.Vec3",
					x: parseFloat(this._configuration.uniforms["u" + s.name].tunned.split(",")[0]),
					y: parseFloat(this._configuration.uniforms["u" + s.name].tunned.split(",")[1]),
					z: parseFloat(this._configuration.uniforms["u" + s.name].tunned.split(",")[2])
				} : a._techniqueData[0].props["u" + s.name] = {
					__type__: "cc.Vec3",
					x: parseFloat(t.input[r].default.split(",")[0]),
					y: parseFloat(t.input[r].default.split(",")[1]),
					z: parseFloat(t.input[r].default.split(",")[2])
				} : "vec4" != s.type || s.isMainTexture ? "sampler2D" != s.type || s.isMainTexture || (a._techniqueData[0].props["u" + s.name] = "") : s.isColor ? this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + s.name] && this._configuration.uniforms["u" + s.name].tunned ? a._techniqueData[0].props["u" + s.name] = {
					__type__: "cc.Color",
					r: parseInt(this._configuration.uniforms["u" + s.name].tunned.r),
					g: parseInt(this._configuration.uniforms["u" + s.name].tunned.g),
					b: parseInt(this._configuration.uniforms["u" + s.name].tunned.b),
					a: parseInt(this._configuration.uniforms["u" + s.name].tunned.a)
				} : (s.value = cc.color(t.input[r].default), a._techniqueData[0].props["u" + s.name] = {
					__type__: "cc.Color",
					r: parseInt(s.value.r),
					g: parseInt(s.value.g),
					b: parseInt(s.value.b),
					a: parseInt(s.value.a)
				}) : this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + s.name] && this._configuration.uniforms["u" + s.name].tunned ? a._techniqueData[0].props["u" + s.name] = {
					__type__: "cc.Vec4",
					x: parseFloat(this._configuration.uniforms["u" + s.name].tunned.split(",")[0]),
					y: parseFloat(this._configuration.uniforms["u" + s.name].tunned.split(",")[1]),
					z: parseFloat(this._configuration.uniforms["u" + s.name].tunned.split(",")[2]),
					w: parseFloat(this._configuration.uniforms["u" + s.name].tunned.split(",")[3])
				} : a._techniqueData[0].props["u" + s.name] = {
					__type__: "cc.Vec4",
					x: parseFloat(t.input[r].default.split(",")[0]),
					y: parseFloat(t.input[r].default.split(",")[1]),
					z: parseFloat(t.input[r].default.split(",")[2]),
					w: parseFloat(t.input[r].default.split(",")[3])
				}) : this._configuration && this._configuration.uniforms && this._configuration.uniforms["u" + s.name] && this._configuration.uniforms["u" + s.name].tunned ? a._techniqueData[0].props["u" + s.name] = parseFloat(this._configuration.uniforms["u" + s.name].tunned) : a._techniqueData[0].props["u" + s.name] = parseFloat(t.input[r].default)
			}
			i || (i = "db://assets/"), o || (o = t.name), "undefined" == typeof Editor || Editor.App ? window.download(JSON.stringify(a, null, 4), o + ".mtl", "application/json") : Editor.assetdb.create(i + o + ".mtl", JSON.stringify(a, null, 4))
		}, n.ShaderFX.ExporterUtil.effect3DStandard = function() {}, n.ShaderFX.ExporterUtil.effect3DUnlit = function(e, t, o, i, a, r) {
			for (var s = {
					techniques: [{
						name: "opaque",
						passes: [{
							vert: "unlit-vs:vert",
							frag: "unlit-fs:frag",
							properties: {
								mainTexture: {
									value: "grey"
								},
								tilingOffset: {
									value: [1, 1, 0, 0]
								},
								mainColor: {
									value: [1, 1, 1, 1],
									editor: {
										type: "color"
									}
								},
								colorScale: {
									value: [1, 1, 1],
									target: "colorScaleAndCutoff.xyz"
								},
								alphaThreshold: {
									value: .5,
									target: "colorScaleAndCutoff.w",
									editor: {
										parent: "USE_ALPHA_TEST"
									}
								},
								color: {
									target: "mainColor",
									editor: {
										visible: !1
									}
								}
							},
							migrations: {
								properties: {
									mainColor: {
										formerlySerializedAs: "color"
									}
								}
							}
						}]
					}, {
						name: "transparent",
						passes: [{
							vert: "unlit-vs:vert",
							frag: "unlit-fs:frag",
							depthStencilState: {
								depthTest: !0,
								depthWrite: !1
							},
							blendState: {
								targets: [{
									blend: !0,
									blendSrc: "src_alpha",
									blendDst: "one_minus_src_alpha",
									blendDstAlpha: "one_minus_src_alpha"
								}]
							},
							properties: {
								mainTexture: {
									value: "grey"
								},
								tilingOffset: {
									value: [1, 1, 0, 0]
								},
								mainColor: {
									value: [1, 1, 1, 1],
									editor: {
										type: "color"
									}
								},
								colorScale: {
									value: [1, 1, 1],
									target: "colorScaleAndCutoff.xyz"
								},
								alphaThreshold: {
									value: .5,
									target: "colorScaleAndCutoff.w",
									editor: {
										parent: "USE_ALPHA_TEST"
									}
								},
								color: {
									target: "mainColor",
									editor: {
										visible: !1
									}
								}
							},
							migrations: {
								properties: {
									mainColor: {
										formerlySerializedAs: "color"
									}
								}
							}
						}]
					}, {
						name: "add",
						passes: [{
							vert: "unlit-vs:vert",
							frag: "unlit-fs:frag",
							rasterizerState: {
								cullMode: "none"
							},
							depthStencilState: {
								depthTest: !0,
								depthWrite: !1
							},
							blendState: {
								targets: [{
									blend: !0,
									blendSrc: "src_alpha",
									blendDst: "one",
									blendSrcAlpha: "src_alpha",
									blendDstAlpha: "one"
								}]
							},
							properties: {
								mainTexture: {
									value: "grey"
								},
								tilingOffset: {
									value: [1, 1, 0, 0]
								},
								mainColor: {
									value: [1, 1, 1, 1],
									editor: {
										type: "color"
									}
								},
								colorScale: {
									value: [1, 1, 1],
									target: "colorScaleAndCutoff.xyz"
								},
								alphaThreshold: {
									value: .5,
									target: "colorScaleAndCutoff.w",
									editor: {
										parent: "USE_ALPHA_TEST"
									}
								},
								color: {
									target: "mainColor",
									editor: {
										visible: !1
									}
								}
							},
							migrations: {
								properties: {
									mainColor: {
										formerlySerializedAs: "color"
									}
								}
							}
						}]
					}, {
						name: "alpha-blend",
						passes: [{
							vert: "unlit-vs:vert",
							frag: "unlit-fs:frag",
							rasterizerState: {
								cullMode: "none"
							},
							depthStencilState: {
								depthTest: !0,
								depthWrite: !1
							},
							blendState: {
								targets: [{
									blend: !0,
									blendSrc: "src_alpha",
									blendDst: "one_minus_src_alpha",
									blendSrcAlpha: "src_alpha",
									blendDstAlpha: "one_minus_src_alpha"
								}]
							},
							properties: {
								mainTexture: {
									value: "grey"
								},
								tilingOffset: {
									value: [1, 1, 0, 0]
								},
								mainColor: {
									value: [1, 1, 1, 1],
									editor: {
										type: "color"
									}
								},
								colorScale: {
									value: [1, 1, 1],
									target: "colorScaleAndCutoff.xyz"
								},
								alphaThreshold: {
									value: .5,
									target: "colorScaleAndCutoff.w",
									editor: {
										parent: "USE_ALPHA_TEST"
									}
								},
								color: {
									target: "mainColor",
									editor: {
										visible: !1
									}
								}
							},
							migrations: {
								properties: {
									mainColor: {
										formerlySerializedAs: "color"
									}
								}
							}
						}]
					}]
				}, c = "\nCCEffect %{\n@@EFFECT_SEGMENT@@\n}%\n        ", l = "\n CCProgram unlit-vs %{\n   precision highp float;\n   #include <input>\n   #include <cc-global>\n   #include <cc-local-batch>\n   #include <input>\n   #include <cc-fog-vs>\n \n   #if USE_VERTEX_COLOR\n     in lowp vec4 a_color;\n     out lowp vec4 v_color;\n   #endif\n \n   #if USE_TEXTURE\n     out vec2 v_uv;\n     uniform TexCoords {\n       vec4 tilingOffset;\n     };\n   #endif\n \n   vec4 vert () {\n     vec4 position;\n     CCVertInput(position);\n \n     mat4 matWorld;\n     CCGetWorldMatrix(matWorld);\n \n     #if USE_TEXTURE\n       v_uv = a_texCoord * tilingOffset.xy + tilingOffset.zw;\n       #if SAMPLE_FROM_RT\n         CC_HANDLE_RT_SAMPLE_FLIP(v_uv);\n       #endif\n     #endif\n \n     #if USE_VERTEX_COLOR\n       v_color = a_color;\n     #endif\n \n     CC_TRANSFER_FOG(matWorld * position);\n     return cc_matProj * (cc_matView * matWorld) * position;\n   }\n }%\n", h = "\n  vec4 frag () {\n     vec4 o = shaderfx();\n     o.rgb *= colorScaleAndCutoff.xyz;\n \n     #if USE_VERTEX_COLOR\n       o *= v_color;\n     #endif\n \n    #if USE_ALPHA_TEST\n       if (o.ALPHA_TEST_CHANNEL < colorScaleAndCutoff.w) discard;\n     #endif\n \n     CC_APPLY_FOG(o);\n     return CCFragOutput(o);\n   }\n }%\n", u = 0; u < e.input.length; u++) {
				var p = e.input[u];
				"vec4" != p.type || p.isMainTexture ? "float" != p.type || p.isTime ? "bool" == p.type ? s.techniques[0].passes[0].properties["u" + p.name] = {
					value: p.default,
					editor: {
						type: "boolean"
					}
				} : "vec2" == p.type ? p.isUV0 || (s.techniques[0].passes[0].properties["u" + p.name] = {
					value: [p.default.split(",")[0], p.default.split(",")[1]]
				}) : "vec3" == p.type ? s.techniques[0].passes[0].properties["u" + p.name] = {
					value: [p.default.split(",")[0], p.default.split(",")[1], p.default.split(",")[2]]
				} : "sampler2D" != p.type || p.isMainTexture || (s.techniques[0].passes[0].properties["u" + p.name] = {
					value: "white"
				}) : s.techniques[0].passes[0].properties["u" + p.name] = {
					value: p.default
				} : p.isColor ? (p.value = cc.color(p.default), s.techniques[0].passes[0].properties["u" + p.name] = {
					value: [(p.value.r / 255).toFixed(3), (p.value.g / 255).toFixed(3), (p.value.b / 255).toFixed(3), (p.value.a / 255).toFixed(3)],
					editor: {
						type: "color"
					}
				}) : s.techniques[0].passes[0].properties["u" + p.name] = {
					value: [p.default.split(",")[0], p.default.split(",")[1], p.default.split(",")[2], p.default.split(",")[2]]
				}
			}
			var d = "\n  uniform Constant {\n    vec4 mainColor;\n    vec4 colorScaleAndCutoff;\n";
			for (u = 0; u < e.input.length; u++) "vec4" != (C = e.input[u]).type && "cc.Color" != C.type || C.isMainTexture || (d += "\t\tvec4 u" + C.name + ";\n");
			for (u = 0; u < e.input.length; u++) "vec3" == (C = e.input[u]).type && (d += "\t\tvec3 u" + C.name + ";\n");
			for (u = 0; u < e.input.length; u++) "vec2" != (C = e.input[u]).type || C.isUV0 || (d += "\t\tvec2 u" + C.name + ";\n");
			for (u = 0; u < e.input.length; u++) "float" != (C = e.input[u]).type || C.isTime || (d += "\t\tfloat u" + C.name + ";\n");
			for (u = 0; u < e.input.length; u++) "bool" == (C = e.input[u]).type && (d += "\t\tbool u" + C.name + ";\n");
			for (d += "\t};\n", u = 0; u < e.input.length; u++) "sampler2D" == (C = e.input[u]).type && (d += "\tuniform sampler2D u" + C.name + ";\n");
			for (var f in e.frags) e.frags[f].join("\n");
			var m = "";
			if (e.frags && 0 === Object.keys(e.frags).length && e.frags.constructor === Object);
			else
				for (var f in e.frags) m += e.frags[f].join("\n"), m += "\n";
			m += e.main.join("\n").replace("main", e.name + "_main");
			var g = e.name + "_main(";
			for (u = 0; u < e.input.length; u++) {
				var C;
				(C = e.input[u]).isMainTexture ? C.isColor ? g += "texture(mainTexture, v_uv)" : g += "mainTexture" : C.isUV0 ? g += "v_uv" : C.isTime ? g += "cc_time[0]" : g += "u" + C.name, u != e.input.length - 1 && (g += ", ")
			}
			g += ");", h = h.replace("shaderfx();", g);
			var _ = "\n CCProgram unlit-fs %{\n  precision highp float;\n  #include <output>\n  #include <cc-fog-fs>\n\n  #if USE_ALPHA_TEST\n    #pragma define ALPHA_TEST_CHANNEL options([a, r, g, b])\n  #endif\n\n  #if USE_TEXTURE\n    in vec2 v_uv;\n    uniform sampler2D mainTexture;\n  #endif\n\n  #if USE_VERTEX_COLOR\n    in lowp vec4 v_color;\n  #endif\n" + d + m.replace(/\btexture\b/g, "mainTexture").replace(/\btexture2D\b/g, "texture").replace(/\bv_uv0\b/g, "v_uv") + h;
			if (c = c.replace("@@EFFECT_SEGMENT@@", json2yaml(s).replace(/\"/g, "").replace(/\\x3A/g, ":")), o || (o = "db://assets/"), t || (t = e.name), "undefined" != typeof Editor) {
				var v = o + t + "_3D_Unlit.effect";
				Editor.assetdb ? Editor.assetdb.createOrSave(v, c + l + _, function() {
					Editor.assetdb.queryUuidByUrl(v, function(a, r) {
						a || (cc.log(a), cc.log("uuid: " + r), 1 != i && null != i || n.ShaderFX.ExporterUtil.material3DUnlit(r, e, t, o))
					})
				}) : Editor.Message.request("asset-db", "create-asset", v, c + l + _, {
					overwrite: !0
				}).then(function() {
					Editor.Message.request("asset-db", "query-uuid", v).then(function(a) {
						1 == i || null == i ? n.ShaderFX.ExporterUtil.material3DUnlit(a, e, t, o) : r && r()
					}).catch(function() {})
				}, function() {})
			} else window.download(c + l + _, t + "_3D_Unlit.effect", "application/json"), n.ShaderFX.ExporterUtil.material3DUnlit(null, e, t, o);
			if (1 == a || null == a) {
				var E = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
				E.setUserData((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa .effect \u6210\u529f: " : "Export .effect Succeeded | Name: ") + e.name), cc.systemEvent.dispatchEvent(E)
			}
		}, n.ShaderFX.ExporterUtil.effect3DSprite = function(e, t, o, i, a, r) {
			for (var s = {
					techniques: [{
						passes: [{
							vert: "sprite-vs:vert",
							frag: "sprite-fs:frag",
							depthStencilState: {
								depthTest: !1,
								depthWrite: !1
							},
							blendState: {
								targets: [{
									blend: !0,
									blendSrc: "src_alpha",
									blendDst: "one_minus_src_alpha",
									blendDstAlpha: "one_minus_src_alpha"
								}]
							},
							rasterizerState: {
								cullMode: "none"
							},
							properties: {
								alphaThreshold: {
									value: .5
								}
							}
						}]
					}]
				}, c = "\nCCEffect %{\n@@EFFECT_SEGMENT@@\n}%\n        ", l = "\nCCProgram sprite-vs %{\n  precision highp float;\n  #include <cc-global>\n  #if USE_LOCAL\n    #include <cc-local>\n  #endif\n  #if SAMPLE_FROM_RT\n    #include <common>\n  #endif\n  in vec3 a_position;\n  in vec2 a_texCoord;\n  in vec4 a_color;\n  out vec4 color;\n  out vec2 uv0;\n  vec4 vert () {\n    vec4 pos = vec4(a_position, 1);\n    #if USE_LOCAL\n      pos = cc_matWorld * pos;\n    #endif\n    #if USE_PIXEL_ALIGNMENT\n      pos = cc_matView * pos;\n      pos.xyz = floor(pos.xyz);\n      pos = cc_matProj * pos;\n    #else\n      pos = cc_matViewProj * pos;\n    #endif\n    uv0 = a_texCoord;\n    #if SAMPLE_FROM_RT\n      CC_HANDLE_RT_SAMPLE_FLIP(uv0);\n    #endif\n    color = a_color;\n    return pos;\n  }\n}%\n", h = "\n  vec4 frag () {\n     vec4 o = shaderfx();\n       o *= color;\n     ALPHA_TEST(o);\n     return o;\n   }\n }%\n", u = 0; u < e.input.length; u++) {
				var p = e.input[u];
				"vec4" != p.type || p.isMainTexture ? "float" != p.type || p.isTime ? "bool" == p.type ? s.techniques[0].passes[0].properties["u" + p.name] = {
					value: p.default,
					editor: {
						type: "boolean"
					}
				} : "vec2" == p.type ? p.isUV0 || (s.techniques[0].passes[0].properties["u" + p.name] = {
					value: [p.default.split(",")[0], p.default.split(",")[1]]
				}) : "vec3" == p.type ? s.techniques[0].passes[0].properties["u" + p.name] = {
					value: [p.default.split(",")[0], p.default.split(",")[1], p.default.split(",")[2]]
				} : "sampler2D" != p.type || p.isMainTexture || (s.techniques[0].passes[0].properties["u" + p.name] = {
					value: "white"
				}) : s.techniques[0].passes[0].properties["u" + p.name] = {
					value: p.default
				} : p.isColor ? (p.value = cc.color(p.default), s.techniques[0].passes[0].properties["u" + p.name] = {
					value: [(p.value.r / 255).toFixed(3), (p.value.g / 255).toFixed(3), (p.value.b / 255).toFixed(3), (p.value.a / 255).toFixed(3)],
					editor: {
						type: "color"
					}
				}) : s.techniques[0].passes[0].properties["u" + p.name] = {
					value: [p.default.split(",")[0], p.default.split(",")[1], p.default.split(",")[2], p.default.split(",")[2]]
				}
			}
			var d = "\n  uniform Constant {\n";
			for (u = 0; u < e.input.length; u++) "vec4" != (C = e.input[u]).type && "cc.Color" != C.type || C.isMainTexture || (d += "\t\tvec4 u" + C.name + ";\n");
			for (u = 0; u < e.input.length; u++) "vec3" == (C = e.input[u]).type && (d += "\t\tvec3 u" + C.name + ";\n");
			for (u = 0; u < e.input.length; u++) "vec2" != (C = e.input[u]).type || C.isUV0 || (d += "\t\tvec2 u" + C.name + ";\n");
			for (u = 0; u < e.input.length; u++) "float" != (C = e.input[u]).type || C.isTime || (d += "\t\tfloat u" + C.name + ";\n");
			for (u = 0; u < e.input.length; u++) "bool" == (C = e.input[u]).type && (d += "\t\tbool u" + C.name + ";\n");
			for (d += "\t};\n", u = 0; u < e.input.length; u++) "sampler2D" == (C = e.input[u]).type && (d += "\tuniform sampler2D u" + C.name + ";\n");
			for (var f in e.frags) e.frags[f].join("\n");
			var m = "";
			if (e.frags && 0 === Object.keys(e.frags).length && e.frags.constructor === Object);
			else
				for (var f in e.frags) m += e.frags[f].join("\n"), m += "\n";
			m += e.main.join("\n").replace("main", e.name + "_main");
			var g = e.name + "_main(";
			for (u = 0; u < e.input.length; u++) {
				var C;
				(C = e.input[u]).isMainTexture ? C.isColor ? g += "texture(cc_spriteTexture, uv0)" : g += "cc_spriteTexture" : C.isUV0 ? g += "uv0" : C.isTime ? g += "cc_time[0]" : g += "u" + C.name, u != e.input.length - 1 && (g += ", ")
			}
			g += ");", h = h.replace("shaderfx();", g);
			var _ = "\nCCProgram sprite-fs %{\n  precision highp float;\n  #include <embedded-alpha>\n  #include <alpha-test>\n  #include <cc-global>\n  in vec4 color;\n  #if USE_TEXTURE\n    in vec2 uv0;\n    #pragma builtin(local)\n    layout(set = 2, binding = 10) uniform sampler2D cc_spriteTexture;\n  #endif\n" + d + m.replace(/\btexture\b/g, "cc_spriteTexture").replace(/\btexture2D\b/g, "texture").replace(/\bv_uv0\b/g, "uv0") + h;
			if (c = c.replace("@@EFFECT_SEGMENT@@", json2yaml(s).replace(/\"/g, "").replace(/\\x3A/g, ":")), o || (o = "db://assets/"), t || (t = e.name), "undefined" != typeof Editor) {
				var v = o + t + "_3D_Sprite.effect";
				Editor.assetdb ? Editor.assetdb.createOrSave(v, c + l + _, function() {
					Editor.assetdb.queryUuidByUrl(v, function(i, a) {
						i || (cc.log(i), cc.log("uuid: " + a), n.ShaderFX.ExporterUtil.material3DSprite(a, e, t, o))
					})
				}) : Editor.Message.request("asset-db", "create-asset", v, c + l + _, {
					overwrite: !0
				}).then(function() {
					Editor.Message.request("asset-db", "query-uuid", v).then(function(i) {
						n.ShaderFX.ExporterUtil.material3DSprite(i, e, t, o, r)
					}).catch(function() {})
				}, function() {})
			} else window.download(c + l + _, t + "_3D_Sprite.effect", "application/json"), n.ShaderFX.ExporterUtil.material3DSprite(null, e, t, o);
			var E = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
			E.setUserData((window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5bfc\u51fa .effect \u6210\u529f: " : "Export .effect Succeeded | Name: ") + e.name), cc.systemEvent.dispatchEvent(E)
		}, n.ShaderFX.ExporterUtil.material3DUnlit = function(e, t, o, i) {
			var a = {
				__type__: "cc.Material",
				_name: t.name,
				_objFlags: 0,
				_native: "",
				_effectAsset: {
					__uuid__: e || n.ShaderFX.Util.uuidv4()
				},
				_techIdx: 0,
				_defines: [{
					USE_TEXTURE: !0,
					USE_ALPHA_TEST: !0
				}],
				_props: []
			};
			i || (i = "db://assets/"), o || (o = t.name), "undefined" != typeof Editor ? Editor.assetdb ? Editor.assetdb.create(i + o + "_3D_Unlit.mtl", JSON.stringify(a, null, 4)) : Editor.Message.request("asset-db", "create-asset", i + o + "_3D_Unlit.mtl", JSON.stringify(a, null, 4), {
				overwrite: !0
			}).then(function() {}, function() {}) : window.download(JSON.stringify(a, null, 4), o + "_3D_Unlit.mtl", "application/json")
		}, n.ShaderFX.ExporterUtil.material3DSprite = function(e, t, o, i, a) {
			var r = {
				__type__: "cc.Material",
				_name: t.name,
				_objFlags: 0,
				_native: "",
				_effectAsset: {
					__uuid__: e || n.ShaderFX.Util.uuidv4()
				},
				_techIdx: 0,
				_defines: [{
					USE_TEXTURE: !0,
					USE_ALPHA_TEST: !0
				}],
				_props: []
			};
			i || (i = "db://assets/"), o || (o = t.name), "undefined" != typeof Editor ? Editor.assetdb ? Editor.assetdb.create(i + o + "_3D_Sprite.mtl", JSON.stringify(r, null, 4)) : Editor.Message.request("asset-db", "create-asset", i + o + "_3D_Sprite.mtl", JSON.stringify(r, null, 4), {
				overwrite: !0
			}).then(function() {
				a && a()
			}, function() {}) : window.download(JSON.stringify(r, null, 4), o + "_3D_Sprite.mtl", "application/json")
		}, t.exports = n.ShaderFX.ExporterUtil, cc._RF.pop()
	}, {
		"../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXGalleryPrefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "aa305RofCtKmJgsD3un3KoS", "ShaderFXGalleryPrefab");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.Gallery = cc.Class({
			extends: cc.Component,
			properties: {
				projectName: cc.Label,
				createDate: cc.Label,
				capture: cc.Sprite,
				tags: cc.Node,
				tagPrefab: cc.Prefab
			},
			onLoad: function() {},
			start: function() {},
			utc2beijing: function(e) {
				var t = e.indexOf("T"),
					n = e.indexOf("Z"),
					o = e.substr(0, t) + " " + e.substr(t + 1, n - t - 1);
				i = (i = new Date(Date.parse(o))).getTime();
				var i = 28800 + (i /= 1e3);
				return new Date(1e3 * parseInt(i)).toLocaleString().replace(/\//g, ".").replace(/[\u4e00-\u9fa5]/g, " ")
			},
			init: function(e) {
				this.info = e, this.projectName.string = e.name, this.createDate.string = this.utc2beijing(e.createdAt), this.tags.removeAllChildren(!0);
				for (var t = 0; t < this.info.tags.length && !(t > 4); t++) {
					var o = cc.instantiate(this.tagPrefab);
					this.tags.addChild(o, -999), o.getComponent("ShaderFXGalleryTagPrefab").init(t, this.info.tags[t])
				}
				var i = this;
				n.ShaderFX.DnDUtil.generateTexture2D(e.capture, function(e) {
					i.capture.spriteFrame = new cc.SpriteFrame(e)
				})
			},
			onDownload: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Import", !0);
				e.target = this.node, e.setUserData(this.info.scene), cc.systemEvent.dispatchEvent(e)
			},
			onVideo: function() {
				if (this.info.video) {
					var e = this.info.video,
						t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Video", !0);
					t.target = this.node, t.setUserData(e), cc.systemEvent.dispatchEvent(t)
				}
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXGalleryTagPrefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "6de2c1fZT9NwosPtpkj0eL1", "ShaderFXGalleryTagPrefab"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.TagGallery = cc.Class({
			extends: cc.Component,
			properties: {
				title: cc.Label
			},
			onLoad: function() {},
			start: function() {},
			init: function(e, t) {
				this.title.string = t, this.node.color = this.getColor(e)
			},
			getColor: function(e) {
				return 0 == e ? cc.color("#FF0075") : 1 == e ? cc.color("#00FF94") : 2 == e ? cc.color("#FF8A00") : 3 == e ? cc.color("#F0FF00") : 4 == e ? cc.color("#004CFF") : void 0
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXLeanCloudUtil: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e6694LdIblDCImAM6P97LJh", "ShaderFXLeanCloudUtil");
		var n = e("../namespace/ShaderFXNamespace");
		n.ShaderFX.LeanCloudUtil = function() {}, n.ShaderFX.LeanCloudUtil.LeanCloudUser = function() {
			this._session = null, this._username = "guest", this._userId = null, this._projectId = null, this._projectName = "", this._isOnline = !1, this._email = "", this._mobilePhoneNumber = "", this._projectList = [], this.setSession = function(e) {
				this._session = e
			}, this.getSession = function() {
				return this._session
			}, this.setUsername = function(e) {
				this._username = e
			}, this.getUsername = function() {
				return this._username
			}, this.setUserId = function(e) {
				this._userId = e
			}, this.getUserId = function() {
				return this._userId
			}, this.setProjectId = function(e) {
				this._projectId = e
			}, this.getProjectId = function() {
				return this._projectId
			}, this.setProjectName = function(e) {
				this._projectName = e
			}, this.getProjectName = function() {
				return this._projectName
			}, this.setIsOnline = function(e) {
				this._isOnline = e
			}, this.getIsOnline = function() {
				return this._isOnline
			}, this.setProjectList = function(e) {
				this._projectList = e
			}, this.getProjectList = function() {
				return this._projectList
			}
		}, n.ShaderFX.LeanCloudUtil.LeanCloudUtil = function() {}, n.ShaderFX.LeanCloudUtil.init = function() {
			n.ShaderFX.LeanCloudUtil.__user = new n.ShaderFX.LeanCloudUtil.LeanCloudUser
		}, n.ShaderFX.LeanCloudUtil.updateUser = function(e, t) {
			n.ShaderFX.LeanCloudUtil.__user[e] = t
		}, n.ShaderFX.LeanCloudUtil.isUserOnline = function() {
			return n.ShaderFX.LeanCloudUtil.__user.getIsOnline()
		}, n.ShaderFX.LeanCloudUtil.getCurrentUser = function() {
			return n.ShaderFX.LeanCloudUtil.__user
		}, n.ShaderFX.LeanCloudUtil.getCurrentUserId = function() {
			return n.ShaderFX.LeanCloudUtil.__user.getUserId()
		}, n.ShaderFX.LeanCloudUtil.getCurrentShcemaId = function() {
			return n.ShaderFX.LeanCloudUtil.__user.getProjectId()
		}, n.ShaderFX.LeanCloudUtil.getCurrentShcemaName = function() {
			return n.ShaderFX.LeanCloudUtil.__user.getProjectName()
		}, n.ShaderFX.LeanCloudUtil.getCurrentUsername = function() {
			return n.ShaderFX.LeanCloudUtil.__user.getUsername()
		}, n.ShaderFX.LeanCloudUtil.getCurrentUsernameForDisplay = function() {
			var e = n.ShaderFX.LeanCloudUtil.getCurrentUsername();
			return "Guest-" == e.substring(0, "Guest-".length) ? "Guest" : e
		}, n.ShaderFX.LeanCloudUtil.deleteProject = function(e, t, o) {
			n.ShaderFX.LeanCloudUtil.__user && n.ShaderFX.RestUtil.execFunction("DELETE", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Projects/" + e, {}, function(e) {
				t(e)
			}, function(e) {
				o(e)
			})
		}, n.ShaderFX.LeanCloudUtil.report = function(e, t, o) {
			n.ShaderFX.LeanCloudUtil.__user, n.ShaderFX.RestUtil.execFunction("POST", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Report?fetchWhenSave=true", {
				username: cc.sys.localStorage.getItem("ssrfx_username") ? cc.sys.localStorage.getItem("ssrfx_username") : "Unknown",
				type: e,
				content: t,
				platform: "undefined" != typeof Editor ? "Plugin" : "Web",
				geo: o ? JSON.stringify(o) : ""
			}, function() {}, function() {})
		}, n.ShaderFX.LeanCloudUtil.createProject = function(e, t, o, i, a) {
			if (n.ShaderFX.LeanCloudUtil.__user)
				for (var r = n.ShaderFX.LeanCloudUtil.__user.getProjectList(), s = r.length - 1; s >= 0; s--)
					if (r[s].name == e) return void n.ShaderFX.LeanCloudUtil.updateProject(r[s].objectId, t, o, i, a);
			n.ShaderFX.RestUtil.execFunction("POST", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Projects?fetchWhenSave=true", {
				userId: n.ShaderFX.LeanCloudUtil.getCurrentUserId(),
				name: e,
				scene: t,
				capture: o
			}, function(e) {
				i(e), n.ShaderFX.LeanCloudUtil.updateUser("_projectId", e.objectId), n.ShaderFX.LeanCloudUtil.updateUser("_projectName", e.projectName)
			}, function(e) {
				a(e)
			})
		}, n.ShaderFX.LeanCloudUtil.updateProject = function(e, t, o, i, a) {
			n.ShaderFX.RestUtil.execFunction("PUT", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Projects/" + e, {
				scene: t,
				capture: o
			}, function(e) {
				i(e)
			}, function(e) {
				a(e)
			})
		}, n.ShaderFX.LeanCloudUtil.listProject = function(e, t) {
			n.ShaderFX.RestUtil.execFunction("GET", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Projects?" + encodeURI('where={"userId":"' + n.ShaderFX.LeanCloudUtil.getCurrentUserId() + '"}'), {}, function(t) {
				cc.log(t), e(t), n.ShaderFX.LeanCloudUtil.__user.setProjectList(t.results)
			}, function(e) {
				t(e)
			})
		}, n.ShaderFX.LeanCloudUtil.publishMyCustomComponent = function(e, t, o) {
			n.ShaderFX.RestUtil.execFunction("POST", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Components", {
				official: !1,
				author: n.ShaderFX.LeanCloudUtil.getCurrentUsername(),
				custom: !0,
				userId: n.ShaderFX.LeanCloudUtil.getCurrentUserId(),
				uuid: e.uuid,
				cate: 999,
				folder: JSON.stringify(e.category),
				component: JSON.stringify(e)
			}, function(e) {
				t(e)
			}, function(e) {
				o(e)
			})
		}, n.ShaderFX.LeanCloudUtil.uploadMyCustomComponent = function(e, t, o) {
			var i = Object.assign({}, e);
			delete i.capture, delete i.prefab, n.ShaderFX.RestUtil.execFunction("POST", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/UserComponents", {
				author: n.ShaderFX.LeanCloudUtil.getCurrentUsername(),
				custom: !0,
				userId: n.ShaderFX.LeanCloudUtil.getCurrentUserId(),
				uuid: e.uuid,
				capture: e.capture,
				folder: JSON.stringify(e.category),
				component: JSON.stringify(i)
			}, function(e) {
				t(e)
			}, function(e) {
				o(e)
			})
		}, n.ShaderFX.LeanCloudUtil.deleteMyCustomComponent = function(e, t, o) {
			n.ShaderFX.RestUtil.execFunction("DELETE", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/UserComponents/" + e, {}, function(e) {
				t(e)
			}, function(e) {
				o(e)
			})
		}, n.ShaderFX.LeanCloudUtil.updateMyCustomComponent = function(e, t, o) {
			var i = Object.assign({}, e);
			delete i.capture, n.ShaderFX.RestUtil.execFunction("PUT", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/UserComponents/" + e.objectId, {
				component: JSON.stringify(i),
				capture: e.capture,
				folder: JSON.stringify(i.category)
			}, function(e) {
				t(e)
			}, function(e) {
				o(e)
			})
		}, n.ShaderFX.LeanCloudUtil.listOnlineFXComponentList = function(e, t) {
			n.ShaderFX.RestUtil.execFunctionGa("GET", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/ComponentsList?" + encodeURI('where={"verified":true}&' + encodeURI("order=index")), {}, function(t) {
				cc.log(t), e(t)
			}, function(e) {
				t(e)
			})
		}, n.ShaderFX.LeanCloudUtil.listCustomComponentByCategory = function(e, t, o) {
			n.ShaderFX.RestUtil.execFunctionGa("GET", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Components?" + encodeURI('where={"cate":' + e + "}"), {}, function(e) {
				cc.log(e), t(e)
			}, function(e) {
				o(e)
			})
		}, n.ShaderFX.LeanCloudUtil.listCustomComponent = function(e, t) {
			n.ShaderFX.RestUtil.execFunction("GET", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Components?" + encodeURI('where={"verified":true}'), {}, function(t) {
				cc.log(t), e(t)
			}, function(e) {
				t(e)
			})
		}, n.ShaderFX.LeanCloudUtil.listMyCustomComponent = function(e, t) {
			n.ShaderFX.RestUtil.execFunction("GET", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/UserComponents?" + encodeURI('where={"userId":"' + n.ShaderFX.LeanCloudUtil.getCurrentUserId() + '"}'), {}, function(t) {
				cc.log(t), e(t)
			}, function(e) {
				t(e)
			})
		}, n.ShaderFX.LeanCloudUtil.fetchCustomComponent = function(e, t, o) {
			n.ShaderFX.RestUtil.execFunction("GET", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Components?" + encodeURI('where={"uuid":"' + e + '"}'), {}, function(e) {
				cc.log(e), t(e)
			}, function(e) {
				o(e)
			})
		}, n.ShaderFX.LeanCloudUtil.listGallery = function(e, t) {
			n.ShaderFX.RestUtil.execFunction("GET", "https://6all0amy.lc-cn-n1-shared.com/1.1/classes/Gallery", {}, function(t) {
				cc.log(t), e(t)
			}, function(e) {
				t(e)
			})
		}, n.ShaderFX.LeanCloudUtil.guid = function() {
			function e() {
				return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
			}
			return e() + e() + e() + e() + e() + e()
		}, n.ShaderFX.LeanCloudUtil.signIn = function(e, t, o, i) {
			n.ShaderFX.RestUtil.execFunction("POST", "https://6all0amy.lc-cn-n1-shared.com/1.1/login", {
				username: e,
				password: t
			}, function(i) {
				cc.sys.localStorage.setItem("ssrfx_username", e), cc.sys.localStorage.setItem("ssrfx_password", t), cc.sys.localStorage.removeItem("ssrfx_schema_id"), cc.sys.localStorage.removeItem("ssrfx_schema_content"), n.ShaderFX.LeanCloudUtil.updateUser("_session", i.sessionToken), n.ShaderFX.LeanCloudUtil.updateUser("_username", i.username), n.ShaderFX.LeanCloudUtil.updateUser("_userId", i.objectId), n.ShaderFX.LeanCloudUtil.updateUser("_mobilePhoneNumber", i.mobilePhoneNumber), n.ShaderFX.LeanCloudUtil.updateUser("_email", i.email), n.ShaderFX.LeanCloudUtil.updateUser("_isOnline", !0), o(i)
			}, function(e) {
				i(e)
			})
		}, n.ShaderFX.LeanCloudUtil.signUp = function(e, t, o, i, a) {
			n.ShaderFX.RestUtil.execFunction("POST", "https://6all0amy.lc-cn-n1-shared.com/1.1/users", {
				username: e,
				password: t,
				email: o
			}, function(e) {
				cc.sys.localStorage.removeItem("ssrfx_schema_id"), cc.sys.localStorage.removeItem("ssrfx_schema_content"), n.ShaderFX.LeanCloudUtil.updateUser("_session", e.sessionToken), n.ShaderFX.LeanCloudUtil.updateUser("_username", e.username), n.ShaderFX.LeanCloudUtil.updateUser("_userId", e.objectId), i(e)
			}, function(e) {
				a(e)
			})
		}, n.ShaderFX.LeanCloudUtil.resetPassword = function(e, t, o) {
			n.ShaderFX.RestUtil.execFunction("POST", "https://6all0amy.lc-cn-n1-shared.com/1.1/requestPasswordReset", {
				email: e
			}, function(e) {
				t(e)
			}, function(e) {
				o(e)
			})
		}, t.exports = n.ShaderFX.LeanCloudUtil, cc._RF.pop()
	}, {
		"../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXMissingCustomComponentInfoPrefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "2d059qUqMVHWKqEMB1mXFTR", "ShaderFXMissingCustomComponentInfoPrefab"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.MissingCustomComponentInfo = cc.Class({
			extends: cc.Component,
			properties: {
				no: cc.Label,
				title: cc.Label,
				des: cc.Label,
				author: cc.Label,
				date: cc.Label,
				cid: cc.Label,
				toolTip: cc.Node
			},
			onLoad: function() {},
			start: function() {},
			init: function(e, t) {
				this.no.string = e + ".", this.title.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.name + "/" + t.name_zh : t.name, this.des.string = t.uuid, this.author.string = t.author ? t.author : "???", this.date.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.category.en + "/" + t.category.zh : t.category.en
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXMyCustomComponentInfoPrefab: [function(e, t) {
		"use strict";
		var n;
		cc._RF.push(t, "a52064KFR5J2IHyJB5DwvcX", "ShaderFXMyCustomComponentInfoPrefab");
		var o = e("../../namespace/ShaderFXNamespace");
		o.ShaderFX.Prefab.MyCustomComponentInfo = cc.Class({
			extends: cc.Component,
			properties: (n = {
				no: cc.Label,
				title: cc.Label,
				des: cc.Label,
				cate: cc.Label,
				author: cc.Label,
				date: cc.Label,
				cid: cc.Label
			}, n.cate = cc.Label, n.toolTip = cc.Node, n.localFlag = cc.Node, n.cloudFlag = cc.Node, n.downloadButton = cc.Button, n.downloadTooltip = cc.Node, n.capture = cc.Node, n.preview = cc.Node, n.removeLocalButton = cc.Button, n.removeLocalTooltip = cc.Node, n.removeCloudButton = cc.Button, n.removeCloudTooltip = cc.Node, n.editButton = cc.Button, n.editTooltip = cc.Node, n.cloneButton = cc.Button, n.cloneTooltip = cc.Node, n.uploadButton = cc.Button, n.uploadTooltip = cc.Node, n.publishButton = cc.Button, n.publishTooltip = cc.Node, n),
			onLoad: function() {},
			start: function() {},
			init: function(e, t, n, i, a) {
				this.info = t, this.isInCloud = i, this.isInLocal = n, this.cloud = a, this.cid.string = t.uuid, this.no.string = e + ".", this.title.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.name + "/" + t.name_zh : t.name, this.des.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.description.zh : t.description.en, this.author.string = t.author ? t.author : "???", this.cate.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.category.en + "/" + t.category.zh : t.category.en;
				var r = new Date(t.date);
				this.date.string = r.getFullYear() + "-" + (r.getMonth() + 1) + "-" + r.getDate() + " " + r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds(), n ? (this.localFlag.color = cc.Color.GREEN, this.removeLocalButton.interactable = !0, this.cloneButton.interactable = !0, this.editButton.interactable = !0, this.uploadButton.interactable = !0) : (this.localFlag.color = cc.Color.YELLOW, this.removeLocalButton.interactable = !1, this.cloneButton.interactable = !1, this.editButton.interactable = !1, this.uploadButton.interactable = !1), i ? (this.cloudFlag.color = cc.Color.GREEN, this.downloadButton.interactable = !0, this.removeCloudButton.interactable = !0, this.publishButton.interactable = !0) : (this.cloudFlag.color = cc.Color.YELLOW, this.downloadButton.interactable = !1, this.removeCloudButton.interactable = !1, this.publishButton.interactable = !1), o.ShaderFX.LeanCloudUtil.isUserOnline() || (this.cloudFlag.color = cc.Color.RED, this.downloadButton.interactable = !1, this.removeCloudButton.interactable = !1, this.uploadButton.interactable = !1, this.publishButton.interactable = !1), this.capture.active = !1, this.title.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterTitle, this), this.title.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveTitle, this), this.downloadButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterDownloadButton, this), this.downloadButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveDownloadButton, this), this.removeLocalButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterRemoveLocalButton, this), this.removeLocalButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveRemoveLocalButton, this), this.removeCloudButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterRemoveCloudButton, this), this.removeCloudButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveRemoveCloudButton, this), this.editButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterEditButton, this), this.editButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveEditButton, this), this.cloneButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterCloneButton, this), this.cloneButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveCloneButton, this), this.uploadButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterUploadButton, this), this.uploadButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeaveUploadButton, this), this.publishButton.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterPublishButton, this), this.publishButton.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeavePublishButton, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Remove", this._onMyCustomComponentInfoRemove, this)
			},
			_onMyCustomComponentInfoRemove: function(e) {
				var t = e.getUserData();
				(t.component ? JSON.parse(t.component) : t).uuid == this.info.uuid && (this.localFlag.color = cc.Color.YELLOW, this.removeLocalButton.interactable = !1, this.cloneButton.interactable = !1, this.editButton.interactable = !1, this.uploadButton.interactable = !1, this.downloadButton.interactable = !0)
			},
			markInCloud: function() {
				this.cloudFlag.color = cc.Color.GREEN, this.downloadButton.interactable = !0, this.removeCloudButton.interactable = !0, this.publishButton.interactable = !0, this.isInCloud = !0
			},
			onDownload: function() {
				var e;
				this.localFlag.color = cc.Color.GREEN, this.downloadButton.interactable = !0, this.editButton.interactable = !0, this.cloneButton.interactable = !0, this.removeLocalButton.interactable = !0, this.uploadButton.interactable = !0, (e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Download", !0)).target = this.node, e.setUserData(this.cloud ? this.cloud : this.info), cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u4e0b\u8f7d\u6210\u529f\uff0c\u4f60\u53ef\u4ee5\u5728[\u53f3\u952e\u83dc\u5355]\u4e2d\u627e\u5230\u8be5\u7ec4\u4ef6"), cc.systemEvent.dispatchEvent(e)
			},
			onRemoveLocal: function() {
				var e;
				this.isInLocal = !1, this.localFlag.color = cc.Color.YELLOW, this.downloadButton.interactable = !0, this.removeLocalButton.interactable = !1, this.uploadButton.interactable = !1, (e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Remove", !0)).target = this.node, e.setUserData(this.cloud ? this.cloud : this.info), cc.systemEvent.dispatchEvent(e), this.isInCloud || ((e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Delete", !0)).target = this.node, e.setUserData(this.cloud ? this.cloud.uuid : this.info.uuid), cc.systemEvent.dispatchEvent(e)), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u5220\u9664\u672c\u5730\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u6210\u529f"), cc.systemEvent.dispatchEvent(e)
			},
			onRemoveCloud: function() {
				this.isInCloud = !1;
				var e = this;
				o.ShaderFX.LeanCloudUtil.deleteMyCustomComponent(this.info.objectId, function() {
					var t;
					(t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).setUserData("\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u5220\u9664\u6210\u529f"), cc.systemEvent.dispatchEvent(t), e.isInLocal || ((t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Delete", !0)).target = this.node, t.setUserData(e.cloud ? e.cloud.uuid : e.info.uuid), cc.systemEvent.dispatchEvent(t)), e.cloudFlag.color = cc.Color.YELLOW, e.downloadButton.interactable = !0, e.removeCloudButton.interactable = !1, e.publishButton.interactable = !1
				}, function() {
					var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
					e.setUserData("\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u66f4\u65b0\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5: " + error), cc.systemEvent.dispatchEvent(e)
				})
			},
			onEdit: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Edit", !0);
				e.target = this.node, e.setUserData(this.info), cc.systemEvent.dispatchEvent(e)
			},
			onSync: function() {
				if (this.isInCloud) o.ShaderFX.LeanCloudUtil.updateMyCustomComponent(this.info, function() {
					var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
					e.setUserData("\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u66f4\u65b0\u6210\u529f"), cc.systemEvent.dispatchEvent(e)
				}, function(e) {
					var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
					t.setUserData("\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u66f4\u65b0\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5: " + e), cc.systemEvent.dispatchEvent(t)
				});
				else {
					var e = this;
					o.ShaderFX.LeanCloudUtil.uploadMyCustomComponent(this.info, function() {
						var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
						t.setUserData("\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u4e0a\u4f20\u6210\u529f"), cc.systemEvent.dispatchEvent(t), e.cloudFlag.color = cc.Color.GREEN, e.downloadButton.interactable = !0, e.removeCloudButton.interactable = !0, e.publishButton.interactable = !0
					}, function(e) {
						var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
						t.setUserData("\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5: " + e), cc.systemEvent.dispatchEvent(t)
					})
				}
			},
			onClone: function() {
				(e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.MyCustomComponentInfo.Clone", !0)).target = this.node;
				var e, t = Object.assign({}, this.info);
				delete t.prefab, delete t.fx, t.name = t.name + "Clone", t.name_zh = t.name_zh + "\u514b\u9686", t.uuid = o.ShaderFX.Util.uuidv4(), e.setUserData({
					component: JSON.stringify(t),
					custom: !0,
					folder: JSON.stringify({
						en: t.category.en,
						zh: t.category.zh
					}),
					official: !1,
					uuid: t.uuid
				}), cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u514b\u9686\u6210\u529f\uff0c\u4f60\u53ef\u4ee5\u5728[\u6211\u7684\u7ec4\u4ef6]\u4e2d\u627e\u5230\u8be5\u7ec4\u4ef6\u5e76\u8fdb\u884c\u8fdb\u4e00\u6b65\u7f16\u8f91\u4f7f\u7528"), cc.systemEvent.dispatchEvent(e)
			},
			onPublish: function() {
				var e = Object.assign({}, this.info);
				e.uuid = o.ShaderFX.Util.uuidv4(), e.fx = !0, o.ShaderFX.LeanCloudUtil.publishMyCustomComponent(e, function() {
					var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
					e.setUserData("\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u53d1\u5e03\u6210\u529f\uff0c\u611f\u8c22\u60a8\u7684\u5206\u4eab\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85\u5ba1\u6838\u901a\u8fc7"), cc.systemEvent.dispatchEvent(e)
				}, function(e) {
					var t = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0);
					t.setUserData("\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6\u53d1\u5e03\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5: " + e), cc.systemEvent.dispatchEvent(t)
				})
			},
			onMouseEnterTitle: function() {
				this.toolTip.active = !0
			},
			onMouseLeaveTitle: function() {
				this.toolTip.active = !1
			},
			onMouseEnterDownloadButton: function() {
				this.downloadTooltip.active = !0
			},
			onMouseLeaveDownloadButton: function() {
				this.downloadTooltip.active = !1
			},
			onMouseEnterRemoveLocalButton: function() {
				this.removeLocalTooltip.active = !0
			},
			onMouseLeaveRemoveLocalButton: function() {
				this.removeLocalTooltip.active = !1
			},
			onMouseEnterRemoveCloudButton: function() {
				this.removeCloudTooltip.active = !0
			},
			onMouseLeaveRemoveCloudButton: function() {
				this.removeCloudTooltip.active = !1
			},
			onMouseEnterCapture: function() {
				this.preview.active = !0
			},
			onMouseLeaveCapture: function() {
				this.preview.active = !1
			},
			onMouseEnterEditButton: function() {
				this.editTooltip.active = !0
			},
			onMouseLeaveEditButton: function() {
				this.editTooltip.active = !1
			},
			onMouseEnterCloneButton: function() {
				this.cloneTooltip.active = !0
			},
			onMouseLeaveCloneButton: function() {
				this.cloneTooltip.active = !1
			},
			onMouseEnterUploadButton: function() {
				this.uploadTooltip.active = !0
			},
			onMouseLeaveUploadButton: function() {
				this.uploadTooltip.active = !1
			},
			onMouseEnterPublishButton: function() {
				this.publishTooltip.active = !0
			},
			onMouseLeavePublishButton: function() {
				this.publishTooltip.active = !1
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXNamespace: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e118cMdKBlGjLJLKUVjOmT+", "ShaderFXNamespace");
		var n = n || {};
		n.ShaderFX = n.ShaderFX || {}, n.ShaderFX.Component = n.ShaderFX.Component || {}, n.ShaderFX.Component.Blur = n.ShaderFX.Component.Blur || {}, n.ShaderFX.Component.Color = n.ShaderFX.Component.Color || {}, n.ShaderFX.Component.Drawing = n.ShaderFX.Component.Drawing || {}, n.ShaderFX.Component.Edge = n.ShaderFX.Component.Edge || {}, n.ShaderFX.Component.Experiment = n.ShaderFX.Component.Experiment || {}, n.ShaderFX.Component.Image = n.ShaderFX.Component.Image || {}, n.ShaderFX.Component.Material = n.ShaderFX.Component.Material || {}, n.ShaderFX.Component.Pattern = n.ShaderFX.Component.Pattern || {}, n.ShaderFX.Component.MultiTexture = n.ShaderFX.Component.MultiTexture || {}, n.ShaderFX.Component.Animation = n.ShaderFX.Component.Animation || {}, n.ShaderFX.Component.Node = n.ShaderFX.Component.Node || {}, n.ShaderFX.Component.Test = n.ShaderFX.Component.Test || {}, n.ShaderFX.Const = n.ShaderFX.Const || {}, n.ShaderFX.Data = n.ShaderFX.Data || {}, n.ShaderFX.Util = n.ShaderFX.Util || {}, n.ShaderFX.ExporterUtil = n.ShaderFX.ExporterUtil || {}, n.ShaderFX.ProjectUtil = n.ShaderFX.ProjectUtil || {}, n.ShaderFX.CustomComponentUtil = n.ShaderFX.CustomComponentUtil || {}, n.ShaderFX.DnDUtil = n.ShaderFX.DnDUtil || {}, n.ShaderFX.LeanCloudUtil = n.ShaderFX.LeanCloudUtil || {}, n.ShaderFX.RestUtil = n.ShaderFX.RestUtil || {}, n.ShaderFX.Util.Property = n.ShaderFX.Util.Property || {}, n.ShaderFX.Prefab = n.ShaderFX.Prefab || {}, n.ShaderFX.Editor = n.ShaderFX.Editor || {}, n.ShaderFX.Editor.Util = n.ShaderFX.Editor.Util || {}, t.exports = n, e("../util/ShaderFXUtil.js"), e("../util/ShaderFXExporterUtil.js"), e("../util/ShaderFXDnDUtil.js"), e("../util/ShaderFXProjectUtil.js"), e("../util/ShaderFXCustomComponentUtil.js"), e("../util/ShaderFXLeanCloudUtil.js"), e("../util/ShaderFXRestUtil.js"), cc._RF.pop()
	}, {
		"../util/ShaderFXCustomComponentUtil.js": "ShaderFXCustomComponentUtil",
		"../util/ShaderFXDnDUtil.js": "ShaderFXDnDUtil",
		"../util/ShaderFXExporterUtil.js": "ShaderFXExporterUtil",
		"../util/ShaderFXLeanCloudUtil.js": "ShaderFXLeanCloudUtil",
		"../util/ShaderFXProjectUtil.js": "ShaderFXProjectUtil",
		"../util/ShaderFXRestUtil.js": "ShaderFXRestUtil",
		"../util/ShaderFXUtil.js": "ShaderFXUtil"
	}],
	ShaderFXPrefabCategoryPrefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "780f0BzJ9FM4LCu2a2xl2UC", "ShaderFXPrefabCategoryPrefab");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.CategoryPrefab = cc.Class({
			extends: cc.Component,
			properties: {
				title: cc.Label,
				desc: cc.Label,
				count: cc.Label,
				banner: cc.Sprite,
				locked: cc.Node
			},
			onLoad: function() {},
			start: function() {},
			init: function(e, t) {
				this.parent = t, this.item = e, this.title.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? e.name.en + "/" + e.name.zh : e.name.en, this.desc.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? e.desc.zh : e.desc.en, this.count.string = e.count;
				var o = this;
				e.banner ? n.ShaderFX.DnDUtil.generateTexture2D(e.banner, function(e) {
					o.banner.spriteFrame = new cc.SpriteFrame(e)
				}) : cc.resources.load("ssr/shaderfx-editor/banner/fx_banner_" + e.index, cc.SpriteFrame, function(e, t) {
					e || (o.banner.spriteFrame = t)
				}), e.lock && (this.locked.active = !0, this.banner.getComponent(cc.Button).interactable = !1)
			},
			onFX: function() {
				cc.log("onFX"), this.parent.onFX(this.item, this.node)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabCustomComponentBool: [function(e, t) {
		"use strict";
		cc._RF.push(t, "2a53fyIi8xB+bUXjHzr89Om", "ShaderFXPrefabCustomComponentBool"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.CustomComponentBool = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				uniformName: cc.Label,
				propertyUI: cc.Toggle,
				propertyUIAction: cc.Toggle
			},
			onLoad: function() {},
			start: function() {},
			onDestroy: function() {},
			getKey: function() {
				return this._key
			},
			getValue: function() {
				return this._action ? !!this.propertyUIAction.isChecked : !!this.propertyUI.isChecked
			},
			getDefaultValue: function() {
				return this._action ? this.propertyUIAction.isChecked ? "true" : "false" : this.propertyUI.isChecked ? "true" : "false"
			},
			updateValue: function(e) {
				null != e && (this._action ? e ? this.propertyUIAction.check() : this.propertyUIAction.uncheck() : e ? this.propertyUI.check() : this.propertyUI.uncheck())
			},
			onCheck: function() {
				this._valueChangedCallback()
			},
			init: function(e, t, n) {
				this._key = e, this._valueChangedCallback = t, this.uniformName.string = e, this._action = n, this._action && (this.node.getChildByName("New Node").active = !1, this.node.getChildByName("ActionNode").active = !0, this.node.getChildByName("Frame").width = 2e3, this.node.getChildByName("Frame").y += 10, this.node.height = 25)
			},
			onValueChanged: function(e, t) {
				this._valueChangedCallback(e, t)
			},
			onValueChangedTo: function() {}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabCustomComponentColor: [function(e, t) {
		"use strict";
		cc._RF.push(t, "47f21Tm3FlIwLn/jBjPYckK", "ShaderFXPrefabCustomComponentColor"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.CustomComponentColor = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				uniformName: cc.Label,
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformZSliderEx: cc.Node,
				uniformWSliderEx: cc.Node
			},
			onLoad: function() {},
			getKey: function() {
				return this._key
			},
			getValue: function() {
				return "vec4(" + (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() / 255).toFixed(3) + ", " + (this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() / 255).toFixed(3) + ", " + (this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() / 255).toFixed(3) + ", " + (this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() / 255).toFixed(3) + ")"
			},
			updateValue: function(e) {
				this._value = e
			},
			init: function(e, t) {
				this._key = e, this._valueChangedCallback = t, this.uniformName.string = e, this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "R:", 255, {
					onValueChanged: this.onValueChanged.bind(this),
					isInteger: !0
				}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "G:", 255, {
					onValueChanged: this.onValueChanged.bind(this),
					isInteger: !0
				}), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "B:", 255, {
					onValueChanged: this.onValueChanged.bind(this),
					isInteger: !0
				}), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "A:", 255, {
					onValueChanged: this.onValueChanged.bind(this),
					isInteger: !0
				})
			},
			onValueChanged: function(e, t) {
				this._valueChangedCallback(e, t)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabCustomComponentFloat: [function(e, t) {
		"use strict";
		cc._RF.push(t, "f1fb0zJgthJGKR9Le/H8Y91", "ShaderFXPrefabCustomComponentFloat"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.CustomComponentFloat = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				uniformName: cc.Label,
				uniformSliderEx: cc.Node,
				uniformSliderExAction: cc.Node,
				uniformSliderExActionTo: cc.Node,
				propertyUI: cc.Toggle
			},
			onLoad: function() {},
			start: function() {
				this._actionEnabled = !1
			},
			onDestroy: function() {},
			getKey: function() {
				return this._key
			},
			getValue: function() {
				return this._action ? this.propertyUI.isChecked ? "cc_time[0]" : this.uniformSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() : this.propertyUI.isChecked ? "cc_time[0]" : this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
			},
			getValueTo: function() {
				return this.uniformSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
			},
			updateValue: function(e) {
				null != e && (this._action ? this.uniformSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e) : this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e))
			},
			onCheck: function() {
				this._valueChangedCallback()
			},
			onEnableAction: function(e) {
				cc.log(e), this._actionEnabled ? (this._actionEnabled = !1, this.uniformSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI()) : (this._actionEnabled = !0, this.uniformSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI())
			},
			init: function(e, t, n) {
				this._key = e, this._valueChangedCallback = t, this._action = n, this.uniformName.string = e, this._action ? (this.node.getChildByName("New Node").active = !1, this.node.getChildByName("ActionNode").active = !0, this.node.getChildByName("Frame").width = 2e3, this.node.getChildByName("Frame").y += 10, this.uniformSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "N:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "N:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.node.height = 25) : this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "N:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				})
			},
			onValueChanged: function(e, t) {
				this._valueChangedCallback(e, t)
			},
			onValueChangedTo: function() {}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabCustomComponentTexture: [function(e, t) {
		"use strict";
		cc._RF.push(t, "ae91fkbxrtKaamYCT7wCQ8E", "ShaderFXPrefabCustomComponentTexture");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.CustomComponentTexture = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				uniformName: cc.Label,
				preview: cc.Node,
				propertyUI: cc.Toggle,
				dropButton: cc.Node,
				scrollView: cc.Node,
				mode: cc.Label,
				repeatNode: cc.Node,
				clampNode: cc.Node,
				_propertyValue: null,
				propertyValue: {
					get: function() {
						return this._propertyValue
					},
					set: function(e) {
						this._propertyValue !== e && (this._propertyValue = e)
					},
					type: cc.Sprite
				}
			},
			onLoad: function() {},
			getKey: function() {
				return this._key
			},
			getValue: function() {
				return this.propertyUI.isChecked ? "texture" : this._key
			},
			getDefaultValue: function() {
				return this._base64
			},
			getWrapMode: function() {
				return this.mode.string
			},
			getTexture: function() {
				return new cc.SpriteFrame(this._textureCache).getTexture()
			},
			updateValue: function(e, t) {
				if (null != e) {
					var o = this;
					n.ShaderFX.DnDUtil.generateTexture2D(e, function(n) {
						o._file = {
							content: e,
							name: "sub",
							texture: n,
							packMode: "Unpack"
						}, o._textureCache = n, o._base64 = e, o.propertyValue.spriteFrame = new cc.SpriteFrame(n), "Repeat" == t && (o.propertyValue.spriteFrame.getTexture().setWrapMode(cc.Texture2D.WrapMode.REPEAT, cc.Texture2D.WrapMode.REPEAT), o._textureCache.setWrapMode(cc.Texture2D.WrapMode.REPEAT, cc.Texture2D.WrapMode.REPEAT)), o._valueChangedCallback(o._key, "texture")
					}), this.mode.string = t
				}
			},
			onUseTexture: function() {
				this._valueChangedCallback()
			},
			init: function(e, t, o) {
				this._key = e, this._valueChangedCallback = t, this._action = o, this.uniformName.string = e, n.ShaderFX.DnDUtil.enable(this.preview, this.onValueChanged.bind(this), [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"], 1), this._action && (this.node.getChildByName("New Node").getChildByName("kv").active = !1, this.node.getChildByName("Frame").width = 2e3, this.node.height = 50);
				var i = cc.loader.getRes("ssr/shaderfx-editor/texture/subtexture", cc.SpriteFrame);
				i ? this.onLoadSpriteFrameCallback(null, i, e) : cc.loader.loadRes(value, cc.SpriteFrame, this.onLoadSpriteFrameCallback.bind(this))
			},
			onLoadSpriteFrameCallback: function(e, t, n) {
				this._file = {
					content: t,
					name: n,
					texture: t.getTexture(),
					packMode: "Unpack"
				}, this.propertyValue.spriteFrame = t.clone(), this._textureCache = t.getTexture()
			},
			onValueChanged: function(e) {
				console.log("onValueChangedonValueChangedonValueChanged"), this._file = e[0], this._textureCache = e[0].texture, this._base64 = e[0].content, this.propertyValue.spriteFrame = new cc.SpriteFrame(e[0].texture), console.log(e[0]), this._valueChangedCallback()
			},
			onDrop: function() {
				this.scrollView.active ? this.scrollView.active = !1 : this.scrollView.active = !0
			},
			onWrapModeClamp: function() {
				this.scrollView.active = !1, this.mode.string = "Clamp", this.repeatNode.active = !0, this.clampNode.active = !1, this.propertyValue.spriteFrame.getTexture().setWrapMode(cc.Texture2D.WrapMode.CLAMP_TO_EDGE, cc.Texture2D.WrapMode.CLAMP_TO_EDGE), this._textureCache.setWrapMode(cc.Texture2D.WrapMode.CLAMP_TO_EDGE, cc.Texture2D.WrapMode.CLAMP_TO_EDGE), this._valueChangedCallback()
			},
			onWrapModeRepeat: function() {
				this.scrollView.active = !1, this.mode.string = "Repeat", this.repeatNode.active = !1, this.clampNode.active = !0, this.propertyValue.spriteFrame.getTexture().setWrapMode(cc.Texture2D.WrapMode.REPEAT, cc.Texture2D.WrapMode.REPEAT), this._textureCache.setWrapMode(cc.Texture2D.WrapMode.REPEAT, cc.Texture2D.WrapMode.REPEAT), this._valueChangedCallback()
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabCustomComponentVec2: [function(e, t) {
		"use strict";
		cc._RF.push(t, "66ddeo/WQFEuZXtxEGnic7a", "ShaderFXPrefabCustomComponentVec2"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.CustomComponentVec2 = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				uniformName: cc.Label,
				uniformXSliderEx: cc.Node,
				uniformXSliderExAction: cc.Node,
				uniformXSliderExActionTo: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformYSliderExAction: cc.Node,
				uniformYSliderExActionTo: cc.Node,
				propertyUI: cc.Toggle,
				propertyUI2: cc.Toggle
			},
			onLoad: function() {},
			start: function() {
				this._actionEnabled = !1
			},
			getKey: function() {
				return this._key
			},
			getValue: function() {
				return this.propertyUI2.isChecked ? "(v_uv0 * 2.0 - 1.0)" : this.propertyUI.isChecked ? "v_uv0" : this._action ? "vec2(" + this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ")" : "vec2(" + this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ")"
			},
			getValueTo: function() {
				return this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
			},
			getDefaultValue: function() {
				return this._action ? this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() : this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
			},
			onEnableAction: function(e) {
				cc.log(e), this._actionEnabled ? (this._actionEnabled = !1, this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI()) : (this._actionEnabled = !0, this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI(), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI())
			},
			onUseTexture: function() {
				this._valueChangedCallback()
			},
			onUseTexture2: function() {
				this._valueChangedCallback()
			},
			updateValue: function(e) {
				null != e && (this._action ? (this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[0]), this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[1])) : (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[0]), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[1])))
			},
			init: function(e, t, n) {
				this._key = e, this._valueChangedCallback = t, this._action = n, this.uniformName.string = e, this._action ? (this.node.getChildByName("New Node").active = !1, this.node.getChildByName("ActionNode").active = !0, this.node.getChildByName("Frame").width = 2e3, this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.node.height = 35) : (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}))
			},
			onValueChanged: function(e, t) {
				this._valueChangedCallback(e, t)
			},
			onValueChangedTo: function() {}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabCustomComponentVec3: [function(e, t) {
		"use strict";
		cc._RF.push(t, "92ca2u8xrxNdpzoxdqGrVcG", "ShaderFXPrefabCustomComponentVec3"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.CustomComponentVec3 = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				uniformName: cc.Label,
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformZSliderEx: cc.Node,
				uniformXSliderExAction: cc.Node,
				uniformXSliderExActionTo: cc.Node,
				uniformYSliderExAction: cc.Node,
				uniformYSliderExActionTo: cc.Node,
				uniformZSliderExAction: cc.Node,
				uniformZSliderExActionTo: cc.Node
			},
			onLoad: function() {},
			start: function() {
				this._actionEnabled = !1
			},
			getKey: function() {
				return this._key
			},
			getValue: function() {
				return this._action ? "vec3(" + this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformZSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ")" : "vec3(" + this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ")"
			},
			getValueTo: function() {
				return this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
			},
			getDefaultValue: function() {
				return this._action ? this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformZSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() : this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
			},
			onEnableAction: function(e) {
				cc.log(e), this._actionEnabled ? (this._actionEnabled = !1, this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformZSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI()) : (this._actionEnabled = !0, this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI(), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI(), this.uniformZSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI())
			},
			updateValue: function(e) {
				null != e && (this._action ? (this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[0]), this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[1]), this.uniformZSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[2])) : (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[0]), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[1]), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[2])))
			},
			init: function(e, t, n) {
				this._key = e, this._valueChangedCallback = t, this._action = n, this.uniformName.string = e, this._action ? (this.node.getChildByName("New Node").active = !1, this.node.getChildByName("ActionNode").active = !0, this.node.getChildByName("Frame").width = 2e3, this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformZSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Z:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformZSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Z:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformZSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.node.height = 35) : (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Z:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}))
			},
			onValueChanged: function(e, t) {
				this._valueChangedCallback(e, t)
			},
			onValueChangedTo: function() {}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabCustomComponentVec4: [function(e, t) {
		"use strict";
		cc._RF.push(t, "6821fUIXxJMTplRMLTNRjuX", "ShaderFXPrefabCustomComponentVec4"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.CustomComponentVec4 = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				uniformName: cc.Label,
				uniformXSliderEx: cc.Node,
				uniformXSliderExAction: cc.Node,
				uniformXSliderExActionTo: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformYSliderExAction: cc.Node,
				uniformYSliderExActionTo: cc.Node,
				uniformZSliderEx: cc.Node,
				uniformZSliderExAction: cc.Node,
				uniformZSliderExActionTo: cc.Node,
				uniformWSliderEx: cc.Node,
				uniformWSliderExAction: cc.Node,
				uniformWSliderExActionTo: cc.Node,
				uniformColorEx: cc.Node,
				uniformColorExTo: cc.Node,
				propertyUI: cc.Toggle,
				propertyUI2: cc.Toggle
			},
			onLoad: function() {},
			getKey: function() {
				return this._key
			},
			getValue: function() {
				if (this._action) {
					if (this._mainTexture) return "texture2D(texture, v_uv0)";
					if (this._isColor) {
						var e = this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").getValue();
						return "vec4(" + e.r / 255 + ", " + e.g / 255 + ", " + e.b / 255 + ", " + e.a / 255 + ")"
					}
					return this.propertyUI.isChecked ? "texture2D(texture, v_uv0)" : "vec4(" + this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformZSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformWSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ")"
				}
				return this.propertyUI.isChecked ? "texture2D(texture, v_uv0)" : "vec4(" + this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ")"
			},
			updateValue: function(e) {
				if (null != e)
					if (this._action)
						if (this._isColor) {
							var t = cc.color(e);
							this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").updateUI(t)
						} else this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[0]), this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[1]), this.uniformZSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[2]), this.uniformWSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[3]);
				else if (this.propertyUI2.isChecked) {
					var n = cc.color(e);
					this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(n.r / 255), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(n.g / 255), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(n.b / 255), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(n.a / 255)
				} else this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[0]), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[1]), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[2]), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e.split(",")[3])
			},
			onEnableAction: function(e) {
				cc.log(e), this._actionEnabled ? (this._actionEnabled = !1, this._isColor ? this.uniformColorExTo.getComponent("ShaderFXPrefabUniformColorEx").disableUI() : (this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformZSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformWSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI())) : (this._actionEnabled = !0, this._isColor ? this.uniformColorExTo.getComponent("ShaderFXPrefabUniformColorEx").enableUI() : (this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI(), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI(), this.uniformZSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI(), this.uniformWSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").enableUI()))
			},
			onUseTexture: function() {
				this._valueChangedCallback()
			},
			onColor: function() {},
			getValueTo: function() {
				return this._isColor ? this.uniformColorExTo.getComponent("ShaderFXPrefabUniformColorEx").getValue().toHEX("#rrggbbaa") : this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformZSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformWSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
			},
			getDefaultValue: function() {
				return this._action ? this._isColor ? this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").getValue().toHEX("#rrggbbaa") : this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformZSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformWSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").getValue() : this.propertyUI2.isChecked ? cc.color(255 * this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), 255 * this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), 255 * this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), 255 * this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()).toHEX("#rrggbbaa") : this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + "," + this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
			},
			init: function(e, t, n, o, i) {
				this._key = e, this._action = n, this._isColor = o, this._mainTexture = i, this._valueChangedCallback = t, this.uniformName.string = e, this._action ? this._isColor ? (this.node.getChildByName("New Node").active = !1, this.node.getChildByName("ActionNode").active = !1, this.node.getChildByName("ActionNodeColor").active = !0, this.node.getChildByName("Frame").width = 2e3, this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").config(e, "Color", cc.color("ffffffff"), {
					panel: this.node,
					isInteger: !0,
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformColorExTo.getComponent("ShaderFXPrefabUniformColorEx").config(e, "Color", cc.color("ffffffff"), {
					panel: this.node,
					isInteger: !0,
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformColorExTo.getComponent("ShaderFXPrefabUniformColorEx").disableUI()) : (this.node.getChildByName("New Node").active = !1, this.node.getChildByName("ActionNode").active = !0, this.node.getChildByName("ActionNodeColor").active = !1, this.node.getChildByName("Frame").width = 2e3, this.uniformXSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformYSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformZSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Z:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformZSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Z:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformWSliderExAction.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "W:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformWSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "W:", 1, {
					onValueChanged: this.onValueChangedTo.bind(this)
				}), this.uniformXSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformYSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformZSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.uniformWSliderExActionTo.getComponent("ShaderFXPrefabUniformSliderEx").disableUI(), this.node.height = 35) : (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Z:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "W:", 1, {
					onValueChanged: this.onValueChanged.bind(this)
				}))
			},
			onValueChanged: function(e, t) {
				this._valueChangedCallback(e, t)
			},
			onValueChangedTo: function() {}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabDropDownInfo: [function(e, t) {
		"use strict";
		cc._RF.push(t, "5108c9wvvZPpp4/vDik4t4E", "ShaderFXPrefabDropDownInfo"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.DropDownInfo = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				value: cc.Label
			},
			onLoad: function() {},
			start: function() {},
			config: function(e, t) {
				this.value.string = e, this.cb = t, this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterPropertyValue, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeavePropertyValue, this)
			},
			onClick: function() {
				this.cb && this.cb(this.value.string)
			},
			onMouseEnterPropertyValue: function() {
				this.node.color = cc.Color.YELLOW
			},
			onMouseLeavePropertyValue: function() {
				this.node.color = cc.Color.WHITE
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabExtendPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "9c190RgJb9MDbBEKo8Wfe+L", "ShaderFXPrefabExtendPanel"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.ExtendPanel = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				code: cc.Label,
				info: cc.Label,
				buttonPanel: cc.Node,
				codePanel: cc.Node,
				infoPanel: cc.Node,
				previewPanel: cc.Node,
				codeButton: cc.Node,
				infoButton: cc.Node,
				previewButton: cc.Node,
				uniformOutputPrefab: cc.Node,
				_previewMaterial: null,
				previewMaterial: {
					get: function() {
						return this._previewMaterial
					},
					set: function(e) {
						this._previewMaterial = e
					},
					type: cc.Material
				}
			},
			onLoad: function() {},
			init: function(e) {
				this.configuration = e, this.code.string = e.main.join("\n"), this.info.string = "\nDescription: \n\n" + e.description, this._uniformOutput = this.uniformOutputPrefab.getComponent("ShaderFXPrefabUniformOutput"), this._uniformOutput.config("", "", null, {
					material: this.editorMaterial
				})
			},
			start: function() {
				this.isCodeOn = !1, this.isInfoOn = !1, this.isPreviewOn = !1
			},
			onCode: function() {
				this.isCodeOn ? (this.isCodeOn = !1, this.codePanel.active = !1, this.codeButton.getChildByName("Background").color = cc.color("#2A2A2A")) : (this.isCodeOn = !0, this.codePanel.active = !0, this.codeButton.getChildByName("Background").color = cc.color("#FF8A00"), this.isInfoOn, this.isInfoOn = !1, this.infoPanel.active = !1, this.infoButton.getChildByName("Background").color = cc.color("#2A2A2A"), this.isPreviewOn, this.isPreviewOn = !1, this.previewPanel.active = !1, this.previewButton.getChildByName("Background").color = cc.color("#2A2A2A"))
			},
			onInfo: function() {
				this.isInfoOn ? (this.isInfoOn = !1, this.infoPanel.active = !1, this.infoButton.getChildByName("Background").color = cc.color("#2A2A2A")) : (this.isCodeOn, this.isCodeOn = !1, this.codePanel.active = !1, this.codeButton.getChildByName("Background").color = cc.color("#2A2A2A"), this.isInfoOn, this.isInfoOn = !0, this.infoPanel.active = !0, this.infoButton.getChildByName("Background").color = cc.color("#FF8A00"), this.isPreviewOn, this.isPreviewOn = !1, this.previewPanel.active = !1, this.previewButton.getChildByName("Background").color = cc.color("#2A2A2A"))
			},
			onPreview: function() {
				if (this.isPreviewOn) this.isPreviewOn = !1, this.previewPanel.active = !1, this.previewButton.getChildByName("Background").color = cc.color("#2A2A2A");
				else {
					this.isCodeOn, this.isCodeOn = !1, this.codePanel.active = !1, this.codeButton.getChildByName("Background").color = cc.color("#2A2A2A"), this.isInfoOn, this.isInfoOn = !1, this.infoPanel.active = !1, this.infoButton.getChildByName("Background").color = cc.color("#2A2A2A"), this.isPreviewOn = !0, this.previewPanel.active = !0, this.previewButton.getChildByName("Background").color = cc.color("#FF8A00");
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ExtendPanel.PreviewOn", !0);
					e.target = this.node.getParent(), cc.systemEvent.dispatchEvent(e)
				}
			},
			onOpenURL: function() {
				"undefined" != typeof Editor ? window.__electron.shell.openExternal(this.configuration.refs) : cc.sys.openURL(this.configuration.refs)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabFXComponentPrefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c8a7dkevDdMJZ6Th3aW2eUZ", "ShaderFXPrefabFXComponentPrefab");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.FXComponent = cc.Class({
			extends: cc.Component,
			properties: {
				title: cc.Label,
				des: cc.Label,
				author: cc.Label,
				toolTip: cc.Node,
				localFlag: cc.Node,
				cloudFlag: cc.Node,
				downloadButton: cc.Button,
				removeButton: cc.Button,
				cloneButton: cc.Button,
				capture: cc.Sprite,
				tags: cc.Node,
				tagPrefab: cc.Prefab,
				inputPrefab: cc.Node,
				outputPrefab: cc.Node,
				inputArea: cc.Node,
				outputArea: cc.Node,
				params: cc.Node,
				ccc: cc.Node
			},
			onLoad: function() {},
			start: function() {},
			getDataTypeColor: function(e, t) {
				return 1 == t && (e = "Color"), {
					INT: cc.color(255, 255, 255),
					BOOL: cc.color(255, 255, 255),
					UV: cc.color(255, 165, 79),
					SAMPLER2D: cc.color(132, 112, 255),
					COLOR: cc.Color.GREEN,
					FLOAT: cc.color(0, 245, 255),
					ARRAY: cc.Color.YELLOW,
					OBJECT: cc.color(127, 255, 0),
					VEC2: cc.color(255, 165, 79),
					VEC3: cc.color(255, 105, 180),
					VEC4: cc.Color.GREEN,
					FRAG: cc.Color.GREEN,
					SPINESKELETON: cc.Color.BLACK
				}[e.toUpperCase()]
			},
			onMask: function() {
				this.params.getComponent(cc.Mask).enabled ? (this.params.getComponent(cc.Mask).enabled = !1, this.ccc.opacity = 50) : (this.params.getComponent(cc.Mask).enabled = !0, this.ccc.opacity = 255)
			},
			init: function(e, t, o, i, a) {
				this.parent = a, this.info = t, this.cloud = i, this.no = e, this.title.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.name + "/" + t.name_zh : t.name, this.des.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? t.description.zh : t.description.en, this.author.string = t.author ? t.author : "???", new Date(t.date), o ? (this.localFlag.color = cc.Color.GREEN, this.downloadButton.interactable = !0, this.removeButton.interactable = !0, this.cloneButton.interactable = !0) : (this.localFlag.color = cc.Color.YELLOW, this.downloadButton.interactable = !0, this.removeButton.interactable = !1, this.cloneButton.interactable = !1), this.downloadButton.interactable = !0, this.tags.removeAllChildren(!0), cc.log(this.info.input), cc.log(this.info.output);
				for (var r = 0; r < this.info.input.length; r++) {
					var s = this.info.input[r],
						c = cc.instantiate(this.inputPrefab);
					this.inputArea.addChild(c), c.getChildByName("Type").getComponent(cc.Label).string = s.type, c.getChildByName("Type").color = this.getDataTypeColor(s.type), c.getChildByName("Slot").color = this.getDataTypeColor(s.type), c.getChildByName("Name").getComponent(cc.Label).string = s.name
				}
				for (this.inputPrefab.active = !1, r = 0; r < this.info.output.length; r++) {
					var l = this.info.output[r],
						h = cc.instantiate(this.outputPrefab);
					this.outputArea.addChild(h), h.getChildByName("Type").getComponent(cc.Label).string = l.type, h.getChildByName("Type").color = this.getDataTypeColor(l.type), h.getChildByName("Slot").color = this.getDataTypeColor(l.type), h.getChildByName("Name").getComponent(cc.Label).string = l.name
				}
				this.outputPrefab.active = !1;
				var u = this;
				for (this.localFlag.on(cc.Node.EventType.MOUSE_ENTER, function() {
						u.localFlag.getChildByName("ToolTip").active = !0
					}, this), this.localFlag.on(cc.Node.EventType.MOUSE_LEAVE, function() {
						u.localFlag.getChildByName("ToolTip").active = !1
					}, this), this.author.node.on(cc.Node.EventType.MOUSE_ENTER, function() {
						u.author.node.getChildByName("ToolTip").active = !0
					}, this), this.author.node.on(cc.Node.EventType.MOUSE_LEAVE, function() {
						u.author.node.getChildByName("ToolTip").active = !1
					}, this), r = 0; r < this.info.tags.length && !(r > 4); r++) {
					var p = cc.instantiate(this.tagPrefab);
					this.tags.addChild(p, -999), p.getComponent("ShaderFXGalleryTagPrefab").init(r, this.info.tags[r])
				}
				if (this.cloud) {
					if (this.cloud.capture) {
						var d = this;
						n.ShaderFX.DnDUtil.generateTexture2D(this.cloud.capture, function(e) {
							d.capture.spriteFrame = new cc.SpriteFrame(e)
						})
					}
				} else if (this.info.capture) {
					this.capture.color = cc.Color.GREEN;
					var f = this;
					n.ShaderFX.DnDUtil.generateTexture2D(this.info.capture, function(e) {
						f.capture.spriteFrame = new cc.SpriteFrame(e)
					})
				}
			},
			onDownload: function() {
				var e;
				this.localFlag.color = cc.Color.GREEN, this.removeButton.interactable = !0, this.cloneButton.interactable = !0, (e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Download", !0)).target = this.node, e.setUserData(this.cloud), cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u4e0b\u8f7d\u6210\u529f\uff0c\u4f60\u53ef\u4ee5\u5728[\u53f3\u952e\u83dc\u5355]\u4e2d\u627e\u5230\u8be5\u7ec4\u4ef6"), cc.systemEvent.dispatchEvent(e)
			},
			onExport: function() {
				this.parent && this.parent.onExport(this.info, this.no)
			},
			exportFX3D: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Export", !0);
				e.target = this.node, e.setUserData(this.info), cc.systemEvent.dispatchEvent(e)
			},
			exportFX: function() {},
			onClone: function() {
				(e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Clone", !0)).target = this.node;
				var e, t = Object.assign({}, this.info);
				delete t.prefab, delete t.fx, t.name = t.name + "Clone", t.name_zh = t.name_zh + "\u514b\u9686", t.uuid = n.ShaderFX.Util.uuidv4(), t.author = n.ShaderFX.LeanCloudUtil.getCurrentUsername(), e.setUserData({
					component: JSON.stringify(t),
					custom: !0,
					folder: JSON.stringify({
						en: t.category.en,
						zh: t.category.zh
					}),
					official: !1,
					uuid: t.uuid
				}), cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u514b\u9686\u6210\u529f\uff0c\u4f60\u53ef\u4ee5\u5728[\u6211\u7684\u7ec4\u4ef6]\u4e2d\u627e\u5230\u8be5\u7ec4\u4ef6\u5e76\u8fdb\u884c\u8fdb\u4e00\u6b65\u7f16\u8f91\u4f7f\u7528"), cc.systemEvent.dispatchEvent(e)
			},
			onRemove: function() {
				var e;
				this.localFlag.color = cc.Color.YELLOW, this.downloadButton.interactable = !0, this.removeButton.interactable = !1, this.cloneButton.interactable = !1, (e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Remove", !0)).target = this.node, e.setUserData(this.cloud ? this.cloud : this.info), cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u5220\u9664\u7ec4\u4ef6\u6210\u529f"), cc.systemEvent.dispatchEvent(e)
			},
			onMouseEnterTitle: function() {
				this.toolTip.active = !0
			},
			onMouseLeaveTitle: function() {
				this.toolTip.active = !1
			},
			onMouseEnterCapture: function() {
				this.preview.node.scale = 1.2
			},
			onMouseLeaveCapture: function() {
				this.preview.node.scale = 1
			},
			onVideo: function() {
				var e;
				this.cloud && this.cloud.video ? "https://supersuraccoon.gitee.io/ssrshadergallery/Video" == this.cloud.video ? ((e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Video", !0)).target = this.node, e.setUserData(this.cloud.video + "/" + this.info.name + ".mkv"), cc.systemEvent.dispatchEvent(e)) : ((e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Video", !0)).target = this.node, e.setUserData(this.cloud.video), cc.systemEvent.dispatchEvent(e)) : ((e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Video", !0)).target = this.node, e.setUserData("https://supersuraccoon.gitee.io/ssrshaderfxeditorweb/doc/res/FXEditor/sample/premade/" + this.info.name + "Sample.mkv"), cc.systemEvent.dispatchEvent(e))
			},
			updateCloud: function(e) {
				this.cloud = e, this.downloadButton.interactable = !0
			},
			updateCapture: function(e) {
				var t = this;
				n.ShaderFX.DnDUtil.generateTexture2D(e, function(e) {
					t.capture.spriteFrame = new cc.SpriteFrame(e)
				})
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabFilterMode: [function(e, t) {
		"use strict";
		cc._RF.push(t, "22be8NshG9KAoy2KHCdPIEu", "ShaderFXPrefabFilterMode");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.FilterMode = cc.Class({
			extends: cc.Component,
			properties: {
				dropButton: cc.Node,
				scrollView: cc.Node,
				mode: cc.Label,
				nearestNode: cc.Node,
				linearNode: cc.Node
			},
			onLoad: function() {},
			start: function() {},
			init: function(e) {
				this.uniformTexturePrefab = e
			},
			onDrop: function() {
				this.scrollView.active ? this.scrollView.active = !1 : this.scrollView.active = !0
			},
			onWrapModeNearest: function() {
				this.scrollView.active = !1, this.mode.string = "Nearest", this.linearNode.active = !0, this.nearestNode.active = !1, this.uniformTexturePrefab.getComponent(n.ShaderFX.Prefab.UniformTexture).updateFilterMode(this.mode.string)
			},
			onWrapModeLinear: function() {
				this.scrollView.active = !1, this.linearNode.active = !1, this.nearestNode.active = !0, this.mode.string = "Linear", this.uniformTexturePrefab.getComponent(n.ShaderFX.Prefab.UniformTexture).updateFilterMode(this.mode.string)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabOutputPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "62d78m2c+pGyr5R28QZg4LK", "ShaderFXPrefabOutputPanel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.FXPanelOutput = cc.Class({
			extends: e("./ShaderFXPrefabPanel"),
			editor: !1,
			properties: {},
			onLoad: function() {
				this._super()
			},
			init: function(e) {
				this._super(e)
			},
			initUniforms: function() {
				var e = cc.instantiate(this.uniformOutputPrefab);
				this._uniformOutput = e.getComponent("ShaderFXPrefabUniformOutput"), this._uniformOutput.config("output", "output", null, {
					material: this.editorMaterial,
					panel: this.node,
					name: this._configuration.name
				}), this.uniformsPanel.addChild(e)
			},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabPanel": "ShaderFXPrefabPanel"
	}],
	ShaderFXPrefabPackMode: [function(e, t) {
		"use strict";
		cc._RF.push(t, "8fa3cwryP1HCoEKelGc+L8h", "ShaderFXPrefabPackMode");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.PackMode = cc.Class({
			extends: cc.Component,
			properties: {
				dropButton: cc.Node,
				scrollView: cc.Node,
				mode: cc.Label,
				unpackNode: cc.Node,
				packNode: cc.Node
			},
			onLoad: function() {},
			start: function() {},
			init: function(e) {
				this.uniformTexturePrefab = e
			},
			onDrop: function() {
				this.scrollView.active ? this.scrollView.active = !1 : this.scrollView.active = !0
			},
			onAtlas: function() {
				this.uniformTexturePrefab.getComponent(n.ShaderFX.Prefab.UniformTexture).showAtlas()
			},
			onWrapModeUnpack: function() {
				this.scrollView.active = !1, this.mode.string = "Unpack", this.packNode.active = !0, this.unpackNode.active = !1, this.uniformTexturePrefab.getComponent(n.ShaderFX.Prefab.UniformTexture).updatePackMode(this.mode.string)
			},
			onWrapModePack: function() {
				this.scrollView.active = !1, this.mode.string = "Pack", this.packNode.active = !1, this.unpackNode.active = !0, this.uniformTexturePrefab.getComponent(n.ShaderFX.Prefab.UniformTexture).updatePackMode(this.mode.string)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "01706NMQ49Ak69ny+tXhg81", "ShaderFXPrefabPanel");
		var n = e("../../namespace/ShaderFXNamespace"),
			o = e("../../../shader-fx/util/ShaderFXUtil");
		n.ShaderFX.Prefab.FXPanel = cc.Class({
			extends: e("../../../digraph-editor/prefab/DigraphEditorPrefabPanel"),
			editor: !1,
			properties: {
				uniformsPanel: cc.Node,
				uniformEditBoxPrefab: cc.Prefab,
				uniformSliderPrefab: cc.Prefab,
				uniformSliderExPrefab: cc.Prefab,
				uniformTogglePrefab: cc.Prefab,
				uniformTexturePrefab: cc.Prefab,
				uniformSpinePrefab: cc.Prefab,
				uniformColorPrefab: cc.Prefab,
				uniformColorExPrefab: cc.Prefab,
				uniformOutputPrefab: cc.Prefab,
				packModePrefab: cc.Prefab,
				wrapModePrefab: cc.Prefab,
				filterModePrefab: cc.Prefab,
				mainPanel: cc.Node,
				samplePanel: cc.Node,
				cloneButton: cc.Node,
				previewButton: cc.Node,
				infoButton: cc.Node,
				deleteButton: cc.Node,
				ungroupButton: cc.Node,
				spriteTab: cc.Node,
				spineTab: cc.Node,
				_editorMaterial: null,
				editorMaterial: {
					get: function() {
						return this._editorMaterial
					},
					set: function(e) {
						this._editorMaterial = e
					},
					type: cc.Material
				}
			},
			statics: {
				tab: 0
			},
			exportSnapshot: function(e) {
				if ("Output" == this._configuration.name) {
					var t = this;
					t._uniformOutput.captureNode.active = !0, setTimeout(function() {
						t._uniformOutput.captureNode.getComponent("FBONodeCaptureComponent").capture(e), t._uniformOutput.captureNode.active = !1
					}, 100)
				}
			},
			onPreview: function() {
				var e;
				if (1 == n.ShaderFX.Prefab.FXPanel.tab) return (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).setUserData("Spine \u52a8\u753b\u6682\u4e0d\u652f\u6301\u5206\u90e8\u9884\u89c8"), void cc.systemEvent.dispatchEvent(e);
				this.node.getChildByName("Bg").getChildByName("PreviewPanel").active ? this.node.getChildByName("Bg").getChildByName("PreviewPanel").active = !1 : this.node.getChildByName("Bg").getChildByName("PreviewPanel").active = !0, (e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ExtendPanel.PreviewOn", !0)).target = this.node, cc.systemEvent.dispatchEvent(e)
			},
			onInfo: function() {
				this.samplePanel.active ? this.samplePanel.active = !1 : this.samplePanel.active = !0
			},
			onLoad: function() {
				this._super(), this._panelUniforms = {}, this._previewUniforms = {}, this._previewDigraph = [], cc.systemEvent.on("ssr.ShaderFX.Prefab.Uniform.onValueChanged", this.uniformUpdated, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.UniformPanel.renameUniformKey", this.updateUniformKeyValue, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", this.updateUniformKeyValue, this)
			},
			isPanelInPreviewDigraph: function(e) {
				for (var t = 0; t < this._previewDigraph.length; t++)
					if (this._previewDigraph[t] == e) return !0;
				return !1
			},
			isConstant: function() {
				return !1
			},
			isUniform: function() {
				return !1
			},
			updatePreviewDigraph: function(e, t, o) {
				"Output" != this._configuration.name && "MainTexture" != this._configuration.name && "SpineSkeleton" != this._configuration.name && this.node.getChildByName("Bg") && this.node.getChildByName("Bg").getChildByName("PreviewPanel") && this.node.getChildByName("Bg").getChildByName("PreviewPanel").active && 1 == n.ShaderFX.Prefab.FXPanel.tab ? this.node.getChildByName("Bg").getChildByName("PreviewPanel").active = !1 : (this._previewDigraph = e, this.updatePreview(this._previewDigraph, t, o))
			},
			setPreviewDigraph: function(e) {
				this._previewDigraph = e
			},
			getPreviewDigraph: function() {
				return this._previewDigraph
			},
			uniformUpdated: function() {},
			updateUniformKeyValue: function(e) {
				var t = e.getUserData();
				null != this._previewUniforms[t.oldKey] && t.oldKey != t.key && (this._previewUniforms[t.key] = this._previewUniforms[t.oldKey], delete this._previewUniforms[t.oldKey])
			},
			clone: function() {},
			getConfiguration: function() {
				return this._configuration
			},
			_makeRenamedMainPrefix: function() {
				return "c_" + this._configuration.name + "_"
			},
			_makeRenamedMain: function() {
				return this._makeRenamedMainPrefix() + "main_" + this.getPanelID()
			},
			updateUniformValue: function(e, t) {
				if ("texture" == e) return t.filterMode && ("Nearest" == t.filterMode ? this.filterModeComponent.getComponent("ShaderFXPrefabFilterMode").onWrapModeNearest() : "Linear" == t.filterMode && this.filterModeComponent.getComponent("ShaderFXPrefabFilterMode").onWrapModeLinear()), t.wrapMode && ("Clamp" == t.wrapMode ? this.wrapModeComponent.getComponent("ShaderFXPrefabWrapMode").onWrapModeClamp() : "Repeat" == t.wrapMode && this.wrapModeComponent.getComponent("ShaderFXPrefabWrapMode").onWrapModeRepeat()), void(t.packMode && ("Pack" == t.packMode ? this.packModeComponent.getComponent("ShaderFXPrefabPackMode").onWrapModePack() : "Unpack" == t.packMode && this.packModeComponent.getComponent("ShaderFXPrefabPackMode").onWrapModeUnpack()));
				for (var n = this.uniformsPanel.getChildren(), o = 0; o < n.length; o++) {
					var i = n[o];
					i.getComponent("ShaderFXPrefabUniformSlider") ? i.getComponent("ShaderFXPrefabUniformSlider").getKey() == e && i.getComponent("ShaderFXPrefabUniformSlider").updateUI(t) : i.getComponent("ShaderFXPrefabUniformToggle") ? i.getComponent("ShaderFXPrefabUniformToggle").getKey() == e && i.getComponent("ShaderFXPrefabUniformToggle").updateUI(t) : i.getComponent("ShaderFXPrefabUniformSliderEx") ? i.getComponent("ShaderFXPrefabUniformSliderEx").getKey() == e && i.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : i.getComponent("ShaderFXPrefabUniformColor") ? i.getComponent("ShaderFXPrefabUniformColor").getKey() == e && i.getComponent("ShaderFXPrefabUniformColor").updateUI(t) : i.getComponent("ShaderFXPrefabUniformColorEx") && i.getComponent("ShaderFXPrefabUniformColorEx").getKey() == e && i.getComponent("ShaderFXPrefabUniformColorEx").updateUI(t)
				}
			},
			getUniformValue: function(e) {
				for (var t = this.uniformsPanel.getChildren(), n = 0; n < t.length; n++) {
					var o = t[n];
					if (o.getComponent("ShaderFXPrefabUniformSlider")) {
						if (o.getComponent("ShaderFXPrefabUniformSlider").getKey() == e) return o.getComponent("ShaderFXPrefabUniformSlider").getValue()
					} else if (o.getComponent("ShaderFXPrefabUniformSliderEx")) {
						if (o.getComponent("ShaderFXPrefabUniformSliderEx").getKey() == e) return o.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
					} else if (o.getComponent("ShaderFXPrefabUniformToggle")) {
						if (o.getComponent("ShaderFXPrefabUniformToggle").getKey() == e) return o.getComponent("ShaderFXPrefabUniformToggle").getValue()
					} else if (o.getComponent("ShaderFXPrefabUniformSpineSkeleton")) {
						if (!e || o.getComponent("ShaderFXPrefabUniformSpineSkeleton").getKey() == e) return o.getComponent("ShaderFXPrefabUniformSpineSkeleton").getSpineValue()
					} else if (o.getComponent("ShaderFXPrefabUniformColor")) {
						if (o.getComponent("ShaderFXPrefabUniformColor").getKey() == e) return o.getComponent("ShaderFXPrefabUniformColor").getValue()
					} else if (o.getComponent("ShaderFXPrefabUniformColorEx")) {
						if (o.getComponent("ShaderFXPrefabUniformColorEx").getKey() == e) return o.getComponent("ShaderFXPrefabUniformColorEx").getValue()
					} else if (o.getComponent("ShaderFXPrefabUniformTexture") && o.getComponent("ShaderFXPrefabUniformTexture").getKey() == e) return o.getComponent("ShaderFXPrefabUniformTexture").getValue()
				}
				return null
			},
			init: function(e) {
				for (var t in this._configuration = e, this.title.string = e.overload ? e.name.substring(0, e.name.length - 1) : e.name, window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE && (this.isConstant() || this.isUniform() || "" == e.name_zh || (this.title.string += "/", this.title.string += e.name_zh)), this._fragFunctions = e.frags, this._main = e.main, this._uniforms = Object.assign({}, e.uniforms), this._codes = "", this._fragFunctions) this._codes += this._fragFunctions[t].join("\n"), this._codes += "\n";
				for (var t in this._codes += this._main.join("\n"), this._codes += "\n", this._renamedFrags = {}, this._fragFunctions) {
					var n = this._makeRenamedFrag(t);
					this._renamedFrags[n] = this._fragFunctions[t];
					var o = new RegExp("\\b" + t + "\\b", "g");
					this._codes = this._codes.replace(o, n)
				}
				this._fragFunctions = this._renamedFrags;
				var i = this._makeRenamedMain();
				for (var t in this._renamedFrags = {
						main: i
					}, o = new RegExp("main", "g"), this._codes = this._codes.replace(o, i), this._previewUniforms = {}, this._panelUniforms = {}, this._uniforms)
					if ("texture" == t) this._previewUniforms[t] = {}, this._previewUniforms[t].value = this._uniforms[t].default, this._previewUniforms[t].type = this._uniforms[t].type, this._panelUniforms[t] = {}, this._panelUniforms[t].value = this._uniforms[t].default, this._panelUniforms[t].type = this._uniforms[t].type;
					else {
						var a = t + "_" + this.getPanelID();
						this._previewUniforms[a] = {}, "cc.Color" == this._uniforms[t].type ? this._previewUniforms[a].value = cc.color(this._uniforms[t].default) : "vec2" == this._uniforms[t].type ? (this._uniforms[t].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1])], this._previewUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1])]) : "vec3" == this._uniforms[t].type ? (this._uniforms[t].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2])], this._previewUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2])]) : "vec4" == this._uniforms[t].type ? (this._uniforms[t].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2]), parseFloat(this._uniforms[t].default.split(",")[3])], this._previewUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2]), parseFloat(this._uniforms[t].default.split(",")[3])]) : this._previewUniforms[a].value = this._uniforms[t].default, this._previewUniforms[a].type = this._uniforms[t].type, this._panelUniforms[a] = {}, "cc.Color" == this._uniforms[t].type ? this._panelUniforms[a].value = cc.color(this._uniforms[t].default) : "vec2" == this._uniforms[t].type ? this._panelUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1])] : "vec3" == this._uniforms[t].type ? this._panelUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2])] : "vec4" == this._uniforms[t].type ? this._panelUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2]), parseFloat(this._uniforms[t].default.split(",")[3])] : this._panelUniforms[a].value = this._uniforms[t].default, this._panelUniforms[a].type = this._uniforms[t].type, o = new RegExp("\\b" + t + "\\b", "g"), this._codes = this._codes.replace(o, a), this._uniforms[a] = this._uniforms[t], delete this._uniforms[t]
					}
				this.initSlots(), this.initUniforms(), this.initExtendPanel(), "MainTexture" == this._configuration.name && (this.cloneButton.active = !1, this.deleteButton.active = !1, this.ungroupButton.active = !1, this.previewButton.active = !1, this.infoButton.active = !1, this.spriteTab.active = !0, this.spineTab.active = !0, this.node.scale *= 1.1), this._configuration.name
			},
			onSpriteTab: function() {
				if (0 != n.ShaderFX.Prefab.FXPanel.tab) {
					n.ShaderFX.Prefab.FXPanel.tab = 0, cc.log("onSpriteTab");
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.onSprite", !0);
					e.setUserData(this), e.target = this, cc.systemEvent.dispatchEvent(e)
				}
			},
			onSpineTab: function() {
				if (1 != n.ShaderFX.Prefab.FXPanel.tab) {
					n.ShaderFX.Prefab.FXPanel.tab = 1, cc.log("onSpineTab");
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.onSpine", !0);
					e.setUserData(this), e.target = this, cc.systemEvent.dispatchEvent(e)
				}
			},
			initCustom: function(e) {
				for (var t in this._configuration = e, this._isCustomNode = !0, this.title.string = e.overload ? e.name.substring(0, e.name.length - 1) : e.name, window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE && (this.title.string += "/", this.title.string += e.overload ? e.name_zh.substring(0, e.name_zh.length - 1) : e.name_zh), this._fragFunctions = e.frags, this._main = e.main, this._uniforms = Object.assign({}, e.uniforms), this._codes = "", this._fragFunctions) this._codes += this._fragFunctions[t].join("\n"), this._codes += "\n";
				for (var t in this._codes += this._main.join("\n"), this._codes += "\n", this._renamedFrags = {}, this._fragFunctions) {
					var n = this._makeRenamedFrag(t);
					this._renamedFrags[n] = this._fragFunctions[t];
					var o = new RegExp("\\b" + t + "\\b", "g");
					this._codes = this._codes.replace(o, n)
				}
				this._fragFunctions = this._renamedFrags;
				var i = this._makeRenamedMain();
				for (var t in this._renamedFrags = {
						main: i
					}, o = new RegExp("main", "g"), this._codes = this._codes.replace(o, i), this._previewUniforms = {}, this._panelUniforms = {}, this._uniforms)
					if ("texture" == t) this._previewUniforms[t] = {}, this._previewUniforms[t].value = this._uniforms[t].default, this._previewUniforms[t].type = this._uniforms[t].type, this._panelUniforms[t] = {}, this._panelUniforms[t].value = this._uniforms[t].default, this._panelUniforms[t].type = this._uniforms[t].type;
					else {
						var a = t + "_" + this.getPanelID();
						0 == this._uniforms[t].rename && (a = t), this._previewUniforms[a] = {}, "cc.Color" == this._uniforms[t].type ? this._previewUniforms[a].value = cc.color(this._uniforms[t].default) : "vec2" == this._uniforms[t].type ? (this._uniforms[t].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1])], this._previewUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1])]) : "vec3" == this._uniforms[t].type ? (this._uniforms[t].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2])], this._previewUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2])]) : "vec4" == this._uniforms[t].type ? (this._uniforms[t].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2]), parseFloat(this._uniforms[t].default.split(",")[3])], this._previewUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2]), parseFloat(this._uniforms[t].default.split(",")[3])]) : this._previewUniforms[a].value = this._uniforms[t].default, this._previewUniforms[a].type = this._uniforms[t].type, this._panelUniforms[a] = {}, "cc.Color" == this._uniforms[t].type ? this._panelUniforms[a].value = cc.color(this._uniforms[t].default) : "vec2" == this._uniforms[t].type ? this._panelUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1])] : "vec3" == this._uniforms[t].type ? this._panelUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2])] : "vec4" == this._uniforms[t].type ? this._panelUniforms[a].value = [parseFloat(this._uniforms[t].default.split(",")[0]), parseFloat(this._uniforms[t].default.split(",")[1]), parseFloat(this._uniforms[t].default.split(",")[2]), parseFloat(this._uniforms[t].default.split(",")[3])] : this._panelUniforms[a].value = this._uniforms[t].default, this._panelUniforms[a].type = this._uniforms[t].type, o = new RegExp("\\b" + t + "\\b", "g"), this._codes = this._codes.replace(o, a), 0 != this._uniforms[t].rename && (this._uniforms[a] = this._uniforms[t], delete this._uniforms[t])
					}
				this._uniformOutput = this.node.getChildByName("Bg").getChildByName("PreviewPanel").getChildByName("ShaderFXPrefabUniformOutput").getComponent("ShaderFXPrefabUniformOutput"), this._uniformOutput.config("", "", null, {
					material: this.editorMaterial,
					isCustom: !0,
					name: this._configuration.name,
					testrun: this._testrun
				})
			},
			initExtendPanel: function() {
				"Output" != this._configuration.name && "MainTexture" != this._configuration.name && "SpineSkeleton" != this._configuration.name && (this.samplePanel.getComponent("ShaderFXPrefabSample").updateSample(this._configuration, this._configuration, this._configuration.overload ? this._configuration.name.substring(0, this._configuration.name.length - 1) : this._configuration.name), this._uniformOutput = this.node.getChildByName("Bg").getChildByName("PreviewPanel").getChildByName("ShaderFXPrefabUniformOutput").getComponent("ShaderFXPrefabUniformOutput"), this._uniformOutput.config("", "", null, {
					material: this.editorMaterial,
					name: this._configuration.name
				}))
			},
			initSlots: function() {
				for (var e = 0; e < this._configuration.input.length; e++) {
					var t = this._configuration.input[e];
					this.addInputSlot(t, e)
				}
				for (e = 0; e < this._configuration.output.length; e++) {
					var n = this._configuration.output[e];
					this.addOutputSlot(n, e)
				}
			},
			updateMain: function() {},
			updateUniforms: function(e, t) {
				for (var o in e || this.uniformsPanel.removeAllChildren(!0), this._previewUniforms = {}, this._panelUniforms = {}, this._uniforms = Object.assign({}, this._configuration.uniforms), this._uniforms)
					if ("texture" == o) this._previewUniforms[o] = {}, this._previewUniforms[o].value = this._uniforms[o].default, this._previewUniforms[o].type = this._uniforms[o].type, this._panelUniforms[o] = {}, this._panelUniforms[o].value = this._uniforms[o].default, this._panelUniforms[o].type = this._uniforms[o].type;
					else {
						var i = o + "_" + this.getPanelID();
						t && (i = o), 0 == this._uniforms[o].rename && (i = o), this._previewUniforms[i] = {}, "cc.Color" == this._uniforms[o].type ? this._previewUniforms[i].value = cc.color(this._uniforms[o].default) : "vec2" == this._uniforms[o].type ? (this._uniforms[o].value = [parseFloat(this._uniforms[o].default.split(",")[0]), parseFloat(this._uniforms[o].default.split(",")[1])], this._previewUniforms[i].value = [parseFloat(this._uniforms[o].default.split(",")[0]), parseFloat(this._uniforms[o].default.split(",")[1])]) : "vec3" == this._uniforms[o].type ? (this._uniforms[o].value = [parseFloat(this._uniforms[o].default.split(",")[0]), parseFloat(this._uniforms[o].default.split(",")[1]), parseFloat(this._uniforms[o].default.split(",")[2])], this._previewUniforms[i].value = [parseFloat(this._uniforms[o].default.split(",")[0]), parseFloat(this._uniforms[o].default.split(",")[1]), parseFloat(this._uniforms[o].default.split(",")[2])]) : "vec4" == this._uniforms[o].type ? (this._uniforms[o].value = [parseFloat(this._uniforms[o].default.split(",")[0]), parseFloat(this._uniforms[o].default.split(",")[1]), parseFloat(this._uniforms[o].default.split(",")[2]), parseFloat(this._uniforms[o].default.split(",")[3])], this._previewUniforms[i].value = [parseFloat(this._uniforms[o].default.split(",")[0]), parseFloat(this._uniforms[o].default.split(",")[1]), parseFloat(this._uniforms[o].default.split(",")[2]), parseFloat(this._uniforms[o].default.split(",")[3])]) : "sampler2D" == this._uniforms[o].type && this._uniforms[o].value ? this._previewUniforms[i].value = this._uniforms[o].value : this._previewUniforms[i].value = this._uniforms[o].default, this._previewUniforms[i].type = this._uniforms[o].type, this._panelUniforms[i] = {}, "cc.Color" == this._uniforms[o].type ? this._panelUniforms[i].value = cc.color(this._uniforms[o].default) : "vec2" == this._uniforms[o].type ? this._panelUniforms[i].value = [parseFloat(this._uniforms[o].default.split(",")[0]), parseFloat(this._uniforms[o].default.split(",")[1])] : "vec3" == this._uniforms[o].type ? this._panelUniforms[i].value = [parseFloat(this._uniforms[o].default.split(",")[0]), parseFloat(this._uniforms[o].default.split(",")[1]), parseFloat(this._uniforms[o].default.split(",")[2])] : "vec4" == this._uniforms[o].type ? this._panelUniforms[i].value = [parseFloat(this._uniforms[o].default.split(",")[0]), parseFloat(this._uniforms[o].default.split(",")[1]), parseFloat(this._uniforms[o].default.split(",")[2]), parseFloat(this._uniforms[o].default.split(",")[3])] : "sampler2D" == this._uniforms[o].type && this._uniforms[o].value ? this._panelUniforms[i].value = this._uniforms[o].value : this._panelUniforms[i].value = this._uniforms[o].default, this._panelUniforms[i].type = this._uniforms[o].type;
						var a = new RegExp("\\b" + o + "\\b", "g");
						this._codes = this._codes.replace(a, i), 0 != this._uniforms[o].rename && (this._uniforms[i] = this._uniforms[o], i != o && delete this._uniforms[o])
					}
				if (0 == Object.keys(this._uniforms).length) this.uniformsPanel.parent.active = !1;
				else
					for (var o in this.uniformsPanel.parent.active = !0, this._uniforms) {
						var r = this._uniforms[o].type;
						if (1 != this._uniforms[o].hide)
							if ("float" == r) {
								var s = o,
									c = parseFloat(this._uniforms[o].default);
								if (this._uniforms[o] && 1 == this._uniforms[o].slider) {
									var l = parseFloat(this._uniforms[o].min),
										h = parseFloat(this._uniforms[o].max),
										u = cc.instantiate(this.uniformSliderPrefab);
									u.getComponent("ShaderFXPrefabUniformSlider").config(o, -1 == s.lastIndexOf("_") ? s : s.substring(0, s.lastIndexOf("_")), c, {
										min: l,
										max: h,
										panel: this.node
									}), this.uniformsPanel.addChild(u)
								} else {
									var p = cc.instantiate(this.uniformSliderExPrefab);
									p.getComponent("ShaderFXPrefabUniformSliderEx").config(o, -1 == s.lastIndexOf("_") ? s : s.substring(0, s.lastIndexOf("_")), c, {
										panel: this.node
									}), this.uniformsPanel.addChild(p)
								}
							} else if ("sampler2D" == r) {
							var d = cc.instantiate(this.uniformTexturePrefab),
								f = this._uniforms[o].default;
							d.getComponent("ShaderFXPrefabUniformTexture").config(o, o, f, {
								panel: this.node
							}), this.uniformsPanel.addChild(d, 9999), "MainTexture" == this._configuration.name && (this.filterModeComponent = cc.instantiate(this.filterModePrefab), this.filterModeComponent.getComponent(n.ShaderFX.Prefab.FilterMode).init(d), this.uniformsPanel.addChild(this.filterModeComponent, 99), this.wrapModeComponent = cc.instantiate(this.wrapModePrefab), this.wrapModeComponent.getComponent(n.ShaderFX.Prefab.WrapMode).init(d), this.uniformsPanel.addChild(this.wrapModeComponent, 100), this.packModeComponent = cc.instantiate(this.packModePrefab), this.packModeComponent.getComponent(n.ShaderFX.Prefab.PackMode).init(d), this.uniformsPanel.addChild(this.packModeComponent, 101))
						} else if ("spineSkeleton" == r) {
							var m = cc.instantiate(this.uniformSpinePrefab);
							m.getComponent("ShaderFXPrefabUniformSpineSkeleton").config(o, o, f, {
								panel: this.node
							}), this.uniformsPanel.addChild(m, 9999)
						} else if ("vec4" == r) {
							var g = o,
								C = cc.instantiate(this.uniformColorExPrefab),
								_ = this._uniforms[o].default;
							C.getComponent("ShaderFXPrefabUniformColorEx").config(o, -1 == g.lastIndexOf("_") ? g : g.substring(0, g.lastIndexOf("_")), cc.color(_), {
								panel: this.node
							}), this.uniformsPanel.addChild(C)
						} else if ("bool" == r) {
							var v = o,
								E = cc.instantiate(this.uniformTogglePrefab),
								S = this._uniforms[o].default;
							E.getComponent("ShaderFXPrefabUniformToggle").config(o, -1 == v.lastIndexOf("_") ? v : v.substring(0, v.lastIndexOf("_")), S, {
								panel: this.node
							}), this.uniformsPanel.addChild(E)
						}
					}
			},
			updateSlots: function() {
				this.inputSlotPanel.removeAllChildren(!0), this.outputSlotPanel.removeAllChildren(!0);
				for (var e = 0; e < this._configuration.input.length; e++) {
					var t = this._configuration.input[e];
					this.addInputSlot(t, e)
				}
				for (e = 0; e < this._configuration.output.length; e++) {
					var n = this._configuration.output[e];
					this.addOutputSlot(n, e)
				}
			},
			updateName: function(e) {
				this._configuration = e, this.title.string = e.name, window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE && (this.title.string += "/", this.title.string += e.name_zh)
			},
			initUniforms: function() {
				if (0 == Object.keys(this._uniforms).length) this.uniformsPanel.parent.active = !1;
				else
					for (var e in this.uniformsPanel.parent.active = !0, this._uniforms) {
						var t = this._uniforms[e].type;
						if ("float" == t) {
							var o = e,
								i = parseFloat(this._uniforms[e].default);
							if (this._uniforms[e] && 1 == this._uniforms[e].slider) {
								var a = parseFloat(this._uniforms[e].min),
									r = parseFloat(this._uniforms[e].max),
									s = cc.instantiate(this.uniformSliderPrefab);
								s.getComponent("ShaderFXPrefabUniformSlider").config(e, o.substring(0, o.lastIndexOf("_")), i, {
									min: a,
									max: r,
									panel: this.node
								}), this.uniformsPanel.addChild(s)
							} else {
								var c = cc.instantiate(this.uniformSliderExPrefab);
								c.getComponent("ShaderFXPrefabUniformSliderEx").config(e, o.substring(0, o.lastIndexOf("_")), i, {
									panel: this.node
								}), this.uniformsPanel.addChild(c)
							}
						} else if ("sampler2D" == t) {
							var l = cc.instantiate(this.uniformTexturePrefab),
								h = this._uniforms[e].default;
							l.getComponent("ShaderFXPrefabUniformTexture").config(e, e, h, {
								panel: this.node
							}), this.uniformsPanel.addChild(l, 9999), "MainTexture" == this._configuration.name && (this.filterModeComponent = cc.instantiate(this.filterModePrefab), this.filterModeComponent.getComponent(n.ShaderFX.Prefab.FilterMode).init(l), this.uniformsPanel.addChild(this.filterModeComponent, 99), this.wrapModeComponent = cc.instantiate(this.wrapModePrefab), this.wrapModeComponent.getComponent(n.ShaderFX.Prefab.WrapMode).init(l), this.uniformsPanel.addChild(this.wrapModeComponent, 100), this.packModeComponent = cc.instantiate(this.packModePrefab), this.packModeComponent.getComponent(n.ShaderFX.Prefab.PackMode).init(l), this.uniformsPanel.addChild(this.packModeComponent, 101))
						} else if ("spineSkeleton" == t) {
							var u = cc.instantiate(this.uniformSpinePrefab);
							u.getComponent("ShaderFXPrefabUniformSpineSkeleton").config(e, e, h, {
								panel: this.node
							}), this.uniformsPanel.addChild(u, 9999)
						} else if ("cc.Color" == t) {
							var p = e,
								d = cc.instantiate(this.uniformColorExPrefab),
								f = this._uniforms[e].default;
							d.getComponent("ShaderFXPrefabUniformColorEx").config(e, p.substring(0, p.lastIndexOf("_")), cc.color(f), {
								panel: this.node
							}), this.uniformsPanel.addChild(d)
						} else if ("bool" == t) {
							var m = e,
								g = cc.instantiate(this.uniformTogglePrefab),
								C = this._uniforms[e].default;
							g.getComponent("ShaderFXPrefabUniformToggle").config(e, m.substring(0, m.lastIndexOf("_")), C, {
								panel: this.node
							}), this.uniformsPanel.addChild(g)
						}
					}
			},
			getMainPanel: function() {
				return this.mainPanel ? this.mainPanel : this.node
			},
			start: function() {
				this._super(), this.mainPanel ? this._isCustomNode || (this.mainPanel.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.mainPanel.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.mainPanel.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.mainPanel.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this)) : this._isCustomNode || (this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this))
			},
			getUniforms: function() {
				return this._uniforms
			},
			getPanelUniforms: function() {
				return this._panelUniforms
			},
			getPreviewUniforms: function() {
				return this._previewUniforms
			},
			getInputParams: function() {
				return this._inputParams
			},
			setInputParams: function(e) {
				this._inputParams = e
			},
			getOutputParams: function() {
				return this._outputParams
			},
			setOutputParams: function(e) {
				this._outputParams = e
			},
			getMainFunctoinName: function() {
				return "c_" + this._configuration.name + "_main_" + this.getPanelID()
			},
			getOutputName: function(e) {
				return "sampler2D" == e.type ? "Texture|texture" : "out_" + e.name.replace("/", "_").replace("*", "_") + "_" + this._configuration.name + "_" + this.getPanelID()
			},
			getCodes: function() {
				return "MainTexture" == this.getConfiguration().name ? "" : this._codes
			},
			_makeRenamedFragPrefix: function() {
				return "c_" + this._configuration.name + "_"
			},
			_makeRenamedFrag: function(e) {
				return 0 == this._instanceId ? this._makeRenamedFragPrefix() + e : this._makeRenamedFragPrefix() + e + "_" + this.getPanelID()
			},
			getCallCode2: function() {
				if ("MainTexture" == this.getConfiguration().name) return "";
				var e = "",
					t = this._configuration.output,
					n = (this._configuration.input, this.getInputParams());
				n || (n = []);
				var o = this.getOutputParams();
				o || (o = []);
				var i = t[0].type,
					a = this.getOutputName(t[0]);
				return "void" == i ? e = "gl_FragColor = vec4(1.0);" : "bool" == i ? e = "gl_FragColor = vec4(float(" + a + "));" : "int" == i ? e = "gl_FragColor = vec4(" + a + ");" : "float" == i ? e = "gl_FragColor = vec4(" + a + ");" : "vec2" == i || "uv" == i ? e = "uv" == t[0].ext ? "gl_FragColor = vec4(v_uv0.x, v_uv0.y, 0.0, 1.0);" : "gl_FragColor = vec4(" + a + ".x, " + a + ".y, 0.0, 1.0);" : "vec3" == i ? e = "gl_FragColor = vec4(" + a + ", 1.0);" : "vec4" == i ? e = "gl_FragColor = " + a + ";" : "mat2" == i ? e = "mat2 " + a + " = " + e : "mat3" == i ? e = "mat3 " + a + " = " + e : "mat4" == i ? e = "mat4 " + a + " = " + e : "frag" == i ? e = "gl_FragColor = " + e : "sampler2D" == i || "time" == i && (a = "CC_Time"), "    " + e + "\n"
			},
			getCallCode: function() {
				if ("MainTexture" == this.getConfiguration().name) return "";
				var e = "",
					t = this._configuration.output,
					n = this._configuration.input,
					o = this.getInputParams();
				o || (o = []);
				var i = this.getOutputParams();
				if (i || (i = []), e += cc.js.formatStr("%s(", this.getMainFunctoinName()), n.length > 0)
					for (var a = 0; a < n.length; a++) {
						var r = n[a];
						"void" == r.type || ("bool" == r.type ? o[a] ? e += "bool(" + o[a] + ")" : e += "true" : "float" == r.type ? o[a] ? e += o[a] : e += "0.0" : "int" == r.type ? o[a] ? e += o[a] : e += "0" : "vec2" == r.type ? o[a] ? "vec2" == o[a].substring(0, 4) ? e += o[a] : e += "vec2(" + o[a] + ")" : e += "v_uv0" : "uv" == r.type ? o[a] ? "vec2" == o[a].substring(0, 4) ? e += o[a] : e += "vec2(" + o[a] + ")" : e += "v_texCoord" : "vec3" == r.type ? o[a] ? "vec3" == o[a].substring(0, 4) ? e += o[a] : "vec2" == o[a].substring(0, 4) ? e += "vec3(" + o[a] + ", 1.0)" : e += "vec3(" + o[a] + ")" : e += "vec3(0.0)" : "vec4" == r.type ? o[a] ? "vec4" == o[a].substring(0, 4) ? e += o[a] : "vec3" == o[a].substring(0, 4) ? e += "vec4(" + o[a] + ", 1.0)" : "vec2" == o[a].substring(0, 4) ? e += "vec4(" + o[a] + ", 1.0, 1.0)" : "texture2D" == o[a].substring(0, 8) ? e += o[a] : o[a] && o[a].startsWith("Texture|") ? (o[a].substring(7), e += "texture2D(" + o[a].substring(8) + ", v_uv0)") : e += "vec4(" + o[a] + ")" : e += "vec4(1.0)" : "mat2" == r.type ? o[a] ? e += o[a] : e += "mat2(0.0)" : "mat3" == r.type ? o[a] ? e += o[a] : e += "mat3(0.0)" : "mat4" == r.type ? o[a] ? e += o[a] : e += "mat4(0.0)" : "sampler2D" == r.type && (o[a] && o[a].startsWith("Texture|") ? e += o[a].substring(8) : o[a] ? e += o[a] : e += "texture")), a != n.length - 1 ? e += ", " : e += ");"
					} else e += ");";
				var s = t[0].type,
					c = this.getOutputName(t[0]);
				"void" == s || ("bool" == s ? e = "bool " + c + " = " + e : "int" == s ? e = "int " + c + " = " + e : "float" == s ? e = "float " + c + " = " + e : "vec2" == s || "uv" == s ? e = "vec2 " + c + " = " + e : "vec3" == s ? e = "vec3 " + c + " = " + e : "vec4" == s ? e = "vec4 " + c + " = " + e : "mat2" == s ? e = "mat2 " + c + " = " + e : "mat3" == s ? e = "mat3 " + c + " = " + e : "mat4" == s ? e = "mat4 " + c + " = " + e : "frag" == s ? e = "gl_FragColor = " + e : "sampler2D" == s || "time" == s && (c = "CC_Time"));
				var l = "";
				for (a = 0; a < i.length; a++) {
					var h = i[a];
					if (h && h.type != s) {
						var u = this.getOutputName(h),
							p = h.property;
						if (u == l) continue;
						l = u, e += "\n    ", cc.js.isNumber(p) ? e += h.type + " " + u + " = " + c + "[" + p + "];" : e += h.type + " " + u + " = " + c + "." + p + ";"
					}
				}
				return "    " + e + "\n"
			},
			_makeFragUniformSegment: function(e) {
				var t = "";
				for (var n in e) {
					var o = e[n];
					if ("cc.Size" == o.type) t += cc.js.formatStr("uniform vec2 %s;\n", n);
					else if ("cc.Point" == o.type) t += cc.js.formatStr("uniform vec2 %s;\n", n);
					else if ("cc.Color" == o.type) t += cc.js.formatStr("uniform vec4 %s;\n", n);
					else if ("sampler2D" == o.type) "CC_Texture0" != n && (o.id, t += cc.js.formatStr("uniform sampler2D %s;\n", n));
					else if ("spineSkeleton" == o.type) t += cc.js.formatStr("uniform sampler2D texture;\n");
					else if ("float" == o.type) t += cc.js.formatStr("uniform float %s;\n", n);
					else if ("int" == o.type) t += cc.js.formatStr("uniform int %s;\n", n);
					else if ("bool" == o.type) t += cc.js.formatStr("uniform bool %s;\n", n);
					else if ("vec2" == o.type) t += cc.js.formatStr("uniform vec2 %s;\n", n);
					else if ("vec3" == o.type) t += cc.js.formatStr("uniform vec3 %s;\n", n);
					else if ("vec4" == o.type) t += cc.js.formatStr("uniform vec4 %s;\n", n);
					else if ("vec2[]" == o.type) {
						var i = o.value.length;
						cc.sys.isNative || (i /= 2), t += cc.js.formatStr("uniform vec2 %s[%d];\n", n, i)
					} else "vec3[]" == o.type ? (i = o.value.length, cc.sys.isNative || (i /= 3), t += cc.js.formatStr("uniform vec3 %s[%d];\n", n, i)) : "vec4[]" == o.type ? (i = o.value.length, cc.sys.isNative || (i /= 4), t += cc.js.formatStr("uniform vec4 %s[%d];\n", n, i)) : "float[]" == o.type ? (i = o.value.length, t += cc.js.formatStr("uniform float %s[%d];\n", n, i)) : "int[]" == o.type && (i = o.value.length, t += cc.js.formatStr("uniform int %s[%d];\n", n, i))
				}
				return t
			},
			updatePanelUniform: function(e, t, o) {
				e.getComponent(n.ShaderFX.Prefab.FXPanel);
				var i = !1;
				if (e === this.node)
					if (i = !0, this._panelUniforms && null != this._panelUniforms[t]) "cc.Color" == this._panelUniforms[t].type ? this._panelUniforms[t].value = cc.color(o) : this._panelUniforms[t].value = o;
					else {
						var a = t;
						t.split("_").length > 1 && (a = t.split("_")[0], t.split("_")[1]), "vec2" == this._panelUniforms[a].type ? "X" == sub ? this._panelUniforms[a].value = [o, this._panelUniforms[a].value[1]] : this._panelUniforms[a].value = [this._panelUniforms[a].value[0], o] : "vec3" == this._panelUniforms[a].type ? "X" == sub ? this._panelUniforms[a].value = [o, this._panelUniforms[a].value[1], this._panelUniforms[a].value[2]] : "Y" == sub ? this._panelUniforms[a].value = [this._panelUniforms[a].value[0], o, this._panelUniforms[a].value[2]] : this._panelUniforms[a].value = [this._panelUniforms[a].value[0], this._panelUniforms[a].value[1], o] : "vec4" == this._panelUniforms[a].type && ("X" == sub ? this._panelUniforms[a].value = [o, this._panelUniforms[a].value[1], this._panelUniforms[a].value[2], this._panelUniforms[a].value[3]] : "Y" == sub ? this._panelUniforms[a].value = [this._panelUniforms[a].value[0], o, this._panelUniforms[a].value[2], this._panelUniforms[a].value[3]] : "Z" == sub ? this._panelUniforms[a].value = [this._panelUniforms[a].value[0], this._panelUniforms[a].value[1], o, this._panelUniforms[a].value[3]] : this._panelUniforms[a].value = [this._panelUniforms[a].value[0], this._panelUniforms[a].value[1], this._panelUniforms[a].value[2], o])
					}
				else this.isPanelInPreviewDigraph(e) && (i = !0);
				if (!this._uniformOutput) return i;
				if ("Output" != this.getConfiguration().name && !this._uniformOutput.node.parent.active) return i;
				if (e.getComponent(n.ShaderFX.Prefab.ScalarTypeFloatPanel) || e.getComponent(n.ShaderFX.Prefab.ScalarTypeVec2Panel) || e.getComponent(n.ShaderFX.Prefab.ScalarTypeVec3Panel) || e.getComponent(n.ShaderFX.Prefab.ScalarTypeVec4Panel)) return i;
				if (i)
					if (null != this._previewUniforms[t]) "cc.Color" == this._previewUniforms[t].type && (o = cc.color(o)), this._previewUniforms[t].value = o, this._uniformOutput.updateUniform(t, o);
					else {
						var r = t,
							s = "";
						t.split("_").length > 1 && (r = t.split("_")[0], s = t.split("_")[1]), "vec2" == this._previewUniforms[r].type ? this._previewUniforms[r].value = "X" == s ? [o, this._previewUniforms[r].value[1]] : [this._previewUniforms[r].value[0], o] : "vec3" == this._previewUniforms[r].type ? this._previewUniforms[r].value = "X" == s ? [o, this._previewUniforms[r].value[1], this._previewUniforms[r].value[2]] : "Y" == s ? [this._previewUniforms[r].value[0], o, this._previewUniforms[r].value[2]] : [this._previewUniforms[r].value[0], this._previewUniforms[r].value[1], o] : "vec4" == this._previewUniforms[r].type && (this._previewUniforms[r].value = "X" == s ? [o, this._previewUniforms[r].value[1], this._previewUniforms[r].value[2], this._previewUniforms[r].value[3]] : "Y" == s ? [this._previewUniforms[r].value[0], o, this._previewUniforms[r].value[2], this._previewUniforms[r].value[3]] : "Z" == s ? [this._previewUniforms[r].value[0], this._previewUniforms[r].value[1], o, this._previewUniforms[r].value[3]] : [this._previewUniforms[r].value[0], this._previewUniforms[r].value[1], this._previewUniforms[r].value[2], o]), this._uniformOutput.updateUniform(r, this._previewUniforms[r].value)
					}
				return i
			},
			test: function(e) {
				var t = {
						techniques: [{
							passes: [{
								vert: "vs",
								frag: "fs",
								blendState: {
									targets: [{
										blend: !0
									}]
								},
								rasterizerState: {
									cullMode: "none"
								},
								properties: {
									texture: {
										value: "white"
									}
								}
							}]
						}]
					},
					n = "\n        CCEffect %{\n@@EFFECT_SEGMENT@@\n        }%\n        ",
					i = "\n            CCProgram fs %{\n                precision highp float;\n                #include <cc-global>\n                #if USE_TEXTURE\n                    in vec2 v_uv0;\n                    uniform sampler2D texture;\n                #endif\n                in vec4 v_color;\n                @@UNIFORM_CONSTANT_SEGMENT@@\n                @@CODE_SEGMENT@@\n            }%\n        ";
				for (var a in e) {
					var r = e[a];
					"cc.Color" == r.type ? (r.value = cc.color(r.value), t.techniques[0].passes[0].properties[a] = {
						value: [(r.value.r / 255).toFixed(3), (r.value.g / 255).toFixed(3), (r.value.b / 255).toFixed(3), (r.value.a / 255).toFixed(3)],
						inspector: {
							type: "color"
						}
					}) : "float" == r.type ? t.techniques[0].passes[0].properties[a] = {
						value: r.value
					} : "vec2" == r.type ? t.techniques[0].passes[0].properties[a] = {
						value: [r.value[0], r.value[1]]
					} : r.type
				}
				var s = "uniform Constant {\n";
				for (var c in e) {
					var l = e[c];
					"vec4" != l.type && "cc.Color" != l.type || (s += "\t\tvec4 " + c + ";\n")
				}
				for (var h in e) "vec2" == e[h].type && (s += "\t\tvec2 " + h + ";\n");
				for (var u in e) "float" == e[u].type && (s += "\t\tfloat " + u + ";\n");
				s += "};\n", i = (i = i.replace("@@UNIFORM_CONSTANT_SEGMENT@@", s)).replace("@@CODE_SEGMENT@@", this._fragCodes + this._fragCallCodes), cc.log(i), n = n.replace("@@EFFECT_SEGMENT@@", json2yaml(t).replace(/\"/g, "")), window.download(n + "\n            CCProgram vs %{\n                precision highp float;\n                #include <cc-global>\n                #include <cc-local>\n\n                in vec3 a_position;\n                #if USE_TEXTURE\n                    in vec2 a_uv0;\n                    out vec2 v_uv0;\n                #endif  \n                in vec4 a_color;\n                out vec4 v_color;\n\n                void main () {\n                    mat4 mvp;\n                    #if CC_USE_MODEL\n                        mvp = cc_matViewProj * cc_matWorld;\n                    #else\n                        mvp = cc_matViewProj;\n                    #endif\n\n                    #if USE_TEXTURE\n                        v_uv0 = a_uv0;\n                    #endif\n\n                    #if USE_TINT\n                        // clear warning for spine\n                    #endif\n\n                    v_color = a_color;\n                    gl_Position = mvp * vec4(a_position, 1);\n                }\n            }%\n        " + i, "name.effect", "application/json");
				var p = {
					__type__: "cc.Material",
					_name: "name",
					_objFlags: 0,
					_native: "",
					_effectAsset: {
						__uuid__: o.uuidv4()
					},
					_techniqueIndex: 0,
					_techniqueData: {
						0: {
							props: {},
							defines: {
								USE_TEXTURE: !0
							}
						}
					}
				};
				for (var d in e) {
					var f = e[d];
					"cc.Color" == f.type ? (f.value = cc.color(f.value), p._techniqueData[0].props[d] = {
						__type__: "cc.Color",
						r: f.value.r,
						g: f.value.g,
						b: f.value.b,
						a: f.value.a
					}) : "float" == f.type ? p._techniqueData[0].props[d] = f.value : "vec2" == f.type ? p._techniqueData[0].props[d] = {
						__type__: "cc.Vec2",
						x: f.value[0],
						y: f.value[1]
					} : "vec3" == f.type ? p._techniqueData[0].props[d] = {
						__type__: "cc.Vec3",
						x: f.value[0],
						y: f.value[1],
						z: f.value[2]
					} : "vec4" == f.type && (p._techniqueData[0].props[d] = {
						__type__: "cc.Vec4",
						x: f.value[0],
						y: f.value[1],
						z: f.value[2],
						w: f.value[3]
					})
				}
				window.download(JSON.stringify(p, null, 4), "name.mtl", "application/json")
			},
			updatePreviewUniforms: function(e, t) {
				null != this._previewUniforms[e] && (this._previewUniforms[e].value = t, this._uniformOutput.updateUniforms(this._previewUniforms))
			},
			updateConfiguration: function(e) {
				this._configuration = e
			},
			updatePreviewCustom: function(e) {
				var t = e;
				this._previewUniforms = {};
				var n = this;
				for (var i in n.getPanelUniforms()) {
					this._previewUniforms[i] = {};
					var a = n.getPanelUniforms()[i];
					for (var r in a) this._previewUniforms[i][r] = a[r];
					if ("sampler2D" == a.type) {
						var s = n.getUniformValue(i);
						this._previewUniforms[i].value = s || a.value
					} else "float" == a.type ? null != n.getUniformValue(i) && (this._previewUniforms[i].value = n.getUniformValue(i)) : "bool" == a.type ? null != n.getUniformValue(i) && (this._previewUniforms[i].value = n.getUniformValue(i)) : "vec2" == a.type ? null != n.getUniformValue(i) && (this._previewUniforms[i].value = n.getUniformValue(i)) : "vec3" == a.type ? null != n.getUniformValue(i) && (this._previewUniforms[i].value = n.getUniformValue(i)) : "vec4" == a.type ? null != n.getUniformValue(i) && (this._previewUniforms[i].value = n.getUniformValue(i)) : null != n.getUniformValue(i) && (this._previewUniforms[i].value = a.value)
				}
				this._uniformSegment = this._makeFragUniformSegment(this._previewUniforms), this._fragCodes = "", this._fragCodes += n.getCodes(), this._fragCallCodes = "void main()                                    \n{                                              \n", this._fragCallCodes += n.getCallCode(), this._fragCallCodes += n.getCallCode2(), this._fragCallCodes += "}                                              \n";
				var c = "creatorToy";
				this._glslFrag = this._uniformSegment + this._fragCodes + this._fragCallCodes, this._lastUUID = o.uuidv4();
				var l = o.generateShaderFrag3(this._glslFrag),
					h = o.registerShadeProgram3(o.generateShaderVert3(), l, o.generateShaderBlock3(this._previewUniforms), c + "_program_" + this._lastUUID),
					u = o.generatePass2(this.editorMaterial, c + "_program_" + this._lastUUID, this._previewUniforms);
				this.editorMaterial = o.generateMaterial(c + "_material", c + "_effect", c + "_technique", u);
				var p = cc.renderer._forward._programLib.getProgram(u, h).link();
				return p || (this._uniformOutput.updateMaterial(this.editorMaterial), this._uniformOutput.updateMainTexture(t, !0), this._uniformOutput.updateUniforms(this._previewUniforms)), {
					errors: p,
					frag: l,
					template: cc.renderer._forward._programLib.getTemplate(c + "_program_" + this._lastUUID)
				}
			},
			updatePreview: function(e) {
				if (this._uniformOutput && ("Output" == this.getConfiguration().name || this._uniformOutput.node.parent.active)) {
					var t = null;
					this._previewUniforms = {}, this._previewPanels = e;
					for (var i = 0; i < e.length; i++) {
						var a = e[i].getComponent(n.ShaderFX.Prefab.FXPanel);
						if (!(e[i].getComponent(n.ShaderFX.Prefab.ScalarTypeFloatPanel) || e[i].getComponent(n.ShaderFX.Prefab.ScalarTypeVec2Panel) || e[i].getComponent(n.ShaderFX.Prefab.ScalarTypeVec3Panel) || e[i].getComponent(n.ShaderFX.Prefab.ScalarTypeVec4Panel) || ("MainTexture" == a.getConfiguration().name && (t = a.getUniformValue("texture")), "SpineSkeleton" == a.getConfiguration().name && (t = a.getUniformValue()), this.isConstant())))
							for (var r in a.getPanelUniforms()) {
								this._previewUniforms[r] = {};
								var s = a.getPanelUniforms()[r];
								for (var c in s) this._previewUniforms[r][c] = s[c];
								"sampler2D" == s.type ? this._previewUniforms[r].value = a.getUniformValue(r) : "float" == s.type ? this._previewUniforms[r].value = a.getUniformValue(r) : "bool" == s.type ? this._previewUniforms[r].value = a.getUniformValue(r) : "vec2" == s.type ? this._previewUniforms[r].value = a.getUniformValue(r) : "vec3" == s.type ? this._previewUniforms[r].value = a.getUniformValue(r) : "vec4" == s.type ? this._previewUniforms[r].value = a.getUniformValue(r) : this._previewUniforms[r].value = s.value
							}
					}
					for (this._uniformSegment = this._makeFragUniformSegment(this._previewUniforms), this._fragCodes = "", i = 0; i < e.length; i++) this._fragCodes += e[i].getComponent(n.ShaderFX.Prefab.FXPanel).getCodes();
					for (this._fragCallCodes3D = "vec4 shaderfx()                                    \n{                                              \n", this._fragCallCodes = "void main()                                    \n{                                              \n", i = 0; i < e.length; i++) e[i].getComponent(n.ShaderFX.Prefab.ScalarTypePanel) || (this._fragCallCodes += e[i].getComponent(n.ShaderFX.Prefab.FXPanel).getCallCode(), this._fragCallCodes3D += e[i].getComponent(n.ShaderFX.Prefab.FXPanel).getCallCode());
					"Output" != this.getConfiguration().name && (this._fragCallCodes += e[e.length - 1].getComponent(n.ShaderFX.Prefab.FXPanel).getCallCode2(), this._fragCallCodes3D += e[e.length - 1].getComponent(n.ShaderFX.Prefab.FXPanel).getCallCode2()), this._fragCallCodes += "}                                              \n", this._fragCallCodes3D += "}                                              \n", this._fragCallCodes3D = this._fragCallCodes3D.replace(/gl_FragColor =/g, "return"), this._fragCallCodes3D = this._fragCallCodes3D.replace(/\btexture\b/g, "mainTexture"), this._fragCallCodes3D = this._fragCallCodes3D.replace(/\btexture2D\b/g, "texture"), this._fragCallCodes3D = this._fragCallCodes3D.replace(/\bv_uv0\b/g, "v_uv"), this._fragCallCodes3D = this._fragCallCodes3D.replace(/gl_FragColor =/g, "return");
					var l = "creatorToy";
					this._glslFrag = this._uniformSegment + this._fragCodes + this._fragCallCodes, this._lastUUID = o.uuidv4(), o.registerShadeProgram(o.generateShaderVert(), o.generateShaderFrag2(this._glslFrag), o.generateShaderBlock2(this._previewUniforms), l + "_program_" + this._lastUUID), this.editorMaterial = o.generateMaterial(l + "_material", l + "_effect", l + "_technique", o.generatePass2(this.editorMaterial, l + "_program_" + this._lastUUID, this._previewUniforms)), this._uniformOutput.updateMainTexture(t), this._uniformOutput.updateMaterial(this.editorMaterial), this._uniformOutput.updateUniforms(this._previewUniforms)
				}
			},
			onDisable: function() {
				cc.systemEvent.off("ssr.ShaderFX.Prefab.Uniform.onValueChanged", this.uniformUpdated, this), cc.systemEvent.off("ssr.ShaderFX.Prefab.UniformPanel.renameUniformKey", this.updateUniformKeyValue, this), cc.systemEvent.off("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", this.updateUniformKeyValue, this)
			}
		}), cc._RF.pop()
	}, {
		"../../../digraph-editor/prefab/DigraphEditorPrefabPanel": "DigraphEditorPrefabPanel",
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabProjectInfo: [function(e, t) {
		"use strict";
		cc._RF.push(t, "46155cPJBpPVYKYAjyM6ObS", "ShaderFXPrefabProjectInfo");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.ProjectInfo = cc.Class({
			extends: cc.Component,
			properties: {
				projectName: cc.Label,
				createDate: cc.Label,
				modifyDate: cc.Label,
				capture: cc.Sprite
			},
			onLoad: function() {},
			start: function() {},
			utc2beijing: function(e) {
				var t = e.indexOf("T"),
					n = e.indexOf("Z"),
					o = e.substr(0, t) + " " + e.substr(t + 1, n - t - 1);
				i = (i = new Date(Date.parse(o))).getTime();
				var i = 28800 + (i /= 1e3);
				return new Date(1e3 * parseInt(i)).toLocaleString().replace(/\//g, ".").replace(/[\u4e00-\u9fa5]/g, " ")
			},
			init: function(e) {
				this.info = e, this.projectName.string = e.name, this.createDate.string = this.utc2beijing(e.createdAt), this.modifyDate.string = this.utc2beijing(e.updatedAt);
				var t = this;
				n.ShaderFX.DnDUtil.generateTexture2D(e.capture, function(e) {
					t.capture.spriteFrame = new cc.SpriteFrame(e)
				})
			},
			onDownload: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectInfo.Download", !0);
				e.setUserData(this.info.scene), cc.systemEvent.dispatchEvent(e)
			},
			onRemove: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectInfo.Remove", !0);
				e.setUserData(this.info.objectId), cc.systemEvent.dispatchEvent(e)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabProjectPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "a3a4ce2FAVFK6+e6fbZBsHW", "ShaderFXPrefabProjectPanel");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.ProjectPanel = cc.Class({
			extends: cc.Component,
			properties: {
				projectTitle: cc.Label,
				uniformsPanel: cc.Node,
				uniformsScrollView: cc.ScrollView,
				uniformsContent: cc.Node,
				projectUniformFloatPrefab: cc.Prefab,
				projectUniformVec2Prefab: cc.Prefab,
				projectUniformVec3Prefab: cc.Prefab,
				projectUniformVec4Prefab: cc.Prefab,
				projectUniformColorPrefab: cc.Prefab,
				projectUniformTexturePrefab: cc.Prefab
			},
			onLoad: function() {},
			start: function() {
				this._isShowing = !0, this._height = 0, cc.sys.localStorage.getItem("SSR_SHADERFX_PROJECT_UNGOING") && (this.projectTitle.string = cc.sys.localStorage.getItem("SSR_SHADERFX_PROJECT_UNGOING")), cc.systemEvent.on("ssr.DigraphEditor.Manager.Project.UpdateName", this._onProjectUpdateName, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.UniformSliderEx.TouchStart", this.uniformSliderExTouchStart, this), cc.systemEvent.on("ssr.ShaderFX.Prefab.UniformSliderEx.TouchEnd", this.uniformSliderExTouchEnd, this)
			},
			uniformSliderExTouchStart: function() {
				this.uniformsScrollView.vertical = !1
			},
			uniformSliderExTouchEnd: function() {
				this.uniformsScrollView.vertical = !0
			},
			reset: function() {
				for (var e = this.uniformsContent.getChildren().length - 1; e >= 0; e--) {
					var t = this.uniformsContent.getChildren()[e].getComponent(n.ShaderFX.Prefab.ProjectUniform);
					t.destroy(), t.node.removeFromParent(!0), this._height -= t.node.height, this._height < 300 && (this.uniformsScrollView.node.height = this._height)
				}
			},
			uniformUpdated: function(e) {
				cc.log("uniformUpdated");
				var t = e.getUserData();
				cc.log(t), cc.log(e.target)
			},
			onCreateUniform: function() {},
			addGlobalUniform: function(e, t, o, i) {
				var a = null;
				"float" == o ? a = cc.instantiate(this.projectUniformFloatPrefab) : "vec2" == o ? a = cc.instantiate(this.projectUniformVec2Prefab) : "vec3" == o ? a = cc.instantiate(this.projectUniformVec3Prefab) : "vec4" == o ? a = cc.instantiate(this.projectUniformVec4Prefab) : "color" == o ? a = cc.instantiate(this.projectUniformColorPrefab) : "texture" == o && (a = cc.instantiate(this.projectUniformTexturePrefab)), this.uniformsContent.addChild(a), a.getComponent(n.ShaderFX.Prefab.ProjectUniform).init(e, t, o, i, this), this._height += a.height, this._height < 300 && (this.uniformsScrollView.node.height = this._height)
			},
			updateGlobalUniformKey: function(e, t) {
				for (var o = 0; o < this.uniformsContent.getChildren().length; o++) {
					var i = this.uniformsContent.getChildren()[o].getComponent(n.ShaderFX.Prefab.ProjectUniform);
					i.getKey() == e && i.updateKey(t)
				}
			},
			removeGlobalUniformKey: function(e) {
				for (var t = 0; t < this.uniformsContent.getChildren().length; t++) {
					var o = this.uniformsContent.getChildren()[t].getComponent(n.ShaderFX.Prefab.ProjectUniform);
					if (o.getKey() == e) {
						o.destroy(), o.node.removeFromParent(!0), this._height -= o.node.height, this._height < 300 && (this.uniformsScrollView.node.height = this._height);
						break
					}
				}
			},
			onProjectRename: function() {
				var e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Footer.ProjectRename", !0);
				cc.systemEvent.dispatchEvent(e)
			},
			resize: function(e) {
				cc.log("delta: " + e), this._height += e, this._height < 300 && (this.uniformsScrollView.node.height = this._height)
			},
			updateGlobalUniformValue: function(e, t) {
				for (var o = e.split("_").length > 1, i = 0; i < this.uniformsContent.getChildren().length; i++) {
					var a = this.uniformsContent.getChildren()[i].getComponent(n.ShaderFX.Prefab.ProjectUniform);
					if (a.getKey() == (o ? e.split("_")[0] : e)) {
						a.updateValue(e, t);
						break
					}
				}
			},
			addPanel: function(e, t) {
				for (var o = 0; o < this.uniformsContent.getChildren().length; o++) {
					var i = this.uniformsContent.getChildren()[o].getComponent(n.ShaderFX.Prefab.ProjectUniform);
					if (i.getKey() == e) {
						i.addPanel(t);
						break
					}
				}
			},
			removePanel: function(e, t) {
				for (var o = 0; o < this.uniformsContent.getChildren().length; o++) {
					var i = this.uniformsContent.getChildren()[o].getComponent(n.ShaderFX.Prefab.ProjectUniform);
					if (i.getKey() == e) {
						i.removePanel(t);
						break
					}
				}
			},
			_onProjectUpdateName: function() {
				this.projectTitle.string = cc.sys.localStorage.getItem("SSR_SHADERFX_PROJECT_UNGOING")
			},
			onResize: function() {
				this._isShowing ? this._isShowing = !1 : this._isShowing = !0, this.uniformsPanel.active = this._isShowing
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabProjectUniformColor: [function(e, t) {
		"use strict";
		cc._RF.push(t, "08f2bC9AuNPaqNmvK8nIzv3", "ShaderFXPrefabProjectUniformColor"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.ProjectUniformColor = cc.Class({
			extends: e("./ShaderFXPrefabProjectUniform"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformZSliderEx: cc.Node,
				uniformWSliderEx: cc.Node,
				propertyValue: cc.Label,
				preview: cc.Node
			},
			uniformUpdated: function(e) {
				var t = e.getUserData();
				if (this.node == e.target) {
					for (var n = 0; n < this._panels.length; n++) this._panels[n].getComponent("ShaderFXPrefabPanel").updateUniformValue(t.getKey(), t.getValue());
					var o = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniform.onUpdateUniform", !0);
					o.setUserData({
						key: t.getKey(),
						value: t.getValue()
					}), cc.systemEvent.dispatchEvent(o)
				}
			},
			init: function(e, t, n, o, i) {
				this._super(e, t, n, o, i), this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_X", "R", t.r, {
					panel: this.node,
					isInteger: !0
				}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_Y", "G", t.g, {
					panel: this.node,
					isInteger: !0
				}), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_Z", "B", t.b, {
					panel: this.node,
					isInteger: !0
				}), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_W", "A", t.r, {
					panel: this.node,
					isInteger: !0
				})
			},
			updateValue: function(e, t) {
				this._super(t), this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t.r), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t.g), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t.b), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t.a), this.propertyValue.string = "#" + t.toHEX("#rrggbbaa"), this.preview.color = t
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabProjectUniform": "ShaderFXPrefabProjectUniform"
	}],
	ShaderFXPrefabProjectUniformFloat: [function(e, t) {
		"use strict";
		cc._RF.push(t, "bdbdbr9yypMwLb/EBl78M/I", "ShaderFXPrefabProjectUniformFloat"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.ProjectUniformFloat = cc.Class({
			extends: e("./ShaderFXPrefabProjectUniform"),
			editor: !1,
			properties: {
				uniformSliderEx: cc.Node
			},
			uniformUpdated: function(e) {
				var t = e.getUserData();
				if (this.node == e.target) {
					for (var n = 0; n < this._panels.length; n++) this._panels[n].getComponent("ShaderFXPrefabPanel").updateUniformValue(t.getKey(), t.getValue());
					var o = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniform.onUpdateUniform", !0);
					o.setUserData({
						key: t.getKey(),
						value: t.getValue()
					}), cc.systemEvent.dispatchEvent(o)
				}
			},
			init: function(e, t, n, o, i) {
				this._super(e, t, n, o, i), this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "N", t, {
					panel: this.node
				})
			},
			updateValue: function(e, t) {
				this._super(t), this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabProjectUniform": "ShaderFXPrefabProjectUniform"
	}],
	ShaderFXPrefabProjectUniformTexture: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7ea5f5xmflM3oC1LguZPyRY", "ShaderFXPrefabProjectUniformTexture");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.ProjectUniformTexture = cc.Class({
			extends: e("./ShaderFXPrefabProjectUniform"),
			editor: !1,
			properties: {
				uniformTexturePreviewPrefab: cc.Prefab,
				wrapModePrefab: cc.Node,
				filterModePrefab: cc.Node,
				packModePrefab: cc.Node,
				fileName: cc.Label,
				_propertyValue: null,
				propertyValue: {
					get: function() {
						return this._propertyValue
					},
					set: function(e) {
						this._propertyValue !== e && (this._propertyValue = e)
					},
					type: cc.Sprite
				}
			},
			onPreview: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniformTexture.onPreview", !0);
				e.setUserData(this.propertyValue.spriteFrame), cc.systemEvent.dispatchEvent(e)
			},
			uniformUpdated: function() {},
			init: function(e, t, o, i, a) {
				this._super(e, t, o, i, a);
				var r = i.getComponent(n.ShaderFX.Prefab.FXPanel).getComponent(n.ShaderFX.Prefab.UniformTexturePanel).uniformTexture.getComponent("ShaderFXPrefabUniformTexture");
				this.wrapModePrefab.getComponent(n.ShaderFX.Prefab.WrapMode).init(r), this.filterModePrefab.getComponent(n.ShaderFX.Prefab.FilterMode).init(r), this.packModePrefab.getComponent(n.ShaderFX.Prefab.PackMode).init(r), cc.log(t)
			},
			updateValue: function(e, t) {
				this._super(t), this.fileName.string = t.name, this.propertyValue.spriteFrame = new cc.SpriteFrame(t.texture), this.wrapModePrefab.getComponent(n.ShaderFX.Prefab.WrapMode).mode.string = t.wrapMode, this.filterModePrefab.getComponent(n.ShaderFX.Prefab.FilterMode).mode.string = t.filterMode, this.packModePrefab.getComponent(n.ShaderFX.Prefab.PackMode).mode.string = t.packMode
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabProjectUniform": "ShaderFXPrefabProjectUniform"
	}],
	ShaderFXPrefabProjectUniformVec2: [function(e, t) {
		"use strict";
		cc._RF.push(t, "2edcdUfH9RLXrC32BvcnThy", "ShaderFXPrefabProjectUniformVec2"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.ProjectUniformVec2 = cc.Class({
			extends: e("./ShaderFXPrefabProjectUniform"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node
			},
			uniformUpdated: function(e) {
				var t = e.getUserData();
				if (this.node == e.target) {
					for (var n = 0; n < this._panels.length; n++) this._panels[n].getComponent("ShaderFXPrefabPanel").updateUniformValue(t.getKey(), t.getValue());
					var o = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniform.onUpdateUniform", !0);
					o.setUserData({
						key: t.getKey(),
						value: t.getValue()
					}), cc.systemEvent.dispatchEvent(o)
				}
			},
			init: function(e, t, n, o, i) {
				this._super(e, t, n, o, i), this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_X", "X", t[0], {
					panel: this.node
				}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_Y", "Y", t[1], {
					panel: this.node
				})
			},
			updateValue: function(e, t) {
				this._super(t), e.split("_")[0];
				var n = e.split("_")[1];
				"X" == n ? this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : "Y" == n ? this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[0]), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[1]))
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabProjectUniform": "ShaderFXPrefabProjectUniform"
	}],
	ShaderFXPrefabProjectUniformVec3: [function(e, t) {
		"use strict";
		cc._RF.push(t, "38a44k7FcFKsKqsKsdVPZGD", "ShaderFXPrefabProjectUniformVec3"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.ProjectUniformVec3 = cc.Class({
			extends: e("./ShaderFXPrefabProjectUniform"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformZSliderEx: cc.Node
			},
			uniformUpdated: function(e) {
				var t = e.getUserData();
				if (this.node == e.target) {
					for (var n = 0; n < this._panels.length; n++) this._panels[n].getComponent("ShaderFXPrefabPanel").updateUniformValue(t.getKey(), t.getValue());
					var o = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniform.onUpdateUniform", !0);
					o.setUserData({
						key: t.getKey(),
						value: t.getValue()
					}), cc.systemEvent.dispatchEvent(o)
				}
			},
			init: function(e, t, n, o, i) {
				this._super(e, t, n, o, i), this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_X", "X", t[0], {
					panel: this.node
				}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_Y", "Y", t[1], {
					panel: this.node
				}), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_Z", "Z", t[1], {
					panel: this.node
				})
			},
			updateValue: function(e, t) {
				this._super(t), e.split("_")[0];
				var n = e.split("_")[1];
				"X" == n ? this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : "Y" == n ? this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : "Z" == n ? this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[0]), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[1]), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[2]))
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabProjectUniform": "ShaderFXPrefabProjectUniform"
	}],
	ShaderFXPrefabProjectUniformVec4: [function(e, t) {
		"use strict";
		cc._RF.push(t, "364663sG6BETY1ee5zOE4Rc", "ShaderFXPrefabProjectUniformVec4"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.ProjectUniformVec4 = cc.Class({
			extends: e("./ShaderFXPrefabProjectUniform"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformZSliderEx: cc.Node,
				uniformWSliderEx: cc.Node
			},
			uniformUpdated: function(e) {
				var t = e.getUserData();
				if (this.node == e.target) {
					for (var n = 0; n < this._panels.length; n++) this._panels[n].getComponent("ShaderFXPrefabPanel").updateUniformValue(t.getKey(), t.getValue());
					var o = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniform.onUpdateUniform", !0);
					o.setUserData({
						key: t.getKey(),
						value: t.getValue()
					}), cc.systemEvent.dispatchEvent(o)
				}
			},
			init: function(e, t, n, o, i) {
				this._super(e, t, n, o, i), this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_X", "X", t[0], {
					panel: this.node
				}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_Y", "Y", t[1], {
					panel: this.node
				}), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_Z", "Z", t[1], {
					panel: this.node
				}), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e + "_W", "W", t[1], {
					panel: this.node
				})
			},
			updateValue: function(e, t) {
				this._super(t), e.split("_")[0];
				var n = e.split("_")[1];
				"X" == n ? this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : "Y" == n ? this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : "Z" == n ? this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : "W" == n ? this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[0]), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[1]), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[2]), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[3]))
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabProjectUniform": "ShaderFXPrefabProjectUniform"
	}],
	ShaderFXPrefabProjectUniform: [function(e, t) {
		"use strict";
		cc._RF.push(t, "230cdKkfDlNgZJaTOGMUvHN", "ShaderFXPrefabProjectUniform");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.ProjectUniform = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				uniformName: cc.Label,
				uniformType: cc.Label,
				uniformRef: cc.Label,
				uniformRefContent: cc.Node,
				content: cc.Node,
				refPanelPrefab: cc.Prefab
			},
			onLoad: function() {},
			start: function() {
				cc.systemEvent.on("ssr.ShaderFX.Prefab.Uniform.onValueChanged", this.uniformUpdated, this), this._isShowing = !0
			},
			onDestroy: function() {
				cc.systemEvent.off("ssr.ShaderFX.Prefab.Uniform.onValueChanged", this.uniformUpdated, this)
			},
			uniformUpdated: function() {},
			getKey: function() {
				return this._key
			},
			updateKey: function(e) {
				this._key = e, this.uniformName.string = e
			},
			addPanel: function(e) {
				this._panels.push(e), this.uniformRef.string = "(" + this._panels.length + ")";
				var t = cc.instantiate(this.refPanelPrefab);
				t.getComponent(n.ShaderFX.Prefab.RefPanel).init(e), this.uniformRefContent.addChild(t)
			},
			removePanel: function(e) {
				for (var t = 0; t < this._panels.length; t++)
					if (this._panels[t] == e) {
						this._panels.splice(t, 1), this.uniformRefContent.removeChild(this.uniformRefContent.getChildren()[t], !0);
						break
					}
				this.uniformRef.string = "(" + this._panels.length + ")"
			},
			updateValue: function(e) {
				this._value = e
			},
			init: function(e, t, n, o, i) {
				this._key = e, this._value = t, this._type = n, this.root = i, this._panels = [], this.uniformName.string = e, this.uniformType.string = n, this.addPanel(o)
			},
			onCreateUniform: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniform.onCreateUniform", !0);
				e.setUserData(this._key), cc.systemEvent.dispatchEvent(e)
			},
			onResize: function() {
				this._isShowing ? this._isShowing = !1 : this._isShowing = !0;
				var e = this.content.height;
				this.content.active = this._isShowing, this.root.resize(this._isShowing ? e : -e)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabRefPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "92e50PriyhPRZavWOYifZ8L", "ShaderFXPrefabRefPanel");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.RefPanel = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				title: cc.Label
			},
			onLoad: function() {},
			start: function() {},
			init: function(e) {
				this._panel = e, this.title.string = "Ref_" + e.getComponent(n.ShaderFX.Prefab.FXPanel).getPanelID()
			},
			onFocus: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.RefPanel.onFocus", !0);
				e.setUserData(this._panel), cc.systemEvent.dispatchEvent(e)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabSampleInputContent: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e8104JxAVZMTZUSAHXWYDIz", "ShaderFXPrefabSampleInputContent");
		var n = e("../../namespace/ShaderFXNamespace"),
			o = e("../../../digraph-editor/util/DigraphEditorUtil");
		n.ShaderFX.Prefab.SampleInputContent = cc.Class({
			extends: cc.Component,
			properties: {
				nameLabel: cc.Label,
				typeLabel: cc.Label,
				infoButton: cc.Button,
				infoButton2: cc.Button,
				detailNode: cc.Node,
				detailLabel: cc.Label,
				moreButton: cc.Node
			},
			onLoad: function() {},
			init: function(e, t, n, i, a) {
				this._isShow = !1, this.nameLabel.string = e, this.typeLabel.string = t, this.detailLabel.string = n, this.typeLabel.node.color = o.getDataTypeColor(t), "output" == i && (this.infoButton.node.active = !1, this.infoButton2.node.active = !1), a && (this.moreButton.active = !1)
			},
			onShow: function() {
				this.detailNode.active = !0, this._isShow = !0, this.infoButton.node.active = !1, this.infoButton2.node.active = !0
			},
			onHide: function() {
				this.detailNode.active = !1, this._isShow = !1, this.infoButton.node.active = !0, this.infoButton2.node.active = !1
			},
			onMouseEnter: function() {
				this.detailNode.active = !0
			},
			onMouseLeave: function() {
				this.detailNode.active = !1
			}
		}), cc._RF.pop()
	}, {
		"../../../digraph-editor/util/DigraphEditorUtil": "DigraphEditorUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabSample: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d883cWyvetE+KqVSqlltUTc", "ShaderFXPrefabSample");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.Sample = cc.Class({
			extends: cc.Component,
			properties: {
				titleLabel: cc.Label,
				desLabel: cc.Label,
				inputLabel: cc.Label,
				outputLabel: cc.Label,
				uniformLabel: cc.Label,
				sampleLabel: cc.Label,
				sampleNode: cc.Sprite,
				sampleNotFoundNode: cc.Sprite,
				infoButton: cc.Node,
				videoButton: cc.Node,
				editButton: cc.Node,
				importButton: cc.Node,
				tags: cc.Node,
				tagPrefab: cc.Prefab,
				infoButtonLabel: cc.Label,
				videoButtonLabel: cc.Label,
				projectButtonLabel: cc.Label,
				inputContentPrefab: cc.Prefab,
				inputContentScrollView: cc.Node,
				uniformContentScrollView: cc.Node,
				outputContentScrollView: cc.Node
			},
			onLoad: function() {},
			start: function() {
				this.infoButtonLabel.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u5728\u7ebf\u6587\u6863" : "Online Document", this.videoButtonLabel.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u793a\u4f8b\u89c6\u9891" : "Sample Video", this.projectButtonLabel.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u793a\u4f8b\u9879\u76ee" : "Sample Project"
			},
			config: function() {},
			onImportSample: function() {
				var e = this;
				cc.loader.loadRes("ssr/shaderfx-editor/configuration/sample/" + this.configuration.folder + "/" + this.configurationName + "Sample", cc.JsonAsset, function(t, n) {
					if (t) cc.warn(t);
					else {
						e.node.parent.active = !1;
						var o = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Import", !0);
						o.target = e.node, o.setUserData(n.json), cc.systemEvent.dispatchEvent(o)
					}
				})
			},
			onEdit: function() {
				(e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.CustomComponentInfo.Clone", !0)).target = this.node;
				var e, t = Object.assign({}, this.info);
				t.uuid = n.ShaderFX.Util.uuidv4(), t.author = n.ShaderFX.LeanCloudUtil.getCurrentUsername(), t.overload && (t.name = t.name.substring(0, t.name.length - 1)), t.folder = {
					en: "user",
					zh: "\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6"
				}, delete t.overload, delete t.fx, t.category = {}, t.category.en = "user", t.category.zh = "\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6", e.setUserData({
					component: JSON.stringify(t),
					custom: !0,
					folder: JSON.stringify({
						en: "user",
						zh: "\u7528\u6237\u81ea\u5b9a\u4e49\u7ec4\u4ef6"
					}),
					official: !1,
					uuid: t.uuid
				}), cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.DigraphEditor.Layer.Toast.show", !0)).target = this.node, e.setUserData("\u514b\u9686\u6210\u529f\uff0c\u4f60\u53ef\u4ee5\u5728[\u6211\u7684\u7ec4\u4ef6]\u4e2d\u627e\u5230\u8be5\u7ec4\u4ef6\u5e76\u8fdb\u884c\u8fdb\u4e00\u6b65\u7f16\u8f91\u4f7f\u7528"), cc.systemEvent.dispatchEvent(e)
			},
			onOpenURL: function() {
				"undefined" != typeof Editor ? "logic" == this.configuration.folder ? window.__electron.shell.openExternal("http://supersuraccoon.gitee.io/ssrshaderfxeditorweb/doc/#/zh/FXEditor/Components/" + this.configuration.folder + "/" + this.configurationName) : window.__electron.shell.openExternal("http://supersuraccoon.gitee.io/ssrshaderfxeditor/doc/#/zh/FXEditor/Components/" + this.configuration.folder + "/" + this.configurationName) : "logic" == this.configuration.folder ? cc.sys.openURL("http://supersuraccoon.gitee.io/ssrshaderfxeditorweb/doc/#/zh/FXEditor/Components/" + this.configuration.folder + "/" + this.configurationName) : cc.sys.openURL("http://supersuraccoon.gitee.io/ssrshaderfxeditor/doc/#/zh/FXEditor/Components/" + this.configuration.folder + "/" + this.configurationName)
			},
			onVideo: function() {
				var e, t = "http://supersuraccoon.gitee.io/ssrshaderfxeditor/doc/res/FXEditor/sample/" + this.configuration.folder + "/" + this.configurationName + "Sample.mov";
				console.log("this.configuration.folderthis.configuration.folderthis.configuration.folder"), console.log(this.configuration.folder), "logic" == this.configuration.folder && (t = "http://supersuraccoon.gitee.io/ssrshaderfxeditorweb/doc/res/FXEditor/sample/" + this.configuration.folder + "/" + this.configurationName + "Sample.mkv"), configuration.custom ? ((e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Video", !0)).target = this.node, e.setUserData("https://supersuraccoon.gitee.io/ssrshaderfxeditorweb/doc/res/FXEditor/sample/premade/" + this.configuration.name + "Sample.mkv"), cc.systemEvent.dispatchEvent(e)) : ((e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Sample.Video", !0)).target = this.node, e.setUserData(t), cc.systemEvent.dispatchEvent(e))
			},
			updateSample: function(e, t, o) {
				if (this.configurationName = o || e.name, this.configuration = e, this.info = t, "" != t.name_zh ? this.titleLabel.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? this.configurationName + "/" + t.name_zh : this.configurationName : this.titleLabel.string = this.configurationName, this.desLabel.string = t.description[window.EDITOR_LANGUAGE], this.sampleLabel.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u793a\u4f8b >" : "Sample >", this.inputLabel.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "#\u8f93\u5165" : "#Input", this.inputContentScrollView.removeAllChildren(!0), 0 === t.input.length) this.inputLabel.node.active = !1, this.inputContentScrollView.active = !1;
				else {
					this.inputLabel.node.active = !0, this.inputContentScrollView.active = !0;
					for (var i = 0; i < t.input.length; i++) {
						var a = cc.instantiate(this.inputContentPrefab);
						a.getComponent(n.ShaderFX.Prefab.SampleInputContent).init(t.input[i].name, t.input[i].type, t.input[i].info ? t.input[i].info[window.EDITOR_LANGUAGE] : "???", "input", e.custom), this.inputContentScrollView.addChild(a)
					}
				}
				if (this.outputLabel.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "#\u8f93\u51fa" : "#Output", this.outputContentScrollView.removeAllChildren(!0), 0 === t.output.length) this.outputLabel.node.active = !1, this.outputContentScrollView.active = !1;
				else
					for (this.outputLabel.node.active = !0, this.outputContentScrollView.active = !0, i = 0; i < t.output.length; i++)
						if (null == t.output[i].property) {
							var r = cc.instantiate(this.inputContentPrefab);
							r.getComponent(n.ShaderFX.Prefab.SampleInputContent).init(t.output[i].name, t.output[i].type, "", "output", e.custom), this.outputContentScrollView.addChild(r)
						} if (this.uniformContentScrollView.removeAllChildren(!0), 0 === Object.keys(t.uniforms).length) this.uniformLabel.node.active = !1, this.uniformContentScrollView.active = !1;
				else
					for (var s in this.uniformLabel.node.active = !0, this.uniformContentScrollView.active = !0, this.uniformLabel.string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "#\u53d8\u91cf" : "#Uniforms", t.uniforms) {
						var c = cc.instantiate(this.inputContentPrefab);
						c.getComponent(n.ShaderFX.Prefab.SampleInputContent).init(s, "cc.Color" == t.uniforms[s].type ? "vec4" : t.uniforms[s].type, t.uniforms[s].info ? t.uniforms[s].info[window.EDITOR_LANGUAGE] : "???", "uniform", e.custom), this.uniformContentScrollView.addChild(c)
					}
				for (this.tags.removeAllChildren(!0), i = 0; i < t.tags.length && !(i > 6); i++) {
					var l = cc.instantiate(this.tagPrefab);
					this.tags.addChild(l, -999), l.getComponent("ShaderFXSampleTagPrefab").init(i, t.tags[i])
				}
				if ("uniforms" == e.folder || "constants" == e.folder ? this.videoButton.active = !1 : this.videoButton.active = !0, e.custom)
					if (this.infoButton.active = !1, this.importButton.active = !1, e.fx) {
						var h = this;
						e.capture ? n.ShaderFX.DnDUtil.generateTexture2D(e.capture, function(e) {
							h.sampleNode.node.active = !0, h.sampleNotFoundNode.node.active = !1, h.sampleNode.spriteFrame = new cc.SpriteFrame(e)
						}) : (h.sampleNode.node.active = !1, h.sampleNotFoundNode.node.active = !0)
					} else this.videoButton.active = !1, h = this, cc.loader.loadRes("ssr/shaderfx-editor/configuration/sample/UserComponent", cc.SpriteFrame, function(e, t) {
						e ? (h.sampleNode.node.active = !1, h.sampleNotFoundNode.node.active = !0) : (h.sampleNode.node.active = !0, h.sampleNotFoundNode.node.active = !1, h.sampleNode.spriteFrame = t.clone())
					});
				else h = this, cc.loader.loadRes("ssr/shaderfx-editor/configuration/sample/" + e.folder + "/" + this.configurationName + "Sample", cc.SpriteFrame, function(e, t) {
					e ? (h.sampleNode.node.active = !1, h.sampleNotFoundNode.node.active = !0) : (h.sampleNode.node.active = !0, h.sampleNotFoundNode.node.active = !1, h.sampleNode.spriteFrame = t.clone())
				})
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabScalarTypeColor3Panel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "bf32aYMBONCCLJ1oQL8wj9L", "ShaderFXPrefabScalarTypeColor3Panel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.ScalarTypeColor4Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformColorEx: cc.Node
			},
			onLoad: function() {
				this._super()
			},
			initUniforms: function() {
				for (var e in this._uniforms) {
					var t = this._uniforms[e].default;
					this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").config(e, "color", cc.color(t), {
						panel: this.node,
						hideA: !0
					})
				}
			},
			getOutputName: function() {
				var e = this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").getValue();
				return "vec3(" + (e.r / 255).toFixed(3) + ", " + (e.g / 255).toFixed(3) + ", " + (e.b / 255).toFixed(3) + ")"
			},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabScalarTypeColor4Panel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "3e51dNULfpKl4+53c1PTC9Z", "ShaderFXPrefabScalarTypeColor4Panel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.ScalarTypeColor4Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformColorEx: cc.Node
			},
			onLoad: function() {
				this._super()
			},
			initUniforms: function() {
				for (var e in this._uniforms) {
					var t = this._uniforms[e].default;
					this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").config(e, "color", cc.color(t), {
						panel: this.node
					})
				}
			},
			getOutputName: function() {
				var e = this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").getValue();
				return "vec4(" + (e.r / 255).toFixed(3) + ", " + (e.g / 255).toFixed(3) + ", " + (e.b / 255).toFixed(3) + ", " + (e.a / 255).toFixed(3) + ")"
			},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabScalarTypeFloatPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "1a014M2SbVLJo41gpuiIxL2", "ShaderFXPrefabScalarTypeFloatPanel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.ScalarTypeFloatPanel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformSliderEx: cc.Node
			},
			onLoad: function() {
				this._super()
			},
			getOutputName: function() {
				return this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()
			},
			clone: function(e) {
				var t = e.getComponent(n.ShaderFX.Prefab.FXPanel).getPanelUniforms();
				for (var o in t) {
					var i = parseFloat(t[o].value);
					this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(i)
				}
			},
			initUniforms: function() {
				for (var e in this._uniforms) {
					var t = parseFloat(this._uniforms[e].default);
					this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "N", t, {
						panel: this.node
					})
				}
			},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabScalarTypePanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "815d44wyYpKwplbTtqx2TBF", "ShaderFXPrefabScalarTypePanel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.ScalarTypePanel = cc.Class({
			extends: e("./ShaderFXPrefabPanel"),
			editor: !1,
			properties: {
				outputSlot: cc.Node
			},
			onLoad: function() {
				this._super()
			},
			isConstant: function() {
				return !0
			},
			getCallCode: function() {
				return ""
			},
			getCodes: function() {
				return ""
			},
			clone: function(e) {
				cc.log(e.getComponent(n.ShaderFX.Prefab.FXPanel).getPanelUniforms())
			},
			updatePreviewUniforms: function() {},
			uniformUpdated: function() {},
			init: function(e) {
				this._super(e)
			},
			initUniforms: function() {},
			initExtendPanel: function() {},
			addOutputSlot: function(e, t) {
				this._outputSlots.push(this.outputSlot), this.outputSlot.getComponent("DigraphEditorPrefabOutputSlot").init(e), this.outputSlot.getComponent("DigraphEditorPrefabOutputSlot").setIndex(t), this.outputSlot.getComponent("DigraphEditorPrefabOutputSlot").setPanel(this.node)
			},
			start: function() {
				this._super()
			},
			updatePanelUniform: function(e, t, o) {
				if (e.getComponent(n.ShaderFX.Prefab.FXPanel), e === this.node)
					if (null != this._panelUniforms[t]) "cc.Color" == this._panelUniforms[t].type ? this._panelUniforms[t].value = cc.color(o) : this._panelUniforms[t].value = o;
					else {
						var i = t.split("_")[0],
							a = t.split("_")[1];
						"vec2" == this._panelUniforms[i].type ? this._panelUniforms[i].value = "X" == a ? [o, this._panelUniforms[i].value[1]] : [this._panelUniforms[i].value[0], o] : "vec3" == this._panelUniforms[i].type ? this._panelUniforms[i].value = "X" == a ? [o, this._panelUniforms[i].value[1], this._panelUniforms[i].value[2]] : "Y" == a ? [this._panelUniforms[i].value[0], o, this._panelUniforms[i].value[2]] : [this._panelUniforms[i].value[0], this._panelUniforms[i].value[1], o] : "vec4" == this._panelUniforms[i].type && (this._panelUniforms[i].value = "X" == a ? [o, this._panelUniforms[i].value[1], this._panelUniforms[i].value[2], this._panelUniforms[i].value[3]] : "Y" == a ? [this._panelUniforms[i].value[0], o, this._panelUniforms[i].value[2], this._panelUniforms[i].value[3]] : "Z" == a ? [this._panelUniforms[i].value[0], this._panelUniforms[i].value[1], o, this._panelUniforms[i].value[3]] : [this._panelUniforms[i].value[0], this._panelUniforms[i].value[1], this._panelUniforms[i].value[2], o])
					}
			},
			updatePreview: function() {}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabPanel": "ShaderFXPrefabPanel"
	}],
	ShaderFXPrefabScalarTypeVec2Panel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "5b978RmqLpEPLMIM7u2U4pO", "ShaderFXPrefabScalarTypeVec2Panel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.ScalarTypeVec2Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node
			},
			onLoad: function() {
				this._super()
			},
			getOutputName: function() {
				return "vec2(" + this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ")"
			},
			initUniforms: function() {
				for (var e in this._uniforms) {
					var t = parseFloat(this._uniforms[e].default); - 1 != e.indexOf("x") && this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X", t, {
						panel: this.node
					}), -1 != e.indexOf("y") && this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y", t, {
						panel: this.node
					})
				}
			},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabScalarTypeVec3Panel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "cdadaukdFBHAoKQYINy8Aoa", "ShaderFXPrefabScalarTypeVec3Panel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.ScalarTypeVec3Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformZSliderEx: cc.Node
			},
			onLoad: function() {
				this._super()
			},
			getOutputName: function() {
				return "vec3(" + this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ")"
			},
			initUniforms: function() {
				for (var e in this._uniforms) {
					var t = parseFloat(this._uniforms[e].default); - 1 != e.indexOf("x") && this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X", t, {
						panel: this.node
					}), -1 != e.indexOf("y") && this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y", t, {
						panel: this.node
					}), -1 != e.indexOf("z") && this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Z", t, {
						panel: this.node
					})
				}
			},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabScalarTypeVec4Panel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "86d389+WyBC4oYvkNOD6zmT", "ShaderFXPrefabScalarTypeVec4Panel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.ScalarTypeVec4Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformZSliderEx: cc.Node,
				uniformWSliderEx: cc.Node
			},
			onLoad: function() {
				this._super()
			},
			getOutputName: function() {
				return "vec4(" + this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ", " + this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue() + ")"
			},
			initUniforms: function() {
				for (var e in this._uniforms) {
					var t = parseFloat(this._uniforms[e].default); - 1 != e.indexOf("x") && this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "X", t, {
						panel: this.node
					}), -1 != e.indexOf("y") && this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Y", t, {
						panel: this.node
					}), -1 != e.indexOf("z") && this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "Z", t, {
						panel: this.node
					}), -1 != e.indexOf("w") && this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(e, "W", t, {
						panel: this.node
					})
				}
			},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabSpinePanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "76952+Yr01F+KnDWm0Ei0Fj", "ShaderFXPrefabSpinePanel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.FXPanelSpine = cc.Class({
			extends: e("./ShaderFXPrefabPanel"),
			editor: !1,
			properties: {
				uniformSpineSkeletonPrefab: cc.Node
			},
			onLoad: function() {
				this._super()
			},
			init: function(e) {
				this._super(e)
			},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabPanel": "ShaderFXPrefabPanel"
	}],
	ShaderFXPrefabUniformColorEx: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d9fe0ivCPhNf5ocVKohxyMR", "ShaderFXPrefabUniformColorEx"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.UniformColorEx = cc.Class({
			extends: e("./ShaderFXPrefabUniform"),
			editor: !1,
			properties: {
				propertyName: cc.Label,
				propertyValue: cc.Label,
				preview: cc.Node,
				rNode: cc.Node,
				gNode: cc.Node,
				bNode: cc.Node,
				aNode: cc.Node,
				rLabel: cc.Label,
				gLabel: cc.Label,
				bLabel: cc.Label,
				aLabel: cc.Label
			},
			config: function(e, t, n, o) {
				this._super(e, t, n, o), this._propertyKey = e, this.propertyValue.string = "#" + n.toHEX("#rrggbbaa"), this._value = n, this._hideA = o.hideA, this.preview.color.r = this._value.r, this.preview.color.g = this._value.g, this.preview.color.b = this._value.b, this.preview.opacity = this._value.a, this.rNode.on(cc.Node.EventType.TOUCH_START, this._touchStartRCallback, this), this.rNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveRCallback, this), this.gNode.on(cc.Node.EventType.TOUCH_START, this._touchStartGCallback, this), this.gNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveGCallback, this), this.bNode.on(cc.Node.EventType.TOUCH_START, this._touchStartBCallback, this), this.bNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveBCallback, this), this.aNode.on(cc.Node.EventType.TOUCH_START, this._touchStartACallback, this), this.aNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveACallback, this), this._hideA && (this.propertyValue.string = "#" + n.toHEX("#rrggbb"), this.aNode.active = !1)
			},
			updateUI: function(e) {
				e = cc.color(e), this.propertyValue.string = "#" + e.toHEX("#rrggbbaa"), this._hideA && (this.propertyValue.string = "#" + e.toHEX("#rrggbb")), this._value = e, this.rLabel.string = "R: " + this._value.r, this.gLabel.string = "G: " + this._value.g, this.bLabel.string = "B: " + this._value.b, this.aLabel.string = "A: " + this._value.a, this.preview.color = this._value
			},
			getValue: function() {
				return this._value.clone()
			},
			_touchStartRCallback: function(e) {
				e.stopPropagation()
			},
			_touchMoveRCallback: function(e) {
				var t = e.getDelta().x,
					n = parseInt(t + this._value.r);
				n < 0 && (n = 0), n > 255 && (n = 255), this._value.r = n, this.rLabel.string = "R: " + n, this.onValueChanged(), e.stopPropagation()
			},
			_touchStartGCallback: function(e) {
				e.stopPropagation()
			},
			_touchMoveGCallback: function(e) {
				var t = e.getDelta().x,
					n = parseInt(t + this._value.g);
				n < 0 && (n = 0), n > 255 && (n = 255), this._value.g = n, this.gLabel.string = "G: " + n, this.onValueChanged(), e.stopPropagation()
			},
			_touchStartBCallback: function(e) {
				e.stopPropagation()
			},
			_touchMoveBCallback: function(e) {
				var t = e.getDelta().x,
					n = parseInt(t + this._value.b);
				n < 0 && (n = 0), n > 255 && (n = 255), this._value.b = n, this.bLabel.string = "B: " + n, this.onValueChanged(), e.stopPropagation()
			},
			_touchStartACallback: function(e) {
				e.stopPropagation()
			},
			_touchMoveACallback: function(e) {
				var t = e.getDelta().x,
					n = parseInt(t + this._value.a);
				n < 0 && (n = 0), n > 255 && (n = 255), this._value.a = n, this.aLabel.string = "A: " + n, this.onValueChanged(null, "a"), e.stopPropagation()
			},
			onValueChanged: function(e, t) {
				this.propertyValue.string = "#" + this._value.toHEX("#rrggbbaa"), this._hideA && (this.propertyValue.string = "#" + this._value.toHEX("#rrggbb")), "a" == t ? this.preview.opacity = this._value.a : this.preview.color = this._value, this._super()
			},
			disableUI: function() {
				this.propertyName.node.color = cc.color("#6B6B6B"), this.propertyValue.node.color = cc.color("#6B6B6B"), this.rLabel.node.color = cc.color("#6B6B6B"), this.gLabel.node.color = cc.color("#6B6B6B"), this.bLabel.node.color = cc.color("#6B6B6B"), this.aLabel.node.color = cc.color("#6B6B6B"), this.preview.color = cc.color("#6B6B6B"), this.rNode.off(cc.Node.EventType.TOUCH_START, this._touchStartRCallback, this), this.rNode.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveRCallback, this), this.gNode.off(cc.Node.EventType.TOUCH_START, this._touchStartGCallback, this), this.gNode.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveGCallback, this), this.bNode.off(cc.Node.EventType.TOUCH_START, this._touchStartBCallback, this), this.bNode.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveBCallback, this), this.aNode.off(cc.Node.EventType.TOUCH_START, this._touchStartACallback, this), this.aNode.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveACallback, this)
			},
			enableUI: function() {
				this.propertyName.node.color = cc.color("#ffffff"), this.propertyValue.node.color = cc.color("#ffffff"), this.rLabel.node.color = cc.color(255, 0, 0, 255), this.gLabel.node.color = cc.color(0, 255, 0, 255), this.bLabel.node.color = cc.color(0, 0, 255, 255), this.aLabel.node.color = cc.color(255, 255, 255, 255), this.preview.color.r = this._value.r, this.preview.color.g = this._value.g, this.preview.color.b = this._value.b, this.preview.opacity = this._value.a, this.rNode.on(cc.Node.EventType.TOUCH_START, this._touchStartRCallback, this), this.rNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveRCallback, this), this.gNode.on(cc.Node.EventType.TOUCH_START, this._touchStartGCallback, this), this.gNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveGCallback, this), this.bNode.on(cc.Node.EventType.TOUCH_START, this._touchStartBCallback, this), this.bNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveBCallback, this), this.aNode.on(cc.Node.EventType.TOUCH_START, this._touchStartACallback, this), this.aNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveACallback, this)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabUniform": "ShaderFXPrefabUniform"
	}],
	ShaderFXPrefabUniformColorPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "1a11dRTrotMSKgPTK1D/R6y", "ShaderFXPrefabUniformColorPanel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.UniformColorPanel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformColorEx: cc.Node,
				editbox: cc.EditBox,
				textLabel: cc.Label
			},
			clone: function(e) {
				this._isClone = !0;
				var t = e.getComponent(n.ShaderFX.Prefab.FXPanel).getPanelUniforms();
				for (var o in t) {
					var i = t[o].value;
					this.updateUniformValue(o + "_X", i.r), this.updateUniformValue(o + "_Y", i.g), this.updateUniformValue(o + "_Z", i.b), this.updateUniformValue(o + "_W", i.a)
				}
			},
			isConstant: function() {
				return !1
			},
			initUniforms: function() {
				for (var e in this.editbox.string = "U" + (new Date).getTime(), this._oldValue = this.editbox.string, this._uniforms) {
					var t = this.editbox.string;
					this._uniforms[t] = this._uniforms[e], this._panelUniforms[t] = this._panelUniforms[e], this._previewUniforms[t] = this._previewUniforms[e];
					var n = cc.color(this._uniforms[e].default);
					this._uniforms[t].value = n, this._panelUniforms[t].value = n, this._previewUniforms[t].value = n, this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").config(t, "color", n, {
						panel: this.node
					}), delete this._uniforms[e], delete this._panelUniforms[e], delete this._previewUniforms[e], this._oldValue = t
				}
			},
			updateUniformKey: function(e) {
				if (null != this._uniforms[this._oldValue])
					if (e == this._oldValue);
					else {
						this._uniforms[e] = this._uniforms[this._oldValue], this._panelUniforms[e] = this._panelUniforms[this._oldValue], this._previewUniforms[e] = this._previewUniforms[this._oldValue], this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").setPropertyKey(e), delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this._oldValue = e, this.editbox.string = e;
						var t = this;
						this.scheduleOnce(function() {
							t.editbox.node.width = t.textLabel.node.width * t.textLabel.node.scaleX
						}, .1)
					}
			},
			updateValue: function() {},
			getUniformValue: function() {
				return [this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()]
			},
			onLoad: function() {
				this._super(), this._isClone = !1
			},
			getCodes: function() {
				return ""
			},
			getOutputName: function() {
				return this.editbox.string
			},
			updateUniformValue: function(e, t, n) {
				var o = e.split("_")[0],
					i = e.split("_")[1];
				if (null != this._uniforms[this._oldValue]) {
					if (o != this._oldValue && (this._uniforms[o] = this._uniforms[this._oldValue], this._panelUniforms[o] = this._panelUniforms[this._oldValue], this._previewUniforms[o] = this._previewUniforms[this._oldValue]), null != t) {
						if (null == this._uniforms[o].value && (this._uniforms[o].value = [], this._panelUniforms[o].value = [], this._previewUniforms[o].value = []), "X" == i) {
							var a = this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").getValue();
							a.r = t, t = a
						} else if ("Y" == i) {
							var r = this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").getValue();
							r.g = t, t = r
						} else if ("Z" == i) {
							var s = this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").getValue();
							s.b = t, t = s
						} else if ("W" == i) {
							var c = this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").getValue();
							c.a = t, t = c
						}
						t = cc.color(t), this._uniforms[o].value = t, this._panelUniforms[o].value = t, this._previewUniforms[o].value = t
					}
					if (this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").setPropertyKey(o), o != this._oldValue) {
						delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this.editbox.string = o;
						var l = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						l.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "color",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(l);
						var h = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.renameUniformKey", !0);
						h.setUserData({
							oldKey: this._oldValue,
							key: o,
							value: t,
							type: "color",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(h)
					}
					if (0 != n) {
						var u = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
						u.setUserData({
							oldKey: this._oldValue,
							key: o,
							value: t,
							type: "color",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(u)
					}
					this._oldValue = o;
					var p = this;
					this.scheduleOnce(function() {
						p.editbox.node.width = p.textLabel.node.width * p.textLabel.node.scaleX
					}, .1), null != t && this.uniformColorEx.getComponent("ShaderFXPrefabUniformColorEx").updateUI(t)
				}
			},
			uniformUpdated: function(e) {
				if (cc.log("uniformUpdated"), e.target == this.node) {
					var t = e.getUserData(),
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
					n.setUserData({
						key: t.getPropertyKey(),
						value: t.getValue(),
						type: "color",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
			},
			onEditBoxReturn: function(e) {
				if (e.string) {
					this._oldValue;
					var t = e.string,
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
					n.setUserData({
						oldKey: this._oldValue,
						key: t,
						type: "color",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
				e.string = this._oldValue
			},
			onEditBoxDidEnded: function(e) {
				e.node.width = this.textLabel.node.width * this.textLabel.node.scaleX
			},
			onEditBoxDidBegan: function(e) {
				this._oldValue = e.string, e.node.width = 100
			},
			start: function() {
				if (this._super(), !this._isClone) {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", !0);
					e.setUserData({
						key: this.editbox.string,
						value: cc.color(255, 255, 255, 255),
						type: "color",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(e)
				}
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabUniformColor: [function(e, t) {
		"use strict";
		cc._RF.push(t, "dbdebm+LBRKyoN63uYA2iGz", "ShaderFXPrefabUniformColor"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.UniformColor = cc.Class({
			extends: e("./ShaderFXPrefabUniform"),
			editor: !1,
			properties: {
				propertyName: cc.Label,
				propertyValue: cc.Label,
				propertyUIR: cc.Slider,
				propertyUIG: cc.Slider,
				propertyUIB: cc.Slider,
				propertyUIA: cc.Slider,
				preview: cc.Node
			},
			config: function(e, t, n, o) {
				this._super(e, t, n, o), this._propertyKey = e, this.propertyName.string = t, this.propertyValue.string = n.toHEX("#rrggbbaa"), this._value = n, this.propertyUIR.progress = n.r / 255, this.propertyUIG.progress = n.g / 255, this.propertyUIB.progress = n.b / 255, this.propertyUIA.progress = n.a / 255, this.preview.color.r = this._value.r, this.preview.color.g = this._value.g, this.preview.color.b = this._value.b, this.preview.opacity = this._value.a
			},
			updateUI: function(e) {
				e = cc.color(e), this.propertyValue.string = e.toHEX("#rrggbbaa"), this._value = e, this.propertyUIR.progress = e.r / 255, this.propertyUIG.progress = e.g / 255, this.propertyUIB.progress = e.b / 255, this.propertyUIA.progress = e.a / 255, this.preview.color = this._value
			},
			getValue: function() {
				return this._value.clone()
			},
			onValueChanged: function(e, t) {
				this._value[t] = parseInt(255 * e.progress), this.propertyValue.string = this._value.toHEX("#rrggbbaa"), "a" == t ? this.preview.opacity = 255 * e.progress : this.preview.color = this._value, this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabUniform": "ShaderFXPrefabUniform"
	}],
	ShaderFXPrefabUniformEditBox: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c3769ORpW9ICp/ZS0aYgOTe", "ShaderFXPrefabUniformEditBox"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.UniformEditBox = cc.Class({
			extends: e("./ShaderFXPrefabUniform"),
			editor: !1,
			properties: {
				propertyName: cc.Label,
				propertyUI: cc.EditBox
			},
			config: function(e, t, n, o) {
				this._super(e, t, n, o), this._propertyKey = e, this.propertyName.string = t, this.propertyUI.string = n
			},
			updateUI: function(e) {
				this.propertyUI.string = e
			},
			getValue: function() {
				return this.propertyUI.string
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabUniform": "ShaderFXPrefabUniform"
	}],
	ShaderFXPrefabUniformFloatPanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "91014FB4DpM9KqysWvQ1wA0", "ShaderFXPrefabUniformFloatPanel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.UniformFloatPanel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformSliderEx: cc.Node,
				editbox: cc.EditBox,
				textLabel: cc.Label
			},
			onLoad: function() {
				this._super(), this._isClone = !1
			},
			isConstant: function() {
				return !1
			},
			isUniform: function() {
				return !0
			},
			getCodes: function() {
				return ""
			},
			getOutputName: function() {
				return this.editbox.string
			},
			clone: function(e) {
				this._isClone = !0;
				var t = e.getComponent(n.ShaderFX.Prefab.FXPanel).getPanelUniforms();
				for (var o in t) {
					var i = parseFloat(t[o].value);
					this.updateUniformValue(o, i)
				}
			},
			initUniforms: function() {
				for (var e in this.editbox.string = "U" + (new Date).getTime(), this._oldValue = this.editbox.string, this._uniforms) {
					var t = this.editbox.string;
					this._uniforms[t] = this._uniforms[e], this._panelUniforms[t] = this._panelUniforms[e], this._previewUniforms[t] = this._previewUniforms[e];
					var n = parseFloat(this._uniforms[e].default);
					this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t, "N", n, {
						panel: this.node
					}), delete this._uniforms[e], delete this._panelUniforms[e], delete this._previewUniforms[e], this._oldValue = t
				}
			},
			getKey: function() {
				return this._oldValue
			},
			updateUniformKey: function(e) {
				if (null != this._uniforms[this._oldValue])
					if (e == this._oldValue);
					else {
						this._uniforms[e] = this._uniforms[this._oldValue], this._panelUniforms[e] = this._panelUniforms[this._oldValue], this._previewUniforms[e] = this._previewUniforms[this._oldValue], this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this._oldValue = e, this.editbox.string = e;
						var t = this;
						this.scheduleOnce(function() {
							t.editbox.node.width = t.textLabel.node.width * t.textLabel.node.scaleX
						}, .1)
					}
			},
			updateValue: function(e) {
				this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(e)
			},
			updateUniformValue: function(e, t) {
				if (null != this._uniforms[this._oldValue]) {
					if (e == this._oldValue) null != t && (this._uniforms[e].value = t, this._panelUniforms[e].value = t, this._previewUniforms[e].value = t);
					else {
						this._uniforms[e] = this._uniforms[this._oldValue], this._panelUniforms[e] = this._panelUniforms[this._oldValue], this._previewUniforms[e] = this._previewUniforms[this._oldValue], null != t && (this._uniforms[e].value = t, this._panelUniforms[e].value = t, this._previewUniforms[e].value = t), this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this.editbox.string = e;
						var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						n.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "float",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(n);
						var o = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
						o.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "float",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(o);
						var i = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.renameUniformKey", !0);
						i.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "float",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(i), this._oldValue = e;
						var a = this;
						this.scheduleOnce(function() {
							a.editbox.node.width = a.textLabel.node.width * a.textLabel.node.scaleX
						}, .1)
					}
					null != t && this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t)
				}
			},
			uniformUpdated: function(e) {
				if (cc.log("uniformUpdated"), e.target == this.node) {
					var t = e.getUserData(),
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
					n.setUserData({
						key: this._oldValue,
						value: t.getValue(),
						type: "float",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
			},
			onEditBoxReturn: function(e) {
				if (e.string)
					if (/[a-zA-Z_$][0-9a-zA-Z_$]/.test(e.string)) {
						this._oldValue;
						var t = e.string.replace(/_/g, ""),
							n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						n.setUserData({
							oldKey: this._oldValue,
							key: t,
							type: "float",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(n)
					} else e.string = this._oldValue;
				else e.string = this._oldValue
			},
			onEditBoxDidEnded: function(e) {
				e.node.width = this.textLabel.node.width * this.textLabel.node.scaleX, console.log("onEditBoxDidEnded")
			},
			onEditBoxDidBegan: function(e) {
				this._oldValue = e.string, e.node.width = 100
			},
			start: function() {
				if (this._super(), !this._isClone) {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", !0);
					e.setUserData({
						key: this.editbox.string,
						value: 1,
						type: "float",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(e)
				}
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabUniformOutput: [function(e, t) {
		"use strict";
		cc._RF.push(t, "549b9c3ukZB1rG5IWw+vkWK", "ShaderFXPrefabUniformOutput"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.UniformOutput = cc.Class({
			extends: e("./ShaderFXPrefabUniformTexture"),
			editor: !1,
			properties: {
				captureNode: cc.Node,
				captureNode2: cc.Node,
				_spriteFrame: {
					default: null,
					type: cc.SpriteFrame
				},
				spriteFrame: {
					get: function() {
						return this._spriteFrame
					},
					set: function(e) {
						this._spriteFrame = e
					},
					type: cc.SpriteFrame
				},
				sp: sp.Skeleton,
				value: cc.Node,
				fbo: cc.Node
			},
			config: function(e, t, n, o) {
				this._super(e, t, n, o), this._name = o.name, this._testrun = o.testrun, this._propertyKey = e, this.propertyName.string = t, this._renderComponent || (this.mode = 0, this.fboUpdate = !1, this._renderComponent = this.propertyValue.node.getComponent(cc.RenderComponent)), this.updateMaterial(o.material), cc.systemEvent.on("ssr.ShaderFX.Prefab.UniformSpineSkeleton.onSpinePropertyUpdated", this.onSpinePropertyUpdated, this)
			},
			updateMaterial: function(e) {
				var t = cc.MaterialVariant.create(e);
				this._renderComponent.setMaterial(0, t), this._editorMaterial = t
			},
			updateRenderComponent: function(e) {
				this._renderComponent = e, this._editorMaterial && this._renderComponent.setMaterial(0, this._editorMaterial)
			},
			updateUniform: function(e, t) {
				if (this._renderComponent && null != t) {
					var n = this._renderComponent.getMaterial(0);
					n && null != n.getProperty(e) && n.setProperty(e, t)
				}
			},
			updateUniforms: function(e) {
				for (var t in e) console.log("key: " + t), e[t].value ? (console.log("key: 2"), this.updateUniform(t, e[t].value)) : console.log("key: 1")
			},
			onSpinePropertyUpdated: function(e) {
				if ("Output" == this._name || this._testrun) {
					var t = e.getUserData();
					if (this.sp && 0 != this.mode)
						if ("scale" == t.key) t.fboEnabled ? (this.fbo.scale = Math.min(t.w, t.h) / 250 * .6 * parseFloat(t.value) / this.fbo.___scale, this.fbo.scaleY > 0 && (this.fbo.scaleY *= -1)) : this.sp.node.scale = parseFloat(t.value);
						else if ("x" == t.key) t.fboEnabled || (this.sp.node.x = parseFloat(t.value));
					else if ("y" == t.key) t.fboEnabled || (this.sp.node.y = parseFloat(t.value));
					else if ("skin" == t.key) t.fboEnabled || this.sp.setSkin(t.value);
					else if ("animation" == t.key) t.fboEnabled || (this.sp.animation = t.value);
					else if ("fbo" == t.key)
						if (t.value) {
							this.fboUpdate = !1, this.fbo.active = !0, this.value.active = !1, this.sp.node.active = !1;
							var n = this;
							this.scheduleOnce(function() {
								n.fbo.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t.fbo.getComponent(cc.Sprite).spriteFrame.getTexture()), n._renderComponent = n.fbo.getComponent(cc.Sprite), n._editorMaterial && (n.fbo.scale = Math.min(t.w, t.h) / 250 * .6, n.fbo.___scale = t.scale, this.fbo.scaleY > 0 && (n.fbo.scaleY *= -1), n._renderComponent.setMaterial(0, n._editorMaterial), n._editorMaterial.setProperty("texture", n.fbo.getComponent(cc.Sprite).spriteFrame.getTexture()))
							}, .01)
						} else this.fbo.scaleY > 0 && (this.fbo.scaleY *= -1), this.fbo.active = !1, this.value.active = !1, this.sp.node.active = !0, this.sp.animation = this.sp.animation, this._renderComponent = this.sp, this._editorMaterial && this._renderComponent.setMaterial(0, this._editorMaterial);
					else "slot" == t.key && this.sp._skeleton
				}
			},
			updateMainTexture: function(e, t) {
				if (cc.log("this._name: " + this._name), e)
					if (e instanceof sp.Skeleton) {
						if ("Output" != this._name && !t) return;
						if (e.skeletonData._uuid === this.___textureuuid) return;
						if (e.__fboEnabled) {
							this.fboUpdate = !1, this.mode = 2, this.fbo.active = !1, this.value.active = !1, this.sp.node.active = !1;
							var n = this;
							this.scheduleOnce(function() {
								n.fbo.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e.__fbo.getComponent(cc.Sprite).spriteFrame.getTexture()), n._renderComponent = n.fbo.getComponent(cc.Sprite), n._editorMaterial && (n._renderComponent.setMaterial(0, n._editorMaterial), n._editorMaterial.setProperty("texture", n.fbo.getComponent(cc.Sprite).spriteFrame.getTexture()))
							}, .01), this.___texture = e, this.___textureuuid = e.skeletonData._uuid, this.value.active = !1, this.fbo.active = !1, this.sp.node.active = !0, this.sp.skeletonData = e.skeletonData, this.sp.animation = e.animation, this.sp.node.scale = e.__scale, this.sp.node.x = e.__offsetX, this.sp.node.y = e.__offsetY, e._skeleton.skin && this.sp.setSkin(e._skeleton.skin.name)
						} else this.fboUpdate = !0, this.mode = 1, this.value.active = !1, this.fbo && (this.fbo.active = !1), this.sp.node.active = !0, cc.log(this.sp.skeletonData), this.___texture = e, this.___textureuuid = e.skeletonData._uuid, this.sp.skeletonData = e.skeletonData, this.sp.animation = e.animation, this.sp.node.scale = e.__scale, this.sp.node.x = e.__offsetX, this.sp.node.y = e.__offsetY, e._skeleton.skin && this.sp.setSkin(e._skeleton.skin.name), this._renderComponent = this.sp
					} else {
						if (this.mode = 0, this.value.active = !0, this.sp && (this.sp.node.active = !1), this.fbo && (this.fbo.active = !1), this.value.scale = 1, this.value.x = 0, this.value.y = 0, this.sp && (this.sp.skeletonData._uuid = null), this.propertyValue.spriteFrame = new cc.SpriteFrame(e), this.propertyValue.sizeMode = cc.Sprite.SizeMode.RAW, "Output" == this._name || this._testrun) {
							var o = 250 / this.propertyValue.spriteFrame.getOriginalSize().width,
								i = 250 / this.propertyValue.spriteFrame.getOriginalSize().height;
							this.propertyValue.node.scale = Math.min(o, i)
						} else {
							var a = 180 / this.propertyValue.spriteFrame.getOriginalSize().width,
								r = 180 / this.propertyValue.spriteFrame.getOriginalSize().height;
							this.propertyValue.node.scale = Math.min(a, r)
						}
						this._renderComponent = this.value.getComponent(cc.Sprite)
					}
				else {
					if (this.mode = 0, this.value.active = !0, this.sp && this.sp.node && (this.sp.node.active = !1, this.sp.skeletonData._uuid = null), this.fbo && (this.fbo.active = !1), this.value.scale = 1, this.value.x = 0, this.value.y = 0, this.propertyValue.spriteFrame = this.spriteFrame, this.propertyValue.sizeMode = cc.Sprite.SizeMode.RAW, "Output" == this._name || this._testrun) {
						var s = 250 / this.propertyValue.spriteFrame.getOriginalSize().width,
							c = 250 / this.propertyValue.spriteFrame.getOriginalSize().height;
						this.propertyValue.node.scale = Math.min(s, c)
					} else {
						var l = 180 / this.propertyValue.spriteFrame.getOriginalSize().width,
							h = 180 / this.propertyValue.spriteFrame.getOriginalSize().height;
						this.propertyValue.node.scale = Math.min(l, h)
					}
					this._renderComponent = this.value.getComponent(cc.Sprite)
				}
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabUniformTexture": "ShaderFXPrefabUniformTexture"
	}],
	ShaderFXPrefabUniformSliderEx: [function(e, t) {
		"use strict";
		cc._RF.push(t, "393a8rftn1A5qrNLWxcUq5L", "ShaderFXPrefabUniformSliderEx"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.UniformSliderEx = cc.Class({
			extends: e("./ShaderFXPrefabUniform"),
			editor: !1,
			properties: {
				propertyName: cc.Label,
				propertyValue: cc.Label,
				propertyUI: cc.EditBox
			},
			config: function(e, t, n, o) {
				if (this._super(e, t, n, o), this._numberRegex = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/, this._propertyKey = e, this.propertyName.string = t, 1 == this._others.isInteger) this.propertyUI.string = parseInt(n);
				else {
					this.propertyUI.string = parseFloat(n);
					var i = this.propertyUI.string;
					0 == (i != Math.floor(i) ? i.toString().split(".")[1].length : 0) && (this.propertyUI.string = parseFloat(this.propertyUI.string).toFixed(1))
				}
				this.propertyName.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.propertyName.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.propertyName.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.propertyName.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), 1 == this._others.disableEditBox && (this.propertyUI.active = !1)
			},
			updateUI: function(e) {
				if (this._others && 1 == this._others.isInteger) this.propertyUI.string = parseInt(e);
				else {
					this.propertyUI.string = e;
					var t = this.propertyUI.string;
					0 == (t != Math.floor(t) ? t.toString().split(".")[1].length : 0) && (this.propertyUI.string = parseFloat(this.propertyUI.string).toFixed(1))
				}
			},
			getValue: function() {
				return 1 == this._others.isInteger ? parseInt(this.propertyUI.string) : this.propertyUI.string
			},
			onEditBoxDidBegan: function(e) {
				this._oldValue = e.string, this._editing = !0
			},
			onEditBoxDidEnd: function() {},
			onEditBoxTextChange: function(e, t) {
				t.blur(), "+" == e || "-" == e || "" == e || this._numberRegex.test(e) || (t.string = this._oldValue), t.focus()
			},
			onEditBoxReturn: function(e) {
				if (e.string && "+" != e.string && "-" != e.string) {
					var t = e.string,
						n = t != Math.floor(t) ? t.toString().split(".")[1].length : 0;
					0 == n ? e.string = parseFloat(e.string).toFixed(1) : n > 5 && (e.string = parseFloat(e.string).toFixed(5)), e.string = e.string, this.onValueChanged()
				} else e.string = "0.0"
			},
			_touchStartCallback: function(e) {
				var t = this.getValue();
				this.decimals = t != Math.floor(t) ? t.toString().split(".")[1].length : 0, 0 == this.decimals && (this.decimals = 1), this._x = e.getLocation(), e.stopPropagation();
				var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformSliderEx.TouchStart", !0);
				cc.systemEvent.dispatchEvent(n)
			},
			_touchMoveCallback: function(e) {
				var t, n = e.getDelta().x,
					o = e.getDelta().y,
					i = e.getStartLocation(),
					a = e.getLocation();
				t = Math.abs(a.x - i.x) > Math.abs(a.y - i.y) ? n : o / Math.pow(10, this.decimals), this.propertyUI.string = (t + parseFloat(this.propertyUI.string)).toFixed(this.decimals), this.onValueChanged(), e.stopPropagation()
			},
			_touchEndCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformSliderEx.TouchEnd", !0);
				cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			},
			disableUI: function() {
				this.propertyName.node.color = cc.color("#6B6B6B"), this.propertyValue.node.color = cc.color("#6B6B6B"), this.propertyName.node.off(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.propertyName.node.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.propertyName.node.off(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.propertyName.node.off(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), this.propertyUI.textLabel.node.color = cc.color("#6B6B6B")
			},
			enableUI: function() {
				this.propertyName.node.color = cc.color("#ffffff"), this.propertyValue.node.color = cc.color("#ffffff"), this.propertyName.node.on(cc.Node.EventType.TOUCH_START, this._touchStartCallback, this), this.propertyName.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveCallback, this), this.propertyName.node.on(cc.Node.EventType.TOUCH_END, this._touchEndCallback, this), this.propertyName.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancelCallback, this), this.propertyUI.textLabel.node.color = cc.color("#ffffff")
			},
			_touchCancelCallback: function(e) {
				var t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformSliderEx.TouchEnd", !0);
				cc.systemEvent.dispatchEvent(t), e.stopPropagation()
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabUniform": "ShaderFXPrefabUniform"
	}],
	ShaderFXPrefabUniformSlider: [function(e, t) {
		"use strict";
		cc._RF.push(t, "0ddf8ogB9JJ5Ks83J78lPr/", "ShaderFXPrefabUniformSlider"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.UniformSlider = cc.Class({
			extends: e("./ShaderFXPrefabUniform"),
			editor: !1,
			properties: {
				propertyName: cc.Label,
				propertyValue: cc.Label,
				propertyUI: cc.Slider
			},
			config: function(e, t, n, o) {
				this._super(e, t, n, o), this._propertyKey = e, this.propertyName.string = t, this.propertyValue.string = n, this.min = o.min, this.max = o.max, this.propertyUI.progress = n / (this.max - this.min)
			},
			updateUI: function(e) {
				this.propertyValue.string = parseFloat(e), this.propertyUI.progress = e / (this.max - this.min)
			},
			getValue: function() {
				return parseFloat(this.propertyValue.string)
			},
			onValueChanged: function(e) {
				this.propertyValue.string = e.progress * (this.max - this.min), this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabUniform": "ShaderFXPrefabUniform"
	}],
	ShaderFXPrefabUniformSpineSkeleton: [function(e, t) {
		"use strict";
		var n;
		cc._RF.push(t, "b48a9dqptRKaI6MOSMZ0nuY", "ShaderFXPrefabUniformSpineSkeleton");
		var o = e("../../namespace/ShaderFXNamespace");
		o.ShaderFX.Prefab.UniformSpineSkeleton = cc.Class(((n = {
			extends: e("./ShaderFXPrefabUniform"),
			editor: !1,
			properties: {
				propertyName: cc.Label,
				propertyValue: sp.Skeleton,
				dropDownInfoPrefab: cc.Prefab,
				propertyUI: cc.Toggle,
				tooltip: cc.Node,
				animations: cc.Node,
				animationDropButton: cc.Node,
				animationScrollView: cc.Node,
				animationContent: cc.Node,
				animationLabel: cc.Label,
				skines: cc.Node,
				skinesDropButton: cc.Node,
				skinesScrollView: cc.Node,
				skinesContent: cc.Node,
				skinesLabel: cc.Label,
				bone: cc.Node,
				boneDropButton: cc.Node,
				boneScrollView: cc.Node,
				boneContent: cc.Node,
				boneLabel: cc.Label,
				property: cc.Node,
				scaleSliderEx: cc.Node,
				xSliderEx: cc.Node,
				ySliderEx: cc.Node,
				fbo: cc.Node,
				fboPanel: cc.Node,
				width: cc.Label,
				height: cc.Label
			},
			start: function() {
				cc.systemEvent.on("ssr.DigraphEditor.Manager.Canvas.zoomIn", this._onToolBarZoomIn, this), cc.systemEvent.on("ssr.DigraphEditor.Manager.Canvas.zoomOut", this._onToolBarZoomOut, this)
			},
			_onToolBarZoomIn: function(e) {
				cc.log("_onToolBarZoomIn: " + e.getUserData()), this._cameraScale = e.getUserData(), this.fbo.getComponent("FBONodeTargetComponent").updateTarget(e.getUserData())
			},
			_onToolBarZoomOut: function(e) {
				cc.log("_onToolBarZoomOut: " + e.getUserData()), this._cameraScale = e.getUserData(), this.fbo.getComponent("FBONodeTargetComponent").updateTarget(e.getUserData())
			},
			onCheck: function() {
				console.log("this.propertyUI.isChecked: " + this.propertyUI.isChecked), this.propertyValue.animation = this.propertyValue.animation;
				var e, t = 200 / this.propertyValue.node.width,
					n = 200 / this.propertyValue.node.height;
				this.propertyUI.isChecked ? (this.fbo.active = !0, this.fboPanel.active = !0) : (this.fbo.active = !1, this.fboPanel.active = !1), (e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Uniform.onValueChanged", !0)).setUserData(this), e.target = this.node, cc.systemEvent.dispatchEvent(e), (e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformSpineSkeleton.onSpinePropertyUpdated", !0)).target = this.node, e.setUserData({
					key: "fbo",
					value: this.propertyUI.isChecked,
					fbo: this.fbo,
					scale: this.propertyValue.node.scale,
					x: this.propertyValue.node.x,
					y: this.propertyValue.node.y,
					ws: t,
					hs: n,
					w: this.propertyValue.node.width,
					h: this.propertyValue.node.height
				}), cc.systemEvent.dispatchEvent(e)
			},
			onMouseEnterPropertyValue: function() {
				this.tooltip.active = !0
			},
			onMouseLeavePropertyValue: function() {
				this.tooltip.active = !1
			},
			onPreview: function() {},
			updateAnimations: function() {
				for (var e in this.animationContent.removeAllChildren(!0), this.propertyValue.skeletonData.skeletonJson.animations) {
					var t = cc.instantiate(this.dropDownInfoPrefab);
					t.getComponent(o.ShaderFX.Prefab.DropDownInfo).config(e, this.updateAnimation.bind(this)), this.animationContent.addChild(t)
				}
			},
			updateSkines: function() {
				if (this.skinesContent.removeAllChildren(!0), cc.log(this.propertyValue.skeletonData), null == this.propertyValue.skeletonData.skeletonJson.skins.length)
					for (var e in this.propertyValue.skeletonData.skeletonJson.skins)(n = cc.instantiate(this.dropDownInfoPrefab)).getComponent(o.ShaderFX.Prefab.DropDownInfo).config(e, this.updateSkine.bind(this)), this.skinesContent.addChild(n);
				else
					for (var t = 0; t < this.propertyValue.skeletonData.skeletonJson.skins.length; t++) {
						var n;
						(n = cc.instantiate(this.dropDownInfoPrefab)).getComponent(o.ShaderFX.Prefab.DropDownInfo).config(this.propertyValue.skeletonData.skeletonJson.skins[t].name, this.updateSkine.bind(this)), this.skinesContent.addChild(n)
					}
			},
			updateBones: function() {
				this.boneContent.removeAllChildren(!0), (t = cc.instantiate(this.dropDownInfoPrefab)).getComponent(o.ShaderFX.Prefab.DropDownInfo).config("default", this.updateBone.bind(this)), this.boneContent.addChild(t);
				for (var e = 0; e < this.propertyValue.skeletonData.skeletonJson.slots.length; e++) {
					var t;
					(t = cc.instantiate(this.dropDownInfoPrefab)).getComponent(o.ShaderFX.Prefab.DropDownInfo).config(this.propertyValue.skeletonData.skeletonJson.slots[e].name, this.updateBone.bind(this)), this.boneContent.addChild(t)
				}
			},
			updateAnimation: function(e) {
				this.propertyValue.animation = e, this.animationLabel.string = e;
				var t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformSpineSkeleton.onSpinePropertyUpdated", !0);
				t.target = this.node, t.setUserData({
					key: "animation",
					value: e
				}), cc.systemEvent.dispatchEvent(t)
			},
			updateSkine: function(e) {
				this.propertyValue.setSkin(e), this.skinesLabel.string = e;
				var t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformSpineSkeleton.onSpinePropertyUpdated", !0);
				t.target = this.node, t.setUserData({
					key: "skin",
					value: e
				}), cc.systemEvent.dispatchEvent(t)
			},
			updateBone: function(e) {
				this.boneLabel.string = e;
				var t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformSpineSkeleton.onSpinePropertyUpdated", !0);
				t.target = this.node, t.setUserData({
					key: "slot",
					value: e
				}), cc.systemEvent.dispatchEvent(t)
			},
			onAnimations: function() {
				this.animationScrollView.active ? (this.animationScrollView.active = !1, this.animations.opacity = 255, this.skines.opacity = 255, this.bone.opacity = 255, this.property.opacity = 255) : (this.animationScrollView.active = !0, this.animations.opacity = 255, this.skines.opacity = 10, this.bone.opacity = 10, this.property.opacity = 10)
			},
			onSkines: function() {
				this.skinesScrollView.active ? (this.skinesScrollView.active = !1, this.animations.opacity = 255, this.skines.opacity = 255, this.bone.opacity = 255, this.property.opacity = 255) : (this.skinesScrollView.active = !0, this.animations.opacity = 10, this.skines.opacity = 255, this.bone.opacity = 10, this.property.opacity = 10)
			},
			onBones: function() {
				this.boneScrollView.active ? (this.boneScrollView.active = !1, this.animations.opacity = 255, this.skines.opacity = 255, this.bone.opacity = 255, this.property.opacity = 255) : (this.boneScrollView.active = !0, this.animations.opacity = 10, this.skines.opacity = 10, this.bone.opacity = 255, this.property.opacity = 10)
			},
			config: function(e, t, n, i) {
				for (var a in this._super(e, t, n, i), this.others = i, this._propertyKey = e, this.updateAnimations(), this.propertyValue.skeletonData.skeletonJson.animations) {
					this.updateAnimation(a);
					break
				}
				for (var r in this.updateSkines(), this.propertyValue.skeletonData.skeletonJson.skins) {
					this.updateSkine(r);
					break
				}
				this.updateBones(), this.updateBone("default");
				var s = 200 / this.propertyValue.node.width,
					c = 200 / this.propertyValue.node.height,
					l = Math.min(s, c);
				this.propertyValue.node.scale = l, this.width.string = this.propertyValue.node.width, this.height.string = this.propertyValue.node.height, this.scaleSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config("scale", "Scale:", l.toFixed(2), {
					onValueChanged: this.onValueChangedSlider.bind(this)
				}), this.xSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config("x", "X:", 0, {
					onValueChanged: this.onValueChangedSlider.bind(this)
				}), this.ySliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config("y", "Y:", 0, {
					onValueChanged: this.onValueChangedSlider.bind(this)
				}), o.ShaderFX.DnDUtil.enable(this.node, this.onValueChanged.bind(this), [".json", ".png", ".txt", ".atlas"], 3, !1)
			}
		}).onPreview = function(e, t) {
			var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniformTexture.onPreview", !0);
			n.setUserData(t ? this.propertyValuePacked.spriteFrame : this.propertyValue.spriteFrame), cc.systemEvent.dispatchEvent(n)
		}, n.getSpineValue = function() {
			return cc.log(this.propertyValue), this.propertyValue.animation = this.propertyValue.animation, this.propertyValue.__offsetX = this.propertyValue.node.x, this.propertyValue.__offsetY = this.propertyValue.node.y, this.propertyValue.__scale = this.propertyValue.node.scale, this.propertyValue.__fboEnabled = this.propertyUI.isChecked, this.propertyValue.__fbo = this.fbo, this.propertyValue
		}, n.updateFromBase64 = function(e, t, n, o, i, a) {
			this._file = {
				content: t,
				name: n,
				texture: e
			}, this._textureCache = e, this.propertyValue.spriteFrame = new cc.SpriteFrame(e), this.updateWrapMode(o), this.updateFilterMode(i), this.updatePackMode(a)
		}, n.getValue = function() {
			return new cc.SpriteFrame(this._textureCache).getTexture()
		}, n.onValueChangedSlider = function(e, t) {
			"scale" == e ? this.propertyValue.node.scale = parseFloat(t) : "x" == e ? (this.propertyValue.node.x = parseFloat(t), this.fbo.x = parseFloat(t)) : "y" == e && (this.propertyValue.node.y = parseFloat(t));
			var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformSpineSkeleton.onSpinePropertyUpdated", !0);
			n.target = this.node, n.setUserData({
				key: e,
				value: t,
				fboEnabled: this.propertyUI.isChecked,
				scale: this.propertyValue.node.scale,
				x: this.propertyValue.node.x,
				y: this.propertyValue.node.y,
				w: this.propertyValue.node.width,
				h: this.propertyValue.node.height
			}), cc.systemEvent.dispatchEvent(n)
		}, n.onValueChangedSpine = function(e) {
			this.propertyValue.skeletonData = e, this.updateAnimations();
			var t = "default";
			for (var n in this.propertyValue.skeletonData.skeletonJson.animations) {
				t = n;
				break
			}
			this.updateSkines();
			var o = "default";
			if (null == this.propertyValue.skeletonData.skeletonJson.skins.length) {
				for (var i in this.propertyValue.skeletonData.skeletonJson.skins)
					if ("default" != i) {
						o = i;
						break
					}
			} else
				for (var a = 0; a < this.propertyValue.skeletonData.skeletonJson.skins.length; a++)
					if ("default" != this.propertyValue.skeletonData.skeletonJson.skins[a].name) {
						o = this.propertyValue.skeletonData.skeletonJson.skins[a].name;
						break
					}
			var r, s = 180 / this.propertyValue.node.width,
				c = 180 / this.propertyValue.node.height,
				l = Math.min(s, c);
			this.propertyValue.node.scale = l, this.propertyValue.node.x = 0, this.propertyValue.node.y = 0, this.width.string = this.propertyValue.node.width, this.height.string = this.propertyValue.node.height, (r = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Uniform.onValueChanged", !0)).setUserData(this), r.target = this._others.panel, cc.systemEvent.dispatchEvent(r), this.updateAnimation(t), this.updateSkine(o), this.scaleSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(this.propertyValue.node.scale.toFixed(2)), this.xSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(0), this.ySliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(0), (r = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformSpineSkeleton.onSpinePropertyUpdated", !0)).target = this.node, r.setUserData({
				key: "fbo",
				value: this.propertyUI.isChecked,
				fbo: this.fbo,
				scale: this.propertyValue.node.scale,
				x: this.propertyValue.node.x,
				y: this.propertyValue.node.y,
				ws: s,
				hs: c,
				w: this.propertyValue.node.width,
				h: this.propertyValue.node.height
			}), cc.systemEvent.dispatchEvent(r)
		}, n.onValueChanged = function(e) {
			var t = e;
			if (!(t.length < 3)) {
				this.propertyUI.isChecked && (this.propertyUI.uncheck(), this.onCheck());
				var n = new sp.SkeletonData;
				n.uuid = o.ShaderFX.Util.uuidv4();
				for (var i = 0; i < t.length; i++)
					if (".txt" == cc.path.extname(t[i].name) || ".atlas" == cc.path.extname(t[i].name)) {
						n.atlasText = t[i].content;
						break
					}
				for (i = 0; i < t.length; i++)
					if (".json" == cc.path.extname(t[i].name) || ".json" == cc.path.extname(t[i].name)) {
						n.skeletonJson = JSON.parse(t[i].content), n._name = [t[i].name.substring(t[i].name.length - 4)];
						break
					}
				var a = [];
				for (i = 0; i < t.length; i++) ".png" == cc.path.extname(t[i].name) && (n.textureNames.push(t[i].name), a.push(t[i].content));
				var r = this;
				o.ShaderFX.DnDUtil.generateTexture2Ds(a, function(e) {
					n.textures = e, r.propertyValue.skeletonData = n, r.updateAnimations();
					var t = "default";
					for (var o in r.propertyValue.skeletonData.skeletonJson.animations) {
						t = o;
						break
					}
					r.updateSkines();
					var i = "default";
					if (null == r.propertyValue.skeletonData.skeletonJson.skins.length) {
						for (var a in r.propertyValue.skeletonData.skeletonJson.skins)
							if ("default" != a) {
								i = a;
								break
							}
					} else
						for (var s = 0; s < r.propertyValue.skeletonData.skeletonJson.skins.length; s++)
							if ("default" != r.propertyValue.skeletonData.skeletonJson.skins[s].name) {
								i = r.propertyValue.skeletonData.skeletonJson.skins[s].name;
								break
							}
					var c = 200 / r.propertyValue.node.width,
						l = 200 / r.propertyValue.node.height,
						h = Math.min(c, l);
					r.propertyValue.node.scale = h, r.propertyValue.node.x = 0, r.propertyValue.node.y = 0, r.width.string = r.propertyValue.node.width, r.height.string = r.propertyValue.node.height;
					var u = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Uniform.onValueChanged", !0);
					u.setUserData(r), u.target = r._others.panel, cc.systemEvent.dispatchEvent(u), r.updateAnimation(t), r.updateSkine(i), r.scaleSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(r.propertyValue.node.scale.toFixed(2)), r.xSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(0), r.ySliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(0)
				})
			}
		}, n)), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabUniform": "ShaderFXPrefabUniform"
	}],
	ShaderFXPrefabUniformTexturePanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "a8b4bH9CBxJb45Lxp+2f1UH", "ShaderFXPrefabUniformTexturePanel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.UniformTexturePanel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformTexture: cc.Node,
				editbox: cc.EditBox,
				textLabel: cc.Label
			},
			clone: function(e) {
				this._isClone = !0;
				var t = e.getComponent(n.ShaderFX.Prefab.FXPanel).getPanelUniforms();
				for (var o in t) t[o].value, this.uniformTexture.getComponent("ShaderFXPrefabUniformTexture").setPropertyKey(o)
			},
			isConstant: function() {
				return !1
			},
			isUniform: function() {
				return !0
			},
			getKey: function() {
				return this._oldValue
			},
			initUniforms: function() {
				for (var e in this.editbox.string = "U" + (new Date).getTime(), this._oldValue = this.editbox.string, this._uniforms) {
					var t = this.editbox.string;
					this._uniforms[t] = this._uniforms[e], this._panelUniforms[t] = this._panelUniforms[e], this._previewUniforms[t] = this._previewUniforms[e];
					var n = this._uniforms[e].default;
					this._uniforms[t].value = n, this._panelUniforms[t].value = n, this._previewUniforms[t].value = n, this.uniformTexture.getComponent("ShaderFXPrefabUniformTexture").config(t, "texture", n, {
						panel: this.node
					}), delete this._uniforms[e], delete this._panelUniforms[e], delete this._previewUniforms[e], this._oldValue = t
				}
			},
			updateUniformKey: function(e) {
				if (null != this._uniforms[this._oldValue])
					if (e == this._oldValue);
					else {
						this._uniforms[e] = this._uniforms[this._oldValue], this._panelUniforms[e] = this._panelUniforms[this._oldValue], this._previewUniforms[e] = this._previewUniforms[this._oldValue], delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this.uniformTexture.getComponent("ShaderFXPrefabUniformTexture").setPropertyKey(e), this._oldValue = e, this.editbox.string = e;
						var t = this;
						this.scheduleOnce(function() {
							t.editbox.node.width = t.textLabel.node.width * t.textLabel.node.scaleX
						}, .1)
					}
			},
			updateValue: function() {},
			getUniformValue: function() {
				return this.uniformTexture.getComponent("ShaderFXPrefabUniformTexture").getValue()
			},
			onLoad: function() {
				this._super(), this._isClone = !1
			},
			getCodes: function() {
				return ""
			},
			getOutputName: function() {
				return "Texture|" + this.editbox.string
			},
			onLoadSpriteFrameCallback: function(e, t) {
				this.propertyValue.spriteFrame = t.clone(), this._textureCache = t.getTexture()
			},
			updateUniformValue: function(e, t, o) {
				var i = e.split("_")[0];
				if (e.split("_")[1], null != this._uniforms[this._oldValue]) {
					if (i != this._oldValue && (this._uniforms[i] = this._uniforms[this._oldValue], this._panelUniforms[i] = this._panelUniforms[this._oldValue], this._previewUniforms[i] = this._previewUniforms[this._oldValue]), null != t && (this._uniforms[i].value = t, this._panelUniforms[i].value = t, this._previewUniforms[i].value = t), i != this._oldValue) {
						delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this.editbox.string = i, this.uniformTexture.getComponent("ShaderFXPrefabUniformTexture").setPropertyKey(i);
						var a = this;
						t.content ? n.ShaderFX.DnDUtil.generateTexture2D(t.content, function(n) {
							var o = {
								content: t.content,
								name: t.name,
								texture: n,
								wrapMode: t.wrapMode,
								filterMode: t.filterMode,
								packMode: t.packMode
							};
							a.uniformTexture.getComponent("ShaderFXPrefabUniformTexture").updateFromBase64(n, t.content, t.data, t.wrapMode, t.filterMode, t.packMode);
							var i = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
							i.setUserData({
								oldKey: a._oldValue,
								key: e,
								value: o,
								type: "texture",
								panel: a.node
							}), cc.systemEvent.dispatchEvent(i)
						}) : (this.uniformTexture.getComponent("ShaderFXPrefabUniformTexture").updatePackMode(t.packMode), this.uniformTexture.getComponent("ShaderFXPrefabUniformTexture").updateWrapMode(t.wrapMode), this.uniformTexture.getComponent("ShaderFXPrefabUniformTexture").updateFilterMode(t.filterMode));
						var r = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						r.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "texture",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(r);
						var s = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.renameUniformKey", !0);
						s.setUserData({
							oldKey: this._oldValue,
							key: i,
							value: t,
							type: "texture",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(s)
					}
					if (0 != o) {
						var c = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
						c.setUserData({
							oldKey: this._oldValue,
							key: i,
							value: t,
							type: "texture",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(c)
					}
					this._oldValue = i;
					var l = this;
					this.scheduleOnce(function() {
						l.editbox.node.width = l.textLabel.node.width * l.textLabel.node.scaleX
					}, .1)
				}
			},
			uniformUpdated: function(e) {
				if (cc.log("uniformUpdated"), e.target == this.node) {
					var t = e.getUserData(),
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
					n.setUserData({
						key: t.getPropertyKey(),
						value: t._file,
						type: "texture",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
			},
			onEditBoxReturn: function(e) {
				if (e.string) {
					this._oldValue;
					var t = e.string,
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
					n.setUserData({
						oldKey: this._oldValue,
						key: t,
						type: "texture",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
				e.string = this._oldValue
			},
			onEditBoxDidEnded: function(e) {
				e.node.width = this.textLabel.node.width * this.textLabel.node.scaleX
			},
			onEditBoxDidBegan: function(e) {
				this._oldValue = e.string, e.node.width = 100
			},
			start: function() {
				if (this._super(), !this._isClone) {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", !0);
					e.setUserData({
						key: this.editbox.string,
						value: null,
						type: "texture",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(e)
				}
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabUniformTexturePreview: [function(e, t) {
		"use strict";
		cc._RF.push(t, "dc120OqQ2tNg70DfnfvMNeF", "ShaderFXPrefabUniformTexturePreview"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.UniformTexturePreview = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				_propertyValue: null,
				propertyValue: {
					get: function() {
						return this._propertyValue
					},
					set: function(e) {
						this._propertyValue !== e && (this._propertyValue = e, cc.log("akjdakjd"), cc.log(e))
					},
					type: cc.Sprite
				}
			},
			config: function(e) {
				this.propertyValue.spriteFrame = e
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabUniformTexture: [function(e, t) {
		"use strict";
		var n;
		cc._RF.push(t, "34d8bmImJ1OS5RpvHeQjZ6g", "ShaderFXPrefabUniformTexture");
		var o = e("../../namespace/ShaderFXNamespace");
		o.ShaderFX.Prefab.UniformTexture = cc.Class(((n = {
			extends: e("./ShaderFXPrefabUniform"),
			editor: !1,
			properties: {
				propertyName: cc.Label,
				_propertyValue: null,
				propertyValue: {
					get: function() {
						return this._propertyValue
					},
					set: function(e) {
						this._propertyValue !== e && (this._propertyValue = e)
					},
					type: cc.Sprite
				},
				_propertyValuePacked: null,
				propertyValuePacked: {
					get: function() {
						return this._propertyValuePacked
					},
					set: function(e) {
						this._propertyValuePacked !== e && (this._propertyValuePacked = e)
					},
					type: cc.Sprite
				},
				atlasPanel: cc.Node,
				xValue: cc.Label,
				yValue: cc.Label,
				zValue: cc.Label,
				wValue: cc.Label,
				tooltip: cc.Node
			},
			start: function() {
				this.tooltip.getChildByName("Label").getComponent(cc.Label).string = window.EDITOR_LANGUAGE == cc.sys.LANGUAGE_CHINESE ? "\u53ef\u5c06\u56fe\u7247\u62d6\u653e\u5230\u8fd9\u91cc\u6765\u66f4\u6362\u7eb9\u7406" : "Drag image here to change texture", this.propertyValue.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnterPropertyValue, this), this.propertyValue.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeavePropertyValue, this), this._www = this.propertyValue.node.width * this.propertyValue.node.scale, this._hhh = this.propertyValue.node.height * this.propertyValue.node.scale
			},
			onMouseEnterPropertyValue: function() {
				this.tooltip.active = !0
			},
			onMouseLeavePropertyValue: function() {
				this.tooltip.active = !1
			},
			onPreview: function() {
				var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniformTexture.onPreview", !0);
				e.setUserData(this.propertyValue.spriteFrame), cc.systemEvent.dispatchEvent(e)
			},
			config: function(e, t, n, i) {
				if (this._super(e, t, n, i), this.atlasShow = !1, this.others = i, this.wrapMode = "Clamp", this.filterMode = "Linear", this.packMode = "Unpack", this._propertyKey = e, n) {
					var a = cc.loader.getRes(n, cc.SpriteFrame);
					a ? this.onLoadSpriteFrameCallback(null, a, t) : cc.loader.loadRes(n, cc.SpriteFrame, this.onLoadSpriteFrameCallback.bind(this))
				}
				o.ShaderFX.DnDUtil.enable(this.node, this.onValueChanged.bind(this), [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"], 1)
			},
			onLoadSpriteFrameCallback: function(e, t, n) {
				this._file = {
					content: t,
					name: n,
					texture: t.getTexture(),
					packMode: "Unpack"
				}, this.propertyValue.spriteFrame = t.clone(), this.propertyValuePacked && (this.propertyValuePacked.spriteFrame = t.clone()), this.updateWrapMode(), this.updateFilterMode(), this._textureCache = t.getTexture(), this.propertyValue.sizeMode = cc.Sprite.SizeMode.RAW;
				var o = this.node.width / this.propertyValue.spriteFrame.getOriginalSize().width,
					i = this.node.height / this.propertyValue.spriteFrame.getOriginalSize().height;
				this.propertyValue.node.scale = Math.min(o, i)
			}
		}).onPreview = function(e, t) {
			var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.ProjectUniformTexture.onPreview", !0);
			n.setUserData(t ? this.propertyValuePacked.spriteFrame : this.propertyValue.spriteFrame), cc.systemEvent.dispatchEvent(n)
		}, n.updatePackMode = function(e) {
			e && (this.packMode = e), this._file && (this._file.packMode = this.packMode), "Unpack" == this.packMode && this.propertyValuePacked && cc.dynamicAtlasManager.deleteAtlasTexture(this.propertyValuePacked.spriteFrame.getTexture()), this.propertyValue.spriteFrame = new cc.SpriteFrame(this._textureCache), "Pack" == this.packMode ? this.propertyValue.spriteFrame.getTexture().packable = !0 : "Unpack" == this.packMode && (this.propertyValue.spriteFrame.getTexture().packable = !1);
			var t = this;
			this.scheduleOnce(function() {
				var e = t.propertyValue.spriteFrame.uv,
					n = cc.v4(e[0], e[7], e[6] - e[0], e[1] - e[7]);
				t.propertyValuePacked && (t.propertyValuePacked.spriteFrame = new cc.SpriteFrame(t.propertyValue.spriteFrame.getTexture()), t.xValue.string = parseFloat(n.x).toFixed(3), t.yValue.string = parseFloat(n.y).toFixed(3), t.zValue.string = parseFloat(n.z).toFixed(3), t.wValue.string = parseFloat(n.w).toFixed(3))
			}, .01);
			var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformTexture.updatePackMode", !0);
			cc.systemEvent.dispatchEvent(n)
		}, n.showAtlas = function() {
			this.atlasShow ? (this.atlasShow = !1, this.atlasPanel.active = !1) : (this.atlasShow = !0, this.atlasPanel.active = !0)
		}, n.updateWrapMode = function(e) {
			e && (this.wrapMode = e), "Clamp" == this.wrapMode ? this.propertyValue.spriteFrame.getTexture().setWrapMode(cc.Texture2D.WrapMode.CLAMP_TO_EDGE, cc.Texture2D.WrapMode.CLAMP_TO_EDGE) : "Repeat" == this.wrapMode && this.propertyValue.spriteFrame.getTexture().setWrapMode(cc.Texture2D.WrapMode.REPEAT, cc.Texture2D.WrapMode.REPEAT), this._file && (this._file.wrapMode = this.wrapMode)
		}, n.updateFilterMode = function(e) {
			e && (this.filterMode = e), "Linear" == this.filterMode ? this.propertyValue.spriteFrame.getTexture().setFilters(cc.Texture2D.Filter.LINEAR, cc.Texture2D.Filter.LINEAR) : "Nearest" == this.filterMode && this.propertyValue.spriteFrame.getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST), this._file && (this._file.filterMode = this.filterMode)
		}, n.getFile = function() {
			return this._file
		}, n.updateFromBase64 = function(e, t, n, o, i, a) {
			this._file = {
				content: t,
				name: n,
				texture: e
			}, this._textureCache = e, this.propertyValue.spriteFrame = new cc.SpriteFrame(e), this.updateWrapMode(o), this.updateFilterMode(i), this.updatePackMode(a)
		}, n.getValue = function() {
			return new cc.SpriteFrame(this._textureCache).getTexture()
		}, n.onValueChanged = function(e) {
			console.log("onValueChangedonValueChangedonValueChanged"), this._file = e[0], this._textureCache = e[0].texture, this.propertyValue.spriteFrame = new cc.SpriteFrame(e[0].texture), this.propertyValue.sizeMode = cc.Sprite.SizeMode.RAW;
			var t = this._www / this.propertyValue.spriteFrame.getOriginalSize().width,
				n = this._hhh / this.propertyValue.spriteFrame.getOriginalSize().height;
			if (this.propertyValue.node.scale = Math.min(t, n), this.updateWrapMode(this.wrapMode), this.updateFilterMode(this.filterMode), this.updatePackMode(this.packMode), this.others.isCustom) {
				var o = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Uniform.onCustomTextureValueChanged", !0);
				o.setUserData(this._textureCache), o.target = this.node, cc.systemEvent.dispatchEvent(o)
			} else this._super()
		}, n)), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabUniform": "ShaderFXPrefabUniform"
	}],
	ShaderFXPrefabUniformTime0Panel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "cd044E+d7dJWKTgup+Pgv1v", "ShaderFXPrefabUniformTime0Panel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.UniformVec3Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {},
			isConstant: function() {
				return !1
			},
			isUniform: function() {
				return !0
			},
			getKey: function() {
				return this._oldValue
			},
			clone: function() {},
			initUniforms: function() {},
			updateUniformKey: function() {},
			updateValue: function() {},
			getUniformValue: function() {
				return "xxx"
			},
			onLoad: function() {
				this._super(), this._isClone = !1
			},
			getCodes: function() {
				return ""
			},
			getOutputName: function() {
				return "cc_time[0]"
			},
			updateUniformValue: function() {},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabUniformTimePanel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "aeb8ext+7NM4b3+aRyRR68m", "ShaderFXPrefabUniformTimePanel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.UniformVec3Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {},
			isConstant: function() {
				return !1
			},
			isUniform: function() {
				return !0
			},
			getKey: function() {
				return this._oldValue
			},
			clone: function() {},
			initUniforms: function() {},
			updateUniformKey: function() {},
			updateValue: function() {},
			getUniformValue: function(e) {
				return cc.log("getUniformValue timetimetime: " + e), "xxx"
			},
			onLoad: function() {
				this._super(), this._isClone = !1
			},
			getCodes: function() {
				return ""
			},
			getOutputName: function() {
				return "cc_time"
			},
			updateUniformValue: function() {},
			start: function() {
				this._super()
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabUniformToggle: [function(e, t) {
		"use strict";
		cc._RF.push(t, "a6d1aP31+NOyZYBoQesQxb5", "ShaderFXPrefabUniformToggle"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.UniformToggle = cc.Class({
			extends: e("./ShaderFXPrefabUniform"),
			editor: !1,
			properties: {
				propertyName: cc.Label,
				propertyValue: cc.Label,
				propertyUI: cc.Toggle
			},
			config: function(e, t, n, o) {
				this._super(e, t, n, o), this._propertyKey = e, this.propertyName.string = t, 1 == parseInt(n) ? this.propertyUI.isChecked = !0 : this.propertyUI.isChecked = !1
			},
			updateUI: function(e) {
				1 == parseInt(e) ? this.propertyUI.isChecked = !0 : this.propertyUI.isChecked = !1
			},
			getValue: function() {
				return this.propertyUI.isChecked ? 1 : 0
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabUniform": "ShaderFXPrefabUniform"
	}],
	ShaderFXPrefabUniformVec2Panel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "4bf8bYUZ3tBs5mLxvmXcwIb", "ShaderFXPrefabUniformVec2Panel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.UniformVec2Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				editbox: cc.EditBox,
				textLabel: cc.Label
			},
			isConstant: function() {
				return !1
			},
			isUniform: function() {
				return !0
			},
			clone: function(e) {
				this._isClone = !0;
				var t = e.getComponent(n.ShaderFX.Prefab.FXPanel).getPanelUniforms();
				for (var o in t) {
					var i = t[o].value;
					this.updateUniformValue(o + "_X", parseFloat(i[0])), this.updateUniformValue(o + "_Y", parseFloat(i[1]))
				}
			},
			initUniforms: function() {
				for (var e in this.editbox.string = "U" + (new Date).getTime(), this._oldValue = this.editbox.string, this._uniforms) {
					var t = this.editbox.string;
					this._uniforms[t] = this._uniforms[e], this._panelUniforms[t] = this._panelUniforms[e], this._previewUniforms[t] = this._previewUniforms[e];
					var n = [parseFloat(this._uniforms[e].default.split(",")[0]), parseFloat(this._uniforms[e].default.split(",")[1])];
					this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t + "_X", "X", n[0], {
						panel: this.node
					}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t + "_Y", "Y", n[1], {
						panel: this.node
					}), delete this._uniforms[e], delete this._panelUniforms[e], delete this._previewUniforms[e], this._oldValue = t
				}
			},
			updateUniformKey: function(e) {
				if (null != this._uniforms[this._oldValue]) {
					if (!this._isClone && !this._isInited) {
						var t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", !0);
						t.setUserData({
							key: this.editbox.string,
							value: ["0.0", "0.0"],
							type: "vec2",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(t), this._isInited = !0;
						var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						n.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: ["0.0", "0.0"],
							type: "vec2",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(n)
					}
					if (e == this._oldValue);
					else {
						this._uniforms[e] = this._uniforms[this._oldValue], this._panelUniforms[e] = this._panelUniforms[this._oldValue], this._previewUniforms[e] = this._previewUniforms[this._oldValue], this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e + "_X"), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e + "_Y"), delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this._oldValue = e, this.editbox.string = e;
						var o = this;
						this.scheduleOnce(function() {
							o.editbox.node.width = o.textLabel.node.width * o.textLabel.node.scaleX
						}, .1)
					}
				}
			},
			updateValue: function(e, t) {
				this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t)
			},
			getUniformValue: function() {
				return [this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()]
			},
			onLoad: function() {
				this._super(), this._isClone = !1, this._isInited = !1
			},
			getCodes: function() {
				return ""
			},
			getOutputName: function() {
				return this.editbox.string
			},
			updateUniformValue: function(e, t, n) {
				var o = e.split("_")[0],
					i = e.split("_")[1];
				if (null != this._uniforms[this._oldValue]) {
					if (o != this._oldValue && (this._uniforms[o] = this._uniforms[this._oldValue], this._panelUniforms[o] = this._panelUniforms[this._oldValue], this._previewUniforms[o] = this._previewUniforms[this._oldValue]), null != t && (null == this._uniforms[o].value && (this._uniforms[o].value = [], this._panelUniforms[o].value = [], this._previewUniforms[o].value = []), "X" == i ? (this._uniforms[o].value[0] = t, this._panelUniforms[o].value[0] = t, this._previewUniforms[o].value[0] = t) : "Y" == i ? (this._uniforms[o].value[1] = t, this._panelUniforms[o].value[1] = t, this._previewUniforms[o].value[1] = t) : (this._uniforms[o].value[0] = t[0], this._panelUniforms[o].value[0] = t[0], this._previewUniforms[o].value[0] = t[0], this._uniforms[o].value[1] = t[1], this._panelUniforms[o].value[1] = t[1], this._previewUniforms[o].value[1] = t[1])), "X" == i && this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), "Y" == i && this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), o != this._oldValue) {
						delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this.editbox.string = o;
						var a = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						a.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "vec2",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(a);
						var r = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.renameUniformKey", !0);
						r.setUserData({
							oldKey: this._oldValue,
							key: o,
							value: t,
							type: "vec2",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(r)
					}
					if (0 != n) {
						var s = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
						s.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "vec2",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(s)
					}
					this._oldValue = o;
					var c = this;
					this.scheduleOnce(function() {
						c.editbox.node.width = c.textLabel.node.width * c.textLabel.node.scaleX
					}, .1), null != t && ("X" == i ? this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : "Y" == i ? this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t) : (this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[0]), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t[1])))
				}
			},
			getKey: function() {
				return this._oldValue
			},
			uniformUpdated: function(e) {
				if (cc.log("uniformUpdated"), e.target == this.node) {
					var t = e.getUserData(),
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
					n.setUserData({
						key: t.getPropertyKey(),
						value: t.getValue(),
						type: "vec2",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
			},
			onEditBoxReturn: function(e) {
				if (e.string) {
					this._oldValue;
					var t = e.string,
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
					n.setUserData({
						oldKey: this._oldValue,
						key: t,
						type: "vec2",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
				e.string = this._oldValue
			},
			onEditBoxDidEnded: function(e) {
				e.node.width = this.textLabel.node.width * this.textLabel.node.scaleX
			},
			onEditBoxDidBegan: function(e) {
				this._oldValue = e.string, e.node.width = 100
			},
			start: function() {
				if (this._super(), !this._isClone && !this._isInited) {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", !0);
					e.setUserData({
						key: this.editbox.string,
						value: ["0.0", "0.0"],
						type: "vec2",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(e), this._isInited = !0
				}
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabUniformVec3Panel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b3c293UD+lE8bbd+d6p/RgX", "ShaderFXPrefabUniformVec3Panel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.UniformVec3Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformZSliderEx: cc.Node,
				editbox: cc.EditBox,
				textLabel: cc.Label
			},
			isConstant: function() {
				return !1
			},
			isUniform: function() {
				return !0
			},
			getKey: function() {
				return this._oldValue
			},
			clone: function(e) {
				this._isClone = !0;
				var t = e.getComponent(n.ShaderFX.Prefab.FXPanel).getPanelUniforms();
				for (var o in t) {
					var i = t[o].value;
					this.updateUniformValue(o + "_X", parseFloat(i[0])), this.updateUniformValue(o + "_Y", parseFloat(i[1])), this.updateUniformValue(o + "_Z", parseFloat(i[2]))
				}
			},
			initUniforms: function() {
				for (var e in this.editbox.string = "U" + (new Date).getTime(), this._oldValue = this.editbox.string, this._uniforms) {
					var t = this.editbox.string;
					this._uniforms[t] = this._uniforms[e], this._panelUniforms[t] = this._panelUniforms[e], this._previewUniforms[t] = this._previewUniforms[e];
					var n = [parseFloat(this._uniforms[e].default.split(",")[0]), parseFloat(this._uniforms[e].default.split(",")[1]), parseFloat(this._uniforms[e].default.split(",")[2])];
					this._uniforms[t].value = n, this._panelUniforms[t].value = n, this._previewUniforms[t].value = n, this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t + "_X", "X", n[0], {
						panel: this.node
					}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t + "_Y", "Y", n[1], {
						panel: this.node
					}), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t + "_Z", "Z", n[2], {
						panel: this.node
					}), delete this._uniforms[e], delete this._panelUniforms[e], delete this._previewUniforms[e], this._oldValue = t
				}
			},
			updateUniformKey: function(e) {
				if (null != this._uniforms[this._oldValue]) {
					if (!this._isClone && !this._isInited) {
						var t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", !0);
						t.setUserData({
							key: this.editbox.string,
							value: ["0.0", "0.0", "0.0"],
							type: "vec3",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(t), this._isInited = !0;
						var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						n.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: ["0.0", "0.0", "0.0"],
							type: "vec3",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(n)
					}
					if (e == this._oldValue);
					else {
						this._uniforms[e] = this._uniforms[this._oldValue], this._panelUniforms[e] = this._panelUniforms[this._oldValue], this._previewUniforms[e] = this._previewUniforms[this._oldValue], this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e + "_X"), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e + "_Y"), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e + "_Z"), delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this._oldValue = e, this.editbox.string = e;
						var o = this;
						this.scheduleOnce(function() {
							o.editbox.node.width = o.textLabel.node.width * o.textLabel.node.scaleX
						}, .1)
					}
				}
			},
			updateValue: function(e, t) {
				this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t)
			},
			getUniformValue: function() {
				return [this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()]
			},
			onLoad: function() {
				this._super(), this._isClone = !1, this._isInited = !1
			},
			getCodes: function() {
				return ""
			},
			getOutputName: function() {
				return this.editbox.string
			},
			updateUniformValue: function(e, t, n) {
				var o = e.split("_")[0],
					i = e.split("_")[1];
				if (null != this._uniforms[this._oldValue]) {
					if (o != this._oldValue && (this._uniforms[o] = this._uniforms[this._oldValue], this._panelUniforms[o] = this._panelUniforms[this._oldValue], this._previewUniforms[o] = this._previewUniforms[this._oldValue]), null != t && (null == this._uniforms[o].value && (this._uniforms[o].value = [], this._panelUniforms[o].value = [], this._previewUniforms[o].value = []), "X" == i ? (this._uniforms[o].value[0] = t, this._panelUniforms[o].value[0] = t, this._previewUniforms[o].value[0] = t) : "Y" == i ? (this._uniforms[o].value[1] = t, this._panelUniforms[o].value[1] = t, this._previewUniforms[o].value[1] = t) : "Z" == i ? (this._uniforms[o].value[2] = t, this._panelUniforms[o].value[2] = t, this._previewUniforms[o].value[2] = t) : (this._uniforms[o].value[0] = t[0], this._panelUniforms[o].value[0] = t[0], this._previewUniforms[o].value[0] = t[0], this._uniforms[o].value[1] = t[1], this._panelUniforms[o].value[1] = t[1], this._previewUniforms[o].value[1] = t[1], this._uniforms[o].value[2] = t[2], this._panelUniforms[o].value[2] = t[2], this._previewUniforms[o].value[2] = t[2])), "X" == i && this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), "Y" == i && this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), "Z" == i && this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), o != this._oldValue) {
						delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this.editbox.string = o;
						var a = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						a.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "vec3",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(a);
						var r = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.renameUniformKey", !0);
						r.setUserData({
							oldKey: this._oldValue,
							key: o,
							value: t,
							type: "vec3",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(r)
					}
					if (0 != n) {
						var s = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
						s.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "vec3",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(s)
					}
					this._oldValue = o;
					var c = this;
					this.scheduleOnce(function() {
						c.editbox.node.width = c.textLabel.node.width * c.textLabel.node.scaleX
					}, .1), null != t && ("X" == i && this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t), "Y" == i && this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t), "Z" == i && this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t))
				}
			},
			uniformUpdated: function(e) {
				if (cc.log("uniformUpdated"), e.target == this.node) {
					var t = e.getUserData(),
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
					n.setUserData({
						key: t.getPropertyKey(),
						value: t.getValue(),
						type: "vec3",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
			},
			onEditBoxReturn: function(e) {
				if (e.string) {
					this._oldValue;
					var t = e.string,
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
					n.setUserData({
						oldKey: this._oldValue,
						key: t,
						type: "vec3",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
				e.string = this._oldValue
			},
			onEditBoxDidEnded: function(e) {
				e.node.width = this.textLabel.node.width * this.textLabel.node.scaleX
			},
			onEditBoxDidBegan: function(e) {
				this._oldValue = e.string, e.node.width = 100
			},
			start: function() {
				if (this._super(), !this._isClone && !this._isInited) {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", !0);
					e.setUserData({
						key: this.editbox.string,
						value: [0, 0, 0],
						type: "vec3",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(e)
				}
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabUniformVec4Panel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b78138Tt6pKP4VWTeNTbc7s", "ShaderFXPrefabUniformVec4Panel");
		var n = e("../../namespace/ShaderFXNamespace");
		e("../../../shader-fx/util/ShaderFXUtil"), n.ShaderFX.Prefab.UniformVec4Panel = cc.Class({
			extends: e("./ShaderFXPrefabScalarTypePanel"),
			editor: !1,
			properties: {
				uniformXSliderEx: cc.Node,
				uniformYSliderEx: cc.Node,
				uniformZSliderEx: cc.Node,
				uniformWSliderEx: cc.Node,
				editbox: cc.EditBox,
				textLabel: cc.Label
			},
			isConstant: function() {
				return !1
			},
			isUniform: function() {
				return !0
			},
			getKey: function() {
				return this._oldValue
			},
			clone: function(e) {
				this._isClone = !0;
				var t = e.getComponent(n.ShaderFX.Prefab.FXPanel).getPanelUniforms();
				for (var o in t) {
					var i = t[o].value;
					this.updateUniformValue(o + "_X", parseFloat(i[0])), this.updateUniformValue(o + "_Y", parseFloat(i[1])), this.updateUniformValue(o + "_Z", parseFloat(i[2])), this.updateUniformValue(o + "_W", parseFloat(i[3]))
				}
			},
			initUniforms: function() {
				for (var e in this.editbox.string = "U" + (new Date).getTime(), this._oldValue = this.editbox.string, this._uniforms) {
					var t = this.editbox.string;
					this._uniforms[t] = this._uniforms[e], this._panelUniforms[t] = this._panelUniforms[e], this._previewUniforms[t] = this._previewUniforms[e];
					var n = [parseFloat(this._uniforms[e].default.split(",")[0]), parseFloat(this._uniforms[e].default.split(",")[1]), parseFloat(this._uniforms[e].default.split(",")[2]), parseFloat(this._uniforms[e].default.split(",")[3])];
					this._uniforms[t].value = n, this._panelUniforms[t].value = n, this._previewUniforms[t].value = n, this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t + "_X", "X", n[0], {
						panel: this.node
					}), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t + "_Y", "Y", n[1], {
						panel: this.node
					}), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t + "_Z", "Z", n[2], {
						panel: this.node
					}), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").config(t + "_W", "W", n[3], {
						panel: this.node
					}), delete this._uniforms[e], delete this._panelUniforms[e], delete this._previewUniforms[e], this._oldValue = t
				}
			},
			updateUniformKey: function(e) {
				if (null != this._uniforms[this._oldValue]) {
					if (!this._isClone && !this._isInited) {
						var t = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", !0);
						t.setUserData({
							key: this.editbox.string,
							value: ["0.0", "0.0", "0.0", "0.0"],
							type: "vec4",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(t), this._isInited = !0;
						var n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						n.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: ["0.0", "0.0", "0.0", "0.0"],
							type: "vec4",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(n)
					}
					if (e == this._oldValue);
					else {
						this._uniforms[e] = this._uniforms[this._oldValue], this._panelUniforms[e] = this._panelUniforms[this._oldValue], this._previewUniforms[e] = this._previewUniforms[this._oldValue], this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e + "_X"), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e + "_Y"), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e + "_Z"), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e + "_W"), delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this._oldValue = e, this.editbox.string = e;
						var o = this;
						this.scheduleOnce(function() {
							o.editbox.node.width = o.textLabel.node.width * o.textLabel.node.scaleX
						}, .1)
					}
				}
			},
			updateValue: function(e, t) {
				this.uniformSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t)
			},
			getUniformValue: function() {
				return [this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue(), this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").getValue()]
			},
			onLoad: function() {
				this._super(), this._isClone = !1, this._isInited = !1
			},
			getCodes: function() {
				return ""
			},
			getOutputName: function() {
				return this.editbox.string
			},
			updateUniformValue: function(e, t, n) {
				var o = e.split("_")[0],
					i = e.split("_")[1];
				if (null != this._uniforms[this._oldValue]) {
					if (o != this._oldValue && (this._uniforms[o] = this._uniforms[this._oldValue], this._panelUniforms[o] = this._panelUniforms[this._oldValue], this._previewUniforms[o] = this._previewUniforms[this._oldValue]), null != t && (null == this._uniforms[o].value && (this._uniforms[o].value = [], this._panelUniforms[o].value = [], this._previewUniforms[o].value = []), "X" == i ? (this._uniforms[o].value[0] = t, this._panelUniforms[o].value[0] = t, this._previewUniforms[o].value[0] = t) : "Y" == i ? (this._uniforms[o].value[1] = t, this._panelUniforms[o].value[1] = t, this._previewUniforms[o].value[1] = t) : "Z" == i ? (this._uniforms[o].value[2] = t, this._panelUniforms[o].value[2] = t, this._previewUniforms[o].value[2] = t) : "W" == i ? (this._uniforms[o].value[3] = t, this._panelUniforms[o].value[3] = t, this._previewUniforms[o].value[3] = t) : (this._uniforms[o].value[0] = t[0], this._panelUniforms[o].value[0] = t[0], this._previewUniforms[o].value[0] = t[0], this._uniforms[o].value[1] = t[1], this._panelUniforms[o].value[1] = t[1], this._previewUniforms[o].value[1] = t[1], this._uniforms[o].value[2] = t[2], this._panelUniforms[o].value[2] = t[2], this._previewUniforms[o].value[2] = t[2], this._uniforms[o].value[3] = t[3], this._panelUniforms[o].value[3] = t[3], this._previewUniforms[o].value[3] = t[3])), "X" == i && this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), "Y" == i && this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), "Z" == i && this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), "W" == i && this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").setPropertyKey(e), o != this._oldValue) {
						delete this._uniforms[this._oldValue], delete this._panelUniforms[this._oldValue], delete this._previewUniforms[this._oldValue], this.editbox.string = o;
						var a = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
						a.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "vec4",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(a);
						var r = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.renameUniformKey", !0);
						r.setUserData({
							oldKey: this._oldValue,
							key: o,
							value: t,
							type: "vec4",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(r)
					}
					if (0 != n) {
						var s = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
						s.setUserData({
							oldKey: this._oldValue,
							key: e,
							value: t,
							type: "vec4",
							panel: this.node
						}), cc.systemEvent.dispatchEvent(s)
					}
					this._oldValue = o;
					var c = this;
					this.scheduleOnce(function() {
						c.editbox.node.width = c.textLabel.node.width * c.textLabel.node.scaleX
					}, .1), null != t && ("X" == i && this.uniformXSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t), "Y" == i && this.uniformYSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t), "Z" == i && this.uniformZSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t), "W" == i && this.uniformWSliderEx.getComponent("ShaderFXPrefabUniformSliderEx").updateUI(t))
				}
			},
			uniformUpdated: function(e) {
				if (cc.log("uniformUpdated"), e.target == this.node) {
					var t = e.getUserData(),
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKeyValue", !0);
					n.setUserData({
						key: t.getPropertyKey(),
						value: t.getValue(),
						type: "vec4",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
			},
			onEditBoxReturn: function(e) {
				if (e.string) {
					this._oldValue;
					var t = e.string,
						n = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.updateUniformKey", !0);
					n.setUserData({
						oldKey: this._oldValue,
						key: t,
						type: "vec4",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(n)
				}
				e.string = this._oldValue
			},
			onEditBoxDidEnded: function(e) {
				e.node.width = this.textLabel.node.width * this.textLabel.node.scaleX
			},
			onEditBoxDidBegan: function(e) {
				this._oldValue = e.string, e.node.width = 100
			},
			start: function() {
				if (this._super(), !this._isClone && !this._isInited) {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.UniformPanel.createUniformKey", !0);
					e.setUserData({
						key: this.editbox.string,
						value: [0, 0, 0, 0],
						type: "vec4",
						panel: this.node
					}), cc.systemEvent.dispatchEvent(e)
				}
			}
		}), cc._RF.pop()
	}, {
		"../../../shader-fx/util/ShaderFXUtil": "ShaderFXUtil",
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace",
		"./ShaderFXPrefabScalarTypePanel": "ShaderFXPrefabScalarTypePanel"
	}],
	ShaderFXPrefabUniform: [function(e, t) {
		"use strict";
		cc._RF.push(t, "6a2e6RHl89BJYw63EByvXar", "ShaderFXPrefabUniform"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.Uniform = cc.Class({
			extends: cc.Component,
			editor: !1,
			properties: {
				_propertyKey: ""
			},
			onLoad: function() {},
			start: function() {},
			config: function(e, t, n, o) {
				this._others = o
			},
			updateUI: function() {},
			getKey: function() {
				return this._propertyKey
			},
			setPropertyKey: function(e) {
				this._propertyKey = e
			},
			getPropertyKey: function() {
				return this._propertyKey
			},
			getValue: function() {},
			onValueChanged: function() {
				if (this._others.onValueChanged) this._others.onValueChanged(this.getKey(), this.getValue());
				else {
					var e = new cc.Event.EventCustom("ssr.ShaderFX.Prefab.Uniform.onValueChanged", !0);
					e.setUserData(this), e.target = this._others.panel, cc.systemEvent.dispatchEvent(e)
				}
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXPrefabWrapMode: [function(e, t) {
		"use strict";
		cc._RF.push(t, "0d4836Ek2pG17RIAQl+UNMU", "ShaderFXPrefabWrapMode");
		var n = e("../../namespace/ShaderFXNamespace");
		n.ShaderFX.Prefab.WrapMode = cc.Class({
			extends: cc.Component,
			properties: {
				dropButton: cc.Node,
				scrollView: cc.Node,
				mode: cc.Label,
				repeatNode: cc.Node,
				clampNode: cc.Node
			},
			onLoad: function() {},
			start: function() {},
			init: function(e) {
				this.uniformTexturePrefab = e
			},
			onDrop: function() {
				this.scrollView.active ? this.scrollView.active = !1 : this.scrollView.active = !0
			},
			onWrapModeClamp: function() {
				this.scrollView.active = !1, this.mode.string = "Clamp", this.repeatNode.active = !0, this.clampNode.active = !1, this.uniformTexturePrefab.getComponent(n.ShaderFX.Prefab.UniformTexture).updateWrapMode(this.mode.string)
			},
			onWrapModeRepeat: function() {
				this.scrollView.active = !1, this.mode.string = "Repeat", this.repeatNode.active = !1, this.clampNode.active = !0, this.uniformTexturePrefab.getComponent(n.ShaderFX.Prefab.UniformTexture).updateWrapMode(this.mode.string)
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXProjectUtil: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e4de8+EgElB7oSDTnDge7Lp", "ShaderFXProjectUtil");
		var n = e("../namespace/ShaderFXNamespace");
		n.ShaderFX.ProjectUtil.SchemaData = function() {
			this.name = "", this.panels = [], this.groups = {}
		}, n.ShaderFX.ProjectUtil.SchemaProgramData = function() {
			this.name = "", this.uniforms = {}, this.tags = [], this.vert = "", this.frag = ""
		}, n.ShaderFX.ProjectUtil.SchemaFXData = function() {
			this.name = "", this.components = [], this.uniforms = {}
		}, n.ShaderFX.ProjectUtil.SchemaComponentData = function() {
			this.name = "", this.id = 0, this.input = [], this.output = []
		}, n.ShaderFX.ProjectUtil.SchemaPanelData = function() {
			this.name = "", this.x = 0, this.y = 0, this.id = 0, this.inputSlot = [], this.outputSlot = [], this.uniforms = {}
		}, n.ShaderFX.ProjectUtil.SchemaSlotData = function() {
			this.index = "", this.connections = []
		}, n.ShaderFX.ProjectUtil.DownloadFileToLocal = function(e, t) {
			var n = new Blob([t]);
			window.saveAs(n, e)
		}, n.ShaderFX.ProjectUtil.OpenFileToLocal = function(e) {
			if ("undefined" != typeof Editor) window.__electron.remote.dialog.showOpenDialog(function(t) {
				void 0 !== t ? window.__Fs.readFile(t[0], "utf-8", function(t, n) {
					t || (console.log("kaokaokao"), e(n))
				}) : console.log("No file selected")
			});
			else {
				var t = document.createElement("input");
				t.type = "file", t.id = "file", t.name = "file", t.addEventListener("change", function(t) {
					var n = t.target.files[0],
						o = new FileReader;
					o.onload = function(t) {
						e(t.target.result)
					}, o.readAsBinaryString(n)
				}, !1), t.click()
			}
		}, n.ShaderFX.ProjectUtil.ImportUtil = function() {}, n.ShaderFX.ProjectUtil.ImportUtil.restoreSchema = function(e) {
			n.ShaderFX.ProjectUtil.ComponentManager.getInstance().reset();
			for (var t = e.panels || [], o = 0; o < t.length; o++) {
				var i = t[o];
				(a = n.ShaderFX.ProjectUtil.ComponentManager.getInstance().addComponent(i.name, i.id, i.uniforms)).setPosition(parseInt(i.x), parseInt(i.y))
			}
			for (o = 0; o < t.length; o++) {
				i = t[o];
				for (var a = n.ShaderFX.ProjectUtil.ComponentManager.getInstance().findComponentByInstanceId(i.name, i.id), r = 0; r < i.inputSlot.length; r++)
					for (var s = i.inputSlot[r], c = s.index, l = a.getInputSlotArray()[c], h = 0; h < s.connections.length; h++) {
						var u = s.connections[h],
							p = u[0],
							d = u[1],
							f = u[2],
							m = n.ShaderFX.ProjectUtil.ComponentManager.getInstance().findComponentByInstanceId(p, d).getOutputSlotArray()[f];
						n.ShaderFX.ProjectUtil.ComponentManager.getInstance().makeConnection(l, m)
					}
			}
		}, n.ShaderFX.ProjectUtil.ImportUtil.deserializeSchema = function(e) {
			return JSON.parse(e)
		}, n.ShaderFX.ProjectUtil.ExportUtil = function() {}, n.ShaderFX.ProjectUtil.ExportUtil.getUniforms = function(e) {
			for (var t = {}, o = 0; o < e.length; o++) {
				var i = e[o].getComponent(n.ShaderFX.Prefab.FXPanel);
				if ("MainTexture" != i.getConfiguration().name && !i.isConstant()) {
					var a = i.getPanelUniforms();
					for (var r in a) t[r] = {}, t[r].type = a[r].type, "sampler2D" == a[r].type ? a[r].img && (t[r].value = a[r].img) : "cc.Color" == a[r].type ? t[r].value = a[r].value.toHEX("#rrggbbaa") : t[r].value = a[r].value
				}
			}
			return t
		}, n.ShaderFX.ProjectUtil.ExportUtil.serializeSchema = function(e, t, o, i) {
			var a = new n.ShaderFX.ProjectUtil.SchemaData;
			a.name = e;
			for (var r = 0; r < t.length; r++) {
				var s = new n.ShaderFX.ProjectUtil.SchemaPanelData,
					c = t[r].getComponent(n.ShaderFX.Prefab.FXPanel);
				if (s.name = c.getConfiguration().name, s.name_zh = c.getConfiguration().name_zh, s.x = t[r].x, s.y = t[r].y, s.id = c.getPanelID(), "SpineSkeleton" != c.getConfiguration().name) {
					if (c.getConfiguration().custom && (s.uuid = c.getConfiguration().uuid, s.custom = !0, s.author = c.getConfiguration().author, s.official = !!c.getConfiguration().official, s.category = {
							en: c.getConfiguration().category.en,
							zh: c.getConfiguration().category.zh
						}), "Output" != c.getConfiguration().name) {
						var l = c.getPanelUniforms();
						for (var h in l) "sampler2D" == l[h].type ? "MainTexture" != c.getConfiguration().name ? s.uniforms[h] = {
							content: l[h].value.content,
							name: l[h].value.name,
							filterMode: c.uniformTexture.getComponent("ShaderFXPrefabUniformTexture")._file.filterMode,
							wrapMode: c.uniformTexture.getComponent("ShaderFXPrefabUniformTexture")._file.wrapMode,
							packMode: c.uniformTexture.getComponent("ShaderFXPrefabUniformTexture")._file.packMode
						} : s.uniforms[h] = {
							filterMode: c.filterModeComponent.getComponent(n.ShaderFX.Prefab.FilterMode).mode.string,
							wrapMode: c.wrapModeComponent.getComponent(n.ShaderFX.Prefab.WrapMode).mode.string,
							packMode: c.packModeComponent.getComponent(n.ShaderFX.Prefab.PackMode).mode.string
						} : "cc.Color" == l[h].type ? s.uniforms[h] = l[h].value.toHEX("#rrggbbaa") : "vec2" == l[h].type ? (s.uniforms[h + "_X"] = l[h].value[0].toString(), s.uniforms[h + "_Y"] = l[h].value[1].toString()) : "vec3" == l[h].type ? (s.uniforms[h + "_X"] = l[h].value[0].toString(), s.uniforms[h + "_Y"] = l[h].value[1].toString(), s.uniforms[h + "_Z"] = l[h].value[2].toString()) : "vec4" == l[h].type ? (s.uniforms[h + "_X"] = l[h].value[0].toString(), s.uniforms[h + "_Y"] = l[h].value[1].toString(), s.uniforms[h + "_Z"] = l[h].value[2].toString(), s.uniforms[h + "_W"] = l[h].value[3].toString()) : s.uniforms[h] = l[h].value.toString()
					}
					for (var u = c.getOutputSlots(), p = 0; p < u.length; p++) {
						var d = new n.ShaderFX.ProjectUtil.SchemaSlotData;
						d.index = p;
						for (var f = u[p].getComponent("DigraphEditorPrefabOutputSlot").getConnections(), m = 0; m < f.length; m++) {
							var g = f[m].getComponent("DigraphEditorPrefabConnection"),
								C = g.getInputPanel().getComponent(n.ShaderFX.Prefab.FXPanel),
								_ = g.getInputSlot().getComponent("DigraphEditorPrefabInputSlot");
							_ || (_ = g.getOldInputSlot().getComponent("DigraphEditorPrefabInputSlot")), d.connections.push([C.getPanelID(), _.getIndex()]), s.outputSlot.push(d)
						}
					}
					a.panels.push(s)
				}
			}
			if (o)
				for (r = 0; r < o.length; r++)
					if (o[r]) {
						var v = o[r].getComponent("DigraphEditorPrefabGroup");
						for (a.groups[v.getGroupID()] = {
								name: v.getGroupName(),
								min: v.isMinimized(),
								x: parseInt(o[r].x),
								y: parseInt(o[r].y),
								panels: []
							}, p = 0; p < v.getPanels().length; p++) {
							var E = v.getPanels()[p].getComponent(n.ShaderFX.Prefab.FXPanel);
							a.groups[v.getGroupID()].panels.push(E.getPanelID())
						}
					}
			return i ? JSON.stringify(a) : (cc.log(a), JSON.stringify(a, null, 4))
		}, t.exports = n.ShaderFX.ProjectUtil, cc._RF.pop()
	}, {
		"../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXRestUtil: [function(e, t) {
		"use strict";
		cc._RF.push(t, "54d2c5lmxJCGqsvee7WG9++", "ShaderFXRestUtil");
		var n = e("../namespace/ShaderFXNamespace");
		n.ShaderFX.RestUtil = function() {}, n.ShaderFX.RestUtil.application_id = "6all0AMylDqy3waxCBYUux7h-gzGzoHsz", n.ShaderFX.RestUtil.rest_api_key = "BehsmJiwrFoIR92Tm0WaqK1q,master", n.ShaderFX.RestUtil.xhr = {}, n.ShaderFX.RestUtil.timeout = 2e4, n.ShaderFX.RestUtil.application_id_ga = "dJXBwutVeyS35vdvHu3yemWV-gzGzoHsz", n.ShaderFX.RestUtil.rest_api_key_ga = "LtSwdqNz3jE8WLLGQGluNsX9,master", n.ShaderFX.RestUtil.execFunction = function(e, t, o, i, a) {
			n.ShaderFX.RestUtil.xhr = new XMLHttpRequest, n.ShaderFX.RestUtil.xhr.open(e, t, !0), n.ShaderFX.RestUtil.xhr.setRequestHeader("X-LC-Id", n.ShaderFX.RestUtil.application_id), n.ShaderFX.RestUtil.xhr.setRequestHeader("X-LC-Key", n.ShaderFX.RestUtil.rest_api_key), n.ShaderFX.LeanCloudUtil._currentUserSession && n.ShaderFX.RestUtil.xhr.setRequestHeader("X-LC-Session", n.ShaderFX.LeanCloudUtil._currentUserSession), n.ShaderFX.RestUtil.xhr.setRequestHeader("Content-Type", "application/json"), n.ShaderFX.RestUtil.xhr.onreadystatechange = function() {
				n.ShaderFX.RestUtil.xhr && 4 == n.ShaderFX.RestUtil.xhr.readyState && (200 == n.ShaderFX.RestUtil.xhr.status || 201 == n.ShaderFX.RestUtil.xhr.status ? ("" == n.ShaderFX.RestUtil.xhr.responseText || "{}" == n.ShaderFX.RestUtil.xhr.responseText ? i() : i(JSON.parse(n.ShaderFX.RestUtil.xhr.responseText)), n.ShaderFX.RestUtil.xhr = null) : ("" == n.ShaderFX.RestUtil.xhr.responseText || "{}" == n.ShaderFX.RestUtil.xhr.responseText ? a() : a(JSON.parse(n.ShaderFX.RestUtil.xhr.responseText)), n.ShaderFX.RestUtil.xhr = null))
			}, n.ShaderFX.RestUtil.xhr.onerror = function(e) {
				a("ERR_REQUEST_FAILED"), cc.log("onerror: " + e), n.ShaderFX.RestUtil.xhr = null
			}, n.ShaderFX.RestUtil.xhr.ontimeout = function() {
				a("ERR_REQUEST_FAILED"), cc.log("ontimeout"), n.ShaderFX.RestUtil.xhr = null
			}, n.ShaderFX.RestUtil.xhr.onabort = function() {
				a("ERR_REQUEST_FAILED"), cc.log("onabort"), n.ShaderFX.RestUtil.xhr = null
			}, n.ShaderFX.RestUtil.xhr.send(JSON.stringify(o))
		}, n.ShaderFX.RestUtil.execFunctionGa = function(e, t, o, i, a) {
			n.ShaderFX.RestUtil.xhr = new XMLHttpRequest, n.ShaderFX.RestUtil.xhr.open(e, t, !0), n.ShaderFX.RestUtil.xhr.setRequestHeader("X-LC-Id", n.ShaderFX.RestUtil.application_id_ga), n.ShaderFX.RestUtil.xhr.setRequestHeader("X-LC-Key", n.ShaderFX.RestUtil.rest_api_key_ga), n.ShaderFX.LeanCloudUtil._currentUserSession && n.ShaderFX.RestUtil.xhr.setRequestHeader("X-LC-Session", n.ShaderFX.LeanCloudUtil._currentUserSession), n.ShaderFX.RestUtil.xhr.setRequestHeader("Content-Type", "application/json"), n.ShaderFX.RestUtil.xhr.onreadystatechange = function() {
				n.ShaderFX.RestUtil.xhr && 4 == n.ShaderFX.RestUtil.xhr.readyState && (200 == n.ShaderFX.RestUtil.xhr.status || 201 == n.ShaderFX.RestUtil.xhr.status ? ("" == n.ShaderFX.RestUtil.xhr.responseText || "{}" == n.ShaderFX.RestUtil.xhr.responseText ? i() : i(JSON.parse(n.ShaderFX.RestUtil.xhr.responseText)), n.ShaderFX.RestUtil.xhr = null) : ("" == n.ShaderFX.RestUtil.xhr.responseText || "{}" == n.ShaderFX.RestUtil.xhr.responseText ? a() : a(JSON.parse(n.ShaderFX.RestUtil.xhr.responseText)), n.ShaderFX.RestUtil.xhr = null))
			}, n.ShaderFX.RestUtil.xhr.onerror = function(e) {
				a("ERR_REQUEST_FAILED"), cc.log("onerror: " + e), n.ShaderFX.RestUtil.xhr = null
			}, n.ShaderFX.RestUtil.xhr.ontimeout = function() {
				a("ERR_REQUEST_FAILED"), cc.log("ontimeout"), n.ShaderFX.RestUtil.xhr = null
			}, n.ShaderFX.RestUtil.xhr.onabort = function() {
				a("ERR_REQUEST_FAILED"), cc.log("onabort"), n.ShaderFX.RestUtil.xhr = null
			}, n.ShaderFX.RestUtil.xhr.send(JSON.stringify(o))
		}, t.exports = n.ShaderFX.ResetUtil, cc._RF.pop()
	}, {
		"../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXSampleTagPrefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e1944WYkJlAVaaNHU2bK0X7", "ShaderFXSampleTagPrefab"), e("../../namespace/ShaderFXNamespace").ShaderFX.Prefab.TagSample = cc.Class({
			extends: cc.Component,
			properties: {
				title: cc.Label
			},
			onLoad: function() {},
			start: function() {},
			init: function(e, t) {
				this.title.string = t, this.node.color = this.getColor(e)
			},
			getColor: function(e) {
				return 0 == e ? cc.color("#FF0075") : 1 == e ? cc.color("#00FF94") : 2 == e ? cc.color("#FF8A00") : 3 == e ? cc.color("#F0FF00") : 4 == e ? cc.color("#004CFF") : void 0
			}
		}), cc._RF.pop()
	}, {
		"../../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	ShaderFXUtil: [function(e, t) {
		"use strict";

		function n(e, t) {
			var n;
			if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
				if (Array.isArray(e) || (n = o(e)) || t && e && "number" == typeof e.length) {
					n && (e = n);
					var i = 0;
					return function() {
						return i >= e.length ? {
							done: !0
						} : {
							done: !1,
							value: e[i++]
						}
					}
				}
				throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			return (n = e[Symbol.iterator]()).next.bind(n)
		}

		function o(e, t) {
			if (e) {
				if ("string" == typeof e) return i(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? i(e, t) : void 0
			}
		}

		function i(e, t) {
			(null == t || t > e.length) && (t = e.length);
			for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
			return o
		}
		cc._RF.push(t, "74fcaNmvmdPX6NT9Q46WVJb", "ShaderFXUtil");
		var a = e("../namespace/ShaderFXNamespace");
		a.ShaderFX.Util.uuidv4 = function() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
				var t = 16 * Math.random() | 0;
				return ("x" == e ? t : 3 & t | 8).toString(16)
			})
		}, a.ShaderFX.Util.generateMixedMaterial = function(e, t) {
			var n = a.ShaderFX.Util.uuidv4();
			return a.ShaderFX.Util.registerShadeProgram(a.ShaderFX.Util.generateShaderVert(e), a.ShaderFX.Util.generateShaderFrag(e), a.ShaderFX.Util.generateShaderBlock(e), t + "_program_" + n), a.ShaderFX.Util.generateMaterial(t + "_material", t + "_effect", t + "_technique", a.ShaderFX.Util.generatePass(e, t + "_program_" + n))
		}, a.ShaderFX.Util.generatePass2 = function(e, t, n) {
			var o = e.effect.technique.passes[0].clone();
			for (var i in e.effect.technique.passes[0], o._programKey = null, n)
				if (o._properties[i]);
				else {
					var a = n[i],
						r = {},
						s = a.type;
					if ("cc.Color" == s) {
						var c = new cc.color(a.default);
						r.value = new Float32Array([c.r / 255, c.g / 255, c.b / 255, c.a / 255]), r.type = 16
					} else "float" == s ? (r.value = null == a.value ? a.default : a.value, r.type = 13) : "bool" == s ? (r.value = null == a.value ? a.default : a.value, r.type = 1) : "vec2" == s ? (null == a.value ? r.value = [parseFloat(a.default.split(",")[0]), parseFloat(a.default.split(",")[1])] : r.value = new Float32Array([parseFloat(a.value[0]), parseFloat(a.value[1])]), r.type = 14) : "vec3" == s ? (null == a.value ? r.value = [parseFloat(a.default.split(",")[0]), parseFloat(a.default.split(",")[1]), parseFloat(a.default.split(",")[2])] : r.value = new Float32Array([parseFloat(a.value[0]), parseFloat(a.value[1]), parseFloat(a.value[2])]), r.type = 15) : "vec4" == s ? (null == a.value ? r.value = [parseFloat(a.default.split(",")[0]), parseFloat(a.default.split(",")[1]), parseFloat(a.default.split(",")[2]), parseFloat(a.default.split(",")[3])] : r.value = new Float32Array([parseFloat(a.value[0]), parseFloat(a.value[1]), parseFloat(a.value[2]), parseFloat(a.value[3])]), r.type = 16) : "sampler2D" == s && (r.value = "", r.type = 29);
					r.name = i, o._properties[i] = r
				}
			return o._programName = t, o
		}, a.ShaderFX.Util.generatePass = function(e, t) {
			for (var n = e[0]._fxMaterial.effect.technique.passes[0].clone(), o = 1; o < e.length; o++) {
				var i = e[o]._fxMaterial.effect.technique.passes[0];
				for (var a in i._properties)
					if (n._properties[a]);
					else {
						var r = i._properties[a],
							s = {},
							c = r.value;
						for (var l in Array.isArray(c) ? s.value = c.concat() : ArrayBuffer.isView(c) ? s.value = new c.__proto__.constructor(c) : s.value = c, r) "value" !== l && (s[l] = r[l]);
						n._properties[a] = s
					}
				for (var h in i._defines) void 0 !== n._defines[h] || (n._defines[h] = i._defines[h])
			}
			return n._programName = t, n
		}, a.ShaderFX.Util.generateShaderBlock = function(e) {
			for (var t = [{
					name: "sfx_uniforms_common",
					binding: 0,
					members: [{
						name: "sfx_u_uvrect",
						type: 16,
						count: 1
					}, {
						name: "sfx_u_resolution",
						type: 14,
						count: 1
					}, {
						name: "sfx_u_normResolution",
						type: 14,
						count: 1
					}, {
						name: "sfx_u_frameSize",
						type: 14,
						count: 1
					}, {
						name: "sfx_u_center",
						type: 14,
						count: 1
					}, {
						name: "sfx_u_position",
						type: 14,
						count: 1
					}],
					defines: []
				}, {
					name: "sfx_uniforms",
					binding: 1,
					members: [],
					defines: []
				}], n = 0; n < e[n].length; n++)
				for (var o = e[n]._fxMaterial.effectAsset.shaders[0], i = 0; i < o.blocks.length; i++)
					if ("sfx_uniforms" == o.blocks[i].name)
						for (var a = 0; a < o.blocks[i].members.length; a++) t[1].members.push(o.blocks[i].members[a])
		}, a.ShaderFX.Util.generateShaderBlock2 = function(e) {
			var t = [{
				name: "shader_editor_uniforms",
				binding: 0,
				members: [],
				defines: []
			}];
			for (var n in e) "float" == e[n].type ? t[0].members.push({
				name: n,
				type: 13,
				count: 1
			}) : "bool" == e[n].type ? t[0].members.push({
				name: n,
				type: 1,
				count: 1
			}) : "vec2" == e[n].type ? t[0].members.push({
				name: n,
				type: 14,
				count: 1
			}) : "vec3" == e[n].type ? t[0].members.push({
				name: n,
				type: 15,
				count: 1
			}) : "vec4" == e[n].type ? t[0].members.push({
				name: n,
				type: 16,
				count: 1
			}) : "cc.Color" == e[n].type ? t[0].members.push({
				name: n,
				type: 16,
				count: 1
			}) : "sampler2D" == e[n].type && t[0].members.push({
				name: n,
				type: 29,
				count: 1
			});
			return t
		}, a.ShaderFX.Util.generateShaderBlock3 = function(e) {
			var t = [{
				name: "shader_editor_uniforms",
				binding: 0,
				members: [{
					name: "texture",
					type: 29,
					count: 1
				}, {
					name: "v_uv0",
					type: 14,
					count: 1
				}],
				defines: []
			}];
			for (var n in e) "float" == e[n].type ? t[0].members.push({
				name: n,
				type: 13,
				count: 1
			}) : "bool" == e[n].type ? t[0].members.push({
				name: n,
				type: 1,
				count: 1
			}) : "vec2" == e[n].type ? t[0].members.push({
				name: n,
				type: 14,
				count: 1
			}) : "vec3" == e[n].type ? t[0].members.push({
				name: n,
				type: 15,
				count: 1
			}) : "vec4" == e[n].type ? t[0].members.push({
				name: n,
				type: 16,
				count: 1
			}) : "cc.Color" == e[n].type ? t[0].members.push({
				name: n,
				type: 16,
				count: 1
			}) : "sampler2D" == e[n].type && t[0].members.push({
				name: n,
				type: 29,
				count: 1
			});
			return t
		}, a.ShaderFX.Util.generateShaderVert = function() {
			return " precision highp float;\n  uniform mat4 cc_matViewProj;\n  uniform mat4 cc_matWorld;\n  attribute vec3 a_position;\n  attribute vec4 a_color;\n  varying vec4 v_color;\n  #if USE_TEXTURE\n      attribute vec2 a_uv0;\n      varying vec2 v_uv0;\n  #endif\n  void main () {\n      vec4 pos = vec4(a_position, 1);\n      #if CC_USE_MODEL\n          pos = cc_matViewProj * cc_matWorld * pos;\n      #else\n          pos = cc_matViewProj * pos;\n      #endif\n      #if USE_TEXTURE\n          v_uv0 = a_uv0;\n      #endif\n      v_color = a_color;\n      gl_Position = pos;\n  }\n "
		}, a.ShaderFX.Util.generateShaderVert2 = function() {
			return " precision highp float;\n  uniform mat4 cc_matViewProj;\n  uniform mat4 cc_matWorld;\n  attribute vec3 a_position;\n  attribute vec4 a_color;\n  varying vec4 v_color;\n  #if USE_TEXTURE\n      attribute vec2 a_uv0;\n      varying vec2 v_uv0;\n  #endif\n  void main () {\n      vec4 pos = vec4(a_position, 1);\n      #if CC_USE_MODEL\n          pos = cc_matViewProj * cc_matWorld * pos;\n      #else\n          pos = cc_matViewProj * pos;\n      #endif\n      #if USE_TEXTURE\n          v_uv0 = a_uv0;\n      #endif\n      v_color = a_color;\n      gl_Position = pos;\n  }\n "
		}, a.ShaderFX.Util.generateShaderVert3 = function() {
			return " precision highp float;\n  uniform mat4 cc_matViewProj;\n  uniform mat4 cc_matWorld;\n  attribute vec3 a_position;\n  attribute vec4 a_color;\n  varying vec4 v_color;\n      attribute vec2 a_uv0;\n      varying vec2 v_uv0;\n  void main () {\n      vec4 pos = vec4(a_position, 1);\n      #if CC_USE_MODEL\n          pos = cc_matViewProj * cc_matWorld * pos;\n      #else\n          pos = cc_matViewProj * pos;\n      #endif\n          v_uv0 = a_uv0;\n      v_color = a_color;\n      gl_Position = pos;\n  }\n "
		}, a.ShaderFX.Util.generateShaderFrag2 = function(e) {
			var t = "";
			return (t += " precision highp float;\n \n  #if USE_TEXTURE\n  varying vec2 v_uv0;\n  uniform vec4 cc_time;\n  #endif\n  varying vec4 v_color;\n ") + e
		}, a.ShaderFX.Util.generateShaderFrag3 = function(e) {
			var t = "";
			return (t += "precision highp float;\n\nvarying vec2 v_uv0;\nvarying vec4 v_color;\nuniform vec4 cc_time;\nuniform sampler2D texture;\n") + e
		}, a.ShaderFX.Util.generateShaderFrag = function(e) {
			for (var t = "", o = 0; o < e.length; o++)
				for (var i, a = n(e[o]._fxMaterial.effectAsset.shaders[0].glsl1.frag.replace(/(\r\n|\n|\r)/gm, "").matchAll(/(vec4|vec3|vec2|float|int|void) [\w]*\s?\(.*?\) \{.*?;\}/g)); !(i = a()).done;) {
					var r = i.value; - 1 == t.indexOf(r[0]) && -1 == r[0].indexOf("void main () {") && (-1 != r[0].indexOf("sfx_fs_output") ? (r[0] = r[0].replace("sfx_fs_output", "sfx_fs_output_" + e[o].constructor.name), t += r[0].replace(/\s\s\s\s/g, "\n    "), t += "\n") : (r[0] = r[0].replace(/\s\s\s\s/g, "\n    "), -1 == t.indexOf(r[0]) && (t += r[0], t += "\n")))
				}
			t = t.replace(/;}/g, ";\n}");
			var s = "",
				c = /\nuniform .*;/g;
			for (o = 0; o < e.length; o++)
				for (var l, h = n(e[o]._fxMaterial.effectAsset.shaders[0].glsl1.frag.matchAll(c)); !(l = h()).done;) {
					var u = l.value; - 1 == s.indexOf(u[0]) && (s += u[0])
				}
			s += "\n\n";
			var p = "";
			for (o = 0; o < e.length; o++) {
				var d = e[o]._fxMaterial.effectAsset.shaders[0].glsl1;
				o == e.length - 1 ? (p += " ", p += d.frag.slice(d.frag.indexOf("gl_FragColor = sfx_fs_output(uv, color);") - 4, d.frag.lastIndexOf("}") - 1)) : p = (p += d.frag.slice(d.frag.indexOf("gl_FragColor = sfx_fs_output(uv, color);"), d.frag.lastIndexOf("}") - 1)).replace("gl_FragColor = ", "    color = "), -1 != p.indexOf(" = sfx_fs_output(") && (p = p.replace(" = sfx_fs_output(", " = sfx_fs_output_" + e[o].constructor.name + "("))
			}
			var f = "";
			return f += " precision highp float;\n  varying vec4 v_color;\n \n  #if USE_TEXTURE\n      varying vec2 v_uv0;\n      uniform sampler2D texture;\n  #endif\n ", f += s, f += t, f += "void main () {\n     vec2 uv = v_uv0;\n     vec4 color = texture2D(texture, uv);\n ", (f += p = p.replace(/;/g, ";\n")) + "}\n "
		}, a.ShaderFX.Util.parseFragFuncs = function(e) {
			for (var t, o = {}, i = n(e.matchAll(/^\s*(vec4|vec3|vec2|float|int|void|bool|mat4|mat3|mat2)\s*(.*?)\(.*?[\s\S]*?^}/gm)); !(t = i()).done;) {
				var a = t.value;
				o[a[2]] = a[0].replace(/(\t)/gm, "\n").split("\n")
			}
			return o
		}, a.ShaderFX.Util.registerShadeProgram = function(e, t, n, o) {
			var i, a = ((i = {
				glsl1: {
					vert: e,
					frag: t
				},
				defines: [{
					name: "USE_TEXTURE",
					type: "boolean"
				}, {
					name: "CC_USE_MODEL",
					type: "boolean"
				}],
				builtins: {
					globals: {
						blocks: [{
							name: "CCGlobal",
							defines: []
						}],
						samplers: []
					},
					locals: {
						blocks: [{
							name: "CCLocal",
							defines: []
						}],
						samplers: []
					}
				}
			}).defines = [{
				name: "USE_TEXTURE",
				type: "boolean",
				defines: []
			}, {
				name: "CC_USE_MODEL",
				type: "boolean",
				defines: []
			}, {
				name: "USE_TINT",
				type: "boolean",
				defines: []
			}], i.blocks = n, i.samplers = [{
				name: "texture",
				type: 29,
				count: 1
			}], i.name = o, i);
			return cc.renderer._forward._programLib.define(a), a.defines
		}, a.ShaderFX.Util.registerShadeProgram3 = function(e, t, n, o) {
			var i, a = ((i = {
				glsl1: {
					vert: e,
					frag: t
				},
				defines: [{
					name: "USE_TEXTURE",
					type: "boolean"
				}, {
					name: "CC_USE_MODEL",
					type: "boolean"
				}],
				builtins: {
					globals: {
						blocks: [{
							name: "CCGlobal",
							defines: []
						}],
						samplers: []
					},
					locals: {
						blocks: [{
							name: "CCLocal",
							defines: []
						}],
						samplers: []
					}
				}
			}).defines = [{
				name: "USE_TEXTURE",
				type: "boolean",
				defines: []
			}, {
				name: "CC_USE_MODEL",
				type: "boolean",
				defines: []
			}, {
				name: "USE_TINT",
				type: "boolean",
				defines: []
			}], i.blocks = n, i.samplers = [{
				name: "texture",
				type: 29,
				count: 1
			}], i.name = o, i);
			return cc.renderer._forward._programLib.define(a), a.defines
		}, a.ShaderFX.Util.registerShadeProgram2 = function(e, t, n, o) {
			var i, a = ((i = {
				glsl1: {
					vert: e,
					frag: t
				},
				defines: [],
				builtins: {
					globals: {
						blocks: [{
							name: "CCGlobal",
							defines: []
						}],
						samplers: []
					},
					locals: {
						blocks: [{
							name: "CCLocal",
							defines: []
						}],
						samplers: []
					}
				}
			}).defines = [], i.blocks = n, i.samplers = [], i.name = o, i);
			return cc.renderer._forward._programLib.define(a), a.defines
		}, a.ShaderFX.Util.generateMaterial = function(e, t, n, o) {
			var i = new cc.Material;
			return i.name = e, i._effect = new cc.Effect(t, [new a.ShaderFX.Data.Technique(n, [o])], 0, null), i
		}, a.ShaderFX.Util.generateShaderCode = function(e) {
			if (!e) return {
				vert: "No material set!",
				frag: "No material set!"
			};
			var t = "",
				n = "";
			return e.effectAsset ? (t = e.effectAsset.shaders[0].glsl1.frag, n = e.effectAsset.shaders[0].glsl1.vert) : (t = cc.renderer._forward._programLib.getTemplate(e._effect._effect._technique._passes[0]._programName).frag, n = cc.renderer._forward._programLib.getTemplate(e._effect._effect._technique._passes[0]._programName).vert), {
				vert: n,
				frag: t
			}
		}, a.ShaderFX.Util.generateHighlightShaderCode = function(e, t) {
			for (var n = t || [{
					regex: /\b([0-9]+\.?[0-9]*)|(\.[0-9]+)\b/g,
					color: "#00FFFF"
				}, {
					regex: /\b(false|FALSE|NULL|true|TRUE)\b/g,
					color: "#FF1493"
				}, {
					regex: /(\s*#\s*define|\s*#\s*defined|\s*#\s*elif|\s*#\s*else|\s*#\s*if|\s*#\s*ifdef|\s*#\s*ifndef|\s*#\s*endif|\s*#\s*line|\s*#\s*pragma|\s*#\s*extension|\s*#\s*version|\s*#\s*error|\s*#\s*include|\s*#\s*undef)/g,
					color: "#7FFF00"
				}, {
					regex: /\b(break|case|continue|default|discard|do|else|for|if|return|switch|while)\b/g,
					color: "#7FFF00"
				}, {
					regex: /\b(void|bool|int|uint|float|double|vec[2|3|4]|dvec[2|3|4]|bvec[2|3|4]|ivec[2|3|4]|uvec[2|3|4]|mat[2|3|4]|mat2x2|mat2x3|mat2x4|mat3x2|mat3x3|mat3x4|mat4x2|mat4x3|mat4x4|dmat2|dmat3|dmat4|dmat2x2|dmat2x3|dmat2x4|dmat3x2|dmat3x3|dmat3x4|dmat4x2|dmat4x3|dmat4x4|sampler[1|2|3]D|image[1|2|3]D|samplerCube|imageCube|sampler2DRect|image2DRect|sampler[1|2]DArray|image[1|2]DArray|samplerBuffer|imageBuffer|sampler2DMS|image2DMS|sampler2DMSArray|image2DMSArray|samplerCubeArray|imageCubeArray|sampler[1|2]DShadow|sampler2DRectShadow|sampler[1|2]DArrayShadow|samplerCubeShadow|samplerCubeArrayShadow|isampler[1|2|3]D|iimage[1|2|3]D|isamplerCube|iimageCube|isampler2DRect|iimage2DRect|isampler[1|2]DArray|iimage[1|2]DArray|isamplerBuffer|iimageBuffer|isampler2DMS|iimage2DMS|isampler2DMSArray|iimage2DMSArray|isamplerCubeArray|iimageCubeArray|atomic_uint|usampler[1|2|3]D|uimage[1|2|3]D|usamplerCube|uimageCube|usampler2DRect|uimage2DRect|usampler[1|2]DArray|uimage[1|2]DArray|usamplerBuffer|uimageBuffer|usampler2DMS|uimage2DMS|usampler2DMSArray|uimage2DMSArray|usamplerCubeArray|uimageCubeArray|struct)\b/g,
					color: "#FFD700"
				}, {
					regex: /\b(layout|attribute|centroid|sampler|patch|const|flat|in|inout|invariant|noperspective|out|smooth|uniform|varying|buffer|shared|coherent|readonly|writeonly)\b/g,
					color: "#FF00FF"
				}, {
					regex: /\b(gl_BackColor|gl_BackLightModelProduct|gl_BackLightProduct|gl_BackMaterial|gl_BackSecondaryColor|gl_ClipDistance|gl_ClipPlane|gl_ClipVertex|gl_Color|gl_DepthRange|gl_DepthRangeParameters|gl_EyePlaneQ|gl_EyePlaneR|gl_EyePlaneS|gl_EyePlaneT|gl_Fog|gl_FogCoord|gl_FogFragCoord|gl_FogParameters|gl_FragColor|gl_FragCoord|gl_FragData|gl_FragDepth|gl_FrontColor|gl_FrontFacing|gl_FrontLightModelProduct|gl_FrontLightProduct|gl_FrontMaterial|gl_FrontSecondaryColor|gl_InstanceID|gl_Layer|gl_LightModel|gl_LightModelParameters|gl_LightModelProducts|gl_LightProducts|gl_LightSource|gl_LightSourceParameters|gl_MaterialParameters|gl_ModelViewMatrix|gl_ModelViewMatrixInverse|gl_ModelViewMatrixInverseTranspose|gl_ModelViewMatrixTranspose|gl_ModelViewProjectionMatrix|gl_ModelViewProjectionMatrixInverse|gl_ModelViewProjectionMatrixInverseTranspose|gl_ModelViewProjectionMatrixTranspose|gl_MultiTexCoord[0-7]|gl_Normal|gl_NormalMatrix|gl_NormalScale|gl_ObjectPlaneQ|gl_ObjectPlaneR|gl_ObjectPlaneS|gl_ObjectPlaneT|gl_Point|gl_PointCoord|gl_PointParameters|gl_PointSize|gl_Position|gl_PrimitiveIDIn|gl_ProjectionMatrix|gl_ProjectionMatrixInverse|gl_ProjectionMatrixInverseTranspose|gl_ProjectionMatrixTranspose|gl_SecondaryColor|gl_TexCoord|gl_TextureEnvColor|gl_TextureMatrix|gl_TextureMatrixInverse|gl_TextureMatrixInverseTranspose|gl_TextureMatrixTranspose|gl_Vertex|gl_VertexID)\b/g,
					color: "#F4A460"
				}, {
					regex: /\b(gl_MaxClipPlanes|gl_MaxCombinedTextureImageUnits|gl_MaxDrawBuffers|gl_MaxFragmentUniformComponents|gl_MaxLights|gl_MaxTextureCoords|gl_MaxTextureImageUnits|gl_MaxTextureUnits|gl_MaxVaryingFloats|gl_MaxVertexAttribs|gl_MaxVertexTextureImageUnits|gl_MaxVertexUniformComponents)\b/g,
					color: "#FF4500"
				}, {
					regex: /\b(abs|acos|all|any|asin|atan|ceil|clamp|cos|cross|degrees|dFdx|dFdy|distance|dot|equal|exp|exp2|faceforward|floor|fract|ftransform|fwidth|greaterThan|greaterThanEqual|inversesqrt|length|lessThan|lessThanEqual|log|log2|matrixCompMult|max|min|mix|mod|noise[1-4]|normalize|not|notEqual|outerProduct|pow|radians|reflect|refract|shadow1D|shadow1DLod|shadow1DProj|shadow1DProjLod|shadow2D|shadow2DLod|shadow2DProj|shadow2DProjLod|sign|sin|smoothstep|sqrt|step|tan|texture1D|texture1DLod|texture1DProj|texture1DProjLod|texture2D|texture2DLod|texture2DProj|texture2DProjLod|texture3D|texture3DLod|texture3DProj|texture3DProjLod|textureCube|textureCubeLod|transpose)\b/g,
					color: "#DCDCDC"
				}, {
					regex: /\b(asm|enum|extern|goto|inline|long|short|sizeof|static|typedef|union|unsigned)\b/g,
					color: "#32CD32"
				}], o = 0; o < n.length; o++) e = e.replace(n[o].regex, "<color=" + n[o].color + ">$1</c>");
			return e
		}, a.ShaderFX.Util.generateHighlightShaderCodeFromMaterial = function(e, t) {
			if (!e) return {
				vert: "No material set!",
				frag: "No material set!"
			};
			var n = t || [{
					regex: /\b([0-9]+\.?[0-9]*)|(\.[0-9]+)\b/g,
					color: "#00FFFF"
				}, {
					regex: /\b(false|FALSE|NULL|true|TRUE)\b/g,
					color: "#FF1493"
				}, {
					regex: /(\s*#\s*define|\s*#\s*defined|\s*#\s*elif|\s*#\s*else|\s*#\s*if|\s*#\s*ifdef|\s*#\s*ifndef|\s*#\s*endif|\s*#\s*line|\s*#\s*pragma|\s*#\s*extension|\s*#\s*version|\s*#\s*error|\s*#\s*include|\s*#\s*undef)/g,
					color: "#7FFF00"
				}, {
					regex: /\b(break|case|continue|default|discard|do|else|for|if|return|switch|while)\b/g,
					color: "#7FFF00"
				}, {
					regex: /\b(void|bool|int|uint|float|double|vec[2|3|4]|dvec[2|3|4]|bvec[2|3|4]|ivec[2|3|4]|uvec[2|3|4]|mat[2|3|4]|mat2x2|mat2x3|mat2x4|mat3x2|mat3x3|mat3x4|mat4x2|mat4x3|mat4x4|dmat2|dmat3|dmat4|dmat2x2|dmat2x3|dmat2x4|dmat3x2|dmat3x3|dmat3x4|dmat4x2|dmat4x3|dmat4x4|sampler[1|2|3]D|image[1|2|3]D|samplerCube|imageCube|sampler2DRect|image2DRect|sampler[1|2]DArray|image[1|2]DArray|samplerBuffer|imageBuffer|sampler2DMS|image2DMS|sampler2DMSArray|image2DMSArray|samplerCubeArray|imageCubeArray|sampler[1|2]DShadow|sampler2DRectShadow|sampler[1|2]DArrayShadow|samplerCubeShadow|samplerCubeArrayShadow|isampler[1|2|3]D|iimage[1|2|3]D|isamplerCube|iimageCube|isampler2DRect|iimage2DRect|isampler[1|2]DArray|iimage[1|2]DArray|isamplerBuffer|iimageBuffer|isampler2DMS|iimage2DMS|isampler2DMSArray|iimage2DMSArray|isamplerCubeArray|iimageCubeArray|atomic_uint|usampler[1|2|3]D|uimage[1|2|3]D|usamplerCube|uimageCube|usampler2DRect|uimage2DRect|usampler[1|2]DArray|uimage[1|2]DArray|usamplerBuffer|uimageBuffer|usampler2DMS|uimage2DMS|usampler2DMSArray|uimage2DMSArray|usamplerCubeArray|uimageCubeArray|struct)\b/g,
					color: "#FFD700"
				}, {
					regex: /\b(layout|attribute|centroid|sampler|patch|const|flat|in|inout|invariant|noperspective|out|smooth|uniform|varying|buffer|shared|coherent|readonly|writeonly)\b/g,
					color: "#FF00FF"
				}, {
					regex: /\b(gl_BackColor|gl_BackLightModelProduct|gl_BackLightProduct|gl_BackMaterial|gl_BackSecondaryColor|gl_ClipDistance|gl_ClipPlane|gl_ClipVertex|gl_Color|gl_DepthRange|gl_DepthRangeParameters|gl_EyePlaneQ|gl_EyePlaneR|gl_EyePlaneS|gl_EyePlaneT|gl_Fog|gl_FogCoord|gl_FogFragCoord|gl_FogParameters|gl_FragColor|gl_FragCoord|gl_FragData|gl_FragDepth|gl_FrontColor|gl_FrontFacing|gl_FrontLightModelProduct|gl_FrontLightProduct|gl_FrontMaterial|gl_FrontSecondaryColor|gl_InstanceID|gl_Layer|gl_LightModel|gl_LightModelParameters|gl_LightModelProducts|gl_LightProducts|gl_LightSource|gl_LightSourceParameters|gl_MaterialParameters|gl_ModelViewMatrix|gl_ModelViewMatrixInverse|gl_ModelViewMatrixInverseTranspose|gl_ModelViewMatrixTranspose|gl_ModelViewProjectionMatrix|gl_ModelViewProjectionMatrixInverse|gl_ModelViewProjectionMatrixInverseTranspose|gl_ModelViewProjectionMatrixTranspose|gl_MultiTexCoord[0-7]|gl_Normal|gl_NormalMatrix|gl_NormalScale|gl_ObjectPlaneQ|gl_ObjectPlaneR|gl_ObjectPlaneS|gl_ObjectPlaneT|gl_Point|gl_PointCoord|gl_PointParameters|gl_PointSize|gl_Position|gl_PrimitiveIDIn|gl_ProjectionMatrix|gl_ProjectionMatrixInverse|gl_ProjectionMatrixInverseTranspose|gl_ProjectionMatrixTranspose|gl_SecondaryColor|gl_TexCoord|gl_TextureEnvColor|gl_TextureMatrix|gl_TextureMatrixInverse|gl_TextureMatrixInverseTranspose|gl_TextureMatrixTranspose|gl_Vertex|gl_VertexID)\b/g,
					color: "#F4A460"
				}, {
					regex: /\b(gl_MaxClipPlanes|gl_MaxCombinedTextureImageUnits|gl_MaxDrawBuffers|gl_MaxFragmentUniformComponents|gl_MaxLights|gl_MaxTextureCoords|gl_MaxTextureImageUnits|gl_MaxTextureUnits|gl_MaxVaryingFloats|gl_MaxVertexAttribs|gl_MaxVertexTextureImageUnits|gl_MaxVertexUniformComponents)\b/g,
					color: "#FF4500"
				}, {
					regex: /\b(abs|acos|all|any|asin|atan|ceil|clamp|cos|cross|degrees|dFdx|dFdy|distance|dot|equal|exp|exp2|faceforward|floor|fract|ftransform|fwidth|greaterThan|greaterThanEqual|inversesqrt|length|lessThan|lessThanEqual|log|log2|matrixCompMult|max|min|mix|mod|noise[1-4]|normalize|not|notEqual|outerProduct|pow|radians|reflect|refract|shadow1D|shadow1DLod|shadow1DProj|shadow1DProjLod|shadow2D|shadow2DLod|shadow2DProj|shadow2DProjLod|sign|sin|smoothstep|sqrt|step|tan|texture1D|texture1DLod|texture1DProj|texture1DProjLod|texture2D|texture2DLod|texture2DProj|texture2DProjLod|texture3D|texture3DLod|texture3DProj|texture3DProjLod|textureCube|textureCubeLod|transpose)\b/g,
					color: "#DCDCDC"
				}, {
					regex: /\b(asm|enum|extern|goto|inline|long|short|sizeof|static|typedef|union|unsigned)\b/g,
					color: "#32CD32"
				}],
				o = "",
				i = "";
			e.effectAsset ? (o = e.effectAsset.shaders[0].glsl1.frag, i = e.effectAsset.shaders[0].glsl1.vert) : (o = cc.renderer._forward._programLib.getTemplate(e._effect._effect._technique._passes[0]._programName).frag, i = cc.renderer._forward._programLib.getTemplate(e._effect._effect._technique._passes[0]._programName).vert);
			for (var a = 0; a < n.length; a++) o = o.replace(n[a].regex, "<color=" + n[a].color + ">$1</c>"), i = i.replace(n[a].regex, "<color=" + n[a].color + ">$1</c>");
			return {
				vert: i,
				frag: o
			}
		}, t.exports = a.ShaderFX.Util, cc._RF.pop()
	}, {
		"../namespace/ShaderFXNamespace": "ShaderFXNamespace"
	}],
	json2yaml: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c742eHcDllGdbEN+A1FiU+A", "json2yaml"),
			function(e) {
				var t = "  ";

				function n(e) {
					var t = typeof e;
					return e instanceof Array ? "array" : "string" == t ? "string" : "boolean" == t ? "boolean" : "number" == t ? "number" : "undefined" == t || null === e ? "null" : "hash"
				}

				function o(e, t) {
					switch (n(e)) {
						case "array":
							i(e, t);
							break;
						case "hash":
							a(e, t);
							break;
						case "string":
							s(e, t);
							break;
						case "null":
							t.push("null");
							break;
						case "number":
							t.push(e.toString());
							break;
						case "boolean":
							t.push(e ? "true" : "false")
					}
				}

				function i(e, n) {
					0 === e.length && n.push("[]");
					for (var i = 0; i < e.length; i++) {
						var a = [];
						o(e[i], a);
						for (var r = 0; r < a.length; r++) n.push((0 == r ? "- " : t) + a[r])
					}
				}

				function a(e, i) {
					for (var a in e) {
						var s = [];
						if (e.hasOwnProperty(a)) {
							var c = e[a];
							o(c, s);
							var l = n(c);
							if ("string" == l || "null" == l || "number" == l || "boolean" == l) i.push(r(a) + ": " + s[0]);
							else {
								i.push(r(a) + ": ");
								for (var h = 0; h < s.length; h++) i.push(t + s[h])
							}
						}
					}
				}

				function r(e) {
					return e.match(/^[\w]+$/) ? e : '"' + escape(e).replace(/%u/g, "\\u").replace(/%U/g, "\\U").replace(/%/g, "\\x") + '"'
				}

				function s(e, t) {
					t.push(r(e))
				}
				e.json2yaml = function(e) {
					"string" == typeof e && (e = JSON.parse(e));
					var t = [];
					return o(e, t), t.join("\n")
				}
			}(window), cc._RF.pop()
	}, {}],
	test: [function(e, t) {
		"use strict";
		cc._RF.push(t, "70729WNT8xOH4sfwXPZ4ng6", "test"), cc.Class({
			extends: cc.Component,
			properties: {},
			editor: !1,
			onLoad: function() {},
			start: function() {
				cc.systemEvent.on("digraph-editor-plugin:p2c_test", this._onDigraphEditorPlugin_p2c_test, this)
			},
			_onDigraphEditorPlugin_p2c_test: function(e) {
				cc.log("_onDigraphEditorPlugin_p2c_test"), cc.log(e.getUserData())
			}
		}), cc._RF.pop()
	}, {}]
}, {}, ["Box", "DigraphEditorCommandBase", "DigraphEditorCommandCanvasZoomIn", "DigraphEditorCommandCanvasZoomOut", "DigraphEditorCommandConnectionLink", "DigraphEditorCommandConnectionCreate", "DigraphEditorCommandDigraphUpdate", "DigraphEditorCommandPanelGroup", "DigraphEditorCommandPanelUngroup", "DigraphEditorCommandPanelCreate", "DigraphEditorCommandPanelDeselect", "DigraphEditorCommandPanelGroupSelect", "DigraphEditorCommandPanelMoveTo", "DigraphEditorCommandPanelRemove", "DigraphEditorCommandPanelSelect", "DigraphEditorCommandPanelTouchEnd", "DigraphEditorCommandPanelTouchMove", "DigraphEditorCommandPanelTouchStart", "DigraphEditorCommandSelectionTouch", "DigraphEditorCommandPanel", "DigraphEditorContextMenu", "DigraphEditorCore", "DigraphEditorDigraphPanel", "DigraphEditorHotkey", "DigraphEditorMenu", "DigraphEditorToolBar", "DigraphEditorConst", "DigraphEditorDigraph", "DigraphEditorLayerAccount", "DigraphEditorLayerCanvas", "DigraphEditorLayerConnection", "DigraphEditorLayerCustomComponent", "DigraphEditorLayerCustomComponentList", "DigraphEditorLayerCustomComponentMissingResolve", "DigraphEditorLayerFXComponentExporter", "DigraphEditorLayerFXComponentLibrary", "DigraphEditorLayerFooter", "DigraphEditorLayerGroup", "DigraphEditorLayerInputField", "DigraphEditorLayerMessageBox", "DigraphEditorLayerMessageLayer", "DigraphEditorLayerPanel", "DigraphEditorLayerProjectGallery", "DigraphEditorLayerProjectList", "DigraphEditorLayerSelection", "DigraphEditorLayerTexturePreview", "DigraphEditorLayerTutorial", "DigraphEditorLayerVideo", "DigraphEditorCanvasManager", "DigraphEditorCommandManager", "DigraphEditorConnectionManager", "DigraphEditorCustomComponentManager", "DigraphEditorDigraphManager", "DigraphEditorDirector", "DigraphEditorGroupManager", "DigraphEditorPanelManager", "DigraphEditorProjectManager", "DigraphEditorSlotManager", "DigraphEditorNamespace", "DigraphEditorPrefabCommand", "DigraphEditorPrefabConnection", "DigraphEditorPrefabContextMenuItem", "DigraphEditorPrefabGroup", "DigraphEditorPrefabInputSlot", "DigraphEditorPrefabOutputSlot", "DigraphEditorPrefabPanel", "DigraphEditorPrefabSlot", "DigraphEditorPrefabToast", "DigraphEditorDnDUtil", "DigraphEditorUtil", "FBONodeCaptureComponent", "FBONodeCloneComponent", "FBONodeComponent", "FBONodeGhostComponent", "FBONodeInPlaceComponent", "FBONodeRegionComponent", "FBONodeScreenComponent", "FBONodeTargetComponent", "FBONamespace", "json2yaml", "ShaderFXConst", "ShaderFXData", "ShaderFXCustomComponentInfoPrefab", "ShaderFXGalleryPrefab", "ShaderFXGalleryTagPrefab", "ShaderFXMissingCustomComponentInfoPrefab", "ShaderFXMyCustomComponentInfoPrefab", "ShaderFXPrefabCategoryPrefab", "ShaderFXPrefabCustomComponentBool", "ShaderFXPrefabCustomComponentColor", "ShaderFXPrefabCustomComponentFloat", "ShaderFXPrefabCustomComponentTexture", "ShaderFXPrefabCustomComponentVec2", "ShaderFXPrefabCustomComponentVec3", "ShaderFXPrefabCustomComponentVec4", "ShaderFXPrefabDropDownInfo", "ShaderFXPrefabExtendPanel", "ShaderFXPrefabFXComponentPrefab", "ShaderFXPrefabFilterMode", "ShaderFXPrefabOutputPanel", "ShaderFXPrefabPackMode", "ShaderFXPrefabPanel", "ShaderFXPrefabProjectInfo", "ShaderFXPrefabProjectPanel", "ShaderFXPrefabProjectUniform", "ShaderFXPrefabProjectUniformColor", "ShaderFXPrefabProjectUniformFloat", "ShaderFXPrefabProjectUniformTexture", "ShaderFXPrefabProjectUniformVec2", "ShaderFXPrefabProjectUniformVec3", "ShaderFXPrefabProjectUniformVec4", "ShaderFXPrefabRefPanel", "ShaderFXPrefabSample", "ShaderFXPrefabSampleInputContent", "ShaderFXPrefabScalarTypeColor3Panel", "ShaderFXPrefabScalarTypeColor4Panel", "ShaderFXPrefabScalarTypeFloatPanel", "ShaderFXPrefabScalarTypePanel", "ShaderFXPrefabScalarTypeVec2Panel", "ShaderFXPrefabScalarTypeVec3Panel", "ShaderFXPrefabScalarTypeVec4Panel", "ShaderFXPrefabSpinePanel", "ShaderFXPrefabUniform", "ShaderFXPrefabUniformColor", "ShaderFXPrefabUniformColorEx", "ShaderFXPrefabUniformColorPanel", "ShaderFXPrefabUniformEditBox", "ShaderFXPrefabUniformFloatPanel", "ShaderFXPrefabUniformOutput", "ShaderFXPrefabUniformSlider", "ShaderFXPrefabUniformSliderEx", "ShaderFXPrefabUniformSpineSkeleton", "ShaderFXPrefabUniformTexture", "ShaderFXPrefabUniformTexturePanel", "ShaderFXPrefabUniformTexturePreview", "ShaderFXPrefabUniformTime0Panel", "ShaderFXPrefabUniformTimePanel", "ShaderFXPrefabUniformToggle", "ShaderFXPrefabUniformVec2Panel", "ShaderFXPrefabUniformVec3Panel", "ShaderFXPrefabUniformVec4Panel", "ShaderFXPrefabWrapMode", "ShaderFXSampleTagPrefab", "ShaderFXNamespace", "ShaderFXCustomComponentUtil", "ShaderFXDnDUtil", "ShaderFXExporterUtil", "ShaderFXLeanCloudUtil", "ShaderFXProjectUtil", "ShaderFXRestUtil", "ShaderFXUtil", "test"]);