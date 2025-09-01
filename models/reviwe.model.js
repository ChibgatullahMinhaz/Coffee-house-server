const { default: mongoose } = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    productId: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true,
        default: ''
    },
    rating: {
        type: Number,
        require: true,
        min: 0
    },
    isAccept: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
const ReviewModal = mongoose.model('Review', ReviewSchema);
module.exports = ReviewModal;