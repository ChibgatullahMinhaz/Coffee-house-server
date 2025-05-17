const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
const app = express();
// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cksixld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {

    const coffeeCollection = client.db("coffeesDB").collection("coffees");
    const usersCollection = client.db("coffeesDB").collection("users");
    const usersThirdPartyCollection = client
      .db("coffeesDB")
      .collection("thirdPartyUsers");

    app.get("/coffees", async (req, res) => {
      const result = await coffeeCollection.find().toArray();
      res.send(result);
    });
    // get users
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });


    // get third party users
    app.get("/thirdPartyUsers", async (req, res) => {
      const result = await usersThirdPartyCollection.find().toArray();
      res.send(result);
    });
    app.get("/thirdPartyUsers/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersThirdPartyCollection.findOne(query);
      res.send(result);
    });

    // get user by email
    app.get("/user", async (req, res) => {
      const result = await usersThirdPartyCollection.find().toArray();
      res.send(result);
    });

    // get coffee by id
    app.get("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.findOne(query);
      res.send(result);
    });


    // get user by id
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.findOne(query);
      res.send(result);
    });

    // add a coffee
    app.post("/coffees", async (req, res) => {
      const coffee = req.body;
      const result = await coffeeCollection.insertOne(coffee);
      res.send(result);
    });
    // add a user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // add a third party user
    app.post("/thirdPartyUsers", async (req, res) => {
      const user = req.body;
      const result = await usersThirdPartyCollection.insertOne(user);
      res.send(result);
    });

    // update a coffee
    app.put("/coffees/:id", async (req, res) => {
      try {
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
    });

    // delete a coffee
    app.delete("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.deleteOne(query);
      res.send(result);
    });

    // delete a user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection


    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {

  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Coffee server is getting hotter.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
