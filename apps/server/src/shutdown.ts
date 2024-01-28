import { Sequelize } from "sequelize";

let isCleanupPerformed = false;

export async function handleGracefulShutdown(
  server: any,
  sequelize: Sequelize
): Promise<void> {
  const cleanup = async () => {
    if (!isCleanupPerformed) {
      isCleanupPerformed = true;
      await shutdown(server, sequelize);
    }
  };

  process.on("beforeExit", cleanup);
  process.on("uncaughtException", cleanup);
  process.on("SIGINT", cleanup);
}

async function shutdown(server: any, sequelize: Sequelize): Promise<void> {
  try {
    await sequelize.close();
    console.log("\n[server]: Sequelize connection closed 🔌");
  } catch (error) {
    console.error("Error closing Sequelize connection:", error);
  }

  return new Promise<void>((resolve) => {
    server.close(() => {
      console.log("Express server closed 🔌");
      resolve();
    });
  });
}
