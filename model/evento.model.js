import { DataTypes } from "sequelize";

export const eventoModel = (connection) => {
    const Evento = connection.define("tb_evento", {
        pracaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tb_pracas",
                key: "id",
            },
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataInicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dataTermino: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        horaTermino: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    });
    return Evento;
};
