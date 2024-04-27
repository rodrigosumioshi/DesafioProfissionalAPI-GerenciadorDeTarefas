import usuarioSchema from "../schema/usuario.schema";
import { usuarioType } from "../types/usuarioType";

class usuarioService {
    async create(usuario: usuarioType) {
        const createdUsuario = await usuarioSchema.create(usuario)
        return createdUsuario
    }

    async findAll() {
        const findedUsuarios = await usuarioSchema.find()
        return findedUsuarios
    }

    async findById(id: string) {
        const findedUsuario = await usuarioSchema.findById(id)
        return findedUsuario
    }

    async update(id: string, usuario: usuarioType) {
        const updateBook = await usuarioSchema.findByIdAndUpdate(id, {
            id: usuario.id,
            nome: usuario.nome,
            peso: usuario.peso,
            senha: usuario.senha,
            email: usuario.email
        }, { new: true })
        return updateBook
    }

    async delete(id: string) {
        try {
            await usuarioSchema.findByIdAndDelete(id)
            return "Usuário Removido"
        } catch (error) {
            throw new Error(`Erro ao remover usuário: ${error}`)
        }
    }
}


export default new usuarioService()