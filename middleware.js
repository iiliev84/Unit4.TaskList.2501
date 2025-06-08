import express from "express";
import db from "#db/client";
const router = express.Router();
export default router;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
router.use(express.json())

export function verifyToken(req, res, next){
  const authHeader = req.headers['Authorization'];
  const token = authHeader.split(' ')[1];
  const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedJWT
  next();
}