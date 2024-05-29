import tarefaSchema from "../schema/tarefa.schema";
import { tarefaType } from "../types/tarefaType";

class TarefaService {
  async create(tarefa: tarefaType) {
    return await tarefaSchema.create(tarefa);
  }

  async findAll() {
    return await tarefaSchema.find();
  }

  async findById(id: string) {
    return await tarefaSchema.findById(id);
  }

  async update(id: string, tarefa: tarefaType) {
    return await tarefaSchema.findByIdAndUpdate(id, tarefa, { new: true });
  }

  async delete(id: string) {
    return await tarefaSchema.findByIdAndDelete(id);
  }
}

export default new TarefaService();
