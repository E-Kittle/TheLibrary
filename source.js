//Section for Bookfactory
const bookFactory = (title, author, pages, read) => {
    return {title, author, pages, read};
};



//Section for methods to update/load the library
const myLibrary = (() => {
    const myLibrary = [];
    let totalBooks = 0;
    let totalPages = 0;
    let readBooks = 0;
    let unreadBooks = 0;

    //Grabs data from the form to create a new book
    const addNewBook = () => {
        //Grab the data from the form - returns an empty array if validation fails
        let validated = validateData();

        if (validated.length > 0){
            const newBook = bookFactory(validated[0], validated[1], validated[2], validated[3]);
            myLibrary.push(newBook);
            clearForm();         
            overlay.off();
            displayLibrary();
            saveLibrary();
    };
}
    
    //Private method which loops through the myLibrary array to add books to the DOM
    const displayLibrary = () => {
        // loadLibrary();          //Loads the library from the local save. This is really only important for a returning user. Need to set myLibrary = loadLibrary()

        //Resets the page
        bookWrapper.innerHTML = '';

        //Resets values for data totals
        totalBooks = 0;
        totalPages = 0;
        readBooks = 0;
        unreadBooks = 0;
        let index = 0;

        //Looks through the myLibrary array to add each book object to the library
        myLibrary.forEach(obj => {

            //Creates the holder for the new book
            const newBook = document.createElement('div');
            newBook.classList.add('book');
    
            //Creates an element for each of the pieces of information
            const titleh3 = document.createElement('h3');
            const authorp = document.createElement('p');
            const pagesp = document.createElement('p');
            const readp = document.createElement('p');
            const extra = document.createElement('p');                          //for the extra content
            const titleWrapper = document.createElement('div');
            const extraWrapper = document.createElement('div');
    
            //Adds a class to extra
            extraWrapper.classList.add('extraWrapper');
            titleWrapper.classList.add('titleWrapper');

            //Adds the text content
            titleh3.textContent = obj.title;
            authorp.textContent = "Author: " + obj.author;
            pagesp.textContent = "Number of pages: " + obj.pages;
            readp.textContent = "This book is: " + obj.read;
            extra.textContent = "Additional Information: Here is a ton of extra information, such as longer name, information on the text, whether we liked the book, etc.";   //Extra content
    
            //Creates and appends an update and delete button to the newBook div
            const delButton = document.createElement('button');
            delButton.classList.add('delButton');
            delButton.setAttribute('id', index);
            delButton.textContent = 'X';

            // const updateButton = document.createElement('button');
            // updateButton.classList.add('updateButton');
            // updateButton.setAttribute('id', index);
            // updateButton.textContent = 'Update read status';

            
            //Creates the additional information button
            const additionalInfoButton = document.createElement('button');
            additionalInfoButton.classList.add('infoButton');
            additionalInfoButton.textContent = 'See Additional Information or Update';
            additionalInfoButton.setAttribute('id', index);
            
            index++;



            //Append the new fields
            newBook.appendChild(delButton);
            titleWrapper.appendChild(titleh3);
            newBook.appendChild(titleWrapper);
            newBook.appendChild(authorp);
            newBook.appendChild(pagesp);
            newBook.appendChild(readp);
            // extraWrapper.appendChild(extra);
            // newBook.appendChild(extraWrapper);                                         //Extra content
            // newBook.appendChild(updateButton);
            newBook.appendChild(additionalInfoButton);
            bookWrapper.appendChild(newBook);


            //Calculates the running totals for the data
            totalBooks++;
            totalPages += Number(obj.pages);
            if (obj.read === 'read'){
                readBooks++;
            }
            else{
                unreadBooks++;
            }
        });

        //displays the data to the page
        displayData();
    };

    const viewBook = (index) => {

    };


    //Displays the data on the table
    const displayData = () => {
        totalPagestd.textContent = totalPages;
        totalBookstd.textContent = totalBooks;
        unreadBookstd.textContent = unreadBooks;
        readBookstd.textContent = readBooks;
    }
    
    //Deletes a book from the myLibrary array
    const deleteBook = (index) => {
        if (index === '0'){
            myLibrary.shift();
        }
        else{
            myLibrary.splice(index, (index));
        }
        saveLibrary();
        displayLibrary();
    };
    
    //Updates the books 'read' status, triggered by the user
    const updateBook = (index) => {
        if (myLibrary[index].read === 'read'){
            myLibrary[index].read = 'unread';
        }
        else{
            myLibrary[index].read = 'read';
        }
        saveLibrary();
        displayLibrary();
    };
    
    //private method to save myLibrary
    const saveLibrary = () => {
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }
    
    //private method to load myLibrary
    const loadLibrary = () => {
        let library = JSON.parse(localStorage.getItem('myLibrary'));
        if (library === null) {
            library = [];
        }
        myLibrary.splice(0, myLibrary.length);
        library.forEach(arr => {
            myLibrary.push(arr);
        })
        displayLibrary();
    };
    
    //Private method to validate the data from the form
    const validateData = () => {
        let readStatus;
        const titleError = document.querySelector('#titleError');
        const authorError = document.querySelector('#authorError');
        const pagesError = document.querySelector('#pagesError');

        //Checks if the book was read or not
        if (read.checked){
            readStatus = 'read';
        }
        else {
            readStatus = 'unread';
        }

        //Validates each of the inputs and either throws an error or returns an array of the results
        if (title.value === ''){
            title.classList.add('error');
            titleError.textContent = 'Please enter a title';
            return [];
        }
        else{
            title.classList.remove('error');
            titleError.textContent = '';
        }


        if (author.value === ''){
            author.classList.add('error');
            authorError.textContent = 'Please enter an author';
            return [];
        }
        else{
            author.classList.remove('error');
            authorError.textContent = '';
        }        

        if (pages.value === ''){
            pages.classList.add('error');
            pagesError.textContent = 'Please enter the number of pages';
            return [];
        }
        else if (pages.value === '0'){
            pages.classList.add('error');
            pagesError.textContent = 'Number of pages cannot be 0';
            return [];
        }
        else if (pages.value >= 1000000){
            pages.classList.add('error');
            pagesError.textContent = 'Is your book really that long?';
            return [];
        }
        else{
            pages.classList.remove('error');
            pagesError.textContent = '';
        }
        

        //If everything above checked out, then return the validated data
            return [title.value, author.value, pages.value, readStatus];
          
    };

    //Private method to clear the form fields
    const clearForm = () => {
        title.value = '';
        author.value = '';
        pages.value = '';
        read.checked = false;
    };
    
    return {addNewBook, deleteBook, updateBook, loadLibrary};
})();



