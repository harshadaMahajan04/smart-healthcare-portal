// const mongoose = require('mongoose')

// const connectDB = async () => {
//   try {
//     console.log("URI:", process.env.MONGO_URI);
//     const conn = await mongoose.connect(process.env.MONGO_URI)
//     console.log(`MongoDB Connected: ${conn.connection.host}`)
//   } catch (error) {
//     console.error(`MongoDB connection error: ${error.message}`)
//     process.exit(1) // stop the server if DB fails
//   }
// }

// module.exports = connectDB
const dns = require("dns");

// Force Node to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("DNS Servers:", dns.getServers());

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;