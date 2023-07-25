module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
        name:{
          type:DataTypes.STRING,
          allowNull:false
        }
        },{});
        return User;
    };