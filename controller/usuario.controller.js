import db from '../model/index.js';

const Usuario = db.usuario;

export const usuarioController = {
    create: (request,response)=>{
        if(!request.body.nome){
            res.status(400).send({
                message:"Name must no void"
            })
        }
        const usuario = request.body;
        Usuario.create(usuario)
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || "Can't save product."});
        })
    },

    createAll: (request,response)=>{
        let datas = []
        for (let usuario of request.body) {
            if(!usuario.nome){
                response.status(400).send({
                    message:"Name must no void"
                })
            }
            Usuario.create(usuario)
            .then(data=>{
                datas.push(data);
            })
            .catch(e=>{
                response.status(500).send({message : e.message || "Can't save product."});
            })
        }
        response.send(datas);
    },

    findAll: (request,response)=>{
        Usuario.findAll()
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || "Can't get products."});
        })
    },

    findById: (request,response)=>{
        const id = request.params.id
        Usuario.findByUk(id)
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || `Can't get product ${id}.`});
        })
    },

    findByStatus: (request,response)=>{
        let status = request.params.status.toLowerCase();
        status = status === 'true' ? true : status === 'false' ? false : null;
        
        Usuario.findAll({where:{ativo:status}})
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || `Can't get product with status ${status}.`});
        })
    },

    update: async (request,response)=>{
        const id = request.params.id;
        const usuario = request.body;

        const usuarioBd = await Usuario.findByUk(id);

        
        if (usuarioBd) {
            usuarioBd.update(usuario)
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
        const usuarioBd = await Usuario.findByUk(id);

        if (usuarioBd) {
            await usuarioBd.destroy();
            response.status(204).json('O usuario foi excluído com sucesso');
        }else{
            response.status(404).json('O usuario não existe.');
        }
    },

    deleteALL: async (request,response)=>{
        try {
            await Usuario.destroy({where:{}})
            response.status(204).json('Todos os usuarios foram excluídos com sucesso!')
        } catch (error) {
            response.status(500).json('Falha ao tentar excluir todo os usuarios.')
        }
    },
}