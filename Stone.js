class Stone{

    constructor(x, y, radius){

        var options = {

            isStatic : false,
            density : 1.2,
            restitution : 1,
            friction : 1.2
        }

        this.body = Bodies.circle(x, y, radius - 10, options);

        this.radius = radius;

        this.image = loadImage("stone.png");

        World.add(world, this.body);

    }

    

    display(){

        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rotate(this.body.angle);

        imageMode(CENTER);
        image(this.image, 0, 0, this.radius, this.radius);

        pop();
    }
}