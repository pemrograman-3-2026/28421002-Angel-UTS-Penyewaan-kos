import express from "express"
import { createKos, deleteKos, getAllKos, getKosById, updateKos } from "../controllers/kos.controller.js"

const router = express.Router()
router.post('/create', createKos)
router.get('/', getAllKos)
router.get('/by-id', getKosById)
router.put('/update', updateKos)
router.delete('/delete', deleteKos)

export default router