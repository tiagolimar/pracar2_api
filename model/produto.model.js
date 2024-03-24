import { DataTypes } from "sequelize"

export const produtoModel = connection => {
    const Produto = connection.define('tb_produtos',{
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        categoria:{
            type: DataTypes.STRING
        },
        descricao:{
            type: DataTypes.STRING
        },
        preco:{
            type: DataTypes.DECIMAL
        },
        url_img:{
            type: DataTypes.STRING
        },
    })
    return Produto
}