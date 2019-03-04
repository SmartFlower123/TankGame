class BaseFactory {
	private static instance: BaseFactory;
	public static get Instance() {
		if (!BaseFactory.instance) {
			BaseFactory.instance = new BaseFactory();
		}
		return BaseFactory.instance;
	}
	public constructor() {
	}
	//只负责生产
	public createItem(_comParent: fairygui.GComponent, id: Identity, spriteOrder: number, resName: string, startPos?: egret.Point, anthor: egret.Point = new egret.Point(0.5, 0.5)): BaseCom {
		var _item = <BaseCom>fairygui.UIPackage.createObject("Joystick", "Base").asCom;
		//=>加入数组
		var _array = QueueManager.Instance.cretateQueue(id);
		_array.addItem(_item);
		//==>
		_item.setLoaderUrl(resName, ContentName.BitMap);
		if (anthor) _item.setPivot(anthor.x, anthor.y, true);
		if (startPos) _item.setXY(startPos.x, startPos.y);
		_comParent.addChildAt(_item, spriteOrder);
		return _item;
	}
	public DestoryCom(_item: BaseCom, id: Identity) {
		var _array = QueueManager.Instance.cretateQueue(id);
		_array.removeItem(_item);
		if (_item.parent) {
			_item.parent.removeChild(_item, true);
		}
	}
}


// /**生产工厂*/
// class GameFactorys {
// 	private static instance: GameFactorys;
// 	public static get Instance() {
// 		if (!GameFactorys.instance) {
// 			GameFactorys.instance = new GameFactorys();
// 		}
// 		return GameFactorys.instance;
// 	}
// 	//只负责生产
// 	public create(type: Identity,parent: fairygui.GComponent, startPos?: egret.Point, anthor?: egret.Point): { BaseFactory, BaseCom } {
// 		switch (type) {
// 			case Identity.ENEMY:
// 				var _factory = new EnemyFactory("Enemy");
// 				var _item = _factory.createItem(parent, SpritOrder.ENEMY, startPos,anthor);
// 				break;
// 			case Identity.HEARTDIE:
// 				_factory = new HeartDieFactory("HeartDie");
// 				_item = _factory.createItem(parent, SpritOrder.HEART, startPos, anthor);
// 				break;
// 			case Identity.HEARTLIVE:
// 				_factory = new HeartLiveFactory("HeartLive");
// 				_item = _factory.createItem(parent, SpritOrder.HEART, startPos,anthor);
// 				break;
// 			default:
// 				break;
// 		}
// 		return { BaseFactory: _factory, BaseCom: _item };
// 	}
// }