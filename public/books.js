// public/books.js
function fetchBooks() {
	fetch("/books")
		.then((response) => response.json())
		.then((books) => {
			const bookList = document.getElementById("book-list");
			bookList.innerHTML = "";
			books.forEach((book) => {
				const bookItem = document.createElement("div");
				bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p>Автор: ${book.author}</p>
                <p>Цена: ${book.price} руб.</p>
                <button onclick="addToCart(${book.id})">Добавить в корзину</button>
            `;
				bookList.appendChild(bookItem);
			});
		})
		.catch((error) => console.error("Ошибка:", error));
}

document.addEventListener("DOMContentLoaded", fetchBooks);
