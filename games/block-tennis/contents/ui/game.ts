/**
 * SPDX-FileCopyrightText: (C) Carson Black <uhhadd@gmail.com>
 * 
 * SPDX-LicenseRef: BSD-3-Clause
 */
/// <reference path="enums.ts" />

let treeRoot: any
var gravity = 1
let das = 200
let arrFactor = 45
let arr = (1000 / arrFactor)

const IPieceData: Patterns = [
	[
		[false, false, false, false],
		[true,  true,  true,  true],
		[false, false, false, false],
		[false, false, false, false],
	],
	[
		[false, false, true, false],
		[false, false, true, false],
		[false, false, true, false],
		[false, false, true, false],
	],
	[
		[false, false, false, false],
		[false, false, false, false],
		[true,  true,   true,  true],
		[false, false, false, false],
	],
	[
		[false, true, false, false],
		[false, true, false, false],
		[false, true, false, false],
		[false, true, false, false],
	]
]

const JPieceData: Patterns = [
	[
		[true,  false, false],
		[true,  true,  true],
		[false, false, false]
	],
	[
		[false, true, true],
		[false, true, false],
		[false, true, false]
	],
	[
		[false, false, false],
		[true,  true,  true],
		[false, false, true]
	],
	[
		[false, true, false],
		[false, true, false],
		[true,  true, false]
	]
]

const LPieceData: Patterns = [
	[
		[false, false, true],
		[true, true, true],
		[false, false, false]
	],
	[
		[false, true, false],
		[false, true, false],
		[false, true, true]
	],
	[
		[false, false, false],
		[true, true, true],
		[true, false, false]
	],
	[
		[true, true, false],
		[false, true, false],
		[false, true, false]
	]
]

const OPieceData: Patterns = [
	[
		[false, false, false, false],
		[false, true, true, false],
		[false, true, true, false],
		[false, false, false, false],
	]
]

const SPieceData: Patterns = [
	[
		[false, true, true],
		[true, true, false],
		[false, false, false]
	],
	[
		[false, true, false],
		[false, true, true],
		[false, false, true]
	],
	[
		[false, false, false],
		[false, true, true],
		[true, true, false]
	],
	[
		[true, false, false],
		[true, true, false],
		[false, true, false]
	]
]

const TPieceData: Patterns = [
	[
		[false, true, false],
		[true, true, true],
		[false, false, false]
	],
	[
		[false, true, false],
		[false, true, true],
		[false, true, false]
	],
	[
		[false, false, false],
		[true, true, true],
		[false, true, false]
	],
	[
		[false, true, false],
		[true, true, false],
		[false, true, false]
	]
]

const ZPieceData: Patterns = [
	[
		[true, true, false],
		[false, true, true],
		[false, false, false]
	],
	[
		[false, false, true],
		[false, true, true],
		[false, true, false]
	],
	[
		[false, false, false],
		[true, true, false],
		[false, true, true]
	],
	[
		[false, true, false],
		[true, true, false],
		[true, false, false]
	]
]

type Pattern = Array<Array<Boolean>>
type Patterns = Array<Pattern>
type PieceKind = [Patterns, Color]

class Color {
	main: string;
	ghost: string;
	constructor(main: string, ghost: string) {
		this.main = main
		this.ghost = ghost
	}

	static Cyan = new Color("#00d485", "#009356")
	static Blue = new Color("#3daee9", "#228199")
	static Orange = new Color("#e9643a", "#a43e1e")
	static Yellow = new Color("#e8cb2d", "#9d8900")
	static Green = new Color("#3dd425", "#469922")
	static Purple = new Color("#b875dc", "#7d499a")
	static Red = new Color("#e93d58", "#99002e")
}

interface GridTile {
	color: string
	filled: boolean
}

interface Timer {
	interval: number
	repeat: boolean
	triggered: any
	restart(): void
	start(): void
	stop(): void
}

enum RotationState {
	I = 0, // Initial
	R = 1, // Right
	D = 2, // Double
	L = 3, // Left
}

declare namespace Qt {
	function createQmlObject(data: string, parent: any, path: string): any
	function binding(func: any): any
}

