import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error from Auth Controller login' });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;
    const user = new User({ email, password, role, name });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role, name: user.name } });
  } catch (err) {
    res.status(500).json({ msg: `Server error from Auth Controller signup ${err.message}` });
  }
};

export const logout = (req, res) => {
  res.json({ msg: 'Logged out successfully' });
};