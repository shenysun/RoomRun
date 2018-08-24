/**角色动作类 */
class Role extends egret.Sprite{
    //状态
	public static STATE1:number = 0;
	public static STATE2:number = 1;
	public static STATE3:number = 2;
	public static STATE4:number = 3;
	public static STATE5:number = 4;
	/**人物状态集合 */
	public static FRAMES:Array<any> = [
		["0020003", "0020004", "0020005", "0020006","0020007"],
        ["0020008"],
        ["0020009", "0020010"],
        ["0020011", "0020012"],
        ["xue0001", "xue0002", "xue0003", "xue0004", "xue0005"]
	]
	//身体
	private Body:egret.Bitmap;
	private state:number;
	private currFrames:Array<any>;
	private currFramesIndex:number = 0;
	private runFlag:number;
	private isLoop:boolean;

	public constructor() {
		super();
		this.Body = new egret.Bitmap;
        //人物初始状态
		this.Body = GameConst.createBitmapFromSheet("Role.FRAMES[0][0]", "Sprites");
        //设置锚点
        this.Body.anchorOffsetX = this.Body.width * 0.5;
        this.addChild(this.Body);
	}

	/**设置状态 */
	public setState(state:number) :void {
		this.state = state;
        //死亡状态
		if(this.state == Role.STATE5) {
			this.isLoop = false;
			this.Body.anchorOffsetY = this.Body.height * 0;
		}else{
            this.isLoop = true;
            this.Body.anchorOffsetY = this.Body.height * 1;
        }

        if(this.state == Role.STATE3 || this.state == Role.STATE4){
            this.currFrames = [];
            if(Math.random() > 0.5){
                this.currFrames.push(Role.FRAMES[this.state][0]);
            }else{
                this.currFrames.push(Role.FRAMES[this.state][1]);
            }
        }else{
            this.currFrames = Role.FRAMES[this.state];
        }
        this.currFramesIndex = 0;
        this.setBody();
	}

	private setBody() {
		this.Body.texture = GameConst.getTextureFromSheet(this.currFrames[this.currFramesIndex], "Sprites");
		this.Body.anchorOffsetX = this.Body.width * 0.5;
		if(this.state == Role.STATE5){
            this.isLoop = false;
            this.Body.anchorOffsetY = this.Body.height * 0;
        }else{
            this.isLoop = true;
            this.Body.anchorOffsetY = this.Body.height * 1;
        }
	}
	public run():boolean{
        this.runFlag ++;
        if(this.runFlag > 4){
            this.runFlag = 0;
        }
        if(this.runFlag != 0){
            return;
        }
        var gotoFrameIndex:number = this.currFramesIndex + 1;
        if(gotoFrameIndex == this.currFrames.length){
            if(this.isLoop){
                gotoFrameIndex = 0;
            }else{
                gotoFrameIndex = this.currFramesIndex;
            }
        }
        if(gotoFrameIndex != this.currFramesIndex){
            this.currFramesIndex = gotoFrameIndex;
            this.setBody();
        }
        return false;
    }

    public play():void{
        egret.startTick(this.run,this);
        this.runFlag = 0;
    }
    public stop():void{
        egret.stopTick(this.run,this);
    }
}