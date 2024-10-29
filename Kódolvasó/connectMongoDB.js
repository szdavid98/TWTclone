import mongoose from "mongoose";

const connectMongoDB = async () =>{
    const MONGO_URI='mongodb+srv://pokerontheway:199810@cluster0.gnngb.mongodb.net/TWTcopy-db?retryWrites=true&w=majority&appName=Cluster0'
    try{
        const conn = await mongoose.connect(MONGO_URI)
        //console.log(`MGB connected:${conn.connection.host} `)
    }catch (error){
        console.error(`Error connectiong to MongoDB: ${error.message}`)
        process.exit(1);
    }
    

}

export default connectMongoDB