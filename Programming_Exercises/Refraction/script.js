var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
	ctx.fillRect(0,0,800,800);
	ctx.translate(400,400);
var sc = 1000;
function plot(x,y,c){
	ctx.beginPath();
	ctx.moveTo(x[0]*sc,-y[0]*sc);
	for (var i=1; i<x.length; i++) {
		ctx.lineTo(x[i]*sc,-y[i]*sc);
	}
	ctx.strokeStyle = c;
	ctx.stroke();
}
function convertRadiansToDegrees(a){
	var a = (a*180)/Math.PI;
	return a;
}
function convertDegreesToRadians(a){
	var a = (a*Math.PI)/180;
	return a;
}
function limitAngle(n1,n2){
	var O1 = Math.asin(n2/n1);
	return O1;
}
function angleLightRayIncidence(O1,n1,n2){
	O1 = convertDegreesToRadians(O1);
    var O1r = 01 + Math.PI/2;
    if(n1>n2){
	if(O1 < limitAngle(n1,n2)){
		var O2 = Math.asin(n1/n2*Math.sin(O1));
        var O2r = O2 - Math.PI/2;
	}
	else if (O1 > limitAngle(n1,n2)){
		var O2 = O1;
        var O2r = 02;
	}
	else{
		var O2 = Math.PI/2;
	}
    }
    else{
    var O2 = Math.asin(n1/n2*Math.sin(O1));
    var O2r = O2 - Math.PI/2;
    }
    ctx.moveTo(10*Math.cos(O1r), 10*Math.sin(O1r));
    ctx.lineTo(0,0);
    ctx.lineTo(10*Math.cos(O2r), 10*Math.sin(O2r));
    ctx.strokeStyle = 'grey';
    ctx.stroke();
	O2 = convertRadiansToDegrees(O2);
	return O2;
}
function boundary(){
	ctx.beginPath();
    ctx.moveTo(-400,0);
    ctx.lineTo(400,0);
    ctx.moveTo(0,400);
    ctx.lineTo(0,-400);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}
boundary();
