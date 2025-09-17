const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'rider'],
        default: 'customer'
    },
    avatar: { type: String, default: null },
    address: { type: String },
    phone: { type: String },
    isBanned: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);
module.exports = User;