#include <QApplication>
#include <QQmlApplicationEngine>
#include <QtQml>
#include <QUrl>
#include <QDebug>
#include <KLocalizedContext>
#include <KPackage/PackageLoader>

Q_DECL_EXPORT int main(int argc, char *argv[])
{
    QGuiApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
    QApplication app(argc, argv);
    QCoreApplication::setOrganizationName("KDE");
    QCoreApplication::setOrganizationDomain("kde.org");
    QCoreApplication::setApplicationName("GameCenter");

    QQmlApplicationEngine engine;

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
