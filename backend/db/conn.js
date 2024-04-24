const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

main().catch((err) => console.error(err));

module.exports = mongoose;
