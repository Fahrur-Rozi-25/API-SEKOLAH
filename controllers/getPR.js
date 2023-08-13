import path from 'path'
import fs  from 'fs';




export const getPR = (req, res) => {
    const day = req.params.day.toLowerCase();
    const filePath = path.join(process.cwd(), `/data/PR/${day}.json`);
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err && err.code === 'ENOENT') {
        return res.status(404).json({ error: 'Data tidak ditemukan untuk hari tersebut.' });
      } else if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
      }
  
      let tasks = [];
  
      try {
        tasks = JSON.parse(data);
      } catch (parseErr) {
        console.error(parseErr);
        return res.status(500).json({ error: 'Terjadi kesalahan saat memproses data.' });
      }
  
      const currentDate = Date.now();
      const tasksWithRemainingDays = tasks.map(task => {
        const remainingDays = Math.ceil((task.expiration - currentDate) / (24 * 60 * 60 * 1000));
        return {
          task: task.task,
          remainingExpirationDays: remainingDays
        };
      });
  
      res.status(200).json(tasksWithRemainingDays);
    });
  }