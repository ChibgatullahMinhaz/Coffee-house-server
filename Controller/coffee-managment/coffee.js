const { getDB } = require("../../Config/db");

//models 
const Coffee = require("../../models/coffee.model");

exports.getAllCoffee = async (req, res) => {
    try {
        const coffee = await Coffee.find();
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
        const coffee = req.body;

        // Check product exists
        const existing = await Coffee.findById(id);
        if (!existing) {
            return res.status(404).json({ msg: "Coffee not found" });
        }

        // Update product
        const updatedCoffee = await Coffee.findByIdAndUpdate(id, coffee, {
            new: true,
        });

        res.json(updatedCoffee);
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
    const coffeeData = req.body;
    try {
        //@ new coffee object with validate 
        const coffee = await Coffee(coffeeData)
        // @ save on db 
        const result = await coffee.save()
        res.status(201).send(result);
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