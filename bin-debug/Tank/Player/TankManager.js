var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TankManager = (function () {
    function TankManager() {
    }
    Object.defineProperty(TankManager, "Instance", {
        get: function () {
            if (!TankManager.instance) {
                TankManager.instance = new TankManager();
            }
            return TankManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    /**创建 */
    TankManager.prototype.createItem = function (_comParent, spriteOrder, identity, startPos, resName, anthor) {
        var _this = this;
        if (resName === void 0) { resName = "Player1_01"; }
        if (anthor === void 0) { anthor = new egret.Point(0.56, 0.08); }
        var _item = this.setPlay(_comParent, spriteOrder, identity, startPos, anthor, resName);
        this.m_bornTime = egret.getTimer();
        _item.IconLoader.visible = false;
        _item.IconLoader.visible = false;
        _item.setDefendVisible();
        egret.setTimeout(function () {
            _item.IconLoader.visible = true;
            _item.setBornVisible(false);
            _item.setDefendVisible(true);
            _this.hideDefend(_item);
        }, this, 400);
        return _item;
    };
    Object.defineProperty(TankManager.prototype, "BornTime", {
        get: function () {
            return this.m_bornTime;
        },
        enumerable: true,
        configurable: true
    });
    /**销毁 */
    TankManager.prototype.DestoryCom = function (_item, identity) {
        //从数组中移除
        var _bulletArray = QueueManager.Instance.cretateQueue(identity);
        _bulletArray.removeItem(_item);
        //从舞台上移除
        _item.setCanMove(false);
        //销毁
        _item.DestoryCom();
    };
    //-----------------------------下面是私有方法----------------------------------------------------------
    TankManager.prototype.hideDefend = function (_item) {
        egret.setTimeout(function () {
            _item.setDefendVisible();
        }, this, 4000);
    };
    TankManager.prototype.setPlay = function (_comParent, spriteOrder, identity, startPos, anthor, resName) {
        if (anthor === void 0) { anthor = new egret.Point(0.56, 0.08); }
        if (resName === void 0) { resName = "Player1_01"; }
        var item = fairygui.UIPackage.createObject("Joystick", "GamePlayer").asCom;
        //加入队列
        var _Array = QueueManager.Instance.cretateQueue(identity);
        _Array.addItem(item);
        //加入队列
        item.setLoaderUrl(resName, ContentName.BitMap);
        if (anthor)
            item.setPivot(anthor.x, anthor.y, true);
        if (startPos)
            item.setXY(startPos.x, startPos.y);
        _comParent.addChildAt(item, spriteOrder);
        return item;
    };
    return TankManager;
}());
__reflect(TankManager.prototype, "TankManager");
//# sourceMappingURL=TankManager.js.map