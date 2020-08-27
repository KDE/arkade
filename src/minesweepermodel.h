// SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

#pragma once

#include <QAbstractTableModel>

struct Field {
    bool isMine;
    bool isDiscovered;
    bool hasFlag;
};

/**
 * Model for a minesweeper.
 */
class MinesweeperModel : public QAbstractTableModel
{
    Q_OBJECT
    
    Q_PROPERTY(int row READ row WRITE setRow NOTIFY rowChanged)
    Q_PROPERTY(int column READ column WRITE setColumn NOTIFY columnChanged)

public:
    MinesweeperModel(QObject *parent = nullptr);
    virtual ~MinesweeperModel() override = default;
    
    enum FieldType {
        MINES,
        NO_MINES,
    };
    Q_ENUM(FieldType)
    
    enum AdditionalRoles {
        MinesNearRole = Qt::UserRole + 1,
        HasFlagRole,
        HasBeenDiscoveredRole,
        FieldRole,
    };
    Q_ENUM(AdditionalRoles)
    
    virtual int rowCount(const QModelIndex &parent = QModelIndex()) const override;
    virtual int columnCount(const QModelIndex &parent = QModelIndex()) const override;
    virtual QVariant data(const QModelIndex &index, int role = Qt::DisplayRole) const override;
    QHash<int, QByteArray> roleNames() const override;
    
    int row() const;
    void setRow(int row);
    int column() const;
    void setColumn(int column);
    
Q_SIGNALS:
    void rowChanged();
    void columnChanged();
    
private:
    int m_row;
    int m_column;
    QList<Field> m_fields;
};