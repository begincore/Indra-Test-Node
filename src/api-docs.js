"use strict";

const express = require("express");
const app = express();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            version: "1.0.0",
            title:"Documentation API TEST INDRA",
            description: "API Documentation for test about serverless framework, aws dynamodb, united test",
            contact:{
                name: "Williams Peña Mejia",
                url: "https://www.linkedin.com/in/williams-angello-peña-mejia-95260350/"
            },
            //servers: ["https://dm8jf90ee6.execute-api.us-east-1.amazonaws.com"]
            servers: ["http://127.0.0.1:3000"]
        }
    },
    // basePath: "/",
    apis:["./index.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

module.exports = app;