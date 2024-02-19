import db from '../model/index.js';

const Praca = db.praca;

export const pracaController = {
    cadastrar: (request,response)=>{
        if(!request.body.nome){
            res.status(400).send({
                message:"Name must no void"
            })
        }
        const praca = request.body;
        Praca.create(praca)
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || "Can't save product."});
        })
    },  

    findAll: (request,response)=>{
        praca.findAll()
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || "Can't get products."});
        })
    },

    findById: (request,response)=>{
        const id = request.params.id
        praca.findByUk(id)
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || `Can't get product ${id}.`});
        })
    },

    update: async (request,response)=>{
        const id = request.params.id;
        const praca = request.body;

        const pracaBd = await praca.findByUk(id);

        
        if (pracaBd) {
            pracaBd.update(praca)
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

    deleteById: async (request,response)=>{
        const id = request.params.id;
        const pracaBd = await praca.findByUk(id);

        if (pracaBd) {
            await pracaBd.destroy();
            response.status(204).json('O praca foi excluído com sucesso');
        }else{
            response.status(404).json('O praca não existe.');
        }
    },

    deleteALL: async (request,response)=>{
        try {
            await praca.destroy({where:{}})
            response.status(204).json('Todos os pracas foram excluídos com sucesso!')
        } catch (error) {
            response.status(500).json('Falha ao tentar excluir todo os pracas.')
        }
    },
}