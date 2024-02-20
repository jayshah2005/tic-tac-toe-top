
/**
 * Player:
 * Can play the game
 * Has a name
 */
const player = (given_name) => {

    const name = given_name

    const play = (row, col, symbol) => {
        gameBoard.play(row, col, symbol)
    }

    return {name, play}
}

/**
 * GameBoard:
 * Has a 3*3 array to represent the game board
 * Can print itself on a the DOM
 * Can reset itself back to it's initial state
 * Can change state for one of it's cell, one at a time.
 */
const gameBoard = (function () {
    board = [];

    for(i = 0; i < 3; i ++){
        board[i] = [];
        for(j = 0; j < 3; j++) {
            board[i][j] = i*3 + j;
        }
    }

    const toString = () => {
        for(i = 0; i < 3; i ++){
            for(j = 0; j < 3; j++){
                console.log(board[i][j])
            }
        }
    }

    const play = (row, col, symbol) => {
        board[row][col] = symbol
    }

    return {toString}
})()

/**
 * The logic that connects everything together
 * Initiallizes two players
 */
const flow = (function () {
    p1_name = prompt('What is the name of player 1: ')
    p2_name = prompt('What is the name of player 2: ')
    player1 = player(p1_name)
    player2 = player(p2_name)

    
})()

