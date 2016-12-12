import Game = require("./game");
import Keyboard = require("./keyboard");
import Pointer = require("./pointer");
function bootstrap(){
    Game.init();
    Game.render();
    $(window).mousemove(Pointer.onMove);
    $(window).keydown((e)=>{
        Keyboard.onKeyPress(e.keyCode, true);
    }).keyup((e)=>{
        Keyboard.onKeyPress(e.keyCode, false);
    });
}

const ns : any = window;
ns.bootstrap = bootstrap;
