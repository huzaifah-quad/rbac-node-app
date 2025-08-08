const express = require('express');
const os = require('os');

const app = express();
const router = express.Router();

const authRoute = require('./user/AuthRoute');
const userRoute = require('./user/UserRoute');

app.use("/auth", authRoute);
app.use("/user", userRoute);

module.exports = router;
module.exports = app;
