import Paddle from './paddle.js';
import Inputhandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';
import {brickBuild,level1,level2,level3,level4,level5} from './level.js';

const gameStatus = {
    pause: 0,
    running: 1,
    menu: 2,
    gameOver: 3,
    newLevel: 4
}

export default class Game{

    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = gameStatus.menu;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        new Inputhandler(this.paddle,this); 
        this.gameObjects = [];
        this.lives = 3;
        this.levels = [ level1,level2 ];
        this.bricks = [];
        this.levelNum = 0;
        this.setLevel();

    }

    setLevel(){
        this.bricks = brickBuild(this,this.levels[this.levelNum]);
    }

    start(){
        if(this.gameState !== gameStatus.menu && this.gameState !== gameStatus.newLevel ){
            return;
        }

        this.ball.reset();
        if(this.gameState == gameStatus.menu || this.gameState == gameStatus.gameOver){
            this.gameState = gameStatus.running;
        }
        this.gameObjects = [ this.paddle, this.ball];
    }

    update(deltatime){

        if(this.lives == 0){
            this.gameState = gameStatus.gameOver;
        }

        if(this.bricks.length === 0){
            this.levelNum++;
            this.gameState = gameStatus.newLevel;
            this.ball.reset();
            this.start();  
            this.setLevel();
        }

        if(this.gameState == gameStatus.pause || this.gameState == gameStatus.menu || this.gameState == gameStatus.gameOver){
            return;
        }

        [...this.gameObjects,...this.bricks].forEach(object => {
            object.update(deltatime);
        });

        this.bricks =  this.bricks.filter(object => !object.hit);
    }

    draw(ctx){
        
        [...this.gameObjects,...this.bricks].forEach(object => {
            object.draw(ctx);
        });

        if(this.gameState == gameStatus.pause){
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = " rgb(144, 197, 114,0.5)";
            ctx.fill();
            
            ctx.font = "20px Georgia";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("paused",this.gameWidth/2,this.gameHeight/2);

        }

        if(this.gameState == gameStatus.menu){
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "#aefd80 ";
            ctx.fill();
            
            ctx.font = "20px Georgia";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("Press Space To Start The Game",this.gameWidth/2,this.gameHeight/2);

        }

        if(this.gameState == gameStatus.gameOver){
            ctx.rect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillStyle = "black";
            ctx.fill();
            
            ctx.font = "20px Georgia";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("Game Over",this.gameWidth/2,this.gameHeight/2);

        }

    }

    togglePause(){
        if(this.gameState == gameStatus.pause){
            this.gameState = gameStatus.running;
        }
        else{
            this.gameState = gameStatus.pause;
        }
    }

}