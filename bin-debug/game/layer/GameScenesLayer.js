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
/**游戏场景 */
var GameScenesLayer = (function (_super) {
    __extends(GameScenesLayer, _super);
    function GameScenesLayer() {
        var _this = _super.call(this) || this;
        _this.spaceArr = [50, 70, 90, 110];
        _this.init();
        return _this;
    }
    GameScenesLayer.prototype.init = function () {
        this.shake1 = new Shake();
        this.shake2 = new Shake();
        var bg_jpg = new egret.Bitmap(RES.getRes("bg_jpg"));
        this.addChild(bg_jpg);
        this.bg = RES.getRes("bg_qiang_png");
        var bg = new egret.Bitmap(this.bg);
        //背景遮罩
        bg.mask = new egret.Rectangle(0, GameConst.StageH, GameConst.StageW, 300);
        this.addChild(bg);
        this.bgBitmaps = new Array();
        this.topContianer = new egret.Sprite();
        this.addChild(this.topContianer);
        this.topSprite = new egret.Sprite();
        this.topContianer.addChild(this.topSprite);
        this.topLine = new egret.Shape();
        this.topContianer.addChild(this.topLine);
        this.bottomContianer = new egret.Sprite();
        this.addChild(this.bottomContianer);
        this.bottomSprite = new egret.Sprite();
        this.bottomContianer.addChild(this.bottomSprite);
        this.bottomLine = new egret.Shape();
        this.bottomContianer.addChild(this.bottomLine);
        this.topRects = new Array();
        this.bottomRects = new Array();
        this.titleImg = GameConst.createBitmapFromSheet("bg_shangkuang", "ui");
        this.addChild(this.titleImg);
        this.scoreKuang = GameConst.createBitmapFromSheet("kuang", "ui");
        this.scoreKuang.x = 5;
        this.addChild(this.scoreKuang);
        this.lvkuang = GameConst.createBitmapFromSheet("kuang", "ui");
        this.lvkuang.scaleX = -1;
        this.lvkuang.x = 466;
        this.addChild(this.lvkuang);
        this.maxScore = GameConst.createBitmapFromSheet("fenshu", "ui");
        this.maxScore.x = 40;
        this.maxScore.y = 15;
        this.addChild(this.maxScore);
        this.currLV = GameConst.createBitmapFromSheet("guanqia", "ui");
        this.currLV.x = 368;
        this.currLV.y = 15;
        this.addChild(this.currLV);
        this.LvNum = new SpecialNumber();
        this.LvNum.x = 393;
        this.LvNum.y = 50;
        this.addChild(this.LvNum);
        this.recodeNum = new SpecialNumber();
        this.recodeNum.x = 73;
        this.recodeNum.y = 50;
        this.addChild(this.recodeNum);
        this.curretLevel = 1;
        this.curretMaxScore = 0;
        this.LvNum.setData(this.curretLevel.toString());
        this.recodeNum.setData(this.curretMaxScore.toString());
        this.role = new Role();
        this.addChild(this.role);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    };
    GameScenesLayer.prototype.addStage = function () {
        this.dieNum = 0;
        this.score = 0;
        this.curretLevel = 1;
        this.refreshScore();
        this.initData();
        // setTimeout(this.start, this, 100);
        this.start();
    };
    /**刷新成绩数据 */
    GameScenesLayer.prototype.refreshScore = function () {
        this.LvNum.setData(this.curretLevel.toString());
        this.recodeNum.setData(this.score.toString());
    };
    GameScenesLayer.prototype.start = function () {
        this.touchEnabled = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        //setTimeout(this.shakeRun(), this, 1000);
        var self = this;
        setTimeout(function () {
            self.shakeRun();
        }, 1500);
        // this.shakeRun()
    };
    GameScenesLayer.prototype.shakeRun = function () {
        //墙体晃动效果
        this.shake1.run(this.topContianer, 5, this.land.bind(this));
    };
    GameScenesLayer.prototype.land = function () {
        var self = this;
        //一波墙体运动之后移除点击事件
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        //上面的模块往下运动
        egret.Tween.get(this.topContianer).to({ "y": 0 }, 100).call(function () {
            self.landOver();
        });
    };
    GameScenesLayer.prototype.landOver = function () {
        //根据离墙体的高度判断现在的状态
        this.checkState();
        // this.shake1.run(this.topContianer, 3);
        //
        this.shake2.run(this.bottomContianer, 3, this.checkResult.bind(this));
    };
    //
    GameScenesLayer.prototype.checkState = function () {
        var space = this.getSpace();
        if (space == 0) {
            this.role.setState(Role.STATE5);
        }
        else if (space == this.spaceArr[2]) {
            this.role.setState(Role.STATE4);
        }
        else if (space == this.spaceArr[0]) {
            this.role.setState(Role.STATE3);
        }
        else if (space == this.spaceArr[1]) {
            this.role.setState(Role.STATE2);
        }
        if (space == 0) {
            this.setRolePos(this.rolePosIndex, -10, 4);
        }
    };
    /**检验这关结束主角是否存活 */
    GameScenesLayer.prototype.checkResult = function () {
        var space = this.getSpace();
        var self = this;
        if (space == 0) {
            this.dieNum++;
            if (this.dieNum == 1) {
                this.role.stop();
                setTimeout(function () {
                    //游戏结束
                    GameControl.Instance.getGameOverDisplay().setGameOverDataHandler(self.score, self.curretMaxScore);
                    GameControl.Instance.showGameOverSceneHandler();
                }, 500);
                return;
            }
        }
        else {
            this.curretLevel++;
            this.score += 10;
            if (this.score > this.curretMaxScore) {
                this.curretMaxScore = this.score;
            }
            //刷新成绩
            this.refreshScore();
        }
        setTimeout(function () {
            self.refreshPoint();
        }, 1000);
    };
    GameScenesLayer.prototype.getSpace = function () {
        var top = this.topRects[this.rolePosIndex];
        var bottom = this.bottomRects[this.rolePosIndex];
        return GameConst.StageH - top.height - bottom.height;
    };
    /**刷新游戏关卡 */
    GameScenesLayer.prototype.refreshPoint = function () {
        this.initData();
        this.start();
    };
    /**点击事件 */
    GameScenesLayer.prototype.onClick = function (e) {
        var len = this.bottomRects.length;
        for (var i = 0; i < len; i++) {
            var rec = this.bottomRects[i];
            if (e.stageX > rec.x && e.stageX < rec.x + rec.width) {
                this.setRolePos(i);
                break;
            }
        }
    };
    GameScenesLayer.prototype.initData = function () {
        this.role.setState(Role.STATE1);
        this.role.play();
        this.topRects.splice(0, this.topRects.length);
        this.bottomRects.splice(0, this.bottomRects.length);
        var min = 150;
        var flag = false;
        var len = 8;
        var w = GameConst.StageW / len;
        for (var i = 0; i < len; i++) {
            var h = min + Math.floor(Math.random() * 8) * 10;
            this.bottomRects.push(new egret.Rectangle(i * w, GameConst.StageH - h, w, h));
            h = GameConst.StageH - h;
            if (Math.random() < 0.2 || (!flag && i == len - 1)) {
                var index = Math.floor(Math.random() * this.spaceArr.length);
                h -= this.spaceArr[index];
                flag = true;
            }
            this.topRects.push(new egret.Rectangle(i * w, 0, w, h));
        }
        //图   区域(填充)
        this.fullFront(this.topSprite, this.topRects);
        this.fullFront(this.bottomSprite, this.bottomRects, true);
        this.drawLine();
        this.topContianer.y = -200;
        this.setRolePos(3, 17, 0, true);
    };
    GameScenesLayer.prototype.setRolePos = function (index, offY, offX, isInit) {
        if (offY === void 0) { offY = 17; }
        if (offX === void 0) { offX = 0; }
        if (isInit === void 0) { isInit = false; }
        if (!isInit) {
            if (this.rolePosIndex > index) {
                index = this.rolePosIndex - 1;
            }
            else if (this.rolePosIndex < index) {
                index = this.rolePosIndex + 1;
            }
        }
        this.rolePosIndex = index;
        var rec = this.bottomRects[index];
        //一次只移动一格
        this.role.x = rec.x + rec.width / 2 + offX;
        this.role.y = rec.y + offY;
    };
    GameScenesLayer.prototype.drawLine = function () {
        var lineH = 10;
        this.topLine.graphics.clear();
        this.topLine.graphics.lineStyle(lineH, 0x33E7FE);
        this.bottomLine.graphics.clear();
        this.bottomLine.graphics.lineStyle(lineH, 0x33E7FE);
        this.drawTopLine(lineH / 2);
        this.drawBottomLine(lineH / 2);
        this.topLine.graphics.endFill();
        this.bottomLine.graphics.endFill();
    };
    GameScenesLayer.prototype.drawTopLine = function (lineH) {
        var len = this.topRects.length;
        for (var i = 0; i < len; i++) {
            var rec = this.topRects[i];
            if (i == 0) {
                this.topLine.graphics.moveTo(rec.x, rec.height);
                this.topLine.graphics.lineTo(rec.x + rec.width, rec.height);
            }
            else {
                this.topLine.graphics.lineTo(rec.x, rec.height);
                this.topLine.graphics.lineTo(rec.x + rec.width, rec.height);
            }
        }
    };
    GameScenesLayer.prototype.drawBottomLine = function (lineH) {
        var len = this.bottomRects.length;
        for (var i = 0; i < len; i++) {
            var rec = this.bottomRects[i];
            if (i == 0) {
                this.bottomLine.graphics.moveTo(rec.x, rec.y + lineH);
                this.bottomLine.graphics.lineTo(rec.x + rec.width, rec.y + lineH);
            }
            else {
                this.bottomLine.graphics.lineTo(rec.x, rec.y + lineH);
                this.bottomLine.graphics.lineTo(rec.x + rec.width, rec.y + lineH);
            }
        }
    };
    GameScenesLayer.prototype.fullFront = function (bgSptite, rects, isBottom) {
        if (isBottom === void 0) { isBottom = false; }
        bgSptite.cacheAsBitmap = false;
        this.clearBg(bgSptite);
        var len = rects.length;
        for (var i = 0; i < len; i++) {
            var rec = rects[i];
            var bitmap;
            if (this.bgBitmaps.length) {
                bitmap = this.bgBitmaps.pop();
            }
            else {
                bitmap = new egret.Bitmap();
                bitmap.texture = this.bg;
            }
            bitmap.scrollRect = rec;
            bitmap.x = rec.x;
            bitmap.y = rec.y;
            bgSptite.addChild(bitmap);
        }
    };
    GameScenesLayer.prototype.clearBg = function (bgSptite) {
        while (bgSptite.numChildren) {
            var bitmap = bgSptite.getChildAt(0);
            if (bitmap) {
                bgSptite.removeChild(bitmap);
                this.bgBitmaps.push(bitmap);
            }
        }
    };
    return GameScenesLayer;
}(egret.Sprite));
__reflect(GameScenesLayer.prototype, "GameScenesLayer");
