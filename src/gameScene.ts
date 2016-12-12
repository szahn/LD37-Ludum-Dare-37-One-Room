class GameScene extends THREE.Scene {

    constructor(){
        super();
    }

    ambientLight(color: string){
        this.add(new THREE.AmbientLight(color));
    }

    addAll(objects: THREE.Object3D[]){
        objects.forEach((obj)=> this.add(obj));
    }

}

export = GameScene;