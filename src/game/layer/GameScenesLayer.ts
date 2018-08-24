/**游戏场景 */
class GameScenesLayer extends egret.Sprite {
    /**游戏场景上面图片 */
	private titleImg:egret.Bitmap;
	/**最高分 */
	private maxScore:egret.Bitmap;
	/**当前关卡框 */
	private currLV:egret.Bitmap;
	/**分数框 */
	private scoreKuang:egret.Bitmap;
	/**级别框 */
	private lvkuang:egret.Bitmap;
	/**背景图 */
	private bg:egret.Texture;
	/**上下边界图 */
	private topSprite:egret.Sprite;
	private bottomSprite:egret.Sprite;

	private bgBitmaps:Array<egret.Bitmap>;
	private topRects:Array<egret.Rectangle>;
	private bottomRects:Array<egret.Rectangle>;

	private spaceArr:Array<number> = [50, 70, 90, 110];
	private topLine:egret.Shape;
	private bottomLine:egret.Shape;
    /**所在关卡显示 */
	private LvNum:SpecialNumber;
    /**当前最高分数显示 */
	private recodeNum:SpecialNumber;

	/**当前所在关卡 */
	private curretLevel:number;
	/**当前最高分数 */
	private curretMaxScore:number;
	//角色设置
	private role:Role;
	private rolePosIndex:number;
	private shake1:Shake;
	private shake2:Shake;
    /**上部分墙体容器 */
	private topContianer:egret.Sprite;
    /**下部分墙体容器 */
	private bottomContianer:egret.Sprite;

	private dieNum:number;
	private score:number;

	public constructor() {
		super();
		this.init();
	}

	private init() {
		this.shake1 = new Shake();
		this.shake2 = new Shake();
        let bg_jpg:egret.Bitmap = new egret.Bitmap(RES.getRes("bg_jpg"));
        this.addChild(bg_jpg)

		this.bg = RES.getRes("bg_qiang_png");
		let bg = new egret.Bitmap(this.bg);
		//背景遮罩
		bg.mask = new egret.Rectangle(0, GameConst.StageH, GameConst.StageW, 300);
		this.addChild(bg);

		this.bgBitmaps = new Array<egret.Bitmap>();
		this.topContianer = new egret.Sprite();
		this.addChild(this.topContianer);
		this.topSprite = new egret.Sprite();
		this.topContianer.addChild(this.topSprite);
		this.topLine = new egret.Shape();
		this.topContianer.addChild(this.topLine);

		this.bottomContianer = new egret.Sprite();
        this.addChild(this.bottomContianer);
        this.bottomSprite = new egret.Sprite();
        this.bottomContianer.addChild(this.bottomSprite);
        this.bottomLine = new egret.Shape();
        this.bottomContianer.addChild(this.bottomLine);

		this.topRects = new Array<egret.Rectangle>();
		this.bottomRects = new Array<egret.Rectangle>();

		this.titleImg = GameConst.createBitmapFromSheet("bg_shangkuang", "ui");
		this.addChild(this.titleImg);

		this.scoreKuang = GameConst.createBitmapFromSheet("kuang", "ui");
        this.scoreKuang.x = 5;
        this.addChild(this.scoreKuang);

        this.lvkuang = GameConst.createBitmapFromSheet("kuang", "ui");
        this.lvkuang.scaleX = -1;
        this.lvkuang.x = 466;
        this.addChild(this.lvkuang);

        this.maxScore = GameConst.createBitmapFromSheet("fenshu", "ui");
        this.maxScore.x = 40;
        this.maxScore.y = 15;
        this.addChild(this.maxScore);

        this.currLV = GameConst.createBitmapFromSheet("guanqia", "ui");
        this.currLV.x = 368;
        this.currLV.y = 15;
        this.addChild(this.currLV);

		this.LvNum = new SpecialNumber();
		this.LvNum.x = 393;
		this.LvNum.y = 50;
		this.addChild(this.LvNum);

		this.recodeNum = new SpecialNumber();
		this.recodeNum.x = 73;
		this.recodeNum.y = 50;
		this.addChild(this.recodeNum);

		this.curretLevel = 1;
		this.curretMaxScore = 0;
		this.LvNum.setData(this.curretLevel.toString());
		this.recodeNum.setData(this.curretMaxScore.toString());

		this.role = new Role();
		this.addChild(this.role);

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
		
	}

