const generateControllers = require('../../modules/query')

const { Note } = require('./note.model')

module.exports = generateControllers(Note)