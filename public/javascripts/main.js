var pattern = [];
var matrix = [];
var buffer = [];

var buttons = {};

var sequencer;
var audioContext;
var animFrame;

var root, info, audioDebug, uiDebug;

var txtTempo;


function init() {
	
    // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
    // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
    audioContext = new AudioContext();
    
	// First, let's shim the requestAnimationFrame API, with a setTimeout fallback
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
    
	var patch = ["/audio/DMD-FR909/FR909 Kicks/FR9 distkck/f9dstk01.wav", 
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
	
	buffer = new Array(patch.length);
	var bufferLoader = new BufferLoader(audioContext, loaded);
	bufferLoader.loadPatch(patch);
	// pattern[0] = new Pattern(32, 9);
	
}

function loaded(buf) {
	buffer = buf;
	sequencer = new Sequencer(audioContext, 120, buffer.length+1, debugAudio, debugUI, draw);
	initUI();
	sequencer.init();
	sequencer.setPatch(buffer);
}

function draw(note) {
	matrix[0].update(parseInt(note)||0);
}

function update(grid) {
	sequencer.setGrid(grid);
}

document.addEventListener("DOMContentLoaded", function() {init();});
