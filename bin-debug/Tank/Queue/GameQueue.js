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
var GameQueue = (function (_super) {
    __extends(GameQueue, _super);
    function GameQueue(id) {
        var _this = _super.call(this) || this;
        _this.m_QueueArray = [];
        _this.m_id = id;
        return _this;
    }
    Object.defineProperty(GameQueue.prototype, "ID", {
        get: function () {
            return this.m_id;
        },
        enumerable: true,
        configurable: true
    });
    GameQueue.prototype.addItem = function (_item) {
        var _index = this.m_QueueArray.indexOf(_item);
        if (_index == -1)
            this.m_QueueArray.push(_item);
    };
    GameQueue.prototype.removeItem = function (_item) {
        var _index = this.m_QueueArray.indexOf(_item);
        if (_index > -1)
            this.m_QueueArray.splice(_index, 1);
    };
    Object.defineProperty(GameQueue.prototype, "gameArray", {
        get: function () {
            return this.m_QueueArray;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameQueue.prototype, "ArrayLengh", {
        get: function () {
            return this.m_QueueArray.length;
        },
        enumerable: true,
        configurable: true
    });
    return GameQueue;
}(egret.HashObject));
__reflect(GameQueue.prototype, "GameQueue");
//# sourceMappingURL=GameQueue.js.map