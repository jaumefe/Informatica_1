var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var dt= 1/60;
var bar = {X:3, Y:7.7, Vx:0};
var ball = {X:3, Y:7.6, Vx:0, Vy:0,radius: 0.07, fall: false};
var sc = 100;
var end=false
//Starting the game
var beginning = false;
//Initialize blocks


var b = [[],[],[],[],[],[],[]];
for(var n = 0.25; n <= 5.75; n = n + 0.5){
	b[0].push({X:n, Y: 0.625, exploded:false, color:"#A4A4A4"});
    b[1].push({X:n, Y: 0.875, exploded:false, color:"#9FF781"});
	b[2].push({X:n, Y: 1.125, exploded:false, color:"#FE2EF7"});
	b[3].push({X:n, Y: 1.375, exploded:false, color:"orange"});
	b[4].push({X:n, Y: 1.625, exploded:false, color:"#58FAF4"});
	b[5].push({X:n, Y: 1.875, exploded:false, color:"red"});
	b[6].push({X:n, Y: 2.125, exploded:false, color:"purple"});
	
}

var blocks = [];
for(var i = 0; i < b.length; i++){
	blocks[i] = [0,0,0,0,0,0,0,0,0,0,0,0];
}


var bang_sound = new Audio('bang.wav');
var winner_sound = new Audio('winner.wav');
var start_sound = new Audio('start.wav');
var soundEnd_sound = new Audio('soundEnd.wav');
var soundEnd=false
var initialSound=false;
var sound=false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function plot(x,y,c){
	ctx.beginPath();
	ctx.moveTo(x[0]*sc,y[0]*sc);
	for (var i=1; i<x.length; i++) {
		ctx.lineTo(x[i]*sc,y[i]*sc);
	} 
	ctx.fillStyle = c;
	ctx.fill();
}
var score=0;
draw();

function draw() {
	ctx.fillStyle='whitesmoke';
	ctx.fillRect(0,0,600,800);
	ctx.fillStyle='black';
	ctx.font="20px Verdana";
	ctx.fillText(score,20,790);


	//SOUNDS

	//Initial sound
	if (score==0 && initialSound==false){
		start_sound.play();
		initialSound=true;
	}

	//Winner
	if (score==1680 && !ball.fall && sound==false){
		winner_sound.play();
		sound=true
	}

	//End
	if (ball.fall && soundEnd==false && !b.exploded) {
		soundEnd_sound.play();
		soundEnd=true;
	}

	//STRINGS

	//start
	if (score==0 && ball.X==3 && ball.Y==7.6){
		ctx.font="40px Verdana";
		ctx.fillText("Start",230,400);
	}
	//winner
	if (score==1680 && !ball.fall){
		ctx.font="40px Verdana";
		ctx.fillText("Winner",230,400)
		ball.Vx=0
		ball.Vy=0
	}
	//game over
	if (ball.fall && !b.exploded) {
		ctx.font="40px Verdana";
		ctx.fillText("Game Over",200,400);
	}
	//Blocks
	drawBlocks(b);
	//Ball
	drawBall(ball);
	//Bar
	drawBar(bar);
	//Move bar
	if(bar.X<0.5){
		bar.X = 0.5;
	}
	if(bar.X>5.5){
		bar.X = 5.5;
	}
	bar.X = bar.X + bar.Vx*dt;
	moveBall ();
	for(var i = 0; i < 7; i++){
		for(var j = 0; j < 12; j++){
			if(!b[i][j].exploded){
				if(hitBlocks(ball , b[i][j])){
					b[i][j].exploded = true;
				}
		}
	}
	}
requestAnimationFrame(draw);
}

