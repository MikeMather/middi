const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs =  require('../config/config');
const userDef = require('./user');
const habitDef = require('./habit');
const completedTaskDef = require('./completedTask');
const completedGoalDef = require('./completedGoal');

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
const db = {};

const sequelize = new Sequelize(config.url, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = sequelize.define('User', userDef);
const Habit = sequelize.define('Habit', habitDef);
const CompletedTask = sequelize.define('CompletedTask', completedTaskDef);
const CompletedGoal = sequelize.define('CompletedGoal', completedGoalDef);

Habit.hasMany(CompletedTask, {
  onDelete: 'CASCADE'
});
Habit.hasMany(CompletedGoal, {
  onDelete: 'CASCADE'
});
CompletedTask.belongsTo(Habit);
CompletedGoal.belongsTo(Habit);
User.hasMany(Habit, {
  onDelete: 'CASCADE'
});
Habit.belongsTo(User);

//sequelize.sync({ alter: true })
db.Habit = Habit;
db.CompletedTask = CompletedTask;
db.CompletedGoal = CompletedGoal;
db.User = User;

module.exports = db;