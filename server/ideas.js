const express = require('express');
const minionsRouter = require('./minions');
const ideasRouter = express.Router();

minionsRouter.param('ideaId', (req, res, next, ideaId) => {
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

// Small Error handler
ideasRouter.use((err, req, res, next) => {
    return res.status(err.status).send(err.message);
});



module.exports = ideasRouter;
