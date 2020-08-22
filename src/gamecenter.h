/**
 * SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 * 
 * SPDX-LicenseRef: GPL-3.0-or-later
 */

#ifndef GAMECENTER_H
#define GAMECENTER_H

#include <QObject>

/**
 * Singleton class exposing global variables to the QML application.
 */
class GameCenter : public QObject
{
    Q_OBJECT
    
public:
    /**
     * Default constructor
     */
    GameCenter();

    /**
     * Destructor
     */
    ~GameCenter();

};

#endif // GAMECENTER_H
