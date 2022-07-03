const boxContainer = document.querySelector('.box-container');
const winnerDiv = document.querySelector('.winner-div');
const restartBtn = document.querySelector('.restart-btn');
const resetBtn = document.querySelector('.reset-btn');
const user1 = document.querySelector('.user1');
const user2 = document.querySelector('.user2');
let player1 = 0,player2 = 0;
let states = [1,0,1,0,1,0,0,1,0];
let flag = true;

// Reset
resetBtn.addEventListener('click', () => {
   let confirmAction = confirm("Are you sure you want to reset the game ");
   if(confirmAction) {
      resetGame();
   }
});

// Restart
restartBtn.addEventListener('click', () => {
   window.location.reload();
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
   let id = currentDiv.id;
   if(flag) {
      if (states[id] == 1 || states[id] == 0) {
         currentDiv.innerText = "X";
         states[id] = "X";
         flag = !flag;
         checkColor(currentDiv);
         checkWinner(!flag);
      }
   }
   else {
      if (states[id] == 1 || states[id] == 0) {
         currentDiv.innerText = "O";
         states[id] = "O";
         flag = !flag;
         checkColor(currentDiv);
         checkWinner(!flag);
      }
   }
   checkForTie();
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
         let winner = type ? "Winner is X": "Winner is O";
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
      winBoxes.style.fontSize = "50px";
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
   (playerType) ? player1++ : player2++;
   user1.innerText = player1;
   user2.innerText = player2;
}


// Reset function
function resetGame() {
   const allBoxes = document.querySelectorAll(".box");
   allBoxes.forEach(box => {
      box.innerText = "";
      box.style.backgroundColor = "#1f1f1f";
      box.style.fontWeight = "normal";
      box.style.fontSize = "45px";
   });
   states = [1,0,1,0,1,0,0,1,0];
   flag = true;
   winnerDiv.innerText = "";
} 
