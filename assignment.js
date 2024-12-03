let arr = []
function plus(){
    arr = []
    let addSign = document.getElementById('add').value
    arr.push(addSign); 
}

function minus(){
    arr = []
    let addSign = document.getElementById('minus').value
    arr.push(addSign); 
}
function multiply(){
    arr = []
    let addSign = document.getElementById('multiply').value
    arr.push(addSign); 
}

function divide(){
    arr = []
    let addSign = document.getElementById('divide').value
    arr.push(addSign); 
}

function power(){
    arr = []
    let addSign = document.getElementById('power').value
    arr.push(addSign); 
}

const input1 = document.querySelector('.top-input input:nth-of-type(1)')
const input2 = document.querySelector('.top-input input:nth-of-type(2)')
const displayBoard = document.getElementById('display')

function clearView() {
    input1.value = ""
    input2.value = ""
    displayBoard.textContent = ""
}

clearView()
function calculate() { 
    let num1 = parseFloat(input1.value)
    let num2 = parseFloat(input2.value)
    

    if (arr[0]=="+") {
        displayBoard.innerHTML= num1 + num2;
    }else if (arr[0]=="-") {
        displayBoard.innerHTML= num1 - num2
    }else if (arr[0]=="*") {
        displayBoard.innerHTML= num1 * num2
    }else if (arr[0]=="x^y") {
        displayBoard.innerHTML= num1 ** num2
    }else if (arr[0]=="/") {
        displayBoard.innerHTML= num1 / num2
    }else{
        displayBoard.innerHTML = "Try again"
    }
}
