import categoriaSchema from "../schema/categoria.schema";
import { CategoriaType } from "../types/categoriaType";

class categoriaService {
    async create(categoria: CategoriaType) {
        const createdCategoria = await categoriaSchema.create(categoria)
        return createdCategoria
    }

    async findAll() {
        const findedCategorias = await categoriaSchema.find()
        return findedCategorias
    }

    async findById(id: string) {
        const findedCategoria = await categoriaSchema.findById(id)
        return findedCategoria
    }

    async update(id: string, categoria: CategoriaType) {
        const updatedCategoria = await categoriaSchema.findByIdAndUpdate(id, {
            id: categoria.id,
            nome: categoria.nome,
            cor: categoria.cor
        }, { new: true })
        return updatedCategoria
    }

    async delete(id: string) {
        try {
            await categoriaSchema.findByIdAndDelete(id)
            return "tarefa removida"
        } catch (error) {
            throw new Error(`Erro ao remover tarefa: ${error}`)
        }
    }
}


export default new categoriaService()