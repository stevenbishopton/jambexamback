import { Subject } from '../index.js';

// Add Subject
const addSubject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const newSubject = await Subject.create({
      name,
      description
    });

    return res.status(201).json({ message: 'Subject added successfully', data: newSubject });
  } catch (err) {
    console.error('Error adding subject:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get All Subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();

    if (!subjects.length) {
      return res.status(404).json({ message: "No subjects found." });
    }

    res.status(200).json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ message: "Error fetching subjects." });
  }
};

// Update Subject
const updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params; // Get subject ID from URL
    const { name, description } = req.body; // Get updated data from request body

    // Find the subject by ID
    const subject = await Subject.findByPk(subjectId);

    if (!subject) {
      return res.status(404).json({ message: `Subject with ID ${subjectId} not found.` });
    }

    // Update the subject's name and description if provided
    subject.name = name || subject.name;
    subject.description = description || subject.description;

    // Save the updated subject to the database
    await subject.save();

    res.status(200).json({ message: 'Subject updated successfully', data: subject });
  } catch (err) {
    console.error("Error updating subject:", err);
    res.status(500).json({ message: "Error updating subject." });
  }
};

// Delete Subject
const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params; // Get subject ID from URL

    // Find the subject by ID
    const subject = await Subject.findByPk(subjectId);

    if (!subject) {
      return res.status(404).json({ message: `Subject with ID ${subjectId} not found.` });
    }

    // Delete the subject from the database
    await subject.destroy();

    res.status(200).json({ message: `Subject with ID ${subjectId} has been deleted.` });
  } catch (err) {
    console.error("Error deleting subject:", err);
    res.status(500).json({ message: "Error deleting subject." });
  }
};

export { addSubject, getSubjects, updateSubject, deleteSubject };
