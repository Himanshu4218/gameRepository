export function collision(ball,object){

    let topofball = ball.position.y;
    let bottomofball = ball.position.y + ball.height;

    let leftofobject = object.position.x;
    let topofobject = object.position.y;
    let rightofobject = object.position.x + object.width;
    let bottomofobject = object.position.y + object.height;

    if( 
        topofball <= bottomofobject &&
        bottomofball >= topofobject &&
        ball.position.x >= leftofobject &&
        ball.position.x + ball.width <= rightofobject
    ){
        return true;
    }
    else{
        return false;
    }
}