import db from '../model/index.js';
import { cadastrarProdutosPadrao } from './functions/index.js';
import bcrypt from 'bcryptjs';

import { gerarToken, gerarURL, gerarSenhaCaixa } from './functions/index.js';

const Praca = db.praca;
const Evento = db.evento;
const Pagamentos = db.pagamentos;
const Produtos = db.produto;

export const pracaController = {
    cadastrar: async (request, response)=>{
        const {nome, senha} = request.body;
        const pracaExistente = await Praca.findOne({where:{nome:nome}});

        if(pracaExistente){
            response.status(400).send({
                message:"Já existe uma praça com esse nome."
            });
        }else{
            const token = gerarToken();
            const url = await gerarURL(nome);
            const senha_caixa = gerarSenhaCaixa();
            const praca = { nome,senha, senha_caixa, token, url };

            Praca.create(praca)
            .then(async dados=>{
                try {
                    const { id } = dados;
                    await Promise.all([
                        Evento.create({praca:id}),
                        Pagamentos.create({praca:id}),
                        cadastrarProdutosPadrao(Produtos, id)
                    ]);
                    response.send(dados);
                } catch (e) {
                    response.status(500).send({message : e.message || "Não foi possível finalizar o cadastro."});
                }
            })
            .catch(e=>{
                response.status(500).send({message : e.message || "Não foi possível finalizar o cadastro."});
            })
        }
    },

    login: async (request, response)=>{
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
                const {id, token, nome, url, senha_caixa} = praca;
                response.send({id, token, nome, url, senha_caixa, exists:true});
            }else{
                response.status(404).send({
                    message:"Praça inexistente."
                })
            }          
        } catch (error) {
            response.status(500).send({message:error.message || "Não foi possível concluir a autenticação"}); 
        }
    },

    update: async (request, response)=>{
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

    updateCaixa: async (request, response)=>{
        const {id, senha} = request.body;
        const praca = await Praca.findByPk(id);
        
        if (praca) {
            praca.update({senha_caixa:senha})
            .then(data=>{
                response.send(data);
            })
            .catch(e=>{
                response.status(500).send({message : e.message || "Não foi possível alterar a senha."});
            })
        } else {
            response.status(404).send({message : `O id ${id} informado não é válido.`})
        }
    },

    getEvento: (request,response)=>{
        const id = request.params.id
        Evento.findByPk(id)
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || `Não foi possível obter o evento de <id></id> ${id}.`});
        })
    },

    updateEvento: async (request, response)=>{
        const {id, ...dadosEvento} = request.body;

        const evento = await Evento.findOne({where:{praca:id}});
        
        if (evento) {
            evento.update({...dadosEvento})
            .then(data=>{
                response.send(data);
            })
            .catch(e=>{
                response.status(500).send({message : e.message || "Não foi atualizar os dados."});
            })
        } else {
            response.status(404).send({message : `O id ${id} informado não é válido.`})
        }
    },

    getPagamentos: (request,response)=>{
        const id = request.params.id;
        Pagamentos.findByPk(id)
        .then(data=>{
            response.send(data);
        })
        .catch(e=>{
            response.status(500).send({message : e.message || `Não foi possível obter o evento de <id></id> ${id}.`});
        })
    },

    updatePagamentos: async (request, response)=>{
        const { id, ...dadosPagamentos } = request.body;

        const pagamentos = await Pagamentos.findOne({where:{id:+id}});
        if (pagamentos) {
            try {
                const data = await pagamentos.update(dadosPagamentos);
                response.send(data);
            } catch (e) {
                response.status(500).send({message : e.message || "Não foi atualizar os dados."});
            }
        } else {
            response.status(404).send({message : `O id ${id} informado não é válido.`})
        }
    },
}
