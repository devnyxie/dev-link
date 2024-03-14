import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import teamsRouter from "./routes/teams.router";
import usersRouter from "./routes/users.router";
import membersRouter from "./routes/members.router";
import requestsRouter from "./routes/requests.router";
import authRouter from "./routes/auth.router";
import cors from "cors";
import codeLangsRouter from "./routes/codeLangs.router";
import searchRouter from "./routes/search.router";

// App Setup
const app: Express = express();

// Middlewares
app.use(
  cors({
    origin: [process.env.CLIENT_URL || ""],
  })
);
app.use(bodyParser.json());

// Port
const port = process.env.PORT || 8080;

// App Start
app.listen(port, async () => {
  console.log(`
  [server]: Server is running at http://localhost:${port} ⚡
  \nPlease connect via ${process.env.CLIENT_URL || ""} to access the API.\n`);
});

// Routers
//   - Teams Router
app.use("/api", teamsRouter);
//   - Users Router
app.use("/api", usersRouter);
//   - Members Router
app.use("/api", membersRouter);
//   - Requests Router
app.use("/api", requestsRouter);
//   - Auth Router
app.use("/api", authRouter);
//   - CodeLangs Router
app.use("/api", codeLangsRouter);
//   - Search Router (for searching Teams, Users, Technologies etc by query)
app.use("/api", searchRouter);

// Graceful Shutdown
// to-be-implemented
