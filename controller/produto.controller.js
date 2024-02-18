import sequelize from 'sequelize';
import db from '../model/index.js';

const Produto = db.produto;

export const produtoController = {
    create: (request,response)=>{
        if(!request.body.nome){
            res.status(400).send({
                message:"Name must no void"
            })
        }
        const produto = request.body;
        Produto.create(produto)
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || "Can't save product."});
        })
    },

    createAll: (request,response)=>{
        let datas = []
        for (let produto of request.body) {
            if(!produto.nome){
                response.status(400).send({
                    message:"Name must no void"
                })
            }
            Produto.create(produto)
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
        Produto.findAll()
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || "Can't get products."});
        })
    },

    findById: (request,response)=>{
        const id = request.params.id
        Produto.findByPk(id)
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
        
        Produto.findAll({where:{ativo:status}})
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || `Can't get product with status ${status}.`});
        })
    },

    findCategories: (request, response) => {
        Produto.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('categoria')), 'categoria']],
            raw: true
        })
        .then(categories => {
            const categoriesList = categories.map(cat => cat.categoria)
            response.send(categoriesList);
        })
        .catch(e => {
            response.status(500).send({ message: e.message || 'Erro ao buscar categorias.' });
        });
    },    

    findByCategory: (request, response) => {
        const categoria = request.params.categoria;
    
        Produto.findAll({
            where: {
                categoria: categoria
            }
        })
        .then(products => {
            response.send(products);
        })
        .catch(e => {
            response.status(500).send({ message: e.message || `Erro ao buscar produtos da categoria ${categoria}.` });
        });
    },
     
    update: async (request,response)=>{
        const id = request.params.id;
        const produto = request.body;

        const produtoBd = await Produto.findByPk(id);

        
        if (produtoBd) {
            produtoBd.update(produto)
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
        const produtoBd = await Produto.findByPk(id);

        if (produtoBd) {
            await produtoBd.destroy();
            response.status(204).json('O produto foi excluído com sucesso');
        }else{
            response.status(404).json('O produto não existe.');
        }
    },

    deleteALL: async (request,response)=>{
        try {
            await Produto.destroy({where:{}})
            response.status(204).json('Todos os produtos foram excluídos com sucesso!')
        } catch (error) {
            response.status(500).json('Falha ao tentar excluir todo os produtos.')
        }
    },
}