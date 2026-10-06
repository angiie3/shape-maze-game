const boardData = [

[
{special:"start",color:"red"},
{shape:"circle",color:"red"},
{shape:"square",color:"red"},
{shape:"triangle",color:"green"},
{shape:"circle",color:"blue"},
{shape:"diamond",color:"yellow"}
],

[
{shape:"square",color:"green"},
{shape:"circle",color:"yellow"},
{shape:"triangle",color:"red"},
{shape:"diamond",color:"blue"},
{shape:"square",color:"red"},
{shape:"triangle",color:"yellow"}
],

[
{shape:"circle",color:"green"},
{shape:"diamond",color:"red"},
{shape:"square",color:"blue"},
{shape:"circle",color:"red"},
{shape:"triangle",color:"blue"},
{shape:"square",color:"yellow"}
],

[
{shape:"triangle",color:"green"},
{shape:"square",color:"green"},
{shape:"diamond",color:"yellow"},
{shape:"circle",color:"blue"},
{shape:"triangle",color:"red"},
{shape:"diamond",color:"red"}
],

[
{shape:"circle",color:"yellow"},
{shape:"square",color:"blue"},
{shape:"triangle",color:"green"},
{shape:"circle",color:"red"},
{shape:"diamond",color:"blue"},
{shape:"square",color:"green"}
],

[
{shape:"diamond",color:"yellow"},
{shape:"circle",color:"blue"},
{shape:"square",color:"red"},
{shape:"triangle",color:"yellow"},
{shape:"circle",color:"green"},
{special:"goal"}
]

];

let playerRow = 0;
let playerCol = 0;
let moves = 0;

function createShape(shape, color) {

    const div = document.createElement("div");

    div.classList.add("shape");
    div.classList.add(shape);
    div.classList.add(color);

    return div;
}

function renderBoard() {

    const board = document.getElementById("board");
    board.innerHTML = "";

    boardData.forEach((row,rowIndex)=>{

        row.forEach((cell,colIndex)=>{

            const tile = document.createElement("div");
            tile.classList.add("cell");

            if(
                rowIndex === playerRow &&
                colIndex === playerCol
            ){
                tile.classList.add("current");
            }

            if(cell.special === "start"){

                tile.classList.add("start");
                tile.innerHTML =
                    '<div class="special">🚩</div>';

            }

            else if(cell.special === "goal"){

                tile.classList.add("goal");
                tile.innerHTML =
                    '<div class="special">🏆</div>';

            }

            else {

                tile.appendChild(
                    createShape(
                        cell.shape,
                        cell.color
                    )
                );

            }

            tile.onclick = () =>
                movePlayer(rowIndex,colIndex);

            board.appendChild(tile);

        });

    });

    document.getElementById("moves")
        .textContent = `Moves: ${moves}`;
}

function movePlayer(row,col){

    if(row===playerRow && col===playerCol){
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
            "❌ Move horizontally or vertically only.";

        return;
    }

    if(target.special === "goal"){

        playerRow = row;
        playerCol = col;
        moves++;

        renderBoard();

        document.getElementById("message")
            .textContent =
            `🎉 You won in ${moves} moves!`;

        return;
    }

    if(current.special === "start"){

        playerRow = row;
        playerCol = col;
        moves++;
        renderBoard();
        return;
    }

    const sameShape =
        current.shape === target.shape;

    const sameColor =
        current.color === target.color;

    if(!sameShape && !sameColor){

        document.getElementById("message")
            .textContent =
            "❌ Must match shape OR color.";

        return;
    }

    playerRow = row;
    playerCol = col;
    moves++;

    document.getElementById("message")
        .textContent = "";

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
