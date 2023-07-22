import path from 'path'
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

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}
else {
    app.get('/', (req, res) => res.send('Server is ready'));
}


app.use(notFound, errorHandler);


// server running
app.listen(port, () => console.log(`Server running on port ${port}`));;