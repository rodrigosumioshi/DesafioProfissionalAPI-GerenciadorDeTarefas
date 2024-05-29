import { Request, Response } from 'express';
import tarefaService from '../service/tarefaService';

class TarefaController {
  async create(req: Request, res: Response) {
    try {
      const createdTarefa = await tarefaService.create(req.body);
      res.status(201).json(createdTarefa);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const tarefas = await tarefaService.findAll();
      res.json(tarefas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tarefas' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const tarefa = await tarefaService.findById(req.params.id);
      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tarefa' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedTarefa = await tarefaService.update(req.params.id, req.body);
      res.json(updatedTarefa);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar tarefa' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await tarefaService.delete(req.params.id);
      res.json({ message: 'Tarefa removida' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover tarefa' });
    }
  }
}

export default new TarefaController();
