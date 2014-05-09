var Matrix = function(el, rows, cols, callback) {
	this.el = el;
	this.rows = rows;
	this.cols = cols;
	this.grid = [];
	this.cells = [];
	this.callback = callback;
};

Matrix.prototype.init = function() {
	
	for (var i=0; i<this.rows; i++)
		this.grid[i] = new Array(this.cols);
	for (var i=0; i<this.rows+1; i++)
		this.cells[i] = new Array(this.cols);
	
	var table = document.createElement("table");
	table.className = "grid";
	var callback = this.onclick;
	var g = this.grid;
	var cb = this.callback;
	/*
	var tr = table.appendChild(document.createElement("tr"));
	for (var i=0; i<this.cols; i++) {
		var td = this.cells[0][i] = tr.appendChild(document.createElement("td"));
		if (i%8==0) td.innerHTML = "_";
		else td.innerHTML = ".";
	}
	*/
	for (var i=0; i<this.rows; i++) {
		var tr = table.appendChild(document.createElement("tr"));
		for (var j=0; j<this.cols; j++) {
			this.grid[i][j] = 0;
			var td = this.cells[i+1][j] = tr.appendChild(document.createElement("td"));
			td.innerHTML = " ";
			td.addEventListener("click", (function(r, c, g) {
				return function(e) {
					callback(e.target, r, c, g, cb);
				};
			})(i, j, g), false);
		}
	}
	
	this.el.appendChild(table);
	this.callback(this.grid);
	
};

Matrix.prototype.onclick = function(el, r, c, g, cb) {
	if (g[r][c]==0) {
		g[r][c] = 1;
		el.className = "on";
	} else if (g[r][c]==1) {
		g[r][c] = 2;
		el.className = "accent";
	} else {
		g[r][c] = 0;
		el.className = "";
	}
	cb(g);
};

Matrix.prototype.load = function(grid) {
	this.grid = grid;
	for (var j=0; j<11; j++) {
		for (var i=0; i<32; i++) {
			this.cells[j+1][i].className = this.grid[j][i]>0 ? "on" : "";
		}
	}
	this.callback(this.grid);
};

Matrix.prototype.clear = function() {
	for (var i=0; i<this.rows+1; i++) {
		for (var j=0; j<this.cols; j++) {
			if (i<this.rows) this.grid[i][j] = 0;
			this.cells[i][j].className = "";
		}
	}
	this.callback(this.grid);
};

Matrix.prototype.get = function() {
	return this.grid;
};

Matrix.prototype.update = function(note) {
	for (var i=0; i<this.cells.length; i++) {
		for (var j=1; j<5; j++) {
			this.cells[i][j].className = "accent";
		}
	}
	//for (var i=0; i<this.cells[0].length; i++)
	//	this.cells[0][i].className = (i==note) ? "accent" : "";
};
