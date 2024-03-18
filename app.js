let allBooks = [];

window.onload = function() {
  const storedBooks = JSON.parse(localStorage.getItem('books'));
  if (storedBooks) {
    allBooks = storedBooks;
    viewBooks();
  }
};

function saveBooksToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(allBooks));
}

function viewBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  allBooks.forEach(function(book, index) {
    const div = document.createElement('div');

    div.classList.add('book-detail');
    div.innerHTML = `
      <div class="book-buttons">
        <img src="https://placehold.co/400x300">
        <h1>TITLE: ${book.title}</h1>
        <p>AUTHOR: ${book.author}</p>
        <p>YEAR:: ${book.year}</p>
        <p>price:: ${book.price}</p>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </div>
    `;
    
    bookList.appendChild(div);
  });
}

function addBook() {
  const title = prompt('โปรดใส่ชื่อหนังสือ:');
  const author = prompt('โปรดใส่ชื่อผู้แต่ง:');
  const year = prompt('โปรดใส่ปีที่พิมพ์:');
  const price = parseFloat(prompt('โปรดใส่ราคา:'));

  const verifyYear = typeof Number(year) === "number" && !isNaN(Number(year))
  const verifyPrice = typeof Number(price) === "number" && !isNaN(Number(price))

  if (title && author && verifyYear && verifyPrice) {
    const newBook = { title, author, year, price };
    allBooks.push(newBook);
    saveBooksToLocalStorage();
    viewBooks();
    alert("เพิ่มรายการหนังสือสำเร็จ")
  } else {
    alert('ข้อมูลไม่ถูกต้อง');
  }
}

function editBook(index) {
  const book = allBooks[index];
  const newTitle = prompt('โปรดใส่ชื่อหนังสือ:', book.title);
  const newAuthor = prompt('โปรดใส่ชื่อผู้แต่ง:', book.author);
  const newYear = prompt('โปรดใส่ปีที่พิมพ์:', book.year);
  const newPrice = parseFloat(prompt('โปรดใส่ราคา:', book.price));

  const verifyNewYear = typeof Number(newYear) === "number" && !isNaN(Number(newYear))
  const verifyNewPrice = typeof Number(newPrice) === "number" && !isNaN(Number(newPrice))

  if (newTitle && newAuthor && verifyNewYear && verifyNewPrice) {
    allBooks[index] = {
      title: newTitle,
      author: newAuthor,
      year: newYear,
      price: newPrice
    };
    saveBooksToLocalStorage();
    viewBooks();
    alert("แก้ไขรายการสำเร็จ")
  } else {
    alert('ข้อมูลไม่ถูกต้อง');
  }
}

function deleteBook(index) {
  allBooks.splice(index, 1);
  saveBooksToLocalStorage();
  viewBooks();
}