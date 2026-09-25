const library = [];

function Book(title, author, pageNum, hasRead){
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.hasRead = hasRead;
    
    this.bookID = crypto.randomUUID();
}

function addBook(title, author, pageNum, hasRead){
    const book = new Book(title, author, pageNum, hasRead);
    library.push(book);
    return library;
}

function changeBookStatus(bookID){
    for(let i=0; i<library.length; i++){
        const book = library[i];
        if(book.bookID == bookID){
            book.hasRead = !(book.hasRead);
            return book.hasRead;
        }
    }
    throw Error("Book does not exist.");
}

function removeBook(bookID){
    for(let i=0; i<library.length; i++){
        const book = library[i];
        if(book.bookID == bookID){
            library.splice(i, 1);
            return library;
        }
    }
    throw Error("Book does not exist.");
}

const booksTable = document.getElementById("books-display");

function displayBook(index=library.length-1){
    const book = library[index];
    const tableRow = document.createElement("tr");
    tableRow.classList.add("book-display");
    tableRow.setAttribute("data-book-id", book.bookID);
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
    
    changeStatusButton.setAttribute("data-book-id", book.bookID);
    removeButton.setAttribute("data-book-id", book.bookID);

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

function updateBookStatusDisplay(bookID, hasRead){
    const changeStatusButton = document.querySelector(`button.change-book-status[data-book-id="${bookID}"]`);
    changeStatusButton.innerText = `Read ${hasRead ? "✓" : "✗"}`;
}

function removeBookDisplay(bookID){
    const bookDisplay = document.querySelector(`tr[data-book-id="${bookID}"]`);
    while (bookDisplay.firstChild) {
        bookDisplay.removeChild(bookDisplay.lastChild);
    }
    bookDisplay.remove();
}


document.addEventListener("DOMContentLoaded", displayBooks);

const bookInfoForm = document.forms["book-info-form"];
const bookInfoDialog = document.getElementById("book-info-dialog");

bookInfoForm.addEventListener("submit", submitBookInfo);

function submitBookInfo(event){
    const hasRead = this.read.checked;
    addBook(this.title.value, this.author.value, this.pages.value, hasRead);
    displayBook();
    bookInfoDialog.hidePopover();
    bookInfoForm.reset();
    event.preventDefault();
}

booksTable.addEventListener("click", (event) =>{
    const button = event.target;
    if(button.nodeName !== "BUTTON"){
        return ;
    }
    const bookID = button.getAttribute("data-book-id");
    if(button.classList.contains("change-book-status")){
        const hasRead = changeBookStatus(bookID);
        updateBookStatusDisplay(bookID, hasRead);
    }
    else if(button.classList.contains("remove-book")){
        removeBook(bookID);
        removeBookDisplay(bookID);
    }
})