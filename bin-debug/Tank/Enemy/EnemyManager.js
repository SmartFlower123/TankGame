var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnemyManager = (function () {
    function EnemyManager() {
    }
    Object.defineProperty(EnemyManager, "Instance", {
        get: function () {
            if (!EnemyManager.instance) {
                EnemyManager.instance = new EnemyManager();
            }
            return EnemyManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    /**创建 */
    EnemyManager.prototype.createItem = function (_comParent, spriteOrder, identity, startPos, resName, anthor) {
        if (identity === void 0) { identity = Identity.ENEMY; }
        if (resName === void 0) { resName = "Player1_01"; }
        if (anthor === void 0) { anthor = new egret.Point(0.56, 0.08); }
        var _item = this.setPlay(_comParent, spriteOrder, identity, startPos, anthor, resName);
        this.m_bornTime = egret.getTimer();
        _item.IconLoader.visible = false;
        _item.IconLoader.visible = false;
        egret.setTimeout(function () {
            _item.IconLoader.visible = true;
            _item.setBornVisible(false);
        }, this, 400);
        return _item;
    };
    Object.defineProperty(EnemyManager.prototype, "BornTime", {
        get: function () {
            return this.m_bornTime;
        },
        enumerable: true,
        configurable: true
    });
    /**销毁 */
    EnemyManager.prototype.DestoryCom = function (_item, identity) {
        //从数组中移除
        var _bulletArray = QueueManager.Instance.cretateQueue(identity);
        _bulletArray.removeItem(_item);
        //从舞台上移除
        _item.setCanMove(false);
        //销毁
        _item.DestoryCom();
    };
    //-----------------------------下面是私有方法----------------------------------------------------------
    EnemyManager.prototype.setPlay = function (_comParent, spriteOrder, identity, startPos, anthor, resName) {
        if (anthor === void 0) { anthor = new egret.Point(0.56, 0.08); }
        if (resName === void 0) { resName = "Player1_01"; }
        var item = fairygui.UIPackage.createObject("Joystick", "GameEnemy").asCom;
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
    return EnemyManager;
}());
__reflect(EnemyManager.prototype, "EnemyManager");
//# sourceMappingURL=EnemyManager.js.map