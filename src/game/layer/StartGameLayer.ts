/**游戏开始场景 */
class StartGameLayer extends egret.Sprite {
    /**开始按钮 */
    private startBtn:MyButton;
    /**更多按钮 */
    private moreBtn:MyButton;
    /**LOGO */
    private titleImage:egret.Bitmap;
    public constructor() {
        super();
        this.init();
    }
    private init():void {
        /**添加游戏LOGO */
        this.titleImage = GameConst.createBitmapFromSheet("logo_mishitaosheng", "ui");
        this.titleImage.x = 51;
        this.titleImage.y = 161;
        this.addChild(this.titleImage);
        //开始按钮设置
        this.startBtn = new MyButton("btn_y", "btn_kaishi");
        this.addChild(this.startBtn);
        this.startBtn.x = (GameConst.StageW - this.startBtn.width) / 2;
        this.startBtn.y = GameConst.StageH / 2 - 75;
        this.startBtn.setClick(this.onStartGameClick);
        //更多按钮设置
        this.moreBtn = new MyButton("btn_b", "btn_gengduo");
        this.moreBtn.x = (GameConst.StageW - this.startBtn.width) / 2;
        this.moreBtn.y =GameConst.StageH / 2 + 75;
        this.addChild(this.moreBtn);
        this.moreBtn.setClick(this.onMoreBtnClick);
        //文本
        let tex:egret.TextField = new egret.TextField();
        tex.width = GameConst.StageW;
        tex.textAlign = egret.HorizontalAlign.CENTER;
        tex.strokeColor = 0x403e3e;
        tex.stroke = 1;
        tex.bold = true;
        tex.y = GameConst.StageH / 2 + 250;
        tex.text = "Egret";
        this.addChild(tex);
    }
    private onStartGameClick() {
        GameControl.Instance.onGameScenesHandler();
    }
    private onMoreBtnClick() {
        console.log("更多游戏");
        platform.GetInfo();
    }
}