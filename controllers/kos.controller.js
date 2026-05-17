import { prisma } from '../lib/prisma.js'

export const createKos = async (req, res) => {
    const body = req.body

    const isKosExist = await prisma.kos.findFirst({
        where: {
            nama_kos: body.nama_kos
        }
    })

    if (isKosExist) {
        return res.status(400).json({
            message:'Kos already exist'
        })
    }

    const kos = await prisma.kos.create({
        data:{
            nama_kos: body.nama_kos,
            alamat: body.alamat,
            harga: Number(body.harga),
            fasilitas: body.fasilitas
        }
        })

    res.json({
        message: 'Kos created successfully',
        data: kos
    })
}

export const getAllKos = async (req, res) => {
    const kos = await prisma.kos.findMany({})
    res.json({
        message: 'Get all kos successful',
        data: kos
    })
}

export const getKosById = async (req, res) => {
    const idKos = req.params.id

    const kos = await prisma.kos.findUnique({
        where: {
            id_kos:  Number(idKos)
        }
    })

    if (!kos) {
        return res.status(404).json({
            message: 'Kos not found'
        })
    }

    res.json({
        message: 'Get kos by id successful',
        data: kos
    })
}

export const updateKos = async (req, res) => {
    const idKos = Number(req.params.id)
    const body = req.body

    const isKosExist = await prisma.kos.findUnique({
        where: {
            id_kos: Number(idKos)
        }
    })

    if (!isKosExist) {
        return res.status(404).json({
            message:'Kos not found'
        })
    }

    const kos = await prisma.kos.update({
        where: {
            id_kos: idKos
        },
        data: {
            nama_kos: body.nama_kos,
            alamat: body.alamat,
            harga: Number(body.harga),
            fasilitas: body.fasilitas,
            status: body.status
        }
    })

    res.json({
        message: 'Kos updated successfully',
        data: kos
    })
}

export const deleteKos = async (req, res) => {
    const idKos = Number(req.params.id)

    const isKosExist = await prisma.kos.findUnique({
        where: {
            id_kos:  Number(idKos)
        }
    })

    if (!isKosExist) {
        return res.status(404).json({
            message: 'Kos not found'
        })
    }

    await prisma.kos.delete({
        where: {
            id_kos: idKos
        }
    })

    res.json({
        message: 'Kos deleted successfully',
    })
}