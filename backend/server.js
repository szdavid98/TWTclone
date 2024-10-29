import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import notificationRoutes from "./routes/notification.routes.js";
import readData from './routes/read.data.routes.js'
import connectMongoDB from './db/connectMongoDB.js'
import { cikkbeolvasas } from '../backend/controllers/post.controller.js';
import readline from 'node:readline';
import { sendmail } from './email/email.sender.js';
import { secret } from './email/code.generator.js';


const olvas = async () =>{
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  {
    rl.on(`line`, name => {
      cikkbeolvasas(name)
      
      return rl
    });
  }
}





dotenv.config();
const app = express()
const PORT = process.env.PORT;
const corsOptions={
    origin: "https://cuddly-carnival-jp9vpvwgq7rcg67-8000.app.github.dev/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json())//to pharse
app.use(express.urlencoded({extended:true}));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/read", readData)
app.use("/api/notifications", notificationRoutes);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB()
    olvas();
    
    
    
})
