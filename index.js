require("dotenv").config()
const express = require("express")
/* Import our client structure */
const Bot = require("./src/struct/Bot")
const client = new Bot()
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req, res) => {
    console.log("Getting a [GET] request")
    res.send({ status: "sccuess", msg: "you are great" })
})
app.listen(8080)
console.log("Now listen to port 8080")
/* Call our start function to load the bot instance */
;(async () => await client.start(process.env.TOKEN))()
