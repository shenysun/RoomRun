var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**墙体晃动 */
var Shake = (function () {
    function Shake() {
    }
    Shake.prototype.run = function (obj, shakeNum, overFunc) {
        if (overFunc === void 0) { overFunc = null; }
        this.obj = obj;
        this.initY = obj.y;
        this.shakeNum = shakeNum;
        this.overFunc = overFunc;
        egret.startTick(this.loop, this);
        this.num = 0;
        this.flag = 0;
    };
    Shake.prototype.loop = function () {
        if (this.flag == 0) {
            if (this.obj.y <= this.initY) {
                this.obj.y += 5;
            }
            else {
                this.obj.y -= 5;
            }
            if (this.obj.y == this.initY) {
                this.num++;
                if (this.num == this.shakeNum) {
                    egret.stopTick(this.loop, this);
                    if (this.overFunc) {
                        this.overFunc();
                    }
                }
            }
        }
        this.flag++;
        if (this.flag == 2) {
            this.flag = 0;
        }
        return false;
    };
    return Shake;
}());
__reflect(Shake.prototype, "Shake");
