const dotenv = require('dotenv');
const express = require('express');
dotenv.config({ path: './config.env' });
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const clothRouter = require('./routes/clothRoutes');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/cloth', clothRouter);

module.exports = app;
