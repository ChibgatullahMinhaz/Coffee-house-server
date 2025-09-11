const { default: mongoose } = require("mongoose");

const coffeeSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: {
        type: String,
        // enum: [
        //     "Espresso", "Americano", "Latte", "Cappuccino", "Mocha", "Macchiato",
        //     "Flat White", "Ristretto", "Long Black", "Cold Brew", "Iced Latte",
        //     "Iced Mocha", "Frappuccino", "Affogato", "Irish Coffee", "Caffè macchiato",
        //     "Flat white", "Cortado", "Café au lait", "Iced coffee", "Doppio", "Frappe",
        //     "Red Eye", "Lungo", "Coffee with cream", "Turkish coffee", "Breve",
        //     "Coffea arabica", "Café Cubano", "Other"
        // ],
        default: "Other"
    },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    sizes: { type: [String], enum: ['small', 'medium', 'large'], default: 'medium', required: true },
    currency: { type: String, default: "BDT" },
    inStock: { type: Boolean, default: true },
    caffeineContent: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    tags: [String],
    images: [{ type: String, required: true }],
    seasonal: { type: Boolean, default: false },
    quantity: { type: Number, default: 0, required: true },
    ingredients: [String],
    roastLevel: { type: String },
    origin: { type: String, required: true },
    available: { type: Boolean, required: true },
    isSpecial: { type: Boolean, required: true }
}, { timestamps: true });

const Coffee = mongoose.model('Coffee', coffeeSchema);
module.exports = Coffee;
