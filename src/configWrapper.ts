import dotenv from "dotenv";

export const startApp = () => {
  console.log("Application starting...");
  // Load dotenv configuration
  dotenv.config();
  require("./index");
};
