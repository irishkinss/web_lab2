// public/cart.js
let cart = [];

function addToCart(bookId) {
	fetch("/books/cart", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: bookId }),
	})
		.then((response) => response.json())
		.then((data) => {
			alert(data.message);
			updateCartTotal();
		})
		.catch((error) => console.error("Ошибка:", error));
}

function removeFromCart(bookId) {
	fetch(`/books/cart/${bookId}`, {
		method: "DELETE",
	})
		.then((response) => response.json())
		.then((data) => {
			alert(data.message);
			updateCartTotal();
		})
		.catch((error) => console.error("Ошибка:", error));
}

function updateCartTotal() {
	fetch("/books/cart/total")
		.then((response) => response.json())
		.then((data) => {
			document.getElementById(
				"totalPrice"
			).innerText = `Итоговая сумма: ${data.total} руб.`;
		})
		.catch((error) => console.error("Ошибка:", error));
}
