const express = require('express')
const app = express()
const port = 3000

const {Board, Sensor, Led} = require("johnny-five");
const board = new Board();


const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

board.on("ready", () => {

    const led = new Led(13);
    const sensor = new Sensor("A0");


    app.post('/light/auto', (req, res, next) => {

        led.blink(1000);
        sensor.pause();
        res.send('Ok, auto');
    });

    app.post('/light/manual', (req, res, next) => {

        sensor.resume();
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

    app.get('/sensor', (req, res, next) => {
        res.json({
            sensor: parseFloat( ((sensor?.value / 1024) * 100)+'').toFixed(2)
        });
    });


});


app.listen(port, () => {
    console.log(`Smart Home app listening on port ${port}`)
})