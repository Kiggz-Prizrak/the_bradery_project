const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const user = require("./User")(sequelize, Sequelize.DataTypes);
const product = require("./Product")(sequelize, Sequelize.DataTypes);
const order = require("./Order")(sequelize, Sequelize.DataTypes);
const orderItem = require("./OrderItem")(sequelize, Sequelize.DataTypes);

Sequelize.User = user;
Sequelize.Product = product;
Sequelize.Order = order;
Sequelize.OrderItem = orderItem;

user.hasMany(order)

order.belongsTo(user)
order.hasMany(orderItem, { onDelete: "cascade", onUpdate: "cascade" });

orderItem.belongsTo(order)
orderItem.belongsTo(product)


sequelize
  .authenticate()
  .then(async () => {
    console.log("✅ Connexion à MySQL valide");
    // Synchronisation des models avec les tables dans la base de données
    await sequelize
      .sync({ alter: true })
      .catch(() => console.log("Impossible de synchroniser les models"));
    console.log("Tous les models ont été synchronisés avec succès.");
  })
  .catch((error) => console.log("❌ Connexion à MySQL invalide", error));
module.exports = sequelize;