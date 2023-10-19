//init
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./Route/userRoute')
const bookRoute = require('./Route/bookRoute')
require('dotenv/config')

//decl
const app = express()

//middleware
app.use(express.json())

app.use(cors())

//default route
app.get('/',(req,res)=>{
    console.log('running on 5000 port');
})

//main  route
app.use('/api/user',userRoute)
app.use('/api/book',bookRoute)

app.listen(process.env.PORT,()=>{
    console.log('running on 5000 port');
})

async function db() {
    try {
        const res = await mongoose.connect(process.env.DB)
        const data = await res.default;
        console.log(data.STATES.connected);
    } catch (error) {
        console.log(error.message);
    }
}
db()