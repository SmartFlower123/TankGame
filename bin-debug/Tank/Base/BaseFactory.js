var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BaseFactory = (function () {
    function BaseFactory(resName) {
        this.m_retname = resName;
        console.log("--------name-----------" + this.m_retname);
    }
    //只负责生产
    BaseFactory.prototype.createItem = function (_comParent, spriteOrder, startPos, anthor) {
        this.m_item = fairygui.UIPackage.createObject("Joystick", "Base").asCom;
        console.log("--------name-----------" + this.m_retname);
        this.m_item.setLoaderUrl(this.m_retname, ContentName.BitMap);
        if (anthor)
            this.m_item.setPivot(anthor.x, anthor.y, true);
        if (startPos)
            this.m_item.setXY(startPos.x, startPos.y);
        _comParent.addChildAt(this.m_item, spriteOrder);
        return this.m_item;
    };
    return BaseFactory;
}());
__reflect(BaseFactory.prototype, "BaseFactory");
var HeartDieFactory = (function (_super) {
    __extends(HeartDieFactory, _super);
    function HeartDieFactory(name) {
        return _super.call(this, name) || this;
    }
    return HeartDieFactory;
}(BaseFactory));
__reflect(HeartDieFactory.prototype, "HeartDieFactory");
var HeartLiveFactory = (function (_super) {
    __extends(HeartLiveFactory, _super);
    function HeartLiveFactory(name) {
        var _this = _super.call(this, name) || this;
        console.log("--------name-----------" + name);
        return _this;
    }
    return HeartLiveFactory;
}(BaseFactory));
__reflect(HeartLiveFactory.prototype, "HeartLiveFactory");
var EnemyFactory = (function (_super) {
    __extends(EnemyFactory, _super);
    function EnemyFactory(name) {
        return _super.call(this, name) || this;
    }
    return EnemyFactory;
}(BaseFactory));
__reflect(EnemyFactory.prototype, "EnemyFactory");
/**生产工厂*/
var GameFactorys = (function () {
    function GameFactorys() {
    }
    Object.defineProperty(GameFactorys, "Instance", {
        get: function () {
            if (!GameFactorys.instance) {
                GameFactorys.instance = new GameFactorys();
            }
            return GameFactorys.instance;
        },
        enumerable: true,
        configurable: true
    });
    //只负责生产
    GameFactorys.prototype.create = function (type, parent, startPos, anthor) {
        switch (type) {
            case Identity.ENEMY:
                var _factory = new EnemyFactory("Enemy");
                var _item = _factory.createItem(parent, SpritOrder.ENEMY, startPos, anthor);
                break;
            case Identity.HEARTDIE:
                _factory = new HeartDieFactory("HeartDie");
                _item = _factory.createItem(parent, SpritOrder.HEART, startPos, anthor);
                break;
            case Identity.HEARTLIVE:
                _factory = new HeartLiveFactory("HeartLive");
                _item = _factory.createItem(parent, SpritOrder.HEART, startPos, anthor);
                break;
            default:
                break;
        }
        return { BaseFactory: _factory, BaseCom: _item };
    };
    return GameFactorys;
}());
__reflect(GameFactorys.prototype, "GameFactorys");
//# sourceMappingURL=BaseFactory.js.map