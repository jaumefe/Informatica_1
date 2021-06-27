var x1 = range(-Math.PI,Math.PI,0.01);
var y1 = [];
for (var i=0; i<x1.length; i++) {
	y1.push((Math.pow(Math.E,x1[i])-Math.pow(Math.E,-x1[i]))/2);
	}
var x2= range(-Math.PI,Math.PI,0.01);
var y2 = [];
for (var i = 0; i < x2.length; i++){
	y2.push((Math.pow(Math.E,x1[i])+Math.pow(Math.E,-x1[i]))/2);
	}
var x3 = range(-Math.PI,Math.PI,0.01);
var y3 = [];
for (var i=0; i<x3.length; i++) {
	y3.push((Math.pow(Math.E,x1[i]) - Math.pow(Math.E,-x1[i]))/(Math.pow(Math.E,x1[i])+Math.pow(Math.E,-x1[i])));
	}
var canvas =
document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(400,400);
var sc = 800/(2*Math.PI);
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
function range(start,end,incr) {
	var v = [];
	for (var i=start; i<=end; i+=incr)
	{
	v.push(i);
	}
	return v;
}
plot(x1,y1,'blue');
plot(x2,y2,'red');
plot(x3,y3,'green');
