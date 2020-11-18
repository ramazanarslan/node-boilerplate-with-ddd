const connectDB = require("./lib/infrastructure/config/connectDB");
const createServer = require("./lib/infrastructure/webserver/server");

// Start the server
const start = async () => {
  try {
    await connectDB.init();

    await createServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
