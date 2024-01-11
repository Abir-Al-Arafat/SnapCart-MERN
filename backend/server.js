import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'

import ProductRoutes from './routes/ProductRoutes.js'

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.get('/', (req, res)=>{
    res.send(`Api is running`)
})

app.use('/api/products', ProductRoutes)

app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})