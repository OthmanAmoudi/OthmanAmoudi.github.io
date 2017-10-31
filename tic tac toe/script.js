
var currentPlayer = '';
var computerPlayer = '';
var playerSelection = [];
var computerSelection = [];
//var boardInputs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var boardInputs = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const winCombos = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[6, 4, 2]
]


$(document).ready(function() {

  $('.board').hide();
  $('.restart').hide();
  // $('.mine').hide();
  choseSign();

});

function choseSign() {
  $('.choseSq').on('click', function() {
    var element = $(this).attr('value');
    console.log('element player', element);
    if (element == 'o' || element == 'x') {
      currentPlayer += element;
      $('.mine').fadeOut(500);
      $('.board').fadeIn(3000);
      if (currentPlayer === 'x') {
        computerPlayer = 'o';
      } else {
        computerPlayer = 'x';
      }
      startGame();
    }
  });
}

function startGame() {
  document.getElementById('tictactoe').style.pointerEvents = 'auto';
  $('.square').on('click', function() {
    var element2 = $(this).attr('value');
    var myIndex = playerSelection.indexOf(parseInt(element2));
    var comIndex = computerSelection.indexOf(parseInt(element2));
    boardInputs[parseInt(element2)] = currentPlayer;    
    if (myIndex === -1 && comIndex === -1) {
      if (currentPlayer == 'o') {
        $(this).append("<img src='o.png' />");
      } else {
        $(this).append("<img src='x.png' />");
      }

      playerSelection.push(parseInt(element2));
      let gameWon = checkWin(boardInputs, currentPlayer);
      if (gameWon) {
        gameOver(gameWon, 'you won');
      } else if (playerSelection.length < 6) {
        document.getElementById('tictactoe').style.pointerEvents = 'none';
        setTimeout(() => {
          computerTurn(bestSpot(), computerPlayer);
        }, 1000);
      }
    } else {
      console.log('Position Taken !');
    }
  });

}


function computerTurn(squareId, player) {
  document.getElementById('tictactoe').style.pointerEvents = 'auto';
  boardInputs[squareId] = computerPlayer;
  var generatePosition = '.sq';

    computerSelection.push(squareId);
    generatePosition += squareId

    if (currentPlayer === 'x') {
      $(generatePosition).append("<img src='o.png'/>");
    } if (currentPlayer === 'o') {
      $(generatePosition).append("<img src='x.png'/>");
    }
    let gameWon = checkWin(boardInputs, computerPlayer);
    if (gameWon) {
      gameOver(gameWon, 'computer won');
    }else  if (playerSelection.length >4){

      console.log('it\'s a -- DRAW -- Game Finished');
      console.log('board result', boardInputs);
      document.getElementById('tictactoe').style.pointerEvents = 'none';      
      $('.status').text('its a draw');
      $('.restart').show();
      $('.RestartBtn').on('click', function() {
        clearGame();
        $('.restart').hide();
      });
    }
  
  console.log("computer board: ", computerSelection);
}

function clearGame() {
  for (i = 0; i < 9; i++) {
    var sq = '.sq' + i;
    $(sq).text('');
    $(sq).css("background-color", "rgb(248, 248, 248)");
  }

  $('.board').hide();
  $('.mine').fadeIn(1500);
  currentPlayer = '';
  computerPlayer = '';
  playerSelection = [];
  computerSelection = [];
  boardInputs = [0 ,1 , 2, 3, 4, 5, 6, 7, 8];
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index,
        player: player
      };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon, status) {
  document.getElementById('tictactoe').style.pointerEvents = 'none';
  for (let index of winCombos[gameWon.index]) {
    var square = '.sq' + index;
    $(square).css("background-color", "rgb(41, 168, 62)");
  }

  setTimeout(() => {
    $('.status').text(status);
    $('.restart').show();
  }, 1000);

  $('.RestartBtn').on('click', function() {
    clearGame();
    $('.restart').hide();
  });

}

function emptySquares() {
 return boardInputs.filter(s => s != "o" && s != "x");
}

function bestSpot() {
  // return emptySquares()[0];  //disable minimax algorithem
  return minimax(boardInputs, computerPlayer).index;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares(newBoard);

	if (checkWin(newBoard, currentPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, computerPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;
		if (player == computerPlayer) {
			var result = minimax(newBoard, currentPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, computerPlayer);
			move.score = result.score;
		}
		newBoard[availSpots[i]] = move.index;
		moves.push(move);
	}

	var bestMove;
	if(player === computerPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

// function computerTurn(){
//     document.getElementById('tictactoe').style.pointerEvents = 'auto';               
//     var random_number = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
//     var playerIndex = playerSelection.indexOf(random_number); 
//     var computerIndex = computerSelection.indexOf(random_number);
//     var generatePosition = '.sq';
    
//     if (playerIndex === -1 && computerIndex === -1){
//         computerSelection.push(random_number);
//         generatePosition+=random_number.toString();
//         if (currentPlayer === 'x'){
//             computerPlayer = 'o';
//         $(generatePosition).append("<img src='o.png'/>");
//             boardInputs[random_number-1] = computerPlayer;                
//         }
//         else{
//         $(generatePosition).append("<img src='x.png'/>");
//             boardInputs[random_number-1] = computerPlayer;                
//         }

//     let gameWon = checkWin(boardInputs,computerPlayer);
//     if (gameWon){
//        gameOver(gameWon,'Computer won');
//     }

//     }
//     else{
//         if (computerSelection.length < 4){
//             computerTurn();
//         }
//         else{
//             console.log('it\'s a -- DRAW -- Game Finished');
//             console.log('board result',boardInputs);
                        
            
//             $('.status').text('its a draw');
//             $('.restart').show();
//             $('.RestartBtn').on('click', function(){
//                 clearGame();
//                 $('.restart').hide();
//             });
//         }
//     }
// }