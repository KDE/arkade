/**
 * SPDX-FileCopyrightText: (C) Carson Black <uhhadd@gmail.com>
 * 
 * SPDX-LicenseRef: BSD-3-Clause
 */

import QtQuick 2.0
import org.kde.kirigami 2.12 as Kirigami
import QtQuick.Controls 2.14 as QQC2
import QtQuick.Layouts 1.14

import "game.js" as Game

Kirigami.Page {
    id: root
    title: i18n("Block Tennis")
    globalToolBarStyle: Kirigami.ApplicationHeaderStyle.None
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

    ColumnLayout {
        anchors {
            right: griddy.left
            top: griddy.top
        }

        Rectangle {
            width: 16 * 4
            height: 16 * 4
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
                            width: 16
                            height: 16
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
    }

    Grid {
        id: griddy
        rows: 22
        columns: 10
        anchors.centerIn: parent

        transform: Translate {
            id: gridTranslate
        }

        Repeater {
            model: 22

            Repeater {
                model: 10
                property var nestedData: modelData

                Rectangle {
                    width: 32
                    height: 32
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

    Keys.onPressed: (e) => Game.PieceController.pressed(e)
    Keys.onReleased: (e) => Game.PieceController.released(e)
}
