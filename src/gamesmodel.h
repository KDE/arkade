/**
 * SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 * 
 * SPDX-LicenseRef: GPL-3.0-or-later
 */
 
#pragma once

#include <QQuickItem>
#include <QStandardItemModel>
#include <KLocalizedContext>

class GamesModel : public QStandardItemModel
{
    Q_OBJECT
public:
    enum AdditionalRoles {
        PluginIdRole = Qt::UserRole + 1,
    };
    Q_ENUM(AdditionalRoles)

    GamesModel(QObject *parent = nullptr);
    ~GamesModel() = default;

    Q_INVOKABLE void reload();
    Q_INVOKABLE QString pluginId(int row);
    
    QHash<int, QByteArray> roleNames() const override;
};
