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
    private m_deltaBulletTime: number = 2000;
    private m_Enemy: GameEnemy;
    private m_EnemyBornTime: number;
    private m_waitForDestory: Array<GameEnemy> = [];
    public constructor() {
        this._view = fairygui.UIPackage.createObject("Joystick", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._text = this._view.getChild("n4").asTextField;
        let _attackBt = this._view.getChild("n6").asButton;
        this.m_attackBt = new AttackButton(_attackBt);
        this._joystick = new JoystickModule(this._view);
        this.m_gamePlayer = TankManager.Instance.createItem(this._view, SpritOrder.TANK, Identity.PLAYER, new egret.Point(100, 100));
        this.m_Enemy = EnemyManager.Instance.createItem(this._view, SpritOrder.TANK, Identity.ENEMY, new egret.Point(100, 200), "Enemys_03");
        this.m_EnemyBornTime = this.m_Enemy.BornTime;
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
        MapCreation.Instance.createHeart(this._view);
        MapCreation.Instance.createWall(this._view);
        // var _heart = BaseFactory.Instance.createItem(this._view, Identity.HEARTLIVE, SpritOrder.HEART, "HeartLive", new egret.Point(200, 200));
        // this.m_heart = _heart;
    }
    private m_heart: BaseCom;
    private addEvent() {
        this.m_attackBt.addOnClickAttack(this.OnclickAttack, this);
        fairygui.GRoot.inst.nativeStage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    private onEnterFrame() {
        var _enemyLen = QueueManager.Instance.getQueuesLen(Identity.ENEMY);
        //如果产生有敌人 间隔一段时间产生子弹
        if (_enemyLen > 0) {
            var _enemys = QueueManager.Instance.getQueues(Identity.ENEMY);
            for (var key in _enemys) {
                let _item = _enemys[key] as GameEnemy;
                var _now = egret.getTimer();
                var _pass = _now - this.m_EnemyBornTime;
                if (_pass >= this.m_deltaBulletTime) {
                    console.log("pass time");
                    var _bullet: Bullet = BulletManager.Instance.createBulletManager(this._view, Identity.ENEMYBULLET, _item.RunDirection, new egret.Point(_item.x, _item.y));
                    _item.canChangeRotation();
                    egret.setTimeout(() => { _item.canChangeRotation(true); }, this, 500);
                    //  _bullet.BornTime=_bulletNow;
                    this.m_EnemyBornTime = _now;
                }
            }
        }
      //  this.destoryPlayer();
        this.destoryEnemy();
        this.whenHitWall(Identity.ENEMYBULLET);
        this.whenHitWall(Identity.PlAYERBULLET);
    }
    //碰到墙壁子弹消失 
    private whenHitWall(id:Identity){
        var _enemyBulletLen = QueueManager.Instance.getQueuesLen(id);
        var _airArray:Array<BaseCom>=QueueManager.Instance.getQueues(Identity.AIRBARRIR);
        if(_enemyBulletLen>0){
            var _enemyBulletArray=QueueManager.Instance.getQueues(id);
            for(var key in _enemyBulletArray){
                 var _oneBullet:Bullet=_enemyBulletArray[key] as Bullet;
                 for(var key in _airArray){
                      let _oneAirBarrier:BaseCom=_airArray[key] as BaseCom;
                      var _isHit=_oneAirBarrier.getIsHit(_oneBullet.x,_oneBullet.y);
                      if(_isHit){
                          BulletManager.Instance.DestoryCom(_oneBullet,id);
                      }
                 }
            }
        }

    }
    /**销毁玩家 */
    private destoryPlayer() {
        //计算子弹的长度 长度<=0的时候 代表没有产生子弹
        var _lengh = QueueManager.Instance.getQueuesLen(Identity.ENEMYBULLET);
        if (_lengh <= 0) return;
        let _bulletArray = QueueManager.Instance.getQueues(Identity.ENEMYBULLET);
        //遍历子弹的数组 看数组中那个子弹打中了目标
        for (var key in _bulletArray) {
            let _one: Bullet = _bulletArray[key] as Bullet;
            var _isHit = this.m_heart.getIsHit(_one.x, _one.y);
            if (_isHit) {
                //销毁子弹
                BulletManager.Instance.DestoryCom(_one, Identity.ENEMYBULLET);
                //先播放爆炸特效
                var content: fairygui.MovieClip = this.m_heart.setLoaderUrl("Explosion", ContentName.MoveClip);
                content.setPlaySettings(0, -1, 1, -1, this.HeartdieAnimationFinish, this);
            }
        }
    }
    /**消灭敌人 */
    private destoryEnemy() {
        var _len = QueueManager.Instance.getQueuesLen(Identity.PlAYERBULLET);
        if (_len < 0) return;
        let _bulletArray = QueueManager.Instance.getQueues(Identity.PlAYERBULLET);
        for (var key in _bulletArray) {
            let _one: Bullet = _bulletArray[key] as Bullet;
            var _lengh = QueueManager.Instance.getQueuesLen(Identity.ENEMY);
            if (_lengh <= 0) return;
            let _enemyArray = QueueManager.Instance.getQueues(Identity.ENEMY);
            for (var key in _enemyArray) {
                var _oneEnemy: GameEnemy = _enemyArray[key] as GameEnemy;
                var _isHit = _oneEnemy.getIsHit(_one.x, _one.y);
            }
            if (_isHit) {
                _oneEnemy.setPivot(0.5, 0.5, true);
                var content: fairygui.MovieClip = _enemyArray[key].setLoaderUrl("Explosion", ContentName.MoveClip);
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
    }
    private HeartdieAnimationFinish() {
        //切换为死亡的图片
        this.m_heart.setLoaderUrl("HeartDie", ContentName.BitMap);
    }
    private enemyDieAnimation() {
        for (let i = 0; i < this.m_waitForDestory.length; ++i) {
            this.m_waitForDestory[i].DestoryCom();
            this.m_waitForDestory.splice(i, 1);
        }
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
