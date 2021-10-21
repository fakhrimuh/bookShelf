document.addEventListener("DOMContentLoaded", function () {
	const submitForm = document.getElementById("form");

	submitForm.addEventListener("submit", function (event) {
		event.preventDefault();
		addLogBook();
	});
	if (checkingStorage()) {
		loadStorageData();
	}
});

document.addEventListener("ondatasaved", () => {
	console.log("Data berhasil tersimpan");
});
document.addEventListener("ondataloaded", () => {
	refreshBookData();
});