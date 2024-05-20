const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""]
    boxes.forEach((box, index) => {
        box.innerText = '';
        box.style.pointerEvents = "all"; 
        box.classList.remove("win");
        // box.classList = `box box-${index + 1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function swapTurn() {
    if(currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"; 
        swapTurn();
        checkGameOver();
    }
}

function checkGameOver() {
    let ans = "";
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[0]] === gameGrid[position[2]])) {

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            //check winner
            if(gameGrid[position[0]] === 'X') {
                ans = 'X';
            } else {
                ans = 'O';
            }
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans !== "") {
        gameInfo.innerText = `Winner is - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillCount = true;
    gameGrid.forEach((box) => {
        if(box === "") {
            fillCount = false;
        }
    });

    if(fillCount) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
        return;
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

initGame();

newGameBtn.addEventListener('click', initGame);