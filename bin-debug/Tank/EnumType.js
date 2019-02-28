var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Type = (function () {
    function Type() {
    }
    return Type;
}());
__reflect(Type.prototype, "Type");
//身份
var Identity;
(function (Identity) {
    Identity[Identity["BARRIAR"] = 0] = "BARRIAR";
    Identity[Identity["HEARTDIE"] = 1] = "HEARTDIE";
    Identity[Identity["WALL"] = 2] = "WALL";
    Identity[Identity["PLAYER"] = 3] = "PLAYER";
    Identity[Identity["ENEMY"] = 4] = "ENEMY";
    Identity[Identity["AIRBARRIR"] = 5] = "AIRBARRIR";
    Identity[Identity["PlAYERBULLET"] = 6] = "PlAYERBULLET";
    Identity[Identity["ENEMYBULLET"] = 7] = "ENEMYBULLET";
    Identity[Identity["HEARTLIVE"] = 8] = "HEARTLIVE";
})(Identity || (Identity = {}));
//移动的方向
var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["UP"] = 0] = "UP";
    MoveDirection[MoveDirection["DOWN"] = 1] = "DOWN";
    MoveDirection[MoveDirection["LEFT"] = 2] = "LEFT";
    MoveDirection[MoveDirection["RIGHT"] = 3] = "RIGHT";
})(MoveDirection || (MoveDirection = {}));
//渲染循序
var SpritOrder;
(function (SpritOrder) {
    SpritOrder[SpritOrder["HEART"] = 0] = "HEART";
    SpritOrder[SpritOrder["BULLET"] = 1] = "BULLET";
    SpritOrder[SpritOrder["TANK"] = 2] = "TANK";
    SpritOrder[SpritOrder["ENEMY"] = 3] = "ENEMY";
    SpritOrder[SpritOrder["BORNANIMATION"] = 4] = "BORNANIMATION";
    SpritOrder[SpritOrder["DIEANIMATION"] = 5] = "DIEANIMATION";
})(SpritOrder || (SpritOrder = {}));
//出生顺序
var BornNum;
(function (BornNum) {
    BornNum[BornNum["FIRST"] = 0] = "FIRST";
    BornNum[BornNum["ELSE"] = 1] = "ELSE";
})(BornNum || (BornNum = {}));
//# sourceMappingURL=EnumType.js.map