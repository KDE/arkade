# SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
#
# SPDX-License-Identifier: BSD-2-Clause

add_subdirectory(packagestructure)

add_executable(arkade main.cpp gamesmodel.cpp gamesmodel.h arkade.cpp arkade.h)

ecm_add_qml_module(arkade URI org.kde.arkade
    QML_FILES
        contents/ui/Main.qml
)

target_link_libraries(arkade PRIVATE Qt::Widgets Qt::Core Qt::Gui Qt::Qml Qt::Quick Qt::QuickControls2 Qt::Svg KF6::I18n KF6::Package)
install(TARGETS arkade ${KDE_INSTALL_TARGETS_DEFAULT_ARGS})
