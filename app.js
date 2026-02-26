fetch("https://wabapi.ddns.net/books")
  .then(res => res.json())
  .then(data => {

    const list = document.getElementById("book-list");
    const imageContainer = document.getElementById("image-container");
    const homeLink = document.getElementById("home-link");
    homeLink.addEventListener("click", () => {
      imageContainer.innerHTML = "";
    });

    data.forEach(book => {

      const li = document.createElement("li");
      const link = document.createElement("a");

      link.textContent = book.title;
      link.href = "#";

      link.addEventListener("click", () => {
         
        imageContainer.innerHTML = "";

        const pdfLink = document.createElement("a");
        pdfLink.href = book.pdf_url;
        pdfLink.textContent = "Open PDF";
        pdfLink.target = "_blank";

        imageContainer.appendChild(pdfLink);

        const hr = document.createElement("hr");
        imageContainer.appendChild(hr);

        book.images.forEach(imgUrl => {
          const img = document.createElement("img");
          img.src = imgUrl;
          img.style.width = "600px";
          img.style.display = "block";
          img.style.marginBottom = "10px";
          imageContainer.appendChild(img);
        });

      });

      li.appendChild(link);
      list.appendChild(li);

    });

  })
  .catch(err => console.error(err));