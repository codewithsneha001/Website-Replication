const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    mobile: {
        type: String,
        required: true,
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true,
        maxlength: 100,
    },
    city: {
        type: String,
        required: true,
        maxlength: 100,
    },
}, {
    timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Employee', employeeSchema, 'employees');