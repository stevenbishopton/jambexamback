import express, { json } from 'express';
import questionRoutes from './routes/questionRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import sequelize from './config/database.js';
import cors from 'cors';
import { Subject, Topic, Question } from './index.js';

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'https://thunderous-capybara-ec345d.netlify.app', // Production frontend URL
  'http://localhost:5173', // Development frontend URL
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(json());

app.use('/questions', questionRoutes);
app.use('/topics', topicRoutes);
app.use('/subjects', subjectRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync({ force: false }); 
  })
  .then(() => {
    console.log('Database synchronized');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('Error synchronizing database:', err));
