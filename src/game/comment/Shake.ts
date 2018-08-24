/**墙体晃动 */
class Shake {
	private initY:number;
	private shakeNum:number;
	private overFunc:Function;
	private obj:egret.DisplayObject;
	private num:number;
	private flag:number;

	public run (obj:egret.DisplayObject, shakeNum:number, overFunc:Function = null) {
		this.obj = obj;
		this.initY = obj.y;
		this.shakeNum = shakeNum;
		this.overFunc = overFunc;
		egret.startTick(this.loop, this);
		this.num = 0;
		this.flag = 0;
	}
	private loop():boolean {
		if(this.flag == 0) {
			if(this.obj.y <= this.initY) {
				this.obj.y += 5;
			} else {
				this.obj.y -= 5;
			}
			if(this.obj.y == this.initY) {
				this.num ++;
				if(this.num == this.shakeNum) {
					egret.stopTick(this.loop, this);
					if(this.overFunc) {
						this.overFunc();
					}
				}
			}
		}
		this.flag++;
		if(this.flag == 2) {
			this.flag = 0;
		}
		return false;
	}
}