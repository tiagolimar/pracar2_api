import express from "express"
import { produtoController } from './../controller/produto.controller.js';
import {app} from "../index.js"

export const routeProduto = ()=>{
    const router = express.Router();

    router.post('/produto', produtoController.create)
    router.post('/produtos', produtoController.createAll)
    router.get('/produtos', produtoController.findAll)
    router.get('/produto/id/:id', produtoController.findById)
    router.get('/produto/categorias', produtoController.findCategories)
    router.get('/produtos/categoria/:categoria', produtoController.findByCategory)
    router.get('/produtos/status/:status', produtoController.findByStatus)
    router.patch('/produto/id/:id', produtoController.update)
    router.delete('/produto/id/:id', produtoController.deleteById)
    router.delete('/produtos', produtoController.deleteALL)

    app.use('/api',router)
}