import express from "express"
import { usuarioController } from './../controller/usuario.controller.js';
import {app} from "../index.js"

export const routeUsuario = ()=>{
    const router = express.Router();

    router.post('/usuario', usuarioController.create)
    router.post('/usuarios', usuarioController.createAll)
    router.get('/usuarios', usuarioController.findAll)
    router.get('/usuario/id/:id', usuarioController.findById)
    router.get('/usuarios/status/:status', usuarioController.findByStatus)
    router.patch('/usuario/id/:id', usuarioController.update)
    router.delete('/usuario/id/:id', usuarioController.deleteById)
    router.delete('/usuarios', usuarioController.deleteALL)

    app.use('/api',router)
}