	private addStage() {
		this.dieNum = 0;
		this.score = 0;
		this.curretLevel = 1;
		this.refreshScore();
		this.initData();
        
        // setTimeout(this.start, this, 100);
        this.start()
	}
	/**刷新成绩数据 */
	private refreshScore() {
		this.LvNum.setData(this.curretLevel.toString());
		this.recodeNum.setData(this.score.toString());
	}

    private start():void {
        this.touchEnabled = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        //setTimeout(this.shakeRun(), this, 1000);
        let self = this;
        setTimeout(function() {
            self.shakeRun();
        }, 1500);
        // this.shakeRun()
    }

    private shakeRun() {
        //墙体晃动效果
       this.shake1.run(this.topContianer, 5, this.land.bind(this));
    }
    private land() {
        let self = this;
        //一波墙体运动之后移除点击事件
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        //上面的模块往下运动
        egret.Tween.get(this.topContianer).to({"y":0}, 100).call(function():void {
            self.landOver();
        })
    }

    public landOver() {
        //根据离墙体的高度判断现在的状态
        this.checkState();
        // this.shake1.run(this.topContianer, 3);
        //
        this.shake2.run(this.bottomContianer, 3, this.checkResult.bind(this));
    }
    //
    private checkState() {
        let space:number = this.getSpace();
        if (space == 0) {
            this.role.setState(Role.STATE5);
        } else if (space == this.spaceArr[2]) {
            this.role.setState(Role.STATE4);
        } else if (space == this.spaceArr[0]) {
            this.role.setState(Role.STATE3);
        } else if (space == this.spaceArr[1]) {
            this.role.setState(Role.STATE2);
        }
        if (space == 0) {
            this.setRolePos(this.rolePosIndex, -10, 4);
        }
    }

    /**检验这关结束主角是否存活 */
    private checkResult() {
        let space:number = this.getSpace();
        let self = this;
        if(space == 0) {
            this.dieNum ++;
            if(this.dieNum == 1) {
                this.role.stop();
                setTimeout(function() {
                    //游戏结束
                    GameControl.Instance.getGameOverDisplay().setGameOverDataHandler(self.score, self.curretMaxScore); 
                    GameControl.Instance.showGameOverSceneHandler();
                }, 500);
                
                return;
            }
        }
        //进入下一关
        else {
            this.curretLevel++;
            this.score += 10;
            if(this.score > this.curretMaxScore) {
                this.curretMaxScore = this.score;
            }
            //刷新成绩
            this.refreshScore();
        }
        setTimeout(function() {
            self.refreshPoint()
        }, 1000);
    }

    private getSpace():number {
        let top:egret.Rectangle = this.topRects[this.rolePosIndex];
        let bottom:egret.Rectangle = this.bottomRects[this.rolePosIndex];
        return GameConst.StageH - top.height - bottom.height;
    }
    /**刷新游戏关卡 */
    private refreshPoint() {
        this.initData();
        this.start();
    }

    /**点击事件 */
    private onClick(e:egret.TouchEvent):void {
        let len:number = this.bottomRects.length;
        for(let i:number = 0; i < len; i++) {
            let rec:egret.Rectangle = this.bottomRects[i];
            if(e.stageX > rec.x && e.stageX < rec.x + rec.width) {
                this.setRolePos(i);
                break;
            }
        }
    }

