var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SpecialAnimation = (function () {
    function SpecialAnimation(targetParent) {
        this.m_tagetParent = targetParent;
    }
    //生成动效
    SpecialAnimation.prototype.CreateBornAnim = function (name, pkgName) {
        if (pkgName === void 0) { pkgName = "Joystick"; }
        this.m_Anim = fairygui.UIPackage.createObject(pkgName, name).asMovieClip;
        this.m_tagetParent.addChildAt(this.m_Anim, SpritOrder.BORNANIMATION);
        this.m_Anim.setPivot(0.5, 0.5);
        this.PlayAnimation();
        //this.m_Anim.setScale(2,2);
    };
    SpecialAnimation.prototype.setAnimXY = function (_x, _y) {
        this.m_Anim.setXY(_x, _y);
    };
    SpecialAnimation.prototype.setPiovt = function () {
        this.m_Anim.setPivot(0.5, 0.5, true);
    };
    SpecialAnimation.prototype.PlayAnimation = function () {
        this.m_Anim.setPlaySettings(0, -1, 10, 0, this.DistroyCom, this);
    };
    //销毁
    SpecialAnimation.prototype.DistroyCom = function () {
        if (this.m_Anim.parent) {
            this.m_Anim.parent.removeChild(this.m_Anim);
            this.m_Anim.dispose();
            this.m_Anim = null;
        }
    };
    return SpecialAnimation;
}());
__reflect(SpecialAnimation.prototype, "SpecialAnimation");
//# sourceMappingURL=SpecialAnimation.js.map