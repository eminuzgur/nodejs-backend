const Mongoose = require('mongoose');
const logger=require('../scripts/logger/Project')

const ProjectSchema = new Mongoose.Schema({
    name: String,
},
    { versionKey: false, timestamps: true }
);

ProjectSchema.post('save',(doc)=>{
    logger.log({
        level:"info",
        message:doc
    })
});

module.exports = Mongoose.model('project', ProjectSchema);