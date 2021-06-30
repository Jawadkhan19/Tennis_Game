
var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 5;

var Player1Score = 0;
var Player2Score = 0;

var paddle1Y = 250;
var paddle2Y = 250;
const paddleHeight = 100;
const paddleThickness = 10;

function calculateMousePos(event)
{
      var rect = canvas.getBoundingClientRect();
      var root = document.documentElement;
      var mouseX = event.clientX - rect.left - root.scrollLeft;
      var mouseY = event.clientY - rect.top - root.scrollTop;
      return {
            x:mouseX,
            y:mouseY
      };
}

window.onload = function()
{
      canvas=document.getElementById('gameCanvas');
      canvasContext = canvas.getContext('2d');
      var framesPerSecond = 30;
      setInterval(function()
      {moveEverything();
      drawEverything();}, 1000/framesPerSecond);

      
      canvas.addEventListener('mousemove' , function(event){
      var mousePos = calculateMousePos(event);
      paddle1Y = mousePos.y - (paddleHeight/2);
      });
}

   function ballReset()
   {
         ballSpeedX = -ballSpeedX;
         ballX = canvas.width/2;
         ballY = canvas.height/2;
   }

   function computerMovement()
   {     
         var paddle2YCenter = paddle2Y + (paddleHeight/2);
         if(paddle2YCenter < ballY - 35)
         {
               paddle2Y = paddle2Y + 6;
         }
         else if(paddle2YCenter < ballY + 35)
         {
               paddle2Y = paddle2Y - 6;
         }
   }
   function moveEverything()
  { computerMovement();

   ballX = ballX + ballSpeedX;
   ballY = ballY + ballSpeedY;

   if (ballX < 0)
   {
      if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight)
      {
            ballSpeedX = -ballSpeedX;
   
      }
      else {
            ballReset();
            Player2Score = Player2Score + 1;
         }
      }
   if (ballX > canvas.width)
   {
      if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight)
      {
            ballSpeedX = -ballSpeedX;
   
      }
      else {
            ballReset();
            Player1Score = Player1Score + 1;
      }
}
   
   if (ballY > 0)
   {
       ballSpeedY= -ballSpeedY;
   }
   if (ballY < canvas.height)
   {
       ballSpeedY= -ballSpeedY;
   }
   }

function drawEverything()
{    
      // Blanks out the screen with black
      colorRect(0,0,canvas.width,canvas.height,'black');

      // Left Player Paddle
      colorRect(0,paddle1Y,paddleThickness,paddleHeight,'white');

      // Right Player Paddle
      colorRect(canvas.width-10,paddle2Y,paddleThickness,paddleHeight,'white');
      
      // Ball
      colorCircle(ballX, ballY , 10, 'white');
      canvasContext.fillText(Player1Score, 100, 100);
      canvasContext.fillText(Player2Score, canvas.width-100, 100);

   function colorCircle(centerX, centerY, radius, drawColor)
      {
      canvasContext.fillStyle = 'White';
      canvasContext.beginPath();
      canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
      canvasContext.fill();
      }
}
     
   function colorRect(leftX, topY, width, height, drawColor)
   {
         canvasContext.fillStyle = drawColor;
         canvasContext.fillRect(leftX,topY,width,height);

         
   }
   