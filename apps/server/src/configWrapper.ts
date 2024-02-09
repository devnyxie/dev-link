import dotenv from "dotenv";
import findWorkspaceRoot from "find-yarn-workspace-root";
import path from "path";
export const startApp = () => {
  console.log("Application starting...");
  const workspaceRoot = findWorkspaceRoot();
  if (workspaceRoot) {
    const envPath = path.resolve(workspaceRoot, ".env");
    dotenv.config({ path: envPath });
    require("./index");
  } else {
    throw new Error("dotenv file was not found.");
  }
};
