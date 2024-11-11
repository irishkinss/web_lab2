// Импортируем фреймворк Express для создания веб-сервера
const express = require("express");

// Импортируем модуль для работы с файловой системой (чтение и запись файлов)
const fs = require("fs");

// Импортируем модуль для управления путями файлов и директорий
const path = require("path");

// Импортируем модуль для парсинга CSV файлов и их преобразования в объекты
const csv = require("csv-parser");

// Создаем экземпляр приложения Express
const app = express();

// Разрешаем серверу обрабатывать JSON-данные в запросах
app.use(express.json());

// Указываем, что статические файлы находятся в папке "public"
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
app.post("/cart", (req, res) => {
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
app.delete("/cart/:id", (req, res) => {
	const id = parseInt(req.params.id);
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
