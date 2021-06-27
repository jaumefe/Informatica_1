var canvas = document.querySelector('canvas');
canvas.addEventListener('click', object)
var ctx = canvas.getContext('2d');
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
function ship(x,y,r,c){
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fillStyle = c;
	ctx.fill();
}
ship(-300,-100,20,'red');
ship(350,100,20,'blue');
function object(event){
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;
	x = (x-400);
	y = (y-400);
	
	drawCircles(x,y,10,0,2*Math.PI,'green');
	ship(-300,-100,20,'red');
	ship(350,100,20,'blue');
	plot([-3,x/sc],[1,-y/sc],'black');
	plot([3.5,x/sc],[-1,-y/sc],'black');
	plot([-3,-2],[1,1],'black');
	plot([3.5,2.5],[-1,-1],'black');
}
function drawCircles(x,y,r,amin,amax,c){
	ctx.clearRect(-400,400,800,800);
	ctx.fillStyle = "whitesmoke";
	ctx.fillRect(-400,-400,800,800);
	ctx.beginPath();
	ctx.arc(x,y,r,amin,amax);
	ctx.fillStyle = c;
	ctx.fill();
}
function distance(x1,y1,x2,y2){
	var dx = x2 - x1;
	var dy = y2 - y1;
	var d = Math.sqrt(dx*dx + dy*dy);
	return d;
}

function absoluteCoordinatesObject(x1,y1,r1,theta1,phi1){
	var absCoor = {rx:0,ry:0};
	var c = Math.cos(theta1 - phi1);
	var s = Math.sin(theta1 - phi1);
	absCoor.rx = x1 + r1*c;
	absCoor.ry = y1 + r1*s;
	return absCoor;
}
	var ship = {r2:0, phi2:0};
function ship2(x2,y2,theta2,rx,ry){
//Considerem rx, ry les coordenades absolutes del objecte

	ship.r2 = Math.sqrt(Math.pow(rx-x2,2)+Math.pow(ry-y2,2));
	ship.phi2 = theta2 - Math.atan((ry-y2)/(rx-x2));
	return ship;
}
//Trigonometria. Passar a polars