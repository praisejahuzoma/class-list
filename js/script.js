
// select the class-form
const classForm = document.querySelector('.class-form');
// select the input box
const classInput = document.querySelector('.class-input');
// select the <ul> with class="class-items"
const classItemsList = document.querySelector('.class-items');

// array which stores every lists
let lists = [];

// add an eventListener on form, and listen for submit event
classForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addList(classInput.value); // call addList function with input box current value
});

// function to add list
function addList(item) {
  // if item is not empty
  if (item !== '') {
    // make a list object, which has id, name, and completed properties
    const list = {
      id: Date.now(),
      name: item,
      completed: false
    };

    // then add it to lists array
    lists.push(list);
    addToLocalStorage(lists); // then store it in localStorage

    // finally clear the input box value
    classInput.value = '';
  }
}

// function to render given lists to screen
function renderLists(lists) {
  // clear everything inside <ul> with class=class-items
  classItemsList.innerHTML = '';

  // run through each item inside lists
  lists.forEach(function(item) {
    // check if the item is completed

    // make a <li> element and fill it
    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    
    li.innerHTML = `
      ${item.name}
     <span class="delete-button">x</span>
     <span class="delete-button "> 
     <i class="fa fa-edit" id="icon"></i>
    </span>
    `;
    // finally add the <li> to the <ul>
    classItemsList.append(li);
  });

}

// function to add lists to local storage
function addToLocalStorage(lists) {
  // conver the array to string then store it.
  localStorage.setItem('lists', JSON.stringify(lists));
  // render them to screen
  renderLists(lists);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('lists');
  // if reference exists
  if (reference) {
    // converts back to array and store it in lists array
    lists = JSON.parse(reference);
    renderLists(lists);
  }
}

// toggle the value to completed and not completed
function toggle(id) {
  lists.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(lists);
}

// deletes a list from lists array, then updates localstorage and renders updated list to screen
function deleteList(id) {
  // filters out the <li> with the id and updates the lists array
  lists = lists.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(lists);
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=classItems. Because we need to listen for click event in all delete-button and checkbox
classItemsList.addEventListener('click', function(event) {
  // check if the event is on checkbox


  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteList(event.target.parentElement.getAttribute('data-key'));
  }
});