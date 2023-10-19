const route = require('express').Router()

const {getData,postData,updateData,deleteData,login} = require('../Controller/userController')

route.get('/',getData)
route.post('/',postData)
route.put('/:id',updateData)
route.delete('/:id',deleteData)
route.post('/login',login)

module.exports = route