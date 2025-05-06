import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user',"lecturer"],
        default: 'user',
    },
    faceDescriptor: {
        type: [Number], // Array of float numbers from face-api.js
        validate: [arrayLimit, '{PATH} must be an array of 128 numbers'],
        required: true,
      },
},{
    timestamps: true,
});

function arrayLimit(val) {
    return val.length === 128; // Ensure the array has exactly 128 elements
}

const User = mongoose.model('User', userSchema);

export default User;