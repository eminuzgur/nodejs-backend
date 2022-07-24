const { contentSecurityPolicy } = require('helmet');
const httpstatus = require('http-status');
const { insert, list, modify } = require('../services/Project');


const index = (req, res) => {
    list().then((response) => {
        res.status(httpstatus.OK).send(response)
    }).catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    })
};

const create = (req, res) => {
    req.body.user_id=req.user;
    insert(req.body).then((response) => {
        res.status(httpstatus.CREATED).send(response)
    })
    .catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    });
};
const update=(req,res)=>{
    if(!req.params?.id) return res.status(httpstatus.BAD_REQUEST).send({message:"id biligisi eksik"})
    modify(req.params.id,req.body).then((updatedProject)=>{
        res.status(httpstatus.OK).send(updatedProject);
    }).catch((e)=>{
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send({error:"gunccelleme sirasinda bir hata olustu"})
    })
}

module.exports = {
    index,
    create,
    update,
};