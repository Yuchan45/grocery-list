// ******** SELECT ITEMS ********
const alert = document.querySelector('.alert');
const item = document.querySelector('#product-name');
const list = document.querySelector('.list-container');
const submitBtn = document.querySelector('.submit-btn');
const editBtn = document.querySelector('.edit-btn'); 
const deleteBtn = document.querySelector('.delete-btn');
const clearAllBtn = document.querySelector('.list-clear-btn');

let editFlag = false;

submitBtn.addEventListener('click', addItem);
clearAllBtn.addEventListener('click', clearList);

function addItem() {
    const value = item.value;
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

function removeItem() {
    console.log("Hola");

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
        displayAlert("List Already clear!", "valid");
    }
}

function editItem() {
    console.log("asdas");
    submitBtn.innerHTML = 'Edit';


}

function setEditDeleteEventListeners(element) {
    // We need to set the event listeners here because we are sure the DOM exists.
    const editBtn = element.querySelector('.edit-btn');
    const deleteBtn = element.querySelector('.delete-btn');
    editBtn.addEventListener('click', editItem);
    deleteBtn.addEventListener('click', removeItem);
}

function setBackToDefault() {
    item.value = '';
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
