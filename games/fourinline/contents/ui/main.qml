/**
 * SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 * 
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import QtQuick
import QtQuick.Window
import org.kde.kirigami as Kirigami
import QtQuick.Controls as QQC2
import QtQuick.Layouts
import Qt.labs.qmlmodels

Kirigami.Page {
    id: root

    property var player: game.currentPlayer + 1
    title: i18n("Player %1 turn", player)

    property var window

    Game {
        id: game
        canvas: canvas
        canvasHeight: canvas.height
        canvasWidth: canvas.width
        
        onPlayerWon: {
            victoryDialog.player = player;
            victoryDialog.open()
        }
    }
    
    contentItem: ColumnLayout {
        Kirigami.Heading {
        }
        
        Item {
            Layout.fillWidth: true
            Layout.minimumHeight: 100
            Repeater {
                model: 7
                QQC2.Button {
                    width: game.blockSize
                    x: game.blockSize * index
                    onClicked: game.addBlock(index)
                }
            }
        }
        
        Item {
            id: canvas
            Layout.fillWidth: true;
            Layout.fillHeight: true;
        }
    }

    actions: [
        Kirigami.Action {
            text: i18n("New Game")
            onTriggered: game.startNewGame()
        }
    ]
    
    Kirigami.OverlaySheet {
        id: victoryDialog;
        parent: Window.window.overlay
        property int player: 0;
        header: Kirigami.Heading {
            text: i18n("Player %1 won", victoryDialog.player); 
        }
        Text {
            text: i18n("Congrats on your victory")
        }
    }
}
