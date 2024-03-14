import express from "express";
import { verifyRefreshToken, signToken } from "../utils/auth";

const router = express.Router();

router.post("/refresh-token", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    if (typeof payload === "string") {
      throw new Error("Invalid payload");
    }
    const token = signToken({ userId: payload.userId });
    res.json({ token: token });
  } catch (err) {
    res.sendStatus(403);
  }
});

export default router;
