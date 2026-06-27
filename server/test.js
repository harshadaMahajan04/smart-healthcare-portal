const mongoose = require("mongoose");

const uri =
  "mongodb+srv://harshadamahajan:Harshada%40130@cluster4.qsjjftg.mongodb.net/healthcare?retryWrites=true&w=majority&appName=Cluster4";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:");
    console.error(err);
    process.exit(1);
  }
}

connect();