
var score=0.0;
var multScore=1.0;
var totalScore = score * multScore;

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
//
const MAX_RAND = 40;

//vitesse du serpent
const DELAY = 150;

const C_HEIGHT = 500;
const C_WIDTH = 500;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    Pname = document.getElementById('Pname');
    var person = prompt("Enter your player name", "PlayerName");

    Pname.innerHTML = "Player name: " + person ;
    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}


//initialise les textures/images du serpent
function loadImages() {

    head = new Image();
    head.src = 'head.png';

    ball = new Image();
    ball.src = 'dot.png';

    apple = new Image();
    apple.src = 'apple.png';
}


//initialise le serpent de départ
function createSnake() {

    dots = 3;

    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}


//aspect graphique du jeu
function doDrawing() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < dots; z++) {

            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            }
        }
    } else {
        //écran de fin si le joueur a perdu
        gameOver();
    }
}

//fonction qui dessine l'écran de fin
function gameOver() {

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2-30);
    ctx.fillText('-- Score :  '+ totalScore +' --', C_WIDTH/2, C_HEIGHT/2+40);

}

//fonction qui vérifie si le joueur a bien mangé un point/pomme
function checkApple() {

    if ((x[0] == apple_x) && (y[0] == apple_y)) {

        dots++;
        addPoint();
        locateApple();
    }
}

//fonction qui s'occupe de l'affichage du score
function addPoint() {

    divScore = document.getElementById('score');
    score = score + 2;
    multScore = multScore + 0.5;
    totalScore = totalScore + score * multScore;
    divScore.innerHTML = "Score : " + totalScore;


}
//fonction qui vérifie sur quelle bouton on a cliqué et qui déplace le serpent
function move() {

    for (var z = dots; z > 0; z--) {

        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {

        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {

        x[0] += DOT_SIZE;
    }

    if (upDirection) {

        y[0] -= DOT_SIZE;
    }

    if (downDirection) {

        y[0] += DOT_SIZE;
    }
}


//fonction qui vérifie si le serpent entre en collision avec lui même ou les bordures du jeu
function checkCollision() {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {

        inGame = false;
    }

    if (y[0] < 0) {

        inGame = false;
    }

    if (x[0] >= C_WIDTH) {

        inGame = false;
    }

    if (x[0] < 0) {

        inGame = false;
    }
}


//fonction qui initalise la position du point/pomme à chaque fois que le joueur mange une pomme
function locateApple() {

    var randomX = Math.floor(Math.random() * MAX_RAND);
    apple_x = randomX * DOT_SIZE;

    randomY = Math.floor(Math.random() * MAX_RAND);
    apple_y = randomY * DOT_SIZE;
}

//fonction qui simule le cycle de vie du jeu
function gameCycle() {

    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}


//fonction qui initialise les directions
onkeydown = function(e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY) && (!rightDirection)) {

        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {

        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {

        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {

        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }


};

//fonction qui rafraichi la page quand on clique sur le bouton restart

function reload() {

    window.location.reload();
}