const express = require('express');
const router = express.Router();
const StudentController = require('../controller/StudentController');


//create find delete
router.get('/',StudentController.login);
router.get('/teachers',StudentController.view);
router.get('/adduser',StudentController.form);
router.post('/adduser',StudentController.create);
router.get('/students',StudentController.find);
router.post('/students',StudentController.found);
router.get('/:Rollnumber',StudentController.delete);
router.get('/edituser/:Rollnumber',StudentController.edit);
router.post('/edituser/:Rollnumber', StudentController.update);

module.exports = router;
