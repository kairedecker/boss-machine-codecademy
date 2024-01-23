const isValidIdea = require('db.js')

const checkMillionDollarIdea = (idea) => {
    if(!isValidIdea(idea)) {
        return false;
    }
    
    const totalValue = idea.numWeeks * idea.weeklyRevenue;
    if(totalValue > 1000000) {
        return false;
    }
    return true;

};


// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
