/**
 * SPDX
 */

#pragma once

#include <kpackage/packagestructure.h>
#include <KLocalizedString>

class GamePackageStructure : public KPackage::PackageStructure
{
public:
    GamePackageStructure(QObject *parent = nullptr, const QVariantList &args = QVariantList())
        : KPackage::PackageStructure(parent, args) {}
    void initPackage(KPackage::Package *package) override;
};
