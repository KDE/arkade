/**
 * SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 * 
 * SPDX-LicenseRef: GPL-3.0-or-later
 */

import QtQuick 2.0

Item {
    id: block

    property int player: 0
    property bool spawned: false
    
    property int column: 0
    property int row: 0
    property int blockSize: 0
    
    x: column * blockSize
    y: (5 - row) * blockSize
    width: blockSize
    height: blockSize
    
    Behavior on x {
        enabled: spawned;
        SpringAnimation{ spring: 2; damping: 0.2 }
    }
    Behavior on y {
        SpringAnimation{ spring: 2; damping: 0.2 }
    }
    Image {
        id: img

        anchors.fill: parent
        source: {
            if (block.player === 0)
                return "./shared/pics/redStone.svg";
            else if (block.player === 1)
                return "./shared/pics/blueStone.svg";
            else
                return "./shared/pics/greenStone.svg";
        }

        Behavior on opacity {
            NumberAnimation { properties:"opacity"; duration: 200 }
        }
    }
}
