function sinc(x){
	if(x!=0){
		var sinc = Math.sin(x)/x;
    }
    else
    	var sinc = 1;
	return sinc;
}
var alpha = [];
var gain = [];
function antGainPattern(x){
	var G = Math.abs(sinc(4*x));
	
    
    alpha.push(x);
    
    gain.push(G);
    plot(gain,alpha,'green');
    return G;
}
var canvas = document.querySelector('canvas');
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
function polarGrid(rmin,rmax,amin,amax,dr,da){
	ctx.setLineDash([1,4]);
	for(var r = rmin; r <= rmax; r += dr){
		ctx.beginPath();
		ctx.arc(0,0,r*sc,0,2*Math.PI);
		ctx.closePath();
        ctx.strokeStyle = 'grey';
        ctx.stroke();
        for(var a = amin; a <= amax; a += da){
        ctx.beginPath();
        ctx.moveTo(r*Math.cos(a)*sc,r*Math.sin(a)*sc);
        ctx.lineTo(r*Math.cos(a + Math.PI)*sc, r*Math.sin(a + Math.PI)*sc);
        ctx.stroke();
        }
        
	}
    ctx.setLineDash([0]);
}
polarGrid(0,4,0,2*Math.PI,1,Math.PI/6);
function axes(xmin,xmax,ymin,ymax) {
	ctx.setLineDash([1,2]);
	plot([xmin, xmax],[0, 0],'gray');
	plot([0, 0],[ymin, ymax],'gray');
    ctx.setLineDash([0]);
}
axes(-4,4,-4,4);
