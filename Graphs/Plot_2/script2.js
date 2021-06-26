var x = range(-Math.PI,Math.PI,0.01);
var y = {y1:[],y2:[]};
for (var i=0; i<x.length; i++) {
	y.y1.push(Math.cos(2*x[i]));
	}
for (var i = 0; i < x.length; i++){
	y.y2.push(-2*Math.sin(2*x[i]));
	}
var canvas =
document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(400,400);
var sc = 400/Math.PI;
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
function ticks(xmin,xmax,ymin,ymax,dx,dy)
{
	ctx.fillStyle = 'black';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	for(var y=ymin; y<=ymax; y+=dy){
		text(y,0.1,y-0.1);
	}
	for(var x=xmin; x<=xmax; x+=dx){
		text(x,x+0.1,-0.1);
	}
}
function text(s,x,y,c) {
	ctx.fillStyle = c;
	ctx.fillText(s, x*sc, -y*sc)
}
ticks(-4,4,-4,4,1,1);
function range(start,end,incr) {
	var v = [];
	for (var i=start; i<=end; i+=incr)
	{
	v.push(i);
	}
	return v;
}
plot(x,y.y1,'blue');
plot(x,y.y2,'red');
text("y=cos(2x)",-2.5,1.3,'blue')
text("y=-2sin(2x)",2.5,2.3,'red')
