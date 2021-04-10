//Error handling in real time
//responsiveness


//Section for Bookfactory
const bookFactory = (title, author, pages, read, addInfo) => {
    return { title, author, pages, read, addInfo };
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

        if (validated.length > 0) {
            const newBook = bookFactory(validated[0], validated[1], validated[2], validated[3], validated[4]);
            myLibrary.push(newBook);
            clearForm();
            overlay.off();
            overlay.addBookOff();
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
            const extra = document.createElement('p');
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

            //Creates the additional information button
            const additionalInfoButton = document.createElement('button');
            additionalInfoButton.classList.add('infoButton');
            additionalInfoButton.textContent = 'See Additional Information or Update';
            additionalInfoButton.setAttribute('id', index);

            //Append the new fields
            newBook.appendChild(delButton);
            titleWrapper.appendChild(titleh3);
            newBook.appendChild(titleWrapper);
            newBook.appendChild(authorp);
            newBook.appendChild(pagesp);
            newBook.appendChild(readp);
            newBook.appendChild(additionalInfoButton);
            bookWrapper.appendChild(newBook);

            //Calculates the running totals for the data
            totalBooks++;
            totalPages += Number(obj.pages);
            if (obj.read === 'read') {
                readBooks++;
            }
            else {
                unreadBooks++;
            }

            //Updates index for the next iteration
            index++;
        });

        //displays the data to the page
        displayData();
    };

    //This is triggered by the 'see additional information' button. It creates an overlay that views the additional information of the book
    const viewBook = (index) => {

        //Clears the button holder and bookInfo overlay (in case there's any data remaining from the last view)
        buttonHolder.innerHTML = '';
        bookInfo.innerHTML = '';

        //Creates the new holders for 
        const titleh2 = document.createElement('h2');
        const authorp = document.createElement('p');
        const pagesp = document.createElement('p');
        const readp = document.createElement('p');
        readp.classList.add('bookReadStatus');
        const extra = document.createElement('p');
        extra.classList.add('extraBookInfo');

        //To hold and style the title
        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('titleWrapper');

        //Updates the data for the specific book
        titleh2.textContent = myLibrary[index].title;
        authorp.innerHTML = "<strong>Author:</strong> " + myLibrary[index].author;
        pagesp.innerHTML = "<strong>Total pages:</strong> " + myLibrary[index].pages;
        readp.innerHTML = "<strong>This book is:</strong> " + myLibrary[index].read;
        extra.innerHTML = "<strong>Additional Information:</strong> " + myLibrary[index].addInfo;

        //For the 'edit information' button
        const updateButton = document.createElement('button');
        updateButton.classList.add('updateButton', 'bookButton');
        updateButton.setAttribute('id', index);
        updateButton.textContent = 'Update Information';

        //Appends the new DOM to the overlay
        bookInfo.appendChild(titleh2);
        bookInfo.appendChild(authorp);
        bookInfo.appendChild(pagesp);
        bookInfo.appendChild(readp);
        bookInfo.appendChild(extra);
        buttonHolder.appendChild(updateButton);

    };

    //Displays the form for the updating of the books 'read' status and 'additional information', triggered by the user
    const updateBookDOM = (index) => {

        //These remove the 'read status' and the additional information from the DOM
        const readp = document.querySelector('.bookReadStatus');
        const extra = document.querySelector('.extraBookInfo');
        let hasBeenRead;

        if (myLibrary[index].read === 'read'){
            hasBeenRead = true;
        }
        else{
            hasBeenRead = false;
        }

        bookInfo.removeChild(readp);
        bookInfo.removeChild(extra);

        //Containers to hold the nested update information inputs
        const readDIV = document.createElement('div');
        readDIV.classList.add('readDIV');
        const extraDIV = document.createElement('div');
        extraDIV.classList.add('extraDIV');

        //New form items 
        const updateReadLabel = document.createElement('label');
        updateReadLabel.setAttribute('for', 'updateRead');
        updateReadLabel.innerHTML = "<strong>Has this book been read?</strong> ";
        const updateRead = document.createElement('input');
        updateRead.setAttribute('id', 'updateRead');
        updateRead.setAttribute('type', 'checkbox');

        if (hasBeenRead){
            updateRead.checked = true;
        }


        const updateAdditionalInfoLabel = document.createElement('label');
        const updateAdditionalInfo = document.createElement('textarea');
        updateAdditionalInfoLabel.setAttribute('for', 'additInfo');
        updateAdditionalInfo.setAttribute('id', 'additInfo');


        updateAdditionalInfo.value = extra.textContent.replace('Additional Information: ', '');
        updateAdditionalInfoLabel.innerHTML = "<strong>Update the below Additional Information:</strong> ";

        //Appends the new form items and their labels to the DOM overlay
        readDIV.appendChild(updateReadLabel);
        readDIV.appendChild(updateRead);
        extraDIV.appendChild(updateAdditionalInfoLabel);
        extraDIV.appendChild(updateAdditionalInfo);
        bookInfo.appendChild(readDIV);
        bookInfo.appendChild(extraDIV);

        //Remove the updateButton and swap it for a saveButton
        const updateButton = document.querySelector('.updateButton');
        buttonHolder.removeChild(updateButton);

        const saveButton = document.createElement('button');
        saveButton.classList.add('saveUpdate', 'bookButton');
        saveButton.setAttribute('id', index);
        saveButton.textContent = 'Save Information';
        buttonHolder.appendChild(saveButton);
    };

    //This is triggered by the 'save information' button. After the user has updated their information, this method will update
    //the book object and save the data to the array
    const updateBook = (index) => {
        const updateRead = document.querySelector('#updateRead');
        const updateAddInfo = document.querySelector('#additInfo');
        let arr = [validate.checkReadStatus(updateRead), validate.additionalInfo(updateAddInfo)];
        console.log('new data')
        console.table(arr);


        //Now I need to update the book object... can I do that?
        console.log('Old library');
        console.table(myLibrary);

        myLibrary[index].read = arr[0];
        myLibrary[index].addInfo = arr[1];


        console.log('New library');
        console.table(myLibrary);
        saveLibrary();
        displayLibrary();
        viewBook(index);

    }

    //Displays the data on the table
    const displayData = () => {
        totalPagestd.textContent = totalPages;
        totalBookstd.textContent = totalBooks;
        unreadBookstd.textContent = unreadBooks;
        readBookstd.textContent = readBooks;
    }

    //Deletes a book from the myLibrary array, triggered by the [x] on each book object
    const deleteBook = (index) => {
        console.log('before splice');
        console.table(myLibrary);
        if (index === '0') {
            myLibrary.shift();
        }
        else {
            myLibrary.splice(index, 1);
        }
        console.log('after splice');
        console.table(myLibrary);
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

        //Validates each of the inputs and either throws an error or returns an array of the results
        let arr = [validate.validateTitle(doesTitleExist()), validate.validateAuthor(), validate.validatePages(), validate.checkReadStatus(read), validate.additionalInfo(addInfo)];
        console.log[arr];

        arr.forEach(item => {
            if (item === null) {
                arr = [];
            }
        });

        return arr;

    };

        //Checks if the book already exists in the library
        const doesTitleExist = () => {

            let noBook = true;
            myLibrary.forEach(book => {
                if (title.value === book.title){
                    title.classList.add('error');
                    titleError.textContent = 'This book is already in the library';
                    noBook = false
                }
            });
            return noBook;
        }

    //Private method to clear the form fields
    const clearForm = () => {
        title.value = '';
        author.value = '';
        pages.value = '';
        read.checked = false;
        addInfo.value = '';

    };

    return { addNewBook, deleteBook, updateBookDOM, loadLibrary, viewBook, updateBook };
})();


