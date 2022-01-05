require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const credentials = require('./credentials')
const PORT = process.env.PORT || 5000
require('./config/db.js')
const route = require("./routes")
app.use(cors())
app.use(cookieParser({ secret: credentials.COOKIE_SECRET }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
route(app)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', "build", "index.html"))
    })
}
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})
