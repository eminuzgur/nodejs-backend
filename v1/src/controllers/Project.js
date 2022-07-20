const httpstatus = require('http-status');
const { insert, list } = require('../services/Project');


const index = (req, res) => {
    list().then((response) => {
        res.status(httpstatus.OK).send(response)
    }).catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    })
};

const create = (req, res) => {
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