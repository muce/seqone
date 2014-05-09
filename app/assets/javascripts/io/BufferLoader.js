function BufferLoader(context, callback) {
	// alert("BufferLoader context: "+context+", callback: "+callback);
	this.context = context;
	this.callback = callback;
	this.buffer = [];
	this.loadcount = 0;
};

BufferLoader.prototype.loadPatch = function(patch) {
	this.buffer = new Array(patch.length);
	for (var i=0; i<patch.length; i++)
		this.load(patch[i], i);
};

BufferLoader.prototype.load = function(path, i) {
	// load path and callback to loaded stack
	var request = new XMLHttpRequest();
	request.open('GET', path, true);
    request.responseType = 'arraybuffer';
    request.context = this.context;
    request.callback = this.callback;
    
    var self = this;
    request.onload = function(evt) {
    	var buf = this.context.createBuffer(evt.target.response, false);
    	self.loaded.call(self, buf, i);
    };
    
    request.onerror = function() {
    	alert("onerror");
    };
    
    request.send();
};

BufferLoader.prototype.loaded = function(buf, idx) {
	//alert("loaded "+idx+" out of "+this.buffer.length);
	this.buffer[idx] = buf;
	if (++this.loadcount==this.buffer.length)
		this.callback(this.buffer);
};
