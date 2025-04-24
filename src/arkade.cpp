// SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

#include "arkade.h"

#include <QQmlEngine>
#include <QQmlComponent>
#include <QQmlContext>
#include <QQuickItem>
#include <KLocalizedContext>
#include <KPackage/PackageLoader>

Arkade::Arkade(QQmlEngine *engine)
    : QObject(engine)
{
    m_gamesModel = new GamesModel(this);
    m_contextObj = new KLocalizedContext(this);
}

void Arkade::setGamesModel(GamesModel *gamesModel)
{
    if (m_gamesModel == gamesModel) {
        return;
    }
    m_gamesModel = gamesModel;
    Q_EMIT gamesModelChanged();
}

GamesModel *Arkade::gamesModel() const
{
    return m_gamesModel;
}

QString Arkade::gameId() const
{
    return m_gameId;
}

void Arkade::setGameId(const QString &gameId)
{
    if (m_gameId == gameId) {
        return;
    }
    
    m_gameId = gameId;
    m_gamePackage =  KPackage::PackageLoader::self()->loadPackage(QStringLiteral("Arkade/Game"), gameId);
    if (!m_gamePackage.isValid()) {
        Q_EMIT gameIdChanged();
        return;
    }
}

QString Arkade::qmlPath()
{
    if (m_gamePackage.isValid()) {
        return m_gamePackage.filePath("ui", QStringLiteral("main.qml"));
    } else {
        return QString();
    }
}

QQuickItem *Arkade::gameItem()
{
    return createGui(m_gamePackage.filePath("ui", QStringLiteral("main.qml")));
}

QQuickItem *Arkade::createGui(const QString &qmlPath)
{
    QQmlEngine *engine = qmlEngine(this);
    QQmlComponent *component = new QQmlComponent(engine, QUrl(qmlPath), nullptr);
    if (component->status() != QQmlComponent::Ready) {
        qCritical() << "Error creating component:";
        for (auto err : component->errors()) {
            qWarning() << err.toString();
        }
        component->deleteLater();
        return nullptr;
    }
    
    QObject *guiObject = component->create();
    QQuickItem *gui = qobject_cast<QQuickItem *>(guiObject);
    if (!gui) {
        qWarning() << "ERROR: QML gui" << guiObject << "not a QQuickItem instance";
        guiObject->deleteLater();
        return nullptr;
    }
    gui->setParent(this);
    return gui;
}

Arkade *Arkade::create(QQmlEngine *engine, QJSEngine *)
{
    static Arkade instance(engine);
    QQmlEngine::setObjectOwnership(&instance, QQmlEngine::CppOwnership);
    return &instance;
}

#include "moc_arkade.cpp"
