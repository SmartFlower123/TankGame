class BaseCom extends fairygui.GComponent {
	private m_Heart: fairygui.GComponent;
	private m_loader: fairygui.GLoader;
	private m_contenName: ContentName;
	protected speed: number;
	private runDirection: number;
	protected canMove: boolean;

	public constructor() {
		super();
	}
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.init();
	}
	public set RunDirection(direc: number) {
		this.runDirection = direc;
		this.setRotation();
	}
	public get RunDirection() {
		return this.runDirection;
	}
	public setCanMove(move:boolean=false){
          this.canMove=move;
	}
	public setLoaderUrl(iconName: string, iconType: ContentName): any {
		let _url = fairygui.UIPackage.getItemURL("Joystick", iconName);
		this.m_loader.url = _url;
		this.m_contenName = iconType;
		return this.m_loader.content;
	}
	/**获取loader*/
	public get IconLoader(){
		return this.m_loader;
	}
	public get ContentName() {
		return this.m_contenName;
	}
	/**是否碰撞*/
	public getIsHit(_x: number, _y: number): boolean {
		var isHit = this.displayObject.hitTestPoint(_x, _y);
		return isHit;
	}
	/**移动 */
	public move() {
		if(!this.canMove) return;
		var _direction = this.runDirection;
		if (_direction == MoveDirection.UP) {
			this.y -= this.speed;
		}
		else if (_direction == MoveDirection.DOWN) {
			this.y += this.speed;
		}
		else if (_direction == MoveDirection.LEFT) {
			this.x -= this.speed;
		}
		else {
			this.x += this.speed;
		}
	}
	/**设置移动旋转 */
	private setRotation() {
		let dirction = this.runDirection;
		if (dirction == MoveDirection.UP) {
			this.rotation = 0;
		}
		else if (dirction == MoveDirection.DOWN) {
			this.rotation = -180;
		}
		else if (dirction == MoveDirection.LEFT) {
			this.rotation = -90;
		}
		else {
			this.rotation = 90;
		}
	}
	/**销毁 并移除舞台 */
	public DestoryCom() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		this.dispose();
	}
	//-------------------------私有方法---------------------------------
	private init() {
		this.m_loader = this.getChild("loader").asLoader;
		this.m_loader.width = this.width;
		this.m_loader.height = this.height;
		this.canMove=true;
	}
}



enum ContentName {
	MoveClip,
	Gcom,
	BitMap
}