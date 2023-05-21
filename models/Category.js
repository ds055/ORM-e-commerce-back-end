// pull necessary elements from sequelize
const { Model, DataTypes } = require('sequelize');
// bring in connection to db
const sequelize = require('../config/connection.js');

// creates category class utilizing the sequelize Model
class Category extends Model {}

Category.init(
  {
    id: { 
      // select data type for column as an int, prevents null values, sets as the primary key, and auto increments 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      autoIncrement: true
    },
    category_name: {
      // select data type for column as string and prevents null values
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    // prevents time stamps
    timestamps: false,
    // prevents pluralizing table name
    freezeTableName: true,
    // sets field options to snake case
    underscored: true,
    // name table
    modelName: 'category',
  }
);

// Export for use in other scripts
module.exports = Category;
