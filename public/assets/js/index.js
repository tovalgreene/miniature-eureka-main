let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearFormBtn;
let noteList;
let activeNote = {};

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearFormBtn = document.querySelector('.clear-form');
  noteList = document.querySelector('.list-group');

  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearFormBtn.addEventListener('click', handleClearForm);
  noteTitle.addEventListener('keyup', handleRenderButtons);
  noteText.addEventListener('keyup', handleRenderButtons);

  noteList.addEventListener('click', (e) => {
    const listItem = e.target.closest('.list-group-item');
    if (listItem) {
      activeNote = JSON.parse(listItem.dataset.note);
      renderActiveNote();
      show(newNoteBtn);
      hide(clearFormBtn);
    }
  });
}

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json());

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  .then((response) => response.json());

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then(() => getAndRenderNotes());
  
const getAndRenderNotes = () => {
  return getNotes()
    .then((notes) => {
      renderNoteList(notes);
      activeNote = {};
    })
    .catch((error) => {
      console.error('Error getting notes:', error);
    });
};

const renderActiveNote = () => {
  if (activeNote.id) {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');

    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;

    hide(saveNoteBtn);
    hide(clearFormBtn);
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');

    noteTitle.value = '';
    noteText.value = '';

    hide(newNoteBtn);
    show(saveNoteBtn);
    show(clearFormBtn);
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };

  saveNote(newNote)
    .then(() => {
      getAndRenderNotes();

      noteTitle.value = '';
      noteText.value = '';

      hide(saveNoteBtn);
      hide(clearFormBtn);
    })
    .catch((error) => {
      console.error('Error saving note:', error);
    });
};

const handleNoteDelete = (e) => {
  e.stopPropagation();

  const listItem = e.target.closest('.list-group-item');

  if (listItem) {
    const noteData = JSON.parse(listItem.dataset.note);

    deleteNote(noteData.id)
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  }
};

const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

const handleClearForm = () => {
  noteTitle.value = '';
  noteText.value = '';
  hide(saveNoteBtn);
  hide(clearFormBtn);
};

const handleRenderButtons = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
    hide(clearFormBtn);
  } else {
    show(saveNoteBtn);
    show(clearFormBtn);
  }
};


getAndRenderNotes();
