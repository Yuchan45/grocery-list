// ******** SELECT ITEMS ********
const alert = document.querySelector('.alert');
const input = document.querySelector('#product-name');
const list = document.querySelector('.list-container');
const submitBtn = document.querySelector('.submit-btn');
const editBtn = document.querySelector('.edit-btn'); 
const deleteBtn = document.querySelector('.delete-btn');
const clearAllBtn = document.querySelector('.list-clear-btn');

let editFlag = false;

submitBtn.addEventListener('click', addItem);
clearAllBtn.addEventListener('click', clearList);
triggerEnter();

function addItem() {
    const value = input.value;
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
        setBackToDefault();

    } else if (value && editFlag) {
        displayAlert("El item ha sido editado!", "valid");



        
    } else {
        displayAlert("Valor vacio!", "invalid");
    }
}

function removeItem(e) {
    console.log("Delete");
    let parent = e.currentTarget.parentElement;
    let grandParent = parent.parentElement;   
    let id = grandParent.getAttribute('data-id');

    list.removeChild(grandParent);
    displayAlert("Item removed!", "invalid");
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
    console.log("Edit");
    editFlag = true;
    submitBtn.value = 'Edit';
    let grandParent = e.currentTarget.parentElement.parentElement;
    let id = grandParent.getAttribute('data-id');
    //Highlight edit text.
    grandParent.classList.add("edit");
    input.focus();
    console.log(id);


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
    submitBtn.innerHTML = "Submit";
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

// ***** trigger HTML button when you press Enter *****
function triggerEnter() {
    input.addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            submitBtn.click();
        }
    });
}

// ***** LOCAL STORAGE *****
function addToLocalStorage(id, value) {
    console.log("Added to local storage");
}

function removeFromLocalStorage(id) {

}   console.log("Item removed from local storage")


// ***** STEUP ITEMS *****