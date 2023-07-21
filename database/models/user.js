module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
        },{});
        return User;
    };