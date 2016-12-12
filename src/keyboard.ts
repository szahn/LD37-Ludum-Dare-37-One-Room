import GameInput = require("./gameInput");
class Keyboard {
    static KEY_ENTER = 13;
    static KEY_LEFT = 37;
    static KEY_UP = 38;
    static KEY_RIGHT = 39;
    static KEY_DOWN = 40;

    static onKeyPress(keyCode: number, isDown: boolean){
        switch (keyCode){
            case Keyboard.KEY_UP:{
                GameInput.onUp(isDown);
                break;
            }
            case Keyboard.KEY_DOWN:{
                GameInput.onDown(isDown);
                break;
            }
            case Keyboard.KEY_RIGHT:{
                GameInput.onRight(isDown);
                break;
            }
            case Keyboard.KEY_LEFT:{
                GameInput.onLeft(isDown);
                break;
            }
            case Keyboard.KEY_ENTER:{
                GameInput.onAction(isDown);
                break;
            }
        }
    }
}

export = Keyboard;