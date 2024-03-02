import express from "express"
import { cardapioController } from './../controller/cardapio.controller.js';
import {app} from "../index.js"

export const routeProduto = ()=>{
    const router = express.Router();

    router.post('/cardapio', cardapioController.create)
    router.get('/cardapios', cardapioController.findAll)
    router.get('/cardapio/id/:id', cardapioController.findById)
    router.get('/cardapio/categorias', cardapioController.findCategories)
    router.get('/cardapios/categoria/:categoria', cardapioController.findByCategory)
    router.get('/cardapios/status/:status', cardapioController.findByStatus)
    router.patch('/cardapio/id/:id', cardapioController.update)
    router.delete('/cardapio/id/:id', cardapioController.deleteById)
    router.delete('/cardapios', cardapioController.deleteALL)

    app.use('/api',router)
}