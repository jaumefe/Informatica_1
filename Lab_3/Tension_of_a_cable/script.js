function tension(d){
	var W = 200;
	var W = W*4.4482216;
	var Lc = 8;
	var Lc = Lc*0.3048;
	var Lp = 8;
	var Lp = Lp*0.3048;
	var d = d*0.3048;
	var T = (W*Lc*Lp)/(d*Math.sqrt(Lp*Lp-d*d));
	return T/4.4482216;
}

var canvas =
document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var sc = 100;
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
    ctx.fillRect(0,0,1000,1000);
	ctx.translate(25,800);
function cable(d){
	clear();
	var h = [0, Math.sqrt(64-d*d)];
    plot([d,0], h,'black');
  }
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
	plot([xmin, xmax],[0, 0],'blue');
	plot([0, 0],[ymin, ymax],'blue');
}
axes(0,8,-1,10);
function text(s,x,y,c) {
	ctx.fillStyle = c;
	ctx.fillText(s, x*sc, -y*sc);
	}
text("W= 200 lb",7.5,-0.9,'black');
text("lp= 8ft",8,0.15,'black');
text("Cable lc= 8ft",4,2,'black');

function arrow(d){
	text("d= "+d+" ft",d/2,-0.15,'red');
	ctx.beginPath();
    ctx.moveTo(0,0.15*sc);
    ctx.lineTo(d*sc,0.15*sc);
    ctx.lineTo(d*sc,0);
    ctx.strokeStyle='gray';
    ctx.stroke();

   }
function clear(){
	ctx.clearRect(-25,-800,1000,1000);
    ctx.fillStyle = 'whitesmoke';
	ctx.fillRect(-25,-800,1000,1000);
    cube('gray');
    text("Cable lc= 8ft",4,2,'black');
    arrow();
    axes(0,8,-1,10);
    text("W= 200 lb",7.5,-0.9,'black');
	text("lp= 8ft",8,0.15,'black');
}
function cube(){
    plot([8,8],[0,-0.3],'gray');
    plot([7.4,8.40,8.40,7.40,7.4],[-0.40,-0.40,-1.40,-1.40,-0.4],'gray');
    plot([7.60,8.60,8.60],[-0.20,-0.20,-1.20],'gray');
    plot([7.40,7.60],[-0.40,-0.20],'gray');
    plot([8.40,8.60],[-0.40,-0.20],'gray');
    plot([8.40,8.60],[-1.40,-1.20],'gray');
}
cube();
