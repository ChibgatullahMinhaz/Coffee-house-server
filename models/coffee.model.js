const { default: mongoose } = require("mongoose");

const coffeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: { type: String, enum: ["Espresso", "Latte", "Cappuccino", "Mocha", "Cold Brew", "Other"], default: "Other" },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium',
        required: true
    }, currency: { type: String, default: "BDT" },
    inStock: {
        type: Boolean,
        default: true
    },
    caffeineContent: { type: Number, default: 0 },

    createdAt: {
        type: Date,
        default: Date.now
    }, updatedAt: { type: Date, default: Date.now }, ratings: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    tags: [String],
    image: { type: String },
    seasonal: { type: Boolean, default: false },
    quantity: { type: Number, default: 0, require: true },
    ingredients: [String],

})
const Coffee = mongoose.model('Coffee', coffeeSchema);
module.exports = Coffee;