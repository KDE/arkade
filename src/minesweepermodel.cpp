// SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

#include "minesweepermodel.h"

MinesweeperModel::MinesweeperModel(QObject *parent)
    : QAbstractTableModel(parent)
{
}

int MinesweeperModel::column() const
{
    return m_column;
}

void MinesweeperModel::setColumn(int column)
{
    if (column == m_column) {
        return;
    }
    m_column = column;
    Q_EMIT columnChanged();
}

int MinesweeperModel::row() const
{
    return m_row;
}

void MinesweeperModel::setRow(int row)
{
    if (row == m_row) {
        return;
    }
    m_row = row;
    Q_EMIT rowChanged();
}

int MinesweeperModel::columnCount(const QModelIndex &parent) const
{
    Q_UNUSED(parent);
    return m_column;
}

int MinesweeperModel::rowCount(const QModelIndex &parent) const
{
    Q_UNUSED(parent);
    return m_row;
}

QVariant MinesweeperModel::data(const QModelIndex &index, int role) const
{
}
#include "moc_minesweepermodel.cpp"
