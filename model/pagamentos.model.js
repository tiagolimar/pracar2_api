import { DataTypes } from "sequelize";

export const pagamentosModel = (connection) => {
    const Pagamentos = connection.define("tb_pagamentos", {
        praca: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tb_pracas",
                key: "id",
            },
        },
        chaveA: {
            type: DataTypes.STRING,
        },
        nomeA: {
            type: DataTypes.STRING,
        },
        chaveB: {
            type: DataTypes.STRING,
        },
        nomeB: {
            type: DataTypes.STRING,
        },
    });
    return Pagamentos;
};
