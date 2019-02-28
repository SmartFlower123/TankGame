class GameQueue extends egret.HashObject {
	private m_QueueArray: Array<BaseCom> = [];
	private m_id: Identity;
	public constructor(id: Identity) {
		super();
		this.m_id = id;
	}
	public get ID() {
		return this.m_id;
	}
	public addItem(_item: BaseCom) {
		let _index = this.m_QueueArray.indexOf(_item);
		if (_index == -1) this.m_QueueArray.push(_item);
	}
	public removeItem(_item: BaseCom) {
		let _index = this.m_QueueArray.indexOf(_item);
		if (_index > -1) this.m_QueueArray.splice(_index, 1);
	}
	public get gameArray() {
		return this.m_QueueArray;
	}
	public get ArrayLengh() {
		return this.m_QueueArray.length;
	}
}