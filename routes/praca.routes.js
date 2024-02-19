import express from "express"
import { pracaController } from './../controller/praca.controller.js';
import {app} from "../index.js"

export const routePraca = ()=>{
    const router = express.Router();

    router.post('/praca/cadastrar', pracaController.cadastrar)
    router.get('/praca/login', pracaController.login)
    router.patch('/praca/id/:id', pracaController.update)
    router.delete('/praca/id/:id', pracaController.deleteById)
    router.delete('/pracas', pracaController.deleteALL)

    app.use('/api',router)
}