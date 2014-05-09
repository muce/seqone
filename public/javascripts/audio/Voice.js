function Voice( note, velocity ) {
	this.originalFrequency = frequencyFromNoteNumber( note );

	// create osc 1
	this.osc1 = audioContext.createOscillator();
	this.updateOsc1Frequency();
	this.osc1.type = waveforms[currentOsc1Waveform];

	this.osc1Gain = audioContext.createGain();
	this.osc1Gain.gain.value = 0.005 * currentOsc1Mix;
//	this.gain.gain.value = 0.05 + (0.33 * velocity);
	this.osc1.connect( this.osc1Gain );

	// create osc 2
	this.osc2 = audioContext.createOscillator();
	this.updateOsc2Frequency();
	this.osc2.type = waveforms[currentOsc2Waveform];

	this.osc2Gain = audioContext.createGain();
	this.osc2Gain.gain.value = 0.005 * currentOsc2Mix;
	this.osc2.connect( this.osc2Gain );

	// create modulator osc
	this.modOsc = audioContext.createOscillator();
	this.modOsc.type = 	waveforms[currentModWaveform];
	this.modOsc.frequency.value = currentModFrequency * modOscFreqMultiplier;

	this.modOsc1Gain = audioContext.createGain();
	this.modOsc.connect( this.modOsc1Gain );
	this.modOsc1Gain.gain.value = currentModOsc1/10;
	this.modOsc1Gain.connect( this.osc1.frequency );	// tremolo

	this.modOsc2Gain = audioContext.createGain();
	this.modOsc.connect( this.modOsc2Gain );
	this.modOsc2Gain.gain.value = currentModOsc2/10;
	this.modOsc2Gain.connect( this.osc2.frequency );	// tremolo

	// create the LP filter
	this.filter1 = audioContext.createBiquadFilter();
	this.filter1.type = this.filter1.LOWPASS;
	this.filter1.Q.value = currentFilterQ;
	this.filter2 = audioContext.createBiquadFilter();
	this.filter2.type = this.filter2.LOWPASS;
	this.filter2.Q.value = currentFilterQ;

	this.osc1Gain.connect( this.filter1 );
	this.osc2Gain.connect( this.filter1 );
	this.filter1.connect( this.filter2 );

	// connect the modulator to the filters
	this.modFilterGain = audioContext.createGain();
	this.modOsc.connect( this.modFilterGain );
	this.modFilterGain.gain.value = currentFilterMod*24;
	this.modFilterGain.connect( this.filter1.detune );	// filter tremolo
	this.modFilterGain.connect( this.filter2.detune );	// filter tremolo

	// create the volume envelope
	this.envelope = audioContext.createGain();
	this.filter2.connect( this.envelope );
	this.envelope.connect( effectChain );

	// set up the volume and filter envelopes
	var now = audioContext.currentTime;
	var envAttackEnd = now + (currentEnvA/20.0);

	this.envelope.gain.value = 0.0;
	this.envelope.gain.setValueAtTime( 0.0, now );
	this.envelope.gain.linearRampToValueAtTime( 1.0, envAttackEnd );
	this.envelope.gain.setTargetAtTime( (currentEnvS/100.0), envAttackEnd, (currentEnvD/100.0)+0.001 );

    var pitchFrequency = this.originalFrequency;
    var filterInitLevel = filterFrequencyFromCutoff( pitchFrequency, currentFilterCutoff/100 );
	var filterAttackLevel = filterFrequencyFromCutoff( pitchFrequency, currentFilterCutoff/100 + 
		(currentFilterEnv/120) );
	var filterSustainLevel = filterFrequencyFromCutoff( pitchFrequency, currentFilterCutoff/100 + 
		((currentFilterEnv/120) * (currentFilterEnvS/100.0)) );
	var filterAttackEnd = now + (currentFilterEnvA/20.0);

/*
	console.log( "pitchFrequency: " + pitchFrequency + " filterInitLevel: " + filterInitLevel + 
				 " filterAttackLevel: " + filterAttackLevel + " filterSustainLevel: " + filterSustainLevel );
*/	this.filter1.frequency.value = filterInitLevel;
	this.filter1.frequency.setValueAtTime( filterInitLevel, now );
	this.filter1.frequency.linearRampToValueAtTime( filterAttackLevel, filterAttackEnd );
	this.filter1.frequency.setTargetAtTime( filterSustainLevel, filterAttackEnd, (currentFilterEnvD/100.0) );
	this.filter2.frequency.value = filterInitLevel;
	this.filter2.frequency.setValueAtTime( filterInitLevel, now );
	this.filter2.frequency.linearRampToValueAtTime( filterAttackLevel, filterAttackEnd );
	this.filter2.frequency.setTargetAtTime( filterSustainLevel, filterAttackEnd, (currentFilterEnvD/100.0) );

	this.osc1.start(0);
	this.osc2.start(0);
	this.modOsc.start(0);
};

