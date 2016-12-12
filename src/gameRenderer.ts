import Viewport = require("./viewport");

class GameRenderer extends THREE.WebGLRenderer {

    constructor(){
        super();
        this.autoClear = false;
    }

    resize(){
        this.setSize(Viewport.width(), Viewport.height());
    }
}

export = GameRenderer;