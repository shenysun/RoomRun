/**常用常量类 */
class GameConst {
    /**舞台宽度 */
	public static StageW:number;
    /**舞台高度 */
	public static StageH:number;

	/**根据名字创建位图 */
	public static CreateBitmapByName(name:string):egret.Bitmap {
		let texture:egret.Texture = RES.getRes(name);
		let bitmap:egret.Bitmap = new egret.Bitmap(texture);
		return bitmap;
	}
	/**
     * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
     */
    public static createBitmapFromSheet(name:string, sheetName:string):egret.Bitmap {
        let texture:egret.Texture = RES.getRes(`${sheetName}_json.${name}`);
        let result:egret.Bitmap = new egret.Bitmap(texture);
        return result;
    }

    public static getTextureFromSheet(name:string, sheetName:string):egret.Texture {
        let result:egret.Texture = RES.getRes(`${sheetName}_json.${name}`);
        return result;
    }
    /**移除子类方法 */
    public static removeChild(child:egret.DisplayObject) {
        if(child && child.parent) {
            if((<any>child.parent).removeElement) {
                (<any>child.parent).removeElement(<any>(child));
            }
            else {
                child.parent.removeChild(child);
            }
        }
    }
}