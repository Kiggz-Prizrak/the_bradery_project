module.exports = (Sequelize, DataTypes) =>
  Sequelize.define("Command", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    productList: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("myArrayField"));
      },
      set: function (val) {
        return this.setDataValue("myArrayField", JSON.stringify(val));
      },
    },
  });