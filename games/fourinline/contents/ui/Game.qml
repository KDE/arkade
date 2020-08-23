/**
 * SPDX-FileCopyrightText: (C) 2020 Carl Schwan <carl@carlschwan.eu>
 * 
 * SPDX-LicenseRef: GPL-3.0-or-later
 */

import QtQuick 2.12

QtObject {
    id: game
    
    property int currentPlayer: 1
    
    property var board: new Array(6);
    
    property var finished: false;
    
    signal playerWon(int player);
    
    required property int canvasWidth;
    required property int canvasHeight;
    
    required property Item canvas;
    
    readonly property int blockSize: Math.min(canvasHeight / 6, canvasWidth / 7) 
    
    
    property var blockComponent;

    //Index function used instead of a 2D array
    function index(column, row) {
        return column + (row * 7);
    }
    
    function startNewGame() {
        // Delete blocks from previous game
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
                if (board[i] != null && board[i][j] != null) {
                    board[i][j].destroy();
                }
            }
            board[i] = new Array(7);
            for (var j = 0; j < 7; j++) {
                board[i][j] = null;
            }
        }
        game.finished = false;
    }
    
    Component.onCompleted: game.startNewGame();
    
    function addBlock(column) {
        if (game.finished) {
            return;
        }
        const initialRow = 5;
        if (board[column][initialRow]) {
            return;
        }
        createBlock(column, initialRow, game.currentPlayer);
        
        
        // falling animation
        let row = initialRow;
        while (!board[column][row - 1]) {
            // https://stackoverflow.com/a/7180095
            board[column][row - 1] = board[column].splice(row, 1)[0];
            row -= 1;
            board[column][row].row = row;
            if (row === 0) {
                break;
            }
        }
        
        if (game.checkVictory(game.currentPlayer)) {
            game.finished = true;
            game.playerWon(game.currentPlayer);
        }
        
        game.currentPlayer = game.currentPlayer === 1 ? 0 : 1;
    }
    
    function createBlock(column, row, player) {
        if (!blockComponent) {
            blockComponent = Qt.createComponent("Block.qml");
        }

        if (blockComponent.status === Component.Ready) {
            var dynamicObject = blockComponent.createObject(game.canvas);
            if (dynamicObject === null) {
                console.log("error creating block");
                console.log(blockComponent.errorString());
                return false;
            }
            dynamicObject.player = player;
            dynamicObject.column = column
            dynamicObject.row = row;
            dynamicObject.column = column;
            dynamicObject.blockSize = Qt.binding(function() { return game.blockSize });
            dynamicObject.spawned = true;
            board[column][row] = dynamicObject;
        } else {
            console.log("error loading block component");
            console.log(blockComponent.errorString());
            return false;
        }
        return true;
    }
    
    function isFromPlayer(row, column, player) {
        return game.board[row][column] && game.board[row][column].player === player;
    }
    
    /**
     * @param player The player who we want to check if they won.
     * @return true iff the player won.
     */
    function checkVictory(player) {
        // horizontalCheck
        for (let j = 0; j < 6 - 3; j++) {
            for (let i = 0; i < 7; i++) {
                if (isFromPlayer(i, j, player) && isFromPlayer(i, j + 1, player) && isFromPlayer(i, j + 2, player) && isFromPlayer(i, j + 3, player)){
                    return true;
                }
            }
        }
        // verticalCheck
        for (let i = 0; i < 7 -3 ; i++ ){
            for (let j = 0; j < 6; j++){
                if (isFromPlayer(i, j, player) && isFromPlayer(i + 1, j, player) && isFromPlayer(i + 2, j, player) && isFromPlayer(i + 3, j, player)){
                    return true;
                }           
            }
        }
        // ascendingDiagonalCheck 
        for (let i=3; i < 7 ; i++){
            for (let j=0; j < 6 -3; j++){
                if (isFromPlayer(i, j, player) && isFromPlayer(i-1, j+1, player) && isFromPlayer(i-2, j+2, player) && isFromPlayer(i-3, j+3, player))
                    return true;
            }
        }
        // descendingDiagonalCheck
        for (let i = 3; i < 7; i++){
            for (let j = 3; j < 6; j++){
                if (isFromPlayer(i, j, player) && isFromPlayer(i-1, j-1, player) && isFromPlayer(i-2, j-2, player) && isFromPlayer(i-3, j-3, player))
                    return true;
            }
        }
        return false;
    }
}
