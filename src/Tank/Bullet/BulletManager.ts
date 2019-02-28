class BulletManager {
	//单例
	private m_bullectArray: Array<Bullet> = [];
	private m_bornNum: BornNum;
	private m_interValTime: number;
	private m_preBulletTime: number;
	private static instance: BulletManager;
	public static get Instance() {
		if (!BulletManager.instance) {
			BulletManager.instance = new BulletManager();
		}
		return BulletManager.instance;
	}
	public constructor() {
		this.init();
	}
	private init() {
		this.m_bornNum = BornNum.FIRST;
		this.m_interValTime = 500;
	}
	/*产生子弹 */
	public createBulletManager(parent: fairygui.GComponent,identity:Identity,ranDirection: MoveDirection, startPos: egret.Point, anthor: egret.Point = new egret.Point(0.5, 0.8)): Bullet {
		if (this.m_bornNum == BornNum.ELSE) {
			var _now = egret.getTimer();
			var _pass = _now - this.m_preBulletTime;
			if (_pass >= this.m_interValTime) {
				var _item: Bullet = this.createBullet(parent, ranDirection, startPos, anthor);
				//加入队列中
				var _bulletArray: GameQueue = QueueManager.Instance.cretateQueue(identity);
				_bulletArray.addItem(_item);
				this.m_bornNum = BornNum.ELSE;
			}
		}
		else if (this.m_bornNum == BornNum.FIRST) {
			var _item: Bullet = this.createBullet(parent, ranDirection, startPos, anthor);
			//加入队列中
			var _bulletArray: GameQueue = QueueManager.Instance.cretateQueue(identity);
			_bulletArray.addItem(_item);
			this.m_bornNum = BornNum.ELSE;
		}
		return _item;
	}
	/**销毁子弹 */
	public DestoryCom(_item: Bullet,identity:Identity) {
		//从数组中移除
		var _bulletArray: GameQueue = QueueManager.Instance.cretateQueue(identity);
		_bulletArray.removeItem(_item);
		//从舞台上移除
		_item.setCanMove(false);
		//销毁
		_item.DestoryCom();
	}
	//----------------------------------------创建子弹-----------------------------------------------------------------------------------------
	private createBullet(parent: fairygui.GComponent, ranDirection: number, startPos: egret.Point, anthor: egret.Point = new egret.Point(0.5, 0.8)): Bullet {
		this.m_preBulletTime = egret.getTimer();
		var _bullet: Bullet = <Bullet>fairygui.UIPackage.createObject("Joystick", "Bullet").asCom;
		parent.addChildAt(_bullet, SpritOrder.BULLET);
		_bullet.RunDirection = ranDirection;
		_bullet.setXY(startPos.x, startPos.y);
		_bullet.setPivot(anthor.x, anthor.y, true);
		_bullet.setCanMove(true);
		return _bullet;
	}
}