const route = require('express').Router()

const {getBook,postBook,updateData,deleteData} = require('../Controller/bookController')
const auth = require('../Middleware/auth')


route.get('/',getBook)
route.post('/',auth,postBook)
route.put('/:id',updateData)
route.delete('/:id',deleteData)


 module.exports = route