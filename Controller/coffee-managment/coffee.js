const { getDB } = require("../../Config/db");

exports.getAllCoffee = async (req, res) => {
    const db = getDB()
    const coffeeCollection = db.collection("coffees")
    const result = await coffeeCollection.find().toArray();
    res.send(result);
}

// update a coffee
exports.updateCoffee = async (req, res) => {
    try {
        const db = getDB()
        const coffeeCollection = db.collection("coffees")
        const id = req.params.id;
        const coffee = req.body;
        const query = { _id: new ObjectId(id) };
        const updatedCoffee = {
            $set: coffee,
        };
        const result = await coffeeCollection.updateOne(query, updatedCoffee);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Update failed" });
    }
}


// delete a coffee
exports.deleteCoffee = async (req, res) => {
    try {
        const db = getDB()
        const coffeeCollection = db.collection("coffees")
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await coffeeCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error')
    }
}


// add a coffee
exports.addOneCoffee = async (req, res) => {
    try {
        const db = getDB()
        const coffeeCollection = db.collection("coffees")
        res.send(result);
        const coffee = req.body;
        const result = await coffeeCollection.insertOne(coffee);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error')
    }
}


// get coffee by id
exports.getCoffeeDetails = async (req, res) => {
    try {
        const db = getDB()
        const coffeeCollection = db.collection("coffees")
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await coffeeCollection.findOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error')
    }
}