import { Sequelize } from 'sequelize';
import { connection } from "../db/db.js"
import { produtoModel } from './produto.model.js';

const db = {}

db.Sequelize = Sequelize;
db.connection = connection;

db.produto = produtoModel(connection,Sequelize);

export default db;