const Categories = require("../../models/categories.modal");

exports.getAllCategories = async (req, res) => {
    try {
        const cat = await Categories.find().sort({ categories: 1 })
        if (!cat || cat.length === 0) {
            res.status(404).json({ message: 'Category not found!' })
        }
        res.status(200).json(cat)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch categories" });
    }
}

// @ add all categories 
// @ save on DB
exports.addCategories = async (req, res) => {
    try {
        const { categories } = req.body;
        // @ checked name is not empty
        if (!categories) return res.status(400).json({ error: 'category name is required !' })
        // @ finding a category based on name 
        const isExisting = await Categories.findOne({ categories });
        // @ check category is existing 
        if (isExisting) return res.status(400).send("Category is already exist !")
        // @ save on db 
        const result = await Categories.create({ categories })
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ error: 'Failed to Add categories' });
    }
}