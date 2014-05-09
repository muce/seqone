// instance variables and methods
var Loop = function(i) {
	this.i = i;
	this.count = 0;
	this.l = "instance ";
};

// class variables and methods
Loop.prototype = (function() {
	var l = "class ";
	var count = 0;
	
	return {
		getLocal : function() {
			return this.l+(this.count++)+" "+l+(count++);
		}
	};
})();
