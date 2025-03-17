let boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let mark = 1;

const cellElements = document.querySelectorAll(".cell");

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
};

cellElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    });
});

function placeMarker(index) {
    let col = index % 3
    let row = (index - col) / 3
    if(boardData[row][col] == 0) {
        boardData[row][col] = mark;
        mark *= -1;
        console.log(boardData)
    }

    checkResult();
};

function checkResult() {
    for(let i = 0; i < 3; i++) {
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if(rowSum == 3 || colSum == 3) {
            console.log("Player 1 Wins!")
        }
        else if(rowSum == -3 || colSum == -3) {
            console.log("Player 2 Wins!")
        }
    }

    let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
    
    if(diagonalSum1 == 3 || diagonalSum2 == 3) {
        console.log("Player 1 Wins!")
    }
    else if(diagonalSum1 == -3 || diagonalSum2 == -3) {
        console.log("Player 2 Wins!")
    }

    if(boardData[0].indexOf(0) == -1 && boardData[1].indexOf(0) == -1 && boardData[2].indexOf(0) == -1) {
        console.log("Tie");
    }
}