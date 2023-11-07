const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promises: fs } = require("fs");
const { models } = require("../models");

exports.signup = async (req, res) => {
  const userObject = req.body;
  console.log(userObject);

  const userEmailFind = await models.User.findOne({
    where: { email: req.body.email },
  });

  if (userEmailFind) {
    return res.status(400).json({ message: "email or username already used" });
  }
  if (
    typeof userObject.email !== "string" ||
    typeof userObject.password !== "string" ||
    typeof userObject.lastName !== "string" ||
    typeof userObject.firstName !== "string"
  ) {
    return res.status(400).json({ message: "Please provide valid data" });
  }

  const userFieldsValidator = [
    userObject.username,
    userObject.lastName,
    userObject.firstName,
  ];
  for (let i = 0; i < userFieldsValidator.length; i += 1) {
    if (
      !/^[\wàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\d '-]+$/.test(
        userFieldsValidator[i]
      )
    ) {
      return res.status(400).json({ message: "champs invalide" });
    }
  }
  // E-mail Checker
  if (!/^[\w\d.+-]+@[\w.-]+\.[a-z]{2,4}$/.test(req.body.email)) {
    return res.status(400).json({ message: "email invalide" });
  }
  // password Checker
  if (
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_.@$!%*#?&])[A-Za-z\d_.@$!%*#?&]{8,}$/.test(
      req.body.password
    )
  ) {
    return res.status(400).json({ message: "mot de passe invalide" });
  }
  // password bcrypt
  const hash = await bcrypt.hash(req.body.password, 10);

  delete req.body.isAdmin;

  const user = models.User.create({
    isAdmin: false,
    email: req.body.email,
    password: hash,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  if (user) return res.status(201).json({ message: "Utilisateur créé" });
};
exports.login = async (req, res) => {
  if (
    typeof req.body.email !== "string" ||
    typeof req.body.password !== "string"
  ) {
    return res.status(400).json({ message: "please provides valid data" });
  }

  const user = await models.User.findOne({
    where: { email: req.body.email },
  }).catch(async (error) => {
    res.status(500).json({ message: "An error has occurred", error });
  });

  if (!user) {
    return res.status(404).json({ message: "no user match with this mail" });
  }
  const valid = await bcrypt
    .compare(req.body.password, user.password)
    .catch(async (error) => {
      res.status(500).json({ error });
    });
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  return res.status(200).json({
    user,
    token: jwt.sign(
      { UserId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "24h",
      }
    ),
  });
};

exports.getAllUsers = async (req, res) => {
  if (!req.auth.isAdmin) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  const users = await models.User.findAll({
    order: [["createdAt", "DESC"]],
  }).catch((error) => res.status(400).json({ message: "bad request", error }));
  return res.status(200).json(users);
};

exports.getOneUser = async (req, res) => {
  const user = await models.User.findOne({
    where: { id: req.params.id },
  }).catch((error) =>
    res.status(404).json({ message: "user not found", error })
  );
  return res.status(200).json(user);
};

exports.modifyUser = async (req, res) => {
  const userModifier = await models.User.findOne({
    where: { id: req.params.id },
  });
  if (userModifier === null) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.email) {
    const userEmailFind = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (userEmailFind) {
      if (req.files) await fs.unlink(`images/${req.files.avatar[0].filename}`);
      return res
        .status(400)
        .json({ message: "email or username already used" });
    }
  }

  if (userModifier.id !== req.auth.UserId && !req.auth.isAdmin) {
    return res.status(403).json({ message: "Unauthorized request" });
  }

  // E-mail checker
  if (
    req.body.email &&
    !/^[\w\d.+-]+@[\w.-]+\.[a-z]{2,}$/.test(req.body.email)
  ) {
    return res.status(400).json({ message: "email invalide" });
  }
  // password Checker
  if (
    req.body.password &&
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_.@$!%*#?&])[A-Za-z\d_.@$!%*#?&]{8,}$/.test(
      req.body.password
    )
  ) {
    return res.status(400).json({ message: "mot de passe invalide" });
  }
  // password bcrypt
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    if (
      typeof req.body.email !== "string" ||
      typeof req.body.password !== "string"
    ) {
      return res.status(400).json({ message: "please provides all fields" });
    }
  }

  await models.User.update(
    { ...req.body, id: req.params.id },
    { where: { id: req.params.id } }
  ).catch((error) => res.status(400).json({ error }));

  const user = await models.User.findOne({
    where: { id: req.params.id },
  });
  return res.status(200).json({ message: "User modifié", user });
};

exports.deleteUser = async (req, res) => {
  const user = await models.User.findOne({ where: { id: req.params.id } });
  if (user === null) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.id !== req.auth.UserId && !req.auth.isAdmin) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  await models.User.destroy({ where: { id: req.params.id } }).catch((error) =>
    res.status(400).json({ error })
  );
  return res.status(200).json({ message: "Objet supprimé !" });
};
