import db from '../model/index.js';

const Evento = db.evento;

export const eventoController = {
    findById: (request,response)=>{
        const id = request.params.id
        Evento.findByUk(id)
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || `Can't get product ${id}.`});
        })
    },

    update: async (request,response)=>{
        const id = request.params.id;
        const evento = request.body;

        const eventoBd = await Evento.findByUk(id);

        
        if (eventoBd) {
            eventoBd.update(evento)
            .then(data=>{
                response.send(data);
            })
            .catch(e=>{
                response.status(500).send({message : e.message || `Can't update product ${id}.`});
            })
            
        } else {
            response.status(404).send({message : e.message || `The product ${id} not exist.`})
        }
    },
}