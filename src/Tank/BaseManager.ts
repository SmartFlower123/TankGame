class BaseManager {
	private static instance: BaseManager;
	/**单列 */
	public static get Instance() {
		if (!BaseManager.instance) {
			BaseManager.instance = new BaseManager();
		}
		return BaseManager.instance;
	}
	public constructor() {
	}
}