var V = 120;
var RS1 = 25;
var RL = range(0,100,0.1);
var PL1 = [];
for(var i = 0; i < RL.length; i++){
	PL1.push((V/(RS1+RL[i]))*(V/(RS1+RL[i]))*RL[i]);
	}
var RS2 = 50;
var PL2 = [];
for(var i = 0; i < RL.length; i++){
	PL2.push((V/(RS2+RL[i]))*(V/(RS2+RL[i]))*RL[i]);
	}
var RS3 = 75;
var PL3 = [];
for(var i = 0; i < RL.length; i++){
	PL3.push((V/(RS3+RL[i]))*(V/(RS3+RL[i]))*RL[i]);
	}
var RS4 = 100;
var PL4 = [];
for(var i = 0; i < RL.length; i++){
	PL4.push((V/(RS4+RL[i]))*(V/(RS4+RL[i]))*RL[i]);
	}
var canvas =
document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
    ctx.fillRect(0,0,880,880);
	ctx.translate(40,840);
var scx = 8;
var scy = 4;
function plot(x,y,c)
{
	ctx.beginPath();
	ctx.moveTo(x[0]*scx,-y[0]*scy);
	for (var i=1; i<x.length; i++) {
		ctx.lineTo(x[i]*scx,-y[i]*scy);
	}
	ctx.strokeStyle = c;
	ctx.stroke();
}
function axes(xmin,xmax,ymin,ymax) {
	plot([xmin, xmax],[0, 0],'gray');
	plot([0, 0],[ymin, ymax],'gray');
}
axes(0,100,0,180);
function grid(xmin,xmax,ymin,ymax,dx,dy) {
	ctx.setLineDash([1,2]);
	for(var y=ymin; y<=ymax; y+=dy){
		plot([0, 100], [y, y],'gray');
	}
	for(var x=xmin; x<=xmax; x+=dx){
		plot([x, x], [0, 180],'gray');
	}
ctx.setLineDash([0]);
}
grid(0,100,0,180,10,20);
function ticks(xmin,xmax,ymin,ymax,dx,dy,c)
{
	ctx.fillStyle =c ;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	for(var y=ymin; y<=ymax; y+=dy){
		text(y,-2,y-1.5,c);
	}
	for(var x=xmin; x<=xmax; x+=dx){
		text(x,x-2,-1.5,'black');
	}
}
function text(s,x,y,c) {
	ctx.fillStyle = c;
	ctx.fillText(s, x*scx, -y*scy);
  }
ticks(0,100,0,180,10,20,'black');
function range(start,end,incr) {
	var v = [];
	for (var i=start; i<=end; i+=incr)
	{
	v.push(i);
	}
	return v;
}
plot(RL,PL1,'blue');
plot(RL,PL2,'red');
plot(RL,PL3,'green');
plot(RL,PL4,'purple');
text("Rs=25 Ω",70,170,'blue');
text("Rs=50 Ω",70,165,'red');
text("Rs=75 Ω",70,160,'green');
text("Rs=100 Ω",70,155,'purple');
