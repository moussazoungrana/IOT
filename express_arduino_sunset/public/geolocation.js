let sunrise;
let sunset;
let time = new Date(Date.now());
let str1,str2,str3;
let totalSeconds1,totalSeconds2,totalSeconds3;
function showPosition() {


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
            document.getElementById("result").innerHTML = positionInfo;
            fetch(`https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}&date=today`,
                {
                    method: 'GET',
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);


// compare them

                    if (totalSeconds1 < totalSeconds3 && totalSeconds3 > totalSeconds2){
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
                    }
                    else {
                        fetch(baseUri+'/light/on',
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
                    }

                })
                .catch(function (err) {
                    console.log(err)
                });
        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }

}

document.addEventListener('DOMContentLoaded', function () {
    showPosition();
});