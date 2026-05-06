import express from "express"
import { deleteUser, getAllUser, getUserById, login, register, updateUser } from "../controllers/user.controller.js"

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/', getAllUser)
router.get('/by-id', getUserById)
router.put('/update', updateUser)
router.delete('/delete', deleteUser)

export default router