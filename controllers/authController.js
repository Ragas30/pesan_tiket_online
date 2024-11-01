import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, name, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.cookie('jwt', accessToken, { httpOnly: true });
    res.json({ message: 'Login success', accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({ results: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = Math.max(1, page);
  try {
    const users = await User.findAll({
      limit: page,
      offset: (page - 1) * limit
    });
    const response = {
      query: {
        page: page,
      },
      status: {
        code: res.statusCode,
        decription: res.statusMessage
      },
      results: {
        users
      }
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout successfully' });
};

export { register, login, logout, getUserById, getUsers };