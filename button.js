const  inputslider = document.querySelector("[data-lengthSlider]");
const lengthDispaly = document.querySelector("[data-lengthNumber]");
const paswordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const copyBtn = document.querySelector("[data-copy]");
const UppercaseCheck = document.querySelector("#Uppercase");
const LowercaseCheck = document.querySelector("#Lowercase");
const NumberCheck = document.querySelector("#Number");
const SymbolsCheck = document.querySelector("#Symbols");
const indicator = document.querySelector("[ data-indicator]");
const generateBtn = document.querySelector(".genearteBtn");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const Symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 20;
let checkCount=0;
handleSlider();
setIndicator("#ccc");


function handleSlider(){
    inputslider.value = passwordLength;
    lengthDispaly.innerText = passwordLength;

}

function setIndicator(color){
    indicator.style.background = color;
}

function getRndInteger(min,max){
return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbols(){
    const randNum = getRndInteger(0,Symbols.length);
    return Symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (UppercaseCheck.checked) hasUpper = true;
    if (LowercaseCheck.checked) hasLower = true;
    if (NumberCheck.checked) hasNum = true;
    if (SymbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(paswordDisplay.value);
       copyMsg.innerText='copied';
    }
    catch(e){
        copyMsg.innerText='failed';

    }
 copyMsg.classList.add("active");

 setTimeout(() => {
    copyMsg.classList.remove("active");

 },2000);

}  

function shufflepassword(array){
    
 //Fisher Yates Method
 for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
let str = "";
array.forEach((el) => (str += el));
return str;

}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckbox.forEach( (checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    });
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputslider.addEventListener('input', (e) => {
passwordLength = e.target.value;
handleSlider();
})

copyBtn.addEventListener('click',() => {
if(paswordDisplay.value)
copyContent(); 
})

generateBtn.addEventListener('click',()=>{
if(checkCount<=0) return;

if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
}

console.log("starting the journey");
password = "";

let funcArr = [];
if(UppercaseCheck.checked)
  funcArr.push(generateUpperCase);

  if(LowercaseCheck.checked)
  funcArr.push(generateLowerCase);

  if(NumberCheck.checked)
  funcArr.push(generateRandomNumber);

  if(SymbolsCheck.checked)
  funcArr.push(generateSymbols);

  for(let i=0;i<funcArr.length;i++){
    password += funcArr[i]();
  }
  console.log("compulsory addition done");
   
  for(let i=0;i<passwordLength-funcArr.length;i++){
    let randIndex = getRndInteger(0,funcArr.length);
    console.log("randIndex" + randIndex);
    password += funcArr[randIndex]();

}
    console.log("remaning addition done");
   password = shufflepassword(Array.from(password));
   console.log("shuffling done");
   paswordDisplay.value = password;
   console.log("ui addition done");
   calcStrength();


});