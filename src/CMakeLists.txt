# SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
#
# SPDX-License-Identifier: BSD-2-Clause

add_subdirectory(packagestructure)

add_executable(arkade main.cpp gamesmodel.cpp arkade.cpp resources.qrc)
target_link_libraries(arkade Qt::Widgets Qt::Core Qt::Gui Qt::Qml Qt::Quick Qt::QuickControls2 Qt::Svg KF5::I18n KF5::Package)
install(TARGETS arkade ${KF5_INSTALL_TARGETS_DEFAULT_ARGS})
