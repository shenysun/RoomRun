class GameApp extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
	}

	public static xia:egret.DisplayObject = new egret.DisplayObject();
	private addStage() {
		var title = "密室逃生";
        var content = "尼玛，活着真是不容易";
        var link = "http://static.egret-labs.org/h5game/8/release.html";
        var ico = "http://static.egret-labs.org/h5game/icons/10000008.jpg";

		
		var shang:egret.Bitmap = GameConst.CreateBitmapByName("shang_jpg");
        shang.height = this.y;
        this.stage.addChild(shang);

        var xia:egret.Bitmap = GameConst.CreateBitmapByName("xia_jpg");
        xia.y = this.y + GameConst.StageH;
        xia.height = this.y;
        this.stage.addChild(xia);
        GameApp.xia = xia;
        
		GameControl.Instance.setStageHandler(this);
        //游戏开始
        GameControl.Instance.startGameHandler();
	}
}