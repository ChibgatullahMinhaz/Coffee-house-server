const { default: mongoose } = require("mongoose")

const connectingDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('mongodb connect with mongoose');
    } catch (error) {
        console.log("MongoDB connection failed:", error.message)
        process.exit(1);
    }
}
module.exports = connectingDB;