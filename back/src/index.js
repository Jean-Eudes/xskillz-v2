'use strict';

const Express = require('express');

const UserController = require('./user-controller');
const SkillController = require('./skill-controller');
const UpdateController = require('./update-controller');
const DomainController = require('./domain-controller');

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

Express()
    .use(allowCrossDomain)
    .use(require('body-parser').json())
    .use(require('cors')())

    .get('/', (req, res) => res.send('You know, for skills :)'))
    .post('/domains/:id/skills', SkillController.addSkillToDomain)
    .post('/domains', DomainController.addDomain)
    .get('/domains', DomainController.getDomains)
    .get('/skills', SkillController.getSkills)
    .post('/skills', SkillController.addSkill)
    .get('/skills/:id/users', UserController.getUsersBySkill)
    .get('/updates', UpdateController.getUpdates)
    .post('/users', UserController.addUser)
    .get('/users', UserController.getUsers)
    .get('/users/:id', UserController.getUserById)
    .post('/signin', UserController.signin)

    .listen(8080, () => {
        console.log('XSkillz is listening on port 8080');
    });

module.exports = Express;