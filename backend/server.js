import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import ProductRoutes from './routes/ProductRoutes.js'
import UserRoutes from './routes/userRoutes.js'

const port = process.env.PORT || 5000

connectDB()

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send(`Api is running`)
})

app.use('/api/products', ProductRoutes)
app.use('/api/users', UserRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})