import Express from "express";
import { data } from "../data/dummy.js";

const router = Express.Router()

router.get('/hari' , data)

export default router;