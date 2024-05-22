const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    async postSignUp(req, res){
        const { fullName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email já cadastrado');
        }
        new User({
            fullName,
            email,
            password
        }).save().then(() => {
            res.status(200).send('Usuário cadastrado com sucesso');
        }).catch((err) => {
            res.status(500).send('Internal Server Error' + err);
        });
    },

    async getUsers(req, res){
        User.find().then((users) => {
            res.status(200).send(users);
        }).catch((err) => {
            res.status(500).send('Internal Server Error' + err);
        });
    },

    async postSignIn(req, res){
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
            res.status(200).send(user);
        }catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    }
}