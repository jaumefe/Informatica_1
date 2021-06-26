var end = false;
var player = 1;
var board = [[0,0,0,0,0,0],
			 [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0]];
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
	ctx.fillStyle='black';
	ctx.fillRect(0,0,700,600);
	ctx.translate(350,300);
	var sc = 100;
canvas.addEventListener('click',play);
function plot(x,y,c){
	ctx.beginPath();
	ctx.moveTo(x[0]*sc,-y[0]*sc);
	for (var i=1; i<x.length; i++) {
	ctx.lineTo(x[i]*sc,-y[i]*sc);
	}
    ctx.lineWidth=5;
    ctx.strokeStyle=c;
	ctx.stroke();
}
function play(event){
  if(!end){
	var x = event.pageX - canvas.offsetLeft;
	x = (x-350)/sc;
	x = Math.round(x);
	var r = 0.4; 
    for(var y = 0; y <= 5; y++){
    	if(board[x+3][y]==0){
       		board[x+3][y]=player;
    			if(player==1){
    				circle(x,y-2.5,r,'green');
        			detect4(x,y);
					player = 2;
        			break;  
    			}
    			else{
    			circle(x,y-2.5,r,'red');
        		detect4(x,y);
        		player = 1;
        		break; 
    			}
    	}
    }
  }
}
function circle(x,y,r,c){
	ctx.beginPath();
	ctx.arc(x*sc,-y*sc,r*sc,0,2*Math.PI);
	ctx.fillStyle = c;
	ctx.fill();
}
for(var m = -3; m <= 3; m++){
	for(var n = -2.5; n <= 2.5; n++){
		circle(m,n,0.4,'white');
	}
}
function detect4(x,y){
	for(var j = 0; j < 6; j++){
    	if(board[x+3][j]==player && board[x+3][j+1]==player && board[x+3][j+2]==player && board[x+3][j+3]==player){
        	plot([x,x],[j-2.5,j+0.5],'#8B008B');
        	end=true;
        	if(player==1){
        		alert("Player 1 wins");
        		break;
        	}
        	else{
        		alert("Player 2 wins");
        		break;    
    		}
		}
	}	
	for(i = 0; i <= 3; i++){
    	if(board[i][y]== player && board[i+1][y] == player && board[i+2][y] == player && board[i+3][y] == player){
    		plot([i-3,i],[y-2.5,y-2.5],'#8B008B');
        	end=true;
        	if(player==1){
        		alert("Player 1 wins");
        		break;
        	}
        	else{
        		alert("Player 2 wins");
     			break;
        	}
		}
	}			
	for(j = 0; j <= 5; j++){
		for(i = 0; i <= 3; i++){
			if(board[i][j]== player && board[i+1][j+1] == player && board[i+2][j+2] == player && board[i+3][j+3] == player){
        		plot([i-3,i],[j-2.5,j+0.5],'#8B008B');
        		end=true;
        		if(player==1){
        			alert("Player 1 wins");
        			break;
        		}
        		else{
        			alert("Player 2 wins");
        			break;
        		}
        	}
       }
	}	  
    for(j = 0; j <= 5; j++){
		for(i = 0; i <= 3; i++){
			if(board[i][j]== player && board[i+1][j-1] == player && board[i+2][j-2] == player && board[i+3][j-3] == player){
        		plot([i,i-3],[j-5.5,j-2.5],'#8B008B');
        		end=true;
        		if(player==1){
        			alert("Player 1 wins");
        			break;
        		}
        		else{
        			alert("Player 2 wins");
        			break;
        		}
            } 
    	}
	}
}
