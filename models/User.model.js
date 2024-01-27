const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true,
    //     minlength: 1,
    //     maxlength: 50,
    // },
    // avatar: {
    //     type: String,
    //     required: true,
    //     validate: {
    //         validator: function (v) {
    //             return /^https?:\/\/.*/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid URL for avatar.`,
    //     },
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address.`,
        },
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};