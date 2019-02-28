class SpecialAnimation {
	private m_Anim: fairygui.GMovieClip;
	private m_tagetParent: fairygui.GComponent;
	public constructor(targetParent: fairygui.GComponent) {
		this.m_tagetParent = targetParent;
	}
	//生成动效
	public CreateBornAnim(name: string, pkgName: string = "Joystick") {
		this.m_Anim = fairygui.UIPackage.createObject(pkgName, name).asMovieClip;
		this.m_tagetParent.addChildAt(this.m_Anim, SpritOrder.BORNANIMATION);
		this.m_Anim.setPivot(0.5,0.5);
		this.PlayAnimation();
		//this.m_Anim.setScale(2,2);
	}
	public setAnimXY(_x:number,_y:number){
		this.m_Anim.setXY(_x,_y);
	}
	public setPiovt(){
		this.m_Anim.setPivot(0.5,0.5,true);
	}
	public PlayAnimation() {
		this.m_Anim.setPlaySettings(0, -1, 10, 0, this.DistroyCom, this);
	}
	//销毁
	private DistroyCom() {
		if (this.m_Anim.parent) {
			this.m_Anim.parent.removeChild(this.m_Anim);
			this.m_Anim.dispose();
			this.m_Anim = null;
		}
	}
}