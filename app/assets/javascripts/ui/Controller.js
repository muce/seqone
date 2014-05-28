var Controller = function(name, sequencer) {
	this.name = name;
	this.sequencer = sequencer;
	this.knobs = [];
};

Controller.prototype.init = function() {
	var self = this;
	var bgcolour = "#ff0000";
	this.knobs["tempo"] = UI.createKnob("knob-tempo", "tempo", 32, 250, 280, 20, 200, 120, bgcolour, function(e) {self.tempochange(e);});
	this.knobs["volume"] = UI.createKnob("knob-volume", "volume", 32, 654, 280, 0, 1, 0.8, bgcolour, function(e) {self.volumechange(e);});
	this.knobs["bass-drum-tune"] = UI.createKnob("knob-bass-drum-tune", "tune", 22, 148, 196, 0, 1, 0.8, bgcolour, function(e) {self.tunechange(e);});
	this.knobs["bass-drum-level"] = UI.createKnob("knob-bass-drum-level", "level", 22, 178, 196, 0, 1, 0.8, bgcolour, function(e) {self.levelchange(e);});
	this.knobs["bass-drum-attack"] = UI.createKnob("knob-bass-drum-attack", "attack", 22, 148, 226, 0, 1, 0.8, bgcolour, function(e) {self.attackchange(e);});
	this.knobs["bass-drum-decay"] = UI.createKnob("knob-bass-drum-decay", "decay", 22, 178, 226, 0, 1, 0.8, bgcolour, function(e) {self.decaychange(e);});
};

Controller.prototype.tempochange = function(e) {
	sequencer.setTempo(parseInt(e.target.value));
	UI.debugAudio(e.target.value);
	UI.setTempo(parseInt(e.target.value));
};

Controller.prototype.volumechange = function(e) {
	UI.debugUI(e.target.value);
	this.sequencer.setGain(e.target.value);
};

Controller.prototype.tunechange = function(e) {
	
};

Controller.prototype.levelchange = function(e) {
	
};

Controller.prototype.attackchange = function(e) {
	
};

Controller.prototype.decaychange = function(e) {
	
};
