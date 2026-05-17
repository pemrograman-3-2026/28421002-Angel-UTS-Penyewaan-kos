import express from "express"
import { createKos, deleteKos, getAllKos, getKosById, updateKos } from "../controllers/kos.controller.js"

const router = express.Router()
router.post('/create', createKos)
router.get('/get-all', getAllKos)
router.get('/get/:id', getKosById)
router.put('/update/:id', updateKos)
router.delete('/delete/:id', deleteKos)

export default router