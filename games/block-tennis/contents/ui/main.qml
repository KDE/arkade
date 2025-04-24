/**
 * SPDX-FileCopyrightText: (C) Carson Black <uhhadd@gmail.com>
 * 
 * SPDX-License-Identifier: BSD-3-Clause
 */

import QtQuick
import org.kde.kirigami as Kirigami
import QtQuick.Controls as QQC2
import QtQuick.Layouts

import "game.js" as Game

Kirigami.Page {
    id: root

    title: i18n("Block Tennis")

    leftPadding: 0
    rightPadding: 0
    topPadding: 0
    bottomPadding: 0

    property var grid: {}
    property int i: 0

    function bonkLeft() {
        bonkLeftAnimation.restart()
    }
    function bonkRight() {
        bonkRightAnimation.restart()
    }
    function bonkDown() {
        bonkDownAnimation.restart()
    }

    NumberAnimation {
        id: bonkLeftAnimation
        target: gridTranslate
        property: "x"
        from: -8
        to: 0
        duration: 100
    }
    NumberAnimation {
        id: bonkRightAnimation
        target: gridTranslate
        property: "x"
        from: 8
        to: 0
        duration: 100
    }
    NumberAnimation {
        id: bonkDownAnimation
        target: gridTranslate
        property: "y"
        from: 12
        to: 0
        duration: 100
    }

    function evalGrid() {
        if (i == (22*10)) {
            Game.Initialise(root)
        }
    }

    readonly property int cellHeight: Math.min(32, Math.ceil((root.height - Kirigami.Units.gridUnit * 2) / griddy.rows))

    contentItem: Item {
        Rectangle {
            anchors {
                right: griddy.left
                top: griddy.top
            }

            width: root.cellHeight * 2
            height: root.cellHeight * 2
            color: "#232629"

            Grid {
                id: displayer
                rows: Game.PieceController.heldPiece[0][0].length
                columns: rows
                anchors.centerIn: parent

                Timer {
                    interval: 10
                    running: true
                    repeat: true
                    onTriggered: {
                        displayer.rows = Game.PieceController.heldPiece[0][0].length
                        repeaty.model = Game.PieceController.heldPiece[0][0]
                    }
                }

                Repeater {
                    id: repeaty
                    model: Game.PieceController.heldPiece[0][0]
                    Repeater {
                        model: modelData
                        Rectangle {
                            width: (root.cellHeight / 2)
                            height: (root.cellHeight / 2)
                            border {
                                color: Qt.rgba(0, 0, 0, 0.2)
                                width: 1
                            }
                            opacity: modelData ? 1 : 0
                            color: Game.PieceController.heldPiece[1]
                        }
                    }
                }
            }
        }

        Grid {
            id: griddy

            anchors.centerIn: parent

            rows: 22
            columns: 10

            transform: Translate {
                id: gridTranslate
            }

            Repeater {
                model: griddy.rows

                Repeater {
                    model: griddy.columns
                    property int nestedData: modelData

                    Rectangle {
                        width: height
                        height: root.cellHeight
                        color: "green"
                        property bool filled: false
                        border {
                            color: Qt.rgba(0, 0, 0, 0.2)
                            width: 1
                        }

                        Rectangle {
                            anchors {
                                fill: parent
                                margins: 12
                            }
                            color: Qt.rgba(0, 0, 0, 0.2)
                            visible: parent.filled
                        }

                        // root.grid[`row-column`] = this
                        Component.onCompleted: {
                            Game.RegisterPiece(nestedData, modelData, this)
                            root.i++
                            root.evalGrid()
                        }
                    }
                }
            }
        }
    }

    Keys.onPressed: (e) => Game.PieceController.pressed(e)
    Keys.onReleased: (e) => Game.PieceController.released(e)
}
