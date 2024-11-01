import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      console.error('JWT Verification Error:', error);
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    next();
  });

};

export default authMiddleware;