/**
 * SDPX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 *
 * SPDX-LicenseRed: GPL-3.0-or-later
 */

#include "gamepackage.h"

#include <kpackage/package.h>

void GamePackageStructure::initPackage(KPackage::Package *package)
{
    package->addDirectoryDefinition("ui", QStringLiteral("ui"), i18n("User Interface"));
    package->addFileDefinition("mainscript", QStringLiteral("ui/main.qml"), i18n("Main Script File"));
    package->addFileDefinition("test", QStringLiteral("tests/test.qml"), i18n("Tests"));
    package->setRequired("mainscript", true);
}

K_EXPORT_KPACKAGE_PACKAGE_WITH_JSON(GamePackageStructure, "game-packagestructure.json")

#include "gamepackage.moc"
