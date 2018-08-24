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
/**游戏管理 */
var GameControl = (function (_super) {
    __extends(GameControl, _super);
    function GameControl() {
        var _this = _super.call(this) || this;
        _this.startGame = new StartGameLayer();
        _this.gameScenes = new GameScenesLayer();
        _this.overScenes = new GameOverLayer();
        return _this;
    }
    Object.defineProperty(GameControl, "Instance", {
        get: function () {
            if (!GameControl._instance) {
                GameControl._instance = new GameControl();
            }
            return GameControl._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameControl.prototype.setStageHandler = function (stage) {
        /**设置当前场景的背景 */
        this.currentStage = stage;
        this.bgImg = GameConst.CreateBitmapByName("bg_jpg");
        this.bgImg.width = GameConst.StageW;
        this.bgImg.height = GameConst.StageH;
        //把背景添加到当期场景
        this.currentStage.addChild(this.bgImg);
    };
    /**开始游戏的场景 */
    GameControl.prototype.startGameHandler = function () {
        if (this.gameScenes && this.gameScenes.parent) {
            GameConst.removeChild(this.gameScenes);
        }
        if (this.gameScenes && this.overScenes.parent) {
            GameConst.removeChild(this.overScenes);
        }
        this.currentStage.addChild(this.startGame);
        GameApp.xia.visible = true;
    };
    /**游戏场景 */
    GameControl.prototype.onGameScenesHandler = function () {
        if (this.startGame && this.startGame.parent) {
            GameConst.removeChild(this.startGame);
        }
        if (this.overScenes && this.overScenes.parent) {
            GameConst.removeChild(this.overScenes);
        }
        this.currentStage.addChild(this.gameScenes);
        GameApp.xia.visible = false;
    };
    /**游戏结束场景 */
    GameControl.prototype.showGameOverSceneHandler = function () {
        if (this.startGame && this.startGame.parent) {
            GameConst.removeChild(this.startGame);
        }
        if (this.gameScenes && this.gameScenes.parent) {
            GameConst.removeChild(this.gameScenes);
        }
        this.currentStage.addChild(this.overScenes);
        GameApp.xia.visible = true;
    };
    GameControl.prototype.getGameOverDisplay = function () {
        return this.overScenes;
    };
    return GameControl;
}(egret.Sprite));
__reflect(GameControl.prototype, "GameControl");
