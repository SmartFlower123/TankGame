var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseManager = (function () {
    function BaseManager() {
    }
    Object.defineProperty(BaseManager, "Instance", {
        /**单列 */
        get: function () {
            if (!BaseManager.instance) {
                BaseManager.instance = new BaseManager();
            }
            return BaseManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    return BaseManager;
}());
__reflect(BaseManager.prototype, "BaseManager");
//# sourceMappingURL=BaseManager.js.map