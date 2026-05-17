import express from "express"
import { createSewa, deleteSewa, getAllSewa, getSewaById, updateSewa } from "../controllers/penyewaan.controller.js"

const router = express.Router()
router.post('/create', createSewa)
router.get('/get-all', getAllSewa)
router.get('/get/:id', getSewaById)
router.put('/update/:id', updateSewa)
router.delete('/delete/:id', deleteSewa)

export default router