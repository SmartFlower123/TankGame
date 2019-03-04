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
    SpritOrder[SpritOrder["AIRBARRIR"] = 0] = "AIRBARRIR";
    SpritOrder[SpritOrder["HEART"] = 1] = "HEART";
    SpritOrder[SpritOrder["BULLET"] = 2] = "BULLET";
    SpritOrder[SpritOrder["TANK"] = 3] = "TANK";
    SpritOrder[SpritOrder["ENEMY"] = 4] = "ENEMY";
    SpritOrder[SpritOrder["BORNANIMATION"] = 5] = "BORNANIMATION";
    SpritOrder[SpritOrder["DIEANIMATIO"] = 6] = "DIEANIMATIO";
    SpritOrder[SpritOrder["WALL"] = 7] = "WALL";
})(SpritOrder || (SpritOrder = {}));
//出生顺序
var BornNum;
(function (BornNum) {
    BornNum[BornNum["FIRST"] = 0] = "FIRST";
    BornNum[BornNum["ELSE"] = 1] = "ELSE";
})(BornNum || (BornNum = {}));
//# sourceMappingURL=EnumType.js.map