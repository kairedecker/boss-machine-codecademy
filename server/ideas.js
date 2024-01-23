const express = require('express');
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, 
    updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    try{
        if(isNaN(ideaId)) {
            return res.status(404).send("IdeaId must be a number");
        }
        const idea = getFromDatabaseById('ideas', ideaId);
        if(!idea) {
            return res.status(404).send("Idea not found");
        }
        req.ideaId = ideaId;
        req.idea = idea;
        next();
    }catch(error){
        error.status = 500;
        next(error);
    }
})


ideasRouter.get('/', (req, res) => {
    res.status(200).send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res) => {
    res.status(200).send(req.idea);
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    try{
        const newIdea = addToDatabase('ideas', req.body);
        if(!newIdea) {
            return res.status(400).send("Idea-Model incorrect");
        }
        res.status(201).send(newIdea);
    }catch(error){
        error.status = 500;
        next(error);
    }
})

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    try{
        const updatedIdea = updateInstanceInDatabase('ideas', req.body);
        if(!updatedIdea) {
            return res.status(400).send("Idea-Model incorrect");
        }
        res.status(201).send(updatedIdea);
    }catch(error){
        error.status = 500;
        next(error);
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    try{
        const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
        if(!deleted) {
            return res.status(400).send("Idea not found");
        }
        res.status(204).send();
    }catch(error){
        error.status = 500;
        next(error);
    }
})



// Small Error handler
ideasRouter.use((err, req, res, next) => {
    return res.status(err.status).send(err.message);
});



module.exports = ideasRouter;
