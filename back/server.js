const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = 5000;

const users = []; // Temporary storage for user data
const JWT_SECRET = 'your_jwt_secret';

app.use(cors());
app.use(express.json());

// Register Route
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'Registration successful' });
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
});

// Middleware to check for token (for protected routes)
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

// Protected Route for Logout (or other secured actions)
app.post('/api/logout', authenticateToken, (req, res) => {
    // Clear token logic could be handled on client side.
    res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
