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
        chavePixA: {
            type: DataTypes.STRING,
        },
        nomePixA: {
            type: DataTypes.STRING,
        },
        chavePixB: {
            type: DataTypes.STRING,
        },
        nomePixB: {
            type: DataTypes.STRING,
        },
    });
    return Pagamentos;
};
