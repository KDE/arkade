import QtQuick 2.1
import org.kde.kirigami 2.4 as Kirigami
import QtQuick.Controls 2.0 as Controls
import org.kde.arkade.private 1.0

Kirigami.ApplicationWindow {
    id: root

    title: i18n("Arkade")

    /*globalDrawer: Kirigami.GlobalDrawer {
        title: i18n("Arkade")
        titleIcon: "applications-graphics"
    }*/

    pageStack.initialPage: mainPageComponent

    Component {
        id: mainPageComponent

        Kirigami.ScrollablePage {
            title: i18n("Arkade")

            ListView {
                model: Arkade.gamesModel
                delegate: Kirigami.BasicListItem {
                    text: model.display
                    onClicked: {
                        Arkade.gameId = model.pluginId
                        pageStack.push(Arkade.gameItem)
                    }
                }
            }
        }
    }
}
