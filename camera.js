class Camera{
    constructor(target, scale){
        this.x = target.x;
        this.y = target.y;
        this.offset_x = this.x - width/2;
        this.offset_y = this.y - height/2;
        this.scale = scale;
    }

    update(target){
        this.x = target.x;
        this.y = target.y;
        this.offset_x = this.x - width/2;
        this.offset_y = this.y - height/2;
    }
}
