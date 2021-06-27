var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(400,400);
var sc = 1/10;
function plot(x,y,c){
	ctx.beginPath();
	ctx.moveTo(x[0]*sc,-y[0]*sc);
	for (var i=1; i<x.length; i++) {
		ctx.lineTo(x[i]*sc,-y[i]*sc);
	}
	ctx.strokeStyle = c;
	ctx.stroke();
}

function orbits(e){
	ctx.fillRect(-400,-400,800,800);
	var r = [];
	var x = [];
	var y = [];
	var p = 1000;
	var theta = range(0,2*Math.PI,0.01);
	for(var i = 0; i < theta.length; i++){
		r[i] = p / (1-e*Math.cos(theta[i]));
		x[i] = r[i]*Math.cos(theta[i]);
		y[i] = r[i]*Math.sin(theta[i]);
	}
	plot(x,y,'green');
}
function range(start, end, incr){
	var v = [];
	for(var i = start; i <= end; i += incr){
		v.push(i);
	}
	return v;
}
