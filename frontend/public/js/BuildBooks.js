const bookContainer = document.querySelector(".book-container");

async function getBooks() {
  try {
    const response = await fetch("/books");
    if (!response.ok) {
      throw new Error("Failed to connect to Database.");
    }
    const data = await response.json();

    //empty bookContainer
    bookContainer.innerHTML = "";

    data.forEach((book) => {
      const bookCard = createBook(book);
      bookContainer.appendChild(bookCard);
      console.log(book);
    });
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
}

async function populateBooks(books) {}

function createBook(book) {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";

  bookCard.innerHTML = `
    <div class="book-media">
       <div class="book-cover">
          <img src="/images/placeholder.png" alt="${book.bookName}" loading="lazy">
       </div>
    </div>
    <div class="book-content">
      <h3 class="book-title">${book.bookName}</h3>
      <span class="book-info">${book.numberPages} pages</span>
      <a class="discussion-button input-styles" href="#" aria-label="Discuss ${book.bookName}">Discuss</a>
    </div>
  `;

  return bookCard;
}

getBooks();
