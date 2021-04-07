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
        //Grab the data from the form        
        let validated = validateData();

        if (!validated){

        }
        else{
            const newBook = bookFactory(validated[0], validated[1], validated[2], validated[3]);
            myLibrary.push(newBook);
            saveLibrary();
            // clearForm();         //Use these later but for efficiency I just have them commented out.
            // overlay.off();
            displayLibrary();
        }
    };
    
    //Private method which loops through the myLibrary array to add books to the DOM
    const displayLibrary = () => {
        loadLibrary();          //Loads the library from the local save. This is really only important for a returning user. Need to set myLibrary = loadLibrary()

        //Resets the page
        bookWrapper.innerHTML = '';

        //Resets values for data totals
        totalBooks = 0;
        totalPages = 0;
        readBooks = 0;
        unreadBooks = 0;

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
    
            //Adds the text content
            titleh3.textContent = obj.title;
            authorp.textContent = obj.author;
            pagesp.textContent = obj.pages;
            readp.textContent = obj.read;
    
    
            //Append the new fields
            newBook.appendChild(titleh3);
            newBook.appendChild(authorp);
            newBook.appendChild(pagesp);
            newBook.appendChild(readp);
            bookWrapper.appendChild(newBook);

            //Creates and appends an update and delete button to the newBook div



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


    //Displays the data on the table
    const displayData = () => {
        totalPagestd.textContent = totalPages;
        totalBookstd.textContent = totalBooks;
        unreadBookstd.textContent = unreadBooks;
        readBookstd.textContent = readBooks;
    }
    
    //Deletes a book from the myLibrary array
    const deleteBook = () => {
        
    };
    
    //Updates the books 'read' status, triggered by the user
    const updateBook = () => {
        
    };
    
    //private function to save myLibrary
    const saveLibrary = () => {
        console.log('library saved');
    }
    
    //private method to load myLibrary
    const loadLibrary = () => {
        console.log('library loaded');
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
            return false;
        }
        else{
            title.classList.remove('error');
            titleError.textContent = '';
        }


        if (author.value === ''){
            author.classList.add('error');
            authorError.textContent = 'Please enter an author';
            return false;
        }
        else{
            author.classList.remove('error');
            authorError.textContent = '';
        }        

        if (pages.value === ''){
            pages.classList.add('error');
            pagesError.textContent = 'Please enter the number of pages';
            return false;
        }
        else if (pages.value === '0'){
            pages.classList.add('error');
            pagesError.textContent = 'Number of pages cannot be 0';
            return false;

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
    
    return {addNewBook, deleteBook, updateBook};
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



//Event handler to add a new book to the library
submitBookButton.addEventListener('click', function(e) {
    e.preventDefault();
    myLibrary.addNewBook();
});





// For the Overlay
let overlayOn = false;

const overlay = (() => {
    const on = () => {
        document.querySelector(".overlay").style.display = "flex";
        overlayOn = true;
    }

    const off = () => {
        document.querySelector(".overlay").style.display = "none";
        overlayOn = false;
    }

    return {on, off};
})();

// Query selector to turn the overlay on
const overlayButton = document.querySelector('#newBookButton');
overlayButton.addEventListener('click', () => {
    if (!overlayOn){
        overlay.on();
        overlayOn = true;
    }
});

//Query selector to close the overlay
const closeButton = document.querySelector('#closeOverlay');
closeButton.addEventListener('click', () => {
    if (overlayOn){
        overlay.off();
        overlayOn = false;
    }

});