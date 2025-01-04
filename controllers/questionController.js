import { Question, Topic } from "../index.js";

// Get Questions by Topic
const getQuestionsByTopic = async (req, res) => {
  try {
    const topicId = req.params.topicId;
    const questions = await Question.findAll({
      where: { topicId },
      include: [{ model: Topic }],
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Error fetching questions" });
  }
};

// Add Question
const addQuestion = async (req, res) => {
  try {
    const { questionText, answer, year, topicId } = req.body;

    if (!questionText || !answer || !year || !topicId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = await Question.create({
      questionText,
      answer,
      year,
      topicId,
    });

    return res
      .status(201)
      .json({ message: "Question added successfully", data: newQuestion });
  } catch (err) {
    console.error("Error adding question:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update Question
const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { questionText, answer, year, topicId } = req.body; 
    const question = await Question.findByPk(questionId);

    if (!question) {
      return res.status(404).json({ message: `Question with ID ${questionId} not found.` });
    }

    question.questionText = questionText || question.questionText;
    question.answer = answer || question.answer;
    question.year = year || question.year;
    question.topicId = topicId || question.topicId;

    await question.save();

    res.status(200).json({ message: "Question updated successfully", data: question });
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ message: "Error updating question." });
  }
};

// Delete Question
const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params; 

    const question = await Question.findByPk(questionId);

    if (!question) {
      return res.status(404).json({ message: `Question with ID ${questionId} not found.` });
    }

    await question.destroy();

    res.status(200).json({ message: `Question with ID ${questionId} has been deleted.` });
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ message: "Error deleting question." });
  }
};

export { getQuestionsByTopic, addQuestion, updateQuestion, deleteQuestion };
