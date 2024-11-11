// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Получение списка всех книг
router.get("/", bookController.getBooks);

// Добавление книги в корзину
router.post("/cart", bookController.addBookToCart);

// Удаление книги из корзины
router.delete("/cart/:id", bookController.removeBookFromCart);

// Получение общей суммы корзины
router.get("/cart/total", bookController.getCartTotal);

module.exports = router;
