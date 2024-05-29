import { Schema, model } from 'mongoose';

const tarefaSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default model("Tarefa", tarefaSchema);