function drawBlocks(b) {
	var r = 0.25;
	for(var i = 0; i < 7; i++){
		for(var j = 0; j < 12; j++){
			if(b[i][j].exploded==false){
			var x = (b[i][j].X - r)*sc;
			var y = (b[i][j].Y - r)*sc;
			var len = 2*r*sc;
			ctx.fillStyle = b[i][j].color;
			ctx.fillRect(x,y,len,len/2);
			ctx.fillStyle='black';
			ctx.strokeRect(x, y, len, len/2);
			}
		}
	}
}
function drawBar(bar) {
	var xr = [-0.5,-0.5,0.5,0.5];
	var yr = [0.025,-0.025,-0.025,0.025];
	var x = [];
	var y = [];
	for (var i=0; i < xr.length;i++) {
		x.push((xr[i]) + bar.X);
		y.push((yr[i]) + bar.Y);
	}
	plot(x,y,'blue');
}
function drawBall(ball){
	ctx.beginPath();
	ctx.arc(ball.X*sc,ball.Y*sc,ball.radius*sc,0,2*Math.PI);
	ctx.fillStyle="grey";
	ctx.fill();
}
function keyDownHandler(event) {
	var key = String.fromCharCode(event.keyCode);
	if(!ball.fall){
		if (key=='A') {
			bar.Vx = -6;
		}
		if (key=='D') {
			bar.Vx = 6;
		}
    //AsÃ­ sÃ³lo funcionarÃ¡ una vez
		if(beginning==false){
			if (key=='S'||key=='A'||key=='D') {
				ball.Vx = Math.random()*12 - 6;
				ball.Vy= -3
				beginning=true;
			}
		}
	}
}
function keyUpHandler(event) {
	var key = String.fromCharCode(event.keyCode);
	if ((key=='A')||(key=='D')) {
		bar.Vx = 0;
	}
}
function distance(x1,y1,x2,y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	var d = Math.sqrt(dx*dx+dy*dy);
	return d;
}
function moveBall (){
  if (!ball.fall){
	ball.X = ball.X + ball.Vx*dt;
	ball.Y = ball.Y + ball.Vy*dt;
	if (ball.X<=0.07 ) {
		ball.Vx = - ball.Vx;
	}
	if (ball.X>=5.93 ) {
		ball.Vx = -ball.Vx;
	}
    
	if (ball.Y>=8.07) {
        ball.fall= true
       
	}
    
	if (ball.Y<=0.1) {
		ball.Vy = -ball.Vy;
	}
    
	if (ball.Y >=  bar.Y - 0.025 - ball.radius && ball.X <= bar.X +0.5 && ball.X >= bar.X -0.5) {
		ball.th = Math.PI/4 + Math.random()*(3*Math.PI/4);
		ball.Vy =  -(3 + 3 * Math.sin(ball.th));
		if(ball.Vx > 0){
			ball.Vx = ( 3 +  3* Math.cos(ball.th));
		}
		if(ball.Vx < 0){
			ball.Vx = -( 3 +  3* Math.cos(ball.th));
		}
		if (ball.Y>bar.Y){
			ball.Vy=7
			ball.Vx=7
		}
    }
}
}
function hitBlocks(ball, b){
	if (detectYAxes(ball, b) && detectXAxes(ball, b)) {
    	ball.Vy = - ball.Vy;
        score = score + 20
        bang_sound.play();
		return true;
	}
	if(detectLateralCollision(ball,b)){
        score = score + 20;
        bang_sound.play();
		return true;
	}
	else 
		return false;
}
function detectYAxes(ball, b){
	if(ball.Y - b.Y <  0.15  || ball.Y -  b.Y < -0.15 )
		return true;
	else
		return false;
}
function detectXAxes(ball, b){
	if( ball.X - b.X> - 0.25  && ball.X -  b.X< 0.25 )
		return true;
	else
		return false;
}
function detectLateralCollision(ball,b){
	if((b.X - 0.25 < ball.X + ball.radius && b.X - 0.15 > ball.X + ball.radius) || (b.X + 0.15 < ball.X - ball.radius && b.X + 0.25 > ball.X - ball.radius)){
		if(ball.Y - b.Y <   0.125 && ball.Y - b.Y >  - 0.35){
			ball.Vx = -ball.Vx;
			b.exploded = true;
            return true;
		}
		else
			return false;
	}
	else
		return false;
}