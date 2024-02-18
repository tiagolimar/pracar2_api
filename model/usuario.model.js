import { DataTypes } from "sequelize"

export const usuarioModel = connection => {
    const Usuario = connection.define('usuario',{
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        marca:{
            type: DataTypes.STRING
        },
        genero:{
            type: DataTypes.STRING
        },
        categoria:{
            type: DataTypes.STRING
        },
        descricao:{
            type: DataTypes.STRING
        },
        desconto:{
            type: DataTypes.INTEGER
        },
        precoAntes:{
            type: DataTypes.DECIMAL
        },
        precoDepois:{
            type: DataTypes.DECIMAL
        },
        ativo:{
            type: DataTypes.BOOLEAN
        },
        
    })
    return Usuario
}