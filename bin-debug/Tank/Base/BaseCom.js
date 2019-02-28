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
var BaseCom = (function (_super) {
    __extends(BaseCom, _super);
    function BaseCom() {
        return _super.call(this) || this;
    }
    BaseCom.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.init();
    };
    Object.defineProperty(BaseCom.prototype, "RunDirection", {
        get: function () {
            return this.runDirection;
        },
        set: function (direc) {
            this.runDirection = direc;
            this.setRotation();
        },
        enumerable: true,
        configurable: true
    });
    BaseCom.prototype.setLoaderUrl = function (iconName, iconType) {
        var _url = fairygui.UIPackage.getItemURL("Joystick", iconName);
        this.m_loader.url = _url;
        this.m_contenName = iconType;
        return this.m_loader.content;
    };
    Object.defineProperty(BaseCom.prototype, "IconLoader", {
        /**获取loader*/
        get: function () {
            return this.m_loader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCom.prototype, "ContentName", {
        get: function () {
            return this.m_contenName;
        },
        enumerable: true,
        configurable: true
    });
    /**是否碰撞*/
    BaseCom.prototype.getIsHit = function (_x, _y) {
        var isHit = this.displayObject.hitTestPoint(_x, _y);
        return isHit;
    };
    /**移动 */
    BaseCom.prototype.move = function () {
        var _direction = this.runDirection;
        if (_direction == MoveDirection.UP) {
            this.y -= this.speed;
        }
        else if (_direction == MoveDirection.DOWN) {
            this.y += this.speed;
        }
        else if (_direction == MoveDirection.LEFT) {
            this.x -= this.speed;
        }
        else {
            this.x += this.speed;
        }
    };
    /**设置移动旋转 */
    BaseCom.prototype.setRotation = function () {
        var dirction = this.runDirection;
        if (dirction == MoveDirection.UP) {
            this.rotation = 0;
        }
        else if (dirction == MoveDirection.DOWN) {
            this.rotation = -180;
        }
        else if (dirction == MoveDirection.LEFT) {
            this.rotation = -90;
        }
        else {
            this.rotation = 90;
        }
    };
    /**销毁 并移除舞台 */
    BaseCom.prototype.DestoryCom = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.dispose();
    };
    //-------------------------私有方法---------------------------------
    BaseCom.prototype.init = function () {
        this.m_loader = this.getChild("loader").asLoader;
        this.m_loader.width = this.width;
        this.m_loader.height = this.height;
    };
    return BaseCom;
}(fairygui.GComponent));
__reflect(BaseCom.prototype, "BaseCom");
var ContentName;
(function (ContentName) {
    ContentName[ContentName["MoveClip"] = 0] = "MoveClip";
    ContentName[ContentName["Gcom"] = 1] = "Gcom";
    ContentName[ContentName["BitMap"] = 2] = "BitMap";
})(ContentName || (ContentName = {}));
//# sourceMappingURL=BaseCom.js.map