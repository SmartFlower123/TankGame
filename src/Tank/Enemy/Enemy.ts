class GameEnemy extends BaseCom {
	private m_defendAni: fairygui.GMovieClip;
	private m_bornAni: fairygui.GMovieClip;
	private m_identity: number;
	private m_startTime: number;
	private m_state: number = -1;
	private m_canChangeDirection: boolean;
	//间隔多少时间改变方向
	private m_intervalTime: number = 2000;
	protected constructFromXML(xml: any) {
		super.constructFromXML(xml);
		this.initFGUI();
		this.addEvent();
	}
	public constructor() {
		super();
	}
	public canChangeRotation(canChange: boolean = false) {
		this.m_canChangeDirection = canChange;
	}
	/**设置身份 */
	private initFGUI() {
		this.m_bornAni = this.getChild("n2").asMovieClip;
		//this.RunDirection = Math.random() * 5;
		this.RunDirection = 3;
		this.speed = 1;
		this.m_canChangeDirection = true;
	}
	public get BornTime() {
		var _bornTime: number = egret.getTimer();
		return _bornTime;
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
		// this.m_startTime = egret.getTimer();
	}
	private AutoMove() {
		if (this.m_state == -1) {
			this.m_startTime = egret.getTimer();
			this.m_state = 1;
		}
		else if (this.m_state == 1) {
			var _now = egret.getTimer();
			var _pass = _now - this.m_startTime;
			if (_pass >= this.m_intervalTime) {
				//随机改变tank的运动方向
				if (this.m_canChangeDirection) {
					var _num = Math.floor(Math.random() * 9);
					if (_num == 0) {
						this.RunDirection = MoveDirection.UP;
					}
					else if (_num >= 5) {
						this.RunDirection = MoveDirection.DOWN;
					}
					else if (_num > 0 && _num <= 2) {
						this.RunDirection = MoveDirection.LEFT;
					}
					else {
						this.RunDirection = MoveDirection.RIGHT;
					}
					this.m_startTime = _now;
				}
			}
		}
		this.move();
	}
}