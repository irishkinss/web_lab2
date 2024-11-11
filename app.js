const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const app = express();
app.use(express.json());
app.use(express.static("public"));

let books = [];
let cart = [];

// Загрузка данных книг из CSV
function loadBooks() {
	return new Promise((resolve, reject) => {
		const results = [];
		fs.createReadStream("books.csv")
			.pipe(csv())
			.on("data", (data) => results.push(data))
			.on("end", () => {
				books = results.map((book) => ({
					id: parseInt(book.id),
					title: book.title,
					author: book.author,
					price: parseFloat(book.price),
				}));
				resolve();
			})
			.on("error", reject);
	});
}

// Эндпоинт для получения списка книг
app.get("/books", async (req, res) => {
	if (books.length === 0) await loadBooks();
	res.json(books);
});

// Эндпоинт для добавления в корзину
app.post("/cart/add", (req, res) => {
	const { id } = req.body;
	const book = books.find((b) => b.id === id);
	if (book) {
		cart.push(book);
		res.status(201).json({ message: "Книга добавлена в корзину" });
	} else {
		res.status(404).json({ message: "Книга не найдена" });
	}
});

// Эндпоинт для удаления из корзины
app.post("/cart/remove", (req, res) => {
	const { id } = req.body;
	const bookIndex = cart.findIndex((b) => b.id === id);
	if (bookIndex !== -1) {
		cart.splice(bookIndex, 1);
		res.json({ message: "Книга удалена из корзины" });
	} else {
		res.status(404).json({ message: "Книга не найдена в корзине" });
	}
});

// Эндпоинт для получения суммы корзины
app.get("/cart/total", (req, res) => {
	const total = cart.reduce((sum, book) => sum + book.price, 0);
	res.json({ total });
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});
