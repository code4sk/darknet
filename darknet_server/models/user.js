const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    name: {
        type: 'String',
    },
    password: {
        type: 'String',
        required: true
    }
});

userSchema.statics.salt = 'darknet_salt';


userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        console.log('pre save', this.password)
        this.password = await bcrypt.hash(this.password, 12);
    }
    
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
