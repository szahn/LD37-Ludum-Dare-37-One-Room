import World = require("./world");
import GameInput = require("./gameInput");

class Game {
    private clock = new THREE.Clock(true);            

    init(){
        World.renderer.resize();
        this.buildLevel();
        document.body.appendChild(World.renderer.domElement);
    }

    buildFloorPlane(x: number, z: number, color: string){
        var geometry = new THREE.PlaneGeometry( 5, 5, 2, 2 );
        var material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry, material );
        plane.position.set(x,-1.25,z);
        plane.rotation.set(90* Math.PI / 180, 0, 0);
        World.scene.add( plane );
    }    

    buildCeilPlane(x: number, z: number, color: string){
        var geometry = new THREE.PlaneGeometry( 5, 5, 2, 2 );
        var material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry, material );
        plane.position.set(x,1.25,z);
        plane.rotation.set(90* Math.PI / 180, 0, 0);
        World.scene.add( plane );
    }    

    buildNorthWallPlane(x: number, y: number, color: string){
        var geometry = new THREE.PlaneGeometry( 5, 5, 2 );
        var material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry, material );
        plane.position.set(x,0,y);
        World.scene.add( plane );
    }    

    buildEastWallPlane(x: number, z: number, color: string){
        var geometry = new THREE.PlaneGeometry( 5, 5, 2 );
        var material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry, material );
        plane.position.set(x,0,z);
        plane.rotation.set(0, 90* Math.PI / 180, 0);
        World.scene.add( plane );
    }    

    buildLevel(){
        this.buildFloorPlane(0,0, "#333");
        this.buildNorthWallPlane(2.5, -5, "#a00");
        this.buildNorthWallPlane(-2.5, -5, "#f33");
        this.buildEastWallPlane(5, 2.5, "#3f3");
        this.buildEastWallPlane(5, -2.5, "#0a0");
        this.buildNorthWallPlane(2.5, 5, "#00a");
        this.buildNorthWallPlane(-2.5, 5, "#33f");
        this.buildEastWallPlane(-5, 2.5, "#aa0");
        this.buildEastWallPlane(-5, -2.5, "#ff3");
        this.buildCeilPlane(0,0, "#a0a");
    }

    tick(ticks : number){
        let rotY = 0;
        if (GameInput.state.isLeft){
            rotY = 80 * ticks;
        }
        if (GameInput.state.isRight){
            rotY = -80 * ticks;            
        }

        World.camera.updateAngle(rotY);

    }

    render = () => {
        requestAnimationFrame(this.render);
        this.tick(this.clock.getDelta());
        World.renderer.clearDepth();
        World.renderer.render(World.scene, World.camera);
    }
}

export = new Game();