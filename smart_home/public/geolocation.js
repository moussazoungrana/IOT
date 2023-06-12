let sunrise;
let sunset;
let time = new Date(Date.now());
const textSunset = document.querySelector('#text-sunset');
const textSunrise = document.querySelector('#text-sunrise');

function handleSun() {

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            fetch(`https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}&date=today&formatted=0`,
                {
                    method: 'GET',
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);

                    sunrise = data.results.sunrise.split(" ")[0];
                    const time_sunrise = new Date(sunrise).toLocaleTimeString('en',
                        { timeStyle: 'short', hour12: false, timeZone: 'UTC' })

                    console.log(time_sunrise)
                    textSunrise.innerHTML =time_sunrise;

                    sunset = data.results.sunset.split(" ")[0];
                    const time_sunset = new Date(sunset).toLocaleTimeString('en',
                        { timeStyle: 'short', hour12: false, timeZone: 'UTC' })

                    console.log(time_sunset)
                    textSunset.innerHTML =time_sunset;
                   const local_time = time.toTimeString().split(" ")[0];


                    if (time_sunrise < local_time && time_sunset > local_time){
                        console.log('Sunrise')
                        fetch('http://localhost:3000/light/sunrise',
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
                        console.log('sunset')
                        fetch('http://localhost:3000/light/sunset',
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
    handleSun();
});