import db from '../model/index.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const Praca = db.praca;

function gerarToken(){
    return crypto.randomBytes(4).toString('hex');
}

export const pracaController = {
    cadastrar: async (request,response)=>{
        const {nome, senha} = request.body;
        if(!nome || !senha){
            response.status(400).send({
                message:"O nome e a senha não podem ser campos vazios."
            })
        }
        
        const dados = await Praca.findAll({where:{nome:nome}})[0];
        console.log(dados);
        if(Object.keys(dados).lenght>0){
            response.status(400).send({
                message:"Já existe uma praça com esse nome."
            })
        }else{
            const senha_encriptada = await bcrypt.hash(senha, 10);
            const token = gerarToken()
            const praca = {nome:nome,senha:senha_encriptada,token:token}
    
            Praca.create(praca)
            .then(dados=>{
                response.send(dados);
            })
            .catch(e=>{
                response.status(500).send({message : e.message || "Não foi possível finalizar o cadastro."});
            })
        }

    },

    login: async (request,response)=>{
        const {nome, senha} = request.body;

        let dados = await Praca.findAll({where:{nome:nome}})
        dados = dados[0]

        if (dados){
            const senhasConferem = await bcrypt.compare(senha, dados.senha)

            if (senhasConferem){
                response.send(dados);
            }else{
                response.status(400).send({
                    message:"O nome ou a senha não conferem."
                })
            }
        }else{
            response.status(400).send({
                message:"O nome ou a senha não conferem."
            })
        }
        response.status(500).send({message:dados.message || "Não foi possível verificar o nome e a senha."});
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