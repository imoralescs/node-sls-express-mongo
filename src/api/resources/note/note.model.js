const mongoose = require('mongoose')

const schema = {
  title: {
    type: String
  },
  description: {
    type: String
  }
}

exports.schema = schema

const noteSchema = new mongoose.Schema(schema)

exports.Note = mongoose.model('note', noteSchema)