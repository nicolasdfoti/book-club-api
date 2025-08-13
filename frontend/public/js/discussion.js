const bookId = new URL(window.location.href).searchParams.get("id");

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || "";
}

async function LoadBook(bookId) {
  const response = await fetch(`/books/${bookId}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const book = await response.json();
  console.log(book);
  setText("book-title", book.bookName);
}

LoadBook(bookId);
