const checkMillionDollarIdea = (req,res,next) => {
    const {numWeeks, weeklyRevenue} = req.body;
    const totalMoney = Number(numWeeks) * Number(weeklyRevenue);
    if (!numWeeks || !weeklyRevenue || isNaN(totalMoney) || totalMoney < 1000000) {
        return res.status(400).send("Idea is not a million dollar idea");
    }
    next();
};


// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
