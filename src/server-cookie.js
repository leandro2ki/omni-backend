const express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const jwtSecret = 'secret123';

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://omnistack-frontend-1.herokuapp.com/',
    credentials: true,
  })
);

app.get('/jwt', (req, res) => {
  const token = jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret);

  res.cookie('token', token, {
    maxAge: 86400,
    httpOnly: true,
    secure: true,
  });

  res.json({ token });
});

app.use(
  jwt({
    secret: jwtSecret,
    getToken: (req) => req.cookies.token,
  })
);

const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' },
];

app.get('/foods', (req, res) => {
  res.json(foods);
});

app.listen(process.env.PORT || 3333);
console.log(
  'Cookie App running on https://omnistack-frontend-1.herokuapp.com/'
);
