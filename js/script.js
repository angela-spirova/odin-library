const library = [
    {
        title: "Example",
        author: "John Doe",
        pageNum: "169",
        hasRead: true,
        bookID: crypto.randomUUID
    },
];

function Book(title, author, pageNum, hasRead){
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.hasRead = hasRead;
    
    this.bookID = crypto.randomUUID();
}

const booksTable = document.getElementById("books-display");

function displayBook(index=library.length-1){
    const book = library[index];
    const tableRow = document.createElement("tr");
    tableRow.classList.add("book-display");
    tableRow.id=book.bookID;
    booksTable.appendChild(tableRow);

    const titleDisplay = document.createElement("td");
    const authorDisplay = document.createElement("td");
    const pageNumDisplay = document.createElement("td");
    const statusDisplay = document.createElement("td");
    const changeStatusButton = document.createElement("button");
    const removeButtonDisplay = document.createElement("td");
    const removeButton = document.createElement("button");
    
    changeStatusButton.classList.add("change-book-status");
    removeButton.classList.add("remove-book");

    titleDisplay.innerText = book.title;
    authorDisplay.innerText = book.author;
    pageNumDisplay.innerText = book.pageNum;
    changeStatusButton.innerText = `Read ${book.hasRead ? "✓" : "✗"}`;
    removeButton.innerText = "Remove";

    statusDisplay.appendChild(changeStatusButton);
    removeButtonDisplay.appendChild(removeButton);

    tableRow.appendChild(titleDisplay);
    tableRow.appendChild(authorDisplay);
    tableRow.appendChild(pageNumDisplay);
    tableRow.appendChild(statusDisplay);
    tableRow.appendChild(removeButtonDisplay);
}

function displayBooks(){
    for(let i=0; i<library.length; i++){
        displayBook(i);
    }
}

document.addEventListener("DOMContentLoaded", displayBooks);