let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelector('.list-group');
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

const renderActiveNote = () => {
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
  })
  .catch((error) => {
    console.error('Error saving note:', error);
  });
};

const handleNoteDelete = (e) => {
  e.preventDefault();

  const listItem = e.target.closest('.list-group-item');

  if(listItem) {
    const noteData = JSON.parse(listItem.dataset.note);

    deleteNote(noteData.id).then(() => {
      getAndRenderNotes();
    })
    .catch((error) => {
      console.error('Error deleting note:', error);
    })
  }
  // const note = e.target.parentElement;
  // const noteId = JSON.parse(note.dataset.note).id;
  // deleteNote(noteId);
};

const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

const renderNoteList = (notes) => {
  noteList.innerHTML = '';

  notes.forEach((note) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    liEl.innerHTML = `<span class="list-item-title">${note.title}</span>
    <button class="btn btn-danger delete-note">Delete Note</button>`;
    
    liEl.dataset.note = JSON.stringify(note);

    liEl.querySelector('.delete-note').addEventListener('click', handleNoteDelete);
    // const delBtnEl = document.createElement('i');
    // delBtnEl.classList.add(
    //   'fas',
    //   'fa-trash-alt',
    //   'float-right',
    //   'text-danger',
    //   'delete-note'
    // );
    // delBtnEl.addEventListener('click', handleNoteDelete);

    // liEl.appendChild(delBtnEl);

    noteList.appendChild(liEl);
  });
};

getAndRenderNotes();

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}