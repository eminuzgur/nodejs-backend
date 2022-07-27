const User = require('../models/User');

const insert = (data) => {
    const user = new User(data);
    return user.save();
};

const list = () => {
    return User.find({});
}

const loginUser=(logginData)=>{
    return User.findOne(logginData)
};

const modify=(where,data)=>{
    return User.findOneAndUpdate(where,data,{new:true});
}

module.exports = {
    insert,
    list,
    loginUser,
    modify,
};