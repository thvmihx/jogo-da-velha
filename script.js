const player01 = "X";
const player02 = "O";
let currentPlayer = player01;

let board = ["", "", "", "", "", "", "", "", ""];
// Possiveis vitorias: 0,1,2 | 0,3,6 | 0,4,8 | 1,4,7 | 2,4,6 | 2,5,8 | 3,4,5 | 6,7,8
let gameOn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6], 
];

let player1Score = 0;
let player2Score = 0;

function changePlayer() {
  if (currentPlayer === player01) {
    currentPlayer = player02;
  } else {
    currentPlayer = player01;
  }
}

function handleClick(index) {
  if (gameOn === false) return;

  if (board[index] !== "") return;

  board[index] = currentPlayer;

  const cell = document.getElementsByClassName('cell')[index];
  cell.innerHTML = currentPlayer;

  var player1 = document.getElementById(`player1`).value;
  var player2 = document.getElementById(`player2`).value;

  checkWinner();

  changePlayer();

  const timeplayer = document.getElementById(`playertime`);

  if (currentPlayer === `X`) {
    timeplayer.innerHTML = "Vez do jogador " + player1;
  } else {
    timeplayer.innerHTML = "Vez do jogador " + player2;
  }
}

function checkWinner() {
  const msg = document.getElementById(`mesage`);

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      gameOn = false;

      var player1 = document.getElementById(`player1`).value;
      var player2 = document.getElementById(`player2`).value;

      if (currentPlayer === `X`) {
        msg.innerHTML = "O jogador " + player1 + " ganhou!";
        player1Score++;
      } else {
        msg.innerHTML = "O jogador " + player2 + " ganhou!";
        player2Score++;
      }

      updateScoreboard();
      return;
    }
  }

  if (!board.includes("")) {
    gameOn = false;
    msg.innerText = "VELHA";
  }
}

function updateScoreboard() {
  const player1Scoreboard = document.getElementById(`player1score`);
  const player2Scoreboard = document.getElementById(`player2score`);

  var player1 = document.getElementById(`player1`).value;
  var player2 = document.getElementById(`player2`).value;

  player1Scoreboard.innerText = "O jogador " + player1 + ":" + player1Score;
  player2Scoreboard.innerText = "O jogador " + player2 + ":" + player2Score;
}



function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOn = true;
  currentPlayer = player01;
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  document.getElementById('mesage').innerText = "";
  const player1 = document.getElementById('player1').value;
  const player2 = document.getElementById('player2').value;
}


function startGame() {
  const player1 = document.getElementById('player1').value;
  const player2 = document.getElementById('player2').value;
  if ( player1 == ""){
    alert ("é necessario informar o player 1");
    document.getElementById('player1').focus();
    return;
  } else if ( player2 == ""){
    alert ("é necessario informar o player 2");
    document.getElementById('player2').focus();
    return;
  } 
  gameOn = true;
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove('disabled');
  }
  document.getElementById('playertime').innerHTML = "Vez do jogador " + player1;
}


function disableBoard() {
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add('disabled');
  }
}

disableBoard();