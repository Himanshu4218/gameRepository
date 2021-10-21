
export default class Paddle{

    constructor(game){
        this.game_width = game.gameWidth;
        this.width = 150;
        this.height = 10;
        this.speed = 0;
        this.maxSpeed = 10;

        this.position =  {
            x :  game.gameWidth/2 - this.width/2 ,
            y :  game.gameHeight - this.height - 20
        }
    }

    draw(ctx){
        ctx.fillStyle = "#252068";
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    moveRight(){
        this.speed = this.maxSpeed;
    }

    stop(){
        this.speed = 0;
    }

    update(deltatime){

        if(this.position.x < 0){
            this.position.x = 0;
        }
        else
        if(this.position.x > this.game_width -this.width){
            this.position.x = this.game_width - this.width;
        }
        else{
            this.position.x += this.speed;
        }

    }

}