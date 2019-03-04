class EnemyManager {
	private static instance: EnemyManager;
	private m_bornTime: number;
	public static get Instance() {
		if (!EnemyManager.instance) {
			EnemyManager.instance = new EnemyManager();
		}
		return EnemyManager.instance;
	}
	/**创建 */
	public createItem(_comParent: fairygui.GComponent, spriteOrder: number, identity: Identity = Identity.ENEMY, startPos?: egret.Point, resName: string = "Enemys_03", anthor: egret.Point = new egret.Point(0.56, 0.08)): GameEnemy {//createItem
		var _item: GameEnemy = this.setPlay(_comParent, spriteOrder, identity, startPos, anthor, resName);
		this.m_bornTime = egret.getTimer();
		_item.IconLoader.visible = false;
		_item.IconLoader.visible = false;
		egret.setTimeout(() => {
			_item.IconLoader.visible = true;
			_item.setBornVisible(false);
		}, this, 400);
		return _item;
	}
	// public get BornTime() {
	// 	return this.m_bornTime;
	// }

	public setCanMove(item: BaseCom) {
		item.setCanMove();
	}
	/**销毁 */
	public DestoryCom(_item: GameEnemy, identity: Identity) {
		//从数组中移除
		var _bulletArray: GameQueue = QueueManager.Instance.cretateQueue(identity);
		_bulletArray.removeItem(_item);
		//从舞台上移除
		//_item.setCanMove(false);
		//销毁
		_item.DestoryCom();
	}
	//-----------------------------下面是私有方法----------------------------------------------------------

	private setPlay(_comParent: fairygui.GComponent, spriteOrder: number, identity: number, startPos?: egret.Point, anthor: egret.Point = new egret.Point(0.56, 0.08), resName: string = "Player1_01"): GameEnemy {
		var item: GameEnemy = <GameEnemy>fairygui.UIPackage.createObject("Joystick", "GameEnemy").asCom;
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
