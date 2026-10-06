const boardData = [

[
{shape:"start", color:"green"},
{shape:"star", color:"yellow"},
{shape:"square", color:"blue"},
{shape:"circle", color:"red"},
{shape:"triangle", color:"green"},
{shape:"star", color:"yellow"}
],

[
{shape:"circle", color:"red"},
{shape:"triangle", color:"green"},
{shape:"square", color:"blue"},
{shape:"star", color:"yellow"},
{shape:"circle", color:"red"},
{shape:"triangle", color:"green"}
],

[
{shape:"square", color:"blue"},
{shape:"circle", color:"red"},
{shape:"star", color:"yellow"},
{shape:"triangle", color:"green"},
{shape:"square", color:"blue"},
{shape:"circle", color:"red"}
],

[
{shape:"triangle", color:"green"},
{shape:"square", color:"blue"},
{shape:"circle", color:"red"},
{shape:"star", color:"yellow"},
{shape:"triangle", color:"green"},
{shape:"square", color:"blue"}
],

[
{shape:"circle", color:"red"},
{shape:"triangle", color:"green"},
{shape:"square", color:"blue"},
{shape:"circle", color:"red"},
{shape:"star", color:"yellow"},
{shape:"triangle", color:"green"}
],

[
{shape:"star", color:"yellow"},
{shape:"square", color:"blue"},
{shape:"triangle", color:"green"},
{shape:"circle", color:"red"},
{shape:"star", color:"yellow"},
{shape:"goal", color:"gold"}
]

];

const symbols = {
start:"🚩",
goal:"🏆",
circle:"🔴",
square:"🟦",
triangle:"🔺",
star:"⭐"
};

let playerRow = 0;
let playerCol = 0;
let moves = 0;

function renderBoard() {

    const board = document.getElementById("board");
    board.innerHTML = "";

    boardData.forEach((row,rowIndex)=>{

        row.forEach((cell,colIndex)=>{

            const div = document.createElement("div");

            div.classList.add("cell");

            if(cell.shape === "start"){
                div.classList.add("start");
            }

            if(cell.shape === "goal"){
                div.classList.add("goal");
            }

            if(
                rowIndex === playerRow &&
                colIndex === playerCol
            ){
                div.classList.add("current");
            }

            div.textContent = symbols[cell.shape];

            div.onclick = ()=>{
                movePlayer(rowIndex,colIndex);
            };

            board.appendChild(div);

        });

    });

    document.getElementById("moves").textContent =
        "Moves: " + moves;
}

function movePlayer(row,col){

    if(
        row === playerRow &&
        col === playerCol
    ){
        return;
    }

    const current =
        boardData[playerRow][playerCol];

    const target =
        boardData[row][col];

    const sameRow =
        row === playerRow;

    const sameCol =
        col === playerCol;

    if(!sameRow && !sameCol){

        document.getElementById("message")
            .textContent =
            "❌ Only horizontal or vertical moves are allowed.";

        return;
    }

    const sameShape =
        current.shape === target.shape;

    const sameColor =
        current.color === target.color;

    if(
        !sameShape &&
        !sameColor &&
        target.shape !== "goal"
    ){

        document.getElementById("message")
            .textContent =
            "❌ Must match shape or color.";

        return;
    }

    playerRow = row;
    playerCol = col;

    moves++;

    document.getElementById("message")
        .textContent = "";

    if(target.shape === "goal"){

        document.getElementById("message")
            .textContent =
            `🎉 Congratulations! You won in ${moves} moves!`;

    }

    renderBoard();
}

function restartGame(){

    playerRow = 0;
    playerCol = 0;
    moves = 0;

    document.getElementById("message")
        .textContent = "";

    renderBoard();
}

renderBoard();
