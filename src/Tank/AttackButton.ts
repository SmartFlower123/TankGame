class AttackButton {
	private m_attackBt: fairygui.GButton;
	private m_onClickLisner: Function;
	private m_thisObj: any;
	public constructor(attackBt: fairygui.GButton) {
		this.m_attackBt = attackBt;
		this.init();
		this.addEvent();
	}
	private init() {
		this.initData();
	}
	private initData() {

	}
	private addEvent() {
		this.m_attackBt.addClickListener(this.onClick, this);
	}
	public addOnClickAttack(onclickAttack: Function, thisobj: any) {
		this.m_onClickLisner = onclickAttack;
		this.m_thisObj = thisobj;
	}
	private onClick() {
		if (this.m_onClickLisner) this.m_onClickLisner.call(this.m_thisObj);
	}
}
