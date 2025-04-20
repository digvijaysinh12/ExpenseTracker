
import mongoose from 'mongoose';
import colors from 'colors';

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white)
    }catch(error){
        console.log(`${error}`.bgRed)
    }
}

export default connectDb;