function NewTimer(): Timer {
	let timer: Timer
	try {
		timer = Qt.createQmlObject("import QtQuick 2.0; Timer{}", treeRoot, "tenpo")
	} catch (error) {
		console.log(`error: ${error}`)
	}
	return timer
}

let Board: Array<Array<GridTile>> = new Array(10)
for (let i = 0; i < 10; i++) {
	Board[i] = new Array(20)
}

const HEIGHT = 22
const WIDTH = 10

class Position {
	x: number = 0
	y: number = 0
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
}

interface KeyEvent {
	accepted: boolean
	count: number
	isAutoRepeat: boolean
	key: number
	modifiers: number
	nativeScanCode: number
	text: string
	matches(key: number): boolean
}

enum Direction {
	Left,
	Right,
	Down
}

function CalculateLines(): void {
	let pass = () => {
		for (let row = HEIGHT - 1; row > -1; row--) {
			let isFilled = true
			for (let col = 0; col < WIDTH; col++) {
				isFilled = isFilled && Board[col][row].filled
				if (!isFilled)
					break
			}
			if (isFilled) {
				for (let rowAbove = row; rowAbove > 0; rowAbove--) {
					for (let col = 0; col < WIDTH; col++) {
						Board[col][rowAbove].color = Board[col][rowAbove-1].color
						Board[col][rowAbove].filled = Board[col][rowAbove-1].filled
					}
				}
				row++
			}
		}
	}
	let hasFilled = (): boolean => {
		for (let row = HEIGHT - 1; row > -1; row--) {
			let isFilled = true
			for (let col = 0; col < WIDTH; col++) {
				isFilled = isFilled && Board[col][row].filled
				if (!isFilled)
					break
			}
			if (isFilled) {
				return true
			}
		}
		return false
	}
	while (hasFilled()) {
		pass()
	}
}

class PieceController {
	static initted = false
	static dasTimer: Timer
	static arrTimer: Timer
	static direction?: Direction
	static arring = false
	static heldPiece: PieceKind = [[[]], Color.Red]
	static firstHeld = true
	static hasHeld = false

	static init() {
		this.dasTimer = NewTimer()
		this.dasTimer.interval = das
		this.dasTimer.repeat = false
		this.dasTimer.triggered.connect(() => {
			if (!this.arring) return
			this.arrTimer.restart()
		})

		this.arrTimer = NewTimer()
		this.arrTimer.interval = arr
		this.arrTimer.repeat = true
		this.arrTimer.triggered.connect(() => {
			if (!this.arring) return

			switch (this.direction) {
			case Direction.Left:
				Piece.current.left()
				break

			case Direction.Right:
				Piece.current.right()
				break

			case Direction.Down:
				Piece.current.down(false)
				break
			}
		})

		this.initted = true
	}

	static pressedDouble = false
	static pressed(e: KeyEvent) {
		if (!this.initted) this.init()

		this.pressedDouble = !this.pressedDouble
		if (!this.pressedDouble) return
		if (e.isAutoRepeat) {
			return
		}

		switch (e.key) {
		case KeyCode.Key_Space:
			Piece.current.hardDrop()
			break

		case KeyCode.Key_Left:
			Piece.current.left()
			this.direction = Direction.Left
			this.arring = true
			this.dasTimer.restart()
			break

		case KeyCode.Key_Right:
			Piece.current.right()
			this.direction = Direction.Right
			this.arring = true
			this.dasTimer.restart()
			break

		case KeyCode.Key_Down:
			Piece.current.down()
			this.direction = Direction.Down
			this.arring = true
			this.dasTimer.restart()
			break

		case KeyCode.Key_Up:
		case KeyCode.Key_X:
			Piece.current.rotateClockwise()
			break
		
		case KeyCode.Key_Z:
			Piece.current.rotateCounterclockwise()
			break
	
		case KeyCode.Key_C:
			if (this.firstHeld) {
				this.heldPiece = [Piece.current.patterns, Piece.current.color]
				Piece.current.clear()
				Piece.current = Piece.NewRandom()
				this.hasHeld = true
				this.firstHeld = false
			} else if (!this.hasHeld) {
				let incoming = this.heldPiece
				this.heldPiece = [Piece.current.patterns, Piece.current.color]
				Piece.current.clear()
				Piece.current = new Piece(incoming[0], incoming[1])
				this.hasHeld = true
			}
		}
	}

