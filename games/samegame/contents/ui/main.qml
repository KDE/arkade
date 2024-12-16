/**
 * SPDX-FileCopyrightText: (C) 2013 Digia Plc and/or its subsidiary(-ies)
 * 
 * SPDX-License-Identifier: BSD-3-Clause
 */

import QtQuick
import org.kde.kirigami as Kirigami
import org.kde.kirigamiaddons.formcard as FormCard
import QtQuick.Controls as QQC2
import QtQuick.Layouts
import "samegame.js" as SameGame

Kirigami.Page {
    id: root
    title: i18n("Samegame")

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

    FormCard.FormCardDialog {
        id: nameInputDialog

        title: i18n("You won!"); 

        FormCard.AbstractFormDelegate {
            contentItem: Kirigami.Heading {
                level: 2
                text: i18n("You won with %1 points", gameCanvas.score)
            }
            background: null
        }

        FormCard.FormTextFieldDelegate {
            id: nameInput
            label: i18n("Please enter your name:")
        }

        standardButtons: QQC2.Dialog.Ok
        onAccepted: {
            if (nameInput.length > 0) {
                SameGame.saveHighScore(nameInput.text);
            }
            Qt.inputMethod.hide();
            close();
        }
    }

    actions: [
        Kirigami.Action {
            text: i18n("New Game")
            onTriggered: SameGame.startNewGame()
        },
        Kirigami.Action {
            text: i18n("Score: %1", gameCanvas.score)
        }
    ]
}
