var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this.m_offsetX = 5;
        this.m_deltaBulletTime = 2000;
        this.m_waitForDestory = [];
        this._view = fairygui.UIPackage.createObject("Joystick", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._text = this._view.getChild("n4").asTextField;
        var _attackBt = this._view.getChild("n6").asButton;
        this.m_attackBt = new AttackButton(_attackBt);
        this._joystick = new JoystickModule(this._view);
        this.m_gamePlayer = TankManager.Instance.createItem(this._view, SpritOrder.TANK, Identity.PLAYER, new egret.Point(100, 100));
        this.m_Enemy = EnemyManager.Instance.createItem(this._view, SpritOrder.TANK, Identity.ENEMY, new egret.Point(100, 200), "Enemys_03");
        this.m_EnemyBornTime = this.m_Enemy.BornTime;
        this._joystick.addEventListener(JoystickModule.JoystickMoving, this.onJoystickMoving, this);
        this._joystick.addEventListener(JoystickModule.JoystickUp, this.onJoystickUp, this);
        this.init();
    }
    MainPanel.prototype.initData = function () {
        this.m_deltaTime = 1000;
    };
    MainPanel.prototype.initHeart = function () {
    };
    MainPanel.prototype.initState = function () {
        this.m_firsBullet = -1;
        this.m_canTestHit = false;
    };
    MainPanel.prototype.init = function () {
        this.initData();
        this.initState();
        this.addEvent();
        MapCreation.Instance.createHeart(this._view);
        MapCreation.Instance.createWall(this._view);
        // var _heart = BaseFactory.Instance.createItem(this._view, Identity.HEARTLIVE, SpritOrder.HEART, "HeartLive", new egret.Point(200, 200));
        // this.m_heart = _heart;
    };
    MainPanel.prototype.addEvent = function () {
        this.m_attackBt.addOnClickAttack(this.OnclickAttack, this);
        fairygui.GRoot.inst.nativeStage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    MainPanel.prototype.onEnterFrame = function () {
        var _enemyLen = QueueManager.Instance.getQueuesLen(Identity.ENEMY);
        //如果产生有敌人 间隔一段时间产生子弹
        if (_enemyLen > 0) {
            var _enemys = QueueManager.Instance.getQueues(Identity.ENEMY);
            var _loop_1 = function () {
                var _item = _enemys[key];
                _now = egret.getTimer();
                _pass = _now - this_1.m_EnemyBornTime;
                if (_pass >= this_1.m_deltaBulletTime) {
                    console.log("pass time");
                    _bullet = BulletManager.Instance.createBulletManager(this_1._view, Identity.ENEMYBULLET, _item.RunDirection, new egret.Point(_item.x, _item.y));
                    _item.canChangeRotation();
                    egret.setTimeout(function () { _item.canChangeRotation(true); }, this_1, 500);
                    //  _bullet.BornTime=_bulletNow;
                    this_1.m_EnemyBornTime = _now;
                }
            };
            var this_1 = this, _now, _pass, _bullet;
            for (var key in _enemys) {
                _loop_1();
            }
        }
        //  this.destoryPlayer();
        this.destoryEnemy();
        this.whenHitWall(Identity.ENEMYBULLET);
        this.whenHitWall(Identity.PlAYERBULLET);
    };
    //碰到墙壁子弹消失 
    MainPanel.prototype.whenHitWall = function (id) {
        var _enemyBulletLen = QueueManager.Instance.getQueuesLen(id);
        var _airArray = QueueManager.Instance.getQueues(Identity.AIRBARRIR);
        if (_enemyBulletLen > 0) {
            var _enemyBulletArray = QueueManager.Instance.getQueues(id);
            for (var key in _enemyBulletArray) {
                var _oneBullet = _enemyBulletArray[key];
                for (var key in _airArray) {
                    var _oneAirBarrier = _airArray[key];
                    var _isHit = _oneAirBarrier.getIsHit(_oneBullet.x, _oneBullet.y);
                    if (_isHit) {
                        BulletManager.Instance.DestoryCom(_oneBullet, id);
                    }
                }
            }
        }
    };
    /**销毁玩家 */
    MainPanel.prototype.destoryPlayer = function () {
        //计算子弹的长度 长度<=0的时候 代表没有产生子弹
        var _lengh = QueueManager.Instance.getQueuesLen(Identity.ENEMYBULLET);
        if (_lengh <= 0)
            return;
        var _bulletArray = QueueManager.Instance.getQueues(Identity.ENEMYBULLET);
        //遍历子弹的数组 看数组中那个子弹打中了目标
        for (var key in _bulletArray) {
            var _one = _bulletArray[key];
            var _isHit = this.m_heart.getIsHit(_one.x, _one.y);
            if (_isHit) {
                //销毁子弹
                BulletManager.Instance.DestoryCom(_one, Identity.ENEMYBULLET);
                //先播放爆炸特效
                var content = this.m_heart.setLoaderUrl("Explosion", ContentName.MoveClip);
                content.setPlaySettings(0, -1, 1, -1, this.HeartdieAnimationFinish, this);
            }
        }
    };
    /**消灭敌人 */
    MainPanel.prototype.destoryEnemy = function () {
        var _len = QueueManager.Instance.getQueuesLen(Identity.PlAYERBULLET);
        if (_len < 0)
            return;
        var _bulletArray = QueueManager.Instance.getQueues(Identity.PlAYERBULLET);
        for (var key in _bulletArray) {
            var _one = _bulletArray[key];
            var _lengh = QueueManager.Instance.getQueuesLen(Identity.ENEMY);
            if (_lengh <= 0)
                return;
            var _enemyArray = QueueManager.Instance.getQueues(Identity.ENEMY);
            for (var key in _enemyArray) {
                var _oneEnemy = _enemyArray[key];
                var _isHit = _oneEnemy.getIsHit(_one.x, _one.y);
            }
            if (_isHit) {
                _oneEnemy.setPivot(0.5, 0.5, true);
                var content = _enemyArray[key].setLoaderUrl("Explosion", ContentName.MoveClip);
                EnemyManager.Instance.setCanMove(_oneEnemy);
                content.setPlaySettings(0, -1, 1, -1, this.enemyDieAnimation, this);
                //等待被移除舞台的敌人
                this.m_waitForDestory.push(_oneEnemy);
                //从敌人数组中移除
                var _enemys = QueueManager.Instance.cretateQueue(Identity.ENEMY);
                _enemys.removeItem(_oneEnemy);
                //销毁子弹
                BulletManager.Instance.DestoryCom(_one, Identity.PlAYERBULLET);
            }
        }
    };
    MainPanel.prototype.HeartdieAnimationFinish = function () {
        //切换为死亡的图片
        this.m_heart.setLoaderUrl("HeartDie", ContentName.BitMap);
    };
    MainPanel.prototype.enemyDieAnimation = function () {
        for (var i = 0; i < this.m_waitForDestory.length; ++i) {
            this.m_waitForDestory[i].DestoryCom();
            this.m_waitForDestory.splice(i, 1);
        }
    };
    MainPanel.prototype.OnclickAttack = function () {
        //生产子弹
        BulletManager.Instance.createBulletManager(this._view, Identity.PlAYERBULLET, this.m_gamePlayer.RunDirection, new egret.Point(this.m_gamePlayer.x, this.m_gamePlayer.y));
    };
    //检测子弹是否碰撞
    MainPanel.prototype.onJoystickMoving = function (evt) {
        this._text.text = "" + evt.data;
        this.m_gamePlayer.RunDirection = evt.data;
        this.m_gamePlayer.move();
    };
    MainPanel.prototype.onJoystickUp = function (evt) {
        this._text.text = "";
    };
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
//# sourceMappingURL=MainPanel.js.map