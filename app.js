// app.js
const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Swagger setup
const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Книжный магазин API",
			version: "1.0.0",
			description: "API для управления книжным магазином",
		},
	},
	apis: ["./controllers/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Используем маршруты
app.use("/books", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});
