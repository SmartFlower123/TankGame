var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RegisterClass = (function () {
    function RegisterClass() {
        this.registerClass();
    }
    RegisterClass.prototype.registerClass = function () {
        //加包
        fairygui.UIPackage.addPackage("Joystick");
        //注册
        var _baseUrl = fairygui.UIPackage.getItemURL("Joystick", "Base");
        var _buttonUrl = fairygui.UIPackage.getItemURL("Joystick", "Bullet");
        var _playerUrl = fairygui.UIPackage.getItemURL("Joystick", "GamePlayer");
        var _enemyUrl = fairygui.UIPackage.getItemURL("Joystick", "GameEnemy");
        fairygui.UIObjectFactory.setPackageItemExtension(_baseUrl, BaseCom);
        fairygui.UIObjectFactory.setPackageItemExtension(_buttonUrl, Bullet);
        fairygui.UIObjectFactory.setPackageItemExtension(_playerUrl, GamePlayer);
        fairygui.UIObjectFactory.setPackageItemExtension(_enemyUrl, GameEnemy);
    };
    return RegisterClass;
}());
__reflect(RegisterClass.prototype, "RegisterClass");
//# sourceMappingURL=RegisterClass.js.map