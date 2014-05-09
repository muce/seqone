function Sequencer(context, bpm, channels, draw) {
	//alert("Sequencer "+context+", "+bpm+", "+channels);
	this.audioContext = context;
	this.channels = channels;
	//this.debugAudio = debugAudio;
	//this.debugUI = debugUI;
	this.draw = draw;
	
	this.metronome = false;			// switch on metronome
	this.isPlaying = false;      	// Are we currently playing?
	this.startTime;              	// The start time of the entire sequence.
	this.current32ndNote;        	// What note is currently last scheduled?
	this.quantize = 32;				// beat resolution
	this.tempo = bpm;          		// tempo (in beats per minute)
	this.lookahead = 25.0;       	// How frequently to call scheduling function (in milliseconds)
	this.scheduleAheadTime = 0.1;   // How far ahead to schedule audio (sec)
	                            	// This is calculated from lookahead, and overlaps 
	                            	// with next interval (in case the timer is late)
	this.nextNoteTime = 0.0;     	// when the next note is due.
	this.beepLength = 0.05;      	// length of "beep" (in seconds)
	this.timerID = 0;            	// setInterval identifier.

	this.last32ndNoteDrawn = -1; 	// the last "box" we drew on the screen
	this.notesInQueue = [];      	// the notes that have been put into the web audio,
	                            	// and may or may not have played yet. {note, time}
	                
	this.patch = [];       	
	this.grid = [];
	
	this.gain = 0;
	
};

Sequencer.prototype.init = function() {
	var self = this;
	window.requestAnimFrame(function() {self.update.call(self);});
};

Sequencer.prototype.start = function(restart) {
    if (!this.isPlaying) {
    	this.isPlaying = true;
        if (!restart) this.current32ndNote = 0;
        this.nextNoteTime = this.audioContext.currentTime;
        this.scheduler();    // kick off scheduling
    }
};

Sequencer.prototype.stop = function() {
	if (this.isPlaying) {
		this.isPlaying = false;
		window.clearTimeout(this.timerID);
	} else this.start(true);
};

Sequencer.prototype.playSound = function(buffer, time) {
	var source = this.audioContext.createBufferSource();
	source.buffer = buffer;
	var gain = this.audioContext.createGain();
	source.connect(gain);
	gain.connect(this.audioContext.destination);
	gain.gain.value = this.gain;
	source.start(time);
};

Sequencer.prototype.scheduler = function() {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
    	for (var c=0; c<this.grid.length; c++) {
    		if (this.grid[c][this.current32ndNote]>0) {
    			this.playSound(this.patch[c], this.nextNoteTime);
    		}
    	}
        if (this.metronome) this.scheduleNote(this.current32ndNote, this.nextNoteTime);
        this.nextNote();
    }
   	var self = this;
   	this.timerID = window.setTimeout(function() {self.scheduler.call(self);}, this.lookahead);
};


Sequencer.prototype.scheduleNote = function(beatNumber, time) {
    this.notesInQueue.push({note: beatNumber, time: time});
	
    // create an oscillator
    var osc = this.audioContext.createOscillator();
    osc.connect(this.audioContext.destination);
    if (beatNumber % (this.quantize/4) === 0) {
        osc.frequency.value = 220.0;
        osc.start(time);
        osc.stop(time + this.beepLength);
    } else if (beatNumber % (this.quantize/8) === 0) {
        osc.frequency.value = 330.0;
        osc.start(time);
        osc.stop(time + this.beepLength);
    }
    
};

Sequencer.prototype.nextNote = function() {
    var secondsPerBeat = 60.0 / this.tempo; // realtime update tempo
    this.nextNoteTime += 4 * secondsPerBeat / this.quantize; // 4 beats per bar
    this.current32ndNote++;
    if (this.current32ndNote == this.quantize) // wrap current note at quantize resolution
        this.current32ndNote = 0;
};

Sequencer.prototype.update = function() {
    var currentNote = this.last32ndNoteDrawn;
    var currentTime = this.audioContext.currentTime;
	
    while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
        currentNote = this.notesInQueue[0].note;
        this.notesInQueue.splice(0,1);   // remove note from queue
    }
    
	this.draw(this.current32ndNote);
	
    // set up to draw again
    var self = this;
    window.requestAnimFrame(function() {self.update.call(self);});
};

Sequencer.prototype.setGrid = function(grid) {
	this.grid = grid;
};

Sequencer.prototype.setPatch = function(patch) {
	this.patch = patch;
};

Sequencer.prototype.setTempo = function(tempo) {
	this.tempo = tempo;
};

Sequencer.prototype.setGain = function(gain) {
	this.gain = gain;
};






