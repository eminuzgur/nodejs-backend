const httpstatus = require('http-status');
const userService= require('../services/User');
const projectService=require('../services/Project')
const {passwordToHash,generateAccessToken, generateRefreshToken}=require('../scripts/utils/helper')

const index = (req, res) => {
    userService.list().then((response) => {
        res.status(httpstatus.OK).send(response)
    }).catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    })
};

const create = (req, res) => {
    req.body.password=passwordToHash(req.body.password);
    userService.insert(req.body).then((response) => {
        res.status(httpstatus.CREATED).send(response)
    })
    .catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    });
};

const login=(req,res)=>{
    req.body.password=passwordToHash(req.body.password);
    
    userService.loginUser(req.body)
    .then((user)=>{
        if(!user) return res.status(httpstatus.NOT_FOUND).send({message:"kullanici bulunamadi"});
        user={
            ...user.toObject(),
            tokens:{
                access_token:generateAccessToken(user),
                refresh_token:generateRefreshToken(user),
            }
        }
        delete user.password;
        res.status(httpstatus.OK).send(user);
    })
    .catch((e)=>{
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e);
    })
}; 

const projectList=(req,res)=>{
    console.log('id :>> ', req.user);
    projectService.list({user_id:req.user?._id}).then((projects)=>{
        res.status(httpstatus.OK).send(projects)
    }).catch(()=>{
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send({error:"hata"})
    })
}

module.exports = {
    index,
    create,
    login,
    projectList,
};