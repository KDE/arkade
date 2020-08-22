/**
 * SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 * 
 * SPDX-LicenseRef: GPL-3.0-or-later
 */

#include <QApplication>
#include <QQmlApplicationEngine>
#include <QtQml>
#include <QUrl>
#include <QDebug>
#include <KLocalizedContext>
#include <KPackage/PackageLoader>

#include "gamecenter.h"
#include "gamesmodel.h"

Q_DECL_EXPORT int main(int argc, char *argv[])
{
    QGuiApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
    QApplication app(argc, argv);
    QCoreApplication::setOrganizationName(QStringLiteral("KDE"));
    QCoreApplication::setApplicationName(QStringLiteral("GameCenter"));

    QQmlApplicationEngine engine;
    
    GameCenter gameCenter(&engine);
    qRegisterMetaType<GamesModel *>("GamesModel *");
    qmlRegisterSingletonInstance("org.kde.gamecenter.private", 1, 0, "GameCenter", &gameCenter);
    
    engine.rootContext()->setContextObject(new KLocalizedContext(&engine));
    engine.load(QUrl(QStringLiteral("qrc:///main.qml")));

    for (const KPluginMetaData& pluginMetaData : KPackage::PackageLoader::self()->listPackages(QStringLiteral("GameCenter/Game"))) {
        /*KPackage::Package package = KPackage::PackageLoader::self()->loadPackage(QStringLiteral("GameCenter/Game"));
        package.setDefaultPackageRoot("kpackage/gamecenter");
        package.setPath(pluginMetaData.pluginId());*/
        qDebug() << pluginMetaData.name();
    }
    
    if (engine.rootObjects().isEmpty()) {
        return -1;
    }

    return app.exec();
}
