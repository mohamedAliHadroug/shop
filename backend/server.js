import express from'express'
import path from 'path'
import dotenv from'dotenv'
import connectDB from'./config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import ProductRoutes from './routes/ProductRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleWare.js'
import UserRoutes from './routes/UserRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


const app = express()


//use morgan in the local development only to get the http request
if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'))
}
 

dotenv.config()
connectDB()

app.use(express.json())

app.use('/api/products', ProductRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/orders', orderRoutes)

//route to upload file
app.use('/api/upload', uploadRoutes)

//Paypal 
app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

//making the uploads file  static with express
const __dirname= path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//prepaing the production mode for deployment
if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res)=>{
        res.send('API is runing....')
        })
        
}


//fallback for 404 error
app.use(notFound)
//error custom handler
app.use(errorHandler)


const PORT= process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))