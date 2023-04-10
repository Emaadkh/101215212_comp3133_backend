const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        index: {
            unique: true
        },
        maxlength: 100,
        validate: [validateEmail, 'Please fill a valid email address']       
    },
    password: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("User", userSchema);