/**
 * SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 * 
 * SPDX-LicenseRef: GPL-3.0-or-later
 */

#pragma once

#include <kpackage/packagestructure.h>
#include <KLocalizedString>

class GamePackageStructure : public KPackage::PackageStructure
{
    Q_OBJECT
public:
    GamePackageStructure(QObject *parent = nullptr, const QVariantList &args = QVariantList())
        : KPackage::PackageStructure(parent, args) {}
    void initPackage(KPackage::Package *package) override;
};
