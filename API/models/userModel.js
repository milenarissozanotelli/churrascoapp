const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('mongoose-type-email');

const userModel = mongoose.Schema({
    fullName:{ type: String, required: true },
    email:{ type: mongoose.SchemaTypes.Email, required: true, unique: true },
    password:{ type: String, required: true },
});

userModel.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
      } catch (err) {
        return next(err);
      }
});

module.exports = mongoose.model('User', userModel);