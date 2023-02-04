# SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
#
# SPDX-License-Identifier: BSD-2-Clause

add_library(game_packagestructure MODULE gamepackage.cpp gamepackage.h)
target_link_libraries(game_packagestructure PRIVATE KF${KF_MAJOR_VERSION}::Package KF${KF_MAJOR_VERSION}::I18n)
install(TARGETS game_packagestructure DESTINATION ${KDE_INSTALL_PLUGINDIR}/kpackage/packagestructure)