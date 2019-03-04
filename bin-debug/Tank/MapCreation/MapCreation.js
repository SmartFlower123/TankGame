var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapCreation = (function () {
    function MapCreation() {
    }
    Object.defineProperty(MapCreation, "Instance", {
        get: function () {
            if (!MapCreation.instance) {
                MapCreation.instance = new MapCreation();
            }
            return MapCreation.instance;
        },
        enumerable: true,
        configurable: true
    });
    //老家
    MapCreation.prototype.createHeart = function (_parent) {
        var _heart = BaseFactory.Instance.createItem(_parent, Identity.HEARTLIVE, SpritOrder.HEART, "HeartLive");
        var _heartPosX = fairygui.GRoot.inst.width / 2;
        var _heartPosY = fairygui.GRoot.inst.height - _heart.height / 2;
        _heart.setXY(_heartPosX, _heartPosY);
        //在Heart周围设置包围圈
        //左边墙的位置
        var _x = _heartPosX - _heart.width;
        var _y = _heart.y - _heart.height;
        for (var i = 0; i < 5; ++i) {
            var _wallleft = BaseFactory.Instance.createItem(_parent, Identity.WALL, SpritOrder.WALL, "wall");
            var _delta = _wallleft.width;
            _wallleft.setXY(_x, _y);
            _x += _delta;
            if (i == 3) {
                _wallleft.setXY((_heartPosX - _heart.width), _heart.y);
            }
            else if (i == 4) {
                _wallleft.setXY((_heartPosX + _heart.width), _heart.y);
            }
        }
    };
    MapCreation.prototype.createWall = function (_parent) {
        var _maxX = fairygui.GRoot.inst.width - 30;
        var _maxY = fairygui.GRoot.inst.height - 30;
        //上面围墙
        this.createExtenalWall(_parent, 0, 0, 0, 30, _maxX, _maxY);
        //左边围墙
        this.createExtenalWall(_parent, 0, 0, 30, 0, _maxX, _maxY);
        //下面围墙
        this.createExtenalWall(_parent, 0, _maxY, 30, 0, _maxX, _maxY);
        //右边围墙
        this.createExtenalWall(_parent, _maxX, 0, 0, 30, _maxX, _maxY);
    };
    //实例化外围墙
    MapCreation.prototype.createExtenalWall = function (_parent, _startx, _starty, xdelta, ydelta, maxdistanceX, maxdistanceY) {
        var _canCreateleftWall = true;
        var _x = _startx;
        var _y = _starty;
        //实列化左边的强
        while (_canCreateleftWall) {
            var _leftWall = BaseFactory.Instance.createItem(_parent, Identity.AIRBARRIR, SpritOrder.AIRBARRIR, "wall", null, null);
            _leftWall.setXY(_x, _y);
            _y += ydelta;
            _x += xdelta;
            if (_y > maxdistanceY || _x > maxdistanceX) {
                _canCreateleftWall = false;
            }
        }
    };
    return MapCreation;
}());
__reflect(MapCreation.prototype, "MapCreation");
//# sourceMappingURL=MapCreation.js.map