const express = require('express');
const meetingsRouter = express.Router();
const {getAllFromDatabase, createMeeting, addToDatabase,
    deleteAllFromDatabase} = require('./db');


meetingsRouter.get('/', (req, res) => {
    res.status(200).send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    try{
        const newMeeting = createMeeting();
        if(!newMeeting){
            return res.status(400).send("Meeting not created");
        }
        const addedMeeting = addToDatabase('meetings', newMeeting);
        if(!addedMeeting){
            return res.status(400).send("Meeting not added");
        }
        return res.status(201).send(addedMeeting);
    }catch(error){
        error.status = 500;
        next(error);
    }
    
});

meetingsRouter.delete('/', (req, res, next) => {
    try{
        const deleted = deleteAllFromDatabase('meetings');
        if(!deleted) {
            return res.status(400).send("Meetings not deleted");
        }
        res.status(204).send();
    }catch(error){
        error.status = 500;
        next(error);
    }
});


// Small Error handler
meetingsRouter.use((err, req, res, next) => {
    return res.status(err.status).send(err.message);
});


module.exports = meetingsRouter;
