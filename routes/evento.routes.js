import express from "express"
import { eventoController } from './../controller/evento.controller.js';
import {app} from "../index.js"

export const routeEvento = ()=>{
    const router = express.Router();

    router.get('/evento/praca/id/:id', eventoController.findById)
    router.patch('/evento/praca/id/:id', eventoController.update)

    app.use('/api',router)
}