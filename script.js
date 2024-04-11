const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const symbolsCheck = document.querySelector("#symbols");
const numbersCheck = document.querySelector("#numbers");
const indicator = document.querySelector("[data-indicator ]");
const generateBtn = document.querySelector('.generateButton');
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`@#$%^&*()_-+={[}]|\:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min) + "100%");

}

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    setIndicator("#ccc");
}



function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min)) +min;
}

function generateRndNum(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const rndNum = getRndInteger(0,symbols.length);
    return symbols.charAt(rndNum);  
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked){
        hasUpper = true;
    }

    if(lowercaseCheck.checked){
        hasLower = true;
    }

    if(numbersCheck.checked){
        hasNum = true;
    }
    if(symbolsCheck.checked){
        hasSymbol = true;
    }

    if(hasUpper && hasLower && (hasNum||hasSymbol) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }


}

async function copyContent(){

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";

    }
    catch(e){
        copyMsg.innerText = "failed";

    }
    
    //copied wala message visible krna
    copyMsg.classList.add("active");

    setTimeout(function(){
        copyMsg.classList.remove("active");
    },2000);

}

inputSlider.addEventListener('input',function(e){
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',function(){
    if(passwordDisplay.value){
        copyContent();
    }
})

console.log("Remaining adddition done");


function handleBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    //specify min password length 

    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

function shufflePassword(array){
    //fisher Yates Method on array

    for(let i = array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str+= el));
    return str;



}

console.log("Remaining adddition done");


allCheckBox.forEach( function(checkbox){
    checkbox.addEventListener('change',handleBoxChange);
})

console.log("Remaining adddition done");



if(generateBtn){
    generateBtn.addEventListener('click',()=>{
        //none of the checkbox are selected
        if(checkCount<=0){
            return;
        }
        
        if(passwordLength<checkCount){
            passwordLength = checkCount;
            handleSlider();
        }
    
        //LEts start the journey to find new password
    
        //remove old password
    
        password = "";
    
        //lets put the stuff mentioned by checkboxes
        // if(uppercaseCheck.checked){
        //     password += generateUpperCase();
        // }
    
        // if(lowercaseCheckcaseCheck.checked){
        //     password += lowercaseCheck();
        // }
    
        // if(symbolsCheck.checked){
        //     password += generateSymbol();
        // }
    
        // if(numbersCheck.checked){
        //     password += getRndInteger();
        // }
    
        let funcArr = [];
    
        if(uppercaseCheck.checked){
            funcArr.push(generateUpperCase);
        }
    
        
        if(lowercaseCheck.checked){
            funcArr.push(generateLowerCase);
        }
    
        
        if(numbersCheck.checked){
            funcArr.push(generateRndNum);
        }
    
        
        if(symbolsCheck.checked){
            funcArr.push(generateSymbol);
        }
    
        //compulsory addition
    
        for(let i = 0; i<funcArr.length;i++){
            password += funcArr[i]();
    
        }
    
        //remaining
    
        for(let i = 0;i<passwordLength-funcArr.length;i++){
            let rndIndex = getRndInteger(0,funcArr.length);
            password += funcArr[rndIndex]();
        }
    
        console.log("Remaining adddition done");
    
    
        //Shuffle the password
    
        password = shufflePassword(Array.from(password));
        console.log("Shuffling done");
        
    
        //show on ui
        passwordDisplay.value = password;
        console.log("UI adddition done");
    
        //calculate the strength
        calcStrength();
    
    })

    
    
    
    
    
    
    //set strength circle color to gray
    
    //copyContent
    //HandleSlider
    //generatePassword()
    //setIndicator
    
    //getRandomIntegr(min,max);
    //getRandomUpercase
    //getRandomLowerCase
    //getRandomSymbol
    //getRandomNumber
    

}

console.log(password);

