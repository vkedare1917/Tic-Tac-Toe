const boxContainer = document.querySelector('.box-container');
const winnerDiv = document.querySelector('.winner-div');
const restartBtn = document.querySelector('.restart-btn');
const resetBtn = document.querySelector('.reset-btn');
const userScore1 = document.querySelector('.user-score-1');
const userScore2 = document.querySelector('.user-score-2');
const playerNamesDiv = document.querySelector(".player-names-div");
const gameDiv = document.querySelector(".game-div");
const startGameBtn = document.querySelector(".start-game-btn");
const withoutNamesbtn = document.querySelector(".without-names-btn");
const playerName1 = document.querySelector(".player_name_1");
const playerName2 = document.querySelector(".player_name_2");
const player1 = document.querySelector(".player_1");
const player2 = document.querySelector(".player_2");
let initialScore1 = 0,initialScore2 = 0;
let states = [1,0,1,0,1,0,0,1,0];
let flag = true;

// Start Game without names
withoutNamesbtn.addEventListener('click', () => {
   playerNamesDiv.style.display = "none";
   gameDiv.style.display = "flex";
});

// Start game after typing names
startGameBtn.addEventListener('click', () => {
   if(playerName1.value == "" || playerName2.value == "") {
      alert("Enter both players names or click Without Names button");
   }
   else {
      player1.textContent = playerName1.value;
      player2.textContent = playerName2.value;
      playerNamesDiv.style.display = "none";
      gameDiv.style.display = "flex";
   }
});

// Reset
resetBtn.addEventListener('click', () => {
   const confirmAction = confirm("Are you sure you want to reset the game, scores will be reset too");
   if(confirmAction) {
      resetGame();
      resetScores();
   }
});

// Restart
restartBtn.addEventListener('click', () => {
   const confirmAction = confirm("Are you sure you want to restart the game");
   if(confirmAction) {
      window.location.reload();
   }
});

// Main function
boxContainer.addEventListener('click', (e) => {
   if(e.target.id) {
      setValue(e.target);
   }
});

// Alternate colours
function checkColor(div) {
   if(div.textContent === "X") {
      div.style.color = "#ff0000";
   }
   else if(div.textContent === "O") {
      div.style.color = '#00ff00';
   }
}

// Changing value to X or O
function setValue(currentDiv) {
   const id = currentDiv.id;
   if(flag) {
      if (states[id] == 1 || states[id] == 0) {
         currentDiv.innerText = "X";
         states[id] = "X";
         flag = !flag;
         checkColor(currentDiv);
         checkForTie();
         checkWinner(!flag);
      }
   }
   else {
      if (states[id] == 1 || states[id] == 0) {
         currentDiv.innerText = "O";
         states[id] = "O";
         flag = !flag;
         checkColor(currentDiv);
         checkForTie();
         checkWinner(!flag);
      }
   }
}

// Disable boxes
function disableGame() {
   for(let i = 0; i < states.length; i++) {
      if(states[i] == 0 || states[i] == 1) {
         states[i] = null;
      }
   }
}

// Checking winner
function checkWinner(type) {
   const winIndexes = [
      //rows
      [0, 1 ,2],
      [3, 4, 5],
      [6, 7, 8],
      //columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //diagonals
      [0, 4, 8],
      [2, 4, 6]
   ];

   for(let x = 0; x < winIndexes.length; x++){
      let [a,b,c] = winIndexes[x];
      if(states[a] == states[b] && states[b] == states[c]) {
         let winner = type ? `Winner is ${player1.textContent}`: `Winner is ${player2.textContent}`;
         winnerDiv.innerText = winner;
         winnerBoxColor(winIndexes[x]);
         disableGame();
         scoreUpdate(type);
         setTimeout(resetGame,2500);
         break;
      }
   }
}

// Changing styles for win boxes
function winnerBoxColor(index) {
   for(let i = 0; i< index.length; i++) {
      const winBoxes = document.getElementById(index[i]);
      winBoxes.style.color = "lightsalmon";
      winBoxes.style.fontWeight = "bold";
   }
}

//To check a tie
function checkForTie() {
   let xCount = 0;
   for(let i = 0; i < states.length; i++) {
      if(states[i]=='X') {
         xCount++;
         if(xCount === 5) {
            winnerDiv.innerText = "It's a draw";
            setTimeout(resetGame,2500);
         }
      }
   }
}

//Updating Scores
function scoreUpdate(playerType) {
   (playerType) ? initialScore1++ : initialScore2++;
   userScore1.innerText = initialScore1;
   userScore2.innerText = initialScore2;
}

// Reset function
function resetGame() {
   const allBoxes = document.querySelectorAll(".box");
   allBoxes.forEach(box => {
      box.innerText = "";
      box.style.backgroundColor = "#1f1f1f";
      box.style.fontWeight = "normal";
   });
   states = [1,0,1,0,1,0,0,1,0];
   flag = true;
   winnerDiv.innerText = "";
}

//Reset Scores
function resetScores() {
   initialScore1 = 0;
   initialScore2 = 0;
   userScore1.innerText = initialScore1;
   userScore2.innerText = initialScore2;
}