import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Hello World!');
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
app.listen(PORT, console.log(`server running in ${NODE_ENV} on port ${PORT}`));