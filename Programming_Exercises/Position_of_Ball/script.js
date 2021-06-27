var canvas =
document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(100,700);
var sc = 50;

var g = -9.81;
var time = [0];
function distance(v,a,t){

	time.push(t);
	var pos = {h:[0], d:[0]};
    a = a*Math.PI/180;
    for(var i = 0; i < time.length; i++){
        pos.h.push((1/2)*g*time[i]*time[i]+v*Math.sin(a)*time[i]);
        pos.d.push(v*Math.cos(a)*time[i]);
    
    plot(pos.d,pos.h,'red');
}
}	
function range(start,end,incr) {
	var v = [];
	for (var i=start; i<=end; i+=incr)
	{
	v.push(i);
	}
	return v;
}
function plot(x,y,c){
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
axes(-2,15,-2,15);
function grid(xmin,xmax,ymin,ymax,dx,dy) {
	ctx.setLineDash([1,2]);
	for(var y=ymin; y<=ymax; y+=dy){
		plot([-2, 15], [y, y],'gray');
	}
	for(var x=xmin; x<=xmax; x+=dx){
		plot([x, x], [-2, 15],'gray');
	}
ctx.setLineDash([0]);
}
grid(-2,15,-2,15,1,1);
distance();
/*Tan sols per fer els càlculs
var g = -9.81;
var pos = {h:0, d:0};
function distance(v,a,t){
	
    a = a*Math.PI/180;
        pos. h= ((1/2)*g*t*t+v*Math.sin(a)*t);
        pos.d = (v*Math.cos(a)*t);
  	return pos;
}
console.log(distance(10,45,5))
*/
