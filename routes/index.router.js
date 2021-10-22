var express = require('express')
var router = express.Router()

const ctrlUser = require('../controller/user.controller');


router.post('/register', ctrlUser.register)
router.get('/getDetails', ctrlUser.getDetails)
router.post('/encrept', ctrlUser.encrept)
router.get('/encreptdata/:id', ctrlUser.encreptdata)
router.post('/decrepetdata', ctrlUser.decrepetdata)

module.exports = router