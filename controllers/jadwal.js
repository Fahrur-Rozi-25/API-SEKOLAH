import { schedule } from "../data/jadwal.js";


export const getJadwal = (req, res) => {
    const day = req.params.day;
  
    if (schedule.hasOwnProperty(day)) {
      res.json(schedule[day]);
    } else {
      res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    }
  }