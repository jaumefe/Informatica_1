var x = range(-5,15,0.01);
var y = [];
for (var i=0; i<x.length; i++) {
	y.push(Math.pow(x[i],2)-10*x[i]+15);
	}
var canvas =
document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(200,300);
var sc = 40;
function plot(x,y,c)
	{
	ctx.beginPath();
	ctx.moveTo(x[0]*sc,-y[0]*sc);
	for (var i=1; i<x.length; i++) {
	ctx.lineTo(x[i]*sc,-y[i]*sc);
	}
ctx.strokeStyle = c;
ctx.stroke();
}
function axes(xmin,xmax,ymin,ymax) {
	plot([xmin, xmax],[0, 0],'gray');
	plot([0, 0],[ymin, ymax],'gray');
}
axes(-6,16,-14,8);
function grid(xmin,xmax,ymin,ymax,dx,dy) {
	ctx.setLineDash([1,2]);
	for(var y=ymin; y<=ymax; y+=dy){
	plot([-6, 16], [y, y],'gray');
	}
	for(var x=xmin; x<=xmax; x+=dx){
	plot([x, x], [-14, 8],'gray');
	}
	ctx.setLineDash([0]);
	}
grid(-6,16,-14,8,2,2);
function ticks(xmin,xmax,ymin,ymax,dx,dy)
	{
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
ticks(-6,16,-14,8,2,2);
function range(start,end,incr) {
	var v = [];
	for (var i=start; i<=end; i+=incr)
	{
	v.push(i);
	}
	return v;
	}
plot(x,y,'blue');
