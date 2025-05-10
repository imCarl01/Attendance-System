import mongoose from 'mongoose';

const lecturerSchema = new mongoose.Schema({
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
    faculty:{
        type:String,
        required: true,
        enum:['Engineering', 'Science', 'Business', 'Arts', 'Medical', 'Law']
    },
    department:{
        type:String,
        required: true,
        trim:true,  
    },
    role: {
        type: String,
        enum: ['lecturer'],
        default: 'lecturer',
    },
    
},{
    timestamps: true,
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

export default Lecturer;