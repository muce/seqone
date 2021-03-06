var pattern = [];
var matrix = [];
var buffer = [];

var sequencer;
var controller;
var mixer;
var audioContext;
var animFrame;

var root, info, audioDebug, uiDebug;


function init() {
	
    // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
    // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
    audioContext = new AudioContext();
    
	window.requestAnimFrame = (function(){
	    return  window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.oRequestAnimationFrame ||
	    window.msRequestAnimationFrame ||
	    function(callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	})();
    
	var kit = 	["/audio/DMD-FR909/FR909 Kicks/FR9 distkck/f9dstk01.wav",
				 /*"/audio/samples/air.wav",*/
				 "/audio/DMD-FR909/FR909 Snares/FR9 tightsnrs/f9tsnr01.wav", 
				 "/audio/DMD-FR909/FR909 Toms/FR9 ltoms1/f9ltm01.wav", 
				 "/audio/DMD-FR909/FR909 Toms/FR9 mtoms1/f9mtom01.wav", 
				 "/audio/DMD-FR909/FR909 Toms/FR9 htoms1/f9htom01.wav", 
				 "/audio/DMD-FR909/FR909 Rim/f9rim01.wav", 
				 "/audio/DMD-FR909/FR909 Clap/f9clp01.wav", 
				 "/audio/DMD-FR909/FR909 Hats/FR9 openhat/f9opht01.wav", 
				 "/audio/DMD-FR909/FR909 Hats/FR9 clsdhat/f9clht01.wav", 
				 "/audio/DMD-FR909/FR909 Crash/f9crsh01.wav", 
				 "/audio/DMD-FR909/FR909 Ride/f9ride01.wav"
				 ];

	pattern[0] = new Pattern("test", 4, 32, 13);
	pattern[0].test();
	
	buffer = new Array(kit.length);
	var bufferLoader = new BufferLoader(audioContext, loaded);
	bufferLoader.loadPatch(kit);
	// pattern[0] = new Pattern(32, 9);
	
}

function loaded(buf) {
	buffer = buf;
	sequencer = new Sequencer(audioContext, 120, buffer.length+1, draw);
	sequencer.init();
	sequencer.setPatch(buffer);
	sequencer.setPattern(pattern[0]);
	mixer = new Mixer(13);
	mixer.init();
	UI.init();
	UI.setMatrix(pattern[0]);
	controller = new Controller("TR-909", sequencer);
	UI.setController(controller);
	controller.init();
	UI.setMixer(mixer);
	//UI.createKnobs();
	//var knobTest = UI.createKnob("knob-test", "test", 364, 100, 100, 0, 100, 50, "#dddddd", volumechange);
}

function tempochange(e) {
	sequencer.setTempo(parseInt(e.target.value));
	UI.debugAudio(e.target.value);
	UI.setTempo(parseInt(e.target.value));
}

function volumechange(e) {
	//alert("volumechange "+e.target.value);
	UI.debugUI(e.target.value);
	sequencer.setGain(e.target.value);
}

function draw(note) {
	UI.update(parseInt(note)||0);
	//matrix[0].update(parseInt(note)||0);
}

function update(grid) {
	//alert("main update");
	sequencer.setGrid(grid);
}

document.addEventListener("DOMContentLoaded", function() {init();});
