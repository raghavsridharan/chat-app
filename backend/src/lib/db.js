import mongoose from "mongoose"; // to connect with database 

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch(error){
        console.log("Mongodb connection error" , error);
    }


}