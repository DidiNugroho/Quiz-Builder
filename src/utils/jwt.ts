//make me a function to decode and verify jwt token and return the decoded payload
// Solution
import jwt from "jsonwebtoken";

export function signToken(payload: object) {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET as string);
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
}
