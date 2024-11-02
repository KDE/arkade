// SPDX-FileCopyrightText: 2024 Carl Schwan <carl@carlschwan.eu>
// SPDX-License-Identifier: LGPL-2.1-or-later

import QtQuick
import org.kde.kirigami as Kirigami
import org.kde.kirigamiaddons.delegates as Delegates
import QtQuick.Controls as Controls
import org.kde.arkade.private

Kirigami.ApplicationWindow {
    id: root

    title: i18n("Arkade")

    pageStack.initialPage: Kirigami.ScrollablePage {
        title: i18n("Arkade")

        ListView {
            model: Arkade.gamesModel
            delegate: Delegates.RoundedItemDelegate {
                required property int index
                required property string pluginId
                required property string name
                required property string iconName

                icon.name: iconName
                text: name
                onClicked: {
                    Arkade.gameId = pluginId
                    pageStack.push(Arkade.gameItem)
                }
            }
        }
    }
}
