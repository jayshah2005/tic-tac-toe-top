
/**
 * Player:
 * Can play the game
 * Has a name
 * Has it's symbol
 */
const player = (given_name, playerSymbol) => {

    const name = given_name
    const symbol = playerSymbol

    return {name, symbol}
}

/**
 * GameBoard:
 * Has a 3*3 array to represent the game board
 * Can print itself on a the DOM
 * Can reset itself back to it's initial state
 * Can change state for one of it's cell, one at a time.
 * Can Check if there is a winner
 */
const gameBoard = (function () {
    board = [];

    const clearBoard = () => {
        for(i = 0; i < 3; i ++){
            board[i] = [];
            for(j = 0; j < 3; j++) {
                board[i][j] = '';
            }
        }
    }

    const toString = () => {
        for(i = 0; i < 3; i ++){
            for(j = 0; j < 3; j++){
                console.log(board[i][j])
            }
        }
    }

    const play = (event) => {
        row = event.currentTarget.dataset.row
        col = event.currentTarget.dataset.col

        if(board[row][col] != '') return

        board[row][col] = activePlayerSymbol

        const img = document.createElement('img')
        if(activePlayerSymbol == '*') img.src = './assests/cross.png'
        else img.src = './assests/circle.png'

        img.className = 'peice'

        event.currentTarget.appendChild(img)

        gameBoard.toString()

        p1wins = gameBoard.checkWinner(player1.symbol)
        p2wins = gameBoard.checkWinner(player2.symbol)
        if(p1wins) console.log('p1wins')
        else if(p2wins) console.log('p2wins')

        flow.changeActivePlayer()
    }

    const setUpBoard = () => {
        gameBoardElem = document.createElement('div')
        container = document.querySelector('.container')

        gameBoardElem.className = 'board'

        setPeices(gameBoardElem)

        container.appendChild(gameBoardElem)
        
    }

    // We create grid elements and define onClick here
    const setPeices = (gameBoardElem) => {
        for(i = 0; i < board.length; i++){
            for(j = 0; j < board[i].length; j++){
                
                elem = document.createElement('div')
                elem.className = 'boardItem'
                elem.dataset.row= i
                elem.dataset.col=j

                elem.addEventListener('click', (event) => {
                    gameBoard.play(event);
                })

                gameBoardElem.appendChild(elem)
            }
        }
    }

    const checkWinner = (symbol) => {
        if(checkRow(symbol) || checkColumn(symbol) || checkDiag(symbol)) return true
        else return false        
    }

    const checkRow = (symbol) => {
        for(i = 0; i < board.length; i++){
            win = true
            for(j = 0; j < board[i].length; j++){
                if(board[i][j] != symbol) win = false;
            }
            if(win == true) return true
        }
        return false
    }

    const checkColumn = (symbol) => {
        for(i = 0; i < board[0].length; i++){
            win = true
            for(j = 0; j < board.length; j++){
                if(board[j][i] != symbol) win = false;
            }
            if(win == true) return true;
        }
        return false
    }

    const checkDiag = (symbol) => {
        diag1 = true
        diag2 = true
        for(i = 0; i < board.length; i++){
            if(board[i][i] != symbol) diag1 = false
            if(board[i][board[i].length - i - 1] != symbol) diag2 = false
        }

        if(diag1 | diag2) return true
        else return false
    }

    return {play, toString, checkWinner, setUpBoard, clearBoard}
})()

/**
 * The logic that connects everything together
 * Initiallizes two players
 * Displays start and end screen
 */
const flow = (function () {
    const s1 = '*'
    const s2 = 'O'
    // p1_name = prompt('What is the name of player 1: ')
    // p2_name = prompt('What is the name of player 2: ')
    player1 = player('Turtle', s1)
    player2 = player('Yertle', s2)
    gameBoard.clearBoard()
    activePlayerSymbol = '*'

    gameBoard.setUpBoard()

    const displayStart = () => {
        
    }

    const displayEnd = () => {

    }

    const changeActivePlayer = () => {
        activePlayerSymbol == s2 ? 
        activePlayerSymbol = player1.symbol :
        activePlayerSymbol = player2.symbol
    }

    return {changeActivePlayer}
})()

