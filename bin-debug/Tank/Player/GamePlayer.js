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
var GamePlayer = (function (_super) {
    __extends(GamePlayer, _super);
    function GamePlayer() {
        var _this = _super.call(this) || this;
        //间隔多少时间改变方向
        _this.m_intervalTime = 4000;
        return _this;
    }
    GamePlayer.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.initFGUI();
        //this.addEvent();
    };
    /**设置身份 */
    GamePlayer.prototype.setIdentity = function (identity) {
        this.m_identity = identity;
    };
    GamePlayer.prototype.initFGUI = function () {
        this.m_defendAni = this.getChild("n1").asMovieClip;
        this.m_bornAni = this.getChild("n2").asMovieClip;
        this.m_defendAni.playing = true;
        this.speed = 3;
    };
    GamePlayer.prototype.setDefendVisible = function (isVisible) {
        if (isVisible === void 0) { isVisible = false; }
        if (this.m_identity == Identity.ENEMY)
            isVisible = false;
        this.m_defendAni.visible = isVisible;
    };
    GamePlayer.prototype.setBornVisible = function (isVisible) {
        if (isVisible === void 0) { isVisible = false; }
        this.m_bornAni.visible = isVisible;
    };
    return GamePlayer;
}(BaseCom));
__reflect(GamePlayer.prototype, "GamePlayer");
//# sourceMappingURL=GamePlayer.js.map