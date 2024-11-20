const Horarios = require('../models/Horarios'); // Importa o modelo Horarios

class ControllerHorarios {
    // Método para criar um novo horário
    static async criarHorario(req, res) {
        try {
            const { empresa_id, dia, abertura, fechamento } = req.body;
            const horario = new Horarios(null, empresa_id, dia, abertura, fechamento);
            const id = await Horarios.salvar(horario);
            res.status(201).json({ id, message: 'Horário criado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar horário' });
        }
    }

    // Método para obter todos os horários
    static async obterHorarios(req, res) {
        try {
            const horarios = await Horarios.obterTodos();
            res.status(200).json(horarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter horários' });
        }
    }

    // Método para obter horários de uma empresa por dia
    static async obterHorariosPorEmpresaDia(req, res) {
        try {
            const { empresa_id, dia } = req.params;
            const horarios = await Horarios.obterPorEmpresaDia(empresa_id, dia);
            if (horarios.length > 0) {
                res.status(200).json(horarios);
            } else {
                res.status(404).json({ message: 'Horários não encontrados para a empresa e dia informados' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter horários' });
        }
    }

    // Método para atualizar um horário
    static async atualizarHorario(req, res) {
        try {
            const { id } = req.params;
            const { empresa_id, dia, abertura, fechamento } = req.body;
            const horario = new Horarios(id, empresa_id, dia, abertura, fechamento);
            await Horarios.atualizar(horario);
            res.status(200).json({ message: 'Horário atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar horário' });
        }
    }

    // Método para deletar um horário
    static async deletarHorario(req, res) {
        try {
            const { id } = req.params;
            await Horarios.deletar(id);
            res.status(200).json({ message: 'Horário deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar horário' });
        }
    }

    // Método para contar todos os horários
    static async contarHorarios(req, res) {
        try {
            const totalHorarios = await Horarios.contarTodos();
            res.status(200).json({ total: totalHorarios });
        } catch (error) {
            console.error('Erro ao contar horários:', error);
            res.status(500).json({ message: 'Erro ao contar horários' });
        }
    }
}

module.exports = ControllerHorarios;
