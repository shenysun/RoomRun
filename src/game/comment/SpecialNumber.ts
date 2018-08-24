/**特殊字符数字类 */
class SpecialNumber extends egret.DisplayObjectContainer {
    public constructor() {
        super();
    }
    public gap:number = 0;
    /**设置显示的字符串 */
    public setData(str:string):void {
        this.clear();
        if(str == "" || str == null) {
            return;
        }
        //把所有数字每一个都存进数组中
        let chars:Array<string> = str.split("");
        let w:number = 0;
        //所有的长度
        let length:number = chars.length;
        for(let i:number = 0; i < length; i++) {
            try {
                let image:egret.Bitmap = GameConst.createBitmapFromSheet(chars[i], "ui");
                if(image) {
                    image.x = w;
                    w += image.width + this.gap;
                    this.addChild(image);
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.anchorOffsetX = this.width / 2;
    }
    public clear() {
        while(this.numChildren) {
            this.removeChildAt(0);
        }
    }
}