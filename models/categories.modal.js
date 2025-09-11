const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    categories: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });
const Categories = mongoose.model("Categories", CategorySchema);
module.exports = Categories;