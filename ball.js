import { collision } from "./collision.js";

export default class Ball{

    constructor(game){
        this.game = game;
        this.paddle = game.paddle;
        this.ballimg = document.getElementById("image");
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.width = 15;
        this.height = 15;
        this.reset();

    }

    reset(){
        this.speed = {
            x: 7,
            y: -7
        }
        this.position = {
            x: 0, 
            y: 400
        }
    }

    draw(ctx){
        ctx.drawImage(this.ballimg,this.position.x,this.position.y,this.width,this.height);
    }

    update(deltatime){

        // console.log(this.paddle.position.x);
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.x == this.gameWidth - this.height && this.position.y == 0  ||  this.position.x == 0 && this.position.y == 0){
            this.speed.x = -this.speed.x;
            this.speed.y = -this.speed.y;
        }
        else
        if(this.position.x == 0 && this.paddle.position.x == 0 && this.position.y - this.height == this.paddle.position.y){
            this.speed.x = -this.speed.x;
            this.speed.y = -this.speed.y;
        }
        else
        if(this.position.x == this.gameWidth - this.width && this.paddle.position.x == this.gameWidth - this.paddle.width && this.position.y - this.height == this.paddle.position.y){
            this.speed.x = -this.speed.x;
            this.speed.y = -this.speed.y;
        }
        else
        if(this.position.x < 0 || this.position.x > this.gameWidth - this.width){
            this.speed.x = -this.speed.x;
        } 
        else
        if(this.position.y < 0){
            this.speed.y = -this.speed.y;
        }
        else 
        if(this.position.y > this.gameHeight - this.height){
            this.game.lives--;
            this.reset();
        }
        if(collision(this,this.paddle)){
            this.speed.y  = -this.speed.y;
        }
        
    }
}