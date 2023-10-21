import PRModel from "../Database/models/PR.js";

export const getPR = (req, res) => {
  const day = req.params.day; // Ambil parameter day dari URL

  let mataPelajaran = [];

  // Sesuaikan daftar mata pelajaran berdasarkan hari
  if (day === 'senin') {
    mataPelajaran = ['Matematika', 'IPA', 'IPS'];
  } else if (day === 'selasa') {
    mataPelajaran = ['ARAB', 'KIMIA', 'IPS'];
  } 

  PRModel.find({ mapel: { $in: mataPelajaran } })
    .then(data => {
      const hasil = {};

      // Inisialisasi hasil dengan semua mata pelajaran diisi dengan strip (-)
      for (const mapel of mataPelajaran) {
        hasil[mapel] = {
          ket: '-'
        };
      }

      // Isi hasil dengan data yang ditemukan
      for (const item of data) {
        const { mapel, ket, penulis } = item;
        if (penulis) {
          hasil[mapel] = {
            ket,
            penulis
          };
        } else {
          hasil[mapel] = {
            ket
          };
        }
      }

      return res.status(200).json(hasil);
    })
    .catch(error => {
      return res.status(500).json({ error: 'Gagal mengambil data PR: ' + error.message });
    });
}
