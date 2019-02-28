class GamePlayer extends BaseCom {
	private m_defendAni: fairygui.GMovieClip;
	private m_bornAni: fairygui.GMovieClip;
	private m_identity: number;
	private m_startTime: number;
	//间隔多少时间改变方向
	private m_intervalTime: number = 4000;
	protected constructFromXML(xml: any) {
		super.constructFromXML(xml);
		this.initFGUI();
		//this.addEvent();
	}
	public constructor() {
		super();
	}
	/**设置身份 */
	public setIdentity(identity: number) {
		this.m_identity = identity;
	}
	private initFGUI() {
		this.m_defendAni = this.getChild("n1").asMovieClip;
		this.m_bornAni = this.getChild("n2").asMovieClip;
		this.m_defendAni.playing = true;
		this.speed = 3;
	}
	public setDefendVisible(isVisible: boolean = false) {
		if (this.m_identity == Identity.ENEMY) isVisible = false;
		this.m_defendAni.visible = isVisible;
	}
	public setBornVisible(isVisible: boolean = false) {
		this.m_bornAni.visible = isVisible;
	}

}