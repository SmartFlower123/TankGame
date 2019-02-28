var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QueueManager = (function () {
    function QueueManager() {
        this.m_QuenManager = {};
    }
    Object.defineProperty(QueueManager, "Instance", {
        get: function () {
            if (!QueueManager.instance) {
                QueueManager.instance = new QueueManager();
            }
            return QueueManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    QueueManager.prototype.cretateQueue = function (id) {
        if (!this.m_QuenManager[id]) {
            var _item = new GameQueue(id);
            this.m_QuenManager[id] = _item;
        }
        return this.m_QuenManager[id];
    };
    QueueManager.prototype.getQueues = function (id) {
        var _array = this.m_QuenManager[id];
        return _array.gameArray;
    };
    QueueManager.prototype.getQueuesLen = function (id) {
        if (this.m_QuenManager[id]) {
            var _array = this.m_QuenManager[id];
            return _array.ArrayLengh;
        }
        else {
            return -1;
        }
    };
    return QueueManager;
}());
__reflect(QueueManager.prototype, "QueueManager");
//# sourceMappingURL=QueueManager.js.map