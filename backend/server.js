import path from 'path';
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import ProductRoutes from './routes/ProductRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
import OrderRoutes from './routes/OrderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const port = process.env.PORT || 5000

connectDB()

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Cookie parser middleware
app.use(cookieParser())

// app.get('/', (req, res)=>{
//     res.send(`Api is running`)
// })

app.use('/api/products', ProductRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/orders', OrderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// set __dirname to current directory
// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  // setting static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  // any route thats not API will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})