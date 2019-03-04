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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super.call(this) || this;
    }
    Bullet.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.initState();
        this.addEvent();
    };
    Bullet.prototype.initState = function () {
        this.speed = 7;
        this.canMove = false;
        this.m_isDistoryBullet = false;
    };
    Object.defineProperty(Bullet.prototype, "BornTime", {
        get: function () {
            this.m_bornTime = egret.getTimer();
            return this.m_bornTime;
        },
        enumerable: true,
        configurable: true
    });
    // public set BornTime(time: number) {
    // 	this.m_bornTime = time;
    // }
    Bullet.prototype.setCanMove = function (canMove) {
        this.canMove = canMove;
    };
    //请先设置旋转方向 再attack
    Bullet.prototype.addEvent = function () {
        fairygui.GRoot.inst.nativeStage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Bullet.prototype.onEnterFrame = function (evt) {
        if (!this.canMove)
            return;
        this.move();
        //	if (!this.m_isDistoryBullet) this.attack();
    };
    return Bullet;
}(BaseCom));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map