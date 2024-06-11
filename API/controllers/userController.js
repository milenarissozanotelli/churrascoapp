const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async postSignUp(req, res) {
        const { fullName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email já cadastrado');
        }
        const newUser = new User({
            fullName,
            email,
            password
        });
        try {
            await newUser.save();
            res.status(200).send('Usuário cadastrado com sucesso');
        } catch (err) {
            res.status(500).send('Internal Server Error: ' + err);
        }
    },

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).send(users);
        } catch (err) {
            res.status(500).send('Internal Server Error: ' + err);
        }
    },

    async postSignIn(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send('Usuário não encontrado');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('Senha incorreta');
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ user, token });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    }
}