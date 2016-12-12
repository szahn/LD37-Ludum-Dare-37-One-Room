interface IInputState{
    isDown: boolean;
    isUp: boolean;
    isLeft : boolean;
    isRight: boolean;
}

class GameInput {
    public static state : IInputState = {
        isDown: false,
        isLeft: false,
        isRight: false,
        isUp: false
    };

    static isWalking(){
        return this.state.isDown || this.state.isUp || this.state.isLeft || this.state.isRight;
    }

    static onDown(isPressed: boolean){
        this.state.isDown = isPressed;
    }

    static onUp(isPressed: boolean){
        this.state.isUp = isPressed;
    }

    static onLeft(isPressed: boolean){
        this.state.isLeft = isPressed;
    }

    static onRight(isPressed: boolean){
        this.state.isRight = isPressed;
    }

    static onAction(isPressed: boolean){

    }

}

export = GameInput;