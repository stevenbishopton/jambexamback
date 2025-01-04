
import Subject from './models/Subject.js';
import Topic from './models/Topic.js';
import Question from './models/Question.js';

Subject.hasMany(Topic, { foreignKey: 'subjectId' });
Topic.belongsTo(Subject, { foreignKey: 'subjectId' });
Topic.hasMany(Question, { foreignKey: 'topicId' });
Question.belongsTo(Topic, { foreignKey: 'topicId' });

export { Subject, Topic, Question };