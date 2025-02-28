const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    uniqueId: {
        type: String,
        required: true,
        default: () => uuidv4().substr(0, 7), 
        index: { unique: true },
    },
    Specialization:String,
    Gender:String,
    email: String,
    contact: Number,
    url: {
        image: {
            data: Buffer,
        contentType: String,
        },
        facebook: String,
        insta:String,
        twitter:String,
        linkedin:String,
        }
});

const User = mongoose.model('Doctor', UserSchema);
module.exports = User;
