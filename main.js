const UNCOMPLETED_LIST_BOOK_ID = "membaca";
const COMPLETED_LIST_BOOK_ID = "selesaiMembaca";
const BOOK_ITEMID = "bookId";

function makeLogBook(title, author, year, isComplete) {
	const textTitle = document.createElement("h3");
	textTitle.innerHTML = '<span id="title">' + title + "</span>";

	const textAuthor = document.createElement("p");
	textAuthor.classList.add("author");
	textAuthor.innerHTML = author;

	const textYear = document.createElement("p");
	textYear.classList.add("year");
	textYear.innerHTML = year;

	const textContainer = document.createElement("div");
	textContainer.classList.add("inner");
	textContainer.append(textTitle, textAuthor, textYear);

	const container = document.createElement("div");
	container.classList.add("item");
	container.append(textContainer);
	if (isComplete) {
		container.append(belumSelesaiBtn(), hapusBtn());
	} else {
		container.append(selesaiBacaBtn(), hapusBtn());
	}
	return container;
}

function addLogBook() {
	const completeBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
	const uncompleteBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

	const textBookTitle = document.getElementById("title").value;
	const textBookAuthor = document.getElementById("author").value;
	const textBookYear = document.getElementById("year").value;
	const checkBox = document.getElementById("check");

	if (checkBox.checked == true) {
		const book = makeLogBook(textBookTitle, textBookAuthor, textBookYear, true);

		const bookObject = composeTodoObject(textBookTitle, textBookAuthor, textBookYear, true);

		book[BOOK_ITEMID] = bookObject.id;
		books.push(bookObject);

		completeBookList.append(book);
		updateData();
	} else {
		const book = makeLogBook(textBookTitle, textBookAuthor, textBookYear, false);

		const bookObject = composeTodoObject(textBookTitle, textBookAuthor, textBookYear, false);

		book[BOOK_ITEMID] = bookObject.id;
		books.push(bookObject);

		uncompleteBookList.append(book);
		updateData();
	}
}

function createBtn(buttonTypeClass, text, eventListener) {
	const button = document.createElement("button");
	button.classList.add(buttonTypeClass);
	button.innerText = text;
	button.addEventListener("click", function (event) {
		eventListener(event);
	});
	return button;
}
function addBookToCompleted(bookElement) {
	const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
	const bookTitle = bookElement.querySelector(".item > .inner > h3").innerText;
	const bookAuthor = bookElement.querySelector(".item > .inner > p.author").innerText;
	const bookYear = bookElement.querySelector(".item > .inner > p.year").innerText;

	const newBook = makeLogBook(bookTitle, bookAuthor, bookYear, true);

	const book = findBook(bookElement[BOOK_ITEMID]);
	book.isComplete = true;

	newBook[BOOK_ITEMID] = book.id;

	listCompleted.append(newBook);
	bookElement.remove();

	updateData();
}

function returnBook(bookElement) {
	const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
	const bookTitle = bookElement.querySelector(".item > .inner > h3").innerText;
	const bookAuthor = bookElement.querySelector(".item > .inner > p.author").innerText;
	const bookYear = bookElement.querySelector(".item > .inner > p.year").innerText;

	const newBook = makeLogBook(bookTitle, bookAuthor, bookYear, false);

	const book = findBook(bookElement[BOOK_ITEMID]);
	book.isComplete = false;

	newBook[BOOK_ITEMID] = book.id;

	listUncompleted.append(newBook);
	bookElement.remove();

	updateData();
}

function hapusBuku(bookElement) {
	const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);

	books.splice(bookPosition, 1);

	bookElement.remove();
	updateData();
}

function selesaiBacaBtn() {
	return createBtn("green", "Selesai Dibaca", function (event) {
		addBookToCompleted(event.target.parentElement);
	});
}

function hapusBtn() {
	return createBtn("red", "Hapus", function (event) {
		let hapusValidasi = confirm ("apakah kamu mau menghapus item ini?");
		if (hapusValidasi == true) {
			hapusBuku(event.target.parentElement);
			alert("Item Berhasil Dihapus");	
		} else {
			alert ("Item tidak jadi di hapus");
		}
		
	});
}

function belumSelesaiBtn() {
	return createBtn("green", "Belum selesai baca", function (event) {
		returnBook(event.target.parentElement);
	});
}