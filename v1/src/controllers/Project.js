const httpstatus = require('http-status');
const projectService = require('../services/Project');


const index = (req, res) => {
    projectService.list().then((response) => {
        res.status(httpstatus.OK).send(response)
    }).catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    })
};

const create = (req, res) => {
    req.body.user_id=req.user;
    projectService.insert(req.body).then((response) => {
        res.status(httpstatus.CREATED).send(response)
    })
    .catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    });
};

const update=(req,res)=>{
    if(!req.params?.id) return res.status(httpstatus.BAD_REQUEST).send({message:"id biligisi eksik"})
    projectService.modify(req.params.id,req.body).then((updatedProject)=>{
        res.status(httpstatus.OK).send(updatedProject);
    }).catch((e)=>{
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send({error:"gunccelleme sirasinda bir hata olustu"})
    })
}
const remove=(req,res)=>{
    if(!req.params?.id) return res.status(httpstatus.BAD_REQUEST).send({message:"id biligisi eksik"})
    projectService.remove(req.params.id).then((deletedProject)=>{
        res.status(httpstatus.OK).send(deletedProject);
    }).catch((e)=>{
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send({error:"Silme sirasinda bir hata olustu"})
    })
}

module.exports = {
    index,
    create,
    update,
    remove,
};