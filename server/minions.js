const express = require('express');
const app = require('../server');
const minionsRouter = express.Router();
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');

minionsRouter.param('minionId', (req, res, next, minionId) => {
    // Check if minion ID exists and attach minion to req body
    try{
        const minion = getFromDatabaseById('minions', minionId);
        if(!minion) {
            return res.status(400).send("Minion not found");
        }
        req.minionId = minionId;
        req.minion = minion;
        next();
    }catch(error){
        error.status = 500;
        next(error);
    }
    
});

minionsRouter.get('/', (req, res) => {
    res.status(200).send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res) => {
    res.status(200).send(req.minion);
});

minionsRouter.post('/', (req, res) => {
    try{
        const newMinion = addToDatabase('minions', req.body);
        if(!newMinion) {
            return res.status(400).send("Minion-Model incorrect");
        }
        res.status(201).send(newMinion);
    }catch(error){
        error.status = 500;
        next(error);
    }
});

minionsRouter.put('/:minionId', (req, res) => {
    try{
        const updatedMinion = updateInstanceInDatabase('minions', req.body);
        if(!updatedMinion) {
            return res.status(400).send("Minion-Model incorrect");
        }
        res.status(201).send(updatedMinion);
    }catch(error){
        error.status = 500;
        next(error);
    }
})


// Small Error handler
minionsRouter.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
});

module.exports = minionsRouter;