	static releasedDouble = false
	static released(e: KeyEvent) {
		this.releasedDouble = !this.releasedDouble
		if (!this.releasedDouble) return
		if (e.isAutoRepeat) {
			return
		}

		switch (e.key) {
		case KeyCode.Key_Left:
		case KeyCode.Key_Right:
		case KeyCode.Key_Down:
			this.arring = false
			this.dasTimer.stop()
			this.arrTimer.stop()
			break
		}
	}
}

class Piece {
	static current: Piece
	private static patternBag: Array<PieceKind> = new Array<PieceKind>()
	
	pattern(): Pattern {
		return this.patterns[this.patternIndex]
	}
	patterns: Patterns
	patternIndex: number = 0
	color: Color
	pos: Position = new Position(3, -2)
	
	constructor(patterns: Patterns, color: Color) {
		this.patterns = patterns
		this.color = color
	}
	static NewRandom(): Piece {
		const pieces: Array<PieceKind> = [
			[IPieceData, Color.Cyan],
			[JPieceData, Color.Blue],
			[LPieceData, Color.Orange],
			[OPieceData, Color.Yellow],
			[SPieceData, Color.Green],
			[TPieceData, Color.Purple],
			[ZPieceData, Color.Red]
		]
		if (this.patternBag.length == 0) {
			this.patternBag = pieces
		}
		let random = Math.floor(Math.random() * this.patternBag.length)
		let piece = this.patternBag[random]
		this.patternBag[random] = this.patternBag[this.patternBag.length - 1]
		this.patternBag.pop()
		return new Piece(piece[0], piece[1])
	}
	protected checkCollision(deltaX: number, deltaY: number, targetPattern: Pattern = this.pattern()): boolean {
		for (let row = 0; row < this.pattern().length; row++) {
			for (let col = 0; col < this.pattern().length; col++) {
				if (!targetPattern[row][col]) continue

				let x = this.pos.x + deltaX + col
				let y = this.pos.y + deltaY + row

				if (y < 0) continue

				if (y >= HEIGHT || x < 0 || x >= WIDTH) return true
				if (Board[x][y].filled) return true
			}
		}
		return false
	}
	protected fill(color: string, filled: boolean = false, withYPos: number = null) {
		for (let row = 0; row < this.pattern().length; row++) {
			for (let col = 0; col < this.pattern().length; col++) {
				if (this.pattern()[row][col]) {
					try {
						console.log(`${withYPos} ${this.pos.y}`)
						Board[this.pos.x + col][(withYPos ?? this.pos.y) + row].color = color
						Board[this.pos.x + col][(withYPos ?? this.pos.y) + row].filled = filled
					} catch (error) {

					}
				}
			}
		}
	}
	anchor() {
		this.fill(this.color.main, true)
		PieceController.hasHeld = false
		Piece.current = Piece.NewRandom()
		CalculateLines()
	}
	draw() {
		this.fill(this.color.main)
		this.fill(this.color.ghost, false, this.findBottom())
	}
	clear() {
		this.fill("#232629")
		this.fill("#232629", false, this.findBottom())
	}
	protected move(x: number, y: number) {
		if (this.checkCollision(x, y)) {
			return
		}
		this.clear()
		this.pos.x += x
		this.pos.y += y
		this.draw()
	}
	private findBottom(): number {
		let i: number = 0
		while (!this.checkCollision(0, i)) {
			i++
		}
		i--
		return this.pos.y + i
	}

	/// The ultimate Tetris website.
	hardDrop() {
		let i: number = 0
		while (!this.checkCollision(0, i)) {
			i++
		}
		i--
		this.move(0, i)
		this.anchor()
	}
	down(anchor: boolean = true) {
		if (this.checkCollision(0, 1)) {
			if (anchor) {
				this.anchor()
			}
			return
		}
		this.move(0, 1)
	}
	left() {
		if (this.checkCollision(-1, 0)) {
			return
		}
		this.move(-1, 0)
	}
	right() {
		if (this.checkCollision(1, 0)) {
			return
		}
		this.move(1, 0)
	}

