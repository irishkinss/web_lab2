document.addEventListener("DOMContentLoaded", async () => {
	const booksBody = document.getElementById("booksBody");
	const totalPriceElement = document.getElementById("totalPrice");
	let totalPrice = 0;

	// Загрузка списка книг
	const response = await fetch("/books");
	const books = await response.json();

	try {
		// Загрузка списка книг с сервера
		const response = await fetch("/books");
		const books = await response.json();

		// Отображение книг в таблице
		books.forEach((book) => {
			const row = document.createElement("tr");
			row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.price} руб.</td>
        <td>
          <button onclick="addToCart(${book.id}, ${book.price})">Добавить в корзину</button>
		  <button onclick="removeFromCart(${book.id}, ${book.price})">Удалить из корзины</button>
        </td>
      `;
			booksBody.appendChild(row);
		});
	} catch (error) {
		console.error("Ошибка при загрузке книг:", error);
	}

	// Добавить в корзину
	window.addToCart = (id, price) => {
		totalPrice += price;
		totalPriceElement.textContent = `Итоговая сумма: ${totalPrice} руб.`;
	};

	window.removeFromCart = (id, price) => {
		totalPrice -= price;
		totalPriceElement.textContent = `Итоговая сумма: ${totalPrice} руб.`;
	};
});
