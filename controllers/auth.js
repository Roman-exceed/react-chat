const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
// const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({
    username: req.body.username,
  });

  if (candidate) {
    // check pass
    // console.log('--------req.body.password:', req.body.password);
    // console.log('--------candidate.password:', candidate.password);
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if (passwordResult) {
      // generate token
      const token = jwt.sign({
        username: candidate.username,
        userId: candidate._id,
      }, keys.jwt, {expiresIn: 60 * 60});

      res.status(200).json({
        token: `Bearer ${token}`
      })

    } else {
      // пароли не совпали
      res.status(401).json({
        message: 'Пароли не совпадают'
      })
    }

  } else {
    // user not found
    res.status(404).json({
      message: 'пользователь с таким email не найден'
    })
  }
};

module.exports.register = async (req, res) => {
  // res.status(200).send('register');
  const candidate = await User.findOne({username: req.body.username});

  console.log('--------candidate', candidate);
  
  
  if (candidate) {
    // Пользователь существует, нужно отдать ошибку
    res.status(409).json({
      message: 'Такой email уже занят'
    });
  } else if (req.body.password !== req.body.confirmPassword) {
    res.status(409).json({
      message: 'Пароли не совпадают'
    });
  } else {
    // Нужно создать пользователя
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;

    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      // обработка ошибки
      // errorHandler(res, e);
    }
  }
};
