fetch("https://wabapi.ddns.net/books")
  .then(response => response.json())
  .then(data => {

    const list = document.getElementById("book-list");

    data.forEach(book => {

      const li = document.createElement("li");

      li.innerHTML = `<a href="${book.pdf_url}" target="_blank">${book.title}</a>`;

      list.appendChild(li);

    });

  })
  .catch(error => {
    console.error("Error:", error);
  });