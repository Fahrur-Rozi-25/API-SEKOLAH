import PRModel from "../Database/models/PR.js";

export const postPR = (req, res) => {
  const { mapel, deadline, ket, penulis } = req.body;

  if (!mapel || !deadline || !ket || !penulis) {
    return res.status(400).json({ error: 'Isian mapel, deadline, ket, dan penulis harus diisi.' });
  }

  const waktuKedaluwarsa = new Date(); // Waktu saat ini
  waktuKedaluwarsa.setHours(waktuKedaluwarsa.getHours() + 1);

  // Cari PR dengan mapel yang sama
  PRModel.findOne({ mapel })
    .then(existingPR => {
      if (existingPR) {
        existingPR.ket = `${existingPR.ket}, ${ket}`;
        existingPR.penulis = penulis; // Update penulis jika diperlukan
        return existingPR.save();
      } else {
        const newPRData = new PRModel({
          mapel,
          deadline: new Date(deadline),
          ket,
          penulis,
          waktuKedaluwarsa // Menambahkan waktu kedaluwarsa
        });
        return newPRData.save();
      }
    })
    .then(() => {
      return res.status(201).json({ message: 'Data PR berhasil disimpan.' });
    })
    .catch(error => {
      return res.status(500).json({ error: 'Gagal menyimpan data PR: ' + error.message });
    });
}
