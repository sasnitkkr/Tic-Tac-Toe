const cells = document.querySelectorAll('.cell');
const board = document.getElementById("board");
const modal = document.getElementById("winning-message-modal");
const resultText = document.getElementById("win-message-text");

var mat = [".", ".", ".", ".", ".", ".",".", ".", "."];

startGame();

function placeMark(c, mark)
{
    // display mark
    c.classList.add(mark);

    // add to array
    mat[c.id] = mark;
}

function swapTurn(mark)
{
    board.classList.remove(mark);
    if(mark === "x")
    {
        board.classList.add("circle");
    }
    else
    {
        board.classList.add("x");
    }
}

function checkWin(currentMark){

    // console.log("check win");

    let flag = false;

    if(mat[0]===currentMark && mat[3]===currentMark && mat[6]===currentMark)
        flag = true;
    else if(mat[1]===currentMark && mat[4]===currentMark && mat[7]===currentMark)
        flag = true;
    else if(mat[2]===currentMark && mat[5]===currentMark && mat[8]===currentMark)
        flag = true;
    else if(mat[0]===currentMark && mat[1]===currentMark && mat[2]===currentMark)
        flag = true;    
    else if(mat[3]===currentMark && mat[4]===currentMark && mat[5]===currentMark)
        flag = true;    
    else if(mat[6]===currentMark && mat[7]===currentMark && mat[8]===currentMark)
        flag = true;
    else if(mat[0]===currentMark && mat[4]===currentMark && mat[8]===currentMark)
        flag = true;
    else if(mat[2]===currentMark && mat[4]===currentMark && mat[6]===currentMark)
        flag = true;

    return flag;
}

function announceWinner(currentMark)
{
   modal.classList.add("show");
   let winner = currentMark==="x" ? "X" : "O";
   resultText.innerHTML = "Player " + winner + " Wins";
}

function checkDraw()
{
    // Check if Mat Filled
    // console.log("inside check draw");
    for(let i=0; i<mat.length; i++)
    {
        // if(mat[i] !=="x" || mat[i] !== "circle")
        if(mat[i] ===".")
            return false;
    }
    return true;
}
function announceDraw()
{
    // console.log("announce draw");
    modal.classList.add("show");
    resultText.innerHTML = "Game Drawn!";
}
function handleClick(){

    
    let currentMark = board.classList[1];
    placeMark(this, currentMark);

    if(checkWin(currentMark))
    {
        announceWinner(currentMark);
    }
    else if(checkDraw())
    {
        announceDraw();
    }
    else
        swapTurn(currentMark);
}

// for(let i=0; i<cell.length; i++)
//    cell[i].addEventListener("click", handleClick)
// {once : true} -> fire only once
function startGame()
{

    mat = [".", ".", ".", ".", ".", ".",".", ".", "."];
    modal.classList.remove("show");
    board.classList.remove("circle");
    board.classList.add("x");
    cells.forEach(c =>{
        c.classList.remove("x");
        c.classList.remove("circle");
        c.addEventListener("click", handleClick, {once : true})
    })    
}


// Modal Button

document.getElementById("restartButton").addEventListener('click', startGame);