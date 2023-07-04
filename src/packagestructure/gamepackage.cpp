/**
 * SDPX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 *
 * SPDX-LicenseRed: GPL-3.0-or-later
 */

#include "gamepackage.h"

#include <kpackage/package.h>

void GamePackageStructure::initPackage(KPackage::Package *package)
{
    package->setDefaultPackageRoot(QStringLiteral("game/packages"));
    package->addDirectoryDefinition("ui", QStringLiteral("ui"), i18n("User Interface"));
    
    package->addFileDefinition("mainscript", QStringLiteral("ui/main.qml"), i18n("Main Script File"));
    package->setRequired("mainscript", true);
}

K_PLUGIN_CLASS_WITH_JSON(GamePackageStructure, "game-packagestructure.json")

#include "gamepackage.moc"

#include "moc_gamepackage.cpp"
