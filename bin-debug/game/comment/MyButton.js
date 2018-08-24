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
/**自定义按钮类 */
var MyButton = (function (_super) {
    __extends(MyButton, _super);
    function MyButton(bgName, titleName) {
        var _this = _super.call(this) || this;
        _this._bg = GameConst.createBitmapFromSheet(bgName, "ui");
        _this.addChild(_this._bg);
        _this.title = GameConst.createBitmapFromSheet(titleName, "ui");
        _this.title.x = (_this._bg.width - _this.title.width) >> 1;
        _this.title.y = (_this._bg.height - _this.title.height) >> 1;
        _this.addChild(_this.title);
        return _this;
    }
    //设置点击触发事件
    MyButton.prototype.setClick = function (func) {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEvent, this);
        this.onClick = func;
    };
    //点击触发的事件
    MyButton.prototype.onClickEvent = function () {
        this.onClick();
    };
    MyButton.prototype.setTitle = function (title) {
        this.title = GameConst.CreateBitmapByName(title);
    };
    Object.defineProperty(MyButton.prototype, "bg", {
        get: function () {
            return this._bg;
        },
        set: function (bg) {
            this._bg = bg;
        },
        enumerable: true,
        configurable: true
    });
    return MyButton;
}(egret.Sprite));
__reflect(MyButton.prototype, "MyButton");
