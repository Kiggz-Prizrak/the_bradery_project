const { models } = require("../models");

exports.mailChecker = (email) => {
  return models.User.findOne({
    where: { email },
  });
};

exports.createNewUser = (data) => {
  return models.User.create(...data);
};

exports.userFinder = (email) => {
  return models.User.findOne({
    where: { email },
  }).catch(async (error) => {
    res.status(500).json({ message: "An error has occurred", error });
  });
};

exports.usersGetter = () => {
  return models.User.findAll({
    order: [["createdAt", "DESC"]],
  }).catch((error) => res.status(400).json({ message: "bad request", error }));
};

exports.userGetterOne = (id) => {
  return models.User.findOne({
    where: { id },
  }).catch((error) =>
    res.status(404).json({ message: "user not found", error })
  );
};

exports.updateUser = (data) => {
  return models.User.update(data, { where: { id: data.id } }).catch((error) =>
    res.status(400).json({ error })
  );
};

exports.deleteUser = (id) => {
  return models.User.destroy({ where: { id } }).catch((error) =>
    res.status(400).json({ error })
  );
};
