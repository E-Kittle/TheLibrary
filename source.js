//Section for Bookfactory
const bookFactory = (title, author, pages, read) => {
    return {title, author, pages, read};
};



//Section for methods to update/load the library
const myLibrary = (() => {
    const myLibrary = [];

    //Grabs data from the form to create a new book
    const addNewBook = () => {
        //Grab the data from the form
        validateData();
        
        let arr = validateData();
        console.log(`title ${arr[0]}, author ${arr[1]}, pages ${arr[2]}, read? ${arr[3]}`);
        
        
        
        
        
        const newBook = document.createElement('div');
        newBook.classList.add('book');
        bookWrapper.appendChild(newBook);
        // overlay.off();

        
    };
    
    //Private method which loops through the myLibrary array to add books to the DOM
    const displayLibrary = () => {
        
    };
    
    //Deletes a book from the myLibrary array
    const deleteBook = () => {
        
    };
    
    //Updates the books 'read' status, triggered by the user
    const updateBook = () => {
        
    };
    
    //private function to save myLibrary
    const saveLibrary = () => {
        
    }
    
    //private method to load myLibrary
    const loadLibrary = () => {
        
    };
    
    //Private method to validate the data from the form
    const validateData = () => {
        //Check to see if title, author, and pages are null
        //Additionally, check to see if pages is a number
        const title = document.querySelector('#titleInput');
        const author = document.querySelector('#authorInput');
        const pages = document.querySelector('#pagesInput');
        const read = document.querySelector('#readInput');
        let readStatus;

        //Checks if the book was read or not
        console.log(read);
        if (read.checked){
            readStatus = 'read';
        }
        else {
            readStatus = 'unread';
        }

        if (title.value === ''){
            console.log('add error catch')
            //Return false - This will cause the entire form to be prevented from submitting
        }
        else if (author.value === ''){
            console.log('add error catch')
            //Return false - This will cause the entire form to be prevented from submitting
        }        
        else if (pages.value === ''){
            console.log('add error catch')
            //Return false - This will cause the entire form to be prevented from submitting
        }
        else{
            return [title.value, author.value, pages.value, readStatus];
        }
        
        
        
        // const arr = ['title', 'author', 34];
        // return arr;
    };
    
    return {addNewBook, deleteBook, updateBook};
})();



//Section for query selectors
const submitBookButton = document.querySelector('#submitBook');
const bookWrapper = document.querySelector('.bookWrapper');





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