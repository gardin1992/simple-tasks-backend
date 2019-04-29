var express = require('express');
var router = express.Router();
var TasksModel = require('./models');
var ObjectId = require('mongoose').ObjectId;

router.get('/', (req, res) => {

	TasksModel.find((err, result) => {

		res.json(result);
	});
});

router.get('/:id', (req, res) => {

	const id = req.params.id;

	TasksModel.findById(id, (err, result) => {

		res.json(result);
	});
});

router.post('/', (req, res) => {

	const data = req.body;

	const task = new TasksModel(data);

	task.save()
		.then(result => {

			res.json(data);
		})
		.catch(err => {

			console.log(err);
		})
});

router.put('/:id', (req, res) => {

	const id = req.params.id;
	const data = req.body;

	TasksModel.findOneAndUpdate({_id: id}, data)
		.then(response => {

			res.json(response)
		})
		.catch(err => {

			console.log(err);
		})
});

router.delete('/:id', (req, res) => {

	const id = req.params.id;

	TasksModel.findOneAndRemove({_id: id})
		.then(response => {

			res.json(id)
		})
		.catch(err => {

			console.log(err);
		})
});

module.exports = router;