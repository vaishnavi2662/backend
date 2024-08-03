import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config(
    {
        path:"./c.env"
    }
)
const connectDB=async()=>{
   
    console.log(process.env.MONGOOSE_URI);
        const connectionInstance=await mongoose.connect("mongodb+srv://kharchevaishnavi1:XA3udRWguBd6w5pe@cluster0.ml88kni.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/expenses")
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  
}

export{connectDB}
