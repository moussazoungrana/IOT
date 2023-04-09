const btnAuto = document.querySelector('#btn-auto');
const btnManual = document.querySelector('#btn-manual');
const baseUri = 'http://localhost:3000';

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
                console.log(res.status)
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
                console.log(res.status)
                return res.text();
            })
            .then((data) => console.log(data))
            .catch(function (err) {
                console.log(err)
            });
    });


}
document.addEventListener('DOMContentLoaded', function () {
    initialize();
});
