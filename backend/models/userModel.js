import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Enter your email']
    },
    password: {
        type: String,
        required: [true, 'Enter your password']
    },

}, {
    timestamps:true
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('user', userSchema);

export default User;