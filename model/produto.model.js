import { DataTypes } from "sequelize"

export const produtoModel = connection => {
    const Produto = connection.define('tb_pracar2_produtos',{
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao:{
            type: DataTypes.STRING
        },
        categoria:{
            type: DataTypes.STRING
        },
        preco:{
            type: DataTypes.DECIMAL
        },
        img:{
            type: DataTypes.STRING
        },
        disponivel:{
            type: DataTypes.BOOLEAN
        },
    })
    return Produto
}