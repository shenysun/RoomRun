/**游戏管理 */
class GameControl extends egret.Sprite {
	private static _instance:GameControl;
	public static get Instance() {
		if(!GameControl._instance) {
			GameControl._instance = new GameControl();
		}
		return GameControl._instance;
 	}
	/**当前场景 */
	private currentStage:egret.DisplayObjectContainer;
	//开始游戏
	private startGame:StartGameLayer;
	/**游戏场景 */
	private gameScenes:GameScenesLayer;
	/**结束场景 */
	private overScenes:GameOverLayer;
	/**背景 */
	private bgImg:egret.Bitmap;
	public constructor() {
		super();
		this.startGame = new StartGameLayer();
		this.gameScenes = new GameScenesLayer();
		this.overScenes = new GameOverLayer();
	}

	public setStageHandler(stage:egret.DisplayObjectContainer):void {
		/**设置当前场景的背景 */
		this.currentStage = stage;
		this.bgImg = GameConst.CreateBitmapByName("bg_jpg");
		this.bgImg.width = GameConst.StageW;
		this.bgImg.height = GameConst.StageH;
		//把背景添加到当期场景
		this.currentStage.addChild(this.bgImg);
	}
	/**开始游戏的场景 */
	public startGameHandler():void {
		if(this.gameScenes && this.gameScenes.parent) {
			GameConst.removeChild(this.gameScenes);
		}
		if(this.gameScenes && this.overScenes.parent) {
			GameConst.removeChild(this.overScenes);
		}
		this.currentStage.addChild(this.startGame);
		GameApp.xia.visible = true;
	}

	/**游戏场景 */
	public onGameScenesHandler():void {
		if(this.startGame && this.startGame.parent) {
			GameConst.removeChild(this.startGame);
		}
		if(this.overScenes && this.overScenes.parent) {
			GameConst.removeChild(this.overScenes);
		}
		this.currentStage.addChild(this.gameScenes);
		GameApp.xia.visible = false;
	}

	/**游戏结束场景 */
	public showGameOverSceneHandler():void{
        if(this.startGame && this.startGame.parent){
            GameConst.removeChild(this.startGame)
        }
        if(this.gameScenes && this.gameScenes.parent){
            GameConst.removeChild(this.gameScenes)
        }
        this.currentStage.addChild(this.overScenes);
        GameApp.xia.visible = true;
    }

	public getGameOverDisplay():GameOverLayer {
		return this.overScenes;
	}

}