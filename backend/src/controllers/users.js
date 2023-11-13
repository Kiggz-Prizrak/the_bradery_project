const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userServices = require("../services/users");

exports.signup = async (req, res) => {
  const userObject = req.body;

  if (await userServices.mailChecker(req.body.email))
    return res.status(400).json({ error: "email  already used" });

  if (
    typeof userObject.email !== "string" ||
    typeof userObject.password !== "string" ||
    typeof userObject.lastName !== "string" ||
    typeof userObject.firstName !== "string"
  ) {
    return res.status(400).json({ error: "Please provide valid data" });
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
      return res.status(400).json({ error: "champs invalide" });
    }
  }
  // E-mail Checker
  if (!/^[\w\d.+-]+@[\w.-]+\.[a-z]{2,4}$/.test(req.body.email)) {
    return res.status(400).json({ error: "email invalide" });
  }
  // password Checker
  if (
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_.@$!%*#?&])[A-Za-z\d_.@$!%*#?&]{8,}$/.test(
      req.body.password
    )
  ) {
    return res.status(400).json({ error: "mot de passe invalide" });
  }
  // password bcrypt
  const hash = await bcrypt.hash(req.body.password, 10);

  delete req.body.isAdmin;

  if (
    userServices.createNewUser({ ...req.body, password: hash, isAdmin: false })
  )
    return res.status(201).json({ message: "user created" });
};

exports.login = async (req, res) => {
  if (
    typeof req.body.email !== "string" ||
    typeof req.body.password !== "string"
  ) {
    return res.status(400).json({ error: "please provides valid data" });
  }

  const user = await userServices.userFinder(req.body.email);

  if (!user) {
    return res.status(404).json({ error: "no user match with this mail" });
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
    return res.status(401).json({ error: "Unauthorized request" });
  }
  const users = await userServices.usersGetter();
  return res.status(200).json(users);
};

exports.getOneUser = async (req, res) => {
  if (req.auth.isAdmin) {
    const user = await userServices.userGetterOne(req.params.id);
    return res.status(200).json(user);
  }

  if (req.auth.UserId != req.params.id) {
    return res.status(401).json({ message: "Unauthorized request 1 " });
  }
  const user = await userServices.userGetterOneByUser(req.params.id);
  if (!user) return res.status(401).json({ message: "Unauthorized request 2" });
  return res.status(200).json(user);
};

exports.modifyUser = async (req, res) => {
  const userModifier = await userServices.userGetterOne(req.params.id);

  if (req.body.email) {
    if (await userServices.mailChecker(req.body.email)) {
      return res.status(400).json({ error: "email  already used" });
    }
  }

  if (userModifier.id !== req.auth.UserId && !req.auth.isAdmin) {
    return res.status(403).json({ error: "Unauthorized request" });
  }

  // E-mail checker
  if (
    req.body.email &&
    !/^[\w\d.+-]+@[\w.-]+\.[a-z]{2,}$/.test(req.body.email)
  ) {
    return res.status(400).json({ error: "email invalide" });
  }
  // password Checker
  if (
    req.body.password &&
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_.@$!%*#?&])[A-Za-z\d_.@$!%*#?&]{8,}$/.test(
      req.body.password
    )
  ) {
    return res.status(400).json({ error: "mot de passe invalide" });
  }
  // password bcrypt
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    if (
      typeof req.body.email !== "string" ||
      typeof req.body.password !== "string"
    ) {
      return res.status(400).json({ error: "please provides all fields" });
    }
  }

  await userServices.updateUser({ ...req.body, id: req.params.id });
  const user = await userServices.userGetterOne(req.params.id);
  return res.status(200).json({ message: "User modifié", user });
};

exports.deleteUser = async (req, res) => {
  const user = await userServices.userGetterOne(req.params.id);
  if (user.id !== req.auth.UserId && !req.auth.isAdmin) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  await userServices.deleteUser(req.params.id);
  return res.status(200).json({ message: "Objet supprimé !" });
};
