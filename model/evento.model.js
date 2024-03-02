import { DataTypes } from "sequelize";

export const eventoModel = (connection) => {
    const Evento = connection.define("tb_eventos", {
        praca: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tb_pracas",
                key: "id",
            },
        },
        nome: {
            type: DataTypes.STRING,
        },
        local: {
            type: DataTypes.STRING,
        },
        dataInicio: {
            type: DataTypes.DATE,
        },
        dataTermino: {
            type: DataTypes.DATE,
        },
        horaInicio: {
            type: DataTypes.TIME,
        },
        horaTermino: {
            type: DataTypes.TIME,
        },
    });
    return Evento;
};
