class GameEnemy extends BaseCom {
	private m_defendAni: fairygui.GMovieClip;
	private m_bornAni: fairygui.GMovieClip;
	private m_identity: number;
	private m_startTime: number;
	//间隔多少时间改变方向
	private m_intervalTime: number = 500;
	protected constructFromXML(xml: any) {
		super.constructFromXML(xml);
		this.initFGUI();
		this.addEvent();
	}
	public constructor() {
		super();
	}
	/**设置身份 */
	private initFGUI() {
		this.m_bornAni = this.getChild("n2").asMovieClip;
		//this.RunDirection = Math.random() * 5;
		this.RunDirection=3;
		this.speed = 1;
	}
	public setDefendVisible(isVisible: boolean = false) {
		if (this.m_identity == Identity.ENEMY) isVisible = false;
		this.m_defendAni.visible = isVisible;
	}
	public setBornVisible(isVisible: boolean = false) {
		this.m_bornAni.visible = isVisible;
	}
	private addEvent() {
		fairygui.GRoot.inst.addEventListener(egret.Event.ENTER_FRAME, this.AutoMove, this);
		this.m_startTime = egret.getTimer();
	}
	private AutoMove() {
		var _now = egret.getTimer();
		var _pass = _now - this.m_startTime;
		this.m_startTime = _now;
		var _num = Math.floor(Math.random() * 4);
		//随机改变方向
		if (_pass >= this.m_intervalTime) {
			this.RunDirection = _num;
			_pass=0;
			console.log("------------我们要跑的方向是-----------"+MoveDirection[_num]);
		}

		// if (_pass >= this.m_intervalTime) {
		// 	if (_num == 0) {
		// 		this.RunDirection = MoveDirection.UP;
		// 	}
		// 	else if (_num >= 5) {
		// 		this.RunDirection = MoveDirection.DOWN;
		// 	}
		// 	else if (_num > 0 && _num <= 2) {
		// 		this.RunDirection = MoveDirection.LEFT;
		// 	}
		// 	else {
		// 		this.RunDirection = MoveDirection.RIGHT;
		// 	}
		// }
		this.move();
		console.log("djfldjljflljfldjlfj");
		console.log("djfldjljflljfldjlfj");
	//	console.log("跑的方向" + this.RunDirection + "-----------------num" + _num + "----------方向" + MoveDirection.UP);
	}
}