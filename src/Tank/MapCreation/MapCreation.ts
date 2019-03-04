class MapCreation {
	private static instance: MapCreation;
	public static get Instance() {
		if (!MapCreation.instance) {
			MapCreation.instance = new MapCreation();
		}
		return MapCreation.instance;
	}
	public constructor() {

	}
	//老家
	public createHeart(_parent: fairygui.GComponent) {
		var _heart: BaseCom = BaseFactory.Instance.createItem(_parent, Identity.HEARTLIVE, SpritOrder.HEART, "HeartLive");
		let _heartPosX = fairygui.GRoot.inst.width / 2;
		let _heartPosY = fairygui.GRoot.inst.height - _heart.height / 2;
		_heart.setXY(_heartPosX, _heartPosY);
		//在Heart周围设置包围圈
		//左边墙的位置
		let _x = _heartPosX - _heart.width;
		let _y = _heart.y - _heart.height;
		for (let i = 0; i < 5; ++i) {
			var _wallleft: BaseCom = BaseFactory.Instance.createItem(_parent, Identity.WALL, SpritOrder.WALL, "wall");
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
	}
	public createWall(_parent) {
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
	}
	//实例化外围墙
	public createExtenalWall(_parent: fairygui.GComponent, _startx: number, _starty: number, xdelta: number, ydelta: number, maxdistanceX: number, maxdistanceY: number) {
		var _canCreateleftWall: Boolean = true;
		var _x = _startx;
		var _y = _starty;
		//实列化左边的强
		while (_canCreateleftWall) {
			let _leftWall: BaseCom = BaseFactory.Instance.createItem(_parent, Identity.AIRBARRIR, SpritOrder.AIRBARRIR, "wall", null, null);
			_leftWall.setXY(_x, _y);
			_y += ydelta;
			_x += xdelta;
			if (_y > maxdistanceY || _x > maxdistanceX) {
				_canCreateleftWall = false;
			}
		}
	}
}