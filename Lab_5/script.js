var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var dt = 1/60;
var s = {X: 400, Y: 300, th: 0, Vx: 0, Vy: 0, w: 0, a: 0, exploded:false, lives:3};
var b = [];
var a = [];
for (var i=0;i<4;i++) {
	a.push({X:Math.random()*350 && 450+Math.random()*800  , Y: 350+Math.random()*600 && Math.random()*250, th: Math.random()*2*Math.PI, Vx: Math.random()*200-100, Vy: Math.random()*200-100, w: Math.random()*2*Math.PI- Math.PI, shape: i,size: 'L', exploded: false});
}
var score = 0;
document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);
var end= false;
var bullet_sound = new Audio('Sounds/Ship_shot1.mp3');
var ship_sound = new Audio('Sounds/Ship_explosion.mp3');
var asteroids_sound = new Audio('Sounds/Asteroids.collisions.mp3');
var Game_Over_sound = new Audio('Sounds/send.mp4');
var winner_sound = new Audio('Sounds/winner.mp4');
draw();
function draw() {
	ctx.fillStyle='black';
	ctx.fillRect(0,0,800,600);
	ctx.fillStyle='white';
	ctx.font="50px Verdana";
	ctx.fillText(score,80,80);
	ctx.fillText("Lives:"+s.lives,500,80);
	for (var i=0;i<a.length;i++) {
		if(!a[i].exploded){
			drawAsteroid(a[i]);
		}
	}
	drawShip();
	for(var i = 0; i < b.length; i++){
		if(!b[i].exploded){
			drawBullet(b[i]);
		}
	}
	for (var i=0;i<b.length;i++) {
		for (var j=0;j<a.length;j++) {
			if (collision(b[i],a[j])) {
				asteroids_sound.play();
				if (a[j].size=='L') {
					score = score + 20;
				} else if (a[j].size=='M') {
					score = score + 50;
				} else {
					score = score + 100;
				}
			
		b[i].exploded = true;
		a[j].exploded = true;
		if (a[j].size=='L') {
			a.push({X: a[j].X, Y: a[j].Y, th: Math.random()*2*Math.PI, Vx: a[j].Vx * (Math.random()*2.5), Vy: a[j].Vy, w: a[j].w*2, shape: Math.floor(Math.random()*4), size: 'M', exploded: false});
			a.push({X: a[j].X, Y: a[j].Y, th: Math.random()*2*Math.PI, Vx: a[j].Vx * (Math.random()*2.5), Vy: a[j].Vy, w: a[j].w*2, shape: Math.floor(Math.random()*4), size: 'M', exploded: false});
		}
		else if (a[j].size=='M') {
			a.push({X: a[j].X, Y: a[j].Y, th: Math.random()*2*Math.PI, Vx: a[j].Vx * (Math.random()*2.5), Vy: a[j].Vy, w: a[j].w*2, shape: Math.floor(Math.random()*4), size: 'S', exploded: false});
			a.push({X: a[j].X, Y: a[j].Y, th: Math.random()*2*Math.PI, Vx: a[j].Vx * (Math.random()*2.5), Vy: a[j].Vy, w: a[j].w*2, shape: Math.floor(Math.random()*4), size: 'S', exploded: false});
		}
		}
		}
	}	
	for (var i=0;i<a.length;i++) {
		if (collisionShip(a[i])) {
			s.lives = s.lives-1;
			s.w = 0;
			s.a = 0;
			if(s.lives!=0){
				ship_sound.play();
			if(s.X == 400 && s.Y == 300){
				s = {X:400, Y:200, th:0, Vx:0, Vy:0, w:0, a:0, exploded : false, lives: s.lives};
			}
			else
				s = {X:400, Y:300, th:0, Vx:0, Vy:0, w:0, a:0, exploded : false, lives: s.lives};
			}	
		}
	}	
		
	for(var i = 0; i < a.length; i++){
		a[i].X = a[i].X + a[i].Vx*dt;
		a[i].Y = a[i].Y + a[i].Vy*dt;
		a[i].th = a[i].th + a[i].w*dt;
		if (a[i].X<0) {
			a[i].X = 800;
		}
		if (a[i].X>800) {
			a[i].X = 0;
		}
		if(a[i].Y<0){
			a[i].Y = 600;
		}
		if(a[i].Y>600){
			a[i].Y = 0
		}
	}
	s.X = s.X + s.Vx*dt;
	s.Y = s.Y + s.Vy*dt;
	if (s.X<0) {
		s.X = 800;
	}
	if (s.X>800) {
		s.X = 0;
	}
	if(s.Y<0){
		s.Y = 600;
	}
	if(s.Y>600){
		s.Y = 0;
	}
	s.th = s.th + s.w*dt;
	s.Vx = s.Vx + s.a * Math.cos(s.th)*dt;
	s.Vy = s.Vy - s.a * Math.sin(s.th)*dt;
	for(var i = 0; i < b.length; i++){
		b[i].X = b[i].X + b[i].Vx*dt;
		b[i].Y = b[i].Y + b[i].Vy*dt;
		}
	if(s.lives==0 && end == false){
		Game_Over_sound.play();
		end = true;
	}
		if(s.lives!=0 && score== 2080)
			ctx.fillText("You win!!!!",300,300);
		if(s.lives!=0 && end==false && score == 2080){
			winner_sound.play();
			end=true;
		}	
	requestAnimationFrame(draw);
}
function drawAsteroid(a) {
var xr;
var yr;
	switch (a.shape){
	case 0:
		xr = [-4,-2,0,2,4,3, 4, 1,-2,-4,-4];
		yr = [ 2, 4,2,4,2,0,-2,-4,-4,-2,2];
	break;
	case 1:
		xr = [0,2,4,2,4,2,-1,-2,-4,-3,-4,-2,0];
		yr = [3,4,2,1,-1,-4,-3,-4,-2,0,2,4,3];
	break;
	case 2:
		xr = [0,-2,-4,-2,-4,-1,2,4,4,2,0,0];
		yr = [-1,-4,-1,0,1,4,4,1,-1,-4,-4,-1];
	break;
	case 3:
		xr = [1,4,2,1,-2,-4,-4,-2,-1,1,4,4,1];
		yr = [0,-2,-4,-3,-4,-1,2,4,2,4,2,1,0];
	break;
}
var size;
switch(a.size){
	case 'L':
		size = 10;
	break;
	case 'M':
		size = 5;
	break;
	case 'S':
		size = 2.5;
	break;
	}
	var x = [];
	var y = [];
	for(var i = 0; i < xr.length; i++){
		x.push((xr[i]*Math.cos(a.th) + yr[i]*Math.sin(a.th)) * size + a.X);
		y.push((-xr[i]*Math.sin(a.th) + yr[i]*Math.cos(a.th)) * size + a.Y);
}
	plot(x,y,'white');
}
function plot(x,y,c){
	ctx.beginPath();
	ctx.moveTo(x[0],y[0]);
	for (var i=1; i<x.length; i++) {
		ctx.lineTo(x[i],y[i]);
	}
    ctx.strokeStyle=c;
	ctx.stroke();
}
function drawShip() {
	var xr = [-5,-15,15,-15,-5];
	var yr = [ 0,-10, 0, 10,0];
	var x = [];
	var y = [];
	for (var i=0; i < xr.length;i++) {
		x.push((xr[i]*Math.cos(s.th) + yr[i]*Math.sin(s.th)) + s.X);
		y.push((-xr[i]*Math.sin(s.th) + yr[i]*Math.cos(s.th)) + s.Y);
	}
	if (s.exploded) {
		plot(x,y,'red');
	} else {
		plot(x,y,'white');
	}
	if (s.a>0) {
		xr = [-10,-10,-13,-10];
		yr = [-3,3,0,-3];
		x = [];
		y = [];
		for (var i=0; i<xr.length;i++) {
			x.push((xr[i]*Math.cos(s.th) + yr[i]*Math.sin(s.th)) + s.X);
			y.push((-xr[i]*Math.sin(s.th) + yr[i]*Math.cos(s.th)) + s.Y);
		}
	plot(x,y,'yellow');
	}
}
function keyDownHandler(event) {
	var key = String.fromCharCode(event.keyCode);
	if(!end){
	if (!s.exploded) {
		if (key=="Z") {
			s.w = Math.PI;
		}
		if (key=="X") {
			s.w = -Math.PI;
		}
		if (key=="M") {
			s.a = 100;
		}
		if (key=="N") {
			b.push({X: 15*Math.cos(s.th) + s.X, Y: -15*Math.sin(s.th) + s.Y, Vx: 500*Math.cos(s.th), Vy: -500*Math.sin(s.th), exploded: false});
			bullet_sound.play();
		}
	}
	}
}
function keyUpHandler(event) {
	var key = String.fromCharCode(event.keyCode);
	if ((key=="Z")||(key=="X")) {
		s.w = 0;
	}
	if (key=="M") {
		s.a = 0;
	}
}
function drawBullet(b){
	ctx.fillStyle='white';
	ctx.fillRect(b.X,b.Y,2,2);
}
function collision(b,a) {
	var r;
	switch (a.size) {
		case 'L':
		r = 40;
	break;
		case 'M':
		r = 20;
	break;
		case 'S':
		r = 10;
	break;
}
	if (!b.exploded && !a.exploded && distance(b.X,b.Y,a.X,a.Y)<r) {
		return true;
	} else {
		return false;
	}
}
function distance(x1,y1,x2,y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	var d = Math.sqrt(dx*dx+dy*dy);
	return d;
}
function collisionShip(a) {
	var r;
	switch (a.size) {
		case 'L':
		r = 40;
	break;
		case 'M':
		r = 20;
	break;
		case 'S':
		r = 10;
	break;
}
	if (!s.exploded && !a.exploded && distance(s.X,s.Y,a.X,a.Y)<r+10){
		s.Vx=0;
		s.Vy=0;
		s.exploded=true;
		return true;
	} 
	else {
		return false;
	}
}