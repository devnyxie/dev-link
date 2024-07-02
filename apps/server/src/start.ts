import dotenv from "dotenv";
import findWorkspaceRoot from "find-yarn-workspace-root";
import path from "path";
import fs from "fs";

const startApp = () => {
  console.log("Server is starting...");
  
  // Check if .env file exists in the current directory
  const currentDir = process.cwd();
  const envFilePath = path.resolve(currentDir, ".env");

  if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
    require("./index");
    return;
  }

  // If .env file is not found in the current directory, try to find it in the workspace root
  const workspaceRoot = findWorkspaceRoot(currentDir);

  if (workspaceRoot) {
    const envPath = path.resolve(workspaceRoot, ".env");
    dotenv.config({ path: envPath });
    require("./index");
  } else {
    throw new Error("dotenv file was not found.");
  }
};

startApp();
