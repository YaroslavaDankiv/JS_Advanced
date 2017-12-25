// gameStatus:
// 1 - active
// 2 - result : draw
// 0 - result : smbd wins

var playerStatusElement = document.getElementById('currentPlayerStatus');
var resetGameButton = document.getElementById('resetGame');
var game, currentPlayer, gameStatus;
var playerX = 'x';
var playerO = 'o';
initGame();

var centralBtnTextChanged = new CustomEvent("btnTextChanged");
centralBtn.addEventListener("btnTextChanged", function(){
	console.log("Central button value changed!");
});

var container = document.getElementById('btnClick');
container.onclick = function btnClick(event) {
	var target = event.target.dataset.arrId;
	if(game[target] === '-' && gameStatus === 1) {
		event.target.value = currentPlayer;
		event.target.dispatchEvent(centralBtnTextChanged);

		game[target] = currentPlayer;

		var win = checkWin();
		if(win) {
			gameStatus = 0;
			setPlayerStatusElementText("Player '" + currentPlayer + "' win!");
			resetGameButton.hidden = false;
		} else if(!~game.indexOf('-')){
			gameStatus = 2;
			setPlayerStatusElementText("Draw!");
			resetGameButton.hidden = false;
		} else {
			switchPlayer();
			showGameStatus();
			setPlayerStatusElementText("Player '" + currentPlayer + "' move");
		}
	} else {
		event.target.style.borderColor = 'red';
		event.target.style.backgroundColor = 'pink';
		setTimeout(function(){
			event.target.style.borderColor = 'gray';
			event.target.style.backgroundColor = 'lightgray';
		}, 2000);
	}
}

function initGame() {
	game = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
	currentPlayer = playerX;
	gameStatus = 1;
	setPlayerStatusElementText("Player '" + currentPlayer + "' move");
	var butts = document.querySelectorAll("input[type='button'");
	for (var i = 0; i < butts.length; i++) {
		butts[i].value = " ";
	}
	resetGameButton.hidden = true;
}

function switchPlayer() {
	currentPlayer = currentPlayer === playerX
	? playerO
	: playerX;
}

function setPlayerStatusElementText(text){
	playerStatusElement.innerHTML = text;
}

function checkWin() {
	var horizontal = currentPlayer === game[0] && currentPlayer === game[1] && currentPlayer === game[2]
				  || currentPlayer === game[3] && currentPlayer === game[4] && currentPlayer === game[5]
				  || currentPlayer === game[6] && currentPlayer === game[7] && currentPlayer === game[8];
	var vertical = currentPlayer === game[0] && currentPlayer === game[3] && currentPlayer === game[6]
				  || currentPlayer === game[1] && currentPlayer === game[4] && currentPlayer === game[7]
				  || currentPlayer === game[2] && currentPlayer === game[5] && currentPlayer === game[8];
	var diagnal = currentPlayer === game[0] && currentPlayer === game[4] && currentPlayer === game[8]
				  || currentPlayer === game[2] && currentPlayer === game[4] && currentPlayer === game[6];

	return horizontal || vertical || diagnal;
}

function showGameStatus() {
	console.log(game[0], game[1], game[2]);
	console.log(game[3], game[4], game[5]);
	console.log(game[6], game[7], game[8]);
}
