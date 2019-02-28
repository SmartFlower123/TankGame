var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AttackButton = (function () {
    function AttackButton(attackBt) {
        this.m_attackBt = attackBt;
        this.init();
        this.addEvent();
    }
    AttackButton.prototype.init = function () {
        this.initData();
    };
    AttackButton.prototype.initData = function () {
    };
    AttackButton.prototype.addEvent = function () {
        this.m_attackBt.addClickListener(this.onClick, this);
    };
    AttackButton.prototype.addOnClickAttack = function (onclickAttack, thisobj) {
        this.m_onClickLisner = onclickAttack;
        this.m_thisObj = thisobj;
    };
    AttackButton.prototype.onClick = function () {
        if (this.m_onClickLisner)
            this.m_onClickLisner.call(this.m_thisObj);
    };
    return AttackButton;
}());
__reflect(AttackButton.prototype, "AttackButton");
//# sourceMappingURL=AttackButton.js.map