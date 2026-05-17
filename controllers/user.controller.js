import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const register = async (req, res) => {
    const body = req.body
    const password = body.password
    
    const hashPassword = bcrypt.hashSync(password, 12)

    const isUsernameExist = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    })

    if (isUsernameExist) {
        return res.status(400).json({
            message:'Username already exist'
        })
    }

    const isEmailExist = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (isEmailExist) {
        return res.status(400).json({
            message:'Email already exist'
        })
    }

    await prisma.user.create({
        data:{
            nama: body.nama,
            username: body.username,
            email: body.email,
            password: hashPassword,
            no_telp: body.no_telp
    }
    })

    res.json({
        message: 'Register successful'
    })
}

export const login = async (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    const isUsernameExist = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (!isUsernameExist) {
        return res.status(404).json({
            message: 'Username not found'
        })
    }

    const hashPassword = isUsernameExist.password

    if(!bcrypt.compareSync(password, hashPassword)) {
        return res.status(401).json({
            message: 'Incorrect password'
        })
    }

    res.json({
        message: 'Login successful',
        data: {
            nama: isUsernameExist.nama,
            username: isUsernameExist.username,
            no_telp: isUsernameExist.no_telp,
            role: isUsernameExist.role
        }
    })
}

export const getAllUser = async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id_user: true,
            nama: true,
            username: true,
            email: true,
            no_telp: true,
            role: true   
        }
    })
    res.json({
        message: 'Get all users successful',
        data: users
    })
}

export const getUserById = async (req, res) => {
    const idUser = req.params.id

    const user = await prisma.user.findUnique({
        where: {
            id_user:  Number(idUser)
        }
    })

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    res.json({
        message: 'Get user by id successful',
        data: {
            id_user: user.id_user,
            nama: user.nama,
            username: user.username,
            email: user.email,
            no_telp: user.no_telp,
            role: user.role
        }
    })
}

export const updateUser = async (req, res) => {
    const idUser = Number(req.params.id)
    const body = req.body

    const isUserExist = await prisma.user.findUnique({
        where: {
            id_user: Number(idUser)
        }
    })

    if (!isUserExist) {
        return res.status(404).json({
            message:'User not found'
        })
    }

    const hashPassword = bcrypt.hashSync(body.password, 12)

    const user = await prisma.user.update({
        where: {
            id_user: idUser
        },
        data: {
            nama: body.nama,
            username: body.username,
            email: body.email,
            password: hashPassword,
            no_telp: body.no_telp,
        }
    })

    res.json({
        message: 'User updated successfully',
        data: {
            id_user: user.id_user,
            nama: user.nama,
            username: user.username,
            email: user.email,
            no_telp: user.no_telp,
            role: user.role
        }
    })
}

export const deleteUser = async (req, res) => {
    const idUser = Number(req.params.id)

    const isUserExist = await prisma.user.findUnique({
        where: {
            id_user:  Number(idUser)
        }
    })

    if (!isUserExist) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    await prisma.user.delete({
        where: {
            id_user: idUser
        }
    })

    res.json({
        message: 'User deleted successfully',
    })
}