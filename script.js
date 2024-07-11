const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
// let img = document.querySelectorAll("img");

let btnForm = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


for (let select of dropdown){
    for(code in countryList){

        let newOptions = document.createElement("option")
        newOptions.innerHTML = code;
        newOptions.value = code;
        select.append(newOptions);
        if(select.name === "from" && code === "USD"){
            newOptions.selected = "selected";
        }else if(select.name === "to" && code === "INR"){
            newOptions.selected = "selected";
        }
        // img.setAttribute("src",`https://flagsapi.com/${countryList[code]}/flat/64.png`);

    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
    
}


const updateFlag = (element)=>{

    // console.log(element.innerHTML);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let imgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = imgSrc;

}


const updateExchangeRate = async () =>{
    let showAmout = document.querySelector(".amount input");
    let amtVal = showAmout.value;
    if(amtVal === "" || amtVal <1){
        amtVal = 1;
        showAmout.value = "1";
    }    

    // console.log(fromCurr.value,toCurr.value);

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);

    let rate1 = data[fromCurr.value.toLowerCase()];
    let rate = rate1[toCurr.value.toLowerCase()];
    // console.log(rate,);
    

    let finalAmout = amtVal*rate;
    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmout}${toCurr.value}`
}


btnForm.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});


window.addEventListener("load",updateExchangeRate());































// const url = "https://cat-fact.herokuapp.com/facts";


// const getFacts = async () => {
//     console.log("getting data ..........")
//     let response = await fetch(url);
//     console.log(response); //json format
//     let data = await response.json();
//     console.log(data);
// }