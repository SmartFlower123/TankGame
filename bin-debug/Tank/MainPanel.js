var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this.m_offsetX = 5;
        this.m_deltaBulletTime = 3000;
        this._view = fairygui.UIPackage.createObject("Joystick", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._text = this._view.getChild("n4").asTextField;
        var _attackBt = this._view.getChild("n6").asButton;
        this.m_attackBt = new AttackButton(_attackBt);
        this._joystick = new JoystickModule(this._view);
        this.m_gamePlayer = TankManager.Instance.createItem(this._view, SpritOrder.TANK, Identity.PLAYER, new egret.Point(100, 100));
        this.m_Enemy = EnemyManager.Instance.createItem(this._view, SpritOrder.TANK, Identity.ENEMY, new egret.Point(100, 200), "Enemys_01");
        this.m_EnemyBornTime = TankManager.Instance.BornTime;
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
        var _heart = GameFactorys.Instance.create(Identity.HEARTLIVE, this._view, new egret.Point(200, 200));
        this.m_heart = _heart.BaseCom;
    };
    MainPanel.prototype.addEvent = function () {
        this.m_attackBt.addOnClickAttack(this.OnclickAttack, this);
        fairygui.GRoot.inst.nativeStage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    MainPanel.prototype.onEnterFrame = function () {
        var _enemyLen = QueueManager.Instance.getQueuesLen(Identity.ENEMY);
        //如果产生有敌人
        if (_lengh > 0) {
            var _enemys = QueueManager.Instance.getQueues(Identity.ENEMY);
            for (var key in _enemys) {
                var _item = _enemys[key];
                var _now = egret.getTimer();
                var _pass = _now - this.m_EnemyBornTime;
                this.m_EnemyBornTime = _now;
                if (_pass >= this.m_deltaBulletTime) {
                    BulletManager.Instance.createBulletManager(this._view, Identity.ENEMYBULLET, _item.RunDirection, new egret.Point(_item.x, _item.y));
                }
            }
        }
        //计算子弹的长度 长度<=0的时候 代表没有产生子弹
        var _lengh = QueueManager.Instance.getQueuesLen(Identity.PlAYERBULLET);
        if (_lengh <= 0)
            return;
        var _bulletArray = QueueManager.Instance.getQueues(Identity.PlAYERBULLET);
        //遍历子弹的数组 看数组中那个子弹打中了目标
        for (var key in _bulletArray) {
            var _one = _bulletArray[key];
            var _isHit = this.m_heart.getIsHit(_one.x, _one.y);
            if (_isHit) {
                //先播放爆炸特效
                var content = this.m_heart.setLoaderUrl("Explosion", ContentName.MoveClip);
                content.setPlaySettings(0, -1, 1, -1, this.dieAnimationFinish, this);
                //销毁子弹
                BulletManager.Instance.DestoryCom(_one, Identity.PlAYERBULLET);
            }
        }
    };
    MainPanel.prototype.dieAnimationFinish = function () {
        //切换为死亡的图片
        this.m_heart.setLoaderUrl("HeartDie", ContentName.BitMap);
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