import crypto from 'crypto';

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
        const dados = await Praca.findAll({ where: { url: url } });
        urlExiste = dados.length >  0;
        if (urlExiste) {
            url = url + contador;
            contador++;
        }
    }
    return url;
}
