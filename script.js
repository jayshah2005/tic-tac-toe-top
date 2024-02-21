
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

        if(p1wins || p2wins) {

            const winnerAnnouncement = document.querySelector('.playerName')

            if(p1wins) winnerAnnouncement.innerHTML = player1.name + ' won the game.'
            if(p2wins) winnerAnnouncement.innerHTML = player2.name + ' won the game.'

            flow.displayEnd()
        }

        flow.changeActivePlayer()
    }

    const setUpBoard = () => {

        document.querySelector('.start').className = 'start invisible'
        document.querySelector('.end').className = 'end invisible'

        gameBoardElem = document.createElement('div')
        container = document.querySelector('.container')

        container.className = 'container visible'

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

    gameBoard.clearBoard()
    activePlayerSymbol = '*'

    const displayStart = () => {

        const board = document.querySelector('.board')

        document.querySelector('.container').className = 'container invisible'
        document.querySelector('.end').className = 'end invisible'

        if(board != null) board.remove()

        form = document.querySelector('.start.invisible')

        form.className = 'start'
        
    }

    const displayEnd = () => {
        document.querySelector('.container').className = 'container invisible'
        document.querySelector('.board').remove()
        document.querySelector('.end.invisible').className = 'end'
        gameBoard.clearBoard()
    }

    const changeActivePlayer = () => {
        activePlayerSymbol == s2 ? 
        activePlayerSymbol = player1.symbol :
        activePlayerSymbol = player2.symbol
    }

    const runFlow = () => {
        document.querySelector('.play-button').addEventListener('click', (event) => {
            gameBoard.setUpBoard();
        })

        document.querySelector('.quit-button').addEventListener('click', (event) => {
            flow.displayStart();
        })

        document.querySelector('.start').addEventListener('submit', (event) => {
            form.reset();
            event.preventDefault()

            const formData = new FormData(event.target);
            player1 = player(formData.get('p1'), s1)
            player2 = player(formData.get('p2'), s2)

            if(player1.name != null && player2.name !=null) {
                gameBoard.setUpBoard()
            } 
        })

        gameBoard.setUpBoard()
        flow.displayStart()
    }

    return {changeActivePlayer, displayEnd, displayStart, runFlow}
})()

flow.runFlow()