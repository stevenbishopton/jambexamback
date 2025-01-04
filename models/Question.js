
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Question = sequelize.define("Question", {
    questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Topics", // Assuming your topics table is named "Topics"
            key: "id",
        },
    },
    options: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
}, {
    timestamps: true, // Enable automatic timestamps
});

export default Question;