	private initData() {
		this.role.setState(Role.STATE1);
		this.role.play();

		this.topRects.splice(0, this.topRects.length);
		this.bottomRects.splice(0, this.bottomRects.length);

		let min:number = 150;
		let flag:boolean = false;
		let len:number = 8;
		let w:number = GameConst.StageW / len;        
		for(let i:number = 0; i < len; i++) {
			var h:number = min + Math.floor(Math.random() * 8) * 10;
            this.bottomRects.push(new egret.Rectangle(i * w, GameConst.StageH - h, w, h));

            h = GameConst.StageH - h; 
            if (Math.random() < 0.2 || (!flag && i == len - 1)) {
                var index:number = Math.floor(Math.random() * this.spaceArr.length);
                h -= this.spaceArr[index];
                flag = true;
            }
            this.topRects.push(new egret.Rectangle(i * w, 0, w, h));
		}
        //图   区域(填充)
		this.fullFront(this.topSprite, this.topRects);
        this.fullFront(this.bottomSprite, this.bottomRects, true);
        this.drawLine();
        this.topContianer.y = -200;
        this.setRolePos(3, 17, 0, true);
	}

	private setRolePos(index:number, offY:number = 17, offX:number = 0, isInit:boolean = false):void {
        if (!isInit) {
            if (this.rolePosIndex > index) {
                index = this.rolePosIndex - 1;
            }
            else if (this.rolePosIndex < index) {
                index = this.rolePosIndex + 1;
            }
        }
        this.rolePosIndex = index;
        var rec:egret.Rectangle = this.bottomRects[index];
        //一次只移动一格
        this.role.x = rec.x + rec.width / 2 + offX;
        this.role.y = rec.y + offY;
    }

    private drawLine():void {
        var lineH:number = 10;
        this.topLine.graphics.clear();
        this.topLine.graphics.lineStyle(lineH, 0x33E7FE);
        this.bottomLine.graphics.clear();
        this.bottomLine.graphics.lineStyle(lineH, 0x33E7FE);
        this.drawTopLine(lineH / 2);
        this.drawBottomLine(lineH / 2);
        this.topLine.graphics.endFill();
        this.bottomLine.graphics.endFill();
    }

    private drawTopLine(lineH:number):void {
        var len:number = this.topRects.length;
        for (var i:number = 0; i < len; i++) {
            var rec:egret.Rectangle = this.topRects[i];
            if (i == 0) {
                this.topLine.graphics.moveTo(rec.x, rec.height);
                this.topLine.graphics.lineTo(rec.x + rec.width, rec.height);
            } else {
                this.topLine.graphics.lineTo(rec.x, rec.height);
                this.topLine.graphics.lineTo(rec.x + rec.width, rec.height);
            }
        }
    }

    private drawBottomLine(lineH:number):void {
        var len:number = this.bottomRects.length;
        for (var i:number = 0; i < len; i++) {
            var rec:egret.Rectangle = this.bottomRects[i];
            if (i == 0) {
                this.bottomLine.graphics.moveTo(rec.x, rec.y + lineH);
                this.bottomLine.graphics.lineTo(rec.x + rec.width, rec.y + lineH);
            } else {
                this.bottomLine.graphics.lineTo(rec.x, rec.y + lineH);
                this.bottomLine.graphics.lineTo(rec.x + rec.width, rec.y + lineH);
            }
        }
    }

    private fullFront(bgSptite:egret.Sprite, rects:Array<egret.Rectangle>, isBottom:boolean = false):void {
        bgSptite.cacheAsBitmap = false;

        this.clearBg(bgSptite);
        var len:number = rects.length;
        for (var i:number = 0; i < len; i++) {
            var rec:egret.Rectangle = rects[i];
            var bitmap:egret.Bitmap;
            
            if (this.bgBitmaps.length) {
                bitmap = this.bgBitmaps.pop();
            } else {
                bitmap = new egret.Bitmap();
                bitmap.texture = this.bg;
            }
            bitmap.scrollRect = rec;
            bitmap.x = rec.x;
            bitmap.y = rec.y;
            bgSptite.addChild(bitmap);
        }
    }

    private clearBg(bgSptite:egret.Sprite):void {
        while (bgSptite.numChildren) {
            var bitmap:egret.Bitmap = <egret.Bitmap>bgSptite.getChildAt(0);
            if (bitmap) {
                bgSptite.removeChild(bitmap);
                this.bgBitmaps.push(bitmap);
            }
        }
    }


}