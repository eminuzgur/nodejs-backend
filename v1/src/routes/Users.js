const express = require('express');
const {index,create, login, projectList, resetPassword}=require('../controllers/Users');
const authenticate=require('../middlewares/authenticate')
const validate=require('../middlewares/validate');
const schemas=require('../validations/User')

const router = express.Router();

router.get('/',index);
router.route('/').post(validate(schemas.createValidation),create);
router.route('/login').post(validate(schemas.loginValidation),login);
router.route('/projects').get(authenticate,projectList)
router.route('/reset-password').post(resetPassword)


module.exports = router;
