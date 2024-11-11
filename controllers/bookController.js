// controllers/bookController.js
const fs = require("fs");
const csv = require("csv-parser");
const Book = require("../models/book");

let books = [];
let cart = [];

function loadBooks() {
	return new Promise((resolve, reject) => {
		const results = [];
		fs.createReadStream("books.csv")
			.pipe(csv())
			.on("data", (data) => results.push(data))
			.on("end", () => {
				books = results.map(
					(book) =>
						new Book(
							parseInt(book.id),
							book.title,
							book.author,
							parseFloat(book.price)
						)
				);
				resolve();
			})
			.on("error", reject);
	});
}

exports.getBooks = async (req, res) => {
	if (books.length === 0) await loadBooks();
	res.json(books);
};

exports.addBookToCart = (req, res) => {
	const { id } = req.body;
	const book = books.find((b) => b.id === id);
	if (book) {
		cart.push(book);
		res.status(201).json({ message: "Книга добавлена в корзину" });
	} else {
		res.status(404).json({ message: "Книга не найдена" });
	}
};

exports.removeBookFromCart = (req, res) => {
	const id = parseInt(req.params.id);
	const bookIndex = cart.findIndex((b) => b.id === id);
	if (bookIndex !== -1) {
		cart.splice(bookIndex, 1);
		res.json({ message: "Книга удалена из корзины" });
	} else {
		res.status(404).json({ message: "Книга не найдена в корзине" });
	}
};

exports.getCartTotal = (req, res) => {
	const total = cart.reduce((sum, book) => sum + book.price, 0);
	res.json({ total });
};
