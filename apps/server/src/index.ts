import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
// import { connectToDatabase } from "./database/db";
import { database } from "./database/db";
import { handleGracefulShutdown } from "./shutdown";
import { DataTypes, Sequelize } from "sequelize";
import bodyParser from "body-parser";
import teamsRouter from "./routes/teams.router";
import usersRouter from "./routes/users.router";
import membersRouter from "./routes/members.router";
import requestsRouter from "./routes/requests.router";

// App Setup
const app: Express = express();
// Middleware
app.use(bodyParser.json());
// Port
const port = process.env.SERVER_PORT || 3000;
// App Start
app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port} ⚡`);
  // await handleGracefulShutdown(app, database);
});
// Routers
//   - Teams Router
app.use("/", teamsRouter);
//   - Users Router
app.use("/", usersRouter);
//   - Members Router
app.use("/", membersRouter);
//   - Requests Router
app.use("/", requestsRouter);
