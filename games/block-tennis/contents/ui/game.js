var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["Key_Left"] = 16777234] = "Key_Left";
    KeyCode[KeyCode["Key_Up"] = 16777235] = "Key_Up";
    KeyCode[KeyCode["Key_Right"] = 16777236] = "Key_Right";
    KeyCode[KeyCode["Key_Down"] = 16777237] = "Key_Down";
    KeyCode[KeyCode["Key_Space"] = 32] = "Key_Space";
    KeyCode[KeyCode["Key_A"] = 65] = "Key_A";
    KeyCode[KeyCode["Key_B"] = 66] = "Key_B";
    KeyCode[KeyCode["Key_C"] = 67] = "Key_C";
    KeyCode[KeyCode["Key_D"] = 68] = "Key_D";
    KeyCode[KeyCode["Key_E"] = 69] = "Key_E";
    KeyCode[KeyCode["Key_F"] = 70] = "Key_F";
    KeyCode[KeyCode["Key_G"] = 71] = "Key_G";
    KeyCode[KeyCode["Key_H"] = 72] = "Key_H";
    KeyCode[KeyCode["Key_I"] = 73] = "Key_I";
    KeyCode[KeyCode["Key_J"] = 74] = "Key_J";
    KeyCode[KeyCode["Key_K"] = 75] = "Key_K";
    KeyCode[KeyCode["Key_L"] = 76] = "Key_L";
    KeyCode[KeyCode["Key_M"] = 77] = "Key_M";
    KeyCode[KeyCode["Key_N"] = 78] = "Key_N";
    KeyCode[KeyCode["Key_O"] = 79] = "Key_O";
    KeyCode[KeyCode["Key_P"] = 80] = "Key_P";
    KeyCode[KeyCode["Key_Q"] = 81] = "Key_Q";
    KeyCode[KeyCode["Key_R"] = 82] = "Key_R";
    KeyCode[KeyCode["Key_S"] = 83] = "Key_S";
    KeyCode[KeyCode["Key_T"] = 84] = "Key_T";
    KeyCode[KeyCode["Key_U"] = 85] = "Key_U";
    KeyCode[KeyCode["Key_V"] = 86] = "Key_V";
    KeyCode[KeyCode["Key_W"] = 87] = "Key_W";
    KeyCode[KeyCode["Key_X"] = 88] = "Key_X";
    KeyCode[KeyCode["Key_Y"] = 89] = "Key_Y";
    KeyCode[KeyCode["Key_Z"] = 90] = "Key_Z";
})(KeyCode || (KeyCode = {}));
/**
 * SPDX-FileCopyrightText: (C) Carson Black <uhhadd@gmail.com>
 *
 * SPDX-LicenseRef: BSD-3-Clause
 */
