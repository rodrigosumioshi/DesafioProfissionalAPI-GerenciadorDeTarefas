import { Router } from 'express';
import tarefaController from './controllers/tarefaController';

const routes = Router();

routes.post('/tarefa', tarefaController.create);
routes.get('/tarefas', tarefaController.findAll);
routes.get('/tarefa/:id', tarefaController.findById);
routes.put('/tarefa/:id', tarefaController.update);
routes.delete('/tarefa/:id', tarefaController.delete);

export { routes };
