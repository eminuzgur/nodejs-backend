const httpstatus = require('http-status');
const { insert, list ,loginUser} = require('../services/User');
const {passwordToHash}=require('../scripts/utils/helper')

const index = (req, res) => {
    list().then((response) => {
        res.status(httpstatus.OK).send(response)
    }).catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    })
};

const create = (req, res) => {
    req.body.password=passwordToHash(req.body.password);
    insert(req.body).then((response) => {
        res.status(httpstatus.CREATED).send(response)
    })
    .catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    });
};
const login=(req,res)=>{
    req.body.password=passwordToHash(req.body.password);
    
    loginUser(req.body)
    .then((user)=>{
        if(!user) return res.status(httpstatus.NOT_FOUND).send({message:"kullanici bulunamadi"});
        res.status(httpstatus.OK).send(user);
    })
    .catch((e)=>{
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e);
    })
};

module.exports = {
    index,
    create,
    login,
};