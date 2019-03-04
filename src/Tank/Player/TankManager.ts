class TankManager {
	private static instance: TankManager;
	private m_bornTime: number;
	public static get Instance() {
		if (!TankManager.instance) {
			TankManager.instance = new TankManager();
		}
		return TankManager.instance;
	}
	/**创建 */
	public createItem(_comParent: fairygui.GComponent, spriteOrder: number, identity: Identity, startPos?: egret.Point, resName: string = "Player1_01", anthor: egret.Point = new egret.Point(0.56, 0.08)): GamePlayer {//createItem
		var _item: GamePlayer = this.setPlay(_comParent, spriteOrder, identity, startPos, anthor, resName);
		this.m_bornTime = egret.getTimer();
		_item.IconLoader.visible = false;
		_item.IconLoader.visible = false;
		_item.setDefendVisible();
		egret.setTimeout(() => {
			_item.IconLoader.visible = true;
			_item.setBornVisible(false);
			_item.setDefendVisible(true);
			this.hideDefend(_item);
		}, this, 400);
		return _item;
	}

	public setCanMove(item: BaseCom) {
		item.setCanMove();
	}
	/**销毁 */
	public DestoryCom(_item: GamePlayer, identity: Identity) {
		//从数组中移除
		var _bulletArray: GameQueue = QueueManager.Instance.cretateQueue(identity);
		_bulletArray.removeItem(_item);
		//从舞台上移除
		//_item.setCanMove(false);
		//销毁
		_item.DestoryCom();
	}
	//-----------------------------下面是私有方法----------------------------------------------------------
	private hideDefend(_item: GamePlayer) {
		egret.setTimeout(() => {
			_item.setDefendVisible();
		}, this, 4000);
	}
	private setPlay(_comParent: fairygui.GComponent, spriteOrder: number, identity: Identity, startPos?: egret.Point, anthor: egret.Point = new egret.Point(0.56, 0.08), resName: string = "Player1_01"): GamePlayer {
		var item: GamePlayer = <GamePlayer>fairygui.UIPackage.createObject("Joystick", "GamePlayer").asCom;
		//加入队列
		var _Array: GameQueue = QueueManager.Instance.cretateQueue(identity);
		_Array.addItem(item);
		//加入队列
		item.setLoaderUrl(resName, ContentName.BitMap);
		if (anthor) item.setPivot(anthor.x, anthor.y, true);
		if (startPos) item.setXY(startPos.x, startPos.y);
		_comParent.addChildAt(item, spriteOrder);
		return item;
	}
}
