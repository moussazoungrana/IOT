const express = require('express')
const router = express.Router()

const {Board, Sensor, Led} = require("johnny-five");
const board = new Board();

let aggregationData = [];
let aggregationAverage = 0;

board.on("ready", () => {

    const led = new Led(13);
    const sensor = new Sensor("A0");

    sensor.on("data", function () {
        //aggregation
        if (aggregationData.length === 10) {
            aggregationData.shift();
        }

        aggregationData.push(sensor.value);
        let sum = aggregationData.reduce((acc, val) => acc + val, 0);
        aggregationAverage = sum / aggregationData.length;
        console.log('Sensor value: ' + aggregationData + " || Average : " + aggregationAverage);
    });


    router.post('/auto', (req, res, next) => {

        sensor.disable();
        //led.on();

        led.blink(1000);
        res.send('Ok, auto');
    });

    router.post('/manual', (req, res, next) => {

        sensor.enable();
        led.stop();

        sensor.on("change", value => {
            console.log("Sensor: ");
            console.log("  value  : ", (sensor.value / 1024) * 100);
            console.log("-----------------");

            if (sensor.value < 300) {
                led.on();
            } else {
                led.off();
            }
        });

        res.send('Ok, manual');
    });


    router.get('/sunrise', (req, res) => {
        //enable the function
        sensor.enable();
        //stop the blinking
        led.stop();

        // When the sensor value changes, log the value
        sensor.on("change", value => {
            console.log("Sensor: ");
            console.log("  value  : ",  (sensor.value / 1024) * 100 + " %" /*value for the sensor*/);
            console.log("-----------------");

            if(sensor.value < 300){
                led.on();
            }else{
                led.off();
            }
        });
        res.send('The sun');
    })



    router.post('/sunset', (req, res) => {

        //stop the sensor when switching method
        sensor.disable();

        led.on();
        //response
        res.send('The night');
    })

});

router.get('/sensor', (req, res, next) => {
    return res.json({
        sensor: parseFloat(((aggregationAverage / 1000) * 100) + '').toFixed(2)
    });
});

module.exports = router