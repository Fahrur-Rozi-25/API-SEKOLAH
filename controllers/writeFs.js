
import fs  from 'fs';
import path from 'path';




export const FS = (req, res) => {
    const { day, task, expirationDays } = req.body;
  
    if (!day || !task || !expirationDays) {
      return res.status(400).json({ error: 'Harap isi semua field.' });
    }
  
    const filePath = path.join(process.cwd(), `/data/PR/${day}.json`);
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err && err.code !== 'ENOENT') {
        console.error(err);
        return res.status(500).json({ error: 'Terjadi kesalahan saat membaca data.' });
      }
  
      let tasks = [];
  
      if (!err) {
        try {
          tasks = JSON.parse(data);
        } catch (parseErr) {
          console.error(parseErr);
          return res.status(500).json({ error: 'Terjadi kesalahan saat memproses data.' });
        }
      }
  
      const expirationTime = Date.now() + expirationDays * 24 * 60 * 60 * 1000;
      tasks.push({ task, expiration: expirationTime });
  
      fs.writeFile(filePath, JSON.stringify(tasks), 'utf8', err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan data.' });
        }
        res.status(200).json({ message: 'Data pekerjaan rumah berhasil disimpan.' });
      });
  
      // Mengatur penghapusan task yang kadaluarsa setelah jangka waktu tertentu
      setTimeout(() => {
        const remainingTasks = tasks.filter(t => t.expiration > Date.now());
        fs.writeFile(filePath, JSON.stringify(remainingTasks), 'utf8', err => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Task kadaluarsa pada ${day} telah dihapus setelah ${expirationDays} hari.`);
          }
        });
      }, expirationDays * 24 * 60 * 60 * 1000);
    });
  }