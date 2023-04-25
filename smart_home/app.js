const express = require('express')
const app = express()
const port = 3000



const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile('index.html');
});


const lightRouting = require('./routes/light')
app.use('/light', lightRouting)



app.listen(port, () => {
    console.log(`Smart Home app listening on port ${port}`)
})