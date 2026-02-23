console.log("Script loaded");

fetch("books.json")
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("output");
    container.innerHTML = "";

    data.forEach(book => {
      const card = document.createElement("div");
      card.style.marginBottom = "15px";
      card.style.padding = "10px";
      card.style.border = "1px solid #ccc";

      const title = document.createElement("h3");
      title.textContent = book.Title;

      const id = document.createElement("p");
      id.textContent = "Book ID: " + book.BookId;

      const link = document.createElement("a");
      link.href = book.PdfUrl;
      link.textContent = "Open PDF";
      link.target = "_blank";

      card.appendChild(title);
      card.appendChild(id);
      card.appendChild(link);

      container.appendChild(card);
    });

  })
  .catch(error => console.error("Error:", error));