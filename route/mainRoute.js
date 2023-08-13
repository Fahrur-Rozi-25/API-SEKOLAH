import Express from "express";
import { data } from "../data/dummy.js";
import { getJadwal } from "../controllers/jadwal.js";
import { FS } from "../controllers/writeFs.js";
import { getPR } from "../controllers/getPR.js";

const router = Express.Router()

router.get('/hari' , data)
router.get('/:day' , getJadwal)
router.get('/pr/:day', getPR)
router.post('/post' , FS)

export default router;