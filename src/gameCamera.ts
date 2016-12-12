import Viewport = require("./viewport");

class GameCamera extends THREE.PerspectiveCamera{

    private angle: number = 0;
    constructor(){
        super(80, Viewport.width() / Viewport.height(), .1, 1000);
        this.position.z = 0;
        this.position.x = 0;
        this.position.y = 0;
        this.rotation.x = 0;
        this.updateAngle(0);
    }

    public updateAngle(diff: number){
        this.angle += diff;
        if (this.angle > 360){this.angle = 0;}
        if (this.angle < 0){this.angle = 360;}
        this.rotation.y = this.angle * Math.PI / 180
    }
    

}

export = GameCamera;