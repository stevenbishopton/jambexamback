import { Router } from 'express';
import { 
  getQuestionsByTopic, 
  addQuestion, 
  updateQuestion, 
  deleteQuestion 
} from '../controllers/questionController.js';

const questionRouter = Router();

// Get all questions by topic
questionRouter.get('/topic/:topicId/questions', getQuestionsByTopic);

// Add a new question
questionRouter.post('/', addQuestion);

// Update a specific question
questionRouter.put('/:questionId', updateQuestion);

// Delete a specific question
questionRouter.delete('/:questionId', deleteQuestion);

export default questionRouter;
