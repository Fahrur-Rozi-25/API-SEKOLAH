import Express from "express";
import { getJadwal } from "../controllers/jadwal.js";
import { postPR } from "../controllers/postPR.js";
import { getPR } from "../controllers/getPR.js";

const router = Express.Router()

router.get('/:day' , getJadwal)
router.post('/postPR', postPR)
router.get('/pr/:day', getPR)


export default router;