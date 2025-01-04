import { Router } from 'express';
import { 
  addTopic, 
  getTopics, 
  getTopicsBySubject, 
  updateTopic, 
  deleteTopic 
} from '../controllers/topicController.js';

const topicRouter = Router();

// Get all topics
topicRouter.get('/', getTopics);

// Get topics by subject
topicRouter.get('/subject/:subjectId/topics', getTopicsBySubject);

// Add a new topic
topicRouter.post('/', addTopic);

// Update a specific topic
topicRouter.put('/:topicId', updateTopic);

// Delete a specific topic
topicRouter.delete('/:topicId', deleteTopic);

export default topicRouter;
