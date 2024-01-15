import dotenv from "dotenv";

// Load dotenv configuration
dotenv.config();

// Export a function to start your application
export const startApp = () => {
  // Load dotenv configuration
  dotenv.config();
  // Add any additional setup logic here if needed
  console.log("Application starting...");
  // Start your actual application logic (e.g., index.ts)
  require("./index");
};
