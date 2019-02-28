class MainPanel {
    private _view: fairygui.GComponent;
    private _joystick: JoystickModule;
    private _text: fairygui.GTextField;
    private m_gamePlayer: GamePlayer;
    private m_bullect: Bullet;
    private m_attackBt: AttackButton;
    private m_offsetX: number = 5;
    private m_preBullectBornTime: number;
    private m_deltaTime: number;
    private m_firsBullet: number;
    private m_canTestHit: boolean;
    private m_deltaBulletTime: number = 3000;
    private m_Enemy: GameEnemy;
    private m_EnemyBornTime: number;
    public constructor() {
        this._view = fairygui.UIPackage.createObject("Joystick", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._text = this._view.getChild("n4").asTextField;
        let _attackBt = this._view.getChild("n6").asButton;
        this.m_attackBt = new AttackButton(_attackBt);
        this._joystick = new JoystickModule(this._view);
        this.m_gamePlayer = TankManager.Instance.createItem(this._view, SpritOrder.TANK, Identity.PLAYER, new egret.Point(100, 100));
        this.m_Enemy = EnemyManager.Instance.createItem(this._view, SpritOrder.TANK, Identity.ENEMY, new egret.Point(100, 200),"Enemys_01");
        this.m_EnemyBornTime = TankManager.Instance.BornTime;
        this._joystick.addEventListener(JoystickModule.JoystickMoving, this.onJoystickMoving, this);
        this._joystick.addEventListener(JoystickModule.JoystickUp, this.onJoystickUp, this);
        this.init();
    }
    private initData() {
        this.m_deltaTime = 1000;
    }
    private initHeart() {

    }
    private initState() {
        this.m_firsBullet = -1;
        this.m_canTestHit = false;
    }
    private init() {
        this.initData();
        this.initState();
        this.addEvent();
        var _heart = GameFactorys.Instance.create(Identity.HEARTLIVE, this._view, new egret.Point(200, 200));
        this.m_heart = _heart.BaseCom;
    }
    private m_heart: BaseCom;
    private addEvent() {
        this.m_attackBt.addOnClickAttack(this.OnclickAttack, this);
        fairygui.GRoot.inst.nativeStage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    private onEnterFrame() {
        var _enemyLen = QueueManager.Instance.getQueuesLen(Identity.ENEMY);
        //如果产生有敌人
        if (_lengh > 0) {
            var _enemys = QueueManager.Instance.getQueues(Identity.ENEMY);
            for (var key in _enemys) {
                let _item = _enemys[key] as GameEnemy;
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
        if (_lengh <= 0) return;
        let _bulletArray = QueueManager.Instance.getQueues(Identity.PlAYERBULLET);
        //遍历子弹的数组 看数组中那个子弹打中了目标
        for (var key in _bulletArray) {
            let _one: Bullet = _bulletArray[key] as Bullet;
            var _isHit = this.m_heart.getIsHit(_one.x, _one.y);
            if (_isHit) {
                //先播放爆炸特效
                var content: fairygui.MovieClip = this.m_heart.setLoaderUrl("Explosion", ContentName.MoveClip);
                content.setPlaySettings(0, -1, 1, -1, this.dieAnimationFinish, this);
                //销毁子弹
                BulletManager.Instance.DestoryCom(_one, Identity.PlAYERBULLET);
            }
        }
    }
    private dieAnimationFinish() {
        //切换为死亡的图片
        this.m_heart.setLoaderUrl("HeartDie", ContentName.BitMap);
    }
    private OnclickAttack() {
        //生产子弹
        BulletManager.Instance.createBulletManager(this._view, Identity.PlAYERBULLET, this.m_gamePlayer.RunDirection, new egret.Point(this.m_gamePlayer.x, this.m_gamePlayer.y))
    }
    //检测子弹是否碰撞
    private onJoystickMoving(evt: egret.Event): void {
        this._text.text = "" + evt.data;
        this.m_gamePlayer.RunDirection = evt.data;
        this.m_gamePlayer.move();
    }
    private onJoystickUp(evt: egret.Event): void {
        this._text.text = "";
    }
}
