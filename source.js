//Section for DOM elements
// const newBookButton = document.querySelector('#newBookButton');


//Section for Bookfactory
const bookFactory = (title, author, pages, read) => {
    return {title, author, pages, read};
};



//Section for methods to update/load the library
const myLibrary = () => {
    const myLibrary = [];

    //Grabs data from the form to create a new book
    const addNewBook = () => {

        let book = bookFactory();
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

    return {addNewBook, deleteBook, updateBook};
};



//Section for event handlers




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

const overlayButton = document.querySelector('#newBookButton');
overlayButton.addEventListener('click', () => {
    console.log('clicked');
    if (!overlayOn){
        overlay.on();
    }
    else{
        overlay.off();
    }
});