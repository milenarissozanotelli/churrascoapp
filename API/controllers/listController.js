const List = require('../models/listModel');

module.exports = {
    async postList(req, res){
        const { title, userId, people } = req.body;
        if (!title || !userId || !people) {
            return res.status(400).send('Preencha todos os campos');
        };
        new List({
            title,
            userId,
            people
        }).save().then(() => {
            res.status(200).send('Lista cadastrada com sucesso');
        }).catch((err) => {
            res.status(500).send('Internal Server Error' + err);
        });
    },

    async getListsbyUser(req, res){
        const { userId } = req.params;
        List.find({ userId }).sort({ createdAt: 1 }).then((lists) => {
            res.status(200).send(lists);
        }).catch((err) => {
            res.status(500).send('Internal Server Error' + err);
        });
    },

    async deleteList(req, res){
        const { listId } = req.params;
        List.findOneAndDelete({_id: listId}).then(() => {
            res.status(200).send('Lista deletada com sucesso');
        }).catch((err) => {
            res.status(500).send('Internal Server Error' + err);
        });
    }
}