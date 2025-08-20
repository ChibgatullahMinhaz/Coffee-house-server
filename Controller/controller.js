exports.getServer = (req, res) => {
  res.status(200).send("server is Learning....");
};





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
    const usersCollection = client.db("coffeesDB").
    const usersThirdPartyCollection = client
      
      .collection("thirdPartyUsers");

   
   

    // get third party users
    app.get("/thirdPartyUsers", async (req, res) => {
      const result = await usersThirdPartyCollection.find().toArray();
      res.send(result);
    });

    // get third party user by email
    app.get("/thirdPartyUsers", async (req, res) => {
      const email = req.query.email;
      // Case-insensitive match
      const query = { email: { $regex: new RegExp(`^${email}$`, "i") } };
      const result = await usersThirdPartyCollection.findOne(query);
      if (!result) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send(result);
    });

    

    

    
    
    

    

    
  
   
  } finally {
    console.log("server running");
  }
};
run().catch(console.dir);