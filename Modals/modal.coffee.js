const { default: mongoose } = require("mongoose");

const coffeeSchema = mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
    },
    inStock: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Coffee', coffeeSchema);