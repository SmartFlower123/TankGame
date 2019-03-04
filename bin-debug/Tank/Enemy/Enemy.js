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
var GameEnemy = (function (_super) {
    __extends(GameEnemy, _super);
    function GameEnemy() {
        var _this = _super.call(this) || this;
        _this.m_state = -1;
        //间隔多少时间改变方向
        _this.m_intervalTime = 2000;
        return _this;
    }
    GameEnemy.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.initFGUI();
        this.addEvent();
    };
    GameEnemy.prototype.canChangeRotation = function (canChange) {
        if (canChange === void 0) { canChange = false; }
        this.m_canChangeDirection = canChange;
    };
    /**设置身份 */
    GameEnemy.prototype.initFGUI = function () {
        this.m_bornAni = this.getChild("n2").asMovieClip;
        //this.RunDirection = Math.random() * 5;
        this.RunDirection = 3;
        this.speed = 1;
        this.m_canChangeDirection = true;
    };
    Object.defineProperty(GameEnemy.prototype, "BornTime", {
        get: function () {
            var _bornTime = egret.getTimer();
            return _bornTime;
        },
        enumerable: true,
        configurable: true
    });
    GameEnemy.prototype.setDefendVisible = function (isVisible) {
        if (isVisible === void 0) { isVisible = false; }
        if (this.m_identity == Identity.ENEMY)
            isVisible = false;
        this.m_defendAni.visible = isVisible;
    };
    GameEnemy.prototype.setBornVisible = function (isVisible) {
        if (isVisible === void 0) { isVisible = false; }
        this.m_bornAni.visible = isVisible;
    };
    GameEnemy.prototype.addEvent = function () {
        fairygui.GRoot.inst.addEventListener(egret.Event.ENTER_FRAME, this.AutoMove, this);
        // this.m_startTime = egret.getTimer();
    };
    GameEnemy.prototype.AutoMove = function () {
        if (this.m_state == -1) {
            this.m_startTime = egret.getTimer();
            this.m_state = 1;
        }
        else if (this.m_state == 1) {
            var _now = egret.getTimer();
            var _pass = _now - this.m_startTime;
            if (_pass >= this.m_intervalTime) {
                //随机改变tank的运动方向
                if (this.m_canChangeDirection) {
                    var _num = Math.floor(Math.random() * 9);
                    if (_num == 0) {
                        this.RunDirection = MoveDirection.UP;
                    }
                    else if (_num >= 5) {
                        this.RunDirection = MoveDirection.DOWN;
                    }
                    else if (_num > 0 && _num <= 2) {
                        this.RunDirection = MoveDirection.LEFT;
                    }
                    else {
                        this.RunDirection = MoveDirection.RIGHT;
                    }
                    this.m_startTime = _now;
                }
            }
        }
        this.move();
    };
    return GameEnemy;
}(BaseCom));
__reflect(GameEnemy.prototype, "GameEnemy");
//# sourceMappingURL=Enemy.js.map