module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },

        name: {
          type: DataTypes.STRING,
          allowNull: false,

        }
        },{});
        return Order;
    };