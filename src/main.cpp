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

#include "arkade.h"
#include "gamesmodel.h"

Q_DECL_EXPORT int main(int argc, char *argv[])
{
    QGuiApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
    QApplication app(argc, argv);
    QCoreApplication::setOrganizationName(QStringLiteral("KDE"));
    QCoreApplication::setApplicationName(QStringLiteral("Arkade"));

    QQmlApplicationEngine engine;
    
    Arkade arkade(&engine);
    qRegisterMetaType<GamesModel *>("GamesModel *");
    qmlRegisterSingletonInstance("org.kde.arkade.private", 1, 0, "Arkade", &arkade);
    
    engine.rootContext()->setContextObject(new KLocalizedContext(&engine));
    engine.load(QUrl(QStringLiteral("qrc:///main.qml")));

    for (const KPluginMetaData& pluginMetaData : KPackage::PackageLoader::self()->listPackages(QStringLiteral("Arkade/Game"))) {
        /*KPackage::Package package = KPackage::PackageLoader::self()->loadPackage(QStringLiteral("Arkjade/Game"));
        package.setDefaultPackageRoot("kpackage/arkade");
        package.setPath(pluginMetaData.pluginId());*/
        qDebug() << pluginMetaData.name();
    }
    
    if (engine.rootObjects().isEmpty()) {
        return -1;
    }

    return app.exec();
}
