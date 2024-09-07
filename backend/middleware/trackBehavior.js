const UserBehavior = require('../models/userBehavior'); 

const trackBehavior = async (req, res, next) => {
    try {
        const userId = req.userId;  
        const behaviorData = {
            userId: userId,
            path: req.originalUrl,
            method: req.method,
            timestamp: new Date(),
            userAgent: req.headers['user-agent'],
            ip: req.ip
        };

        
        const behavior = new UserBehavior(behaviorData);
        await behavior.save();

        next();
    } catch (err) {
        console.error('Error tracking user behavior:', err);
        next();
    }
};

module.exports = trackBehavior;