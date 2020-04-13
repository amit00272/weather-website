

console.log("Cleint side js loaded");



const form = document.querySelector("form");
const input= document.querySelector("input");
const m1= document.querySelector("#msg1");
const m2= document.querySelector("#msg2");


form.addEventListener( 'submit',  (e) => {
    e.preventDefault()

    m1.textContent = "Loading..."

    fetch('http://localhost:3000/weather?address='+input.value).then( (response) => {

    response.json().then( (data) => {
        if(data.error) {
            m1.textContent = data.error;

            return;
        }

        m1.textContent = data.forcast;
        m2.textContent = data.location;
       // console.log(data);
    })


    });

})