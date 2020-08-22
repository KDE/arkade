/**
 * SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 * 
 * SPDX-LicenseRef: GPL-3.0-or-later
 */

#pragma once

#include <QObject>
#include <KPackage/Package>

class GamesModel;
class QQmlEngine;
class QQuickItem;
class KLocalizedContext;


/**
 * Singleton class exposing global variables to the QML application.
 */
class GameCenter : public QObject
{
    Q_OBJECT
    
    Q_PROPERTY(GamesModel *gamesModel READ gamesModel NOTIFY gamesModelChanged)
    Q_PROPERTY(QString gameId READ gameId WRITE setGameId NOTIFY gameIdChanged)
    Q_PROPERTY(QQuickItem *gameItem READ gameItem NOTIFY gameItemChanged)
    
public:
    GameCenter(QQmlEngine *engine);
    ~GameCenter() = default;

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
