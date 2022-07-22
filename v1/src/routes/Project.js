const express = require('express');
const {index,create}=require('../controllers/Project');
const validate=require('../middlewares/validate')
const authenticate=require('../middlewares/authenticate')
const schemas=require('../validations/Project')

const router = express.Router();

router.route('/').get(authenticate,index);
router.route('/').post(validate(schemas.createValidation),create);

module.exports = router;
