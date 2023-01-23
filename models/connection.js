const mongoose = require('mongoose')
////////////////////
//Database Connection
////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL,CONFIG)

mongoose.connection
    .on("open", ()=> console.log("CONNECTED TO MONGOOSE"))
    .on("close", ()=> console.log("DISCONNECTED FROM MONGOOSE WTF"))
    .on("error", (error)=>console.log(error))


module.exports = mongoose