// class TankMove {
// 	private m_target: fairygui.GComponent;
// 	private m_degree: number;
// 	private m_speed: number = 4;
// 	private m_joystickModu: JoystickModule;
// 	private m_runDirction: number;
// 	private m_DefendAnim: fairygui.GMovieClip;
// 	private m_targetParent: fairygui.GComponent;
// 	private m_defendTime: number;
// 	public constructor(joyStick: JoystickModule, targetParent: fairygui.GComponent) {
// 		// this.m_target = target;
// 		this.m_targetParent = targetParent;
// 		this.m_joystickModu = joyStick;
// 		this.init();
// 		//this.Move();
// 	}
// 	private initState() {
// 		this.m_runDirction = MoveDirection.UP;
// 	}
// 	private init() {
// 		this.initState();
// 		this.addEvent();
// 		this.initData();
// 	}
// 	private initData() {
// 		this.m_defendTime = 3000;
// 	}
// 	//产生Tank
// 	public createTank() {
// 		this.m_target = fairygui.UIPackage.createObject("Joystick", "player").asCom;
// 		this.m_targetParent.addChildAt(this.m_target, SpritOrder.TANK);
// 		this.m_DefendAnim = this.m_target.getChild("n1").asMovieClip;
// 		this.m_target.setPivot(0.48, 0.08, true);
// 		this.m_target.setXY(100, 100);
// 		console.log("kejian"+this.m_DefendAnim.visible);
// 		egret.setTimeout(() => {
// 			this.m_DefendAnim.visible = false;
// 				console.log("kejian after"+this.m_DefendAnim.visible);
// 		}, this, this.m_defendTime);
// 	}
// 	public setSpriteOrder(parent: fairygui.GComponent) {
// 		parent.setChildIndex(this.m_target, SpritOrder.TANK);
// 	}
// 	private addEvent() {
// 		this.m_joystickModu.addEventListener(JoystickModule.JoystickMoving, this.onJoystickMoving, this)
// 	}
// 	public get TankPos() {
// 		return new egret.Point(this.m_target.x, this.m_target.y);
// 	}
// 	public get TandWidth() {
// 		return this.m_target.width;
// 	}
// 	private onJoystickMoving(evt: egret.Event) {
// 		if (evt.data <= -45 && evt.data >= -145) {
// 			this.m_target.y -= this.m_speed;
// 			this.m_target.rotation = 0;
// 			this.m_runDirction = MoveDirection.UP;
// 		}
// 		else if (evt.data < -145 || evt.data > 145) {
// 			this.m_target.x -= this.m_speed;
// 			this.m_target.rotation = -90;
// 			this.m_runDirction = MoveDirection.LEFT;
// 		}
// 		else if (evt.data > -45 && evt.data < 45) {
// 			this.m_target.x += this.m_speed;
// 			this.m_target.rotation = 90;
// 			this.m_runDirction = MoveDirection.RIGHT;
// 		}
// 		else if (evt.data > 45 && evt.data <= 145) {
// 			this.m_target.y += this.m_speed;
// 			this.m_target.rotation = -180;
// 			this.m_runDirction = MoveDirection.DOWN;
// 		}
// 	}
// 	public get RunDirection() {
// 		return this.m_runDirction;
// 	}
// 	/**坦克的死亡方法*/
// 	private Die() {
// 		//爆炸特效
// 		//死亡
// 	}
// } 
//# sourceMappingURL=TankMove.js.map