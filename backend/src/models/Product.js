module.exports = (Sequelize, DataTypes) =>
  Sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  }, {
    timestamps: false
});
