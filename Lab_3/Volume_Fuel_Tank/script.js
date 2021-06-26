var r = 0.5;
function volume(hf){
	if(hf<=0.5){
    	var a = Math.sqrt(2*r*hf-hf*hf);
		var v = (Math.PI*hf)/6*(3*a*a+hf*hf);
		return v;
	}
	else if (hf <= 2.5){
		var vhemisphere = 1/2*4/3*Math.PI*Math.pow(r,3);
		var vcylinder = Math.PI*r*r*(hf-0.5);
		var v = vhemisphere + vcylinder;
		return v;
	}
	else if(hf >= 2.5){
    	var hf = hf - 2.5;
    	var a = Math.sqrt(r*r-hf*hf);
		var vhemisphere1 = 1/2*4/3*Math.PI*Math.pow(r,3);
		var vcylinder = Math.PI*r*r*2;
		var vhemisphere2 = (Math.PI*Math.pow(hf,3))/6+(Math.PI*hf)*(r*r+a*a)/2;
		var v = vhemisphere1 + vhemisphere2 + vcylinder;
		return v;
    }
}
var canvas =
document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var sc = 200;
	ctx.fillStyle = 'whitesmoke';
	ctx.font = '18px Arial';
    ctx.fillRect(0,0,800,800);
	ctx.translate(400,400);
function text(s,x,y,c) {
	ctx.fillStyle = c;
	ctx.fillText(s, x*sc, -y*sc)
	}
function plot(x,y)
{	ctx.beginPath();
	ctx.moveTo(x[0]*sc,-y[0]*sc);
	for (var i=1; i<x.length; i++) {
		ctx.lineTo(x[i]*sc,-y[i]*sc);
	}
    ctx.fillStyle='rgba(0, 255, 0, 1)';
	ctx.fill();
}
function hemisphere1(hf,c){
    ctx.beginPath();
	ctx.arc(0,200,100,0,Math.PI);
    ctx.strokeStyle=c;
    ctx.stroke();
    }
function hemisphere2(hf,c){
    ctx.beginPath();
	ctx.arc(0,-200,100,Math.PI,0);
	ctx.strokeStyle=c;
    ctx.stroke();
}
function cylinder(c){
	ctx.beginPath();
    ctx.moveTo(-100,-200);
    ctx.lineTo(-100,200);
    ctx.moveTo(100,-200);
    ctx.lineTo(100,200);
    ctx.strokeStyle = c;
    ctx.stroke();
}


function fuel(hf){
clear();
var alpha = range(0,2*Math.PI,0.01);
var x = [];
var y = [];
	if(hf<=0.5){
		var a = Math.sqrt(2*r*hf-hf*hf);
    	var b = a/4;
        var hf = hf-1.5;
    	for(var i = 0; i<alpha.length; i++){
    		x.push(a*Math.cos(alpha[i]));
        	y.push((hf)+b*Math.sin(alpha[i]));
    	}
         plot(x,y); 
         	
    }
	else if (hf <= 2.5 && hf > 0.5){
    	var a = 0.5;
        var b = a/4;
        var hf = hf -1.5;
        for(var i = 0; i<alpha.length; i++){
    		x.push(a*Math.cos(alpha[i]));
        	y.push((hf)+b*Math.sin(alpha[i]));
    	}
        plot(x,y);
                        
        }
    else if(hf >= 2.5){
    	var hf = hf - 2.5;
		var a = Math.sqrt(r*r-hf*hf);
    	var b = a/4;
        var hf = hf+1;
    	for(var i = 0; i<alpha.length; i++){
    		x.push(a*Math.cos(alpha[i]));
        	y.push((hf)+b*Math.sin(alpha[i]));

    	}
       plot(x,y);  
    }
    }
function range(start,end,incr) {
	var v = [];
	for (var i=start; i<=end; i+=incr)
	{
		v.push(i);
	}
	return v;
    }
function clear(){
	ctx.clearRect(-400,-400,800,800);
    ctx.fillStyle = 'whitesmoke';
	ctx.fillRect(-400,-400,800,800);
    cylinder('gray');
	hemisphere1('gray');
	hemisphere2('gray');
    arrow();
}
function level(hf){
	if(hf<0.5){
        ctx.beginPath();
    	ctx.arc(0,200,100,0,Math.PI);
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fill();
        ctx.clearRect(-101,200,202,-(hf-0.5)*sc);
        ctx.fillStyle = 'whitesmoke';
        ctx.fillRect(-101,200,202,-(hf-0.5)*sc);
        hemisphere1();
        var a = Math.sqrt(2*r*hf-hf*hf);
        var alpha = range(0,2*Math.PI,0.01);
		var x = [];
		var y = [];
    	var b = a/4;
        var hf = hf-1.5;
    	for(var i = 0; i<alpha.length; i++){
    		x.push(a*Math.cos(alpha[i]));
        	y.push((hf)+b*Math.sin(alpha[i]));
    	}
         plot(x,y); 
}
	else if(hf>=0.5 && hf <= 2.5){
    	var hf = hf -1.5;
    	ctx.beginPath();
    	ctx.arc(0,200,100,0,Math.PI);
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fill();
        ctx.beginPath();
    	ctx.moveTo(100,200);
   	 	ctx.lineTo(100,-hf*sc);
   		ctx.lineTo(-100,-hf*sc);
    	ctx.lineTo(-100,200);
        ctx.closePath();
    	ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    	ctx.fill();
    }
    else if(hf>=2.5){
    var hf = hf -1.5;
    	ctx.beginPath();
    	ctx.arc(0,200,100,0,Math.PI);
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fill();
        ctx.beginPath();
    	ctx.moveTo(100,200);
   	 	ctx.lineTo(100,-200);
   		ctx.lineTo(-100,-200);
    	ctx.lineTo(-100,200);
        ctx.closePath();
    	ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    	ctx.fill();
        ctx.beginPath();
    	ctx.arc(0,-200,100,Math.PI,0);
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fill();
        ctx.clearRect(-101,-300,202,(1.5-hf)*sc);
        ctx.fillStyle = 'whitesmoke';
        ctx.fillRect(-101,-300,202,(1.5-hf)*sc);
        hemisphere2();
        var alpha = range(0,2*Math.PI,0.01);
		var x = [];
		var y = [];
        var hf = hf - 1;
		var a = Math.sqrt(r*r-hf*hf);
    	var b = a/4;
        var hf = hf+1;
    	for(var i = 0; i<alpha.length; i++){
    		x.push(a*Math.cos(alpha[i]));
        	y.push((hf)+b*Math.sin(alpha[i]));

    	}
       plot(x,y);
    }
}
function arrow(hf){
	hf = hf -1.5;
	ctx.beginPath();
    ctx.moveTo(0,300);
    ctx.lineTo(-200,325);
    ctx.moveTo(0,-hf*sc);
    ctx.lineTo(-200,-(hf*sc)+25);
    ctx.moveTo(-200,325);
    ctx.lineTo(-200,-(hf*sc)+25);
    ctx.strokeStyle = 'gray';
    ctx.stroke();
	hf = hf+1.5;
    var hf = hf.toFixed(2)
    text("hf = "+hf+" m",-1.1,(hf-3)/2,'black');
}
cylinder('gray');
hemisphere1('gray');
hemisphere2('gray');
