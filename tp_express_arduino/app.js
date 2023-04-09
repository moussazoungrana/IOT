const express = require('express')
const app = express()
const port = 3000

const { Board, Led } = require("johnny-five");
const board = new Board();

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.post('/light/auto', (req, res, next)=>{

   /* const led = new Led(13);
    board.on("ready", () => {
        led.blink(1000);
    });
    */
    res.send('Ok, auto');
});

app.post('/light/manual', (req, res, next)=>{

  /*  const sensor = new Sensor("A0");
    const led = new Led(13);
    board.on("ready", () => {

        sensor.on("change", value => {
            console.log("Sensor: ");
            console.log("  value  : ", (sensor.value / 1024)*100);
            console.log("-----------------");

            if (sensor.value < 300){
                led.on();
            } else {
                led.off();
            }
        });
    });

   */
    res.send('Ok, manual');
});


app.listen(port, () => {
    console.log(`Smart Home app listening on port ${port}`)
})