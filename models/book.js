// models/book.js
class Book {
	constructor(id, title, author, price) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.price = price;
	}
}

module.exports = Book;
