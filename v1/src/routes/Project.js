const express = require('express');
const {index,create, update, remove,}=require('../controllers/Project');
const validate=require('../middlewares/validate')
const authenticate=require('../middlewares/authenticate')
const schemas=require('../validations/Project')

const router = express.Router();

router.route('/').get(authenticate,index);
router.route('/').post(authenticate,validate(schemas.createValidation),create);
router.route('/:id').patch(authenticate,update);
router.route('/:id').delete(authenticate,remove)

module.exports = router;
