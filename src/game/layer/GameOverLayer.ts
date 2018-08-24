/**游戏结束 */
class GameOverLayer extends egret.Sprite {
	public constructor() {
		super()
		this.init();
	}
	private scoreNum:SpecialNumber;
	private maxScore:SpecialNumber;
	private init() {
		//
		let bg_wenzi:egret.Bitmap = GameConst.createBitmapFromSheet("bg_wenzi", "ui");
		bg_wenzi.x = (GameConst.StageW - bg_wenzi.width) / 2;
		this.addChild(bg_wenzi);
		//失败
		let shibai:egret.Bitmap = GameConst.createBitmapFromSheet("shibai", "ui");
		shibai.x = (GameConst.StageW - shibai.width) / 2;
		shibai.y = 50;
		this.addChild(shibai);

		let fenshu:egret.Bitmap = GameConst.createBitmapFromSheet("fenshu", "ui"); 
		this.addChild(fenshu);
		fenshu.x = 120;
		fenshu.y = 238;

		let zuigaojilu:egret.Bitmap = GameConst.createBitmapFromSheet("zuigaojilu", "ui");
		zuigaojilu.x = 290;
		zuigaojilu.y = 238;
		this.addChild(zuigaojilu);

		/**再玩一局 */
		let btn_y:egret.Bitmap = GameConst.createBitmapFromSheet("btn_y", "ui");
		btn_y.anchorOffsetX = btn_y.width / 2;
		btn_y.anchorOffsetY = btn_y.height / 2;
		btn_y.x = GameConst.StageW / 2;
		btn_y.y = GameConst.StageH / 2 - 20;
		this.addChild(btn_y)

		let btn_zaiwan:egret.Bitmap = GameConst.createBitmapFromSheet("btn_zaiwan", "ui");
		btn_zaiwan.x = (GameConst.StageW - btn_zaiwan.width) / 2;
		btn_zaiwan.y = GameConst.StageH / 2 - 35;
		btn_zaiwan.touchEnabled = true;
		this.addChild(btn_zaiwan);
		/**炫耀一下 */
		let btn_b:egret.Bitmap = GameConst.createBitmapFromSheet("btn_b", "ui");
		btn_b.anchorOffsetX = btn_b.width / 2;
		btn_b.anchorOffsetY = btn_b.height / 2;
		btn_b.x = GameConst.StageW / 2;
		btn_b.y = GameConst.StageH / 2 + 145;
		this.addChild(btn_b);
		let btn_xuanya:egret.Bitmap = GameConst.createBitmapFromSheet("btn_xuanya", "ui");
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
		btn_zaiwan.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
			//再来一局
			GameControl.Instance.onGameScenesHandler();
		}, this);

		btn_xuanya.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			//分享
			platform.ShareMessage();
		}, this);
		
	}
	/**游戏结束页面分数最高分数 */
	public setGameOverDataHandler(score:number = 0, maxScore:number = 0):void {
		this.scoreNum.setData(score.toString());
		this.maxScore.setData(maxScore.toString());
	}
}