import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    //console.log('Auth Header:', authHeader); // Debug: Log incoming header

    if (!authHeader) {
      // Allow missing token for non-protected routes (
      if (req.path === '/auth/logout') {  
        req.user = null; 
        return next();
      }
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'Invalid token format. Use Bearer <token>' });
    }

    // console.log('Token:', token); // Debug: Log token (don't in prod!)

    const secret = process.env.JWT_SECRET || 'secretkey';
    const decoded = jwt.verify(token, secret);
    // console.log('Decoded:', decoded); // Debug: Log payload

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // Role check: Only enforce for admin routes (e
    if (req.path.startsWith('/categories') && user.role !== 'admin') {  // Customize per route
      return res.status(401).json({ msg: 'Access denied: Admin role required' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message); // Debug: Log specific error
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Invalid token signature' });
    }
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;