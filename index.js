const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require("cors")

const UserRouter = require('./Router/userRouter')

dotenv.config()

const app = express()

const port = process.env.PORT

const connectDbAndStartServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connect successful");
        app.listen(port, () => {
            console.log(`server is runnig at http://localhost:${port}`);
            
        })
    }catch(err){
        console.log(err);
    }
}

app.use(cors())
app.use(express.json({limit:"10mb"}))

app.use("/api/user", UserRouter)

app.get("/", (req, res) => {
    res.send("welcome")
})


connectDbAndStartServer()