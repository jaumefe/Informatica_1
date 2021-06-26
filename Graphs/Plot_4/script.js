var a = 7*Math.PI/180;
var u = {u1:0.02,u2:0.1,u3:0.2,u4:0.3};
var l = range(0,90,0.01);
var e = {e1:[],e2:[],e3:[],e4:[]};
for(var i = 0; i < l.length; i++){
	var rad = l[i]*Math.PI/180;
	e.e1.push(100*(Math.cos(a)-u.u1*Math.tan(rad))/(Math.cos(a)+u.u1*1/(Math.tan(rad))));
	}
for(var i = 0; i < l.length; i++){
	var rad = l[i]*Math.PI/180;
	e.e2.push(100*(Math.cos(a)-u.u2*Math.tan(rad))/(Math.cos(a)+u.u2*1/(Math.tan(rad))));
	}
for(var i = 0; i < l.length; i++){
	var rad = l[i]*Math.PI/180;
	e.e3.push(100*(Math.cos(a)-u.u3*Math.tan(rad))/(Math.cos(a)+u.u3*1/(Math.tan(rad))));
	}
for(var i = 0; i < l.length; i++){
	var rad = l[i]*Math.PI/180;
	e.e4.push(100*(Math.cos(a)-u.u4*Math.tan(rad))/(Math.cos(a)+u.u4*1/(Math.tan(rad))));
	}
var canvas =
document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,880,880);
	ctx.translate(40,840);
var sc = 8;
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
axes(0,90,0,100);
function grid(xmin,xmax,ymin,ymax,dx,dy) {
	ctx.setLineDash([1,2]);
	for(var y=ymin; y<=ymax; y+=dy){
		plot([0, 90], [y, y],'gray');
	}
	for(var x=xmin; x<=xmax; x+=dx){
		plot([x, x], [0, 100],'gray');
	}
ctx.setLineDash([0]);
}
grid(0,90,0,100,10,10);
function ticks(xmin,xmax,ymin,ymax,dx,dy)
{
	ctx.fillStyle = 'black';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	for(var y=ymin; y<=ymax; y+=dy){
		text(y,-2,y-1.5);
	}
	for(var x=xmin; x<=xmax; x+=dx){
		text(x,x-2,-1.5);
	}
}
function text(s,x,y,c) {
	ctx.fillStyle=c;
	ctx.fillText(s, x*sc, -y*sc)
}
ticks(0,90,0,100,10,10);
function range(start,end,incr) {
	var v = [];
	for (var i=start; i<=end; i+=incr)
	{
	v.push(i);
	}
	return v;
}
plot(l,e.e1,'blue');
plot(l,e.e2,'red');
plot(l,e.e3,'green');
plot(l,e.e4,'purple');
text("u=0.02",25,45,'blue');
text("u=0.1",25,40,'red');
text("u=0.2",25,35,'green');
text("u=0.3",25,30,'purple');
