var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseFactory = (function () {
    function BaseFactory() {
    }
    Object.defineProperty(BaseFactory, "Instance", {
        get: function () {
            if (!BaseFactory.instance) {
                BaseFactory.instance = new BaseFactory();
            }
            return BaseFactory.instance;
        },
        enumerable: true,
        configurable: true
    });
    //只负责生产
    BaseFactory.prototype.createItem = function (_comParent, id, spriteOrder, resName, startPos, anthor) {
        if (anthor === void 0) { anthor = new egret.Point(0.5, 0.5); }
        var _item = fairygui.UIPackage.createObject("Joystick", "Base").asCom;
        //=>加入数组
        var _array = QueueManager.Instance.cretateQueue(id);
        _array.addItem(_item);
        //==>
        _item.setLoaderUrl(resName, ContentName.BitMap);
        if (anthor)
            _item.setPivot(anthor.x, anthor.y, true);
        if (startPos)
            _item.setXY(startPos.x, startPos.y);
        _comParent.addChildAt(_item, spriteOrder);
        return _item;
    };
    BaseFactory.prototype.DestoryCom = function (_item, id) {
        var _array = QueueManager.Instance.cretateQueue(id);
        _array.removeItem(_item);
        if (_item.parent) {
            _item.parent.removeChild(_item, true);
        }
    };
    return BaseFactory;
}());
__reflect(BaseFactory.prototype, "BaseFactory");
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
//# sourceMappingURL=BaseFactory.js.map