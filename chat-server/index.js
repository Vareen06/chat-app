const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {createServer} = require('http')
const server = createServer(app)
const setUpSocket = require('./socket/socket')
const router = require('./routes/userRoutes')
const cors = require('cors')

require('dotenv').config()
app.use(cors());

app.use(express.json())
app.use('/',router)


const PORT =  process.env.PORT || 3000

mongoose.connect(process.env.SERVER,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database connection error:', err));


server.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}`)
})

setUpSocket(server);
app.get('/',(req,res)=>{
    res.json("Hello")
})
