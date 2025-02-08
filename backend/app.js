const express = require('express')
const app = express()
const port = 3003

const bodyParse= require('body-parser')
const dotnev=require('dotenv')
dotnev.config()

const mongoose=require('mongoose')
const auth=require('./routes/auth.js')  
const checkUser=require('./routes/UserCheck.js')
const chatapis=require('./routes/chatapis.js')
const cors=require('cors')
const messagesroute=require('./routes/messagesapis.js')
  
mongoose.connect(process.env.Mongo_Url);
mongoose.connection.on("connected",()=>{
  console.log(`connected on ${process.env.Mongo_Url}`)
})

mongoose.connection.on("error",()=>{
  console.log(`error on ${process.env.Mongo_Url}`)
})


app.use(cors())
app.use(bodyParse.urlencoded({extended:true}))
app.use(bodyParse.json())
app.use('',auth)
app.use('',checkUser)
app.use('',chatapis)
app.use('',messagesroute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})