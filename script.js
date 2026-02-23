console.log("Script loaded");

fetch("books.json")
  .then(response => {
    console.log("Status:", response.status);
    return response.json();
  })
  .then(data => {
    console.log("Data loaded:", data);

    const container = document.getElementById("output");

    if (Array.isArray(data)) {
      data.forEach(item => {
        const div = document.createElement("div");
        div.textContent = JSON.stringify(item);
        container.appendChild(div);
      });
    } else {
      container.textContent = JSON.stringify(data, null, 2);
    }
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });