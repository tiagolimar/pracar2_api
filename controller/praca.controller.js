import db from '../model/index.js';
import bcrypt from 'bcryptjs';

import { gerarToken } from './functions/index.js';
import { gerarURL } from './functions/index.js';

const Praca = db.praca;

export const pracaController = {
    cadastrar: async (request,response)=>{
        const {nome, senha} = request.body;
        const pracaExistente = await Praca.findOne({where:{nome:nome}});

        if(pracaExistente){
            response.status(400).send({
                message:"Já existe uma praça com esse nome."
            });
        }else{
            const token = gerarToken();
            const url = await gerarURL(nome);
            const praca = {nome,senha,token,url};
    
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
        const praca = await Praca.findOne({where:{nome:nome}});

        try {
            if (praca){
                const senhasConferem = await bcrypt.compare(senha, praca.senha);
                if (senhasConferem){
                    response.send(praca);
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
        } catch (error) {
            response.status(500).send({message:error.message || "Não foi possível verificar o nome e a senha."});
        }
    },

    check: async (request, response)=>{
        const { url } = request.body;
        const praca = await Praca.findOne({where:{url:url}});

        try {
            if (praca) {
                const token = praca.token;
                response.send({token, exists:true});
            }else{
                response.status(400).send({
                    message:"Praça inexistente."
                })
            }          
        } catch (error) {
            response.status(500).send({message:error.message || "Não foi possível concluir a autenticação"}); 
        }
    },

    update: async (request,response)=>{
        const {nome, senha, nova_senha} = request.body;
        const praca = await Praca.findOne({where:{nome:nome}});
        
        if (praca) {
            const senhasConferem = await bcrypt.compare(senha, praca.senha);

            if (senhasConferem) {
                const token = gerarToken();
                praca.update({token, senha:nova_senha})
                .then(data=>{
                    response.send(data);
                })
                .catch(e=>{
                    response.status(500).send({message : e.message || "Não foi possível alterar a senha."});
                })
            } else {
                response.status(404).send({message : "O nome ou a senha não conferem."})
            }
        } else {
            response.status(404).send({message : "O nome ou a senha não conferem."})
        }
    },

    // deleteById: async (request,response)=>{
    //     const id = request.params.id;
    //     const pracaBd = await Praca.findByUk(id);

    //     if (pracaBd) {
    //         await pracaBd.destroy();
    //         response.status(204).json('O praca foi excluído com sucesso');
    //     }else{
    //         response.status(404).json('O praca não existe.');
    //     }
    // },

    // deleteALL: async (_,response)=>{
    //     try {
    //         await Praca.destroy({where:{}})
    //         response.status(204).json('Todos os pracas foram excluídos com sucesso!')
    //     } catch (error) {
    //         response.status(500).json('Falha ao tentar excluir todo os pracas.')
    //     }
    // },
}