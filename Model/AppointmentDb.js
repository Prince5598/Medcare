const mongoose = require('mongoose');

const Appointment = new mongoose.Schema({
    name: String,
    username:String,
    email:String,
    Address: String,
    contact: Number,
    Age: Number,
    doctor: String,
    appointmentDate: String,
    appointmentTime: String,
})

module.exports = mongoose.model("Appointment", Appointment);
