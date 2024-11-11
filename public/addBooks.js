function fetchBooks() {
	fetch("/books")
		.then((response) => response.json())
		.then((books) => {
			const booksBody = document.getElementById("booksBody");
			booksBody.innerHTML = ""; // Очистить текущий контент
			books.forEach((book) => {
				const row = document.createElement("tr");
				row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.price} руб.</td>
                    <td><button onclick="addToCart(${book.id})">Добавить в корзину</button></td>
                `;
				booksBody.appendChild(row);
			});
		})
		.catch((error) => console.error("Ошибка:", error));
}

// Вызов функции при загрузке страницы
fetchBooks();
