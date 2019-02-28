class RegisterClass {
	public constructor() {
		this.registerClass();
	}
	private registerClass() {
		//加包
		fairygui.UIPackage.addPackage("Joystick");
		//注册
		let _baseUrl = fairygui.UIPackage.getItemURL("Joystick", "Base");
		let _buttonUrl = fairygui.UIPackage.getItemURL("Joystick", "Bullet");
		let _playerUrl=fairygui.UIPackage.getItemURL("Joystick", "GamePlayer");
		let _enemyUrl=fairygui.UIPackage.getItemURL("Joystick", "GameEnemy");
		
		fairygui.UIObjectFactory.setPackageItemExtension(_baseUrl, BaseCom);
		fairygui.UIObjectFactory.setPackageItemExtension(_buttonUrl, Bullet);
		fairygui.UIObjectFactory.setPackageItemExtension(_playerUrl, GamePlayer);
		fairygui.UIObjectFactory.setPackageItemExtension(_enemyUrl, GameEnemy);
	}
}