const mongoose = require('mongoose');

const listModel = mongoose.Schema({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    people: [{
        woman: { type: Number, required: true },
        man: { type: Number, required: true },
        children: { type: Number, required: true },
    }],
});

module.exports = mongoose.model('List', listModel);
