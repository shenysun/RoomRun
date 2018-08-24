/**自定义按钮类 */
class MyButton extends egret.Sprite {
	private _bg:egret.Bitmap;
	private title:egret.Bitmap;
	private onClick:Function;

	public constructor(bgName:string, titleName:string) {
		super();
		this._bg = GameConst.createBitmapFromSheet(bgName, "ui");
		this.addChild(this._bg);

		this.title = GameConst.createBitmapFromSheet(titleName, "ui");
		
		this.title.x = (this._bg.width - this.title.width) >> 1;
		this.title.y = (this._bg.height - this.title.height) >> 1;
		this.addChild(this.title);
	}

	//设置点击触发事件
	public setClick(func:Function):void {
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEvent, this);
		this.onClick = func;
	}
	//点击触发的事件
	private onClickEvent() {
		this.onClick();
	}

	public setTitle(title:string):void {
		this.title = GameConst.CreateBitmapByName(title);
	}

	public get bg() {
		return this._bg;
	}
	public set bg(bg:egret.Bitmap) {
		this._bg = bg;
	}
}