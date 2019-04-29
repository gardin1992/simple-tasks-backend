var mongoose = require('mongoose');
var ObjectId = mongoose.ObjectId;

var tasksMoldel = new mongoose.Schema({
	name: String,
	description: String
});

module.exports = mongoose.model('Tasks', tasksMoldel);