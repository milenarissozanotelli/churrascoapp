const List = require('../models/listModel');

module.exports = {
    async postList(req, res){
        const { title, userId, people } = req.body;
        if (!title || !userId || !people) {
            return res.status(400).json({ error: 'Preencha todos os campos' });
        }
        try {
            const list = new List({ title, userId, people });
            await list.save();
            res.status(201).json({ message: 'Lista cadastrada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    },

    async getListsByUser(req, res){
        const { userId } = req.params;
        try {
            const lists = await List.find({ userId }).sort({ createdAt: 1 });
            res.status(200).json(lists);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    },

    async deleteList(req, res){
        const { listId } = req.params;
        try {
            await List.findOneAndDelete({ _id: listId });
            res.status(200).json({ message: 'Lista deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    }
}