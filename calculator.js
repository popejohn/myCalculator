 // Grab the display and input elements
    let display = document.getElementById('display-small-light')
    let inputNum = document.querySelector('input');
    let firstNum = document.getElementById('display1')
    let signDisplay = document.getElementById('display-sign')
    let secondNum = document.getElementById('display2')
    let equalSpan = document.getElementById('equalSign')
    let special = document.getElementById('special')
    let answer = []
    let usedSign = []
    let usedFnx = []
    let power = false

    // Function declaration for clearing screen using CE
    function clearScreen() { 
            inputNum.value = ''
            special.innerHTML = ''
           clearSpan()
           answer = []
    }

    function clearSpan() {
        firstNum.innerHTML = ''
        secondNum.innerHTML = ''
        signDisplay.innerHTML = ''
        equalSpan.innerHTML = ''
    }

    function editFromBack() {
        if (firstNum.innerHTML.trim() != '' && signDisplay.innerHTML.trim() != '' && secondNum.innerHTML.trim() === ''){
            return
        }else if(answer.length != 0){
            return
        }else if(firstNum.innerHTML.trim() !== '' && signDisplay.innerHTML.trim() === ''){
            firstNum.innerHTML = firstNum.innerHTML.slice(0, firstNum.innerHTML.length-1)
            inputNum.value = inputNum.value.slice(0, inputNum.value.length-1)
            console.log('I edit');   
        }else if(answer.length === 0 && equalSpan.innerHTML.trim() === ''){
            secondNum.innerHTML = secondNum.innerHTML.slice(0, secondNum.innerHTML.length-1)
            inputNum.value = inputNum.value.slice(0, inputNum.value.length-1)
        }else{
            return
        }
    }

    function clearN() {
        if(!power){
            return
        }
        inputNum.placeholder = 0
        clearScreen()
    }

    // Power on and off
    function switchOn() {
        if (!power){
            inputNum.placeholder = 0
            power = true
        }
        else{
            inputNum.placeholder = ''
            clearScreen();
            power = false
        }
    }

    /*The function below checks:
    1. If the calculator has not been switched on. If not it does not punch
    2. If its switched on and the there's nothing yet on the screen, it punches the digits
        using concat.
    3. Checks if the value on the screen is a result from a previous calculation, 
       if so, it does not concat*/ 
    

    function digit(num) {
        if (!power){
            return
        }
        if (signDisplay.innerHTML.trim() === '' && !special.innerHTML){
                firstNum.innerHTML += num
                inputNum.value += num
                
        }else if (answer.length != 0 && firstNum.innerHTML !== '' && secondNum.innerHTML !== '' && signDisplay.innerHTML !== ''){
                clearScreen()
                console.log('na here');
                
                answer = [];
                firstNum.innerHTML += num;
                inputNum.value += num;
                
        }else if (signDisplay.innerHTML !== '' && firstNum.innerHTML !== '' && inputNum.value.trim() == firstNum.innerHTML.trim()){
            inputNum.value = ''
            secondNum.innerHTML += num;
            inputNum.value += num;
        }else if(special.innerHTML){
            special.innerHTML = ''
            inputNum.value = ''
            answer = []
            firstNum.innerHTML += num
            inputNum.value += num
        }else{
            secondNum.innerHTML += num
            inputNum.value += num
        }
        inputNum.placeholder = ''
}

        

    
    function sign(arith) {
        if (!power){
            return
        }if (!firstNum.innerHTML) {
            firstNum.innerHTML = 0
            inputNum.value = 0
        }
        if (firstNum.innerHTML.trim() != '' && signDisplay.innerHTML === '' && secondNum.innerHTML === '') {
            signDisplay.innerHTML = arith;
            inputNum.classList.add('blink')
        }else {
            if (firstNum.innerHTML != '' && signDisplay.innerHTML != '' && secondNum.innerHTML != '' && !special.innerHTML) {
            compute(firstNum.innerHTML, signDisplay.innerHTML, secondNum.innerHTML)
            setTimeout(() => {
                 secondNum.innerHTML = ''
                firstNum.innerHTML = inputNum.value;
                equalSpan.innerHTML = ''
                signDisplay.innerHTML = arith;
            }, 1000);
            answer = []
        }
        }
        if (special.innerHTML) {
            special.innerHTML= ''
            firstNum.innerHTML = inputNum.value
            inputNum.value = ''
            signDisplay.innerHTML = arith;
        }
        usedFnx = []
    }
    
    function calculate() {
        if (!power){
            return
        }
        if (firstNum.innerHTML.trim()=== '' && !special.innerHTML){
            alert('Input numbers you want to calculate')
            return
        }
        if (firstNum.innerHTML && !signDisplay.innerHTML){
            inputNum.value
            equalSpan = ''
        }
        if (signDisplay.innerHTML && secondNum.innerHTML && !answer.length) {
            compute(firstNum.innerHTML, signDisplay.innerHTML, secondNum.innerHTML )
            answer.splice(0,1,inputNum.value)
        }else if(signDisplay.innerHTML && !secondNum.innerHTML){
            compute(firstNum.innerHTML, signDisplay.innerHTML, firstNum.innerHTML )
            answer.splice(0,1,inputNum.value)
        }
        else if (signDisplay.innerHTML && secondNum.innerHTML && answer.length){
            firstNum.innerHTML = inputNum.value
            compute(firstNum.innerHTML, signDisplay.innerHTML, secondNum.innerHTML )
            answer.splice(0,1,inputNum.value)
        }else {
            if (special.innerHTML && usedFnx.length) {
                fnx(usedFnx[0]) || showValue(usedFnx[0])
                equalSpan = ''
            }
        }

        equalSpan.innerHTML = '='  
    }

    function compute(num1, sign, num2) {
        if (sign === '+'){
            inputNum.value = Number(num1) + Number(num2)
        }else if (sign === '-'){
            inputNum.value = Number(num1) - Number(num2)

        }else if (sign === '*'){
        inputNum.value = Number(num1) * Number(num2)
    } else if (sign === '/'){
        inputNum.value = Number(num1) / Number(num2)
    }else if (sign === '^'){
        inputNum.value = Number(num1) ** Number(num2)
    }else{
        return
    }
    }

    function showValue(show) {
        if (show === 'pi' && inputNum.value){
            clearSpan()
            special.innerHTML = `pi * ${inputNum.value} =`
            inputNum.value = inputNum.value * Math.PI
            errorCater()
        }else if (!inputNum.value && !firstNum.innerHTML && show == 'pi'){
            special.innerHTML = `pi =`
            inputNum.value = Math.PI
        }else if (!inputNum.value && !firstNum.innerHTML && show != 'pi'){
            special.innerHTML = `Exp =`
            inputNum.value = Math.E
        }
        else{
            clearSpan()
            special.innerHTML = `Exp * ${inputNum.value} =`
            inputNum.value = inputNum.value * Math.E
            errorCater()
        }
        usedFnx.splice(0,1,show)
    }

    function  fnx(params) {
        if (!power){
            return
        }
        if (inputNum.value.trim() === '') {
            return
        }
        if (signDisplay.innerHTML && !answer.length) {
            return
        }
        if (params === 'sin'){
            clearSpan()
            specialFill(params)
            inputNum.value = Math.sin(inputNum.value)
            errorCater()
        }else if(params === 'cos'){
            clearSpan()
           specialFill(params)
            inputNum.value = Math.cos(inputNum.value)
            errorCater()
        }else if(params === 'tan'){
            clearSpan()
            special.innerHTML = `tan ${inputNum.value} =`
            inputNum.value = Math.tan(inputNum.value)
            errorCater()
        }else if (params === 'log'){
            clearSpan()
            special.innerHTML = `log ${inputNum.value} =`
            inputNum.value = Math.log(inputNum.value)
            errorCater()
        }else if (params === 'ln'){
            clearSpan()
            special.innerHTML = `ln ${inputNum.value}`
            inputNum.value = Math.LN10(inputNum.value)
            errorCater()
        }else if(params === 'sqr'){
            clearSpan()
            specialFill()
            inputNum.value = inputNum.valuee ** 2
            errorCater()
        }else if(params === 'sqrt'){
            clearSpan()
            specialFill()
            inputNum.value = Math.sqrt(inputNum.value)
            errorCater()
        }else if(params === 'recip'){
            clearSpan()
            special.innerHTML = `1/${inputNum.value} =` 
            inputNum.value = 1/inputNum.value
            errorCater()
        }else if(params === 'sqrt'){
            clearSpan()
            specialFill()
            inputNum.value = Math.sqrt(inputNum.value)
            errorCater()
        }else if(params === '%'){
            clearSpan()
            special.innerHTML = `${inputNum.value}/ 100`
            inputNum.value = inputNum.value/100
            errorCater()
        }else{
            if (params === 'neg') {
                clearSpan()
                special.innerHTML = `-${inputNum.value} =`
                inputNum.value = -inputNum.value
            }         
      
        }
        usedFnx.splice(0,1,params) 
        console.log(usedFnx);
        
        usedSign = []
    }
    function specialFill(spec) {
        special.innerHTML = `${spec} ${inputNum.value} =`
    }

    function errorCater(params) {
        if (special.innerHTML && isNaN (inputNum.value)) {
            clearSpan()
            special.innerHTML = ''
            inputNum.value = `Math Error`
            return
        }
    }