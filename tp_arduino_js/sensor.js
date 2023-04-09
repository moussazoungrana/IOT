const { Board, Sensor, Led } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
    // Create a new generic sensor instance for
    // a sensor connected to an analog (ADC) pin
    const sensor = new Sensor("A0");
    const led = new Led(13);

    // When the sensor value changes, log the value
    sensor.on("change", value => {
        console.log("Sensor: ");
        console.log("  value  : ", (sensor.value / 1024)*100);
        console.log("-----------------");
        console.log(led.value);

        if (sensor.value < 500){
            led.on();
            //led.fade(255,2000);
            //led.fadeIn(2000);
        }
        else {
            led.off();
            //led.fadeOut(200);
        }
    });
});
