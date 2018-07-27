const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connect = () => {
  return mongoose.connect(process.env.DB, {
    useMongoClient: true
  })
}

module.exports = connect