	private rotate(dir: number) {
		if (this.patterns == OPieceData) {
			return
		}

		let target = this.patternIndex + dir
		if (target < 0) {
			target = this.patterns.length - 1
		} else if (target >= this.patterns.length) {
			target = 0
		}
		let targetPattern = this.patterns[(target) % this.patterns.length]
		this.clear()

		if (this.checkCollision(0, 0, targetPattern)) {
			let from = this.patternIndex as RotationState
			let to = target as RotationState

			let fromTo = (from: RotationState, to: RotationState, one: RotationState, two: RotationState) => {
				return (from == one && to == two) || (from == two && to == one)
			}
			let negate = (arr: Array<[number, number]>) => {
				for (let i = 0; i < 0; i < arr.length) {
					arr[i][0] = -arr[i][0]
					arr[i][1] = -arr[i][1]
				}
			}
			let check = (arr: Array<[number, number]>): boolean => {
				for (const offset of arr) {
					if (!this.checkCollision(offset[0], offset[1], targetPattern)) {
						this.pos.x += offset[0]
						this.pos.y += offset[1]

						this.patternIndex = target
						this.draw()

						return true
					}
				}
				return false
			}

			if (this.patterns == IPieceData) {
				if (fromTo(from, to, RotationState.I, RotationState.R)) {
					let data: Array<[number, number]> = [
						[-2,  0],
						[+1,  0],
						[-2, -1],
						[+1, +2]
					]
					if (from == RotationState.R)
						negate(data)

					if (check(data))
						return

				} else if (fromTo(from, to, RotationState.R, RotationState.D)) {
					let data: Array<[number, number]> = [
						[-1,  0],
						[+2,  0],
						[-1, +2],
						[+2, -1]
					]
					if (from == RotationState.D)
						negate(data)
					
					if (check(data))
						return
				} else if (fromTo(from, to, RotationState.D, RotationState.L)) {
					let data: Array<[number, number]> = [
						[+2,  0],
						[-1,  0],
						[+2, +1],
						[-1, -2],
					]
					if (from == RotationState.L)
						negate(data)

					if (check(data))
						return
				} else if (fromTo(from, to, RotationState.L, RotationState.I)) {
					let data: Array<[number, number]> = [
						[+1,  0],
						[-2,  0],
						[+1, -2],
						[-2, +1],
					]
					if (from == RotationState.I)
						negate(data)

					if (check(data))
						return
				}
			} else {
				if (fromTo(from, to, RotationState.I, RotationState.R)) {
					let data: Array<[number, number]> = [
						[-1, 0],
						[-1, +1],
						[0, -2],
						[-1, -2],
					]
					if (from == RotationState.R)
						negate(data)

					if (check(data))
						return

				} else if (fromTo(from, to, RotationState.R, RotationState.D)) {
					let data: Array<[number, number]> = [
						[+1, 0],
						[+1, -1],
						[0, +2],
						[+1, +2],
					]
					if (from == RotationState.D)
						negate(data)
					
					if (check(data))
						return
				} else if (fromTo(from, to, RotationState.D, RotationState.L)) {
					let data: Array<[number, number]> = [
						[+1, 0],
						[+1, +1],
						[0, -2],
						[+1, -2],
					]
					if (from == RotationState.L)
						negate(data)

					if (check(data))
						return
				} else if (fromTo(from, to, RotationState.L, RotationState.I)) {
					let data: Array<[number, number]> = [
						[-1, 0],
						[-1, -1],
						[0, +2],
						[-1, +2],
					]
					if (from == RotationState.I)
						negate(data)

					if (check(data))
						return
				}
			}

			return
		}

		this.patternIndex = target
		this.draw()
	}

	rotateClockwise() {
		this.rotate(1)
	}
	rotateCounterclockwise() {
		this.rotate(-1)
	}
}

function ClearBoard() {
	for (const row of Board) {
		for (const cell of row) {
			cell.color = "#232629"
		}
	}
}

function RegisterPiece(row: number, col: number, cell: GridTile) {
	Board[col][row] = cell
}

function Initialise(root: any) {
	treeRoot = root
	ClearBoard()
	Piece.current = Piece.NewRandom()
	Piece.current.draw()
	let timer = NewTimer()
	timer.interval = Qt.binding(function() { return (gravity / 1) * 1000 })
	timer.repeat = true
	timer.triggered.connect(() => {
		Piece.current.down()
	})
	timer.start()
}