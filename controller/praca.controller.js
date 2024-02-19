import db from '../model/index.js';
import bcrypt from 'bcryptjs';

const Praca = db.praca;

export const pracaController = {
    cadastrar: async (request,response)=>{
        const {nome, senha} = request.body;
        const token = "";

        if(!(nome || senha)){
            res.status(400).send({
                message:"O nome e a senha não podem ser campos vazios."
            })
        }

        const senha_encriptada = await bcrypt.hash(senha, 10);
        const praca = {nome:nome,senha:senha_encriptada,token:token}
        console.log(praca);
        Praca.create(praca)
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || "Não foi possível finalizar o cadastro."});
        })
    },  

    findAll: (request,response)=>{
        Praca.findAll()
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || "Can't get products."});
        })
    },

    findById: (request,response)=>{
        const id = request.params.id
        Praca.findByUk(id)
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

        const pracaBd = await Praca.findByUk(id);

        
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
        const pracaBd = await Praca.findByUk(id);

        if (pracaBd) {
            await pracaBd.destroy();
            response.status(204).json('O praca foi excluído com sucesso');
        }else{
            response.status(404).json('O praca não existe.');
        }
    },

    deleteALL: async (_,response)=>{
        try {
            await Praca.destroy({where:{}})
            response.status(204).json('Todos os pracas foram excluídos com sucesso!')
        } catch (error) {
            response.status(500).json('Falha ao tentar excluir todo os pracas.')
        }
    },
}