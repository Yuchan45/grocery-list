// ******** SELECT ITEMS ********
const alert = document.querySelector('.alert');
const input = document.querySelector('#product-name');
const list = document.querySelector('.list-container');
const submitBtn = document.querySelector('.submit-btn');
const editBtn = document.querySelector('.edit-btn'); 
const deleteBtn = document.querySelector('.delete-btn');
const clearAllBtn = document.querySelector('.list-clear-btn');

// Edit options
let editFlag = false;
let editElement;
let editArticle;
let editID = "";


// ***** EVENT LISTENERS *****
submitBtn.addEventListener('click', addItem);
clearAllBtn.addEventListener('click', clearList);
triggerEnter();

// ***** FUNCTIONS *****
function addItem() {
    const value = capitalizeFirstLetter(input.value);
    const id = new Date().getTime().toString(); // Creo un ID casero

    if (value && !editFlag) {
        const element = document.createElement('article');
        // add class
        element.classList.add('list-item');
        // set data = id to the article element.
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        // add the rest of the structure below.
        element.innerHTML = `
            <p class="list-title">${value}</p>
            <div class="grocery-btn-container">
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        // append child (the element we just created).
        list.appendChild(element);
        // Set edit and delete eventListeners.
        setEditDeleteEventListeners(element);
        displayAlert("El item ha sido agregado!", "valid");
        // add to local storage
        //addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    } else if (value && editFlag) {
        if (value == '') displayAlert("No puedes modificar por un valor vacio!", "invalid");
        editElement.innerHTML = value;
        displayAlert("El item ha sido editado!", "valid");
        // edit local storage
        // editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert("Valor vacio!", "invalid");
    }
}

function removeItem(e) {
    let parent = e.currentTarget.parentElement;
    let grandParent = parent.parentElement;   
    let id = grandParent.getAttribute('data-id');
    let value = e.currentTarget.parentElement.previousElementSibling.innerHTML;
    list.removeChild(grandParent);
    displayAlert(`"${value}" has been removed!`, "invalid");
    setBackToDefault();
    //remove from local storage.
    //removeFromLocalStorage(id);
}

function clearList() {
    const items = document.querySelectorAll('.list-item');
    if (items.length > 0) {
        items.forEach(function(item) {
            item.remove();
        });
        displayAlert("Items cleared!", "valid");
        setBackToDefault();
        // localStorage.removeItem('list');
    } else {
        displayAlert("Already clear!", "valid");
    }
}

function editItem(e) {
    if (editFlag) {
        setBackToDefault();
        return;
    } 
    // Getting article ID.
    editArticle = e.currentTarget.parentElement.parentElement;
    editID = editArticle.getAttribute('data-id');
    // Setting input edit value.
    editElement = e.currentTarget.parentElement.previousElementSibling;
    input.value = editElement.innerHTML;
    input.focus();
    //Highlight edit text.
    editArticle.classList.add("edit");
    editFlag = true;
    submitBtn.value = 'Edit';

}

function setEditDeleteEventListeners(element) {
    // We need to set the event listeners here because we are sure the DOM exists.
    const editBtn = element.querySelector('.edit-btn');
    const deleteBtn = element.querySelector('.delete-btn');
    editBtn.addEventListener('click', editItem);
    deleteBtn.addEventListener('click', removeItem);
}

function setBackToDefault() {
    input.value = '';
    editFlag = false;
    editId = '';
    if (editArticle) editArticle.classList.remove('edit');
    submitBtn.innerHTML = "Submit";
}

// Capitalize First Letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Display alert
function displayAlert(text, action) {
    // Recibe un msj string y una accion (valid o invalid). 
    alert.innerHTML = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.innerHTML = '';
        alert.classList.remove(`alert-${action}`);
    },1000);
}

// trigger HTML button when you press Enter
function triggerEnter() {
    input.addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            submitBtn.click();
        }
    });
}


// ***** LOCAL STORAGE *****
// function addToLocalStorage(id, value) {
//     console.log("Added to local storage");
//     const grocery = {
//         id:id,
//         value: value
//     }
//     let items = localStorage.getItem('');


// }

// function removeFromLocalStorage(id) {
//     console.log("Item removed from local storage");
// }   

// function editLocalStorage(id, value) {

// }
