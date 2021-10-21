import {level1} from './level.js';
import {collision} from './collision.js';

export default class Brick{
    
    constructor(game,position){
        this.ball = game.ball;
        this.image = document.getElementById("tileImage");
        this.width = 48;
        this.height = 32;
        this.position = position;
        this.hit = false;
    }

    // draw(ctx){
    //     for(let i = 1;i <= 4;++i){
    //         for(let j = 0;j < 16;++j){
    //             ctx.drawImage(this.image,j*this.width,30*i,this.width,this.height);
    //         }
    //     }
    // }
    draw(ctx){

        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);

    }

    update(deltatime){

        if(collision(this.ball,this)){
            this.ball.speed.y = -this.ball.speed.y;
            this.hit = true;
        }

    }

}