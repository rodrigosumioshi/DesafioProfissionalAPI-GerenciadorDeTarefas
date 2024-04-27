import { Request, Response } from 'express'
import usuarioService from '../service/usuarioService'


class usuarioController {
    async create(req: Request, res: Response) {
        const createdUsuario = await usuarioService.create(req.body)
        res.status(201)
        return res.json(createdUsuario)
    }

    async findAll(req: Request, res: Response) {
        const findedUsuarios = await usuarioService.findAll()
        return res.json(findedUsuarios)
    }

    async findById(req: Request, res: Response) {
        const findedUsuario = await usuarioService.findById(req.params.id)
        return res.json(findedUsuario)
    }

    async update(req: Request, res: Response) {
        const updatedUsuario = await usuarioService.update(req.params.id, req.body)
        return res.json(updatedUsuario)
    }

    async delete(req: Request, res: Response) {
        const deleteMessage = await usuarioService.delete(req.params.id)
        return res.json(deleteMessage)
    }
}

export default new usuarioController()