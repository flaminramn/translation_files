document.addEventListener("DOMContentLoaded", function () {

  let currentPage = 1;

  function loadBooks(page) {

    fetch(`https://wabapi.ddns.net/books?page=${page}`)
      .then(res => res.json())
      .then(data => {

        const list = document.getElementById("book-list");
        list.innerHTML = "";

        data.forEach(book => {
          const li = document.createElement("li");
          li.textContent = book.title;
          list.appendChild(li);
        });

      })
      .catch(err => console.error(err));
  }

  document.getElementById("next-btn").onclick = function () {
    currentPage++;
    loadBooks(currentPage);
  };

  document.getElementById("prev-btn").onclick = function () {
    if (currentPage > 1) {
      currentPage--;
      loadBooks(currentPage);
    }
  };

  loadBooks(currentPage);

});