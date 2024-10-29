// SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

#include "gamesmodel.h"

#include <QtQml>
#include <QDebug>

#include <KPackage/PackageLoader>
#include <KLocalizedString>
#include <KPluginMetaData>

GamesModel::GamesModel(QObject *parent)
    : QStandardItemModel(parent)
{
    reload();
}

void GamesModel::reload()
{
    clear();

    auto list = KPackage::PackageLoader::self()->listPackages(QStringLiteral("Arkade/Game"));

    for (auto plugin : list) {
        qDebug() << plugin.name();
        auto item = new QStandardItem(plugin.name());
        item->setData(plugin.pluginId(), GamesModel::PluginIdRole);
        appendRow(item);
    }
}

QString GamesModel::pluginId(int row)
{
    return data(index(row, 0), PluginIdRole).toString();
}

QHash<int, QByteArray> GamesModel::roleNames() const
{
    QHash<int, QByteArray> roles = QAbstractItemModel::roleNames();
 
    roles[PluginIdRole] = "pluginId";
    roles[Qt::DisplayRole] = "name";
    return roles;
}

#include "moc_gamesmodel.cpp"
