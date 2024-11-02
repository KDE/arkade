# SPDX-FileCopyrightText: 2020 Carl Schwan <carl@carlschwan.eu>
# SPDX-License-Identifier: GPL-3.0-or-later

kpackage_install_package(samegame org.kde.arkade.samegame packages game)
install(FILES samegame/org.kde.arkade.samegame.svg DESTINATION ${KDE_INSTALL_FULL_ICONDIR}/hicolor/scalable/apps)

kpackage_install_package(fourinline org.kde.arkade.fourinline packages game)
install(FILES fourinline/org.kde.arkade.fourinline.svg DESTINATION ${KDE_INSTALL_FULL_ICONDIR}/hicolor/scalable/apps)

kpackage_install_package(block-tennis org.kde.arkade.blocktennis packages game)
install(FILES block-tennis/org.kde.arkade.blocktennis.svg DESTINATION ${KDE_INSTALL_FULL_ICONDIR}/hicolor/scalable/apps)
