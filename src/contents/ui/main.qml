import QtQuick 2.1
import org.kde.kirigami 2.4 as Kirigami
import QtQuick.Controls 2.0 as Controls
import org.kde.gamecenter.private 1.0

Kirigami.ApplicationWindow {
    id: root

    title: i18n("GameCenter")

    /*globalDrawer: Kirigami.GlobalDrawer {
        title: i18n("GameCenter")
        titleIcon: "applications-graphics"
    }*/

    pageStack.initialPage: mainPageComponent

    Component {
        id: mainPageComponent

        Kirigami.ScrollablePage {
            title: i18n("GameCenter")

            ListView {
                model: GameCenter.gamesModel
                delegate: Kirigami.BasicListItem {
                    text: model.display
                    onClicked: {
                        GameCenter.gameId = model.pluginId
                        pageStack.push(GameCenter.gameItem)
                    }
                }
            }
        }
    }
}
