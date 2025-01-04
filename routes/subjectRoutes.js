import { Router } from 'express';
import { 
  addSubject, 
  getSubjects, 
  updateSubject, 
  deleteSubject 
} from '../controllers/subjectController.js';

const subjectRouter = Router();

// Get all subjects
subjectRouter.get('/', getSubjects);

// Add a new subject
subjectRouter.post('/', addSubject);

// Update a specific subject
subjectRouter.put('/:subjectId', updateSubject);

// Delete a specific subject
subjectRouter.delete('/:subjectId', deleteSubject);

export default subjectRouter;
