// Declaration of global variables
let myLibrary = [];
const form = document.querySelector('#main-form');
let table = document.querySelector('#books-table');

// Constructor for books
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Gets the values from the filled in form
function addBookToLibrary() {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('input[name="read"]:checked').value;
    let newBook = new Book(title, author, pages, read);
    // Adds the book to the library array
    myLibrary.push(newBook);
    // Clears table of all entries to avoid repetition
    clearTable();
    // Populate the table with the books
    displayBooks(myLibrary);
  });
}

// Runs a loop in the library array and adds the books to the cells in the
// table, also adds a class to the rows
function displayBooks(myLibrary) {
  myLibrary.forEach((object) => {
    let newRow = table.insertRow();
    newRow.classList.add('bookRow');
    let cell1 = newRow.insertCell();
    let cell2 = newRow.insertCell();
    let cell3 = newRow.insertCell();
    let cell4 = newRow.insertCell();
    let cell5 = newRow.insertCell();
    let cell6 = newRow.insertCell();
    cell5.classList.add('button-cell');
    cell6.classList.add('button-cell');
    cell1.textContent = object.title;
    cell2.textContent = object.author;
    cell3.textContent = object.pages;
    cell4.textContent = object.read;

    // Add a delete button to the 5th cell
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete book';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.type = 'button';
    cell5.appendChild(deleteBtn);

    // Delete the row and the book from the array once the button is clicked
    deleteBtn.onclick = function () {
      let deletedRow = this.parentElement.parentElement;
      let deletedTitle = deletedRow.cells[0].textContent;
      for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === deletedTitle) {
          myLibrary.splice(i, 1);
        }
      }
      newRow.remove();
    };

    // Adds a 'toggle read' button to 6th cell
    let toggleBtn = document.createElement('button');
    toggleBtn.innerText = 'Toggle read';
    toggleBtn.classList.add('toggleBtn');
    toggleBtn.type = 'button';
    cell6.appendChild(toggleBtn);

    // When clicked, the 'read' value gets toggled between yes or no
    toggleBtn.onclick = function () {
      let readRow = this.parentElement.parentElement;
      let readCell = readRow.cells[3];
      console.log(readCell);
      readCell.textContent === 'Yes' ? (readCell.textContent = 'No') : (readCell.textContent = 'Yes');
    };
  });
}

// Clears the table of all entries
function clearTable() {
  let rows = document.querySelectorAll('#books-table tr');
  for (let i = 1; i < rows.length; i++) {
    rows[i].remove();
  }
}

// Makes the function go live and the submit button work as an event listener
addBookToLibrary();
