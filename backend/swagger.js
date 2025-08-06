const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Book Club API",
      version: "1.0.0",
      description: "This is the CSE 341 Final Group Project: Book Club API",
    },
    servers: [
      {
        url: "https://book-club-api-ktdq.onrender.com/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

if (require.main === module) {
  fs.writeFileSync("swagger.json", JSON.stringify(swaggerDocs, null, 2));
  console.log("swagger.json generated.");
}

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
