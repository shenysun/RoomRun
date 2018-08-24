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
/**游戏结束 */
var GameOverLayer = (function (_super) {
    __extends(GameOverLayer, _super);
    function GameOverLayer() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    GameOverLayer.prototype.init = function () {
        //
        var bg_wenzi = GameConst.createBitmapFromSheet("bg_wenzi", "ui");
        bg_wenzi.x = (GameConst.StageW - bg_wenzi.width) / 2;
        this.addChild(bg_wenzi);
        //失败
        var shibai = GameConst.createBitmapFromSheet("shibai", "ui");
        shibai.x = (GameConst.StageW - shibai.width) / 2;
        shibai.y = 50;
        this.addChild(shibai);
        var fenshu = GameConst.createBitmapFromSheet("fenshu", "ui");
        this.addChild(fenshu);
        fenshu.x = 120;
        fenshu.y = 238;
        var zuigaojilu = GameConst.createBitmapFromSheet("zuigaojilu", "ui");
        zuigaojilu.x = 290;
        zuigaojilu.y = 238;
        this.addChild(zuigaojilu);
        /**再玩一局 */
        var btn_y = GameConst.createBitmapFromSheet("btn_y", "ui");
        btn_y.anchorOffsetX = btn_y.width / 2;
        btn_y.anchorOffsetY = btn_y.height / 2;
        btn_y.x = GameConst.StageW / 2;
        btn_y.y = GameConst.StageH / 2 - 20;
        this.addChild(btn_y);
        var btn_zaiwan = GameConst.createBitmapFromSheet("btn_zaiwan", "ui");
        btn_zaiwan.x = (GameConst.StageW - btn_zaiwan.width) / 2;
        btn_zaiwan.y = GameConst.StageH / 2 - 35;
        btn_zaiwan.touchEnabled = true;
        this.addChild(btn_zaiwan);
        /**炫耀一下 */
        var btn_b = GameConst.createBitmapFromSheet("btn_b", "ui");
        btn_b.anchorOffsetX = btn_b.width / 2;
        btn_b.anchorOffsetY = btn_b.height / 2;
        btn_b.x = GameConst.StageW / 2;
        btn_b.y = GameConst.StageH / 2 + 145;
        this.addChild(btn_b);
        var btn_xuanya = GameConst.createBitmapFromSheet("btn_xuanya", "ui");
        btn_xuanya.x = (GameConst.StageW - btn_zaiwan.width) / 2;
        btn_xuanya.y = GameConst.StageH / 2 + 130;
        btn_xuanya.touchEnabled = true;
        this.addChild(btn_xuanya);
        //分数
        this.scoreNum = new SpecialNumber();
        this.scoreNum.x = 138;
        this.scoreNum.y = 283;
        this.addChild(this.scoreNum);
        //最高分数
        this.maxScore = new SpecialNumber();
        this.maxScore.x = 330;
        this.maxScore.y = 283;
        this.addChild(this.maxScore);
        btn_zaiwan.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            //再来一局
            GameControl.Instance.onGameScenesHandler();
        }, this);
        btn_xuanya.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //分享
            platform.ShareMessage();
        }, this);
    };
    /**游戏结束页面分数最高分数 */
    GameOverLayer.prototype.setGameOverDataHandler = function (score, maxScore) {
        if (score === void 0) { score = 0; }
        if (maxScore === void 0) { maxScore = 0; }
        this.scoreNum.setData(score.toString());
        this.maxScore.setData(maxScore.toString());
    };
    return GameOverLayer;
}(egret.Sprite));
__reflect(GameOverLayer.prototype, "GameOverLayer");
