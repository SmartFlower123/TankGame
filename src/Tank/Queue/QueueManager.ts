class QueueManager {
	private static instance: QueueManager;
	private m_QuenManager: Object = {};
	public static get Instance() {
		if (!QueueManager.instance) {
			QueueManager.instance = new QueueManager();
		}
		return QueueManager.instance;
	}
	public constructor() {

	}
	public cretateQueue(id: Identity): GameQueue {
		if (!this.m_QuenManager[id]) {
			var _item = new GameQueue(id);
			this.m_QuenManager[id] = _item
		}
		return this.m_QuenManager[id];
	}
	public getQueues(id: Identity): Array<BaseCom> {
		var _array = this.m_QuenManager[id] as GameQueue;
		return _array.gameArray;
	}
	public getQueuesLen(id: Identity): number {
		if (this.m_QuenManager[id]) {
			var _array = this.m_QuenManager[id] as GameQueue;
			return _array.ArrayLengh;
		}
		else {
			return -1;
		}
	}
}