# SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
#
# SPDX-License-Identifier: BSD-2-Clause

add_subdirectory(packagestructure)

add_executable(arkade main.cpp gamesmodel.cpp gamesmodel.h arkade.cpp arkade.h resources.qrc)
target_link_libraries(arkade Qt::Widgets Qt::Core Qt::Gui Qt::Qml Qt::Quick Qt::QuickControls2 Qt::Svg KF${KF_MAJOR_VERSION}::I18n KF${KF_MAJOR_VERSION}::Package)
install(TARGETS arkade ${KDE_INSTALL_TARGETS_DEFAULT_ARGS})
