// @ get all featured products 
exports.getAllFeaturedProduct = async (req, res)=>{
     try {
        
    } catch (error) {
        res.status(500).send(error.message);
        res.status(500).json('internal server error')
    }
}

// @ get all best products based on rating. 
exports.getAllPopularProducts = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).send(error.message);
        res.status(500).json('internal server error')
    }
}