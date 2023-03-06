//Screen 
let Height = 400;
let Width = 800;
//Divider
let LineX = 400;
let LineY1 = 0;
let LineY2 = 800;
//Ball
let Ball1X = 200;
let Ball1Y = (10, 20, 50);
let Ball2X = 600;
let Ball2Y = (10, 20, 50);
let BallR = 50;
//Ball Movement
let BallSpeedX = 1;
let BallSpeedY = -1;
let BallSpeed = 3;
let BallSpeedX2 = -1;
let BallSpeedY2 = 1;
let BallSpeed2 = 3;
//Players
let Player1X = 100;
let Player1Y = 150;
let PlayerW = 15;
let PlayerH = 125;
let Player2X = 700;
let Player2Y = 150;
//Scores
let P1Score = 0;
let P2Score = 0;
//Objectives
let P1PadX = LineX - 10;
let P1PadY = 150;
let P2PadX = LineX;
let P2PadY = 150;
//End
let end1 = -400;
let end2 = -400;
let end3 = -400;
let end4 = -400;
let end5 = 200;
//Decals
let bg;
let p1;
let p2;
let net1;
let net2;
let ball1;
let ball2;
let sb;
//SoundFX
let bounce;
let getpoints;
let losepoints;
let bgm;

function setup() {
  createCanvas(Width, Height);
  background(255);
  backgroundmusic();
}
//Preloads all outsourced media such as images and audio.
function preload() {
  bg = loadImage("Images/background.jpg");
  p1 = loadImage("Images/bluepaddle.png");
  p2 = loadImage("Images/yellowpaddle.png");
  net1 = loadImage("Images/net.png");
  net2 = loadImage("Images/net2.png");
  ball1 = loadImage("Images/basketball.png");
  ball2 = loadImage("Images/basketball.png");
  sb = loadImage("Images/scoreboard.png");
  bounce = loadSound("Sounds/bounce.mp3");
  losepoints = loadSound("Sounds/losepoints.mp3");
  getpoints = loadSound("Sounds/swish.mp3")
  playerwin = loadSound("Sounds/playerwin.mp3")
  bgm = loadSound("Sounds/bgm.mp3")
}
//Calls for the background music to be played and looped.
function backgroundmusic(){
  bgm.play();
  bgm.loop();
  bgm.setVolume(0.5);
}

function draw() {
  clear();
  //Creates basketball court background image.
  imageMode(CENTER);
  image(bg, 400, 200, 800, 400);
  //Creats divider line up the middle.
  line(LineX, LineY1, LineX, LineY2);
  //Creates movement for ball one.
  //circle(Ball1X, Ball1Y, BallR);
  Ball1Y = Ball1Y + BallSpeedY * BallSpeed;
  Ball1X = Ball1X + BallSpeedX * BallSpeed;
  image(ball1, Ball1X, Ball1Y, 50, 50);

  //Collisions for ball one.
  if (Ball1X > LineX - 30) BallSpeedX = random(-1, -3);
  if (Ball1Y < 25) {
    BallSpeedY = random(1, 3);
    bounce.play();
  }
  if (Ball1X < 0 + 30) {
    BallSpeedX = random(1, 3);
    P1Score = P1Score - 2;
    losepoints.play();
  }
  if (Ball1Y > 400 - 30) {
    BallSpeedY = random(-1, -3);
    bounce.play();
  }
  //Creates movement for ball two.
  //circle(Ball2X, Ball2Y, BallR);
  Ball2Y = Ball2Y + BallSpeedY2 * BallSpeed2;
  Ball2X = Ball2X + BallSpeedX2 * BallSpeed2;
  image(ball2, Ball2X, Ball2Y, 50, 50);
  //Ball two collisions.
  if (Ball2X < LineX + 30) BallSpeedX2 = random(1, 3);
  if (Ball2Y < 25) {
    BallSpeedY2 = random(1, 3);
    bounce.play();
  }
  if (Ball2X > 800 - 30) {
    BallSpeedX2 = random(-1, -3);
    P2Score = P2Score - 2;
    losepoints.play();
  }
  if (Ball2Y > 375) {
    BallSpeedY2 = random(-1, -3);
    bounce.play();
  }

  //Makes player one.
  //rect(Player1X, Player1Y, PlayerW, PlayerH)
  image(p1, Player1X + 7, Player1Y + 50, 40, PlayerH + 65);
  //Makes player two.
  //rect(Player2X, Player2Y, PlayerW, PlayerH)
  image(p2, Player2X + 7, Player2Y + 50, 40, PlayerH + 65);
  //Collisions between the ball and players.
  if (Ball1X - 45 < Player1X && Ball1Y > Player1Y && Ball1Y < Player1Y + 125)
    BallSpeedX = random(1, 3);

  if (Ball2X + 35 > Player2X && Ball2Y > Player2Y && Ball2Y < Player2Y + 125)
    BallSpeedX2 = random(-1, -3);
  // Allows for movement of both players at the same time.
  if (keyIsDown(87)) {
    Player1Y = Player1Y - 10;
  } else if (keyIsDown(83)) {
    Player1Y = Player1Y + 10;
  }
  if (keyIsDown(79)) {
    Player2Y = Player2Y - 10;
  } else if (keyIsDown(76)) {
    Player2Y = Player2Y + 10;
  }
//Stops players from leaving boundaries.
  if (Player1Y <= 20) Player1Y = Player1Y + 10;

  if (Player1Y + 125 >= Height) Player1Y = Player1Y - 10;

  if (Player2Y <= 20) Player2Y = Player2Y + 10;

  if (Player2Y + 125 >= Height) Player2Y = Player2Y - 10;

  //Creates rectangles that act as goals.
  //rect(P1PadX, P1PadY, 10, 100)
  image(net1, P1PadX - 20, P1PadY + 70, 60, 135);
  //rect(P2PadX, P2PadY, 10, 100)
  image(net2, P2PadX + 30, P2PadY + 70, 65, 135);
  //Makes scoreboard image and text.
  imageMode(CENTER);
  image(sb, 400, 400, 250, 175);
  textSize(26);
  textAlign(CENTER);
  text(P1Score, 370, 370);
  textAlign(CENTER);
  text(P2Score, 430, 370);
//Plays getpoint audio, adds one point, and moves goal to new random locaation.
  if (Ball1X > P1PadX - 40 && Ball1Y < P1PadY + 100 && Ball1Y > P1PadY) {
    getpoints.play();
    P1Score = P1Score + 1;
    P1PadY = random(50, 300);
  }
  if (Ball2X < P2PadX + 40 && Ball2Y < P2PadY + 105 && Ball2Y > P2PadY) {
    getpoints.play();
    P2Score = P2Score + 1;
    P2PadY = random(50, 300);
  }
  //Makes text for player 1 and 2 wins and losses.
  textSize(80);
    text("P1Win", 200, end1);
    text("P1Lose", 200, end2);
    text("P2Win", 600, end3);
    text("P2Lose", 600, end4);
//Makes requirement for player 1 win and player 2 loss.
  if (P1Score >= 5) {
    end1 = end5;
    end4 = end5;
    BallSpeedX = 0;
    BallSpeedX2 = 0;
    BallSpeedY = 0;
    BallSpeedY2 = 0;
  }
  //Makes requirement for player 2 wins and player 1 wins.
  if (P2Score >= 5) {
    end2 = end5;
    end3 = end5;
    BallSpeedX = 0;
    BallSpeedX2 = 0;
    BallSpeedY = 0;
    BallSpeedY2 = 0;
  }

}
