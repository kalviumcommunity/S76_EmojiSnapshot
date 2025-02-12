const mongoose = require("mongoose");

const connectDatabase = () => {
  // Validate environment variable
  if (!process.env.DB_URL) {
    console.error("Database Error: DB_URL environment variable is not defined");
    process.exit(1);
  }

  const connectWithRetry = (retries = 3) => {
    return mongoose
      .connect(process.env.DB_URL)
      .then((data) => {
        console.log(
          `MongoDB connected successfully with server: ${data.connection.host}`
        );
      })
      .catch((err) => {
        if (retries > 0) {
          console.log(
            `Database connection attempt failed. Retrying... (${retries} attempts left)`
          );
          console.log(`Error details: ${err.message}`);
          // Wait 5 seconds before retrying
          return new Promise((resolve) => setTimeout(resolve, 5000)).then(() =>
            connectWithRetry(retries - 1)
          );
        }

        console.error("Database connection failed permanently:");
        console.error(`Error type: ${err.name}`);
        console.error(`Error message: ${err.message}`);
        process.exit(1);
      });
  };

  return connectWithRetry();
};

module.exports = connectDatabase;
