"use strict";
var debug = require("debug");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require('cors')
//var { index, login, users } =  require("./routes/mainIndex");
const routes = require("./routes/routes");
const { celebrate, Joi } = require('celebrate');
var app = express();
let { createResponse } = require("./bal/response");
// view engine setup

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Request-Method","*")
//   next();
// });
app.use(cors());

app.get("/", function(req, res) {
  return res.send("App working.");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

///generate custom response
app.use(function(req, res, next) {
  res.generateResponse = function(isSuccess, result, message, statusCode) {
    if (isSuccess) {
      res.status(statusCode).send(createResponse(message, result, isSuccess,statusCode));
    } else {
      res.status(statusCode).send(createResponse(message, result, isSuccess,statusCode));
    }
  };
  next();
});
//end
app.use("/api/", routes);
//app.use("/api/Login", login);
//app.use(require("./authentication/tokenChecker").checkToken);
//app.use("/api/user", users);
//app.use("/api/role", role);
// catch 404 and forward to error handler
app.use((error, req, res, next) => {
  if (error.joi) {
    return res.status(400).send(createResponse(error.joi.message,'',false));
  }

  return res.status(500).send(createResponse(error,'',false))
});

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

const port = process.env.PORT || 8000;

var server = app.listen(port, function() {
  console.log("Express server listening on port " + port);
});
