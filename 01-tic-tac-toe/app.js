var tablero = JSON.parse(localStorage.getItem('tableroTicTacToe')) ?? Array(9).fill(null);
const TURNS = {
    X: 'X',
    O: 'O'
}
var decodedCookies = decodeURIComponent(document.cookie)
var turnCookie = decodedCookies.substring(
    decodedCookies.indexOf('turnoTicTacToe') + 15,
    decodedCookies.indexOf('turnoTicTacToe') + 16,
)
var turn = (turnCookie != "") ? turnCookie : TURNS.X
var winner = null
var gameOver = false



function handleClick(event) {
    let index = event.target.dataset.index
    if (tablero[index] || winner) return

    tablero[index] = turn

    if (checkWinner()) {
        winner = turn
    } else if (checkGameOver()) {
        gameOver = true
    }
    else {
        turn = (turn === TURNS.X) ? TURNS.O : TURNS.X
    }

    localStorage.setItem('tableroTicTacToe', JSON.stringify(tablero))
    
    let expireDate = new Date(new Date().getTime() + /* 1 año */(31557600000)).toUTCString()
    document.cookie = "turnoTicTacToe="+turn+"; expires="+expireDate+"; path=/";

    render()

}

function checkWinner() {
    let winnerCombinations = [
        // Verticales
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Horizontales
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonales
        [0, 4, 8],
        [6, 4, 2],
    ]

    for (const combination of winnerCombinations) {
        const [a, b, c] = combination

        if (
            tablero[a] &&
            tablero[a] === tablero[b] &&
            tablero[a] === tablero[c]
        ) {
            return tablero[a] === turn
        }
    }
}

function checkGameOver() {
    return tablero.every(function (value) {
        return value !== null
    })
}

function render() {
    let board = document.getElementById('board')
    board.innerHTML = ''
    tablero.forEach(function (value, index) {
        let cell = document.createElement('div')
        cell.className = 'bg-stone-600 w-20 h-20 text-5xl text-center rounded-md cursor-pointer flex items-center justify-center font-bold hover:bg-stone-500'
        cell.innerHTML = value
        cell.dataset.index = index
        cell.addEventListener('click', handleClick)
        board.appendChild(cell)
    })

    let message = document.getElementById('message')

    if (winner) {
        message.childNodes[0].innerHTML = 'Ganador: '
        message.childNodes[1].innerHTML = turn
        confetti({
            particleCount: 70,
            angle: 60,
            spread: 80,
            origin: { x: 0, y: 0.8 }
          });
          confetti({
              particleCount: 70,
              angle: 120,
              spread: 80,
              origin: { x: 1 , y: 0.8}
            });
    } else if (gameOver) {
        message.childNodes[0].innerHTML = 'Empate'
        message.childNodes[1].innerHTML = null
    }
    else {
        message.childNodes[0].innerHTML = 'Turno: '
        message.childNodes[1].innerHTML = turn
    }
}

document.getElementById('retry-button').addEventListener(
    'click', () => {
        resetVariables()
        render()

    })

function resetVariables() {
    tablero = Array(9).fill(null);

    turn = TURNS.X
    winner = null
    gameOver = false
}

render()
