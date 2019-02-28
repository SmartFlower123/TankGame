var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BulletManager = (function () {
    function BulletManager() {
        //单例
        this.m_bullectArray = [];
        this.init();
    }
    Object.defineProperty(BulletManager, "Instance", {
        get: function () {
            if (!BulletManager.instance) {
                BulletManager.instance = new BulletManager();
            }
            return BulletManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    BulletManager.prototype.init = function () {
        this.m_bornNum = BornNum.FIRST;
        this.m_interValTime = 500;
    };
    /*产生子弹 */
    BulletManager.prototype.createBulletManager = function (parent, identity, ranDirection, startPos, anthor) {
        if (anthor === void 0) { anthor = new egret.Point(0.5, 0.8); }
        if (this.m_bornNum == BornNum.ELSE) {
            var _now = egret.getTimer();
            var _pass = _now - this.m_preBulletTime;
            if (_pass >= this.m_interValTime) {
                var _item = this.createBullet(parent, ranDirection, startPos, anthor);
                //加入队列中
                var _bulletArray = QueueManager.Instance.cretateQueue(identity);
                _bulletArray.addItem(_item);
                this.m_bornNum = BornNum.ELSE;
            }
        }
        else if (this.m_bornNum == BornNum.FIRST) {
            var _item = this.createBullet(parent, ranDirection, startPos, anthor);
            //加入队列中
            var _bulletArray = QueueManager.Instance.cretateQueue(identity);
            _bulletArray.addItem(_item);
            this.m_bornNum = BornNum.ELSE;
        }
        return _item;
    };
    /**销毁子弹 */
    BulletManager.prototype.DestoryCom = function (_item, identity) {
        //从数组中移除
        var _bulletArray = QueueManager.Instance.cretateQueue(identity);
        _bulletArray.removeItem(_item);
        //从舞台上移除
        _item.setCanMove(false);
        //销毁
        _item.DestoryCom();
    };
    //----------------------------------------创建子弹-----------------------------------------------------------------------------------------
    BulletManager.prototype.createBullet = function (parent, ranDirection, startPos, anthor) {
        if (anthor === void 0) { anthor = new egret.Point(0.5, 0.8); }
        this.m_preBulletTime = egret.getTimer();
        var _bullet = fairygui.UIPackage.createObject("Joystick", "Bullet").asCom;
        parent.addChildAt(_bullet, SpritOrder.BULLET);
        _bullet.RunDirection = ranDirection;
        _bullet.setXY(startPos.x, startPos.y);
        _bullet.setPivot(anthor.x, anthor.y, true);
        _bullet.setCanMove(true);
        return _bullet;
    };
    return BulletManager;
}());
__reflect(BulletManager.prototype, "BulletManager");
//# sourceMappingURL=BulletManager.js.map