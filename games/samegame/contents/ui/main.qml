/**
 * SPDX-FileCopyrightText: (C) 2013 Digia Plc and/or its subsidiary(-ies)
 * 
 * SPDX-LicenseRef: BSD-3-Clause
 */

import QtQuick 2.0
import org.kde.kirigami 2.12 as Kirigami
import QtQuick.Controls 2.14 as QQC2
import QtQuick.Layouts 1.14
import "samegame.js" as SameGame

Kirigami.Page {
    id: root
    title: i18n("Samegame")
    globalToolBarStyle: Kirigami.ApplicationHeaderStyle.None

    background: Image {
        id: background
        anchors.fill: parent
        source: "./shared/pics/background.jpg"
        fillMode: Image.PreserveAspectCrop
    }

    Item {
        id: gameCanvas
        property int score: 0
        property int blockSize: width / 8

        Component.onCompleted: console.log(width)

        anchors.centerIn: parent
        anchors.fill: parent

        MouseArea {
            anchors.fill: parent; onClicked: SameGame.handleClick(mouse.x,mouse.y);
        }
    }

    Kirigami.OverlaySheet {
        id: nameInputDialog
        parent: root
        property int player: 0;
        header: Kirigami.Heading {
            text: i18n("You won!"); 
        }
        
        ColumnLayout {
            Kirigami.Heading {
                level: 2
                text: i18n("You won with %1 points", gameCanvas.score)
            }
            Kirigami.FormLayout {
                QQC2.TextField {
                    id: nameInput
                    Kirigami.FormData.label: i18n("Please enter your name")
                }
            }
        }
        onSheetOpenChanged: {
            if (sheetOpen) {
                open();
            } else {
                if (nameInput.length > 0) {
                    SameGame.saveHighScore(nameInput.text);
                }
                closeAnimation.running = true;
                Qt.inputMethod.hide();
            }
        }
        footer: RowLayout {
            QQC2.Button {
                Layout.alignment: Qt.AlignRight
                text: i18n("Cancel")
            }
            QQC2.Button {
                Layout.alignment: Qt.AlignRight
                text: i18n("Ok")
            }
        }

    }

    footer: QQC2.ToolBar {
        id: toolBar
        RowLayout {
            anchors.fill: parent
            QQC2.ToolButton {
                text: i18n("New Game")
                onClicked: SameGame.startNewGame()
            }

            QQC2.ToolButton {
                text: i18n("Quit")
                onClicked: Qt.quit()
            }

            QQC2.Label {
                text: i18n("Score: %1", gameCanvas.score)
            }
        }
    }
}
