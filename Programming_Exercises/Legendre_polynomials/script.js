var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(400,400);
var sc = 350;
function plot(x,y,c){
	ctx.beginPath();
	ctx.moveTo(x[0]*sc,-y[0]*sc);
	for (var i=1; i<x.length; i++) {
		ctx.lineTo(x[i]*sc,-y[i]*sc);
	}
	ctx.strokeStyle = c;
	ctx.stroke();
}
function range(start,end,incr){
	var v = [];
	for(var i = start; i <= end; i += incr){
		v.push(i);
	}
	return v;
}

function axes(xmin,xmax,ymin,ymax) {
	plot([xmin, xmax],[0, 0],'gray');
	plot([0, 0],[ymin, ymax],'gray');
}
axes(-4,4,-4,4);
function grid(xmin,xmax,ymin,ymax,dx,dy) {
	ctx.setLineDash([1,2]);
	for(var y=ymin; y<=ymax; y+=dy){
		plot([-4, 4], [y, y],'gray');
	}
	for(var x=xmin; x<=xmax; x+=dx){
		plot([x, x], [-4, 4],'gray');
	}
ctx.setLineDash([0]);
}
grid(-4,4,-4,4,1,1);
function ticks(xmin,xmax,ymin,ymax,dx,dy){
	ctx.fillStyle = 'black';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	for(var y=ymin; y<=ymax; y+=dy){
		text(y,0.3,y-0.2);
	}
	for(var x=xmin; x<=xmax; x+=dx){
		text(x,x+0.3,-0.2);
	}
}
function text(s,x,y) {
	ctx.fillText(s, x*sc, -y*sc)
}
ticks(-4,4,-4,4,1,1);
var x = range(-1,1,0.01);
var P = [];
P[0] = [];
P[1] = [];
for(var i = 0; i < x.length; i++){
	P[0].push(1);
    P[1].push(x[i]);
}
var x = range(-1,1,0.01);
for(var i = 1; i <= 4; i++){
	P[i+1] = [];
	for(var j = 0; j < x.length; j++){
		P[i+1].push((2*i+1)/(i+1)*x[j]*P[i][j] - i/(i+1) * P[i-1][j]);
	}
}
plot(x,P[0],'red');
plot(x,P[1],'green');
plot(x,P[2],'blue');
plot(x,P[3],'purple');
plot(x,P[4],'orange');
plot(x,P[5],'black');
