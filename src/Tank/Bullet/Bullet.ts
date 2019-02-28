class Bullet extends BaseCom {
	private m_deltaTime: number;
	private m_isDistoryBullet: boolean;
	protected constructFromXML(xml: any) {
		super.constructFromXML(xml);
		this.initState();
		this.addEvent();
	}

	public constructor() {
		super();
	}
	private initState() {
		this.speed = 7;
		this.canMove = false;
		this.m_isDistoryBullet = false;
	}
	public setCanMove(canMove: boolean) {
		this.canMove = canMove;
	}
	//请先设置旋转方向 再attack
	private addEvent() {
		fairygui.GRoot.inst.nativeStage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	private onEnterFrame(evt: egret.Event) {
		if (!this.canMove) return;
		this.move();
		//	if (!this.m_isDistoryBullet) this.attack();
	}
}
