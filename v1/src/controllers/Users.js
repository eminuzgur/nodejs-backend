const httpstatus = require('http-status');
const userService = require('../services/User');
const projectService = require('../services/Project')
const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper')
const uuid = require('uuid');
const eventEmitter = require('../scripts/events/eventEmitter')

const index = (req, res) => {
    userService.list().then((response) => {
        res.status(httpstatus.OK).send(response)
    }).catch((e) => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
    })
};

const create = (req, res) => {
    req.body.password = passwordToHash(req.body.password);
    userService.insert(req.body).then((response) => {
        res.status(httpstatus.CREATED).send(response)
    })
        .catch((e) => {
            res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e)
        });
};

const login = (req, res) => {
    req.body.password = passwordToHash(req.body.password);

    userService.loginUser(req.body)
        .then((user) => {
            if (!user) return res.status(httpstatus.NOT_FOUND).send({ message: "kullanici bulunamadi" });
            user = {
                ...user.toObject(),
                tokens: {
                    access_token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user),
                }
            }
            delete user.password;
            res.status(httpstatus.OK).send(user);
        })
        .catch((e) => {
            res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e);
        })
};

const projectList = (req, res) => {
    console.log('id :>> ', req.user);
    projectService.list({ user_id: req.user?._id }).then((projects) => {
        res.status(httpstatus.OK).send(projects)
    }).catch(() => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send({ error: "hata" })
    })
};

const resetPassword = (req, res) => {
    const new_password = uuid.v4()?.split("-")[0] || new Date().getTime();

    userService.modify({ email: req.body.email }, { password: passwordToHash(new_password) }).then(updateuser => {
        if (!updateuser) return res.status(httpstatus.INTERNAL_SERVER_ERROR).send({ error: 'kullanici bulunamadi' })
        eventEmitter.emit('send_email', { 
            to: updateuser.email, 
            subject: "sifre sifirlama", 
            html: `Sifre sifirlandi.yeni sifreniz: ${new_password}`, 
        });
        res.status(httpstatus.OK).send({message:'eposta gondderildi'});
    }).catch(e => {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send({ error: 'dasda' })
    })
};

const update=(req,res)=>{
    
    userService.modify({_id:req.user?._id},req.body).then(updatedUser=>{
        res.status(httpstatus.OK).send(updatedUser);
    }).catch((e)=>{
        res.status(httpstatus.INTERNAL_SERVER_ERROR).send({error:'hata'})
    })
};


module.exports = {
    index,
    create,
    login,
    projectList,
    resetPassword,
    update,
};