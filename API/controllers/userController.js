const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Substitua por uma chave secreta adequada e mantenha-a segura

module.exports = {
    async postSignUp(req, res) {
        const { fullName, email, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }
            const user = new User({ fullName, email, password });
            await user.save();
            res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    },

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    },

    async postSignIn(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Senha incorreta' });
            }
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });
            res.status(200).json({ token, refreshToken });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }
}
