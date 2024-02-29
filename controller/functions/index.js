import crypto from 'crypto';
import db from './../../model/index.js';

const Praca = db.praca;

export function gerarToken(){
    return crypto.randomBytes(16).toString('hex');
}

export async function gerarURL(nome) {
    let url = nome
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

    let urlExiste = true;
    let contador =  1;
    while (urlExiste) {
        const dados = await Praca.findOne({ where: { url: url } });
        urlExiste = dados? true:false;
        if (urlExiste) {
            url = url + contador;
            contador++;
        }
    }
    return url;
}

export function gerarSenhaCaixa() {
    const senha_caixa = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return senha_caixa.toString(); 
}