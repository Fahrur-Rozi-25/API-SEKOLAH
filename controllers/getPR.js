import PRModel from "../Database/models/PR.js";

export const getPR = (req, res) => {
  const day = req.params.day; // Ambil parameter day dari URL

  let mataPelajaran = [];

  // Sesuaikan daftar mata pelajaran berdasarkan hari
  if (day === 'senin') {
    mataPelajaran = ['Fisika', 'SKI', 'Matematika Wajib' , 'Bahasa Arab' , 'PPKN'];
  } else if (day === 'selasa') {
    mataPelajaran = ['Seni Budaya', 'Matematika Minat', 'Bahasa Inggris' , 'Matematika Wajib' , 'Akidah Akhlak'];
  } else if (day === 'rabu') {
    mataPelajaran = ['PJOK', 'Bahasa Jawa', 'Bahasa Inggris' , 'Sejarah' , 'BK'];
  } else if (day === 'kamis') {
    mataPelajaran = ['Quran Hadist', 'Biologi', 'Bahasa Indonesia' , 'Fikih' , 'SKI'];
  } else if (day === 'jumat') {
    mataPelajaran = ['Fisika', 'Kimia', 'Ekonomi'];
  } else if (day === 'sabtu') {
    mataPelajaran = ['Bahasa Indonesia', 'Biologi', 'Kimia' , 'Matematika Minat' , 'Prakarya'];
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
