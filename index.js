import express from 'express'
import UserRoute from './routes/user.route.js'
import KosRoute from './routes/kos.route.js'
import SewaRoute from './routes/penyewaan.route.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.use('/user', UserRoute)
app.use('/kos', KosRoute)
app.use('/sewa', SewaRoute)

app.listen(3000, () => {
    console.log('server started')
})