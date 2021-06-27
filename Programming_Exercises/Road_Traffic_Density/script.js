var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(100,700);
var sc = 100;
function plot(x,y,c){
	ctx.beginPath();
	ctx.moveTo(x[0]*sc,-y[0]*sc);
	for (var i=1; i<x.length; i++) {
		ctx.lineTo(x[i]*sc,-y[i]*sc);
	}
	ctx.strokeStyle = c;
	ctx.stroke();
}
function fac(n){
	if(n==0){
		var f = 1;
	}
	else
	var f = n * fac(n-1);
	return f;
}
var P = [];
	var k = range(0,7,1);
function poissonDistribution(t,l){


    for(var i = 0; i < k.length; i++){
    	if(t >= 0 && l > 0 && k[i] >= 0){
		P.push(Math.pow(Math.E,-l*t)*(Math.pow(l*t,k[i]))/(fac(k[i])));
	}
    }
    plot(k,P,'red')
	return P;
}
function axes(xmin,xmax,ymin,ymax) {
	plot([xmin, xmax],[0, 0],'gray');
	plot([0, 0],[ymin, ymax],'gray');
}
axes(-1,8,-1,8);
function grid(xmin,xmax,ymin,ymax,dx,dy) {
	ctx.setLineDash([1,2]);
	for(var y=ymin; y<=ymax; y+=dy){
		plot([-1, 8], [y, y],'gray');
	}
	for(var x=xmin; x<=xmax; x+=dx){
		plot([x, x], [-1, 8],'gray');
	}
ctx.setLineDash([0]);
}
grid(-1,8,-1,8,1,1);
function range(start,end,incr) {
	var v = [];
	for (var i=start; i<=end; i+=incr)
	{
	v.push(i);
	}
	return v;
}