const validate = (() => {

    //Spans to display the error messages
    const titleError = document.querySelector('#titleError');
    const authorError = document.querySelector('#authorError');
    const pagesError = document.querySelector('#pagesError');

    //Checks if the book was read
    const checkReadStatus = (source) => {
        if (source.checked) {
            return 'read';
        }
        else {
            return 'unread';
        }
    };

    //Validates the title
    const validateTitle = (titleTest) => {

        if (!titleTest){
            return null;
        }
        else if (title.value === '') {
            title.classList.add('error');
            titleError.textContent = 'Please enter a title';
            return null;
        }
        else if (title.value.length >= 50) {
            title.classList.add('error');
            titleError.textContent = 'Title must be less than 50 characters';
            return null;
        }
        else {
            title.classList.remove('error');
            titleError.textContent = '';
            return title.value;
        }
    }


    //validates the author
    const validateAuthor = () => {
        if (author.value === '') {
            author.classList.add('error');
            authorError.textContent = 'Please enter an author';
            return null;
        }
        else if (author.value.length >= 50) {
            author.classList.add('error');
            authorError.textContent = 'Author must be less than 50 characters';
            return null;
        }
        else {
            author.classList.remove('error');
            authorError.textContent = '';
            return author.value;
        };
    }

    //validate the number of pages
    const validatePages = () => {
        if (pages.value === '') {
            pages.classList.add('error');
            pagesError.textContent = 'Please enter the number of pages';
            return null;
        }
        else if (pages.value === '0') {
            pages.classList.add('error');
            pagesError.textContent = 'Number of pages cannot be 0';
            return null;
        }
        else if (pages.value >= 1000000) {
            pages.classList.add('error');
            pagesError.textContent = 'Is your book really that long?';
            return null;
        }
        else {
            pages.classList.remove('error');
            pagesError.textContent = '';
            return pages.value;
        }
    }

    //Checks if additional info contains any data
    const additionalInfo = (source) => {
        if (source.value === '') {
            return 'No additional Info';
        }
        else {
            return source.value;
        }
    }

    return { checkReadStatus, validateAuthor, validateTitle, validatePages, additionalInfo };
})();




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

    return { on, off, addBookOn, addBookOff, editBookOn, editBookOff };
})();


