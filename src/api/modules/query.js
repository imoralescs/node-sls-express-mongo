const merge = require('lodash.merge')
const testData = {message: 'hello'}

// Meta Programming, process that create programming code.
// These are generic methods used in the generic controllers for all models
const controllers = {
  createOne(model, body) {
    return model.create(body)
  },

  updateOne(docToUpdate, update) {
    merge(docToUpdate, update)
    return docToUpdate.save()
  },

  deleteOne(docToDelete) {
    return docToDelete.remove()
  },

  getOne(docToGet) {
    return Promise.resolve(docToGet)
  },

  getAll(model) {
    return model.find({})
  },

  findByParam(model, id) {
    return model.findById(id).exec()
  }
}

module.exports.controllers = controllers

const createOne = (model) => (req, res, next) => {
  return controllers.createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

module.exports.createOne = createOne

const updateOne = (model) => async (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

module.exports.updateOne = updateOne

const deleteOne = (model) => (req, res, next) => {
  return controllers.deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

module.exports.deleteOne = deleteOne

const getOne = (model) => (req, res, next) => {
  return controllers.getOne(req.docFromId)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))
}

module.exports.getOne = getOne

const getAll = (model) => (req, res, next) => {
  return controllers.getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}

module.exports.getAll = getAll

const findByParam = (model) => (req, res, next, id) => {
  return controllers.findByParam(model, id)
    .then(doc => {
      if(!doc) {
        next(new Error('Not Found Error'))
      }
      else {
        req.docFromId = doc
        next()
      }
    })
    .catch(error => {
      next(error)
    })
}

module.exports.findByParam = findByParam

// Default generateControllers()
module.exports = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  }

  return {...defaults, ...overrides}
}