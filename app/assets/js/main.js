// display all editable parts of the page

function highlightEditables(evt) {
    evt.preventDefault();
    document.body.classList.toggle('highlightEditables');
}

const hleButton = document.querySelector('#highlightEditables');
if (hleButton) hleButton.addEventListener('click', highlightEditables);

if (window.MutationObserver) {
    const displayNameEdits = document.querySelector('.user-display-name');
    const displayNameTarget = document.querySelector('#display-name-reflect');

    if (!displayNameEdits || !displayNameTarget) {
        return;
    }

    const mo = new MutationObserver(() => {
        displayNameTarget.textContent = displayNameEdits.textContent;
    });

    mo.observe(displayNameEdits, {
        childList: true,
        subtree: false,
    });
}
