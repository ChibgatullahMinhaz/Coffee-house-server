const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    userImage: {
        type: String,
        default: null,
        required: true
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
        min: 1,
        max: 5,
    },
    isAccept: {
        type: Boolean,
        default: false
    }, productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true })

export default model("Review", reviewSchema);