const express = require('express');
const {index,create, login}=require('../controllers/Users');
const validate=require('../middlewares/validate')
const schemas=require('../validations/User')

const router = express.Router();

router.get('/',index);
router.route('/').post(validate(schemas.createValidation),create);
router.route('/login').post(validate(schemas.loginValidation),login);
module.exports = router;
