import mongoose from "mongoose";

const PRSchema = new mongoose.Schema({
    mapel: {
        type: String,
        required: true // Opsional, tergantung pada kebutuhan Anda
      },
    deadline: {
        type: Date, // Menggunakan tipe data Date untuk tanggal batas waktu
        required: false // Opsional, tergantung pada kebutuhan Anda
      },
      ket: {
        type: String,
        required: true
      },
    penulis: String,
    waktuKedaluwarsa: Date

})

const PRModel = mongoose.models.PR || mongoose.model('PR' , PRSchema)
export default PRModel