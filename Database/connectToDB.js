import mongoose from "mongoose";
import { config } from "dotenv";
config();


const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI)
        console.log('Terhubung ke MongoDB');
    } catch (error) {
        console.error('Kesalahan koneksi MongoDB:', error.message);
    }
}

export default connectToDB
