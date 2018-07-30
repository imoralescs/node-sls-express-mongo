const express = require('express')
const util = require('util')

const noteController = require('./note.controller')

const noteRouter = express.Router()

noteRouter.param('_id', (req, res, next, _id) => noteController.findByParam(req, res, next, _id))

noteRouter.route('/')
  .get((req, res, next) => noteController.getAll(req, res, next))
  .post((req, res, next) => noteController.createOne(req, res, next))

noteRouter.route('/:_id')
  .get((req, res, next) => noteController.getOne(req, res, next))
  .put((req, res, next) => noteController.updateOne(req, res, next))
  .delete((req, res, next) => noteController.deleteOne(req, res, next))

module.exports = noteRouter