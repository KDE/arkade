/**
 * SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 * 
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import QtQuick 2.12
import QtQuick.Window 2.14
import org.kde.kirigami 2.12 as Kirigami
import QtQuick.Controls 2.14 as QQC2
import QtQuick.Layouts 1.14
import Qt.labs.qmlmodels 1.0

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
    
    footer: QQC2.ToolBar {
        id: toolBar
        RowLayout {
            anchors.fill: parent
            QQC2.ToolButton {
                text: i18n("New Game")
                onClicked: game.startNewGame()
            }
        }
    }
    
    Kirigami.OverlaySheet {
        id: victoryDialog;
        parent: Windows.window.overlay
        property int player: 0;
        header: Kirigami.Heading {
            text: i18n("Player %1 won", victoryDialog.player); 
        }
        Text {
            text: i18n("Congrats on your victory")
        }
    }
}
