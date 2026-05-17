import { prisma } from '../lib/prisma.js'

export const createSewa = async (req, res) => {
    const body = req.body

    const isUserExist = await prisma.user.findUnique({
        where: {
            id_user: Number(body.id_user)
        }
    })

    if (!isUserExist) {
        return res.status(404).json({
            message:'User not found'
        })
    }

    const isKosExist = await prisma.kos.findUnique({
        where:{
            id_kos: Number(body.id_kos)
        }
        })

    if (!isKosExist) {
        return res.status(404).json({
            message:'Kos not found'
        })
    }

    if (isKosExist.status === 'PENUH'){
        return res.status(400).json({
            message: 'Kos is full'
        })
    }

    const sewa = await prisma.penyewaan.create({
        data: {
        id_user: Number(body.id_user),
        id_kos: Number(body.id_kos),
        tanggal_sewa: new Date(body.tanggal_sewa),
        durasi_sewa: Number(body.durasi_sewa)
        }
    })

    res.json({
        message: 'Penyewaan created successfully',
        data: sewa
    })
}

export const getAllSewa = async (req, res) => {
    const sewa = await prisma.penyewaan.findMany()
    res.json({
        message: 'Get all penyewaan successful',
        data: sewa
    })
}

export const getSewaById = async (req, res) => {
    const idSewa = req.params.id

    const sewa = await prisma.penyewaan.findUnique({
        where: {
            id_sewa:  Number(idSewa)
        }
    })

    if (!sewa) {
        return res.status(404).json({
            message: 'Penyewaan not found'
        })
    }

    res.json({
        message: 'Get penyewaan by id successful',
        data: sewa
    })
}

export const updateSewa = async (req, res) => {
    const idSewa = Number(req.params.id)
    const body = req.body

    const isSewaExist = await prisma.penyewaan.findUnique({
        where: {
            id_sewa: Number(idSewa)
        }
    })

    if (!isSewaExist) {
        return res.status(404).json({
            message:'Penyewaan not found'
        })
    }

    const isUserExist = await prisma.user.findUnique({
        where: {
            id_user: Number(body.id_user)
        }
    })

    if (!isUserExist) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const isKosExist = await prisma.kos.findUnique({
        where: {
            id_kos: Number(body.id_kos)
        }
    })

    if (!isKosExist) {
        return res.status(404).json({
            message: 'Kos not found'
        })
    }

    const sewa = await prisma.penyewaan.update({
        where: {
            id_sewa: idSewa
        },
        data: {
            id_user: Number(body.id_user),
            id_kos: Number(body.id_kos),
            tanggal_sewa: new Date(body.tanggal_sewa),
            durasi_sewa: Number(body.durasi_sewa),
            status_penyewaan: body.status_penyewaan
        }
    })

    res.json({
        message: 'Penyewaan updated successfully',
        data: sewa
    })
}

export const deleteSewa = async (req, res) => {
    const idSewa = Number(req.params.id)

    const isSewaExist = await prisma.penyewaan.findUnique({
        where: {
            id_sewa:  Number(idSewa)
        }
    })

    if (!isSewaExist) {
        return res.status(404).json({
            message: 'Penyewaan not found'
        })
    }

    await prisma.penyewaan.delete({
        where: {
            id_sewa: idSewa
        }
    })

    res.json({
        message: 'Penyewaan deleted successfully',
    })
}