const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password="";
const passwordLength=document.querySelector(".password");
const slider=document.querySelector("#slider");
slider.addEventListener('input',()=>{
    passwordLength.textContent=slider.value
});
const uppercaseCb=document.querySelector("#uppercase");
const lowercaseCb=document.querySelector("#lowercase");
const numberCb=document.querySelector("#number");
const symbolCb=document.querySelector("#symbol");

let checkCount=0;
const allCheckBox=document.querySelectorAll(".check");
allCheckBox.forEach(function(cb){
    cb.addEventListener('change',updateCheck)
})
function updateCheck(){
    checkCount=0;
    allCheckBox.forEach(function(check){
        if(check.checked) checkCount++;
    })
}

const display=document.querySelector(".password-display");

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCb.checked) hasUpper = true;
    if(lowercaseCb.checked) hasLower = true;
    if(numberCb.checked) hasNumber = true;
    if(symbolCb.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol)){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol)){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

const indicator=document.querySelector(".indicator");
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateNumber(){
    return getRandomInteger(1, 10);
}
function generateLowercase(){
    return String.fromCharCode(getRandomInteger(97, 123));
 }
 function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65, 91));
}
function generateSymbol(){
    const randomIndex = getRandomInteger(0, symbols.length);
    return symbols.charAt(randomIndex);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    str = array.join("");
    return str;
}

const generateButton=document.querySelector(".generate-password")
function generatePassword(){
    if(checkCount <= 0){
        alert('Atleast check one checkbox');
        return;
    }

    if (passwordLength.textContent < checkCount) {
        passwordLength.textContent = checkCount;
        slider.value=checkCount;
        
    }

    password = "";

    let checkedCbArray = [];

    if(uppercaseCb.checked) checkedCbArray.push(generateUppercase);
    if(lowercaseCb.checked) checkedCbArray.push(generateLowercase);
    if(numberCb.checked) checkedCbArray.push(generateNumber);
    if(symbolCb.checked) checkedCbArray.push(generateSymbol);

    for(let i=0; i < checkedCbArray.length; i++){
        password += checkedCbArray[i]();
    }
    for(let i=0; i < (passwordLength.textContent - checkedCbArray.length); i++){
        let randomIndex = getRandomInteger(0, checkedCbArray.length);
        password += checkedCbArray[randomIndex]();
    }

    password = shuffleArray(Array.from(password));
    display.value = password;
    console.log('password :', display);
    calcStrength();
}

generateButton.addEventListener('click', generatePassword);
const copybtn=document.querySelector("#image");
copybtn.addEventListener('click', function(){
    
})