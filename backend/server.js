import express from "express"
import dotenv from "dotenv"
import userRoute from './routes/userRoute.js'
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
dotenv.config()
const port = process.env.PORT || 4000
// middleware
import { notFound,errorHandler } from "./middleware/errorMiddeware.js"

connectDB();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true })) //form data

// 
app.use(cookieParser());
// Routes
app.use('/api/users/', userRoute);
app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound, errorHandler);


// server running
app.listen(port, () => console.log(`Server running on port ${port}`));;