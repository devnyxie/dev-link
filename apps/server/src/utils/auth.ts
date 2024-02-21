import jwt, { JwtPayload } from "jsonwebtoken";
import express from "express";
import { expressjwt } from "express-jwt";

const secretKey = process.env.TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!secretKey || !refreshTokenSecret) {
  throw new Error("Secret key not found");
}

// Middleware for checking JWT
const jwtMiddleware = expressjwt({
  secret: secretKey,
  algorithms: ["HS256"],
});

// Function to sign tokens
const signToken = (payload: any) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

// Function to sign refresh tokens
const signRefreshToken = (payload: any) => {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: "7d" });
};

// Function to verify tokens
const verifyToken = (token: any) => {
  return jwt.verify(token, secretKey);
};

// Function to verify refresh tokens
const verifyRefreshToken = (token: any) => {
  return jwt.verify(token, refreshTokenSecret);
};

// Function to verify refresh tokens
const compareIdInToken = (token: string, idToCompare: string) => {
  try {
    const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
    return decoded.id === idToCompare;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// app.use(jwtMiddleware);

export {
  signToken,
  signRefreshToken,
  verifyToken,
  verifyRefreshToken,
  jwtMiddleware,
};
