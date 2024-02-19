import { DataTypes } from "sequelize"

export const pracaModel = connection => {
    const Praca = connection.define('tb_pracas',{
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        token:{
            type: DataTypes.STRING
        },
    })
    return Praca
}