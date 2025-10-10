const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 5000, NODE_ENV = "development" } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`);
      console.log("✅ Database connection successful");
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:");
    console.error(`📝 Error: ${error.message}`);
    console.error("🔧 Please check your DB_HOST in .env file");
    process.exit(1);
  });
