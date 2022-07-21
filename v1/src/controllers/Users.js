const httpstatus = require('http-status');
const { insert, list } = require('../services/User');
const {passwordToHash}=require('../scripts/utils/helper')

const index = (req, res) => {
    list().then((response) => {
        res.status(httpstatus.OK).send(response)
    }).catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    })
};

const create = (req, res) => {
    const cryptedPassword=passwordToHash(req.body.password);
    
    console.log(req.body.password, cryptedPassword);

    return false;
    insert(req.body).then((response) => {
        res.status(httpstatus.CREATED).send(response)
    })
    .catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    });
};

module.exports = {
    index,
    create,
};