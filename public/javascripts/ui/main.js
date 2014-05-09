var txtTempo;

function initUI() {
    
	root = document.getElementById("matrix");
	info = document.getElementById("info");
	audioDebug = document.getElementById("audio-debug");
	uiDebug = document.getElementById("ui-debug");
	info.innerHTML = "PATCH LOADED";
	txtTempo = document.getElementById("tempo");
	txtTempo.innerHTML = "120";
	
	//txtTempo = document.getElementById("tempo");
	
	//window.onorientationchange = resetCanvas;
    //window.onresize = resetCanvas;
	
	matrix[0] = new Matrix(root, buffer.length, 32, update);
	matrix[0].init();
	
	buttons = {"start" : document.getElementById("start"), 
			   "stop" : document.getElementById("stop"), 
			   "clear" : document.getElementById("clear"), 
			   "save" : document.getElementById("save")};
			   
	buttons["start"].addEventListener("click", function() {sequencer.start();}, false);
	buttons["stop"].addEventListener("click", function() {sequencer.stop();}, false);
	buttons["clear"].addEventListener("click", function() {matrix[0].clear();}, false);
	buttons["save"].addEventListener("click", function() {matrix[0].get();}, false);
	
}

function resetCanvas(e) {
    // resize the canvas - but remember - this clears the canvas too.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.scrollTo(0, 0); 
}

function debugAudio(str) {
	audioDebug.innerHTML = str;
}

function debugUI(str) {
	uiDebug.innerHTML = str;
}

function createKnob( id, label, width, x, y, min, max, currentValue, color, onChange ) {
	var container = document.createElement( "div" );
	container.className = "knobContainer";
	container.style.left = "" + x + "px";
	container.style.top = "" + y + "px";

/*
	var knob = document.createElement( "input" );
	knob.className = "knob";
	knob.id = id;
	knob.value = currentValue;
	if (label == "detune")
		knob.setAttribute( "data-cursor", true );
	knob.setAttribute( "data-min", min );
	knob.setAttribute( "data-max", max );
	knob.setAttribute( "data-width", width );
	knob.setAttribute( "data-angleOffset", "-125" );
	knob.setAttribute( "data-angleArc", "250" );
	knob.setAttribute( "data-fgColor", color );

*/
	var knob = document.createElement( "webaudio-knob" );
//	knob.className = "knob";
	knob.id = id;
	knob.setAttribute( "value", "" + currentValue );
	knob.setAttribute( "src", "img/LittlePhatty.png" );
	knob.setAttribute( "min", ""+min );
	knob.setAttribute( "max", ""+max );
	knob.setAttribute( "step", (max-min)/100 );
	knob.setAttribute( "diameter", "64" );
	knob.setAttribute( "sprites", "100" );
	knob.setAttribute( "tooltip", label );
	knob.onchange = onChange;
//	knob.setValue( currentValue );

	container.appendChild( knob );

	var labelText = document.createElement( "div" );
	labelText.className = "knobLabel";
	labelText.style.top = "" + (width* 0.85) + "px";
	labelText.style.width = "" + width + "px";
	labelText.appendChild( document.createTextNode( label ) );

	container.appendChild( labelText );

//	$( knob ).knob({ 'change' : onChange });

	return container;
}