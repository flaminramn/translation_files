document.addEventListener("DOMContentLoaded", function () {

  let currentPage = 1;

  const list = document.getElementById("book-list");
  const imageContainer = document.getElementById("image-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageNumber = document.getElementById("page-number");
  const homeLink = document.getElementById("home-link");

  function showListView() {
    imageContainer.innerHTML = "";
    list.style.display = "block";
    if (pageNumber) pageNumber.textContent = String(currentPage);
  }

  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault();
      showListView();
    });
  }

  function loadBookDetails(id) {

    fetch(`https://wabapi.ddns.net/books/${id}`, {
       headers: {
         "x-API_KEY": "DqHuL+l7"
       }
      })   
      .then(res => {
        if (!res.ok) throw new Error(`Detail request failed: ${res.status}`);
        return res.json();
      })
      .then(book => {

        list.style.display = "none";
        imageContainer.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = book.title || "Untitled";
        imageContainer.appendChild(title);

        if (book.pdf_url) {
          const pdfLink = document.createElement("a");
          pdfLink.href = book.pdf_url;
          pdfLink.textContent = "Open PDF";
          pdfLink.target = "_blank";
          imageContainer.appendChild(pdfLink);

          const hr = document.createElement("hr");
          imageContainer.appendChild(hr);
        }

        if (Array.isArray(book.images)) {
          book.images.forEach(imgUrl => {
            const img = document.createElement("img");
            img.src = imgUrl;
            img.style.width = "600px";
            img.style.display = "block";
            img.style.margin = "0 auto 10px auto";
            imageContainer.appendChild(img);
          });
        }

      })
      .catch(err => {
        console.error("DETAIL FETCH ERROR:", err);
        imageContainer.innerHTML = "Error loading book details.";
      });
  }

  function loadBooks(page) {

      fetch(`https://wabapi.ddns.net/books?page=${page}`, {
        headers: {
          "x-api-key": "DgHuL+17"
        }
      })
      .then(res => {
        if (!res.ok) throw new Error(`List request failed: ${res.status}`);
        return res.json();
      })
      .then(data => {

        list.innerHTML = "";
        showListView();

        const books = Array.isArray(data.books) ? data.books : [];
        const totalPages = Number(data.totalPages || 1);

        if (pageNumber) pageNumber.textContent = `${page} of ${totalPages}`;

        if (books.length === 0) {
          const li = document.createElement("li");
          li.textContent = "No books returned.";
          list.appendChild(li);
          return;
        }

        books.forEach(book => {

          const li = document.createElement("li");
          const link = document.createElement("a");

          link.textContent = book.title || "Untitled";
          link.href = "#";

          link.addEventListener("click", function (e) {
            e.preventDefault();
            loadBookDetails(book.id);
          });

          li.appendChild(link);
          list.appendChild(li);

        });

        if (prevBtn) prevBtn.disabled = page <= 1;
        if (nextBtn) nextBtn.disabled = page >= totalPages;

      })
      .catch(err => {
        console.error("LIST FETCH ERROR:", err);
        list.innerHTML = "<li>Error loading books.</li>";
      });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      currentPage = currentPage + 1;
      loadBooks(currentPage);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) currentPage = currentPage - 1;
      loadBooks(currentPage);
    });
  }

  loadBooks(currentPage);

});