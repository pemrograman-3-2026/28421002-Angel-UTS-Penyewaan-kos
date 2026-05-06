import express from "express"
import { createSewa, deleteSewa, getAllSewa, getSewaById, updateSewa } from "../controllers/penyewaan.controller.js"

const router = express.Router()
router.post('/create', createSewa)
router.get('/', getAllSewa)
router.get('/by-id', getSewaById)
router.put('/update', updateSewa)
router.delete('/delete', deleteSewa)

export default router