/// <reference path="enums.ts" />
let treeRoot;
var gravity = 1;
let das = 200;
let arrFactor = 45;
let arr = (1000 / arrFactor);
let gravityTimer;
const IPieceData = [
    [
        [false, false, false, false],
        [true, true, true, true],
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
        [true, true, true, true],
        [false, false, false, false],
    ],
    [
        [false, true, false, false],
        [false, true, false, false],
        [false, true, false, false],
        [false, true, false, false],
    ]
];
const JPieceData = [
    [
        [true, false, false],
        [true, true, true],
        [false, false, false]
    ],
    [
        [false, true, true],
        [false, true, false],
        [false, true, false]
    ],
    [
        [false, false, false],
        [true, true, true],
        [false, false, true]
    ],
    [
        [false, true, false],
        [false, true, false],
        [true, true, false]
    ]
];
const LPieceData = [
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
];
const OPieceData = [
    [
        [false, false, false, false],
        [false, true, true, false],
        [false, true, true, false],
        [false, false, false, false],
    ]
];
const SPieceData = [
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
];
const TPieceData = [
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
];
const ZPieceData = [
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
];
class Color {
    constructor(main, ghost) {
        this.main = main;
        this.ghost = ghost;
    }
}
Color.Cyan = new Color("#00d485", "#009356");
Color.Blue = new Color("#3daee9", "#228199");
Color.Orange = new Color("#e9643a", "#a43e1e");
Color.Yellow = new Color("#e8cb2d", "#9d8900");
Color.Green = new Color("#3dd425", "#469922");
Color.Purple = new Color("#b875dc", "#7d499a");
Color.Red = new Color("#e93d58", "#99002e");
var RotationState;
(function (RotationState) {
    RotationState[RotationState["I"] = 0] = "I";
    RotationState[RotationState["R"] = 1] = "R";
    RotationState[RotationState["D"] = 2] = "D";
    RotationState[RotationState["L"] = 3] = "L";
})(RotationState || (RotationState = {}));
function NewTimer() {
    let timer;
    try {
        timer = Qt.createQmlObject("import QtQuick 2.0; Timer{}", treeRoot, "tenpo");
    }
    catch (error) {
        console.log(`error: ${error}`);
    }
    return timer;
}
let Board = new Array(10);
for (let i = 0; i < 10; i++) {
    Board[i] = new Array(20);
}
const HEIGHT = 22;
const WIDTH = 10;
class Position {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
}
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Down"] = 2] = "Down";
})(Direction || (Direction = {}));
function CalculateLines() {
    let pass = () => {
        for (let row = HEIGHT - 1; row > -1; row--) {
            let isFilled = true;
            for (let col = 0; col < WIDTH; col++) {
                isFilled = isFilled && Board[col][row].filled;
                if (!isFilled)
                    break;
            }
            if (isFilled) {
                for (let rowAbove = row; rowAbove > 0; rowAbove--) {
                    for (let col = 0; col < WIDTH; col++) {
                        Board[col][rowAbove].color = Board[col][rowAbove - 1].color;
                        Board[col][rowAbove].filled = Board[col][rowAbove - 1].filled;
                    }
                }
                row++;
            }
        }
    };
    let hasFilled = () => {
        for (let row = HEIGHT - 1; row > -1; row--) {
            let isFilled = true;
            for (let col = 0; col < WIDTH; col++) {
                isFilled = isFilled && Board[col][row].filled;
                if (!isFilled)
                    break;
            }
            if (isFilled) {
                return true;
            }
        }
        return false;
    };
    while (hasFilled()) {
        pass();
    }
}
class PieceController {
    static init() {
        this.dasTimer = NewTimer();
        this.dasTimer.interval = das;
        this.dasTimer.repeat = false;
        this.dasTimer.triggered.connect(() => {
            if (!this.arring)
                return;
            this.arrTimer.restart();
        });
        this.arrTimer = NewTimer();
        this.arrTimer.interval = arr;
        this.arrTimer.repeat = true;
        this.arrTimer.triggered.connect(() => {
            if (!this.arring)
                return;
            switch (this.direction) {
                case Direction.Left:
                    Piece.current.left();
                    break;
                case Direction.Right:
                    Piece.current.right();
                    break;
                case Direction.Down:
                    Piece.current.down(false);
                    break;
            }
        });
        this.initted = true;
    }
    static pressed(e) {
        if (!this.initted)
            this.init();
        this.pressedDouble = !this.pressedDouble;
        if (!this.pressedDouble)
            return;
        if (e.isAutoRepeat) {
            return;
        }
        switch (e.key) {
            case KeyCode.Key_Space:
                Piece.current.hardDrop();
                break;
            case KeyCode.Key_Left:
                Piece.current.left();
                this.direction = Direction.Left;
                this.arring = true;
                this.dasTimer.restart();
                break;
            case KeyCode.Key_Right:
                Piece.current.right();
                this.direction = Direction.Right;
                this.arring = true;
                this.dasTimer.restart();
                break;
            case KeyCode.Key_Down:
                Piece.current.down();
                this.direction = Direction.Down;
                this.arring = true;
                this.dasTimer.restart();
                break;
            case KeyCode.Key_Up:
            case KeyCode.Key_X:
                Piece.current.rotateClockwise();
                break;
            case KeyCode.Key_Z:
                Piece.current.rotateCounterclockwise();
                break;
            case KeyCode.Key_C:
                if (this.firstHeld) {
                    this.heldPiece = [Piece.current.patterns, Piece.current.color];
                    Piece.current.clear();
                    Piece.current = Piece.NewRandom();
                    Piece.current.draw();
                    this.hasHeld = true;
                    this.firstHeld = false;
                }
                else if (!this.hasHeld) {
                    let incoming = this.heldPiece;
                    this.heldPiece = [Piece.current.patterns, Piece.current.color];
                    Piece.current.clear();
                    Piece.current = new Piece(incoming[0], incoming[1]);
                    Piece.current.draw();
                    this.hasHeld = true;
                }
        }
    }
    static released(e) {
        this.releasedDouble = !this.releasedDouble;
        if (!this.releasedDouble)
            return;
        if (e.isAutoRepeat) {
            return;
        }
        switch (e.key) {
            case KeyCode.Key_Left:
            case KeyCode.Key_Right:
            case KeyCode.Key_Down:
                this.arring = false;
                this.dasTimer.stop();
                this.arrTimer.stop();
                break;
        }
    }
}
PieceController.initted = false;
PieceController.arring = false;
PieceController.heldPiece = [[[]], Color.Red];
PieceController.firstHeld = true;
PieceController.hasHeld = false;
PieceController.pressedDouble = false;
PieceController.releasedDouble = false;
class Piece {
    constructor(patterns, color) {
        this.patternIndex = 0;
        this.pos = new Position(3, -2);
        this.patterns = patterns;
        this.color = color;
    }
    pattern() {
        return this.patterns[this.patternIndex];
    }
    static NewRandom() {
        const pieces = [
            [IPieceData, Color.Cyan],
            [JPieceData, Color.Blue],
            [LPieceData, Color.Orange],
            [OPieceData, Color.Yellow],
            [SPieceData, Color.Green],
            [TPieceData, Color.Purple],
            [ZPieceData, Color.Red]
        ];
        if (this.patternBag.length == 0) {
            this.patternBag = pieces;
        }
        let random = Math.floor(Math.random() * this.patternBag.length);
        let piece = this.patternBag[random];
        this.patternBag[random] = this.patternBag[this.patternBag.length - 1];
        this.patternBag.pop();
        return new Piece(piece[0], piece[1]);
    }
    checkCollision(deltaX, deltaY, targetPattern = this.pattern()) {
        for (let row = 0; row < this.pattern().length; row++) {
            for (let col = 0; col < this.pattern().length; col++) {
                if (!targetPattern[row][col])
                    continue;
                let x = this.pos.x + deltaX + col;
                let y = this.pos.y + deltaY + row;
                if (y >= HEIGHT || x < 0 || x >= WIDTH)
                    return true;
                if (y < 0)
                    continue;
                if (Board[x][y].filled)
                    return true;
            }
        }
        return false;
    }
    fill(color, filled = false, withYPos = null) {
        for (let row = 0; row < this.pattern().length; row++) {
            for (let col = 0; col < this.pattern().length; col++) {
                if (this.pattern()[row][col]) {
                    try {
                        Board[this.pos.x + col][(withYPos !== null && withYPos !== void 0 ? withYPos : this.pos.y) + row].color = color;
                        Board[this.pos.x + col][(withYPos !== null && withYPos !== void 0 ? withYPos : this.pos.y) + row].filled = filled;
                    }
                    catch (error) {
                    }
                }
            }
        }
    }
    anchor() {
        this.fill(this.color.main, true);
        PieceController.hasHeld = false;
        Piece.current = Piece.NewRandom();
        Piece.current.draw();
        CalculateLines();
    }
    draw() {
        this.fill(this.color.ghost, false, this.findBottom());
        this.fill(this.color.main);
    }
    clear() {
        this.fill("#232629");
        this.fill("#232629", false, this.findBottom());
    }
    move(x, y) {
        if (this.checkCollision(x, y)) {
            return;
        }
        this.clear();
        this.pos.x += x;
        this.pos.y += y;
        this.draw();
    }
    findBottom() {
        let i = 0;
        while (!this.checkCollision(0, i)) {
            i++;
        }
        i--;
        return this.pos.y + i;
    }
    /// The ultimate Tetris website.
    hardDrop() {
        let i = 0;
        while (!this.checkCollision(0, i)) {
            i++;
        }
        i--;
        treeRoot.bonkDown();
        this.move(0, i);
        this.anchor();
    }
    down(anchor = true) {
        if (this.checkCollision(0, 1)) {
            if (anchor) {
                this.anchor();
            }
            return;
        }
        this.move(0, 1);
    }
    left() {
        if (this.checkCollision(-1, 0)) {
            treeRoot.bonkLeft();
            return false;
        }
        this.move(-1, 0);
        return true;
    }
    right() {
        if (this.checkCollision(1, 0)) {
            treeRoot.bonkRight();
            return false;
        }
        this.move(1, 0);
        return true;
    }
    rotate(dir) {
        if (this.patterns == OPieceData) {
            return;
        }
        let target = this.patternIndex + dir;
        if (target < 0) {
            target = this.patterns.length - 1;
        }
        else if (target >= this.patterns.length) {
            target = 0;
        }
        let targetPattern = this.patterns[(target) % this.patterns.length];
        this.clear();
        if (this.checkCollision(0, 0, targetPattern)) {
            let from = this.patternIndex;
            let to = target;
            let fromTo = (from, to, one, two) => {
                return (from == one && to == two) || (from == two && to == one);
            };
            let negate = (arr) => {
                for (let i = 0; i < 0; i < arr.length) {
                    arr[i][0] = -arr[i][0];
                    arr[i][1] = -arr[i][1];
                }
            };
            let check = (arr) => {
                for (const offset of arr) {
                    if (!this.checkCollision(offset[0], offset[1], targetPattern)) {
                        this.pos.x += offset[0];
                        this.pos.y += offset[1];
                        this.patternIndex = target;
                        this.draw();
                        return true;
                    }
                }
                return false;
            };
            if (this.patterns == IPieceData) {
                if (fromTo(from, to, RotationState.I, RotationState.R)) {
                    let data = [
                        [-2, 0],
                        [+1, 0],
                        [-2, -1],
                        [+1, +2]
                    ];
                    if (from == RotationState.R)
                        negate(data);
                    if (check(data))
                        return;
                }
                else if (fromTo(from, to, RotationState.R, RotationState.D)) {
                    let data = [
                        [-1, 0],
                        [+2, 0],
                        [-1, +2],
                        [+2, -1]
                    ];
                    if (from == RotationState.D)
                        negate(data);
                    if (check(data))
                        return;
                }
                else if (fromTo(from, to, RotationState.D, RotationState.L)) {
                    let data = [
                        [+2, 0],
                        [-1, 0],
                        [+2, +1],
                        [-1, -2],
                    ];
                    if (from == RotationState.L)
                        negate(data);
                    if (check(data))
                        return;
                }
                else if (fromTo(from, to, RotationState.L, RotationState.I)) {
                    let data = [
                        [+1, 0],
                        [-2, 0],
                        [+1, -2],
                        [-2, +1],
                    ];
                    if (from == RotationState.I)
                        negate(data);
                    if (check(data))
                        return;
                }
            }
            else {
                if (fromTo(from, to, RotationState.I, RotationState.R)) {
                    let data = [
                        [-1, 0],
                        [-1, +1],
                        [0, -2],
                        [-1, -2],
                    ];
                    if (from == RotationState.R)
                        negate(data);
                    if (check(data))
                        return;
                }
                else if (fromTo(from, to, RotationState.R, RotationState.D)) {
                    let data = [
                        [+1, 0],
                        [+1, -1],
                        [0, +2],
                        [+1, +2],
                    ];
                    if (from == RotationState.D)
                        negate(data);
                    if (check(data))
                        return;
                }
                else if (fromTo(from, to, RotationState.D, RotationState.L)) {
                    let data = [
                        [+1, 0],
                        [+1, +1],
                        [0, -2],
                        [+1, -2],
                    ];
                    if (from == RotationState.L)
                        negate(data);
                    if (check(data))
                        return;
                }
                else if (fromTo(from, to, RotationState.L, RotationState.I)) {
                    let data = [
                        [-1, 0],
                        [-1, -1],
                        [0, +2],
                        [-1, +2],
                    ];
                    if (from == RotationState.I)
                        negate(data);
                    if (check(data))
                        return;
                }
            }
            return;
        }
        this.patternIndex = target;
        this.draw();
    }
    rotateClockwise() {
        this.rotate(1);
    }
    rotateCounterclockwise() {
        this.rotate(-1);
    }
}
Piece.patternBag = new Array();
function ClearBoard() {
    for (const row of Board) {
        for (const cell of row) {
            cell.color = "#232629";
        }
    }
}
function RegisterPiece(row, col, cell) {
    Board[col][row] = cell;
}
function Initialise(root) {
    treeRoot = root;
    ClearBoard();
    Piece.current = Piece.NewRandom();
    Piece.current.draw();
    gravityTimer = NewTimer();
    gravityTimer.interval = Qt.binding(function () { return (gravity / 1) * 1000; });
    gravityTimer.repeat = true;
    gravityTimer.triggered.connect(() => {
        Piece.current.down();
    });
    gravityTimer.start();
}
