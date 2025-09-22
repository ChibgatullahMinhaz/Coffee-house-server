const Coffee = require("../../models/coffee.model");

// @ get all featured products 
exports.getAllFeaturedProduct = async (req, res) => {
    try {
        const featured = await Coffee.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(8);
        if (featured.length == 0) {
            return res.json({ message: 'product not found' });
        }
        res.send(featured);
    } catch (error) {
        res.status(500).send(error.message);
        res.status(500).json('internal server error')
    }
}
// @ get top 8 popular products based on soldCount
exports.getAllPopularProducts = async (req, res) => {
    try {
        const popular = await Coffee.find() // coffee document
            .sort({ soldCount: -1 })         // soldCount descending (most sold first)
            .limit(8);                       //  top 8 products

        if (popular.length === 0) {
            return res.status(404).json({ message: 'No popular products found' });
        }

        res.status(200).json(popular);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
