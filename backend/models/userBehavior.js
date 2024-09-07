const mongoose = require('mongoose');
const { Schema } = mongoose;

const userBehaviorSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    path: { type: String, required: true },
    method: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    userAgent: { type: String },
    ip: { type: String }
});

const UserBehavior = mongoose.model('UserBehavior', userBehaviorSchema);

module.exports = UserBehavior;