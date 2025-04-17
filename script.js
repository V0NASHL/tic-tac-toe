let boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let mark = 1;

let gameOver = false;

let pOneScore = 0;

let pTwoScore = 0;

const gameBoard = document.getElementById("layout");

const playerNames = document.getElementById("players");

const pOne = document.getElementById("playerone");

const pTwo = document.getElementById("playertwo");

const playButton = document.querySelector(".start");

const cellElements = document.querySelectorAll(".cell");

const resultElement = document.getElementById("result");

const restartButton = document.getElementById("restart");


gameBoard.style.display = "none"

restartButton.style.display = "none";

cellElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    });
})

playButton.addEventListener("click", () => {
    const xName = document.getElementById("p1name")
    const oName = document.getElementById("p2name")

    if((pOne.value == null || pOne.value == "") && (pTwo.value == null || pTwo.value == "")) {
        alert("Please fill in names")
    }

    else if((pOne.value == null || pOne.value == "")) {
        alert("Please fill Player One's name")
    }

    else if((pTwo.value == null || pTwo.value == "")) {
        alert("Please fill Player Two's name")
    }

    else {
        xName.textContent = `${pOne.value}`
        oName.textContent = `${pTwo.value}`
        playerNames.style.display = "none";
        gameBoard.style.display = ""
    }
})

restartButton.addEventListener("click", () => {
    boardData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    gameOver = false;

    cellElements.forEach(cell => {
        cell.innerHTML = ""
    })

    resultElement.innerText = ""

    restartButton.style.display = "none";
})

function placeMarker(index) {
    let col = index % 3
    let row = (index - col) / 3
    if(boardData[row][col] == 0 && gameOver == false) {
        boardData[row][col] = mark;
        mark *= -1;
        drawMarkers();
        checkResult();
    }
}

function drawMarkers() {
    for(let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            if(boardData[row][col] == 1) {
                cellElements[(row * 3) + col].innerHTML = '<img src="assets/cross.svg">';
            }
            else if(boardData[row][col] == -1) {
                cellElements[(row * 3) + col].innerHTML = '<img src="assets/circle.svg">';
            }
        }
    }
}

function checkResult() {
    for(let i = 0; i < 3; i++) {
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if(rowSum == 3 || colSum == 3) {
            pOneScore++;
            document.getElementById("p1score").innerText = pOneScore;
            mark = 1;
            endGame(`${pOne.value}`);
            return;
        }
        else if(rowSum == -3 || colSum == -3) {
            pTwoScore++
            document.getElementById("p2score").innerText = pTwoScore;
            mark *= -1;
            endGame(`${pTwo.value}`);
            return;
        }
    }

    let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
    
    if(diagonalSum1 == 3 || diagonalSum2 == 3) {
        pOneScore++;
        document.getElementById("p1score").innerText = pOneScore;
        mark = 1;
        endGame(`${pOne.value}`);
        return;
    }
    else if(diagonalSum1 == -3 || diagonalSum2 == -3) {
        pTwoScore++
        document.getElementById("p2score").innerText = pTwoScore;
        mark *= -1;
        endGame(`${pTwo.value}`);
        return;
    }

    if(boardData[0].indexOf(0) == -1 && boardData[1].indexOf(0) == -1 && boardData[2].indexOf(0) == -1) {
        endGame(0);
        return;
    }
}

function endGame(winner) {
    gameOver = true;

    restartButton.style.display = "";

    if(winner == 0) {
        resultElement.innerText = "It's a tie!"
    }
    else {
        resultElement.innerText = `${winner} wins!`
    }
}