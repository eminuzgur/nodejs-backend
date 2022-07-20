const Mongoose = require('mongoose');

const ProjectSchema = new Mongoose.Schema({
    name: String,
},
    { versionKey: false, timestamps: true });

module.exports = Mongoose.model('project', ProjectSchema);
