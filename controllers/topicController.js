import { Topic, Subject } from "../index.js";

// Add a new topic
const addTopic = async (req, res) => {
  try {
    const { name, description, subjectId } = req.body;
    const topic = await Topic.create({ name, description, subjectId });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: "Error adding topic" });
  }
};

// Get all topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll();

    if (!topics.length) {
      return res.status(404).json({ message: "No topics found." });
    }

    res.status(200).json(topics);
  } catch (err) {
    console.error("Error fetching topics:", err);
    res.status(500).json({ message: "Error fetching topics." });
  }
};

// Get topics by subject
const getTopicsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const topics = await Topic.findAll({
      where: { subjectId },
    });

    if (!topics.length) {
      return res
        .status(404)
        .json({ message: `No topics found for subject ID: ${subjectId}` });
    }

    res.status(200).json(topics);
  } catch (err) {
    console.error("Error fetching topics by subject:", err);
    res.status(500).json({ message: "Error fetching topics." });
  }
};

// Update a topic
const updateTopic = async (req, res) => {
  try {
    const { id } = req.params; // Get topic ID from URL params
    const { name, description, subjectId } = req.body; // Get new topic data from body

    const topic = await Topic.findByPk(id); // Find the topic by ID

    if (!topic) {
      return res.status(404).json({ message: `Topic with ID ${id} not found` });
    }

    // Update topic
    topic.name = name || topic.name; // Only update fields if new values are provided
    topic.description = description || topic.description;
    topic.subjectId = subjectId || topic.subjectId;

    await topic.save(); // Save the updated topic

    res.status(200).json({ message: "Topic updated successfully", topic });
  } catch (err) {
    console.error("Error updating topic:", err);
    res.status(500).json({ message: "Error updating topic" });
  }
};

// Delete a topic
const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params; // Get topic ID from URL params

    const topic = await Topic.findByPk(id); // Find the topic by ID

    if (!topic) {
      return res.status(404).json({ message: `Topic with ID ${id} not found` });
    }

    // Delete the topic
    await topic.destroy();

    res.status(200).json({ message: `Topic with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting topic:", err);
    res.status(500).json({ message: "Error deleting topic" });
  }
};

export { addTopic, getTopics, getTopicsBySubject, updateTopic, deleteTopic };

