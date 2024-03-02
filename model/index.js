import { Sequelize } from 'sequelize';
import { connection } from "../db/db.js"

import { pracaModel } from './praca.model.js';
import { produtoModel } from './produto.model.js';
import { eventoModel } from './evento.model.js';
import { pagamentosModel } from './pagamentos.model.js';

const db = {}

db.Sequelize = Sequelize;
db.connection = connection;

db.praca = pracaModel(connection,Sequelize);
db.produto = produtoModel(connection,Sequelize);
db.evento = eventoModel(connection,Sequelize);
db.pagamentos = pagamentosModel(connection,Sequelize);

export default db;