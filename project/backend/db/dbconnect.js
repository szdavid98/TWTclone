import mongoose from "mongoose";

const connectdb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MGB connected:${conn.connection.host} `)
    }catch (error){
        console.error(`Error connectiong to MongoDB: ${error.message}`)
        process.exit(1);
    }
    
}

export default connectdb