import { DataTypes } from "sequelize"

export const pracaModel = connection => {
    const Praca = connection.define('tb_pracas',{
        nome:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        url:{
            type: DataTypes.STRING,
            unique: true
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        senha_caixa:{
            type: DataTypes.STRING,
            allowNull: false
        },
        token:{
            type: DataTypes.STRING,
        },
    })
    return Praca
}