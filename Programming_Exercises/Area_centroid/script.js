var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var sc = 1000;
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
    ctx.fillRect(0,0,480, 760);
	ctx.translate(0,760);
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
	plot([xmin, xmax],[0, 0],'black');
	plot([0, 0],[ymin, ymax],'black');
}
axes(0,0.24,0,0.38);
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
grid(0,0.24,0,0.38,0.05,0.05);
function area(w,h,t,d){
	var h = [0, Math.sqrt(64-d*d)];
    plot([d,0], h,'blue');
  }
function width(w){
	var wx = [0, w];
    var wy = [3.8,3.8];
    plot(wx,wy,'blue');
}
function centroidT(w,h,t,d){
    var yc1 = h - t/2;
	var yc2 = (h-t)/2;
	var a1 = w*t;
	var a2 = (h-t)*d;
	var yc = (yc1*a1+yc2*a2)/(a1+a2);
    var x = [0,w,w,(w-d)/2+d,(w-d)/2+d,(w-d)/2, (w-d)/2, 0,0];
    var y = [h,h,h-t,h-t,0,0,h-t,h-t,h];
    plot(x,y,'green');
    var x1 = [w/2];
    var y1 =[yc];
    plot(x1,y1,'red');
	return yc;
}
/*Per fer càlculs
function centroidT(w,h,t,d){
    var yc1 = h - t/2;
	var yc2 = (h-t)/2;
	var a1 = w*t;
	var a2 = (h-t)*d;
	var yc = (yc1*a1+yc2*a2)/(a1+a2);
	return yc;
}
console.log(centroidT(4,5,1,2))
*/
