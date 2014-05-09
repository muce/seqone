var UI = (function() {

	var pattern = [];
	var matrix = [];
	var buffer = [];
	var buttons = {};
	var root, info, controls, audioDebug, uiDebug;
	var txtTempo;

	return {
		
		init : function(args) {
			
			root = document.getElementById("matrix");
			info = document.getElementById("info");
			controls = document.getElementById("knob-wrapper");
			audioDebug = document.getElementById("audio-debug");
			uiDebug = document.getElementById("ui-debug");
			info.innerHTML = "PATCH LOADED";
			txtTempo = document.getElementById("tempo");
			txtTempo.innerHTML = "120";
			
			//window.onorientationchange = resetCanvas;
			//window.onresize = resetCanvas;
			
			matrix[0] = new Matrix(root, 11, 32, update);
			matrix[0].init();
			var g = [];
			/*
			for (var i=0; i<11; i++) {
				g[i] = new Array(32);
				for (var j=0; j<32; j++) {
					g[i][j] = Math.random()>0.1 ? 0 : 1;
				}
			}
			matrix[0].load(g);
			*/
			buttons = {
				"start" : document.getElementById("start"),
				"stop" : document.getElementById("stop"),
				"clear" : document.getElementById("clear"),
				"save" : document.getElementById("save")
			};

			buttons["start"].addEventListener("click", function() {
				sequencer.start();
			}, false);
			buttons["stop"].addEventListener("click", function() {
				sequencer.stop();
			}, false);
			buttons["clear"].addEventListener("click", function() {
				matrix[0].clear();
			}, false);
			buttons["save"].addEventListener("click", function() {
				matrix[0].get();
			}, false);

		},

		update : function(note) {
			matrix[0].update(note);
		},

		resetCanvas : function(e) {
			//canvas.width = window.innerWidth;
			//canvas.height = window.innerHeight;
			//window.scrollTo(0, 0);
		},

		debugAudio : function(s) {
			audioDebug.innerHTML = s;
		},

		debugUI : function(s) {
			uiDebug.innerHTML = s;
		}, 
		
		setTempo : function(val) {
			txtTempo.innerHTML = val;
		}, 
		
		addComponent : function(c, x, y) {
			controls.appendChild(c);
		},
		
		createButton : function(id, label, onClick) {
			
		}, 

		createKnob : function(id, label, width, x, y, min, max, currentValue, color, onChange) {
			//alert("UI.createKnob" +id+" "+label+" "+width+" "+x+" "+y+" "+min+" "+max+" "+currentValue+" "+color+" "+onChange);
			var container = document.createElement("div");
			container.className = "control";
			container.style.left = "" + x + "px";
			container.style.top = "" + y + "px";
			
			var knob = document.createElement("webaudio-knob");
			knob.id = id;
			knob.setAttribute("value", "" + currentValue);
			knob.setAttribute("src", "images/webaudio-controls/LittlePhatty.png");
			knob.setAttribute("min", "" + min);
			knob.setAttribute("max", "" + max);
			knob.setAttribute("step", (max - min) / 100);
			knob.setAttribute("diameter", "64");
			knob.setAttribute("sprites", "100");
			knob.setAttribute("tooltip", label);
			knob.onchange = onChange;

			container.appendChild(knob);

			var labelText = document.createElement("div");
			labelText.className = "knobLabel";
			labelText.style.top = "" + (width * 0.85) + "px";
			labelText.style.width = "" + width + "px";
			labelText.appendChild(document.createTextNode(label));

			container.appendChild(labelText);
			controls.appendChild(container);
			
			return container;
		}
	};

})();
