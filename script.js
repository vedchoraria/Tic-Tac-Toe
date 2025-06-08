let win = document.getElementById("Winner");
let statusDisplay = document.getElementById("Status");
let boxes = document.querySelectorAll(".box");
let board = ['','','','','','','','',''];
let gameActive = true;
let resetButton = document.getElementById("reset-btn");

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

let turn = "X";
let count = 0;

function handleCellClick(e) {
    let clickedCell = e.target;
    let clickedCellIndex = Array.from(boxes).indexOf(clickedCell);
    
    if (clickedCell.innerText !== "" || !gameActive) return;
    
    // Update board state
    board[clickedCellIndex] = turn;
    
    if(turn == "X") {
        clickedCell.innerText = "X";
        clickedCell.classList.add("text-pink-600");
        turn = "O";
    } else {
        clickedCell.innerText = "O";
        clickedCell.classList.add("text-purple-600");
        turn = "X";
    }
    count++;
    checkResult();
    statusDisplay.textContent = `Player ${turn}'s Turn`;
}

function checkResult() {
    let roundWon = false;
    
    for(let i = 0; i < winningConditions.length; i++) {
        let a = board[winningConditions[i][0]];
        let b = board[winningConditions[i][1]];
        let c = board[winningConditions[i][2]];
        
        if (a === '' || b === '' || c === '') continue;
        
        if (a === b && b === c) {
            roundWon = true;
            boxes[winningConditions[i][0]].classList.add("highlight");
            boxes[winningConditions[i][1]].classList.add("highlight");
            boxes[winningConditions[i][2]].classList.add("highlight");
            break;
        }
    }
    
    if(roundWon) {
        // The winner is the opposite of current turn because we switched turns already
        let winner = turn === "X" ? "O" : "X";
        win.innerText = `Player ${winner} won!`;
        win.classList.add("text-7xl", "font-bold", "text-center", "my-4");
        gameActive = false;
        return;
    }
    
    if(count === 9 && !roundWon) {
        win.innerText = "It's a DRAW!!!";
        win.classList.add("text-2xl", "font-bold", "text-center", "my-4");
        gameActive = false;
    }
}

function resetGame() {
    turn = 'X';
    board = ['','','','','','','','',''];
    gameActive = true;
    count = 0;
    statusDisplay.textContent = `Player ${turn}'s Turn`;
    win.innerText = '';
    win.classList.remove("text-2xl", "font-bold", "text-center", "my-4", "highlight");
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('text-purple-600', 'text-pink-600', 'bg-red-500',"highlight");
    });
}

function initializeGame() {
    boxes.forEach(box => {
        box.addEventListener('click', handleCellClick);
    });
    
    resetButton.addEventListener('click', resetGame);
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGame);