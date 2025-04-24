// SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

#pragma once

#include <QObject>
#include <qqmlregistration.h>

#include <KPackage/Package>
#include "gamesmodel.h"

class QQmlEngine;
class QQuickItem;
class KLocalizedContext;


/**
 * Singleton class exposing global variables to the QML application.
 */
class Arkade : public QObject
{
    Q_OBJECT
    QML_ELEMENT
    QML_SINGLETON
    
    Q_PROPERTY(GamesModel *gamesModel READ gamesModel NOTIFY gamesModelChanged)
    Q_PROPERTY(QString gameId READ gameId WRITE setGameId NOTIFY gameIdChanged)
    Q_PROPERTY(QQuickItem *gameItem READ gameItem NOTIFY gameItemChanged)
    
public:
    Arkade(QQmlEngine *engine);

    static Arkade *create(QQmlEngine *engine, QJSEngine *);
    ~Arkade() = default;

    GamesModel *gamesModel() const;
    void setGamesModel(GamesModel *gamesModel);
    
    QString gameId() const;
    void setGameId(const QString &gameId);
    
    QQuickItem *gameItem();
    QString qmlPath();
    
Q_SIGNALS:
    void gamesModelChanged();
    void gameIdChanged();
    void gameItemChanged();
    
private:
    QQuickItem *createGui(const QString &qmlPath);
    
    GamesModel *m_gamesModel;
    QQmlEngine *m_engine;
    KLocalizedContext *m_contextObj = nullptr;
    QString m_gameId;
    KPackage::Package m_gamePackage;
};