Voice.prototype.setModWaveform = function( value ) {
	this.modOsc.type = value;
};

Voice.prototype.updateModFrequency = function( value ) {
	this.modOsc.frequency.value = value;
};

Voice.prototype.updateModOsc1 = function( value ) {
	this.modOsc1Gain.gain.value = value/10;
};

Voice.prototype.updateModOsc2 = function( value ) {
	this.modOsc2Gain.gain.value = value/10;
};

Voice.prototype.setOsc1Waveform = function( value ) {
	this.osc1.type = value;
};

Voice.prototype.updateOsc1Frequency = function( value ) {
	this.osc1.frequency.value = (this.originalFrequency*Math.pow(2,currentOsc1Octave-2));  // -2 because osc1 is 32', 16', 8'
	this.osc1.detune.value = currentOsc1Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
};

Voice.prototype.updateOsc1Mix = function( value ) {
	this.osc1Gain.gain.value = 0.005 * value;
};

Voice.prototype.setOsc2Waveform = function( value ) {
	this.osc2.type = value;
};

Voice.prototype.updateOsc2Frequency = function( value ) {
	this.osc2.frequency.value = (this.originalFrequency*Math.pow(2,currentOsc2Octave-1));
	this.osc2.detune.value = currentOsc2Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
};

Voice.prototype.updateOsc2Mix = function( value ) {
	this.osc2Gain.gain.value = 0.005 * value;
};

Voice.prototype.setFilterCutoff = function( value ) {
	var now =  audioContext.currentTime;
	var filterFrequency = filterFrequencyFromCutoff( this.originalFrequency, value/100 );
	this.filter1.frequency.cancelScheduledValues( now );
	this.filter1.frequency.setValueAtTime( filterFrequency, now );
	this.filter2.frequency.cancelScheduledValues( now );
	this.filter2.frequency.setValueAtTime( filterFrequency, now );
};

Voice.prototype.setFilterQ = function( value ) {
	this.filter1.Q.value = value;
	this.filter2.Q.value = value;
};

Voice.prototype.setFilterMod = function( value ) {
	this.modFilterGain.gain.value = currentFilterMod*24;
};

Voice.prototype.noteOff = function() {
	var now =  audioContext.currentTime;
	var release = now + (currentEnvR/10.0);	
    var initFilter = filterFrequencyFromCutoff( this.originalFrequency, currentFilterCutoff/100 * (1.0-(currentFilterEnv/100.0)) );
	
//    console.log("noteoff: now: " + now + " val: " + this.filter1.frequency.value + " initF: " + initFilter + " fR: " + currentFilterEnvR/100 );
	this.envelope.gain.cancelScheduledValues(now);
	this.envelope.gain.setValueAtTime( this.envelope.gain.value, now );  // this is necessary because of the linear ramp
	this.envelope.gain.setTargetAtTime(0.0, now, (currentEnvR/100));
	this.filter1.frequency.cancelScheduledValues(now);
	this.filter1.frequency.setValueAtTime( this.filter1.frequency.value, now );  // this is necessary because of the linear ramp
	this.filter1.frequency.setTargetAtTime( initFilter, now, (currentFilterEnvR/100.0) );
	this.filter2.frequency.cancelScheduledValues(now);
	this.filter2.frequency.setValueAtTime( this.filter2.frequency.value, now );  // this is necessary because of the linear ramp
	this.filter2.frequency.setTargetAtTime( initFilter, now, (currentFilterEnvR/100.0) );

	this.osc1.stop( release );
	this.osc2.stop( release );
};

