var tablero = Array(9).fill(null)
const TURNS = {
    X: 'X',
    O: 'O'
}
var turn = TURNS.X
var winner = null
var isGameOver = false


handleClick = function (event) {
    var index = event.target.dataset.index
    if (tablero[index] || winner) return
    tablero[index] = turn
    if (checkWinner()) {
        winner = turn
    } else if (checkGameOver()) {
        isGameOver = true
    } else {
        turn = turn === TURNS.X ? TURNS.O : TURNS.X
    }
    render()
}

function checkWinner() {
    var winningCombinations = [
        [0, 1, 2], // Vertical
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Horizontal
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonal
        [2, 4, 6]
    ]

    for (const combination of winningCombinations) {
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
    var board = document.getElementById('board')
    board.innerHTML = ''
    tablero.forEach(function (value, index) {
        var cell = document.createElement('div')
        cell.className = 'bg-stone-600 w-20 h-20 text-5xl text-center rounded-md cursor-pointer flex items-center justify-center font-bold hover:bg-stone-500'
        cell.innerHTML = value
        cell.dataset.index = index
        cell.addEventListener('click', handleClick)
        board.appendChild(cell)
    })
    var message = document.getElementById('message')
    if (winner) {
        message.childNodes[0].innerHTML = 'Ganador: '
        message.childNodes[1].innerHTML = winner
    } else if (isGameOver) {
        message.childNodes[0].innerHTML = 'Empate'
        message.childNodes[1].innerHTML = null
    } else {
        message.childNodes[0].innerHTML = 'Turno: '
        message.childNodes[1].innerHTML = turn
    }
}
render()