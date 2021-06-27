var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(50,600);
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
axes(0,4,-4,4);
function grid(xmin,xmax,ymin,ymax,dx,dy) {
	ctx.setLineDash([1,2]);
	for(var y=ymin; y<=ymax; y+=dy){
		plot([0, 8], [y, y],'gray');
	}
	for(var x=xmin; x<=xmax; x+=dx){
		plot([x, x], [-1, 8],'gray');
	}
ctx.setLineDash([0]);
}
grid(0,8,-1,8,1,1);
function derivativeSineFunction(v){
	var df = [];
    for(var i = 0; i < v.length-1; i++){
    	df.push((Math.sin(v[i+1])-Math.sin(v[i]))/(v[i+1]-v[i]))
    }
    return df;
}
function range(start,end,incr){
	var v  = [];
    for (var i = 0; i <= end; i += incr){
    	v.push(i);
    }
    return v;
}
function presenceNoise(v){
	var VN = [];
	for(var i = 0; i < v.length; i++){
    	VN.push(v[i] + (-0.02*Math.random() + 0.02*Math.random()))
    }
    return VN;
}
var x = range(0,5,0.05);
var y = derivativeSineFunction(range(0,5,0.05));
plot(x,y,'green');
var x2= range(0,5,0.01);
var y2 = [];
for (var i = 0; i < x2.length; i++){
	y2.push(Math.cos(x2[i]));
}
plot(x2,y2,'red');
var x3 = range(0,5,0.05);
var y3 = presenceNoise(derivativeSineFunction(range(0,5,0.05)));
plot(x3,y3,'blue');
document.write(derivativeSineFunction(range(0,5,0.05)))
