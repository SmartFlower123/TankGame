class Type {
	public constructor() {
	}
}
//身份
enum Identity {
	BARRIAR,
	HEARTDIE,
	WALL,
	PLAYER,
	ENEMY,
	AIRBARRIR,
	PlAYERBULLET,
	ENEMYBULLET,
	HEARTLIVE
}
//移动的方向
enum MoveDirection {
	UP,
	DOWN,
	LEFT,
	RIGHT
}
//渲染循序
enum SpritOrder {
	AIRBARRIR,
	HEART,
	BULLET,
	TANK,
	ENEMY,
	BORNANIMATION,
	DIEANIMATIO,
	WALL,

}
//出生顺序
enum BornNum {
	FIRST,
	ELSE
}