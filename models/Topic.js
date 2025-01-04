
   import { DataTypes } from "sequelize";
   import sequelize from "../config/database.js";

   const Topic = sequelize.define("Topic", {
     name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     description: {
       type: DataTypes.TEXT,
       allowNull: false,
     },
     subjectId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
         model: "Subjects",
         key: "id",
       },
     },
   }, {
     timestamps: true,
   });

   export default Topic;