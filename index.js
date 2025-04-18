
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

// routes
import authRoutes from './routes/auth.js';
import podcastsRoutes from './routes/podcast.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

/** Middlewares */
app.use(express.json());
const corsConfig = {
   origin:'http://localhost:3000',
   methods:['GET','POST','PUT','DELETE'],
   allowedHeaders:['Content-Type','Authorization'],
};
app.use(cors(corsConfig));
app.use(morgan('tiny'));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/podcasts', podcastsRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;

// MongoDB connection and server start
const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('MongoDB connected');
            app.get('/', (req, res) => {
                res.send('🎉 Backend Server is Running!');
              });
              
            app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });
};

connect();
