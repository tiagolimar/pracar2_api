import express from "express";
import { pracaController } from './../controller/praca.controller.js';
import {app} from "../index.js"

export const routePraca = ()=>{
    const router = express.Router();

    router.post('/praca/cadastrar', pracaController.cadastrar)
    router.post('/praca/check', pracaController.check)
    router.post('/praca/login', pracaController.login)
    router.patch('/praca/update', pracaController.update)
    router.patch('/praca/caixa', pracaController.updateCaixa)

    router.get('/praca/evento/:id', pracaController.getEvento)
    router.patch('/praca/evento', pracaController.updateEvento)

    router.get('/praca/pagamentos/:id', pracaController.getPagamentos)
    router.patch('/praca/pagamentos', pracaController.updatePagamentos)

    app.use('/api',router)
}