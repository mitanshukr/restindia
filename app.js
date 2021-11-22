const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet"); //secure response headers
const compression = require("compression"); //assets compression (but not images?)
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const stateRoutes = require("./routes/1-stateRoute");
const districtRoutes = require("./routes/2-districtRoute");
const adminRoutes = require("./routes/3-adminRoute");
const rootUrlRoutes = require("./routes/4-rootUrlRoute");

app.use(express.json()); //body-parser
app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "public", "images")));

app.use(compression());
app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader(
//     "Content-Security-Policy",
//     "script-src 'self' 'nonce-1hwfwf2r332hiuh' https://ajax.googleapis.com/ https://cdn.rawgit.com/"
//   );

//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
});

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "REST INDIA",
      description:
        "Get Information about Indian States, Union territories and Districts via a RESTful API.",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Please provide **AuthToken** without prefix - Bearer.",
        },
      },
    },
  },
  servers: [`${process.env.ROOT_URL}`],
  apis: ["./routes/*.js"], // files containing endpoints and annotations
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/state", stateRoutes);
app.use("/district", districtRoutes);
app.use("/admin", adminRoutes);
app.use("/", rootUrlRoutes);

app.use((req, res, next) => {
  const error = new Error("Invalid Endpoint.");
  error.status = 404;
  throw error;
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({
    status: status,
    message: message,
    info: error.data || null,
  });
});

console.log("Connecting to Database...");
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.i2j6g.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&writeConcern=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then((res) => {
    console.log("Connected to Database!");
    return app.listen(process.env.PORT || 3000);
  })
  .then((res) => {
    console.log("Server Started Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
