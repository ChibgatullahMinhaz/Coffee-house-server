const { getDB } = require("../../Config/db");

//models 
const Coffee = require("../../models/coffee.model");

exports.getAllCoffee = async (req, res) => {
    try {
        const coffee = await Coffee.find().sort({ _id: -1 });
        if (coffee.length === 0) {
            return res.status(200).json({ message: 'not coffee found' })
        }
        res.status(200).send(coffee)
    } catch (err) {
        console.error('Error finding users:', err);
        res.status(500).json('internal server error ', err)
    }
}

// update a coffee
//@ put operation
//@ update coffee data 
exports.updateCoffee = async (req, res) => {
    try {
        const id = req.params.id;

        // Extract fields from FormData
        const {
            name,
            category,
            description,
            price,
            currency,
            roastLevel,
            origin,
            inStock,
            available,
            isSpecial,
            seasonal,
            quantity,
            caffeineContent,
            calories,
            ratings,
            tags = '',
            ingredients = '',
        } = req.body;


        const sizes = req.body.sizes
            ? Array.isArray(req.body.sizes)
                ? req.body.sizes // @ multiple size could be an array 
                : [req.body.sizes] // @ single size could not an array so need to convert array of string.
            : [];

        const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
        /**
         * split(',) => convert string to Array;
         * trim() => remove Extra space;
         * filter=> basically filter return an array basis condition. so, when i use Boolean it's means remove all falsy value
         * filter(Boolean) => js shorten who has remove all falsy value of any array.
         */
        const ingredientsArray = ingredients.split(',').map(i => i.trim()).filter(Boolean);

        // Handle uploaded images
        let images = [];
        if (req.files && req.files.length > 0) {
            //@ get filename array from fils
            images = req.files.map(f => f.filename);
        }

        // Check if coffee exists
        const existing = await Coffee.findById(id);
        if (!existing) return res.status(404).json({ msg: 'Coffee not found' });

        // Prepare update payload
        const updatePayload = {
            name,
            category,
            description,
            price,
            currency,
            roastLevel,
            origin,
            inStock: inStock === 'true' || inStock === true,
            available: available === 'true' || available === true,
            isSpecial: isSpecial === 'true' || isSpecial === true,
            seasonal: seasonal === 'true' || seasonal === true,
            quantity,
            caffeineContent,
            calories,
            ratings,
            tags: tagsArray,
            ingredients: ingredientsArray,
            sizes,
            //@ spread all images filesname
            ...(images.length > 0 && { images }),
        };

        const updatedCoffee = await Coffee.findByIdAndUpdate(id, updatePayload, { new: true });

        res.status(200).json(updatedCoffee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Update failed" });
    }
};



// @delete a coffee

exports.deleteCoffee = async (req, res) => {
    try {

        const query = req.params.id;
        const cof = await Coffee.findById(query)
        if (!cof) {
            return res.status(404).send({ msg: "coffee not found" })
        }
        const result = await Coffee.findByIdAndDelete(query,);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error')
    }
}


// add a coffee
// @ save on DB
exports.addOneCoffee = async (req, res) => {
    try {
        // 1️⃣ check if files exist
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        // 2️⃣ get image paths from req.files
        // assuming 'images' folder is inside 'public'
        const imagePaths = req.files.map(file => file.filename);

        // 3️⃣ combine form data from req.body with image paths
        const coffeeData = {
            ...req.body,
            images: imagePaths, // add image paths array to DB
        };

        //@ new coffee object with validate 
        const coffee = await Coffee(coffeeData)
        // @ save on db 
        const result = await coffee.save()
        res.status(201).send(result);
        console.log(result)
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
}


// get coffee by id
exports.getCoffeeDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Coffee.findById(id);
        if (!result) {
            return res.status(404).json({ message: "Coffee not found" });
        }
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error')
    }
}
