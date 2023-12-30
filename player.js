export default class Player {
    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    saeenRunImages = [];

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
        this.yStandingPosition = this.y;

        this.standStillImage = new Image();
        this.standStillImage.src = "images/4.png";
        this.image = this.standStillImage;

        this.jumpingImage = new Image();
        this.jumpingImage.src = "images/jump.png";

        const saeenRunImage1 = new Image();
        saeenRunImage1.src = "images/1.png";

        const saeenRunImage2 = new Image();
        saeenRunImage2.src = "images/2.png";

        const saeenRunImage3 = new Image();
        saeenRunImage3.src = "images/3.png";

        const saeenRunImage4 = new Image();
        saeenRunImage4.src = "images/4.png";

        this.saeenRunImages.push(saeenRunImage1);
        this.saeenRunImages.push(saeenRunImage2);
        this.saeenRunImages.push(saeenRunImage3);
        this.saeenRunImages.push(saeenRunImage4);

        //keyboard
        window.removeEventListener('keydown',this.keydown);
        window.removeEventListener('keyup',this.keyup);

        window.addEventListener('keydown',this.keydown);
        window.addEventListener('keyup',this.keyup);

        //touch
        window.removeEventListener('touchstart',this.touchstart);
        window.removeEventListener('touchend',this.touchend);

        window.addEventListener('touchstart',this.touchstart);
        window.addEventListener('touchend',this.touchend);
        
    }

    keydown = (event)=>{
        if(event.code ==='Space'){
            this.jumpPressed = true;
        }
    };

    keyup = (event)=>{
        if(event.code ==='Space'){
            this.jumpPressed = false;
        }
    };

    touchstart=()=>{
        this.jumpPressed = true;
    }

    touchend=()=>{
        this.jumpPressed = false;
    }

    update(gameSpeed, frameTimeDelta) {
        this.run(gameSpeed, frameTimeDelta);
        if(this.jumpInProgress){
            this.image=this.jumpingImage;
        }
        this.jump(frameTimeDelta);
    }

    jump(frameTimeDelta){
        if(this.jumpPressed){
            this.jumpInProgress=true;
        }
        if(this.jumpInProgress && !this.falling){
            //jump until the min height is reached
            if(this.y>this.canvas.height - this.minJumpHeight || (this.y> this.canvas.height - this.maxJumpHeight && this.jumpPressed)){
                this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            }

            else{
                this.falling = true;
            }
        }

        else{
            if(this.y< this.yStandingPosition){
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                if(this.y + this.height> this.canvas.height){
                    this.y = this.yStandingPosition;
                }
            }
            else{
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    run(gameSpeed, frameTimeDelta) {
        if (this.walkAnimationTimer <= 0) {
            if (this.image === this.saeenRunImages[0]) {
                this.image = this.saeenRunImages[1];
            } else {
                this.image = this.saeenRunImages[0];
            }
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        }

        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
