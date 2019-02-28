class BaseFactory {
	private m_retname: string;
	private m_item: any;
	public constructor(resName: string) {
		this.m_retname = resName;
		console.log("--------name-----------" + this.m_retname);
	}
	//只负责生产
	public createItem(_comParent: fairygui.GComponent, spriteOrder: number, startPos?: egret.Point, anthor?: egret.Point): BaseCom {
		this.m_item = <BaseCom>fairygui.UIPackage.createObject("Joystick", "Base").asCom;
		console.log("--------name-----------" + this.m_retname);
		this.m_item.setLoaderUrl(this.m_retname, ContentName.BitMap);
		if (anthor) this.m_item.setPivot(anthor.x, anthor.y,true);
		if (startPos) this.m_item.setXY(startPos.x, startPos.y);
		_comParent.addChildAt(this.m_item, spriteOrder);
		return this.m_item;
	}
}
class HeartDieFactory extends BaseFactory {
	public constructor(name: string) {
		super(name);
	}
}
class HeartLiveFactory extends BaseFactory {
	public constructor(name: string) {
		super(name);
		console.log("--------name-----------" + name);
	}
}
class EnemyFactory extends BaseFactory {
	public constructor(name: string) {
		super(name)
	}
}

/**生产工厂*/
class GameFactorys {
	private static instance: GameFactorys;
	public static get Instance() {
		if (!GameFactorys.instance) {
			GameFactorys.instance = new GameFactorys();
		}
		return GameFactorys.instance;
	}
	//只负责生产
	public create(type: Identity,parent: fairygui.GComponent, startPos?: egret.Point, anthor?: egret.Point): { BaseFactory, BaseCom } {
		switch (type) {
			case Identity.ENEMY:
				var _factory = new EnemyFactory("Enemy");
				var _item = _factory.createItem(parent, SpritOrder.ENEMY, startPos,anthor);
				break;
			case Identity.HEARTDIE:
				_factory = new HeartDieFactory("HeartDie");
				_item = _factory.createItem(parent, SpritOrder.HEART, startPos, anthor);
				break;
			case Identity.HEARTLIVE:
				_factory = new HeartLiveFactory("HeartLive");
				_item = _factory.createItem(parent, SpritOrder.HEART, startPos,anthor);
				break;
			default:
				break;
		}
		return { BaseFactory: _factory, BaseCom: _item };
	}
}