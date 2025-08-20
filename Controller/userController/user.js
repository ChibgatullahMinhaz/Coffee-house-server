const { getDB } = require("../../Config/db");

// get users
exports.getAllUsers = async (req, res) => {
    try {
        const db = getDB()
        const usersCollection = db.collection("users");
        const result = await usersCollection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

// update user activity 
exports.updateUserIsOnlineStatus = async (req, res) => {
    try {
        const { email, isOnline, lastSignInTime } = req.body;
        const query = { email: email };
        console.log(email, lastSignInTime, isOnline);
        const db = getDB()
        const usersCollection = db.collection("users");
        const updatedDoc = {
            $set: { lastSignInTime: lastSignInTime, isOnline: isOnline },
        };
        const result = await usersCollection.updateOne(query, updatedDoc);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error')
    }
};



// delete a user
exports.deleteUser = async (req, res) => {
    try {
        const db = getDB()
        const usersCollection = db.collection("users");
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error')
    }
};



// add a user
exports.createUser = async (req, res) => {
    try {
        const db = getDB()
        const usersCollection = db.collection("users");
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error')
    }
};



// get active users
exports.getActiveUser = async (req, res) => {
    try {
        const db = getDB()
        const usersCollection = db.collection("users");
        const query = { isOnline: true };
        const result = await usersCollection.find(query).toArray();
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error ')
    }
};


exports.getDeactiveUser = async (req, res) => {
    try {
        const db = getDB()
        const usersCollection = db.collection("users");
        const query = { isOnline: false };
        const result = await usersCollection.find(query).toArray();
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error ')

    }
};


// get user by id
exports.getUserDetails = async (req, res) => {
    try {
        const db = getDB()
        const usersCollection = db.collection("users");
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.findOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json('internal server error ')
    }
};