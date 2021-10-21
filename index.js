import Game from './game.js';

let canvas = document.getElementById("gameContainer");
let ctx = canvas.getContext("2d");

const gameWidth = 800;
const gameHeight = 600;
let lasttime = 0;
let game = new Game(gameWidth,gameHeight);

// game.start();
function gameLoop(timestamp){ 

    let deltatime = timestamp - lasttime;
    lasttime = timestamp;

    ctx.clearRect(0,0,gameWidth,gameHeight);

    game.update(deltatime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);