//Section for query selectors
const submitBookButton = document.querySelector('#submitBook');
const bookWrapper = document.querySelector('.bookWrapper');
const title = document.querySelector('#titleInput');
const author = document.querySelector('#authorInput');
const pages = document.querySelector('#pagesInput');
const read = document.querySelector('#readInput');
const titleError = document.querySelector('#titleError');
const totalBookstd = document.querySelector('#totalBooks');
const unreadBookstd = document.querySelector('#unreadBooks');
const readBookstd = document.querySelector('#readBooks');
const totalPagestd = document.querySelector('#pagesRead');


window.onload = function() {
   myLibrary.loadLibrary(); 
};



//Event handler to add a new book to the library
submitBookButton.addEventListener('click', function(e) {
    e.preventDefault();
    myLibrary.addNewBook();
});





// For the Overlay

let overlayOn = false;

const overlay = (() => {

    const on = () => {
        document.querySelector('.overlay').style.display = "flex";
        overlayOn = true;
    }

    const off = () => {
        document.querySelector('.overlay').style.display = "none";
        overlayOn = false;
    }

    const addBookOn = () => {
        document.querySelector('#formHolder').style.display = "flex";
        overlayOn = true;
    }

    const addBookOff = () => {
        document.querySelector('#formHolder').style.display = "none";
        overlayOn = false;
    }

    const editBookOn = () => {
        document.querySelector('.bookOverlayWrapper').style.display = "flex";
        overlayOn = true;
    }

    const editBookOff = () => {
        document.querySelector('.bookOverlayWrapper').style.display = "none";
        overlayOn = false;
    }

    return {on, off, addBookOn, addBookOff, editBookOn, editBookOff};
})();

// Query selector to turn the overlay on
const overlayButton = document.querySelector('#newBookButton');
overlayButton.addEventListener('click', () => {
    if (!overlayOn){
        overlay.on();
        overlay.addBookOn();
    }
});

//Query selector to close the overlay
const closeButton = document.querySelector('#closeOverlay');
closeButton.addEventListener('click', () => {
    if (overlayOn){
        overlay.off();
        overlay.addBookOff();
    }

});

// Important function for assigning an event handler to each button created by the DOM
function hasClass(elem, className) {
    return elem.classList.contains(className);
}

// event handlers for the additional information buttons. This will bring up an overlay with more detailed information on the book
const additionalInfoButtons = document.querySelectorAll('.infoButton');
bookWrapper.addEventListener('click', function(e) {
    if (hasClass(e.target, 'infoButton')) {
        let index = e.target.id;        //Grabs the index so that we can pull up the correct book - implement later
        // turns on the overlay
        if (!overlayOn){
            overlay.on();
            overlay.editBookOn();
        }
    }
});

const closeEditOverlay = document.querySelector('#closeEditOverlay');
closeEditOverlay.addEventListener('click', () => {
    if (overlayOn){
        overlay.off();
        overlay.editBookOff();
    }
});






// event handlers for the delete book buttons and update read status buttons



const removeButtons = document.querySelectorAll('.delButton');
bookWrapper.addEventListener('click', function(e) {
    if (hasClass(e.target, 'delButton')) {
        let index = e.target.id;
        myLibrary.deleteBook(index);
    }
});

// Redacted due to decision to create a book overlay
// const updateButtons = document.querySelectorAll('.updateButton');
// bookWrapper.addEventListener('click', function(e) {
//     if (hasClass(e.target, 'updateButton')) {
//         let index = e.target.id;
//         myLibrary.updateBook(index);
//     }
// })