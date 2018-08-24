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
/**特殊字符数字类 */
var SpecialNumber = (function (_super) {
    __extends(SpecialNumber, _super);
    function SpecialNumber() {
        var _this = _super.call(this) || this;
        _this.gap = 0;
        return _this;
    }
    /**设置显示的字符串 */
    SpecialNumber.prototype.setData = function (str) {
        this.clear();
        if (str == "" || str == null) {
            return;
        }
        //把所有数字每一个都存进数组中
        var chars = str.split("");
        var w = 0;
        //所有的长度
        var length = chars.length;
        for (var i = 0; i < length; i++) {
            try {
                var image = GameConst.createBitmapFromSheet(chars[i], "ui");
                if (image) {
                    image.x = w;
                    w += image.width + this.gap;
                    this.addChild(image);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        this.anchorOffsetX = this.width / 2;
    };
    SpecialNumber.prototype.clear = function () {
        while (this.numChildren) {
            this.removeChildAt(0);
        }
    };
    return SpecialNumber;
}(egret.DisplayObjectContainer));
__reflect(SpecialNumber.prototype, "SpecialNumber");
