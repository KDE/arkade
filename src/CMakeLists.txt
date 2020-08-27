# SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
#
# SPDX-License-Identifier: BSD-2-Clause

add_subdirectory(packagestructure)

# apps
qt5_add_resources(gamecenter_SRCS resources.qrc)
add_executable(gamecenter main.cpp gamesmodel.cpp gamecenter.cpp ${gamecenter_SRCS})
target_link_libraries(gamecenter Qt5::Core Qt5::Gui Qt5::Qml Qt5::Quick Qt5::QuickControls2 Qt5::Svg KF5::I18n KF5::Package)
install(TARGETS gamecenter ${KF5_INSTALL_TARGETS_DEFAULT_ARGS})