import express from "express"
import router from "./route/mainRoute.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import { config } from "dotenv";
config();

const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Membuat variabel global untuk koneksi database
let dbConnection;

// Fungsi untuk menghubungkan ke database
const connectDB = async () => {
  try {
    dbConnection = await mongoose.connect(process.env.MongoDB_URI);
    console.log('Berhasil terhubung ke database');
  } catch (error) {
    console.error('Koneksi database terputus:', error);
    // Logika penyambungan kembali di sini
    setTimeout(connectDB, 2000); // Menghubungkan kembali setelah 2 detik
  }
}

connectDB(); // Memanggil fungsi pertama kali

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
