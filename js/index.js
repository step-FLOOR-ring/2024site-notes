document.addEventListener('DOMContentLoaded', function () {
    const userInput = document.getElementById('userInput');
    const terminalBody = document.querySelector('.note-list');
    const saveButton = document.getElementById('saveButton');

    // Load notes from localStorage on page load
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach((noteText) => {
        addNoteToList(noteText);
    });

    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            const inputText = userInput.value.trim();
            if (inputText !== '') {
                addNoteToList(inputText);

                userInput.value = '';
            }
        }
    });

    terminalBody.addEventListener('dblclick', function (event) {
        if (event.target.tagName === 'LI') {
            // Remove the note from the display
            event.target.remove();

            // Remove the note from localStorage if it was saved
            const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            const noteIndex = savedNotes.indexOf(event.target.textContent);
            if (noteIndex !== -1) {
                savedNotes.splice(noteIndex, 1);
                localStorage.setItem('notes', JSON.stringify(savedNotes));
            }
        }
    });

    saveButton.addEventListener('click', function () {
        // Save notes to localStorage
        const notesToSave = Array.from(terminalBody.children).map((li) => li.textContent);
        localStorage.setItem('notes', JSON.stringify(notesToSave));
    });

    function addNoteToList(noteText) {
        const listItem = document.createElement('li');
        listItem.textContent = noteText;
        terminalBody.appendChild(listItem);
    }
});