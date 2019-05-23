const express = require('express')
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())
const path = require('path')

const port = 2222

const db = require("./db")
const collection = "todo"

db.connect((err) => {
    if (err) {
        console.log('unable to connect to database')
        process.exit(1)
    } else {
        app.listen(port, () => {
            console.log(`connected to database, app listening on port ${port}` )
        })
    }
})