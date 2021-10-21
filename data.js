const STORAGE_KEY = "BOOK_APPS"; 

let books = []; 

function checkingStorage() {
	if (typeof Storage === undefined) {
		alert("Browser yang anda gunakan tidak mendukung Local Storage");
		return false;
	}
	return true;
}

function saveData() {
	const parsed = JSON.stringify(books);
	localStorage.setItem(STORAGE_KEY, parsed);
	document.dispatchEvent(new Event("ondatasaved"));
}

function loadStorageData() {
	const serializedData = localStorage.getItem(STORAGE_KEY);

	let data = JSON.parse(serializedData);

	if (data !== null) books = data;

	document.dispatchEvent(new Event("ondataloaded"));
}

function updateData() {
	if (checkingStorage()) saveData();
}

function composeTodoObject(title, author, year, isComplete) {
	return {
		id: +new Date(),
		title,
		author,
        year,
		isComplete,
	};
}

function findBook(bookId) {
	for (book of books) {
		if (book.id === bookId) return book;
	}
	return null;
}

function findBookIndex(bookId) {
	let index = 0;
	for (book of books) {
		if (book.id === bookId) return index;

		index++;
	}

	return -1;
}

function refreshBookData() {
	const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
	let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

	for (book of books) {
		const newBook = makeLogBook(book.title, book.author, book.year,book.isComplete);
		newBook[BOOK_ITEMID] = book.id;

		if (book.isComplete) {
			listCompleted.append(newBook);
		} else {
			listUncompleted.append(newBook);
		}
	}
}