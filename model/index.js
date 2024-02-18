import { Sequelize } from 'sequelize';
import { connection } from "../db/db.js"

// import { produtoModel } from './produto.model.js';
// import { usuarioModel } from './usuario.model.js';
import { pracaModel } from './praca.model.js';

const db = {}

db.Sequelize = Sequelize;
db.connection = connection;

// db.produto = produtoModel(connection,Sequelize);
// db.usuario = usuarioModel(connection,Sequelize);
db.praca = pracaModel(connection,Sequelize);

export default db;