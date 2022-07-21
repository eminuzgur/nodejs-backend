const express = require('express');
const {index,create}=require('../controllers/Users');
const validate=require('../middlewares/validate')
const schemas=require('../validations/User')

const router = express.Router();

router.get('/',index);

router
.route('/')
.post(validate(schemas.createValidation),create);

module.exports = router;
