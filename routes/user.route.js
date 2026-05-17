import express from "express"
import { deleteUser, getAllUser, getUserById, login, register, updateUser } from "../controllers/user.controller.js"

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/get-all', getAllUser)
router.get('/get/:id', getUserById)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router