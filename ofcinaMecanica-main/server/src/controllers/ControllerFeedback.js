const Feedback = require('../models/Feedback'); // Importa o modelo de Feedback

// Controller para Feedback
class ControllerFeedback {
    
    // Método para criar um novo feedback
    static async criarFeedback(req, res) {
        try {
            const { id_cliente, id_servico, comentario, avaliacao } = req.body;
            const novoFeedback = new Feedback(null, id_cliente, id_servico, comentario, avaliacao);
            const idFeedback = await Feedback.salvar(novoFeedback);
            res.status(201).json({ message: 'Feedback criado com sucesso!', id: idFeedback });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar feedback', error });
        }
    }

    // Método para obter todos os feedbacks
    static async obterFeedbacks(req, res) {
        try {
            const feedbacks = await Feedback.obterTodos();
            res.status(200).json(feedbacks);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter feedbacks', error });
        }
    }

    // Método para obter um feedback por ID
    static async obterFeedbackPorId(req, res) {
        try {
            const { id_feedback } = req.params;
            const feedback = await Feedback.obterPorId(id_feedback);

            if (feedback) {
                res.status(200).json(feedback);
            } else {
                res.status(404).json({ message: 'Feedback não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter feedback', error });
        }
    }

    // Método para atualizar um feedback
    static async atualizarFeedback(req, res) {
        try {
            const { id_feedback } = req.params;
            const { id_cliente, id_servico, comentario, avaliacao } = req.body;

            const feedbackAtualizado = new Feedback(id_feedback, id_cliente, id_servico, comentario, avaliacao);
            await Feedback.atualizar(feedbackAtualizado);
            res.status(200).json({ message: 'Feedback atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar feedback', error });
        }
    }

    // Método para deletar um feedback
    static async deletarFeedback(req, res) {
        try {
            const { id_feedback } = req.params;
            await Feedback.deletar(id_feedback);
            res.status(200).json({ message: 'Feedback deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar feedback', error });
        }
    }
}

module.exports = ControllerFeedback;
