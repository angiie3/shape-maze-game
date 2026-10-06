const boardData = [
[
{shape:"circle",color:"red"},
{shape:"star",color:"yellow"},
{shape:"square",color:"blue"},
{shape:"triangle",color:"green"},
{shape:"circle",color:"red"},
{shape:"star",color:"yellow"}
],
[
{shape:"square",color:"blue"},
{shape:"circle",color:"red"},
{shape:"triangle",color:"green"},
{shape:"star",color:"yellow"},
{shape:"square",color:"blue"},
{shape:"triangle",color:"green"}
]
];

const symbols = {
circle:"🔴",
square:"🟦",
triangle:"🔺",
star:"⭐"
};

let currentRow = 0;
let currentCol = 0;

function renderBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    boardData.forEach((row,rowIndex) => {
        row.forEach((cell,colIndex) => {

            const div = document.createElement("div");
            div.classList.add("cell");

            if(rowIndex === currentRow &&
               colIndex === currentCol) {
                div.classList.add("current");
            }

            div.textContent = symbols[cell.shape];

            div.onclick = () =>
                movePlayer(rowIndex,colIndex);

            board.appendChild(div);
        });
    });
}

function movePlayer(row,col) {

    const current =
      boardData[currentRow][currentCol];

    const target =
      boardData[row][col];

    const sameRow = row === currentRow;
    const sameCol = col === currentCol;

    if(!sameRow && !sameCol) {
        return;
    }

    const valid =
      current.shape === target.shape ||
      current.color === target.color;

    if(valid) {
        currentRow = row;
        currentCol = col;
        renderBoard();
    }
}

function restartGame() {
    currentRow = 0;
    currentCol = 0;
    renderBoard();
}

renderBoard();
