var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**角色动作类 */
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        _this.currFramesIndex = 0;
        _this.Body = new egret.Bitmap;
        //人物初始状态
        _this.Body = GameConst.createBitmapFromSheet("Role.FRAMES[0][0]", "Sprites");
        //设置锚点
        _this.Body.anchorOffsetX = _this.Body.width * 0.5;
        _this.addChild(_this.Body);
        return _this;
    }
    /**设置状态 */
    Role.prototype.setState = function (state) {
        this.state = state;
        //死亡状态
        if (this.state == Role.STATE5) {
            this.isLoop = false;
            this.Body.anchorOffsetY = this.Body.height * 0;
        }
        else {
            this.isLoop = true;
            this.Body.anchorOffsetY = this.Body.height * 1;
        }
        if (this.state == Role.STATE3 || this.state == Role.STATE4) {
            this.currFrames = [];
            if (Math.random() > 0.5) {
                this.currFrames.push(Role.FRAMES[this.state][0]);
            }
            else {
                this.currFrames.push(Role.FRAMES[this.state][1]);
            }
        }
        else {
            this.currFrames = Role.FRAMES[this.state];
        }
        this.currFramesIndex = 0;
        this.setBody();
    };
    Role.prototype.setBody = function () {
        this.Body.texture = GameConst.getTextureFromSheet(this.currFrames[this.currFramesIndex], "Sprites");
        this.Body.anchorOffsetX = this.Body.width * 0.5;
        if (this.state == Role.STATE5) {
            this.isLoop = false;
            this.Body.anchorOffsetY = this.Body.height * 0;
        }
        else {
            this.isLoop = true;
            this.Body.anchorOffsetY = this.Body.height * 1;
        }
    };
    Role.prototype.run = function () {
        this.runFlag++;
        if (this.runFlag > 4) {
            this.runFlag = 0;
        }
        if (this.runFlag != 0) {
            return;
        }
        var gotoFrameIndex = this.currFramesIndex + 1;
        if (gotoFrameIndex == this.currFrames.length) {
            if (this.isLoop) {
                gotoFrameIndex = 0;
            }
            else {
                gotoFrameIndex = this.currFramesIndex;
            }
        }
        if (gotoFrameIndex != this.currFramesIndex) {
            this.currFramesIndex = gotoFrameIndex;
            this.setBody();
        }
        return false;
    };
    Role.prototype.play = function () {
        egret.startTick(this.run, this);
        this.runFlag = 0;
    };
    Role.prototype.stop = function () {
        egret.stopTick(this.run, this);
    };
    //状态
    Role.STATE1 = 0;
    Role.STATE2 = 1;
    Role.STATE3 = 2;
    Role.STATE4 = 3;
    Role.STATE5 = 4;
    /**人物状态集合 */
    Role.FRAMES = [
        ["0020003", "0020004", "0020005", "0020006", "0020007"],
        ["0020008"],
        ["0020009", "0020010"],
        ["0020011", "0020012"],
        ["xue0001", "xue0002", "xue0003", "xue0004", "xue0005"]
    ];
    return Role;
}(egret.Sprite));
__reflect(Role.prototype, "Role");
