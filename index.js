const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.cksixld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


// routes
app.get('/', (req, res) => {
    res.send('Hello World!');

});


const run = async () => {
    try {
        await client.connect();

        const coffeeCollection = client.db("coffeeDB").collection("coffees");
        app.get('/coffees', async (req, res) => {
            const result = await coffeeCollection.find().toArray();
            res.send(result);
        })



        // get coffee by id
        app.get('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await coffeeCollection.findOne(query);
            res.send(result);
        })


        app.post('/coffees', async (req, res) => {
            const coffee = req.body;
            const result = await coffeeCollection.insertOne(coffee)
        })


        app.put('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const coffee = req.body;
            const query = { _id: new ObjectId(id) };
            const updatedCoffee = {
                $set: {
                    coffee
                }
            }
            const result = await coffeeCollection.updateOne(query, updatedCoffee)
            res.send(result);
        })


        app.delete('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await coffeeCollection.deleteOne(query);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});