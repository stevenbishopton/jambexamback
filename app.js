import express, { json } from 'express';
import questionRoutes from './routes/questionRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import sequelize from './config/database.js';
import cors from 'cors';
import { Subject, Topic, Question } from './index.js';

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://thunderous-capybara-ec345d.netlify.app/' : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(json());

app.use('/questions', questionRoutes);
app.use('/topics', topicRoutes);
app.use('/subjects', subjectRoutes);

// Test the database connection
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