import Scene = require("./gameScene");
import Camera = require("./gameCamera");
import Renderer = require("./gameRenderer");

class World {
    static scene = new Scene();
    static camera = new Camera();
    static renderer = new Renderer();
}

export = World;