//Section for query selectors
const submitBookButton = document.querySelector('#submitBook');
const bookWrapper = document.querySelector('.bookWrapper');
const title = document.querySelector('#titleInput');
const author = document.querySelector('#authorInput');
const pages = document.querySelector('#pagesInput');
const read = document.querySelector('#readInput');
const addInfo = document.querySelector('#additionalInfoInput');
const titleError = document.querySelector('#titleError');
const totalBookstd = document.querySelector('#totalBooks');
const unreadBookstd = document.querySelector('#unreadBooks');
const readBookstd = document.querySelector('#readBooks');
const totalPagestd = document.querySelector('#pagesRead');
const bookInfo = document.querySelector('.viewBookInfo');
const buttonHolder = document.querySelector('.buttonHolder');

window.onload = function () {
    myLibrary.loadLibrary();
};



//Event handler to add a new book to the library
submitBookButton.addEventListener('click', function (e) {
    e.preventDefault();
    myLibrary.addNewBook();
});





// For the Overlay


// Query selector to turn the overlay on
const overlayButton = document.querySelector('.newBookButton');
overlayButton.addEventListener('click', () => {
    if (!overlayOn) {
        overlay.on();
        overlay.addBookOn();
    }
});

//Query selector to close the overlay
const closeButton = document.querySelector('#closeOverlay');
closeButton.addEventListener('click', () => {
    if (overlayOn) {
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
bookWrapper.addEventListener('click', function (e) {
    if (hasClass(e.target, 'infoButton')) {
        let index = e.target.id;        //Grabs the index so that we can pull up the correct book - implement later
        // turns on the overlay
        if (!overlayOn) {
            overlay.on();
            overlay.editBookOn();
            myLibrary.viewBook(index);
        }
    }
});

const closeEditOverlay = document.querySelector('#closeEditOverlay');
closeEditOverlay.addEventListener('click', () => {
    if (overlayOn) {
        overlay.off();
        overlay.editBookOff();
    }
});






// event handlers for the delete book buttons and update read status buttons



const removeButtons = document.querySelectorAll('.delButton');
bookWrapper.addEventListener('click', function (e) {
    if (hasClass(e.target, 'delButton')) {
        let index = e.target.id;
        myLibrary.deleteBook(index);
    }
});

// Updates the book
const updateButtons = document.querySelectorAll('.updateButton');
buttonHolder.addEventListener('click', function (e) {
    if (hasClass(e.target, 'updateButton')) {
        let index = e.target.id;
        myLibrary.updateBookDOM(index);
    }
})

//Event listener to save (saveUpdate button) the newly updated data
const saveUpdateButtons = document.querySelectorAll('.saveUpdate');
buttonHolder.addEventListener('click', function (e) {
    if (hasClass(e.target, 'saveUpdate')) {
        let index = e.target.id;
        myLibrary.updateBook(index);
    }
});