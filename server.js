'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
const Promise = require('bluebird');
const errorHandler = require('./lib/error-middleware');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const app = module.exports = express();
const router = express.Router();
const authRoutes = require('./route/auth-route')(router);
const childRoutes = require('./route/child-route')(router);
const petRoutes = require('./route/pet-route')(router);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/paws';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(errorHandler);
app.use(cors());
app.use(bodyParser);

app.use('/api', authRoutes);
app.use('/api', childRoutes);
app.use('/api', petRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
