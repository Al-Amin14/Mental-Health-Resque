const express = require('express')
const app = express()
const reportRoutes = require('./routes/report.js');

const port = 3003

const bodyParse= require('body-parser')
const dotnev=require('dotenv')
dotnev.config()

const mongoose=require('mongoose')
const auth=require('./routes/auth.js')  
const checkUser=require('./routes/UserCheck.js')
const cors=require('cors')
  
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
app.use('', reportRoutes);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
