var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.addEventListener('click', addPoints);
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(400,400);
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
function range(start,end,incr) {
	var v = [];
	for (var i=start; i<=end; i+=incr)
	{
	v.push(i);
	}
	return v;
}

function linearLeastSquaresFit(x,y){
	var line = {m:0, b:0};
	line.m = (scalarProduct(x,y) - sumation(x) * average(y))/(sumPowerVectorElement(x,2) - sumation(x) * average(x));
	line.b = (average(y) - line.m * average(x));
	return line;
}
function sumation(v){
	var sum = 0;
	for(var i = 0; i < v.length; i++){
		sum = sum + v[i];
	}
	return sum;
}
function scalarProduct(v,w){
	var sp = 0;
	for(var i = 0;  i < v.length; i++){
		sp = sp + v[i]*w[i];
	}
	return sp;
}
function average(v){
	var a = sumation(v)/v.length;
	return a;
}
function sumPowerVectorElement(v,n){
	var sum = 0;
	for(var i = 0; i < v.length; i++){
		sum = sum + Math.pow(v[i],n);
	}
	return sum;
}
		var point = {x: [], y: []};
function addPoints(event){

	var x1 = event.pageX - canvas.offsetLeft;
	var y1 = event.pageY - canvas.offsetTop;
    point.x.push((x1-400)/sc);
    point.y.push(-(y1-400)/sc)
//	plot(point.x,point.y,'green');
//    var x = point.x;
//	var y = [];
//	for(var i = 0; i < point.x.length; i++){
//		y.push(linearLeastSquaresFit(point.x,point.y).m + linearLeastSquaresFit(point.x,point.y).b);
//	}
//	plot(x,y,'red');
}
linearLeastSquaresFit(point.x,point.y);
var x = point.x;
if(x.length==7){
var y = [];
y.push(line.m + line.b);

plot(x,y,'red');
}
