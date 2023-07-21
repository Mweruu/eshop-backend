
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
        name:{
            type: DataTypes.STRING,
        },
        description:{
            type: DataTypes.STRING,
        },
        richDescription:{
            type: DataTypes.STRING,
        },
        image:{
            type: DataTypes.STRING,
        },
        images:{
            type: DataTypes.STRING,
        },
        brand:{
            type: DataTypes.STRING,
            defaultValue:''
        },
        price:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        // category:{ 
        //     type: categoryid
        // },
        countInStock:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isFeatured:{ 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        DateCreated:{
            type: DataTypes.DATE,
            defaultValue: null
        }
    
    },{});
        return Product;
    };