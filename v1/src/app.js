const express = require('express');
const helmet = require('helmet');

const config = require('./config');
const loaders = require('./loaders');
const events=require('./scripts/events')
const { ProjectRoutes,UsersRoutes } = require('./routes');


config();
loaders();
events();

const app = express();

app.use(express.json());
app.use(helmet());


app.listen(process.env.APP_PORT, () => {
    console.log('Server Up');
    app.use('/projects', ProjectRoutes);
    app.use('/users', UsersRoutes);
});

