const mongoose = require('mongoose');

const Logindb = new mongoose.Schema({
    email : String,
    username : String,
    password : String,
    appointments: [{
        name:String,
        username:String,
        email:String,
        Address:String,
        contact : Number,
        Age:Number,
        doctor:String,
        appointmentDate: String,
        appointmentTime: String,
    }],
})

module.exports = mongoose.model("Logindb",Logindb);
