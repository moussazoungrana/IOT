const btnAuto = document.querySelector('#btn-auto');
const btnManual = document.querySelector('#btn-manual');
const sensorText = document.querySelector('#sensor-text');
const baseUri = 'http://localhost:3000';
let timerInterval = null;

function initialize(){
    if (!btnAuto || !btnManual) return;

    btnAuto.addEventListener('click', function (){
        btnAuto.classList.add('active');
        if (btnManual.classList.contains('active')){
            btnManual.classList.remove('active');
        }

        fetch(baseUri+'/light/auto',
            {
                method: 'POST',
            })
            .then((res) => {
                return res.text();
            })
            .then((data) => console.log(data))
            .catch(function (err) {
                console.log(err)
            });
    });

    btnManual.addEventListener('click', function (){
        btnManual.classList.add('active');
        if (btnAuto.classList.contains('active')){
            btnAuto.classList.remove('active');
        }

        fetch(baseUri+'/light/manual',
            {
                method: 'POST',
            })
            .then((res) => {
                return res.text();
            })
            .then((data) => console.log(data))
            .catch(function (err) {
                console.log(err)
            });
    });

    clearInterval(timerInterval)
    timerInterval = setInterval(() => {
        fetch(baseUri+'/sensor',
            {
                method: 'GET',
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                sensorText.innerText = data.led + " %";
            })
            .catch(function (err) {
                console.log(err)
            });
    },500);


}
document.addEventListener('DOMContentLoaded', function () {
    initialize();
});
