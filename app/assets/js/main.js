// display all editable parts of the page

function highlightEditables(evt) {
    evt.preventDefault();
    document.body.classList.add('highlightEditables');
}

const hleButton = document.querySelector('#highlightEditables');
hleButton && hleButton.addEventListener('click', highlightEditables);
