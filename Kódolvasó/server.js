import express from 'express';
import dotenv from 'dotenv'
import { olvas } from './olvasoprogi.js';

import connectMongoDB from './connectMongoDB.js'



dotenv.config();
const app = express()
const PORT = 5000;

app.use(express.json())//to pharse
app.use(express.urlencoded({extended:true}));



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB()
    olvas()
})