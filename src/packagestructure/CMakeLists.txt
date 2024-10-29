# SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
#
# SPDX-License-Identifier: BSD-2-Clause

kcoreaddons_add_plugin(arkade_packagestructure_game
    SOURCES gamepackage.cpp
    INSTALL_NAMESPACE kf6/packagestructure
)
target_link_libraries(arkade_packagestructure_game KF6::Package KF6::I18n)