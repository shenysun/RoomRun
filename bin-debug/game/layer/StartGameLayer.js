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
/**游戏开始场景 */
var StartGameLayer = (function (_super) {
    __extends(StartGameLayer, _super);
    function StartGameLayer() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    StartGameLayer.prototype.init = function () {
        /**添加游戏LOGO */
        this.titleImage = GameConst.createBitmapFromSheet("logo_mishitaosheng", "ui");
        this.titleImage.x = 51;
        this.titleImage.y = 161;
        this.addChild(this.titleImage);
        //开始按钮设置
        this.startBtn = new MyButton("btn_y", "btn_kaishi");
        this.addChild(this.startBtn);
        this.startBtn.x = (GameConst.StageW - this.startBtn.width) / 2;
        this.startBtn.y = GameConst.StageH / 2 - 75;
        this.startBtn.setClick(this.onStartGameClick);
        //更多按钮设置
        this.moreBtn = new MyButton("btn_b", "btn_gengduo");
        this.moreBtn.x = (GameConst.StageW - this.startBtn.width) / 2;
        this.moreBtn.y = GameConst.StageH / 2 + 75;
        this.addChild(this.moreBtn);
        this.moreBtn.setClick(this.onMoreBtnClick);
        //文本
        var tex = new egret.TextField();
        tex.width = GameConst.StageW;
        tex.textAlign = egret.HorizontalAlign.CENTER;
        tex.strokeColor = 0x403e3e;
        tex.stroke = 1;
        tex.bold = true;
        tex.y = GameConst.StageH / 2 + 250;
        tex.text = "Egret";
        this.addChild(tex);
    };
    StartGameLayer.prototype.onStartGameClick = function () {
        GameControl.Instance.onGameScenesHandler();
    };
    StartGameLayer.prototype.onMoreBtnClick = function () {
        console.log("更多游戏");
        platform.GetInfo();
    };
    return StartGameLayer;
}(egret.Sprite));
__reflect(StartGameLayer.prototype, "StartGameLayer");
